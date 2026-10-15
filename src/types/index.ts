/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type ThemeMode = 'original' | 'light' | 'dark';

export type LanguageCode = 'en' | 'te' | 'hi' | 'ta' | 'es';

export type NavView =
  | 'overview'
  | 'monitoring'
  | 'prediction'
  | 'dataset'
  | 'models'
  | 'planner'
  | 'alerts'
  | 'reports'
  | 'settings'
  | 'about';

export type MachineHealthStatus = 'optimal' | 'warning' | 'critical' | 'maintenance';

export interface SensorReading {
  timestamp: number;
  vibration: number; // mm/s RMS (safe: <4.5, warn: 4.5-7.1, crit: >7.1)
  temperature: number; // °C (safe: <75, warn: 75-85, crit: >85)
  pressure: number; // bar (safe: 4.0-6.5, warn: 3.0-4.0 or 6.5-7.5, crit: <3.0 or >7.5)
  acoustic: number; // dB (safe: <72, warn: 72-82, crit: >82)
  rpm: number; // RPM (nominal: 1800-3600)
  current: number; // Amperes
}

export interface Machine {
  id: string;
  name: string;
  type: string;
  location: string;
  model: string;
  serialNumber: string;
  commissionDate: string;
  operatingHours: number;
  healthScore: number; // 0 - 100
  status: MachineHealthStatus;
  currentReading: SensorReading;
  history: SensorReading[];
  failureRisk: number; // 0 - 100 %
  predictedRulHours: number;
  lastMaintenance: string;
  nextScheduledMaintenance: string;
}

export type MLModelType = 'random_forest' | 'xgboost' | 'lstm_autoencoder' | 'isolation_forest';

export type FailureMode =
  | 'Bearing Degradation'
  | 'Stator Overheating'
  | 'Pump Cavitation'
  | 'Shaft Misalignment'
  | 'Tool Wear & Chipping'
  | 'Normal (No Fault)';

export interface PredictionResult {
  machineId?: string;
  machineName?: string;
  timestamp: number;
  modelUsed: MLModelType;
  failureProbability: number; // 0 - 100 %
  remainingUsefulLifeHours: number;
  failureMode: FailureMode;
  confidence: number; // 0 - 100 %
  anomalyDetected: boolean;
  featureImportance: {
    feature: string;
    importance: number; // 0 - 100
    impact: 'critical' | 'moderate' | 'nominal';
  }[];
  prescriptiveActions: string[];
}

export interface DatasetItem {
  id: number;
  udi: string;
  productId: string;
  type: 'L' | 'M' | 'H';
  airTempK: number;
  processTempK: number;
  rotationalSpeedRpm: number;
  torqueNm: number;
  toolWearMin: number;
  machineFailure: 0 | 1;
  failureType: string;
}

export interface ModelMetrics {
  name: string;
  type: MLModelType;
  accuracy: number;
  precision: number;
  recall: number;
  f1Score: number;
  rocAuc: number;
  latencyMs: number;
  trainingSamples: number;
  parameters: string;
}

export type WorkOrderPriority = 'critical' | 'high' | 'medium' | 'low';
export type WorkOrderStatus = 'scheduled' | 'in_progress' | 'completed' | 'overdue';

export interface WorkOrder {
  id: string;
  title: string;
  machineId: string;
  machineName: string;
  priority: WorkOrderPriority;
  status: WorkOrderStatus;
  assignedTechnician: string;
  createdDate: string;
  dueDate: string;
  completedDate?: string;
  description: string;
  checklist: { item: string; completed: boolean }[];
  spareParts: string[];
  estimatedCost: number;
}

export type AlertSeverity = 'critical' | 'warning' | 'info';

export interface AlertNotification {
  id: string;
  timestamp: number;
  machineId: string;
  machineName: string;
  severity: AlertSeverity;
  metric: string;
  value: string;
  threshold: string;
  message: string;
  acknowledged: boolean;
  resolved: boolean;
}

export interface AuditLogEntry {
  id: string;
  timestamp: number;
  category: 'PREDICTION' | 'ALERT' | 'WORK_ORDER' | 'SYSTEM' | 'TELEMETRY';
  action: string;
  details: string;
  user: string;
  machineId?: string;
}

export interface SystemSettings {
  pollingIntervalSeconds: number; // 1, 2, 5, 10
  anomalySensitivity: 'low' | 'balanced' | 'high';
  tempWarningThreshold: number;
  tempCriticalThreshold: number;
  vibrationWarningThreshold: number;
  vibrationCriticalThreshold: number;
  pressureWarningMinThreshold: number;
  soundAlertsEnabled: boolean;
  autoAcknowledgeLowRisk: boolean;
  voiceLanguage: LanguageCode;
  voiceAutoListen: boolean;
}

export interface MicPermissionState {
  status: 'not_enabled' | 'requesting' | 'granted' | 'denied' | 'unsupported';
  isRecording: boolean;
  recognizedText: string;
  confirmedCommand: string | null;
  audioBlobUrl: string | null;
  errorMessage?: string;
}
