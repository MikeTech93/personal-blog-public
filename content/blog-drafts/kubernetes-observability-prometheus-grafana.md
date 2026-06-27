---
title: "The Complete Kubernetes Observability Stack: Prometheus, Grafana & Loki"
description: "Step-by-step guide to deploying a production observability stack on Kubernetes with Prometheus Operator, Grafana dashboards, Loki log aggregation, and alert routing."
date: "2026-04-18"
readTime: "15 min read"
tags: ["Kubernetes", "Prometheus", "Grafana", "Observability"]
category: "Observability"
featured: false
---

## The Three Pillars

A complete observability stack covers three signals:

- **Metrics** — numeric time-series data (CPU usage, request rate, error rate)
- **Logs** — structured or unstructured event records
- **Traces** — distributed request flows across services

This article focuses on metrics and logs using the `kube-prometheus-stack` Helm chart (Prometheus Operator + Grafana) and Loki for log aggregation. For traces, Tempo integrates naturally with the same stack.

## Deploying kube-prometheus-stack

The `kube-prometheus-stack` Helm chart from the prometheus-community repo deploys everything: Prometheus Operator, Prometheus, Alertmanager, Grafana, and a set of pre-built dashboards and recording rules for cluster health.

```bash
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm repo update

helm upgrade --install kube-prometheus-stack prometheus-community/kube-prometheus-stack \
  --namespace monitoring \
  --create-namespace \
  --values values.yaml
```

Key values to configure:

```yaml
# values.yaml
prometheus:
  prometheusSpec:
    retention: 15d
    storageSpec:
      volumeClaimTemplate:
        spec:
          storageClassName: managed-csi-premium
          resources:
            requests:
              storage: 50Gi

grafana:
  adminPassword: "" # use a secret instead
  persistence:
    enabled: true
    size: 10Gi
  sidecar:
    datasources:
      enabled: true
    dashboards:
      enabled: true

alertmanager:
  alertmanagerSpec:
    storage:
      volumeClaimTemplate:
        spec:
          resources:
            requests:
              storage: 5Gi
```

## ServiceMonitor: Scraping Your Applications

The Prometheus Operator uses `ServiceMonitor` custom resources to tell Prometheus which services to scrape. You don't edit `prometheus.yml` directly.

```yaml
apiVersion: monitoring.coreos.com/v1
kind: ServiceMonitor
metadata:
  name: my-api
  namespace: my-app
  labels:
    release: kube-prometheus-stack  # must match operator selector
spec:
  selector:
    matchLabels:
      app: my-api
  endpoints:
    - port: metrics
      interval: 30s
      path: /metrics
```

The `release: kube-prometheus-stack` label is critical — the operator only picks up monitors with matching labels by default. Check `prometheus.prometheusSpec.serviceMonitorSelector` in your values if scraping isn't working.

## Grafana Dashboards as Code

Store dashboards as ConfigMaps with the `grafana_dashboard: "1"` label and the Grafana sidecar will pick them up automatically:

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: my-api-dashboard
  namespace: monitoring
  labels:
    grafana_dashboard: "1"
data:
  my-api.json: |
    { ... Grafana dashboard JSON ... }
```

Export existing dashboards from the Grafana UI as JSON, store them in Git, and deploy them as ConfigMaps. This makes dashboards reviewable, version-controlled, and reproducible.

## Deploying Loki for Log Aggregation

Loki is Prometheus for logs. It indexes metadata (labels) rather than full text, making it far more storage-efficient than Elasticsearch at the cost of full-text search performance.

```bash
helm repo add grafana https://grafana.github.io/helm-charts

helm upgrade --install loki grafana/loki-stack \
  --namespace monitoring \
  --set grafana.enabled=false \  # already deployed
  --set prometheus.enabled=false \
  --set loki.persistence.enabled=true \
  --set loki.persistence.size=20Gi
```

`Promtail` (included in loki-stack) runs as a DaemonSet and ships all pod logs to Loki automatically. No application changes needed.

In Grafana, add a Loki data source pointing at `http://loki:3100` and use LogQL to query logs:

```logql
{namespace="my-app", app="my-api"} |= "ERROR" | json | line_format "{{.message}}"
```

## Alert Routing

`Alertmanager` receives alerts from Prometheus and routes them to the right destination. A minimal Teams/Slack routing configuration:

```yaml
route:
  receiver: 'default'
  group_by: ['alertname', 'namespace']
  group_wait: 30s
  group_interval: 5m
  repeat_interval: 4h
  routes:
    - match:
        severity: critical
      receiver: 'pagerduty'
    - match:
        severity: warning
      receiver: 'teams'

receivers:
  - name: 'teams'
    msteams_configs:
      - webhook_url: 'https://...'
```

## Recording Rules for Performance

For dashboards with expensive queries (cluster-wide aggregations), pre-compute them with recording rules. These run in Prometheus and store the result as a new metric:

```yaml
apiVersion: monitoring.coreos.com/v1
kind: PrometheusRule
metadata:
  name: cluster-recording-rules
  labels:
    release: kube-prometheus-stack
spec:
  groups:
    - name: cluster.rules
      interval: 1m
      rules:
        - record: cluster:node_cpu_utilisation:ratio
          expr: |
            1 - avg(rate(node_cpu_seconds_total{mode="idle"}[5m]))
```

## Production Checklist

Before going live:
- [ ] Persistent storage configured for Prometheus, Grafana, Loki
- [ ] Alertmanager routing tested with `amtool`
- [ ] Dashboards stored as ConfigMaps in Git
- [ ] ServiceMonitors deployed for all critical services
- [ ] Retention policies set appropriately for cost
- [ ] Grafana admin credentials stored in a secret, not the values file
