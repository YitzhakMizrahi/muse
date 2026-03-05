# Deployment And Environment

## Purpose

This document defines the default deployment and environment assumptions for Muse v1.

The goal is to make implementation decisions coherent without over-engineering infrastructure too early.

## Deployment Target

Default deployment target:

- Vercel

Reason:

- aligned with the current Next.js stack
- fast preview deployments
- low setup overhead
- good fit for early product iteration

## Environment Model

Muse should assume three environments:

1. local
2. preview
3. production

Each environment should have:

- explicit environment variables
- clearly separated secrets
- predictable runtime behavior

## Configuration Rules

- environment variables should be typed and validated
- missing critical configuration should fail clearly
- local development should not require production-only configuration
- preview and production should share the same expected variable shape

## Persistence Assumptions

Default assumptions:

- primary structured data: Postgres
- uploaded/reference assets: object storage

These do not all need to be implemented in Milestone 1, but the architecture should not conflict with them.

## Docker Position

Docker is not a precondition for Muse v1.

Current recommendation:

- do not block implementation on Dockerization
- revisit Docker later if reproducibility, self-hosting, or environment parity becomes a real need

Reason:

- Vercel is the default deployment target
- Docker would add setup complexity before it solves a current bottleneck

## Observability Baseline

Muse should plan for:

- structured server logs
- explicit failure logging
- basic deployment visibility

Nice to add later:

- error tracking
- product analytics
- generation quality telemetry

## CI / Delivery Assumptions

Before production-oriented milestones, the project should have:

- lint
- typecheck
- test
- build

These should be the baseline validation gates for delivery.

## Non-Goals For Now

- Kubernetes
- Terraform
- multi-region infrastructure
- container orchestration
- self-hosting complexity before the product loop is proven
