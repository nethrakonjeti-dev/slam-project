/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { LanguageCode } from '../../types';
import {
  Sliders,
  Bell,
  Volume2,
  Mic,
  RotateCcw,
  Save,
  CheckCircle2,
  Clock,
  Activity,
  Flame,
} from 'lucide-react';

export const SettingsPreferences: React.FC = () => {
  const { t, settings, updateSettings, language, setLanguage } = useApp();

  const [pollingRate, setPollingRate] = useState(settings.pollingIntervalSeconds);
  const [sensitivity, setSensitivity] = useState(settings.anomalySensitivity);
  const [vibrationWarn, setVibrationWarn] = useState(settings.vibrationWarningThreshold);
  const [vibrationCrit, setVibrationCrit] = useState(settings.vibrationCriticalThreshold);
  const [tempWarn, setTempWarn] = useState(settings.tempWarningThreshold);
  const [tempCrit, setTempCrit] = useState(settings.tempCriticalThreshold);
  const [soundEnabled, setSoundEnabled] = useState(settings.soundAlertsEnabled);
  const [voiceLang, setVoiceLang] = useState<LanguageCode>(settings.voiceLanguage);
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = () => {
    updateSettings({
      pollingIntervalSeconds: pollingRate,
      anomalySensitivity: sensitivity,
      vibrationWarningThreshold: vibrationWarn,
      vibrationCriticalThreshold: vibrationCrit,
      tempWarningThreshold: tempWarn,
      tempCriticalThreshold: tempCrit,
      soundAlertsEnabled: soundEnabled,
      voiceLanguage: voiceLang,
    });
    setLanguage(voiceLang);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  const handleReset = () => {
    setPollingRate(2);
    setSensitivity('balanced');
    setVibrationWarn(4.5);
    setVibrationCrit(7.1);
    setTempWarn(75);
    setTempCrit(85);
    setSoundEnabled(true);
    setVoiceLang('en');
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
            <Sliders size={16} />
            <span>Industrial System Configuration</span>
          </div>
          <h2 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>
            {t.settings.title}
          </h2>
          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
            {t.settings.subtitle}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleReset}
            className="px-3 py-1.5 rounded-lg border text-xs font-medium hover:bg-slate-800/20 flex items-center gap-1.5 transition-colors cursor-pointer"
            style={{ borderColor: 'var(--border-subtle)', color: 'var(--text-primary)' }}
          >
            <RotateCcw size={14} />
            <span>{t.settings.resetDefaults}</span>
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-xs flex items-center gap-1.5 transition-colors shadow-sm cursor-pointer"
          >
            {isSaved ? <CheckCircle2 size={14} className="text-emerald-300" /> : <Save size={14} />}
            <span>{isSaved ? 'Changes Applied!' : t.common.save}</span>
          </button>
        </div>
      </div>

      {/* 2. Configuration Settings Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
        {/* Telemetry Polling & Refresh Rate */}
        <div
          className="rounded-xl p-5 border space-y-4"
          style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)' }}
        >
          <div className="flex items-center gap-2 text-cyan-400 font-semibold text-sm">
            <Clock size={16} />
            <span>{t.settings.pollingInterval}</span>
          </div>
          <p className="text-[11px] text-slate-400">
            {t.settings.pollingIntervalDesc}
          </p>

          <div className="space-y-2 pt-1">
            <div className="flex justify-between font-mono">
              <span className="text-slate-300">Active Refresh Rate:</span>
              <span className="text-cyan-400 font-bold">{pollingRate} seconds</span>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {[1, 2, 5, 10].map((rate) => (
                <button
                  key={rate}
                  onClick={() => setPollingRate(rate)}
                  className={`py-2 rounded-lg border text-center font-mono font-semibold transition-colors ${
                    pollingRate === rate
                      ? 'bg-cyan-600 text-white border-cyan-500'
                      : 'hover:bg-slate-800/20 text-slate-300'
                  }`}
                  style={{ borderColor: pollingRate === rate ? '#06b6d4' : 'var(--border-subtle)' }}
                >
                  {rate}s
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Anomaly Detection Sensitivity */}
        <div
          className="rounded-xl p-5 border space-y-4"
          style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)' }}
        >
          <div className="flex items-center gap-2 text-cyan-400 font-semibold text-sm">
            <Activity size={16} />
            <span>{t.settings.anomalySensitivity}</span>
          </div>
          <p className="text-[11px] text-slate-400">
            {t.settings.anomalySensitivityDesc}
          </p>

          <div className="grid grid-cols-3 gap-2 pt-1">
            {(['low', 'balanced', 'high'] as const).map((sens) => (
              <button
                key={sens}
                onClick={() => setSensitivity(sens)}
                className={`py-2 rounded-lg border text-center capitalize font-semibold transition-colors ${
                  sensitivity === sens
                    ? 'bg-cyan-600 text-white border-cyan-500'
                    : 'hover:bg-slate-800/20 text-slate-300'
                }`}
                style={{ borderColor: sensitivity === sens ? '#06b6d4' : 'var(--border-subtle)' }}
              >
                {sens}
              </button>
            ))}
          </div>
        </div>

        {/* Sensor Warning Limits */}
        <div
          className="rounded-xl p-5 border space-y-4"
          style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)' }}
        >
          <div className="flex items-center gap-2 text-amber-400 font-semibold text-sm">
            <Flame size={16} />
            <span>{t.settings.thresholdConfig}</span>
          </div>

          <div className="space-y-3">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-slate-300">Vibration Warning Limit (mm/s)</span>
                <span className="font-mono text-cyan-400 font-bold">{vibrationWarn} mm/s</span>
              </div>
              <input
                type="range"
                min="2.0"
                max="6.0"
                step="0.1"
                value={vibrationWarn}
                onChange={(e) => setVibrationWarn(parseFloat(e.target.value))}
                className="w-full accent-cyan-400"
              />
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span className="text-slate-300">Bearing Temperature Warning (°C)</span>
                <span className="font-mono text-amber-400 font-bold">{tempWarn} °C</span>
              </div>
              <input
                type="range"
                min="60"
                max="90"
                step="1"
                value={tempWarn}
                onChange={(e) => setTempWarn(parseFloat(e.target.value))}
                className="w-full accent-amber-400"
              />
            </div>
          </div>
        </div>

        {/* Audio Alerts & Voice Assistant Configuration */}
        <div
          className="rounded-xl p-5 border space-y-4"
          style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)' }}
        >
          <div className="flex items-center gap-2 text-teal-400 font-semibold text-sm">
            <Volume2 size={16} />
            <span>Audio & Voice Assistant Settings</span>
          </div>

          <div className="space-y-4 pt-1">
            <label className="flex items-center justify-between cursor-pointer select-none">
              <div>
                <span className="text-white font-medium block">{t.settings.soundAlerts}</span>
                <span className="text-[11px] text-slate-400">Plays an audible 880Hz alert tone on critical exceedance</span>
              </div>
              <input
                type="checkbox"
                checked={soundEnabled}
                onChange={(e) => setSoundEnabled(e.target.checked)}
                className="w-4 h-4 accent-cyan-400 rounded cursor-pointer"
              />
            </label>

            <div>
              <span className="text-slate-300 block mb-1.5 font-medium">{t.settings.voiceSettings}</span>
              <select
                value={voiceLang}
                onChange={(e) => setVoiceLang(e.target.value as LanguageCode)}
                className="w-full px-3 py-2 rounded-lg border bg-transparent text-xs"
                style={{
                  backgroundColor: 'var(--bg-canvas)',
                  borderColor: 'var(--border-subtle)',
                  color: 'var(--text-primary)',
                }}
              >
                <option value="en" className="bg-slate-900 text-white">English (en-US)</option>
                <option value="te" className="bg-slate-900 text-white">తెలుగు — Telugu (te-IN)</option>
                <option value="hi" className="bg-slate-900 text-white">हिन्दी — Hindi (hi-IN)</option>
                <option value="ta" className="bg-slate-900 text-white">தமிழ் — Tamil (ta-IN)</option>
                <option value="es" className="bg-slate-900 text-white">Español — Spanish (es-ES)</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
