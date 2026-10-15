/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { AlertSeverity } from '../../types';
import {
  AlertTriangle,
  CheckCircle,
  Bell,
  Sliders,
  ArrowUpRight,
  ShieldCheck,
  RotateCcw,
} from 'lucide-react';

export const AlertsNotifications: React.FC = () => {
  const {
    t,
    alerts,
    acknowledgeAlert,
    resolveAlert,
    escalateAlertToWorkOrder,
    formatDate,
    settings,
  } = useApp();

  const [severityFilter, setSeverityFilter] = useState<'all' | AlertSeverity>('all');

  const filteredAlerts = alerts.filter((a) =>
    severityFilter === 'all' ? true : a.severity === severityFilter
  );

  return (
    <div className="space-y-6">
      {/* 1. Header with Severity Segmented Tabs */}
      <div
        className="rounded-xl p-5 border flex flex-col md:flex-row md:items-center justify-between gap-4"
        style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)' }}
      >
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-cyan-400 mb-1">
            <Bell size={16} />
            <span>Industrial Incident Dispatch</span>
          </div>
          <h2 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>
            {t.alerts.title}
          </h2>
          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
            {t.alerts.subtitle}
          </p>
        </div>

        {/* Severity Filter Controls */}
        <div
          className="flex items-center gap-1 p-1 rounded-lg border text-xs"
          style={{ backgroundColor: 'var(--bg-muted)', borderColor: 'var(--border-subtle)' }}
        >
          <button
            onClick={() => setSeverityFilter('all')}
            className={`px-3 py-1.5 rounded-md font-semibold transition-colors ${
              severityFilter === 'all'
                ? 'bg-cyan-600 text-white shadow-xs'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {t.common.all} ({alerts.length})
          </button>
          <button
            onClick={() => setSeverityFilter('critical')}
            className={`px-3 py-1.5 rounded-md font-semibold transition-colors ${
              severityFilter === 'critical'
                ? 'bg-red-600 text-white shadow-xs'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {t.common.critical} ({alerts.filter((a) => a.severity === 'critical').length})
          </button>
          <button
            onClick={() => setSeverityFilter('warning')}
            className={`px-3 py-1.5 rounded-md font-semibold transition-colors ${
              severityFilter === 'warning'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {t.common.warning} ({alerts.filter((a) => a.severity === 'warning').length})
          </button>
        </div>
      </div>

      {/* 2. Automated Trigger Rules Card */}
      <div
        className="rounded-xl p-4 border text-xs"
        style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)' }}
      >
        <div className="flex items-center gap-2 mb-2 font-semibold text-slate-300">
          <Sliders size={14} className="text-cyan-400" />
          <span>{t.alerts.triggerRules}</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-slate-400">
          <div className="p-2.5 rounded-lg border bg-black/20" style={{ borderColor: 'var(--border-subtle)' }}>
            <span className="text-white font-medium block">Radial Vibration (RMS)</span>
            <span>Warning &gt; {settings.vibrationWarningThreshold} mm/s · Critical &gt; {settings.vibrationCriticalThreshold} mm/s</span>
          </div>
          <div className="p-2.5 rounded-lg border bg-black/20" style={{ borderColor: 'var(--border-subtle)' }}>
            <span className="text-white font-medium block">Bearing Temperature</span>
            <span>Warning &gt; {settings.tempWarningThreshold} °C · Critical &gt; {settings.tempCriticalThreshold} °C</span>
          </div>
          <div className="p-2.5 rounded-lg border bg-black/20" style={{ borderColor: 'var(--border-subtle)' }}>
            <span className="text-white font-medium block">Ultrasonic Acoustic Emission</span>
            <span>Warning &gt; 75 dB · Critical &gt; 82 dB (Hilbert Enveloped)</span>
          </div>
        </div>
      </div>

      {/* 3. Incident Stream List */}
      <div className="space-y-3">
        {filteredAlerts.map((alert) => {
          const isCrit = alert.severity === 'critical';
          const isWarn = alert.severity === 'warning';

          return (
            <div
              key={alert.id}
              className={`rounded-xl p-4 sm:p-5 border transition-all ${
                alert.resolved ? 'opacity-60 bg-black/10' : ''
              }`}
              style={{
                backgroundColor: 'var(--bg-surface)',
                borderColor: isCrit
                  ? 'rgba(239, 68, 68, 0.4)'
                  : isWarn
                  ? 'rgba(245, 158, 11, 0.4)'
                  : 'var(--border-subtle)',
              }}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <span
                    className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                      isCrit
                        ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                        : isWarn
                        ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                        : 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                    }`}
                  >
                    {alert.severity}
                  </span>
                  <span className="font-mono text-xs font-semibold text-slate-300">{alert.id}</span>
                  <span className="text-slate-500">·</span>
                  <span className="text-xs font-bold text-white">{alert.machineName}</span>
                </div>

                <span className="text-[11px] font-mono text-slate-400">
                  {formatDate(alert.timestamp)}
                </span>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed mb-3">
                {alert.message}
              </p>

              <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t text-xs" style={{ borderColor: 'var(--border-subtle)' }}>
                <div className="flex items-center gap-4 text-[11px] text-slate-400">
                  <span>
                    Metric: <strong className="text-white">{alert.metric}</strong>
                  </span>
                  <span>
                    Recorded: <strong className="font-mono text-cyan-400">{alert.value}</strong>
                  </span>
                  <span>
                    Threshold: <span className="font-mono">{alert.threshold}</span>
                  </span>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  {!alert.acknowledged && (
                    <button
                      onClick={() => acknowledgeAlert(alert.id)}
                      className="px-3 py-1 rounded-md border text-slate-300 hover:bg-slate-700/20 text-xs font-medium transition-colors"
                      style={{ borderColor: 'var(--border-subtle)' }}
                    >
                      {t.alerts.acknowledge}
                    </button>
                  )}

                  {!alert.resolved && (
                    <>
                      <button
                        onClick={() => resolveAlert(alert.id)}
                        className="px-3 py-1 rounded-md bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-medium transition-colors"
                      >
                        {t.alerts.resolve}
                      </button>

                      <button
                        onClick={() => escalateAlertToWorkOrder(alert.id)}
                        className="px-3 py-1 rounded-md bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-medium flex items-center gap-1 transition-colors"
                      >
                        <span>{t.alerts.escalateToOrder}</span>
                        <ArrowUpRight size={13} />
                      </button>
                    </>
                  )}

                  {alert.resolved && (
                    <span className="flex items-center gap-1 text-emerald-400 font-semibold text-xs">
                      <CheckCircle size={14} />
                      <span>{t.alerts.resolved}</span>
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {filteredAlerts.length === 0 && (
          <div
            className="py-12 rounded-xl border text-center p-6 flex flex-col items-center justify-center gap-2"
            style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)' }}
          >
            <ShieldCheck size={32} className="text-emerald-500" />
            <span className="text-sm font-semibold text-white">Zero Active Alarms</span>
            <p className="text-xs text-slate-400 max-w-sm">
              {t.alerts.noAlerts}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
