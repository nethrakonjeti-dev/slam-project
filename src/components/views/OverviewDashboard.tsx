/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Activity,
  AlertTriangle,
  Zap,
  TrendingDown,
  Layers,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Clock,
} from 'lucide-react';

export const OverviewDashboard: React.FC = () => {
  const {
    t,
    machines,
    setActiveTab,
    setSelectedMachineId,
    simulateAnomaly,
    formatNumber,
    alerts,
  } = useApp();

  const [activeTelemetryTab, setActiveTelemetryTab] = useState<'vibration' | 'temperature' | 'pressure' | 'acoustic'>('vibration');

  // Compute fleet KPIs
  const totalMachines = machines.length;
  const avgHealth = Math.round(machines.reduce((acc, m) => acc + m.healthScore, 0) / totalMachines);
  const highRiskCount = machines.filter((m) => m.failureRisk > 40).length;
  const avgRul = Math.round(machines.reduce((acc, m) => acc + m.predictedRulHours, 0) / totalMachines);

  // Selected telemetry preview (defaults to first machine or highest risk machine)
  const focalMachine = machines.find((m) => m.status === 'warning' || m.status === 'critical') || machines[0];
  const history = focalMachine.history;

  // Chart min/max scaling
  const values = history.map((h) => h[activeTelemetryTab]);
  const minVal = Math.min(...values);
  const maxVal = Math.max(...values);
  const range = maxVal - minVal || 1;

  // Generate SVG path for telemetry trend
  const svgWidth = 600;
  const svgHeight = 160;
  const paddingY = 20;

  const points = history.map((h, i) => {
    const x = (i / (history.length - 1)) * svgWidth;
    const y = svgHeight - paddingY - ((h[activeTelemetryTab] - minVal) / range) * (svgHeight - paddingY * 2);
    return `${x},${y}`;
  });

  const pathD = `M ${points.join(' L ')}`;
  const areaD = `${pathD} L ${svgWidth},${svgHeight} L 0,${svgHeight} Z`;

  return (
    <div className="space-y-6">
      {/* 1. Welcome Section & Machine Illustration Banner */}
      <div
        className="rounded-xl p-5 sm:p-6 border relative overflow-hidden transition-colors"
        style={{
          backgroundColor: 'var(--bg-surface)',
          borderColor: 'var(--border-subtle)',
        }}
      >
        <div className="relative z-10 max-w-2xl">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-cyan-400 mb-2">
            <Sparkles size={14} />
            <span>{t.studentProject}</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight mb-2" style={{ color: 'var(--text-primary)' }}>
            {t.overview.title}
          </h1>
          <p className="text-xs sm:text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            {t.overview.subtitle}
          </p>

          <div className="flex flex-wrap items-center gap-3 mt-4">
            <button
              onClick={() => setActiveTab('prediction')}
              className="px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-medium text-xs flex items-center gap-2 transition-colors shadow-sm"
            >
              <span>{t.overview.runAiDiagnostic}</span>
              <ArrowRight size={14} />
            </button>
            <button
              onClick={() => setActiveTab('monitoring')}
              className="px-4 py-2 rounded-lg border font-medium text-xs hover:bg-slate-800/20 transition-colors"
              style={{
                borderColor: 'var(--border-strong)',
                color: 'var(--text-primary)',
              }}
            >
              {t.overview.viewMonitoring}
            </button>
          </div>
        </div>

        {/* Industrial Machine Vector Graphic Illustration */}
        <div className="hidden md:block absolute right-4 top-1/2 -translate-y-1/2 opacity-25 lg:opacity-40 pointer-events-none">
          <svg width="280" height="180" viewBox="0 0 280 180" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Turbine / Lathe / CNC machine body silhouette */}
            <rect x="40" y="70" width="200" height="80" rx="6" stroke="#06b6d4" strokeWidth="2" strokeDasharray="4 4" />
            <circle cx="100" cy="110" r="30" stroke="#14b8a6" strokeWidth="2" />
            <circle cx="100" cy="110" r="16" stroke="#06b6d4" strokeWidth="1.5" />
            <path d="M100 80V140M70 110H130" stroke="#38bdf8" strokeWidth="1.5" strokeLinecap="round" />
            <rect x="145" y="90" width="80" height="40" rx="3" stroke="#06b6d4" strokeWidth="1.5" />
            <path d="M160 90V130M180 90V130M200 90V130" stroke="#38bdf8" strokeWidth="1" strokeDasharray="2 2" />
            {/* Sensor probe arrows */}
            <path d="M100 50V75M100 75L96 68M100 75L104 68" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="100" cy="46" r="4" fill="#f59e0b" />
            <path d="M185 65V85M185 85L181 78M185 85L189 78" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="185" cy="61" r="4" fill="#10b981" />
            {/* Base vibration foundation */}
            <path d="M20 155H260M30 162H250M45 168H235" stroke="#64748b" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>
      </div>

      {/* 2. Fleet Health KPI Strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1: Fleet Health */}
        <div
          className="rounded-xl p-4 border transition-colors"
          style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)' }}
        >
          <div className="flex items-center justify-between text-xs mb-2" style={{ color: 'var(--text-muted)' }}>
            <span>{t.overview.fleetHealth}</span>
            <ShieldCheck size={16} className="text-emerald-500" />
          </div>
          <div className="text-2xl font-bold font-mono tabular-nums text-emerald-400">
            {avgHealth}%
          </div>
          <div className="text-[11px] mt-1 text-slate-400 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span>ISO 10816 Class II Compliant</span>
          </div>
        </div>

        {/* KPI 2: Monitored Assets */}
        <div
          className="rounded-xl p-4 border transition-colors"
          style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)' }}
        >
          <div className="flex items-center justify-between text-xs mb-2" style={{ color: 'var(--text-muted)' }}>
            <span>{t.overview.activeAssets}</span>
            <Layers size={16} className="text-cyan-400" />
          </div>
          <div className="text-2xl font-bold font-mono tabular-nums" style={{ color: 'var(--text-primary)' }}>
            0{totalMachines}
          </div>
          <div className="text-[11px] mt-1 text-slate-400">
            5 Industrial Nodes Transmitting
          </div>
        </div>

        {/* KPI 3: High Risk Machines */}
        <div
          className="rounded-xl p-4 border transition-colors"
          style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)' }}
        >
          <div className="flex items-center justify-between text-xs mb-2" style={{ color: 'var(--text-muted)' }}>
            <span>{t.overview.highRiskMachines}</span>
            <AlertTriangle size={16} className="text-amber-500" />
          </div>
          <div className="text-2xl font-bold font-mono tabular-nums text-amber-400">
            {highRiskCount}
          </div>
          <div className="text-[11px] mt-1 text-slate-400">
            {highRiskCount > 0 ? 'Maintenance attention required' : 'Zero elevated risk units'}
          </div>
        </div>

        {/* KPI 4: Average RUL */}
        <div
          className="rounded-xl p-4 border transition-colors"
          style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)' }}
        >
          <div className="flex items-center justify-between text-xs mb-2" style={{ color: 'var(--text-muted)' }}>
            <span>{t.overview.avgRul}</span>
            <Clock size={16} className="text-teal-400" />
          </div>
          <div className="text-2xl font-bold font-mono tabular-nums text-teal-400">
            {avgRul} <span className="text-xs font-normal text-slate-400">{t.common.hours}</span>
          </div>
          <div className="text-[11px] mt-1 text-slate-400">
            ~{Math.round(avgRul / 24)} {t.common.days} mean operating runway
          </div>
        </div>
      </div>

      {/* 3. Live Telemetry Stream Chart & Anomaly Feed (2-Column Split) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2 spans): Multi-Sensor Telemetry Live Wave */}
        <div
          className="lg:col-span-2 rounded-xl p-5 border flex flex-col justify-between"
          style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)' }}
        >
          <div>
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <div>
                <h3 className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>
                  {t.overview.liveTelemetry}
                </h3>
                <p className="text-[11px]" style={{ color: 'var(--text-muted)' }}>
                  Tracking focal asset: <span className="font-semibold text-cyan-400">{focalMachine.name}</span>
                </p>
              </div>

              {/* Segmented Metric Selector */}
              <div
                className="flex items-center gap-1 p-1 rounded-lg border text-xs"
                style={{ backgroundColor: 'var(--bg-muted)', borderColor: 'var(--border-subtle)' }}
              >
                <button
                  onClick={() => setActiveTelemetryTab('vibration')}
                  className={`px-2.5 py-1 rounded-md transition-colors ${
                    activeTelemetryTab === 'vibration'
                      ? 'bg-cyan-600 text-white font-semibold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {t.sensors.vibration}
                </button>
                <button
                  onClick={() => setActiveTelemetryTab('temperature')}
                  className={`px-2.5 py-1 rounded-md transition-colors ${
                    activeTelemetryTab === 'temperature'
                      ? 'bg-cyan-600 text-white font-semibold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {t.sensors.temperature}
                </button>
                <button
                  onClick={() => setActiveTelemetryTab('pressure')}
                  className={`px-2.5 py-1 rounded-md transition-colors ${
                    activeTelemetryTab === 'pressure'
                      ? 'bg-cyan-600 text-white font-semibold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {t.sensors.pressure}
                </button>
                <button
                  onClick={() => setActiveTelemetryTab('acoustic')}
                  className={`px-2.5 py-1 rounded-md transition-colors ${
                    activeTelemetryTab === 'acoustic'
                      ? 'bg-cyan-600 text-white font-semibold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {t.sensors.acoustic}
                </button>
              </div>
            </div>

            {/* Current Value Display */}
            <div className="flex items-baseline gap-2 mb-3">
              <span className="text-2xl font-bold font-mono tabular-nums text-cyan-400">
                {formatNumber(focalMachine.currentReading[activeTelemetryTab], 2)}
              </span>
              <span className="text-xs text-slate-400 font-medium">
                {activeTelemetryTab === 'vibration'
                  ? t.sensors.vibrationUnit
                  : activeTelemetryTab === 'temperature'
                  ? t.sensors.tempUnit
                  : activeTelemetryTab === 'pressure'
                  ? t.sensors.pressureUnit
                  : t.sensors.acousticUnit}
              </span>
              <span className="text-xs text-slate-500 ml-4">
                Min: {formatNumber(minVal, 1)} · Max: {formatNumber(maxVal, 1)}
              </span>
            </div>

            {/* Responsive Telemetry Chart SVG */}
            <div className="w-full h-44 relative border rounded-lg p-2 overflow-hidden" style={{ borderColor: 'var(--border-subtle)', backgroundColor: 'var(--bg-canvas)' }}>
              <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full h-full preserve-3d" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="telemetryGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                {/* Horizontal reference threshold lines */}
                <line x1="0" y1={svgHeight * 0.25} x2={svgWidth} y2={svgHeight * 0.25} stroke="rgba(255,255,255,0.08)" strokeDasharray="3 3" />
                <line x1="0" y1={svgHeight * 0.5} x2={svgWidth} y2={svgHeight * 0.5} stroke="rgba(255,255,255,0.08)" strokeDasharray="3 3" />
                <line x1="0" y1={svgHeight * 0.75} x2={svgWidth} y2={svgHeight * 0.75} stroke="rgba(255,255,255,0.08)" strokeDasharray="3 3" />

                {/* Shaded Area */}
                <path d={areaD} fill="url(#telemetryGrad)" />
                {/* Telemetry Trace Line */}
                <path d={pathD} fill="none" stroke="#06b6d4" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />

                {/* Last point pulse marker */}
                {points.length > 0 && (
                  <circle
                    cx={svgWidth}
                    cy={parseFloat(points[points.length - 1].split(',')[1])}
                    r="4"
                    fill="#38bdf8"
                    className="animate-ping"
                  />
                )}
              </svg>
            </div>
          </div>

          <div className="flex items-center justify-between text-[11px] text-slate-400 pt-3">
            <span>24 minutes buffer window</span>
            <span>Sampling: ISO 13373-1 Standard</span>
          </div>
        </div>

        {/* Right Column (1 span): Recent Anomaly Feed */}
        <div
          className="rounded-xl p-5 border flex flex-col justify-between"
          style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)' }}
        >
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>
                {t.overview.recentIncidents}
              </h3>
              <button
                onClick={() => setActiveTab('alerts')}
                className="text-xs text-cyan-400 hover:underline"
              >
                {t.common.viewAll}
              </button>
            </div>

            <div className="space-y-3">
              {alerts.slice(0, 3).map((alert) => (
                <div
                  key={alert.id}
                  className="p-3 rounded-lg border text-xs space-y-1 transition-colors"
                  style={{
                    backgroundColor: 'var(--bg-muted)',
                    borderColor: alert.severity === 'critical' ? 'rgba(239,68,68,0.4)' : 'var(--border-subtle)',
                  }}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>
                      {alert.machineName}
                    </span>
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider ${
                        alert.severity === 'critical'
                          ? 'text-red-400'
                          : alert.severity === 'warning'
                          ? 'text-amber-400'
                          : 'text-cyan-400'
                      }`}
                    >
                      {alert.severity}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-400 truncate">
                    {alert.metric}: <span className="font-mono text-white">{alert.value}</span> (Threshold {alert.threshold})
                  </div>
                </div>
              ))}

              {alerts.length === 0 && (
                <div className="py-8 text-center text-xs text-slate-400 flex flex-col items-center gap-2">
                  <CheckCircle2 size={24} className="text-emerald-500" />
                  <span>{t.overview.noActiveIncidents}</span>
                </div>
              )}
            </div>
          </div>

          <div className="pt-4 border-t mt-4" style={{ borderColor: 'var(--border-subtle)' }}>
            <button
              onClick={() => simulateAnomaly('M-01')}
              className="w-full py-2 rounded-lg border border-amber-500/40 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 font-medium text-xs flex items-center justify-center gap-1.5 transition-colors"
            >
              <Zap size={14} />
              <span>Simulate Incipient Anomaly (CNC-04)</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4. Machine Fleet Status Table / Cards */}
      <div
        className="rounded-xl border overflow-hidden"
        style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)' }}
      >
        <div
          className="p-4 sm:p-5 border-b flex flex-col sm:flex-row sm:items-center justify-between gap-2"
          style={{ borderColor: 'var(--border-subtle)' }}
        >
          <div>
            <h3 className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>
              {t.overview.machineFleetStatus}
            </h3>
            <p className="text-[11px]" style={{ color: 'var(--text-muted)' }}>
              Real-time multi-spectral health classification and remaining useful life estimates
            </p>
          </div>
        </div>

        {/* Responsive Desktop Table & Mobile Cards */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr
                className="border-b text-[11px] font-semibold text-slate-400 uppercase tracking-wider"
                style={{ borderColor: 'var(--border-subtle)', backgroundColor: 'var(--bg-muted)' }}
              >
                <th className="py-3 px-4">Equipment</th>
                <th className="py-3 px-4">Health Index</th>
                <th className="py-3 px-4">Vibration RMS</th>
                <th className="py-3 px-4">Bearing Temp</th>
                <th className="py-3 px-4">Failure Risk</th>
                <th className="py-3 px-4">Est. RUL</th>
                <th className="py-3 px-4 text-right">{t.common.actions}</th>
              </tr>
            </thead>
            <tbody className="divide-y" style={{ borderColor: 'var(--border-subtle)' }}>
              {machines.map((machine) => {
                const isWarn = machine.status === 'warning';
                const isCrit = machine.status === 'critical';

                return (
                  <tr
                    key={machine.id}
                    className="hover:bg-slate-800/10 dark:hover:bg-slate-800/30 transition-colors"
                  >
                    <td className="py-3 px-4">
                      <div className="font-semibold" style={{ color: 'var(--text-primary)' }}>
                        {machine.name}
                      </div>
                      <div className="text-[11px] text-slate-400">
                        {machine.id} · {machine.type}
                      </div>
                    </td>

                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-2 rounded-full bg-slate-700 overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              isCrit ? 'bg-red-500' : isWarn ? 'bg-amber-500' : 'bg-emerald-500'
                            }`}
                            style={{ width: `${machine.healthScore}%` }}
                          />
                        </div>
                        <span className="font-mono tabular-nums font-semibold" style={{ color: 'var(--text-primary)' }}>
                          {machine.healthScore}%
                        </span>
                      </div>
                    </td>

                    <td className="py-3 px-4 font-mono tabular-nums">
                      <span className={machine.currentReading.vibration > 4.5 ? 'text-amber-400 font-semibold' : ''}>
                        {formatNumber(machine.currentReading.vibration, 2)} mm/s
                      </span>
                    </td>

                    <td className="py-3 px-4 font-mono tabular-nums">
                      <span className={machine.currentReading.temperature > 75 ? 'text-amber-400 font-semibold' : ''}>
                        {formatNumber(machine.currentReading.temperature, 1)} °C
                      </span>
                    </td>

                    <td className="py-3 px-4">
                      <span
                        className={`font-mono tabular-nums font-semibold ${
                          machine.failureRisk > 50
                            ? 'text-red-400'
                            : machine.failureRisk > 25
                            ? 'text-amber-400'
                            : 'text-emerald-400'
                        }`}
                      >
                        {machine.failureRisk}%
                      </span>
                    </td>

                    <td className="py-3 px-4 font-mono tabular-nums text-slate-300">
                      {machine.predictedRulHours} hrs
                    </td>

                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => {
                            setSelectedMachineId(machine.id);
                            setActiveTab('monitoring');
                          }}
                          className="px-2.5 py-1 rounded border text-[11px] font-medium hover:bg-cyan-500/10 hover:text-cyan-400 transition-colors"
                          style={{ borderColor: 'var(--border-subtle)', color: 'var(--text-secondary)' }}
                        >
                          {t.common.details}
                        </button>
                        <button
                          onClick={() => {
                            setSelectedMachineId(machine.id);
                            setActiveTab('prediction');
                          }}
                          className="px-2.5 py-1 rounded bg-cyan-600/80 hover:bg-cyan-600 text-white text-[11px] font-medium transition-colors"
                        >
                          {t.overview.quickPrediction}
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
