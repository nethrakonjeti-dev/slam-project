/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MLModelType, PredictionResult } from '../../types';
import {
  BrainCircuit,
  Cpu,
  Zap,
  TrendingDown,
  CalendarCheck,
  CheckCircle2,
  AlertTriangle,
  Layers,
  ArrowRight,
  ShieldAlert,
  Sliders,
} from 'lucide-react';

export const FailurePrediction: React.FC = () => {
  const {
    t,
    machines,
    selectedMachineId,
    setSelectedMachineId,
    selectedMachine,
    runPrediction,
    lastPrediction,
    createWorkOrder,
    setActiveTab,
    formatNumber,
  } = useApp();

  const [selectedModel, setSelectedModel] = useState<MLModelType>('xgboost');
  const [isRunning, setIsRunning] = useState(false);
  const [ticketCreated, setTicketCreated] = useState(false);

  // Sensor parameters form state
  const [vibration, setVibration] = useState(selectedMachine.currentReading.vibration);
  const [temperature, setTemperature] = useState(selectedMachine.currentReading.temperature);
  const [pressure, setPressure] = useState(selectedMachine.currentReading.pressure);
  const [acoustic, setAcoustic] = useState(selectedMachine.currentReading.acoustic);
  const [rpm, setRpm] = useState(selectedMachine.currentReading.rpm);
  const [current, setCurrent] = useState(selectedMachine.currentReading.current);

  const [prediction, setPrediction] = useState<PredictionResult | null>(
    lastPrediction || {
      machineId: selectedMachine.id,
      machineName: selectedMachine.name,
      timestamp: Date.now(),
      modelUsed: 'xgboost',
      failureProbability: selectedMachine.failureRisk,
      remainingUsefulLifeHours: selectedMachine.predictedRulHours,
      failureMode: selectedMachine.failureRisk > 40 ? 'Bearing Degradation' : 'Normal (No Fault)',
      confidence: 97.4,
      anomalyDetected: selectedMachine.failureRisk > 35,
      featureImportance: [
        { feature: 'Vibration RMS (radial)', importance: 88, impact: 'critical' },
        { feature: 'Bearing Operating Temperature', importance: 64, impact: 'moderate' },
        { feature: 'Ultrasonic Acoustic Emission', importance: 52, impact: 'moderate' },
        { feature: 'Hydraulic System Pressure', importance: 24, impact: 'nominal' },
      ],
      prescriptiveActions: [
        'Perform high-purity polyurea lubricant replenishment (ISO VG 68) within 24 hours.',
        'Schedule laser shaft runout and alignment calibration.',
        'Limit spindle rotational speed to 75% maximum duty cycle until vibration drops below 3.5 mm/s.',
      ],
    }
  );

  const handlePopulateLive = () => {
    setVibration(selectedMachine.currentReading.vibration);
    setTemperature(selectedMachine.currentReading.temperature);
    setPressure(selectedMachine.currentReading.pressure);
    setAcoustic(selectedMachine.currentReading.acoustic);
    setRpm(selectedMachine.currentReading.rpm);
    setCurrent(selectedMachine.currentReading.current);
    setTicketCreated(false);
  };

  const handleExecuteInference = () => {
    setIsRunning(true);
    setTicketCreated(false);
    setTimeout(() => {
      const res = runPrediction(selectedModel, {
        vibration,
        temperature,
        pressure,
        acoustic,
        rpm,
        current,
        machineId: selectedMachineId,
      });
      setPrediction(res);
      setIsRunning(false);
    }, 450);
  };

  const handleCreateWorkOrderTicket = () => {
    if (!prediction) return;
    createWorkOrder({
      title: `AI Prescriptive Maintenance: ${prediction.failureMode}`,
      machineId: selectedMachine.id,
      machineName: selectedMachine.name,
      priority: prediction.failureProbability > 60 ? 'critical' : 'high',
      status: 'scheduled',
      assignedTechnician: 'AI Dispatch Automated Assignment',
      dueDate: new Date(Date.now() + Math.min(72, prediction.remainingUsefulLifeHours) * 3600000)
        .toISOString()
        .split('T')[0],
      description: `Automated AI ticket derived from ${prediction.modelUsed.toUpperCase()} model inference. Failure Probability: ${
        prediction.failureProbability
      }%, Estimated RUL: ${prediction.remainingUsefulLifeHours} hours. Failure Mode: ${prediction.failureMode}.`,
      checklist: prediction.prescriptiveActions.map((action) => ({
        item: action,
        completed: false,
      })),
      spareParts: ['Precision Bearings SKF', 'Synthetic Industrial Oil ISO VG 68', 'Seal O-Ring Pack'],
      estimatedCost: 1100,
    });
    setTicketCreated(true);
  };

  return (
    <div className="space-y-6">
      {/* 1. Header with description */}
      <div
        className="rounded-xl p-5 border flex flex-col md:flex-row md:items-center justify-between gap-4"
        style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)' }}
      >
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-cyan-400 mb-1">
            <BrainCircuit size={16} />
            <span>Multi-Spectral Inference Engine</span>
          </div>
          <h2 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>
            {t.prediction.title}
          </h2>
          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
            {t.prediction.subtitle}
          </p>
        </div>

        {/* Machine Switcher */}
        <div className="flex items-center gap-2">
          <label className="text-xs text-slate-400 font-medium">Asset:</label>
          <select
            value={selectedMachineId}
            onChange={(e) => {
              setSelectedMachineId(e.target.value);
              const m = machines.find((mac) => mac.id === e.target.value);
              if (m) {
                setVibration(m.currentReading.vibration);
                setTemperature(m.currentReading.temperature);
                setPressure(m.currentReading.pressure);
                setAcoustic(m.currentReading.acoustic);
                setRpm(m.currentReading.rpm);
                setCurrent(m.currentReading.current);
              }
            }}
            className="px-3 py-1.5 rounded-lg border text-xs bg-transparent focus:outline-none focus:border-cyan-400"
            style={{
              backgroundColor: 'var(--bg-canvas)',
              borderColor: 'var(--border-subtle)',
              color: 'var(--text-primary)',
            }}
          >
            {machines.map((m) => (
              <option key={m.id} value={m.id} className="bg-slate-900 text-white">
                {m.name} ({m.id})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* 2. Interactive Input Grid & Model Picker */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2 spans): Sensor Sliders & Inputs */}
        <div
          className="lg:col-span-2 rounded-xl p-5 border space-y-5"
          style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)' }}
        >
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
              <Sliders size={16} className="text-cyan-400" />
              <span>{t.prediction.inputParameters}</span>
            </h3>
            <button
              onClick={handlePopulateLive}
              className="text-xs text-cyan-400 hover:text-cyan-300 font-medium transition-colors"
            >
              {t.prediction.loadLiveValues}
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Vibration */}
            <div className="p-3 rounded-lg border bg-black/20" style={{ borderColor: 'var(--border-subtle)' }}>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-300 font-medium">{t.sensors.vibration}</span>
                <span className="font-mono text-cyan-400 font-semibold">{vibration} mm/s</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="10.0"
                step="0.1"
                value={vibration}
                onChange={(e) => setVibration(parseFloat(e.target.value))}
                className="w-full accent-cyan-400"
              />
              <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                <span>0.5 mm/s (Smooth)</span>
                <span>4.5 (Warn)</span>
                <span>10.0 (Destructive)</span>
              </div>
            </div>

            {/* Temperature */}
            <div className="p-3 rounded-lg border bg-black/20" style={{ borderColor: 'var(--border-subtle)' }}>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-300 font-medium">{t.sensors.temperature}</span>
                <span className="font-mono text-amber-400 font-semibold">{temperature} °C</span>
              </div>
              <input
                type="range"
                min="30"
                max="110"
                step="0.5"
                value={temperature}
                onChange={(e) => setTemperature(parseFloat(e.target.value))}
                className="w-full accent-amber-400"
              />
              <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                <span>30 °C (Ambient)</span>
                <span>75 °C (Warn)</span>
                <span>110 °C (Overheat)</span>
              </div>
            </div>

            {/* Pressure */}
            <div className="p-3 rounded-lg border bg-black/20" style={{ borderColor: 'var(--border-subtle)' }}>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-300 font-medium">{t.sensors.pressure}</span>
                <span className="font-mono text-teal-400 font-semibold">{pressure} bar</span>
              </div>
              <input
                type="range"
                min="1.0"
                max="10.0"
                step="0.1"
                value={pressure}
                onChange={(e) => setPressure(parseFloat(e.target.value))}
                className="w-full accent-teal-400"
              />
              <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                <span>1.0 bar (Vacuum)</span>
                <span>5.0 bar (Nominal)</span>
                <span>10.0 bar (Overpressure)</span>
              </div>
            </div>

            {/* Acoustic */}
            <div className="p-3 rounded-lg border bg-black/20" style={{ borderColor: 'var(--border-subtle)' }}>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-300 font-medium">{t.sensors.acoustic}</span>
                <span className="font-mono text-sky-400 font-semibold">{acoustic} dB</span>
              </div>
              <input
                type="range"
                min="45"
                max="95"
                step="0.5"
                value={acoustic}
                onChange={(e) => setAcoustic(parseFloat(e.target.value))}
                className="w-full accent-sky-400"
              />
              <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                <span>45 dB (Quiet)</span>
                <span>75 dB (Friction)</span>
                <span>95 dB (Micro-cracking)</span>
              </div>
            </div>
          </div>

          {/* Model Selector Strip */}
          <div className="space-y-2 pt-2">
            <span className="text-xs font-semibold text-slate-300 block">{t.prediction.selectModel}:</span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button
                onClick={() => setSelectedModel('xgboost')}
                className={`p-2.5 rounded-lg border text-left transition-colors cursor-pointer ${
                  selectedModel === 'xgboost'
                    ? 'border-cyan-400 bg-cyan-500/10'
                    : 'hover:bg-slate-800/20'
                }`}
                style={{ borderColor: selectedModel === 'xgboost' ? '#06b6d4' : 'var(--border-subtle)' }}
              >
                <div className="font-semibold text-xs text-cyan-400">XGBoost</div>
                <div className="text-[10px] text-slate-400 truncate">98.4% Accuracy</div>
              </button>

              <button
                onClick={() => setSelectedModel('random_forest')}
                className={`p-2.5 rounded-lg border text-left transition-colors cursor-pointer ${
                  selectedModel === 'random_forest'
                    ? 'border-cyan-400 bg-cyan-500/10'
                    : 'hover:bg-slate-800/20'
                }`}
                style={{ borderColor: selectedModel === 'random_forest' ? '#06b6d4' : 'var(--border-subtle)' }}
              >
                <div className="font-semibold text-xs" style={{ color: 'var(--text-primary)' }}>Random Forest</div>
                <div className="text-[10px] text-slate-400 truncate">97.1% Accuracy</div>
              </button>

              <button
                onClick={() => setSelectedModel('lstm_autoencoder')}
                className={`p-2.5 rounded-lg border text-left transition-colors cursor-pointer ${
                  selectedModel === 'lstm_autoencoder'
                    ? 'border-cyan-400 bg-cyan-500/10'
                    : 'hover:bg-slate-800/20'
                }`}
                style={{ borderColor: selectedModel === 'lstm_autoencoder' ? '#06b6d4' : 'var(--border-subtle)' }}
              >
                <div className="font-semibold text-xs" style={{ color: 'var(--text-primary)' }}>LSTM Autoencoder</div>
                <div className="text-[10px] text-slate-400 truncate">Time-Series Deep</div>
              </button>

              <button
                onClick={() => setSelectedModel('isolation_forest')}
                className={`p-2.5 rounded-lg border text-left transition-colors cursor-pointer ${
                  selectedModel === 'isolation_forest'
                    ? 'border-cyan-400 bg-cyan-500/10'
                    : 'hover:bg-slate-800/20'
                }`}
                style={{ borderColor: selectedModel === 'isolation_forest' ? '#06b6d4' : 'var(--border-subtle)' }}
              >
                <div className="font-semibold text-xs" style={{ color: 'var(--text-primary)' }}>Isolation Forest</div>
                <div className="text-[10px] text-slate-400 truncate">Outlier Isolation</div>
              </button>
            </div>
          </div>

          {/* Run Inference Action Button */}
          <button
            onClick={handleExecuteInference}
            disabled={isRunning}
            className="w-full py-3 rounded-lg bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 text-white font-semibold text-xs flex items-center justify-center gap-2 transition-colors shadow-sm"
          >
            {isRunning ? (
              <>
                <div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                <span>{t.prediction.inferenceRunning}</span>
              </>
            ) : (
              <>
                <Zap size={15} />
                <span>{t.prediction.runInference}</span>
              </>
            )}
          </button>
        </div>

        {/* Right Column (1 span): Prediction Results & Risk Meter */}
        <div
          className="rounded-xl p-5 border flex flex-col justify-between"
          style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)' }}
        >
          {prediction ? (
            <div className="space-y-4">
              <div className="border-b pb-3" style={{ borderColor: 'var(--border-subtle)' }}>
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                  Inference Diagnostics
                </span>
                <h3 className="text-base font-bold text-white flex items-center gap-2 mt-0.5">
                  <span
                    className={
                      prediction.failureProbability > 50
                        ? 'text-red-400'
                        : prediction.failureProbability > 25
                        ? 'text-amber-400'
                        : 'text-emerald-400'
                    }
                  >
                    {prediction.failureMode}
                  </span>
                </h3>
              </div>

              {/* Failure Probability Big Metric */}
              <div>
                <span className="text-xs text-slate-400">{t.prediction.failureProbability}</span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span
                    className={`text-4xl font-extrabold font-mono tabular-nums ${
                      prediction.failureProbability > 50
                        ? 'text-red-400'
                        : prediction.failureProbability > 25
                        ? 'text-amber-400'
                        : 'text-emerald-400'
                    }`}
                  >
                    {prediction.failureProbability}%
                  </span>
                  <span className="text-xs text-slate-400">Risk Assessment</span>
                </div>
              </div>

              {/* Remaining Useful Life (RUL) */}
              <div className="p-3 rounded-lg border bg-black/20" style={{ borderColor: 'var(--border-subtle)' }}>
                <span className="text-[11px] text-slate-400 block">{t.prediction.predictedRul}</span>
                <div className="text-2xl font-bold font-mono tabular-nums text-teal-400 mt-0.5">
                  {prediction.remainingUsefulLifeHours}{' '}
                  <span className="text-xs font-normal text-slate-400">{t.common.hours} (~{Math.round(prediction.remainingUsefulLifeHours / 24)} {t.common.days})</span>
                </div>
              </div>

              {/* Model Confidence */}
              <div className="flex justify-between items-center text-xs text-slate-300">
                <span>{t.prediction.confidence}</span>
                <span className="font-mono text-cyan-400 font-semibold">{prediction.confidence}%</span>
              </div>

              {/* SHAP Feature Contribution Weights */}
              <div className="space-y-2 pt-2 border-t" style={{ borderColor: 'var(--border-subtle)' }}>
                <span className="text-xs font-semibold text-slate-300 block">{t.prediction.shapImportance}:</span>
                {prediction.featureImportance.map((feat, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between text-[11px]">
                      <span className="text-slate-400">{feat.feature}</span>
                      <span className="font-mono text-white font-medium">{feat.importance}%</span>
                    </div>
                    <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          feat.impact === 'critical'
                            ? 'bg-red-500'
                            : feat.impact === 'moderate'
                            ? 'bg-amber-500'
                            : 'bg-cyan-500'
                        }`}
                        style={{ width: `${feat.importance}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="py-12 text-center text-xs text-slate-400">
              Configure parameters and run inference to compute failure diagnostics.
            </div>
          )}

          {/* Schedule Work Order Dispatch Button */}
          {prediction && (
            <div className="pt-4 border-t mt-4" style={{ borderColor: 'var(--border-subtle)' }}>
              {!ticketCreated ? (
                <button
                  onClick={handleCreateWorkOrderTicket}
                  className="w-full py-2.5 rounded-lg border border-cyan-500/40 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 font-semibold text-xs flex items-center justify-center gap-2 transition-colors"
                >
                  <CalendarCheck size={15} />
                  <span>{t.prediction.scheduleTicket}</span>
                </button>
              ) : (
                <div className="flex items-center justify-center gap-2 text-emerald-400 text-xs font-semibold py-2">
                  <CheckCircle2 size={16} />
                  <span>{t.prediction.ticketScheduled}</span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* 3. Prescriptive Maintenance Recommendations Card */}
      {prediction && prediction.prescriptiveActions.length > 0 && (
        <div
          className="rounded-xl p-5 border text-xs space-y-3"
          style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)' }}
        >
          <div className="flex items-center gap-2">
            <ShieldAlert size={16} className="text-cyan-400" />
            <h3 className="font-bold text-sm" style={{ color: 'var(--text-primary)' }}>
              {t.prediction.prescriptiveTitle}
            </h3>
          </div>
          <p className="text-[11px] text-slate-400">
            {t.prediction.prescriptiveDesc}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
            {prediction.prescriptiveActions.map((action, i) => (
              <div
                key={i}
                className="p-3 rounded-lg border bg-black/20 text-slate-300 leading-relaxed text-xs flex items-start gap-2"
                style={{ borderColor: 'var(--border-subtle)' }}
              >
                <span className="font-mono font-bold text-cyan-400">{i + 1}.</span>
                <span>{action}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
