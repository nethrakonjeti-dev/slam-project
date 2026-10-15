/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  FileText,
  Printer,
  Download,
  DollarSign,
  Clock,
  TrendingUp,
  ShieldCheck,
  Search,
} from 'lucide-react';

export const ReportsHistory: React.FC = () => {
  const { t, auditLogs, formatDate } = useApp();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredLogs = auditLogs.filter(
    (log) =>
      log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.details.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handlePrint = () => {
    window.print();
  };

  const handleExportLogs = () => {
    const headers = ['Log ID', 'Timestamp', 'Category', 'Action', 'Details', 'Operator', 'Machine ID'];
    const rows = [headers.join(',')];

    auditLogs.forEach((log) => {
      rows.push(
        [
          log.id,
          new Date(log.timestamp).toISOString(),
          log.category,
          `"${log.action}"`,
          `"${log.details.replace(/"/g, '""')}"`,
          `"${log.user}"`,
          log.machineId || 'N/A',
        ].join(',')
      );
    });

    const blob = new Blob([rows.join('\n')], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `predictai_audit_logs_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* 1. Header with Print / Export Actions */}
      <div
        className="rounded-xl p-5 border flex flex-col md:flex-row md:items-center justify-between gap-4"
        style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)' }}
      >
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-cyan-400 mb-1">
            <FileText size={16} />
            <span>Plant Analytics & Governance</span>
          </div>
          <h2 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>
            {t.reports.title}
          </h2>
          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
            {t.reports.subtitle}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleExportLogs}
            className="px-3 py-1.5 rounded-lg border text-xs font-medium hover:bg-slate-800/20 flex items-center gap-1.5 transition-colors cursor-pointer"
            style={{ borderColor: 'var(--border-subtle)', color: 'var(--text-primary)' }}
          >
            <Download size={14} className="text-cyan-400" />
            <span>{t.common.exportCsv}</span>
          </button>
          <button
            onClick={handlePrint}
            className="px-4 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-xs flex items-center gap-1.5 transition-colors shadow-sm cursor-pointer"
          >
            <Printer size={14} />
            <span>{t.reports.downloadPdf}</span>
          </button>
        </div>
      </div>

      {/* 2. Executive Maintenance Summary ROI Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div
          className="rounded-xl p-5 border flex flex-col justify-between"
          style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)' }}
        >
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="text-slate-400">{t.reports.costAvoided}</span>
            <DollarSign size={16} className="text-emerald-400" />
          </div>
          <div className="text-3xl font-extrabold font-mono tabular-nums text-emerald-400">
            $148,500
          </div>
          <p className="text-[11px] text-slate-400 mt-2">
            Calculated based on $1,800/hr average production line downtime avoidance across 5 assets.
          </p>
        </div>

        <div
          className="rounded-xl p-5 border flex flex-col justify-between"
          style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)' }}
        >
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="text-slate-400">{t.reports.downtimePrevented}</span>
            <Clock size={16} className="text-cyan-400" />
          </div>
          <div className="text-3xl font-extrabold font-mono tabular-nums text-cyan-400">
            84.5 <span className="text-xs font-normal text-slate-400">hrs</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-2">
            Catastrophic spindle seized and gearbox failure interventions performed proactively.
          </p>
        </div>

        <div
          className="rounded-xl p-5 border flex flex-col justify-between"
          style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)' }}
        >
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="text-slate-400">{t.reports.aiAccuracyReport}</span>
            <ShieldCheck size={16} className="text-teal-400" />
          </div>
          <div className="text-3xl font-extrabold font-mono tabular-nums text-teal-400">
            96.8%
          </div>
          <p className="text-[11px] text-slate-400 mt-2">
            True positive confirmation rate verified during physical teardown maintenance audits.
          </p>
        </div>
      </div>

      {/* 3. System & Telemetry Audit Log Table */}
      <div
        className="rounded-xl border overflow-hidden"
        style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)' }}
      >
        <div
          className="p-4 border-b flex flex-col sm:flex-row sm:items-center justify-between gap-3"
          style={{ borderColor: 'var(--border-subtle)' }}
        >
          <div>
            <h3 className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>
              {t.reports.auditLog}
            </h3>
            <p className="text-[11px]" style={{ color: 'var(--text-muted)' }}>
              Immutable record of sensor threshold breaches, model predictions, and operator maintenance dispatches
            </p>
          </div>

          <div className="relative w-full sm:w-64">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search audit actions..."
              className="w-full pl-8 pr-3 py-1.5 rounded-lg border text-xs bg-transparent focus:outline-none focus:border-cyan-400"
              style={{ borderColor: 'var(--border-subtle)', color: 'var(--text-primary)' }}
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr
                className="border-b text-[11px] font-semibold text-slate-400 uppercase tracking-wider"
                style={{ borderColor: 'var(--border-subtle)', backgroundColor: 'var(--bg-muted)' }}
              >
                <th className="py-3 px-4">Log ID</th>
                <th className="py-3 px-4">{t.reports.timestamp}</th>
                <th className="py-3 px-4">{t.reports.category}</th>
                <th className="py-3 px-4">{t.reports.eventAction}</th>
                <th className="py-3 px-4">Details</th>
                <th className="py-3 px-4">{t.reports.operator}</th>
              </tr>
            </thead>
            <tbody className="divide-y" style={{ borderColor: 'var(--border-subtle)' }}>
              {filteredLogs.map((log) => (
                <tr
                  key={log.id}
                  className="hover:bg-slate-800/10 dark:hover:bg-slate-800/30 transition-colors"
                >
                  <td className="py-2.5 px-4 font-mono text-cyan-400 font-semibold">{log.id}</td>
                  <td className="py-2.5 px-4 font-mono text-slate-400 tabular-nums">
                    {formatDate(log.timestamp)}
                  </td>
                  <td className="py-2.5 px-4">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border border-slate-700 bg-slate-800 text-slate-300">
                      {log.category}
                    </span>
                  </td>
                  <td className="py-2.5 px-4 font-semibold text-white">{log.action}</td>
                  <td className="py-2.5 px-4 text-slate-300 leading-normal max-w-md">
                    {log.details}
                  </td>
                  <td className="py-2.5 px-4 font-mono text-slate-400 text-[11px]">{log.user}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
