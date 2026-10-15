/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { DatasetItem } from '../../types';
import {
  Database,
  Upload,
  Download,
  Plus,
  Search,
  Filter,
  FileSpreadsheet,
  CheckCircle,
  AlertTriangle,
} from 'lucide-react';

export const DatasetExplorer: React.FC = () => {
  const {
    t,
    dataset,
    uploadCustomDataset,
    generateSampleDataset,
    formatNumber,
  } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [failureFilter, setFailureFilter] = useState<'all' | 'fail' | 'normal'>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Filtered dataset
  const filtered = dataset.filter((item) => {
    const matchesSearch =
      item.productId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.failureType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.type.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFailure =
      failureFilter === 'all'
        ? true
        : failureFilter === 'fail'
        ? item.machineFailure === 1
        : item.machineFailure === 0;

    return matchesSearch && matchesFailure;
  });

  const totalPages = Math.ceil(filtered.length / rowsPerPage) || 1;
  const paginatedData = filtered.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  // Summary stats
  const totalCount = dataset.length;
  const failureCount = dataset.filter((d) => d.machineFailure === 1).length;
  const failureRate = totalCount > 0 ? ((failureCount / totalCount) * 100).toFixed(1) : '0.0';
  const avgToolWear =
    totalCount > 0 ? Math.round(dataset.reduce((acc, d) => acc + d.toolWearMin, 0) / totalCount) : 0;

  // Handle CSV upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      const text = evt.target?.result as string;
      if (!text) return;

      try {
        if (file.name.endsWith('.json')) {
          const parsed = JSON.parse(text);
          if (Array.isArray(parsed)) {
            uploadCustomDataset(parsed);
          }
        } else {
          // Basic CSV parse
          const lines = text.split('\n').filter((l) => l.trim().length > 0);
          const parsedItems: DatasetItem[] = [];
          for (let i = 1; i < lines.length; i++) {
            const cols = lines[i].split(',').map((c) => c.trim().replace(/^"|"$/g, ''));
            if (cols.length >= 8) {
              parsedItems.push({
                id: i,
                udi: cols[0] || String(i),
                productId: cols[1] || `P${1000 + i}`,
                type: (cols[2] as 'L' | 'M' | 'H') || 'M',
                airTempK: parseFloat(cols[3]) || 298.1,
                processTempK: parseFloat(cols[4]) || 308.5,
                rotationalSpeedRpm: parseInt(cols[5], 10) || 1500,
                torqueNm: parseFloat(cols[6]) || 40.0,
                toolWearMin: parseInt(cols[7], 10) || 5,
                machineFailure: (parseInt(cols[8], 10) === 1 ? 1 : 0) as 0 | 1,
                failureType: cols[9] || (parseInt(cols[8], 10) === 1 ? 'Power Failure' : 'No Failure'),
              });
            }
          }
          if (parsedItems.length > 0) {
            uploadCustomDataset(parsedItems);
          }
        }
      } catch (err) {
        console.error('File parse error', err);
      }
    };
    reader.readAsText(file);
  };

  // Export CSV
  const handleExportCsv = () => {
    const headers = [
      'UDI',
      'Product ID',
      'Type',
      'Air temperature [K]',
      'Process temperature [K]',
      'Rotational speed [rpm]',
      'Torque [Nm]',
      'Tool wear [min]',
      'Machine failure',
      'Failure Type',
    ];

    const csvRows = [headers.join(',')];
    dataset.forEach((row) => {
      csvRows.push(
        [
          row.udi,
          row.productId,
          row.type,
          row.airTempK,
          row.processTempK,
          row.rotationalSpeedRpm,
          row.torqueNm,
          row.toolWearMin,
          row.machineFailure,
          `"${row.failureType}"`,
        ].join(',')
      );
    });

    const blob = new Blob([csvRows.join('\n')], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `predictai_iot_dataset_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* 1. Header with Actions */}
      <div
        className="rounded-xl p-5 border flex flex-col md:flex-row md:items-center justify-between gap-4"
        style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)' }}
      >
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-cyan-400 mb-1">
            <Database size={16} />
            <span>Industrial IoT Data Repository</span>
          </div>
          <h2 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>
            {t.dataset.title}
          </h2>
          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
            {t.dataset.subtitle}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept=".csv,.json"
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="px-3 py-1.5 rounded-lg border font-medium text-xs hover:bg-slate-800/20 flex items-center gap-1.5 transition-colors cursor-pointer"
            style={{ borderColor: 'var(--border-subtle)', color: 'var(--text-primary)' }}
          >
            <Upload size={14} className="text-cyan-400" />
            <span>{t.dataset.uploadDataset}</span>
          </button>

          <button
            onClick={generateSampleDataset}
            className="px-3 py-1.5 rounded-lg border font-medium text-xs hover:bg-cyan-500/10 text-cyan-400 border-cyan-500/30 flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Plus size={14} />
            <span>{t.dataset.generateSample}</span>
          </button>

          <button
            onClick={handleExportCsv}
            className="px-3 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-medium text-xs flex items-center gap-1.5 transition-colors shadow-sm cursor-pointer"
          >
            <Download size={14} />
            <span>{t.common.exportCsv}</span>
          </button>
        </div>
      </div>

      {/* 2. Statistical KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div
          className="rounded-xl p-4 border"
          style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)' }}
        >
          <span className="text-xs text-slate-400 block">{t.dataset.totalRecords}</span>
          <div className="text-2xl font-bold font-mono tabular-nums text-white mt-1">
            {formatNumber(totalCount, 0)}
          </div>
          <span className="text-[11px] text-slate-500">Benchmark Records</span>
        </div>

        <div
          className="rounded-xl p-4 border"
          style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)' }}
        >
          <span className="text-xs text-slate-400 block">{t.dataset.featuresCount}</span>
          <div className="text-2xl font-bold font-mono tabular-nums text-cyan-400 mt-1">
            10 Dimensions
          </div>
          <span className="text-[11px] text-slate-500">Multi-Spectral Parameters</span>
        </div>

        <div
          className="rounded-xl p-4 border"
          style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)' }}
        >
          <span className="text-xs text-slate-400 block">{t.dataset.failureRate}</span>
          <div className="text-2xl font-bold font-mono tabular-nums text-amber-400 mt-1">
            {failureRate}%
          </div>
          <span className="text-[11px] text-slate-500">{failureCount} Anomalous Samples</span>
        </div>

        <div
          className="rounded-xl p-4 border"
          style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)' }}
        >
          <span className="text-xs text-slate-400 block">{t.dataset.avgToolWear}</span>
          <div className="text-2xl font-bold font-mono tabular-nums text-teal-400 mt-1">
            {avgToolWear} min
          </div>
          <span className="text-[11px] text-slate-500">Mean Carbide Flank Wear</span>
        </div>
      </div>

      {/* 3. Filter and Search Controls */}
      <div
        className="rounded-xl p-4 border flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 text-xs"
        style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)' }}
      >
        <div className="flex-1 relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            placeholder={t.dataset.searchPlaceholder}
            className="w-full pl-8 pr-3 py-2 rounded-lg border bg-transparent focus:outline-none focus:border-cyan-400 transition-colors"
            style={{ borderColor: 'var(--border-subtle)', color: 'var(--text-primary)' }}
          />
        </div>

        {/* Failure Filter Segmented */}
        <div
          className="flex items-center gap-1 p-1 rounded-lg border shrink-0"
          style={{ backgroundColor: 'var(--bg-muted)', borderColor: 'var(--border-subtle)' }}
        >
          <button
            onClick={() => {
              setFailureFilter('all');
              setCurrentPage(1);
            }}
            className={`px-3 py-1 rounded-md transition-colors ${
              failureFilter === 'all'
                ? 'bg-cyan-600 text-white font-semibold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {t.common.all}
          </button>
          <button
            onClick={() => {
              setFailureFilter('fail');
              setCurrentPage(1);
            }}
            className={`px-3 py-1 rounded-md transition-colors ${
              failureFilter === 'fail'
                ? 'bg-red-600 text-white font-semibold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Failures Only
          </button>
          <button
            onClick={() => {
              setFailureFilter('normal');
              setCurrentPage(1);
            }}
            className={`px-3 py-1 rounded-md transition-colors ${
              failureFilter === 'normal'
                ? 'bg-emerald-600 text-white font-semibold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Normal Only
          </button>
        </div>
      </div>

      {/* 4. Telemetry Records Table */}
      <div
        className="rounded-xl border overflow-hidden"
        style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)' }}
      >
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr
                className="border-b text-[11px] font-semibold text-slate-400 uppercase tracking-wider"
                style={{ borderColor: 'var(--border-subtle)', backgroundColor: 'var(--bg-muted)' }}
              >
                <th className="py-3 px-3">UID</th>
                <th className="py-3 px-3">Product ID</th>
                <th className="py-3 px-3">Type</th>
                <th className="py-3 px-3 font-mono">Air Temp (K)</th>
                <th className="py-3 px-3 font-mono">Process Temp (K)</th>
                <th className="py-3 px-3 font-mono">Speed (RPM)</th>
                <th className="py-3 px-3 font-mono">Torque (Nm)</th>
                <th className="py-3 px-3 font-mono">Tool Wear</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-3">Failure Classification</th>
              </tr>
            </thead>
            <tbody className="divide-y" style={{ borderColor: 'var(--border-subtle)' }}>
              {paginatedData.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-slate-800/10 dark:hover:bg-slate-800/30 transition-colors"
                >
                  <td className="py-2.5 px-3 font-mono text-slate-400">{item.udi}</td>
                  <td className="py-2.5 px-3 font-semibold text-cyan-400">{item.productId}</td>
                  <td className="py-2.5 px-3 font-mono text-slate-300">{item.type}</td>
                  <td className="py-2.5 px-3 font-mono tabular-nums">{item.airTempK}</td>
                  <td className="py-2.5 px-3 font-mono tabular-nums">{item.processTempK}</td>
                  <td className="py-2.5 px-3 font-mono tabular-nums">{item.rotationalSpeedRpm}</td>
                  <td className="py-2.5 px-3 font-mono tabular-nums">{item.torqueNm}</td>
                  <td className="py-2.5 px-3 font-mono tabular-nums">{item.toolWearMin} min</td>
                  <td className="py-2.5 px-3">
                    {item.machineFailure === 1 ? (
                      <span className="text-red-400 font-semibold flex items-center gap-1 text-[11px]">
                        <AlertTriangle size={12} />
                        <span>Failure</span>
                      </span>
                    ) : (
                      <span className="text-emerald-400 font-medium flex items-center gap-1 text-[11px]">
                        <CheckCircle size={12} />
                        <span>Nominal</span>
                      </span>
                    )}
                  </td>
                  <td className="py-2.5 px-3 text-slate-300 text-[11px]">
                    {item.failureType}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination bar */}
        <div
          className="p-3 border-t flex items-center justify-between text-xs text-slate-400"
          style={{ borderColor: 'var(--border-subtle)' }}
        >
          <span>
            Showing {(currentPage - 1) * rowsPerPage + 1} -{' '}
            {Math.min(currentPage * rowsPerPage, filtered.length)} of {filtered.length} entries
          </span>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-2.5 py-1 rounded border disabled:opacity-30 hover:bg-slate-800/20"
              style={{ borderColor: 'var(--border-subtle)' }}
            >
              Prev
            </button>
            <span className="px-2 font-mono tabular-nums font-semibold text-white">
              {currentPage} / {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-2.5 py-1 rounded border disabled:opacity-30 hover:bg-slate-800/20"
              style={{ borderColor: 'var(--border-subtle)' }}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
