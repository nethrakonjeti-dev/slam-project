/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';
import {
  ThemeMode,
  LanguageCode,
  NavView,
  Machine,
  DatasetItem,
  WorkOrder,
  AlertNotification,
  AuditLogEntry,
  SystemSettings,
  PredictionResult,
  MicPermissionState,
  MLModelType,
} from '../types';
import {
  initialMachines,
  initialAi4iDataset,
  initialWorkOrders,
  initialAlerts,
  initialAuditLogs,
} from '../data/initialData';
import { translations, Translations } from '../i18n/translations';

interface AppContextType {
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  t: Translations;
  activeTab: NavView;
  setActiveTab: (tab: NavView) => void;
  selectedMachineId: string;
  setSelectedMachineId: (id: string) => void;
  selectedMachine: Machine;
  machines: Machine[];
  isStreaming: boolean;
  toggleStreaming: () => void;
  alerts: AlertNotification[];
  unreadAlertCount: number;
  acknowledgeAlert: (id: string) => void;
  resolveAlert: (id: string) => void;
  escalateAlertToWorkOrder: (id: string) => void;
  workOrders: WorkOrder[];
  createWorkOrder: (order: Omit<WorkOrder, 'id' | 'createdDate'>) => void;
  updateWorkOrderStatus: (id: string, status: WorkOrder['status']) => void;
  toggleWorkOrderChecklist: (orderId: string, itemIndex: number) => void;
  dataset: DatasetItem[];
  uploadCustomDataset: (items: DatasetItem[]) => void;
  generateSampleDataset: () => void;
  auditLogs: AuditLogEntry[];
  settings: SystemSettings;
  updateSettings: (newSettings: Partial<SystemSettings>) => void;
  simulateAnomaly: (machineId: string) => void;
  triggerEmergencyStop: (machineId: string) => void;
  runPrediction: (
    modelType: MLModelType,
    params: {
      vibration: number;
      temperature: number;
      pressure: number;
      acoustic: number;
      rpm: number;
      current: number;
      machineId?: string;
    }
  ) => PredictionResult;
  lastPrediction: PredictionResult | null;
  // Voice Assistant
  isVoiceModalOpen: boolean;
  setIsVoiceModalOpen: (open: boolean) => void;
  micState: MicPermissionState;
  requestMicPermission: () => Promise<void>;
  startVoiceRecording: () => void;
  stopVoiceRecording: () => void;
  cancelVoiceRecording: () => void;
  playRecordedAudio: () => void;
  handleVoiceCommand: (transcript: string) => void;
  confirmAndExecuteVoiceCommand: (commandAction: () => void, label: string) => void;
  pendingCommand: { label: string; action: () => void } | null;
  clearPendingCommand: () => void;
  formatNumber: (value: number, decimals?: number) => string;
  formatDate: (timestamp: number | string) => string;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const LOCAL_STORAGE_THEME_KEY = 'predictai_theme_mode';
const LOCAL_STORAGE_LANG_KEY = 'predictai_lang_code';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // 1. Theme State
  const [theme, setThemeState] = useState<ThemeMode>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as ThemeMode | null;
    if (saved && ['original', 'light', 'dark'].includes(saved)) {
      return saved;
    }
    return 'original';
  });

  const setTheme = (newTheme: ThemeMode) => {
    setThemeState(newTheme);
    localStorage.setItem(LOCAL_STORAGE_THEME_KEY, newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // 2. Language State
  const [language, setLanguageState] = useState<LanguageCode>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_LANG_KEY) as LanguageCode | null;
    if (saved && ['en', 'te', 'hi', 'ta', 'es'].includes(saved)) {
      return saved;
    }
    return 'en';
  });

  const setLanguage = (lang: LanguageCode) => {
    setLanguageState(lang);
    localStorage.setItem(LOCAL_STORAGE_LANG_KEY, lang);
  };

  const t = translations[language] || translations.en;

  // 3. Navigation & Machine Selection
  const [activeTab, setActiveTab] = useState<NavView>('overview');
  const [selectedMachineId, setSelectedMachineId] = useState<string>('M-01');

  // 4. Data states
  const [machines, setMachines] = useState<Machine[]>(initialMachines);
  const [isStreaming, setIsStreaming] = useState<boolean>(true);
  const [alerts, setAlerts] = useState<AlertNotification[]>(initialAlerts);
  const [workOrders, setWorkOrders] = useState<WorkOrder[]>(initialWorkOrders);
  const [dataset, setDataset] = useState<DatasetItem[]>(initialAi4iDataset);
  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>(initialAuditLogs);
  const [lastPrediction, setLastPrediction] = useState<PredictionResult | null>(null);

  // 5. System Settings
  const [settings, setSettings] = useState<SystemSettings>({
    pollingIntervalSeconds: 2,
    anomalySensitivity: 'balanced',
    tempWarningThreshold: 75,
    tempCriticalThreshold: 85,
    vibrationWarningThreshold: 4.5,
    vibrationCriticalThreshold: 7.1,
    pressureWarningMinThreshold: 3.5,
    soundAlertsEnabled: true,
    autoAcknowledgeLowRisk: false,
    voiceLanguage: 'en',
    voiceAutoListen: false,
  });

  const updateSettings = (newSettings: Partial<SystemSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  };

  const selectedMachine = machines.find((m) => m.id === selectedMachineId) || machines[0];

  // Sound alert trigger
  const playAlertSound = useCallback(() => {
    if (!settings.soundAlertsEnabled) return;
    try {
      const audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, audioCtx.currentTime); // A5
      osc.frequency.exponentialRampToValueAtTime(440, audioCtx.currentTime + 0.25);
      gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.25);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.25);
    } catch {
      // AudioContext unavailable in silent policy
    }
  }, [settings.soundAlertsEnabled]);

  // Telemetry streaming engine
  useEffect(() => {
    if (!isStreaming) return;

    const interval = setInterval(() => {
      setMachines((prevMachines) => {
        return prevMachines.map((m) => {
          // slight stochastic jitter
          const isWarning = m.status === 'warning';
          const isCritical = m.status === 'critical';

          const noiseVib = (Math.random() - 0.5) * 0.25;
          const noiseTemp = (Math.random() - 0.5) * 0.3;
          const noisePress = (Math.random() - 0.5) * 0.05;
          const noiseAcoustic = (Math.random() - 0.5) * 0.5;
          const noiseRpm = (Math.random() - 0.5) * 15;
          const noiseCurrent = (Math.random() - 0.5) * 0.2;

          let newVib = Math.max(0.5, m.currentReading.vibration + noiseVib);
          let newTemp = Math.max(35, m.currentReading.temperature + noiseTemp);
          let newPress = Math.max(1.0, m.currentReading.pressure + noisePress);
          let newAcoustic = Math.max(40, m.currentReading.acoustic + noiseAcoustic);

          if (isWarning) {
            newVib = Math.max(4.6, newVib);
          } else if (isCritical) {
            newVib = Math.max(7.2, newVib);
            newTemp = Math.max(86, newTemp);
          }

          // Bound within physical range
          newVib = Number(newVib.toFixed(2));
          newTemp = Number(newTemp.toFixed(1));
          newPress = Number(newPress.toFixed(2));
          newAcoustic = Number(newAcoustic.toFixed(1));
          const newRpm = Math.round(m.currentReading.rpm + noiseRpm);
          const newCurrent = Number((m.currentReading.current + noiseCurrent).toFixed(1));

          const newReading = {
            timestamp: Date.now(),
            vibration: newVib,
            temperature: newTemp,
            pressure: newPress,
            acoustic: newAcoustic,
            rpm: newRpm,
            current: newCurrent,
          };

          const newHistory = [...m.history.slice(1), newReading];

          // Compute dynamic health & failure risk
          let health = 100;
          if (newVib > 4.5) health -= 25;
          if (newVib > 7.1) health -= 35;
          if (newTemp > 75) health -= 20;
          if (newTemp > 85) health -= 25;
          if (newPress < 3.5 || newPress > 7.0) health -= 15;
          health = Math.max(15, Math.min(99, health));

          let calculatedStatus: Machine['status'] = 'optimal';
          if (health < 50 || newVib > 7.1 || newTemp > 85) {
            calculatedStatus = 'critical';
          } else if (health < 80 || newVib > 4.5 || newTemp > 75) {
            calculatedStatus = 'warning';
          }

          const failureRisk = Math.round(100 - health);
          const predictedRulHours = Math.round(Math.max(24, (health / 100) * 1800));

          return {
            ...m,
            healthScore: health,
            status: calculatedStatus,
            failureRisk,
            predictedRulHours,
            currentReading: newReading,
            history: newHistory,
          };
        });
      });
    }, settings.pollingIntervalSeconds * 1000);

    return () => clearInterval(interval);
  }, [isStreaming, settings.pollingIntervalSeconds]);

  // Alert management
  const unreadAlertCount = alerts.filter((a) => !a.acknowledged && !a.resolved).length;

  const acknowledgeAlert = (id: string) => {
    setAlerts((prev) =>
      prev.map((a) => (a.id === id ? { ...a, acknowledged: true } : a))
    );
    setAuditLogs((prev) => [
      {
        id: `LOG-${Date.now().toString().slice(-4)}`,
        timestamp: Date.now(),
        category: 'ALERT',
        action: 'Alert Acknowledged',
        details: `Incident ${id} marked acknowledged by operator.`,
        user: 'Current Operator',
      },
      ...prev,
    ]);
  };

  const resolveAlert = (id: string) => {
    setAlerts((prev) =>
      prev.map((a) => (a.id === id ? { ...a, resolved: true, acknowledged: true } : a))
    );
    setAuditLogs((prev) => [
      {
        id: `LOG-${Date.now().toString().slice(-4)}`,
        timestamp: Date.now(),
        category: 'ALERT',
        action: 'Alert Resolved',
        details: `Incident ${id} resolved and verified safe.`,
        user: 'Current Operator',
      },
      ...prev,
    ]);
  };

  const escalateAlertToWorkOrder = (id: string) => {
    const alert = alerts.find((a) => a.id === id);
    if (!alert) return;

    const newWO: WorkOrder = {
      id: `WO-${Date.now().toString().slice(-4)}`,
      title: `Escalated: ${alert.metric} Exceedance Investigation`,
      machineId: alert.machineId,
      machineName: alert.machineName,
      priority: alert.severity === 'critical' ? 'critical' : 'high',
      status: 'scheduled',
      assignedTechnician: 'Rapid Response Team Alpha',
      createdDate: new Date().toISOString().split('T')[0],
      dueDate: new Date(Date.now() + 48 * 3600000).toISOString().split('T')[0],
      description: `Automated work order escalation from alert ${alert.id}. Recorded value: ${alert.value} exceeding limit of ${alert.threshold}. Immediate on-site vibration probe inspection required.`,
      checklist: [
        { item: 'Inspect mechanical coupling and bearings for physical damage', completed: false },
        { item: 'Measure shaft runout with dial indicator', completed: false },
        { item: 'Verify lubricant level and particulate count', completed: false },
        { item: 'Perform post-repair baseline sensor calibration', completed: false },
      ],
      spareParts: ['Sensor Probe Replacement Kit', 'Precision Shim Pack', 'Vibration Isolator Bushings'],
      estimatedCost: 750,
    };

    setWorkOrders((prev) => [newWO, ...prev]);
    acknowledgeAlert(id);
    setActiveTab('planner');
  };

  const createWorkOrder = (orderData: Omit<WorkOrder, 'id' | 'createdDate'>) => {
    const newOrder: WorkOrder = {
      ...orderData,
      id: `WO-${Date.now().toString().slice(-4)}`,
      createdDate: new Date().toISOString().split('T')[0],
    };
    setWorkOrders((prev) => [newOrder, ...prev]);
    setAuditLogs((prev) => [
      {
        id: `LOG-${Date.now().toString().slice(-4)}`,
        timestamp: Date.now(),
        category: 'WORK_ORDER',
        action: 'Work Order Created',
        details: `Created maintenance task ${newOrder.id} (${newOrder.title}) for ${newOrder.machineName}.`,
        user: 'Current Operator',
        machineId: newOrder.machineId,
      },
      ...prev,
    ]);
  };

  const updateWorkOrderStatus = (id: string, status: WorkOrder['status']) => {
    setWorkOrders((prev) =>
      prev.map((wo) =>
        wo.id === id
          ? {
              ...wo,
              status,
              completedDate: status === 'completed' ? new Date().toISOString().split('T')[0] : wo.completedDate,
            }
          : wo
      )
    );
  };

  const toggleWorkOrderChecklist = (orderId: string, itemIndex: number) => {
    setWorkOrders((prev) =>
      prev.map((wo) => {
        if (wo.id !== orderId) return wo;
        const newChecklist = [...wo.checklist];
        newChecklist[itemIndex] = {
          ...newChecklist[itemIndex],
          completed: !newChecklist[itemIndex].completed,
        };
        return { ...wo, checklist: newChecklist };
      })
    );
  };

  const uploadCustomDataset = (items: DatasetItem[]) => {
    setDataset(items);
    setAuditLogs((prev) => [
      {
        id: `LOG-${Date.now().toString().slice(-4)}`,
        timestamp: Date.now(),
        category: 'SYSTEM',
        action: 'Dataset Uploaded',
        details: `Imported ${items.length} records into Industrial IoT Dataset Explorer.`,
        user: 'Current Operator',
      },
      ...prev,
    ]);
  };

  const generateSampleDataset = () => {
    const newItems: DatasetItem[] = Array.from({ length: 25 }).map((_, i) => {
      const isFail = Math.random() < 0.15;
      const types = ['L', 'M', 'H'] as const;
      const fTypes = [
        'Tool Wear Failure (TWF)',
        'Heat Dissipation Failure (HDF)',
        'Power Failure (PWF)',
        'Overstrain Failure (OSF)',
      ];
      return {
        id: dataset.length + i + 1,
        udi: String(dataset.length + i + 1),
        productId: `${types[i % 3]}${47300 + i}`,
        type: types[i % 3],
        airTempK: Number((298.1 + Math.random() * 3.5).toFixed(1)),
        processTempK: Number((308.2 + Math.random() * 3.8).toFixed(1)),
        rotationalSpeedRpm: Math.round(1350 + Math.random() * 350),
        torqueNm: Number((35 + Math.random() * 32).toFixed(1)),
        toolWearMin: Math.round(Math.random() * 240),
        machineFailure: isFail ? 1 : 0,
        failureType: isFail ? fTypes[Math.floor(Math.random() * fTypes.length)] : 'No Failure',
      };
    });
    setDataset((prev) => [...prev, ...newItems]);
  };

  const simulateAnomaly = (machineId: string) => {
    setMachines((prev) =>
      prev.map((m) => {
        if (m.id !== machineId) return m;
        const spikedReading = {
          ...m.currentReading,
          vibration: 7.8, // Critical threshold exceedance
          temperature: 88.5, // Overheating
          acoustic: 85.2,
        };
        return {
          ...m,
          status: 'critical',
          healthScore: 32,
          failureRisk: 84,
          predictedRulHours: 48,
          currentReading: spikedReading,
          history: [...m.history.slice(1), spikedReading],
        };
      })
    );

    const newAlert: AlertNotification = {
      id: `ALT-${Date.now().toString().slice(-4)}`,
      timestamp: Date.now(),
      machineId,
      machineName: machines.find((m) => m.id === machineId)?.name || 'Machine',
      severity: 'critical',
      metric: 'Vibration & Thermal Spike',
      value: '7.8 mm/s / 88.5 °C',
      threshold: '> 7.1 mm/s & > 85 °C',
      message: 'Critical ISO 10816 Zone D breach! Extreme high-frequency acoustic emission detected alongside severe thermal excursion.',
      acknowledged: false,
      resolved: false,
    };

    setAlerts((prev) => [newAlert, ...prev]);
    playAlertSound();
    setAuditLogs((prev) => [
      {
        id: `LOG-${Date.now().toString().slice(-4)}`,
        timestamp: Date.now(),
        category: 'ALERT',
        action: 'Anomaly Simulated',
        details: `Simulated catastrophic bearing degradation anomaly on asset ${machineId}.`,
        user: 'Current Operator',
        machineId,
      },
      ...prev,
    ]);
  };

  const triggerEmergencyStop = (machineId: string) => {
    setMachines((prev) =>
      prev.map((m) => {
        if (m.id !== machineId) return m;
        return {
          ...m,
          status: 'maintenance',
          healthScore: 60,
          currentReading: {
            ...m.currentReading,
            rpm: 0,
            current: 0,
            vibration: 0.2,
          },
        };
      })
    );
    setAuditLogs((prev) => [
      {
        id: `LOG-${Date.now().toString().slice(-4)}`,
        timestamp: Date.now(),
        category: 'SYSTEM',
        action: 'Emergency Stop Triggered',
        details: `Emergency isolated electrical disconnect triggered on machine ${machineId}. Speed decelerated to 0 RPM.`,
        user: 'Current Operator',
        machineId,
      },
      ...prev,
    ]);
  };

  const toggleStreaming = () => {
    setIsStreaming((prev) => !prev);
  };

  // 6. ML Inference Engine
  const runPrediction = (
    modelType: MLModelType,
    params: {
      vibration: number;
      temperature: number;
      pressure: number;
      acoustic: number;
      rpm: number;
      current: number;
      machineId?: string;
    }
  ): PredictionResult => {
    const { vibration, temperature, pressure, acoustic, rpm } = params;

    // Feature calculation
    const vibNorm = Math.min(1, Math.max(0, (vibration - 1.0) / 7.5));
    const tempNorm = Math.min(1, Math.max(0, (temperature - 40) / 55));
    const pressNorm = Math.abs(pressure - 5.0) / 4.0;
    const acousticNorm = Math.min(1, Math.max(0, (acoustic - 50) / 40));
    const rpmStress = rpm > 3200 ? 0.3 : 0.05;

    // Composite risk calculation with model weights
    let modelWeight = 1.0;
    if (modelType === 'xgboost') modelWeight = 1.05;
    if (modelType === 'random_forest') modelWeight = 0.98;
    if (modelType === 'lstm_autoencoder') modelWeight = 1.02;
    if (modelType === 'isolation_forest') modelWeight = 0.94;

    const rawProb =
      (vibNorm * 0.45 + tempNorm * 0.25 + acousticNorm * 0.15 + pressNorm * 0.1 + rpmStress * 0.05) *
      modelWeight *
      100;

    const failureProbability = Math.min(99, Math.max(2, Math.round(rawProb)));

    // Remaining useful life estimation
    let rulHours = Math.round(1800 * Math.exp(-0.035 * failureProbability));
    if (vibration > 7.1) rulHours = Math.min(rulHours, 36);
    if (temperature > 85) rulHours = Math.min(rulHours, 24);

    // Failure mode diagnostic
    let failureMode: PredictionResult['failureMode'] = 'Normal (No Fault)';
    if (failureProbability > 30) {
      if (vibration > 5.0 && acoustic > 75) {
        failureMode = 'Bearing Degradation';
      } else if (temperature > 78) {
        failureMode = 'Stator Overheating';
      } else if (pressure > 6.8 || pressure < 3.2) {
        failureMode = 'Pump Cavitation';
      } else if (vibration > 4.2 && rpm > 2800) {
        failureMode = 'Shaft Misalignment';
      } else {
        failureMode = 'Tool Wear & Chipping';
      }
    }

    const confidence =
      modelType === 'xgboost'
        ? 98.2
        : modelType === 'random_forest'
        ? 96.5
        : modelType === 'lstm_autoencoder'
        ? 94.8
        : 92.0;

    // SHAP Feature Importance ranking
    const featureImportance = [
      {
        feature: 'Vibration RMS (radial)',
        importance: Math.round(vibNorm * 100),
        impact: vibNorm > 0.6 ? ('critical' as const) : vibNorm > 0.35 ? ('moderate' as const) : ('nominal' as const),
      },
      {
        feature: 'Bearing Operating Temperature',
        importance: Math.round(tempNorm * 90),
        impact: tempNorm > 0.6 ? ('critical' as const) : tempNorm > 0.35 ? ('moderate' as const) : ('nominal' as const),
      },
      {
        feature: 'Ultrasonic Acoustic Emission',
        importance: Math.round(acousticNorm * 80),
        impact: acousticNorm > 0.6 ? ('critical' as const) : acousticNorm > 0.35 ? ('moderate' as const) : ('nominal' as const),
      },
      {
        feature: 'Hydraulic System Pressure',
        importance: Math.round(pressNorm * 70),
        impact: pressNorm > 0.6 ? ('critical' as const) : pressNorm > 0.35 ? ('moderate' as const) : ('nominal' as const),
      },
    ].sort((a, b) => b.importance - a.importance);

    // Prescriptive maintenance action generation
    const prescriptiveActions: string[] = [];
    if (failureMode === 'Bearing Degradation') {
      prescriptiveActions.push(
        'Perform high-purity polyurea lubricant replenishment (ISO VG 68) within 24 hours.',
        'Schedule laser shaft runout and alignment calibration.',
        'Limit spindle rotational speed to 75% maximum duty cycle until vibration drops below 3.5 mm/s.'
      );
    } else if (failureMode === 'Stator Overheating') {
      prescriptiveActions.push(
        'Check cooling fan air intake and heat exchanger radiator for debris obstruction.',
        'Audit 3-phase current balance to verify absence of inter-turn stator winding leakage.',
        'Reduce plant ambient thermal load and verify thermostatic valve opening threshold.'
      );
    } else if (failureMode === 'Pump Cavitation') {
      prescriptiveActions.push(
        'Verify suction head Net Positive Suction Head Available (NPSHa > NPSHr + 0.5m).',
        'Clean suction strainers and inspect mechanical seals for vacuum leakage.',
        'Throttle discharge valve slightly to elevate backpressure away from vapor pressure.'
      );
    } else if (failureMode === 'Shaft Misalignment') {
      prescriptiveActions.push(
        'Execute dual-laser angular and parallel shaft alignment check (<0.04mm tolerance).',
        'Inspect flexible coupling spider inserts for torsional hysteresis or shear tear.',
        'Torque foundation hold-down bolts to specified engineering foot-pounds.'
      );
    } else if (failureMode === 'Tool Wear & Chipping') {
      prescriptiveActions.push(
        'Index or replace carbide insert tool tip before flank wear exceeds 0.3mm limit.',
        'Verify flood coolant nozzle pressure and flow rate directly at cutting shear zone.',
        'Recalibrate feed rate per tooth according to material hardness specifications.'
      );
    } else {
      prescriptiveActions.push(
        'All sensor telemetry within nominal tolerances. Continue scheduled 500-hour inspection interval.',
        'Sensor baseline drift is <0.2%. No proactive intervention required at this cycle.'
      );
    }

    const result: PredictionResult = {
      machineId: params.machineId,
      machineName: machines.find((m) => m.id === params.machineId)?.name || 'Custom Sensor Input',
      timestamp: Date.now(),
      modelUsed: modelType,
      failureProbability,
      remainingUsefulLifeHours: rulHours,
      failureMode,
      confidence,
      anomalyDetected: failureProbability > 35,
      featureImportance,
      prescriptiveActions,
    };

    setLastPrediction(result);

    setAuditLogs((prev) => [
      {
        id: `LOG-${Date.now().toString().slice(-4)}`,
        timestamp: Date.now(),
        category: 'PREDICTION',
        action: 'Inference Executed',
        details: `${modelType.toUpperCase()} computed ${failureProbability}% risk, RUL: ${rulHours} hrs (${failureMode}) for ${result.machineName}.`,
        user: 'AI Pipeline',
        machineId: params.machineId,
      },
      ...prev,
    ]);

    return result;
  };

  // 7. Voice Assistant & Microphone Handling
  const [isVoiceModalOpen, setIsVoiceModalOpen] = useState(false);
  const [micState, setMicState] = useState<MicPermissionState>({
    status: 'not_enabled',
    isRecording: false,
    recognizedText: '',
    confirmedCommand: null,
    audioBlobUrl: null,
  });

  const [pendingCommand, setPendingCommand] = useState<{ label: string; action: () => void } | null>(null);
  const clearPendingCommand = () => setPendingCommand(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const streamRef = useRef<MediaStream | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const speechRecognitionRef = useRef<any>(null);

  const cleanupAudioTracks = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    if (speechRecognitionRef.current) {
      try {
        speechRecognitionRef.current.stop();
      } catch {
        // ignore
      }
    }
  };

  const requestMicPermission = async () => {
    setMicState((prev) => ({ ...prev, status: 'requesting', errorMessage: undefined }));
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        setMicState((prev) => ({
          ...prev,
          status: 'unsupported',
          errorMessage: 'getUserMedia is not supported by your browser.',
        }));
        return;
      }

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      setMicState((prev) => ({ ...prev, status: 'granted' }));
      // Stop tracks immediately after granting until user explicitly clicks start recording
      stream.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    } catch (err: unknown) {
      const error = err as Error;
      setMicState((prev) => ({
        ...prev,
        status: 'denied',
        errorMessage: error.message || 'Microphone access denied.',
      }));
    }
  };

  const startVoiceRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      audioChunksRef.current = [];

      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const url = URL.createObjectURL(audioBlob);
        setMicState((prev) => ({ ...prev, audioBlobUrl: url }));
        cleanupAudioTracks();
      };

      mediaRecorder.start();

      // Web Speech API recognition
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        speechRecognitionRef.current = recognition;
        recognition.continuous = false;
        recognition.interimResults = true;

        // map language to BCP 47 code
        const langMap: Record<LanguageCode, string> = {
          en: 'en-US',
          te: 'te-IN',
          hi: 'hi-IN',
          ta: 'ta-IN',
          es: 'es-ES',
        };
        recognition.lang = langMap[language] || 'en-US';

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        recognition.onresult = (event: any) => {
          const currentTranscript = Array.from(event.results)
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            .map((result: any) => result[0].transcript)
            .join('');
          setMicState((prev) => ({ ...prev, recognizedText: currentTranscript }));
        };

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        recognition.onerror = () => {
          // Keep recording audio even if speech recognizer throws
        };

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        recognition.onend = () => {
          // Stop media recorder as well when user stops talking
          if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
            mediaRecorderRef.current.stop();
          }
          setMicState((prev) => ({ ...prev, isRecording: false }));
        };

        recognition.start();
      }

      setMicState((prev) => ({
        ...prev,
        isRecording: true,
        recognizedText: '',
        confirmedCommand: null,
      }));
    } catch (err: unknown) {
      const error = err as Error;
      setMicState((prev) => ({
        ...prev,
        status: 'denied',
        isRecording: false,
        errorMessage: error.message || 'Could not access microphone.',
      }));
    }
  };

  const stopVoiceRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop();
    }
    if (speechRecognitionRef.current) {
      try {
        speechRecognitionRef.current.stop();
      } catch {
        // ignore
      }
    }
    setMicState((prev) => ({ ...prev, isRecording: false }));
    cleanupAudioTracks();
  };

  const cancelVoiceRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop();
    }
    setMicState((prev) => ({
      ...prev,
      isRecording: false,
      recognizedText: '',
      confirmedCommand: null,
      audioBlobUrl: null,
    }));
    cleanupAudioTracks();
  };

  const playRecordedAudio = () => {
    if (micState.audioBlobUrl) {
      const audio = new Audio(micState.audioBlobUrl);
      audio.play().catch(() => {});
    }
  };

  // Interpretation of voice commands across all 5 languages
  const handleVoiceCommand = (text: string) => {
    const raw = text.toLowerCase().trim();
    if (!raw) return;

    setMicState((prev) => ({ ...prev, recognizedText: text }));

    // Rule matcher
    // 1. Machine Health / Monitoring
    if (
      raw.includes('health') ||
      raw.includes('monitoring') ||
      raw.includes('machine') ||
      raw.includes('ఆరోగ్య') ||
      raw.includes('యంత్ర') ||
      raw.includes('निगरानी') ||
      raw.includes('स्वास्थ्य') ||
      raw.includes('இயந்திர') ||
      raw.includes('monitoreo')
    ) {
      setPendingCommand({
        label: `${t.nav.monitoring} ("${text}")`,
        action: () => {
          setActiveTab('monitoring');
          setIsVoiceModalOpen(false);
        },
      });
      return;
    }

    // 2. Failure Risk / Prediction
    if (
      raw.includes('risk') ||
      raw.includes('failure') ||
      raw.includes('predict') ||
      raw.includes('వైఫల్య') ||
      raw.includes('అంచనా') ||
      raw.includes('जोखिम') ||
      raw.includes('भविष्यवाणी') ||
      raw.includes('தோல்வி') ||
      raw.includes('falla') ||
      raw.includes('predicción')
    ) {
      setPendingCommand({
        label: `${t.nav.prediction} ("${text}")`,
        action: () => {
          setActiveTab('prediction');
          setIsVoiceModalOpen(false);
        },
      });
      return;
    }

    // 3. Alerts
    if (
      raw.includes('alert') ||
      raw.includes('notification') ||
      raw.includes('హెచ్చరిక') ||
      raw.includes('अलर्ट') ||
      raw.includes('सूचना') ||
      raw.includes('எச்சரிக்கை') ||
      raw.includes('alerta')
    ) {
      setPendingCommand({
        label: `${t.nav.alerts} ("${text}")`,
        action: () => {
          setActiveTab('alerts');
          setIsVoiceModalOpen(false);
        },
      });
      return;
    }

    // 4. Themes
    if (raw.includes('dark') || raw.includes('డార్క్') || raw.includes('डार्क') || raw.includes('டார்க்') || raw.includes('oscuro')) {
      setPendingCommand({
        label: `${t.themes.dark} ("${text}")`,
        action: () => {
          setTheme('dark');
          setIsVoiceModalOpen(false);
        },
      });
      return;
    }

    if (raw.includes('light') || raw.includes('లైట్') || raw.includes('लाइट') || raw.includes('லைட்') || raw.includes('claro')) {
      setPendingCommand({
        label: `${t.themes.light} ("${text}")`,
        action: () => {
          setTheme('light');
          setIsVoiceModalOpen(false);
        },
      });
      return;
    }

    if (raw.includes('original') || raw.includes('industrial') || raw.includes('పారిశ్రామిక') || raw.includes('औद्योगिक')) {
      setPendingCommand({
        label: `${t.themes.original} ("${text}")`,
        action: () => {
          setTheme('original');
          setIsVoiceModalOpen(false);
        },
      });
      return;
    }

    // 5. Languages
    if (raw.includes('telugu') || raw.includes('తెలుగు')) {
      setPendingCommand({
        label: `Switch Language: తెలుగు (Telugu)`,
        action: () => {
          setLanguage('te');
          setIsVoiceModalOpen(false);
        },
      });
      return;
    }

    if (raw.includes('hindi') || raw.includes('हिन्दी') || raw.includes('हिंदी')) {
      setPendingCommand({
        label: `Switch Language: हिन्दी (Hindi)`,
        action: () => {
          setLanguage('hi');
          setIsVoiceModalOpen(false);
        },
      });
      return;
    }

    if (raw.includes('tamil') || raw.includes('தமிழ்')) {
      setPendingCommand({
        label: `Switch Language: தமிழ் (Tamil)`,
        action: () => {
          setLanguage('ta');
          setIsVoiceModalOpen(false);
        },
      });
      return;
    }

    if (raw.includes('spanish') || raw.includes('español')) {
      setPendingCommand({
        label: `Switch Language: Español (Spanish)`,
        action: () => {
          setLanguage('es');
          setIsVoiceModalOpen(false);
        },
      });
      return;
    }

    if (raw.includes('english') || raw.includes('ఇంగ్లీష్') || raw.includes('अंग्रेजी') || raw.includes('ஆங்கிலம்') || raw.includes('inglés')) {
      setPendingCommand({
        label: `Switch Language: English`,
        action: () => {
          setLanguage('en');
          setIsVoiceModalOpen(false);
        },
      });
      return;
    }

    // 6. Navigation items
    if (raw.includes('planner') || raw.includes('order') || raw.includes('ప్రణాళిక') || raw.includes('योजनाकार')) {
      setPendingCommand({
        label: `${t.nav.planner} ("${text}")`,
        action: () => {
          setActiveTab('planner');
          setIsVoiceModalOpen(false);
        },
      });
      return;
    }

    if (raw.includes('dataset') || raw.includes('డేటాసెట్') || raw.includes('डेटा')) {
      setPendingCommand({
        label: `${t.nav.dataset} ("${text}")`,
        action: () => {
          setActiveTab('dataset');
          setIsVoiceModalOpen(false);
        },
      });
      return;
    }

    if (raw.includes('model') || raw.includes('మోడల్') || raw.includes('मॉडल')) {
      setPendingCommand({
        label: `${t.nav.models} ("${text}")`,
        action: () => {
          setActiveTab('models');
          setIsVoiceModalOpen(false);
        },
      });
      return;
    }

    if (raw.includes('report') || raw.includes('నివేదిక') || raw.includes('रिपोर्ट') || raw.includes('informe')) {
      setPendingCommand({
        label: `${t.nav.reports} ("${text}")`,
        action: () => {
          setActiveTab('reports');
          setIsVoiceModalOpen(false);
        },
      });
      return;
    }

    if (raw.includes('setting') || raw.includes('సెట్టింగ్') || raw.includes('सेटिंग')) {
      setPendingCommand({
        label: `${t.nav.settings} ("${text}")`,
        action: () => {
          setActiveTab('settings');
          setIsVoiceModalOpen(false);
        },
      });
      return;
    }

    if (raw.includes('about') || raw.includes('గురించి') || raw.includes('बारे')) {
      setPendingCommand({
        label: `${t.nav.about} ("${text}")`,
        action: () => {
          setActiveTab('about');
          setIsVoiceModalOpen(false);
        },
      });
      return;
    }

    // Fallback overview
    setPendingCommand({
      label: `${t.nav.overview} ("${text}")`,
      action: () => {
        setActiveTab('overview');
        setIsVoiceModalOpen(false);
      },
    });
  };

  const confirmAndExecuteVoiceCommand = (commandAction: () => void, label: string) => {
    commandAction();
    setMicState((prev) => ({ ...prev, confirmedCommand: label }));
    clearPendingCommand();
  };

  // Locale-aware formatters
  const formatNumber = (value: number, decimals: number = 1): string => {
    const localeMap: Record<LanguageCode, string> = {
      en: 'en-US',
      te: 'te-IN',
      hi: 'hi-IN',
      ta: 'ta-IN',
      es: 'es-ES',
    };
    return new Intl.NumberFormat(localeMap[language], {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }).format(value);
  };

  const formatDate = (timestamp: number | string): string => {
    const date = new Date(timestamp);
    const localeMap: Record<LanguageCode, string> = {
      en: 'en-US',
      te: 'te-IN',
      hi: 'hi-IN',
      ta: 'ta-IN',
      es: 'es-ES',
    };
    return new Intl.DateTimeFormat(localeMap[language], {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  return (
    <AppContext.Provider
      value={{
        theme,
        setTheme,
        language,
        setLanguage,
        t,
        activeTab,
        setActiveTab,
        selectedMachineId,
        setSelectedMachineId,
        selectedMachine,
        machines,
        isStreaming,
        toggleStreaming,
        alerts,
        unreadAlertCount,
        acknowledgeAlert,
        resolveAlert,
        escalateAlertToWorkOrder,
        workOrders,
        createWorkOrder,
        updateWorkOrderStatus,
        toggleWorkOrderChecklist,
        dataset,
        uploadCustomDataset,
        generateSampleDataset,
        auditLogs,
        settings,
        updateSettings,
        simulateAnomaly,
        triggerEmergencyStop,
        runPrediction,
        lastPrediction,
        isVoiceModalOpen,
        setIsVoiceModalOpen,
        micState,
        requestMicPermission,
        startVoiceRecording,
        stopVoiceRecording,
        cancelVoiceRecording,
        playRecordedAudio,
        handleVoiceCommand,
        confirmAndExecuteVoiceCommand,
        pendingCommand,
        clearPendingCommand,
        formatNumber,
        formatDate,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
