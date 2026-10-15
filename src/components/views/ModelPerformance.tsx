/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { modelBenchmarks } from '../../data/initialData';
import { MLModelType } from '../../types';
import {
  LineChart,
  BarChart,
  CheckCircle,
  HelpCircle,
  Cpu,
  Layers,
  Award,
  Zap,
} from 'lucide-react';

export const ModelPerformance: React.FC = () => {
  const { t } = useApp();
  const [selectedModel, setSelectedModel] = useState<MLModelType>('xgboost');

  const currentBenchmark = modelBenchmarks.find((m) => m.type === selectedModel) || modelBenchmarks[0];

  // Confusion matrix values for selected model
  const matrixData: Record<MLModelType, { tp: number; fp: number; fn: number; tn: number }> = {
    xgboost: { tp: 194, fp: 6, fn: 7, tn: 1793 },
    random_forest: { tp: 189, fp: 9, fn: 11, tn: 1791 },
    lstm_autoencoder: { tp: 191, fp: 13, fn: 10, tn: 1786 },
    isolation_forest: { tp: 185, fp: 18, fn: 15, tn: 1782 },
  };

  const cm = matrixData[selectedModel];

  // Loss convergence curve data points (epochs 1 to 20)
  const lossPoints = [
    0.68, 0.54, 0.42, 0.35, 0.28, 0.22, 0.18, 0.15, 0.12, 0.10,
    0.085, 0.076, 0.068, 0.062, 0.058, 0.054, 0.051, 0.048, 0.046, 0.044,
  ];

  return (
    <div className="space-y-6">
      {/* 1. Header with Model Selector */}
      <div
        className="rounded-xl p-5 border flex flex-col md:flex-row md:items-center justify-between gap-4"
        style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)' }}
      >
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-cyan-400 mb-1">
            <Award size={16} />
            <span>Industrial ML Evaluation Benchmarks</span>
          </div>
          <h2 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>
            {t.models.title}
          </h2>
          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
            {t.models.subtitle}
          </p>
        </div>

        {/* Model Tabs */}
        <div
          className="flex flex-wrap items-center gap-1 p-1 rounded-lg border text-xs"
          style={{ backgroundColor: 'var(--bg-muted)', borderColor: 'var(--border-subtle)' }}
        >
          {modelBenchmarks.map((m) => (
            <button
              key={m.type}
              onClick={() => setSelectedModel(m.type)}
              className={`px-3 py-1.5 rounded-md font-semibold transition-colors ${
                selectedModel === m.type
                  ? 'bg-cyan-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {m.name.split(' ')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* 2. Model Comparison Scorecard Table */}
      <div
        className="rounded-xl border overflow-hidden"
        style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)' }}
      >
        <div className="p-4 border-b" style={{ borderColor: 'var(--border-subtle)' }}>
          <h3 className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>
            {t.models.comparisonScorecard} (Cross-Validated 5-Fold Stratified Split)
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr
                className="border-b text-[11px] font-semibold text-slate-400 uppercase tracking-wider"
                style={{ borderColor: 'var(--border-subtle)', backgroundColor: 'var(--bg-muted)' }}
              >
                <th className="py-3 px-4">Model Architecture</th>
                <th className="py-3 px-4 font-mono">{t.models.accuracy}</th>
                <th className="py-3 px-4 font-mono">{t.models.precision}</th>
                <th className="py-3 px-4 font-mono">{t.models.recall}</th>
                <th className="py-3 px-4 font-mono">{t.models.f1Score}</th>
                <th className="py-3 px-4 font-mono">{t.models.rocAuc}</th>
                <th className="py-3 px-4 font-mono">{t.models.latency}</th>
              </tr>
            </thead>
            <tbody className="divide-y" style={{ borderColor: 'var(--border-subtle)' }}>
              {modelBenchmarks.map((m) => {
                const isSelected = m.type === selectedModel;
                return (
                  <tr
                    key={m.type}
                    onClick={() => setSelectedModel(m.type)}
                    className={`cursor-pointer transition-colors ${
                      isSelected
                        ? 'bg-cyan-500/10 font-medium'
                        : 'hover:bg-slate-800/10 dark:hover:bg-slate-800/20'
                    }`}
                  >
                    <td className="py-3 px-4">
                      <div className="font-semibold text-white flex items-center gap-1.5">
                        <span>{m.name}</span>
                        {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />}
                      </div>
                      <div className="text-[10px] text-slate-400">{m.parameters}</div>
                    </td>
                    <td className="py-3 px-4 font-mono tabular-nums text-emerald-400 font-bold">
                      {m.accuracy}%
                    </td>
                    <td className="py-3 px-4 font-mono tabular-nums">{m.precision}%</td>
                    <td className="py-3 px-4 font-mono tabular-nums">{m.recall}%</td>
                    <td className="py-3 px-4 font-mono tabular-nums text-cyan-400 font-semibold">
                      {m.f1Score}%
                    </td>
                    <td className="py-3 px-4 font-mono tabular-nums text-teal-400">{m.rocAuc}</td>
                    <td className="py-3 px-4 font-mono tabular-nums text-slate-300">
                      {m.latencyMs} ms
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* 3. Confusion Matrix & ROC Curve (2-Column Grid) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Confusion Matrix Card */}
        <div
          className="rounded-xl p-5 border flex flex-col justify-between"
          style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)' }}
        >
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>
                {t.models.confusionMatrix} — {currentBenchmark.name}
              </h3>
              <span className="text-xs font-mono text-cyan-400">N = 2,000 Test Records</span>
            </div>
            <p className="text-[11px] text-slate-400 mb-4">
              Classification performance distinguishing between machine failure and nominal state.
            </p>

            {/* 2x2 Matrix Grid */}
            <div className="grid grid-cols-2 gap-3 max-w-sm mx-auto my-3">
              {/* True Positive */}
              <div className="p-4 rounded-xl border border-emerald-500/40 bg-emerald-500/10 text-center">
                <span className="text-[11px] text-emerald-400 font-semibold block">{t.models.truePositive}</span>
                <span className="text-3xl font-extrabold font-mono text-white mt-1 block">{cm.tp}</span>
                <span className="text-[10px] text-slate-400">Correctly Flagged Failures</span>
              </div>

              {/* False Positive */}
              <div className="p-4 rounded-xl border border-amber-500/40 bg-amber-500/10 text-center">
                <span className="text-[11px] text-amber-400 font-semibold block">{t.models.falsePositive}</span>
                <span className="text-3xl font-extrabold font-mono text-white mt-1 block">{cm.fp}</span>
                <span className="text-[10px] text-slate-400">False Alarms</span>
              </div>

              {/* False Negative */}
              <div className="p-4 rounded-xl border border-red-500/40 bg-red-500/10 text-center">
                <span className="text-[11px] text-red-400 font-semibold block">{t.models.falseNegative}</span>
                <span className="text-3xl font-extrabold font-mono text-white mt-1 block">{cm.fn}</span>
                <span className="text-[10px] text-slate-400">Missed Failures</span>
              </div>

              {/* True Negative */}
              <div className="p-4 rounded-xl border border-cyan-500/40 bg-cyan-500/10 text-center">
                <span className="text-[11px] text-cyan-400 font-semibold block">{t.models.trueNegative}</span>
                <span className="text-3xl font-extrabold font-mono text-white mt-1 block">{cm.tn}</span>
                <span className="text-[10px] text-slate-400">Correct Nominal Identifications</span>
              </div>
            </div>
          </div>

          <div className="flex justify-between text-[11px] text-slate-400 pt-3 border-t" style={{ borderColor: 'var(--border-subtle)' }}>
            <span>Type I Error Rate: {((cm.fp / (cm.fp + cm.tn)) * 100).toFixed(2)}%</span>
            <span>Type II Error Rate: {((cm.fn / (cm.fn + cm.tp)) * 100).toFixed(2)}%</span>
          </div>
        </div>

        {/* ROC & PR Curve SVG */}
        <div
          className="rounded-xl p-5 border flex flex-col justify-between"
          style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)' }}
        >
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>
                {t.models.rocCurve} & PR Trade-off
              </h3>
              <span className="text-xs font-mono text-emerald-400 font-bold">
                AUC = {currentBenchmark.rocAuc}
              </span>
            </div>
            <p className="text-[11px] text-slate-400 mb-4">
              True Positive Rate vs. False Positive Rate curve across sensitivity thresholds.
            </p>

            <div className="h-48 w-full border rounded-lg bg-black/30 p-3 flex items-center justify-center relative" style={{ borderColor: 'var(--border-subtle)' }}>
              <svg viewBox="0 0 300 150" className="w-full h-full">
                {/* Diagonal baseline */}
                <line x1="20" y1="130" x2="280" y2="20" stroke="rgba(255,255,255,0.15)" strokeDasharray="3 3" />
                {/* Axes */}
                <line x1="20" y1="20" x2="20" y2="130" stroke="rgba(255,255,255,0.3)" />
                <line x1="20" y1="130" x2="280" y2="130" stroke="rgba(255,255,255,0.3)" />

                {/* ROC Curve for model */}
                <path
                  d="M 20,130 C 25,35 60,25 280,20"
                  fill="none"
                  stroke="#06b6d4"
                  strokeWidth="3"
                  strokeLinecap="round"
                />

                {/* Operating point indicator */}
                <circle cx="50" cy="30" r="5" fill="#10b981" />
                <text x="60" y="34" fill="#10b981" fontSize="10" fontFamily="sans-serif">
                  Selected Threshold (0.42)
                </text>

                {/* Labels */}
                <text x="25" y="14" fill="#94a3b8" fontSize="9">TPR (Sensitivity)</text>
                <text x="210" y="142" fill="#94a3b8" fontSize="9">FPR (1 - Spec)</text>
              </svg>
            </div>
          </div>

          <div className="flex justify-between text-[11px] text-slate-400 pt-3 border-t" style={{ borderColor: 'var(--border-subtle)' }}>
            <span>Sensitivity: {currentBenchmark.recall}%</span>
            <span>Specificity: 99.6%</span>
          </div>
        </div>
      </div>

      {/* 4. Training Loss & Convergence History */}
      <div
        className="rounded-xl p-5 border text-xs"
        style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)' }}
      >
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold text-sm" style={{ color: 'var(--text-primary)' }}>
            {t.models.trainingLossHistory}
          </h3>
          <span className="text-[11px] text-slate-400 font-mono">20 Epochs · Adam Optimizer (lr=0.001)</span>
        </div>

        <div className="h-32 w-full border rounded-lg bg-black/20 p-2 flex items-center justify-center relative overflow-hidden" style={{ borderColor: 'var(--border-subtle)' }}>
          <svg viewBox="0 0 500 100" className="w-full h-full" preserveAspectRatio="none">
            {/* Gridlines */}
            <line x1="0" y1="25" x2="500" y2="25" stroke="rgba(255,255,255,0.05)" />
            <line x1="0" y1="50" x2="500" y2="50" stroke="rgba(255,255,255,0.05)" />
            <line x1="0" y1="75" x2="500" y2="75" stroke="rgba(255,255,255,0.05)" />

            {/* Loss curve */}
            <path
              d={lossPoints
                .map((loss, idx) => {
                  const x = (idx / (lossPoints.length - 1)) * 500;
                  const y = 90 - (1.0 - loss) * 80;
                  return `${idx === 0 ? 'M' : 'L'} ${x},${y}`;
                })
                .join(' ')}
              fill="none"
              stroke="#38bdf8"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};
