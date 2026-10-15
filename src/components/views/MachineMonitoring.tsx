/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Activity,
  AlertOctagon,
  Flame,
  Gauge,
  Sliders,
  Volume2,
  RotateCw,
  Zap,
  Info,
  CheckCircle,
  AlertTriangle,
} from 'lucide-react';

export const MachineMonitoring: React.FC = () => {
  const {
    t,
    machines,
    selectedMachineId,
    setSelectedMachineId,
    selectedMachine,
    triggerEmergencyStop,
    simulateAnomaly,
    formatNumber,
  } = useApp();

  const [showStopModal, setShowStopModal] = useState(false);
  const [vibrationThreshold, setVibrationThreshold] = useState(4.5);
  const [tempThreshold, setTempThreshold] = useState(75.0);

  const reading = selectedMachine.currentReading;

  // Generate FFT frequency harmonic peaks (0 - 500 Hz) based on machine speed & vibration
  const runningSpeedHz = Math.round(reading.rpm / 60); // 1X RPM in Hz (~30-60 Hz)
  const isElevated = reading.vibration > vibrationThreshold;

  // Synthesize FFT spectral bins (64 bins)
  const fftBins = Array.from({ length: 50 }).map((_, i) => {
    const freq = i * 10; // 0 to 500 Hz
    let amplitude = 0.05 + Math.random() * 0.04;

    // 1X running speed fundamental harmonic peak
    if (Math.abs(freq - runningSpeedHz) < 15) {
      amplitude += 0.45 * (reading.vibration / 3.0);
    }
    // 2X harmonic peak
    if (Math.abs(freq - runningSpeedHz * 2) < 15) {
      amplitude += 0.3 * (reading.vibration / 3.0);
    }
    // 3X harmonic peak
    if (Math.abs(freq - runningSpeedHz * 3) < 15) {
      amplitude += 0.18 * (reading.vibration / 3.0);
    }
    // Bearing BPFO fault frequency (~180-220 Hz) when elevated
    if (isElevated && Math.abs(freq - 190) < 15) {
      amplitude += 0.65;
    }

    return { freq, amplitude: Math.min(1.0, amplitude) };
  });

  return (
    <div className="space-y-6">
      {/* 1. Machine Selector & Equipment Specs Header */}
      <div
        className="rounded-xl p-5 border flex flex-col md:flex-row md:items-center justify-between gap-4"
        style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)' }}
      >
        <div className="flex-1">
          <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
            {t.monitoring.selectMachine}
          </label>
          <div className="flex flex-wrap items-center gap-2">
            {machines.map((m) => {
              const isSelected = m.id === selectedMachineId;
              return (
                <button
                  key={m.id}
                  onClick={() => setSelectedMachineId(m.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150 cursor-pointer ${
                    isSelected
                      ? 'bg-cyan-600 text-white shadow-sm'
                      : 'border hover:bg-slate-800/20 text-slate-400'
                  }`}
                  style={{
                    borderColor: isSelected ? '#06b6d4' : 'var(--border-subtle)',
                    color: isSelected ? '#ffffff' : 'var(--text-secondary)',
                  }}
                >
                  {m.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Emergency Stop & Anomaly Action buttons */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => simulateAnomaly(selectedMachine.id)}
            className="px-3 py-1.5 rounded-lg border border-amber-500/40 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 font-medium text-xs flex items-center gap-1.5 transition-colors"
          >
            <Zap size={14} />
            <span>Inject Anomaly</span>
          </button>
          <button
            onClick={() => setShowStopModal(true)}
            className="px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-500 text-white font-medium text-xs flex items-center gap-1.5 transition-colors shadow-sm"
          >
            <AlertOctagon size={14} />
            <span>{t.monitoring.emergencyStop}</span>
          </button>
        </div>
      </div>

      {/* Equipment Specification Card */}
      <div
        className="rounded-xl p-4 border text-xs grid grid-cols-2 sm:grid-cols-4 gap-4"
        style={{ backgroundColor: 'var(--bg-canvas)', borderColor: 'var(--border-subtle)' }}
      >
        <div>
          <span className="text-slate-400 block text-[11px]">Equipment Model</span>
          <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>
            {selectedMachine.model}
          </span>
        </div>
        <div>
          <span className="text-slate-400 block text-[11px]">{t.monitoring.serialNo}</span>
          <span className="font-mono text-cyan-400 font-semibold">{selectedMachine.serialNumber}</span>
        </div>
        <div>
          <span className="text-slate-400 block text-[11px]">{t.monitoring.operatingHours}</span>
          <span className="font-mono tabular-nums font-semibold" style={{ color: 'var(--text-primary)' }}>
            {formatNumber(selectedMachine.operatingHours, 0)} {t.common.hours}
          </span>
        </div>
        <div>
          <span className="text-slate-400 block text-[11px]">{t.monitoring.commissionDate}</span>
          <span className="text-slate-300">{selectedMachine.commissionDate}</span>
        </div>
      </div>

      {/* 2. Interactive Sensor Gauges Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Gauge 1: Vibration RMS */}
        <div
          className="rounded-xl p-4 border flex flex-col justify-between"
          style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)' }}
        >
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="font-semibold text-slate-300">{t.sensors.vibration}</span>
            <Activity size={16} className={reading.vibration > vibrationThreshold ? 'text-amber-400 animate-pulse' : 'text-cyan-400'} />
          </div>
          <div className="text-3xl font-bold font-mono tabular-nums text-cyan-400 my-1">
            {formatNumber(reading.vibration, 2)}
            <span className="text-xs font-normal text-slate-400 ml-1.5">{t.sensors.vibrationUnit}</span>
          </div>
          {/* Progress gauge bar */}
          <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden mt-2 relative">
            <div
              className={`h-full rounded-full transition-all duration-300 ${
                reading.vibration > 7.1 ? 'bg-red-500' : reading.vibration > 4.5 ? 'bg-amber-500' : 'bg-cyan-500'
              }`}
              style={{ width: `${Math.min(100, (reading.vibration / 10.0) * 100)}%` }}
            />
          </div>
          <div className="flex justify-between text-[10px] text-slate-500 mt-1 font-mono">
            <span>0.0</span>
            <span>Warn: {vibrationThreshold}</span>
            <span>Crit: 7.1</span>
          </div>
        </div>

        {/* Gauge 2: Bearing Temperature */}
        <div
          className="rounded-xl p-4 border flex flex-col justify-between"
          style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)' }}
        >
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="font-semibold text-slate-300">{t.sensors.temperature}</span>
            <Flame size={16} className={reading.temperature > tempThreshold ? 'text-red-400 animate-pulse' : 'text-amber-400'} />
          </div>
          <div className="text-3xl font-bold font-mono tabular-nums text-amber-400 my-1">
            {formatNumber(reading.temperature, 1)}
            <span className="text-xs font-normal text-slate-400 ml-1.5">{t.sensors.tempUnit}</span>
          </div>
          <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden mt-2">
            <div
              className={`h-full rounded-full transition-all duration-300 ${
                reading.temperature > 85 ? 'bg-red-500' : reading.temperature > 75 ? 'bg-amber-500' : 'bg-emerald-500'
              }`}
              style={{ width: `${Math.min(100, (reading.temperature / 110.0) * 100)}%` }}
            />
          </div>
          <div className="flex justify-between text-[10px] text-slate-500 mt-1 font-mono">
            <span>20°C</span>
            <span>Warn: {tempThreshold}°C</span>
            <span>Crit: 85°C</span>
          </div>
        </div>

        {/* Gauge 3: Hydraulic Pressure */}
        <div
          className="rounded-xl p-4 border flex flex-col justify-between"
          style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)' }}
        >
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="font-semibold text-slate-300">{t.sensors.pressure}</span>
            <Gauge size={16} className="text-teal-400" />
          </div>
          <div className="text-3xl font-bold font-mono tabular-nums text-teal-400 my-1">
            {formatNumber(reading.pressure, 2)}
            <span className="text-xs font-normal text-slate-400 ml-1.5">{t.sensors.pressureUnit}</span>
          </div>
          <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden mt-2">
            <div
              className="h-full rounded-full bg-teal-500 transition-all duration-300"
              style={{ width: `${Math.min(100, (reading.pressure / 10.0) * 100)}%` }}
            />
          </div>
          <div className="flex justify-between text-[10px] text-slate-500 mt-1 font-mono">
            <span>0.0</span>
            <span>Nominal: 4-6 bar</span>
            <span>10.0</span>
          </div>
        </div>

        {/* Gauge 4: Acoustic Emission & RPM */}
        <div
          className="rounded-xl p-4 border flex flex-col justify-between"
          style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)' }}
        >
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="font-semibold text-slate-300">{t.sensors.acoustic} & Speed</span>
            <Volume2 size={16} className="text-sky-400" />
          </div>
          <div className="flex items-baseline justify-between my-1">
            <div className="text-2xl font-bold font-mono tabular-nums text-sky-400">
              {formatNumber(reading.acoustic, 1)} <span className="text-xs text-slate-400">{t.sensors.acousticUnit}</span>
            </div>
            <div className="text-xs font-mono tabular-nums text-slate-300">
              {reading.rpm} {t.sensors.rpmUnit}
            </div>
          </div>
          <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden mt-2">
            <div
              className="h-full rounded-full bg-sky-500 transition-all duration-300"
              style={{ width: `${Math.min(100, (reading.acoustic / 100.0) * 100)}%` }}
            />
          </div>
          <div className="flex justify-between text-[10px] text-slate-500 mt-1 font-mono">
            <span>40 dB</span>
            <span>Nominal: &lt;75 dB</span>
            <span>100 dB</span>
          </div>
        </div>
      </div>

      {/* 3. Live FFT Frequency Spectrum & Acoustic Waveform Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* FFT Harmonic Spectrum */}
        <div
          className="rounded-xl p-5 border flex flex-col justify-between"
          style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)' }}
        >
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>
                {t.monitoring.frequencySpectrum}
              </h3>
              <span className="text-[11px] font-mono text-cyan-400">
                1X Peak: {runningSpeedHz} Hz
              </span>
            </div>
            <p className="text-[11px] text-slate-400 mb-4 leading-normal">
              {t.monitoring.frequencyDesc}
            </p>

            {/* FFT Bar Chart Graphic */}
            <div className="h-44 w-full flex items-end gap-1 p-2 rounded-lg border bg-black/30 overflow-hidden" style={{ borderColor: 'var(--border-subtle)' }}>
              {fftBins.map((bin, i) => {
                const isBearingFault = isElevated && Math.abs(bin.freq - 190) < 15;
                const isHarmonic = Math.abs(bin.freq - runningSpeedHz) < 15 || Math.abs(bin.freq - runningSpeedHz * 2) < 15;

                return (
                  <div key={i} className="flex-1 flex flex-col items-center h-full justify-end group relative">
                    <div
                      className={`w-full rounded-t transition-all duration-200 ${
                        isBearingFault
                          ? 'bg-amber-400 shadow-sm'
                          : isHarmonic
                          ? 'bg-cyan-400'
                          : 'bg-slate-600 hover:bg-slate-500'
                      }`}
                      style={{ height: `${Math.max(4, bin.amplitude * 100)}%` }}
                    />
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex items-center justify-between text-[10px] text-slate-500 pt-3 font-mono">
            <span>0 Hz</span>
            <span>100 Hz</span>
            <span>200 Hz (BPFO Bearing Defect)</span>
            <span>300 Hz</span>
            <span>500 Hz</span>
          </div>
        </div>

        {/* Ultrasonic Acoustic Waveform */}
        <div
          className="rounded-xl p-5 border flex flex-col justify-between"
          style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)' }}
        >
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>
                {t.monitoring.acousticWaveform}
              </h3>
              <span className="text-[11px] font-mono text-teal-400">
                Sampling: 100 kHz
              </span>
            </div>
            <p className="text-[11px] text-slate-400 mb-4 leading-normal">
              {t.monitoring.acousticDesc}
            </p>

            {/* Simulated Ultrasonic Signal Waveform */}
            <div className="h-44 w-full rounded-lg border bg-black/30 p-2 overflow-hidden flex items-center justify-center relative" style={{ borderColor: 'var(--border-subtle)' }}>
              <svg viewBox="0 0 400 120" className="w-full h-full" preserveAspectRatio="none">
                <line x1="0" y1="60" x2="400" y2="60" stroke="rgba(255,255,255,0.1)" strokeDasharray="2 2" />
                <path
                  d={Array.from({ length: 40 }).map((_, i) => {
                    const x = i * 10;
                    const noise = isElevated ? Math.sin(i * 1.8) * 45 : Math.sin(i * 0.8) * 22;
                    const y = 60 + noise;
                    return `${i === 0 ? 'M' : 'L'} ${x},${y}`;
                  }).join(' ')}
                  fill="none"
                  stroke="#14b8a6"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>

          <div className="flex items-center justify-between text-[10px] text-slate-400 pt-3">
            <span>Enveloping: Hilbert Transform</span>
            <span>Friction Crest Factor: 3.42</span>
          </div>
        </div>
      </div>

      {/* 4. Threshold Tuning Sliders */}
      <div
        className="rounded-xl p-5 border text-xs"
        style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)' }}
      >
        <div className="flex items-center gap-2 mb-3">
          <Sliders size={16} className="text-cyan-400" />
          <h3 className="font-bold" style={{ color: 'var(--text-primary)' }}>
            {t.monitoring.tuneThresholds} (ISO 10816-3 Calibration)
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
          {/* Vibration slider */}
          <div>
            <div className="flex justify-between mb-1.5">
              <span className="text-slate-300">Vibration Warning Threshold (Zone C limit)</span>
              <span className="font-mono text-cyan-400 font-semibold">{vibrationThreshold} mm/s</span>
            </div>
            <input
              type="range"
              min="2.0"
              max="8.0"
              step="0.1"
              value={vibrationThreshold}
              onChange={(e) => setVibrationThreshold(parseFloat(e.target.value))}
              className="w-full accent-cyan-400 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500 mt-1">
              <span>2.0 mm/s (Rigid Foundation)</span>
              <span>8.0 mm/s (Flexible Foundation)</span>
            </div>
          </div>

          {/* Temperature slider */}
          <div>
            <div className="flex justify-between mb-1.5">
              <span className="text-slate-300">Bearing Thermal Warning Limit</span>
              <span className="font-mono text-amber-400 font-semibold">{tempThreshold} °C</span>
            </div>
            <input
              type="range"
              min="60"
              max="95"
              step="1"
              value={tempThreshold}
              onChange={(e) => setTempThreshold(parseFloat(e.target.value))}
              className="w-full accent-amber-400 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500 mt-1">
              <span>60 °C (Synthetic Grease)</span>
              <span>95 °C (High-Temp Polyurea)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Emergency Stop Confirmation Modal */}
      {showStopModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
          <div
            className="w-full max-w-md rounded-xl p-5 border shadow-2xl space-y-4"
            style={{ backgroundColor: 'var(--bg-surface-elevated)', borderColor: '#ef4444' }}
          >
            <div className="flex items-center gap-3 text-red-400">
              <AlertOctagon size={24} />
              <h3 className="font-bold text-base">Emergency Shutdown Confirmation</h3>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {t.monitoring.emergencyStopConfirm} Target: <span className="font-semibold text-white">{selectedMachine.name}</span>.
              This will trigger simulated main contactor trip, zeroing speed and drive current.
            </p>
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setShowStopModal(false)}
                className="px-3 py-1.5 rounded-lg border text-xs text-slate-300 hover:bg-slate-700/20"
                style={{ borderColor: 'var(--border-subtle)' }}
              >
                {t.common.cancel}
              </button>
              <button
                onClick={() => {
                  triggerEmergencyStop(selectedMachine.id);
                  setShowStopModal(false);
                }}
                className="px-4 py-1.5 rounded-lg bg-red-600 hover:bg-red-500 text-white font-semibold text-xs"
              >
                Confirm Emergency Stop
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
