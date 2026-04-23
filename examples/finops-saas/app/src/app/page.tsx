'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  Users, 
  TrendingUp, 
  Zap, 
  ShieldCheck, 
  Settings,
  ChevronDown,
  Activity,
  DollarSign,
  Clock
} from 'lucide-react';

// --- Types ---
type Tenant = 'Acme Corp' | 'Globex';

export default function Dashboard() {
  const [activeTenant, setActiveTenant] = useState<Tenant>('Acme Corp');
  const [isSimulating, setIsSimulating] = useState(false);
  const [metrics, setMetrics] = useState({ cpu: 42, cost: 420, latency: 96 });

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        ...prev,
        cpu: prev.cpu + (Math.random() - 0.5) * 2,
        latency: prev.latency + (Math.random() - 0.5) * 5
      }));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const triggerSpike = () => {
    setIsSimulating(true);
    setMetrics({ cpu: 92, cost: 1250, latency: 450 });
  };

  const applyOptimization = () => {
    setIsSimulating(false);
    setMetrics({ cpu: 45, cost: 650, latency: 110 });
  };

  return (
    <div className="flex h-screen bg-slate-950 text-slate-50 font-sans overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 border-r border-slate-800 bg-slate-900/50 backdrop-blur-xl p-6 flex flex-col gap-8">
        <div className="flex items-center gap-3 px-2">
          <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-xl tracking-tight">FinOps Central</span>
        </div>

        <nav className="flex-1 flex flex-col gap-2">
          <NavItem icon={<LayoutDashboard size={20} />} label="Overview" active />
          <NavItem icon={<Activity size={20} />} label="Analytics" />
          <NavItem icon={<DollarSign size={20} />} label="Cost Management" />
          <NavItem icon={<ShieldCheck size={20} />} label="Security" />
        </nav>

        <div className="mt-auto pt-6 border-t border-slate-800">
          <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider px-2">Tenant Selector</label>
          <div className="mt-2 relative">
            <button className="w-full flex items-center justify-between px-3 py-2 bg-slate-800 rounded-lg border border-slate-700 hover:border-indigo-500 transition-colors">
              <span className="font-medium text-sm">{activeTenant}</span>
              <ChevronDown size={16} className="text-slate-500" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-8 lg:p-12">
        <header className="flex justify-between items-start mb-12">
          <div>
            <h1 className="text-3xl font-bold mb-2">Overview Dashboard</h1>
            <p className="text-slate-400">Policy-driven optimization for <span className="text-indigo-400 font-medium">{activeTenant}</span></p>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-slate-900 border border-slate-800 rounded-full px-4 py-2 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-sm font-medium">System Live (Floci)</span>
            </div>
          </div>
        </header>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <MetricCard 
            title="Usage Metrics" 
            value={`${metrics.cpu.toFixed(1)}%`} 
            label="Total CPU Load" 
            trend="+14.2%" 
            color="indigo" 
          />
          <MetricCard 
            title="Cost (USD)" 
            value={`$${metrics.cost.toLocaleString()}`} 
            label="Projected Monthly Spend" 
            trend="-3.8%" 
            color="purple" 
          />
          <MetricCard 
            title="Avg Latency" 
            value={`${metrics.latency.toFixed(0)}ms`} 
            label="System Response Time" 
            trend="-2.1%" 
            color="orange" 
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Optimization Panel */}
          <section className="bg-slate-900/40 border border-slate-800 rounded-2xl p-8 backdrop-blur-sm">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-xl font-bold">Infrastructure Optimization</h2>
              {isSimulating && (
                <motion.button 
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  onClick={applyOptimization}
                  className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-2 rounded-xl font-bold transition-all shadow-lg shadow-indigo-500/20"
                >
                  Apply Changes →
                </motion.button>
              )}
            </div>

            <div className="grid grid-cols-2 gap-8 relative">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-slate-700 font-bold text-sm">VS</div>
              <div className="p-6 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-xs font-bold text-slate-500 uppercase mb-4 block">Current Infra</span>
                <p className="font-bold text-lg mb-1">EKS-Cluster-Prod</p>
                <p className="text-sm text-slate-400 mb-4">c6g.4xlarge</p>
                <div className="text-2xl font-bold text-slate-200">$12,800/mo</div>
              </div>
              <div className="p-6 rounded-xl bg-indigo-500/5 border border-indigo-500/20">
                <span className="text-xs font-bold text-indigo-400 uppercase mb-4 block">Recommended</span>
                <p className="font-bold text-lg mb-1">EKS-Cluster-Opti</p>
                <p className="text-sm text-slate-400 mb-4">c6g.2xlarge</p>
                <div className="text-2xl font-bold text-indigo-400">$9,150/mo</div>
                <div className="text-xs text-emerald-400 font-medium mt-1">v 28.5% savings</div>
              </div>
            </div>
          </section>

          {/* Simulation Controls */}
          <section className="bg-slate-900/40 border border-slate-800 rounded-2xl p-8 backdrop-blur-sm">
            <h2 className="text-xl font-bold mb-8">Simulation Controls</h2>
            <div className="flex flex-col gap-6">
              <div className="p-6 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                <div>
                  <p className="font-bold mb-1">Scenario: Traffic Spike</p>
                  <p className="text-sm text-slate-400">Onboard 10k users for {activeTenant}</p>
                </div>
                <button 
                  onClick={triggerSpike}
                  disabled={isSimulating}
                  className="bg-slate-800 hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed px-6 py-2 rounded-lg font-bold transition-all border border-slate-700"
                >
                  Run Simulation
                </button>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

function NavItem({ icon, label, active = false }: { icon: React.ReactNode, label: string, active?: boolean }) {
  return (
    <a href="#" className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${active ? 'bg-indigo-500/10 text-indigo-400 font-semibold' : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'}`}>
      {icon}
      <span className="text-sm">{label}</span>
    </a>
  );
}

function MetricCard({ title, value, label, trend, color }: { title: string, value: string, label: string, trend: string, color: 'indigo' | 'purple' | 'orange' }) {
  const colorMap = {
    indigo: 'from-indigo-500/20 to-indigo-500/5 border-indigo-500/20 text-indigo-400',
    purple: 'from-purple-500/20 to-purple-500/5 border-purple-500/20 text-purple-400',
    orange: 'from-orange-500/20 to-orange-500/5 border-orange-500/20 text-orange-400',
  };

  return (
    <div className={`p-6 rounded-2xl border bg-gradient-to-br ${colorMap[color]} backdrop-blur-sm`}>
      <div className="flex justify-between items-start mb-4">
        <span className="text-xs font-bold uppercase tracking-wider opacity-60">{title}</span>
        <div className="bg-white/5 px-2 py-1 rounded text-xs font-bold">{trend}</div>
      </div>
      <div className="text-3xl font-black mb-1">{value}</div>
      <div className="text-xs opacity-60 font-medium">{label}</div>
    </div>
  );
}
