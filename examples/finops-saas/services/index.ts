import { Hono } from 'hono'
import Redis from 'ioredis'
import { Pool } from 'pg'

const app = new Hono()

// Infrastructure Connections (Simulated endpoints in Floci)
const redis = new Redis(process.env.REDIS_URL || 'redis://localhost:6379')
const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://admin:password123@localhost:7100/finops-saas-db'
})

// --- Middleware: Multi-Tenant Isolation ---
app.use('*', async (c, next) => {
  const tenantId = c.req.header('X-Tenant-ID')
  if (!tenantId) return c.json({ error: 'Missing Tenant ID' }, 401)
  
  // Attach tenant context
  c.set('tenantId', tenantId)
  await next()
})

// --- 1. Metrics API (Redis) ---
app.get('/metrics', async (c) => {
  const tenantId = c.get('tenantId')
  // Hard Boundary: Only get keys with tenant prefix
  const cpu = await redis.get(`metrics:${tenantId}:cpu`) || '0'
  const cost = await redis.get(`metrics:${tenantId}:cost`) || '0'
  const latency = await redis.get(`metrics:${tenantId}:latency`) || '0'
  
  return c.json({ cpu: parseFloat(cpu), cost: parseFloat(cost), latency: parseFloat(latency) })
})

// --- 2. Simulation API ---
app.post('/simulate/spike', async (c) => {
  const tenantId = c.get('tenantId')
  const { reason } = await c.req.json()
  
  // Simulate Cause -> Effect
  console.log(`[Simulation] ${tenantId} triggered spike: ${reason}`)
  
  // Push spiked metrics to Redis
  await redis.set(`metrics:${tenantId}:cpu`, '95', 'EX', 60)
  await redis.set(`metrics:${tenantId}:cost`, '1250', 'EX', 60)
  await redis.set(`metrics:${tenantId}:latency`, '450', 'EX', 60)
  
  return c.json({ message: 'Spike active', reason })
})

// --- 3. Optimizer API (Policy-Driven) ---
app.get('/recommendations', async (c) => {
  const tenantId = c.get('tenantId')
  const cpu = parseFloat(await redis.get(`metrics:${tenantId}:cpu`) || '0')
  
  if (cpu > 80) {
    return c.json({
      id: 'opt-001',
      type: 'SCALE_UP',
      current: '2x Lambda (1024MB)',
      recommended: '5x Lambda (2048MB)',
      projectedSavings: '-$200/mo', // Performance cost
      reason: 'High CPU saturation detected due to tenant load.'
    })
  }
  
  return c.json({ recommendations: [] })
})

import { serve } from '@hono/node-server'

serve({
  fetch: app.fetch,
  port: 3001
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})

export default app
