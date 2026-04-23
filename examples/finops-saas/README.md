# FinOps SaaS Demo: Multi-Tenancy & Auto-Optimization

This demo showcases a high-fidelity 7-tier architecture running locally on **Floci**. It demonstrates strict multi-tenant isolation and a policy-driven infrastructure optimization loop.

## 🚀 Quick Start

1. **Start Floci**:
   ```bash
   docker compose up -d
   ```

2. **Provision Infrastructure**:
   ```bash
   cd infra
   terraform init
   terraform apply -auto-approve
   ```

3. **Install & Run Backend**:
   ```bash
   cd services
   npm install
   npm run dev
   ```

4. **Install & Run Frontend**:
   ```bash
   cd app
   npm install
   npm run dev
   ```

## 🎯 Demo Walkthrough

### 1. Multi-Tenant Isolation
Switch between **Acme Corp** and **Globex** in the tenant selector. Observe that metrics, costs, and configurations are completely isolated at the API, Database, and Cache layers.

### 2. The Simulation Loop
Trigger a **Traffic Spike** for a specific tenant.
- **Cause**: Tenant onboards 10,000 new users.
- **Effect**: Real-time CPU metrics spike, and projected costs increase.
- **Insight**: The Optimization Panel generates a recommendation based on predefined infrastructure policies.

### 3. Apply Optimization
Click **Apply Changes**.
- Observe the metrics stabilize as the infrastructure configuration is updated (simulated).
- Cost projections drop, demonstrating the value of active FinOps.

## 🛠 Tech Stack
- **Emulator**: Floci (Local AWS)
- **Frontend**: Next.js 15, Tailwind CSS, Framer Motion
- **Backend**: Hono (TypeScript), running on Lambda
- **Database**: PostgreSQL (RDS)
- **Cache**: Redis (ElastiCache)
- **Infra**: Terraform
