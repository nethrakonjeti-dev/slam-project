/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useApp } from '../../context/AppContext';
import { BrandLogo } from '../common/BrandLogo';
import {
  Info,
  GraduationCap,
  Cpu,
  Layers,
  BookOpen,
  Code2,
  CheckCircle2,
  ArrowRight,
  Database,
  Radio,
  BrainCircuit,
  Wrench,
} from 'lucide-react';

export const AboutProject: React.FC = () => {
  const { t } = useApp();

  return (
    <div className="space-y-6">
      {/* 1. Header Banner */}
      <div
        className="rounded-xl p-5 sm:p-6 border relative overflow-hidden"
        style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)' }}
      >
        <div className="flex items-center gap-3 mb-3">
          <BrandLogo size={36} />
          <div>
            <h2 className="text-lg sm:text-xl font-bold" style={{ color: 'var(--text-primary)' }}>
              {t.about.title}
            </h2>
            <p className="text-xs text-cyan-400 font-medium">
              {t.about.subtitle}
            </p>
          </div>
        </div>

        <p className="text-xs sm:text-sm leading-relaxed text-slate-300 max-w-3xl pt-2">
          {t.about.projectDesc}
        </p>
      </div>

      {/* 2. End-to-End System Architecture Flow Diagram */}
      <div
        className="rounded-xl p-5 border text-xs space-y-4"
        style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)' }}
      >
        <div>
          <h3 className="font-bold text-sm flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
            <Layers size={16} className="text-cyan-400" />
            <span>{t.about.architectureTitle}</span>
          </h3>
          <p className="text-[11px] text-slate-400 mt-1">
            {t.about.architectureDesc}
          </p>
        </div>

        {/* Visual Pipeline Flow Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 pt-2">
          {/* Step 1: Sensors */}
          <div className="p-3 rounded-lg border bg-black/20 space-y-1.5" style={{ borderColor: 'var(--border-subtle)' }}>
            <div className="w-7 h-7 rounded-md bg-cyan-500/10 text-cyan-400 flex items-center justify-center font-bold text-xs">
              01
            </div>
            <div className="font-semibold text-white">Edge Sensors</div>
            <p className="text-[11px] text-slate-400 leading-normal">
              Triaxial accelerometers, thermal probes, ultrasonic acoustic transducers.
            </p>
          </div>

          {/* Step 2: Gateway */}
          <div className="p-3 rounded-lg border bg-black/20 space-y-1.5" style={{ borderColor: 'var(--border-subtle)' }}>
            <div className="w-7 h-7 rounded-md bg-teal-500/10 text-teal-400 flex items-center justify-center font-bold text-xs">
              02
            </div>
            <div className="font-semibold text-white">MQTT Gateway</div>
            <p className="text-[11px] text-slate-400 leading-normal">
              High-frequency packet serialization, noise filtration, timestamp alignment.
            </p>
          </div>

          {/* Step 3: Feature Extraction */}
          <div className="p-3 rounded-lg border bg-black/20 space-y-1.5" style={{ borderColor: 'var(--border-subtle)' }}>
            <div className="w-7 h-7 rounded-md bg-sky-500/10 text-sky-400 flex items-center justify-center font-bold text-xs">
              03
            </div>
            <div className="font-semibold text-white">Feature Extraction</div>
            <p className="text-[11px] text-slate-400 leading-normal">
              Fast Fourier Transform (FFT), Hilbert envelope, RMS, Kurtosis, Crest Factor.
            </p>
          </div>

          {/* Step 4: ML Prediction */}
          <div className="p-3 rounded-lg border bg-black/20 space-y-1.5" style={{ borderColor: 'var(--border-subtle)' }}>
            <div className="w-7 h-7 rounded-md bg-amber-500/10 text-amber-400 flex items-center justify-center font-bold text-xs">
              04
            </div>
            <div className="font-semibold text-white">AI Inference</div>
            <p className="text-[11px] text-slate-400 leading-normal">
              XGBoost + Random Forest + LSTM predicting failure probability and RUL.
            </p>
          </div>

          {/* Step 5: Prescriptive Dispatch */}
          <div className="p-3 rounded-lg border bg-black/20 space-y-1.5" style={{ borderColor: 'var(--border-subtle)' }}>
            <div className="w-7 h-7 rounded-md bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold text-xs">
              05
            </div>
            <div className="font-semibold text-white">Prescriptive Action</div>
            <p className="text-[11px] text-slate-400 leading-normal">
              Automated maintenance work orders, technician routing, and parts reservation.
            </p>
          </div>
        </div>
      </div>

      {/* 3. Methodology & Academic Credits */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-xs">
        {/* Academic Credits */}
        <div
          className="rounded-xl p-5 border space-y-3"
          style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)' }}
        >
          <div className="flex items-center gap-2 text-cyan-400 font-semibold text-sm">
            <GraduationCap size={16} />
            <span>{t.about.academicCredits}</span>
          </div>

          <div className="space-y-2 pt-1 text-slate-300">
            <div className="p-3 rounded-lg border bg-black/20" style={{ borderColor: 'var(--border-subtle)' }}>
              <div className="font-semibold text-white">{t.about.studentLead}</div>
              <div className="text-[11px] text-slate-400">{t.about.department}</div>
            </div>

            <div className="p-3 rounded-lg border bg-black/20" style={{ borderColor: 'var(--border-subtle)' }}>
              <div className="font-semibold text-white">{t.about.facultyAdvisor}</div>
              <div className="text-[11px] text-slate-400">Research Focus: Edge AI for Industrial Fault Prognostics</div>
            </div>

            <div className="p-3 rounded-lg border bg-black/20" style={{ borderColor: 'var(--border-subtle)' }}>
              <div className="font-semibold text-white">{t.about.techStack}</div>
            </div>
          </div>
        </div>

        {/* Data Methodology & References */}
        <div
          className="rounded-xl p-5 border space-y-3"
          style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)' }}
        >
          <div className="flex items-center gap-2 text-teal-400 font-semibold text-sm">
            <BookOpen size={16} />
            <span>{t.about.methodologyTitle}</span>
          </div>

          <p className="text-slate-300 leading-relaxed">
            {t.about.methodologyDesc}
          </p>

          <div className="pt-2 border-t space-y-1.5" style={{ borderColor: 'var(--border-subtle)' }}>
            <span className="font-semibold text-white block">Key Literature & Standards:</span>
            <ul className="space-y-1 text-slate-400 pl-4 list-disc">
              <li>ISO 10816-3: Mechanical vibration — Evaluation of machine vibration by measurements on non-rotating parts</li>
              <li>AI4I 2020 Predictive Maintenance Dataset (UCI Machine Learning Repository)</li>
              <li>NASA C-MAPSS Turbofan Engine Degradation Simulation Dataset</li>
              <li>SHAP (SHapley Additive exPlanations) for transparent model feature attributions</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
