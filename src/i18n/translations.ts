/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { LanguageCode } from '../types';

export interface Translations {
  appName: string;
  tagline: string;
  studentProject: string;
  nav: {
    overview: string;
    monitoring: string;
    prediction: string;
    dataset: string;
    models: string;
    planner: string;
    alerts: string;
    reports: string;
    settings: string;
    about: string;
  };
  themes: {
    original: string;
    light: string;
    dark: string;
  };
  common: {
    status: string;
    actions: string;
    refresh: string;
    exportCsv: string;
    printReport: string;
    save: string;
    cancel: string;
    delete: string;
    edit: string;
    apply: string;
    reset: string;
    search: string;
    filter: string;
    all: string;
    normal: string;
    warning: string;
    critical: string;
    optimal: string;
    active: string;
    hours: string;
    days: string;
    details: string;
    viewAll: string;
    close: string;
    confirm: string;
  };
  sensors: {
    vibration: string;
    temperature: string;
    pressure: string;
    acoustic: string;
    rpm: string;
    current: string;
    vibrationUnit: string;
    tempUnit: string;
    pressureUnit: string;
    acousticUnit: string;
    rpmUnit: string;
    currentUnit: string;
  };
  overview: {
    title: string;
    subtitle: string;
    fleetHealth: string;
    activeAssets: string;
    highRiskMachines: string;
    avgRul: string;
    liveTelemetry: string;
    telemetryDesc: string;
    machineFleetStatus: string;
    recentIncidents: string;
    quickPrediction: string;
    viewMonitoring: string;
    runAiDiagnostic: string;
    noActiveIncidents: string;
    allSystemsNominal: string;
  };
  monitoring: {
    title: string;
    subtitle: string;
    selectMachine: string;
    machineDetails: string;
    serialNo: string;
    operatingHours: string;
    commissionDate: string;
    liveGauges: string;
    frequencySpectrum: string;
    frequencyDesc: string;
    acousticWaveform: string;
    acousticDesc: string;
    emergencyStop: string;
    emergencyStopConfirm: string;
    tuneThresholds: string;
    safeZone: string;
    warnZone: string;
    critZone: string;
  };
  prediction: {
    title: string;
    subtitle: string;
    inputParameters: string;
    loadLiveValues: string;
    selectModel: string;
    runInference: string;
    inferenceRunning: string;
    resultsTitle: string;
    failureProbability: string;
    predictedRul: string;
    failureMode: string;
    confidence: string;
    shapImportance: string;
    shapDesc: string;
    prescriptiveTitle: string;
    prescriptiveDesc: string;
    scheduleTicket: string;
    ticketScheduled: string;
    models: {
      randomForest: string;
      randomForestDesc: string;
      xgboost: string;
      xgboostDesc: string;
      lstm: string;
      lstmDesc: string;
      isolationForest: string;
      isolationForestDesc: string;
    };
  };
  dataset: {
    title: string;
    subtitle: string;
    selectDataset: string;
    uploadDataset: string;
    generateSample: string;
    totalRecords: string;
    featuresCount: string;
    failureRate: string;
    avgToolWear: string;
    searchPlaceholder: string;
    filterFailure: string;
    columnUdi: string;
    columnProduct: string;
    columnType: string;
    columnAirTemp: string;
    columnProcessTemp: string;
    columnRpm: string;
    columnTorque: string;
    columnToolWear: string;
    columnFailure: string;
    columnFailureType: string;
    uploadInstructions: string;
    dropFileHere: string;
  };
  models: {
    title: string;
    subtitle: string;
    comparisonScorecard: string;
    accuracy: string;
    precision: string;
    recall: string;
    f1Score: string;
    rocAuc: string;
    latency: string;
    confusionMatrix: string;
    truePositive: string;
    falsePositive: string;
    trueNegative: string;
    falseNegative: string;
    rocCurve: string;
    precisionRecallCurve: string;
    trainingLossHistory: string;
  };
  planner: {
    title: string;
    subtitle: string;
    createWorkOrder: string;
    newWorkOrderTitle: string;
    mtbf: string;
    mttr: string;
    openOrders: string;
    completedOrders: string;
    orderTitle: string;
    machine: string;
    priority: string;
    assignedTech: string;
    dueDate: string;
    spareParts: string;
    estimatedCost: string;
    checklist: string;
    addChecklistItem: string;
    markCompleted: string;
  };
  alerts: {
    title: string;
    subtitle: string;
    activeAlerts: string;
    filterSeverity: string;
    acknowledge: string;
    resolve: string;
    escalateToOrder: string;
    acknowledged: string;
    resolved: string;
    triggerRules: string;
    noAlerts: string;
  };
  reports: {
    title: string;
    subtitle: string;
    executiveSummary: string;
    costAvoided: string;
    downtimePrevented: string;
    aiAccuracyReport: string;
    auditLog: string;
    timestamp: string;
    category: string;
    eventAction: string;
    operator: string;
    downloadPdf: string;
  };
  settings: {
    title: string;
    subtitle: string;
    pollingInterval: string;
    pollingIntervalDesc: string;
    anomalySensitivity: string;
    anomalySensitivityDesc: string;
    thresholdConfig: string;
    soundAlerts: string;
    voiceSettings: string;
    resetDefaults: string;
  };
  about: {
    title: string;
    subtitle: string;
    projectOverview: string;
    projectDesc: string;
    architectureTitle: string;
    architectureDesc: string;
    methodologyTitle: string;
    methodologyDesc: string;
    academicCredits: string;
    studentLead: string;
    facultyAdvisor: string;
    department: string;
    techStack: string;
    references: string;
  };
  voice: {
    micTitle: string;
    enableMic: string;
    notEnabled: string;
    requesting: string;
    granted: string;
    denied: string;
    unsupported: string;
    startRecording: string;
    stopRecording: string;
    cancel: string;
    playRecording: string;
    listening: string;
    trySpeaking: string;
    commandExample1: string;
    commandExample2: string;
    commandExample3: string;
    commandExample4: string;
    commandExample5: string;
    confirmCommandTitle: string;
    confirmExecute: string;
    fallbackInputPlaceholder: string;
    fallbackSubmit: string;
    speechDisclaimer: string;
    recognizedTextPrompt: string;
  };
}

export const translations: Record<LanguageCode, Translations> = {
  en: {
    appName: 'PredictAI',
    tagline: 'Predict Failures. Prevent Downtime.',
    studentProject: 'Student AI/ML & Industrial IoT Capstone',
    nav: {
      overview: 'Overview Dashboard',
      monitoring: 'Machine Monitoring',
      prediction: 'AI Failure Prediction',
      dataset: 'Dataset Explorer',
      models: 'Model Performance',
      planner: 'Maintenance Planner',
      alerts: 'Alerts & Notifications',
      reports: 'Reports & History',
      settings: 'Settings & Preferences',
      about: 'About Project',
    },
    themes: {
      original: 'Industrial Theme',
      light: 'Light Theme',
      dark: 'Dark Theme',
    },
    common: {
      status: 'Status',
      actions: 'Actions',
      refresh: 'Refresh',
      exportCsv: 'Export CSV',
      printReport: 'Print / Save Report',
      save: 'Save Changes',
      cancel: 'Cancel',
      delete: 'Delete',
      edit: 'Edit',
      apply: 'Apply',
      reset: 'Reset Defaults',
      search: 'Search equipment or logs...',
      filter: 'Filter',
      all: 'All',
      normal: 'Normal',
      warning: 'Warning',
      critical: 'Critical',
      optimal: 'Optimal',
      active: 'Active',
      hours: 'hrs',
      days: 'days',
      details: 'Details',
      viewAll: 'View All',
      close: 'Close',
      confirm: 'Confirm Action',
    },
    sensors: {
      vibration: 'Vibration RMS',
      temperature: 'Bearing Temp',
      pressure: 'Hydraulic Pressure',
      acoustic: 'Acoustic Emission',
      rpm: 'Motor Speed',
      current: 'Drive Current',
      vibrationUnit: 'mm/s',
      tempUnit: '°C',
      pressureUnit: 'bar',
      acousticUnit: 'dB',
      rpmUnit: 'RPM',
      currentUnit: 'A',
    },
    overview: {
      title: 'Fleet Health & Anomaly Overview',
      subtitle: 'Real-time telemetry and machine learning failure diagnostics across plant assets',
      fleetHealth: 'Fleet Health Index',
      activeAssets: 'Monitored Assets',
      highRiskMachines: 'High Risk Machines',
      avgRul: 'Avg. Remaining Useful Life',
      liveTelemetry: 'Live Telemetry Telemetry Stream',
      telemetryDesc: 'Continuous vibration, thermal, and acoustic sensor readings',
      machineFleetStatus: 'Machine Fleet Status',
      recentIncidents: 'Recent Anomaly Events',
      quickPrediction: 'Quick Predict',
      viewMonitoring: 'Inspect Machine',
      runAiDiagnostic: 'Run AI Diagnostic',
      noActiveIncidents: 'No critical incidents detected in the last 24 hours.',
      allSystemsNominal: 'All monitored assets are operating within nominal engineering tolerance thresholds.',
    },
    monitoring: {
      title: 'Real-Time Machine Monitoring',
      subtitle: 'High-frequency sensor telemetry, FFT vibration spectrum, and acoustic signal analytics',
      selectMachine: 'Select Machine to Monitor',
      machineDetails: 'Asset Specification',
      serialNo: 'Serial Number',
      operatingHours: 'Operating Hours',
      commissionDate: 'Commission Date',
      liveGauges: 'Live Sensor Telemetry',
      frequencySpectrum: 'FFT Vibration Harmonic Spectrum (0 - 500 Hz)',
      frequencyDesc: 'Fast Fourier Transform of radial accelerometer showing 1X, 2X running harmonics and bearing defect frequencies',
      acousticWaveform: 'High-Frequency Ultrasonic Waveform',
      acousticDesc: 'Real-time acoustic emission envelope detecting subsurface micro-cracks and friction transients',
      emergencyStop: 'Emergency Isolation Trigger',
      emergencyStopConfirm: 'Are you sure you want to trigger emergency shutdown simulation for this unit?',
      tuneThresholds: 'Threshold Margins',
      safeZone: 'Safe Operating Zone',
      warnZone: 'Warning Boundary',
      critZone: 'Critical Threshold',
    },
    prediction: {
      title: 'AI Machine Failure Prediction Engine',
      subtitle: 'Multi-model inference computing failure probabilities, remaining useful life, and root-cause diagnostics',
      inputParameters: 'Sensor Feature Vector Inputs',
      loadLiveValues: 'Populate from Selected Machine',
      selectModel: 'Select Machine Learning Model',
      runInference: 'Execute Model Prediction',
      inferenceRunning: 'Running ML Inference & SHAP Analysis...',
      resultsTitle: 'Inference Diagnostics & Prescriptive Action',
      failureProbability: 'Failure Probability',
      predictedRul: 'Predicted Remaining Useful Life (RUL)',
      failureMode: 'Classified Failure Mode',
      confidence: 'Model Confidence',
      shapImportance: 'SHAP Feature Contribution Weights',
      shapDesc: 'Sensor feature impact ranking driving the predicted anomaly risk score',
      prescriptiveTitle: 'Prescriptive Maintenance Recommendation',
      prescriptiveDesc: 'Immediate engineering mitigations recommended based on failure mode classification',
      scheduleTicket: 'Create Automated Maintenance Ticket',
      ticketScheduled: 'Work Order Dispatched to Maintenance Planner!',
      models: {
        randomForest: 'Random Forest Ensemble',
        randomForestDesc: 'Robust decision tree ensemble trained on 10,000 multi-spectral sensor records',
        xgboost: 'XGBoost Gradient Boosting',
        xgboostDesc: 'High-speed boosted decision trees with fine-grained failure probability calibration',
        lstm: 'LSTM Autoencoder',
        lstmDesc: 'Temporal deep learning network detecting sequential degradation patterns',
        isolationForest: 'Isolation Forest (Anomaly)',
        isolationForestDesc: 'Unsupervised tree isolation identifying multi-dimensional sensor outliers',
      },
    },
    dataset: {
      title: 'Industrial IoT Dataset Explorer',
      subtitle: 'Inspect training records from AI4I 2020 predictive maintenance benchmark and live sensor telemetry',
      selectDataset: 'Choose Dataset Source',
      uploadDataset: 'Upload Custom CSV/JSON',
      generateSample: 'Generate Live Stream Samples',
      totalRecords: 'Total Records Loaded',
      featuresCount: 'Engineered Features',
      failureRate: 'Historical Failure Rate',
      avgToolWear: 'Average Tool Wear',
      searchPlaceholder: 'Search by Product ID, Type, or Failure Type...',
      filterFailure: 'Failure Filter',
      columnUdi: 'UID',
      columnProduct: 'Product ID',
      columnType: 'Type',
      columnAirTemp: 'Air Temp (K)',
      columnProcessTemp: 'Process Temp (K)',
      columnRpm: 'Rotational Speed (RPM)',
      columnTorque: 'Torque (Nm)',
      columnToolWear: 'Tool Wear (min)',
      columnFailure: 'Machine Failure',
      columnFailureType: 'Failure Type',
      uploadInstructions: 'Upload a CSV or JSON file containing industrial telemetry records.',
      dropFileHere: 'Drag & drop file or click to browse (Max 5MB)',
    },
    models: {
      title: 'AI Model Performance & Validation Matrix',
      subtitle: 'Comparative evaluation of predictive maintenance models on cross-validated industrial datasets',
      comparisonScorecard: 'Model Comparison Scorecard',
      accuracy: 'Accuracy',
      precision: 'Precision',
      recall: 'Recall',
      f1Score: 'F1 Score',
      rocAuc: 'ROC-AUC',
      latency: 'Inference Latency',
      confusionMatrix: 'Confusion Matrix (Test Split)',
      truePositive: 'True Positive (TP)',
      falsePositive: 'False Positive (FP)',
      trueNegative: 'True Negative (TN)',
      falseNegative: 'False Negative (FN)',
      rocCurve: 'Receiver Operating Characteristic (ROC)',
      precisionRecallCurve: 'Precision-Recall Curve',
      trainingLossHistory: 'Cross-Entropy Loss & Validation Convergence',
    },
    planner: {
      title: 'Preventive Maintenance Planner & Work Orders',
      subtitle: 'Schedule work orders, track technician dispatches, and optimize MTBF / MTTR turnaround',
      createWorkOrder: 'Create Work Order',
      newWorkOrderTitle: 'Schedule New Maintenance Work Order',
      mtbf: 'Mean Time Between Failures (MTBF)',
      mttr: 'Mean Time to Repair (MTTR)',
      openOrders: 'Active Work Orders',
      completedOrders: 'Completed Maintenance',
      orderTitle: 'Order Title',
      machine: 'Target Asset',
      priority: 'Priority Level',
      assignedTech: 'Assigned Lead Technician',
      dueDate: 'Scheduled Due Date',
      spareParts: 'Required Spare Parts',
      estimatedCost: 'Estimated Cost ($)',
      checklist: 'Procedure Checklist',
      addChecklistItem: 'Add checklist task...',
      markCompleted: 'Mark as Completed',
    },
    alerts: {
      title: 'Alerts, Notifications & Incident Stream',
      subtitle: 'Real-time telemetry threshold triggers, automated escalations, and incident acknowledgment',
      activeAlerts: 'Active Incident Alerts',
      filterSeverity: 'Filter by Severity',
      acknowledge: 'Acknowledge',
      resolve: 'Resolve Incident',
      escalateToOrder: 'Escalate to Work Order',
      acknowledged: 'Acknowledged',
      resolved: 'Resolved',
      triggerRules: 'Configured Automated Trigger Rules',
      noAlerts: 'Zero unacknowledged alarms. All machinery sensors operating within safe parameters.',
    },
    reports: {
      title: 'Engineering Reports & Equipment Audit Logs',
      subtitle: 'Quantified maintenance ROI, downtime avoided metrics, and immutable audit logs',
      executiveSummary: 'Executive Maintenance Summary',
      costAvoided: 'Estimated Downtime Cost Avoided',
      downtimePrevented: 'Unplanned Downtime Hours Avoided',
      aiAccuracyReport: 'Predictive Intervention Success Rate',
      auditLog: 'System & Telemetry Audit Log',
      timestamp: 'Timestamp',
      category: 'Category',
      eventAction: 'Action Taken',
      operator: 'User / Source',
      downloadPdf: 'Print / Export PDF Report',
    },
    settings: {
      title: 'System Preferences & Sensor Configuration',
      subtitle: 'Tune polling frequencies, trigger thresholds, anomaly sensitivity, and audio cues',
      pollingInterval: 'Live Telemetry Refresh Interval',
      pollingIntervalDesc: 'Frequency of mock sensor telemetry polling and harmonic spectrum recalculation',
      anomalySensitivity: 'Inference Anomaly Sensitivity',
      anomalySensitivityDesc: 'Standard threshold tuning for statistical anomaly detection algorithm',
      thresholdConfig: 'Sensor Warning & Critical Limits',
      soundAlerts: 'Audio Alarm Notification on Critical Exceedance',
      voiceSettings: 'Voice Assistant Default Language',
      resetDefaults: 'Reset to Factory Defaults',
    },
    about: {
      title: 'About PredictAI Capstone Project',
      subtitle: 'Student-developed Industrial IoT and Machine Learning Predictive Maintenance Architecture',
      projectOverview: 'Project Overview & Research Objectives',
      projectDesc: 'PredictAI is an end-to-end intelligent predictive maintenance solution developed as an academic capstone. Modern manufacturing facilities suffer millions of dollars in unexpected downtime due to undetected mechanical wear. PredictAI bridges high-frequency IoT sensor telemetry with machine learning classifiers and time-series autoencoders to detect incipient degradation, forecast Remaining Useful Life (RUL), and prescribe proactive engineering work orders before catastrophic failure occurs.',
      architectureTitle: 'End-to-End System Architecture',
      architectureDesc: 'Physical Sensors (Accelerometers, Thermocouples, Piezoelectric Acoustic) → Edge Microcontroller & MQTT Gateway → Feature Extraction (FFT, Kurtosis, RMS, Crest Factor) → ML Inference Engine (Random Forest, XGBoost, LSTM) → Prescriptive Actions & Dispatcher.',
      methodologyTitle: 'Data Methodology & Signal Processing',
      methodologyDesc: 'Models are validated against the AI4I 2020 Predictive Maintenance Dataset and NASA C-MAPSS Turbofan degradation streams. Sensor signals undergo sliding-window RMS calculation, frequency-domain FFT peak harmonic tracking, and SHAP explainability attribution.',
      academicCredits: 'Academic & Development Credits',
      studentLead: 'Lead Student Engineer: Nethra Konjeti',
      facultyAdvisor: 'Academic Guidance & Mentorship: Department of Computer Science & Engineering',
      department: 'Specialization: Artificial Intelligence, Machine Learning & Industrial Internet of Things',
      techStack: 'Technologies Used: React 19, TypeScript, Tailwind CSS, Lucide Icons, Web Speech API, Motion Engine',
      references: 'Academic Literature & Standard References: ISO 10816 Mechanical Vibration Standards, NASA C-MAPSS Dataset, UCI Machine Learning Repository (AI4I 2020)',
    },
    voice: {
      micTitle: 'Voice Assistant & Speech Commands',
      enableMic: 'Enable Microphone',
      notEnabled: 'Microphone is currently disabled. Click Enable to begin.',
      requesting: 'Requesting microphone permission from browser...',
      granted: 'Microphone access granted. Ready for voice commands.',
      denied: 'Microphone permission denied. Please allow microphone access in your browser settings.',
      unsupported: 'Browser does not support Web Speech Recognition API. You can use the text command bar below.',
      startRecording: 'Start Voice Input',
      stopRecording: 'Stop Voice Input',
      cancel: 'Cancel',
      playRecording: 'Play Recorded Audio',
      listening: 'Listening to your voice command...',
      trySpeaking: 'Try speaking one of these commands:',
      commandExample1: '"Show machine health"',
      commandExample2: '"Check machine failure risk"',
      commandExample3: '"Open maintenance alerts"',
      commandExample4: '"Switch to dark theme"',
      commandExample5: '"Change language to Telugu"',
      confirmCommandTitle: 'Confirm Spoken Command Execution',
      confirmExecute: 'Execute Command',
      fallbackInputPlaceholder: 'Or type a command (e.g., "check failure risk", "switch to light theme")...',
      fallbackSubmit: 'Run Command',
      speechDisclaimer: 'Voice recognition accuracy and language capability depend on your browser engine (e.g. Chrome, Edge, Safari).',
      recognizedTextPrompt: 'Recognized Voice Command:',
    },
  },

  te: {
    appName: 'PredictAI',
    tagline: 'వైఫల్యాలను అంచనా వేయండి. డౌన్‌టైమ్‌ను నివారించండి.',
    studentProject: 'విద్యార్థి AI/ML మరియు పారిశ్రామిక IoT ప్రాజెక్ట్',
    nav: {
      overview: 'సమీక్ష డాష్‌బోర్డ్',
      monitoring: 'యంత్రాల పర్యవేక్షణ',
      prediction: 'AI వైఫల్య అంచనా',
      dataset: 'డేటాసెట్ అన్వేషకుడు',
      models: 'మోడల్ పనితీరు',
      planner: 'నిర్వహణ ప్రణాళిక',
      alerts: 'హెచ్చరికలు & నోటిఫికేషన్లు',
      reports: 'నివేదికలు & చరిత్ర',
      settings: 'సెట్టింగ్‌లు & ప్రాధాన్యతలు',
      about: 'ప్రాజెక్ట్ గురించి',
    },
    themes: {
      original: 'పారిశ్రామిక థీమ్',
      light: 'లైట్ థీమ్',
      dark: 'డార్క్ థీమ్',
    },
    common: {
      status: 'స్థితి',
      actions: 'చర్యలు',
      refresh: 'రిఫ్రెష్',
      exportCsv: 'CSV ఎగుమతి',
      printReport: 'నివేదిక ముద్రించు',
      save: 'భద్రపరచు',
      cancel: 'రద్దు చేయి',
      delete: 'తొలగించు',
      edit: 'సవరించు',
      apply: 'వర్తించు',
      reset: 'డిఫాల్ట్‌లకు రీసెట్',
      search: 'పరికరాలు లేదా లాగ్‌లను శోధించండి...',
      filter: 'ఫిల్టర్',
      all: 'అన్నీ',
      normal: 'సాధారణం',
      warning: 'హెచ్చరిక',
      critical: 'క్లిష్టమైనది',
      optimal: 'ఉత్తమమైనది',
      active: 'క్రియాశీలకం',
      hours: 'గంటలు',
      days: 'రోజులు',
      details: 'వివరాలు',
      viewAll: 'అన్నీ చూడండి',
      close: 'మూసివేయి',
      confirm: 'చర్యను నిర్ధారించండి',
    },
    sensors: {
      vibration: 'కంపనం RMS',
      temperature: 'బేరింగ్ ఉష్ణోగ్రత',
      pressure: 'హైడ్రాలిక్ పీడనం',
      acoustic: 'ధ్వని ఉద్గారాలు',
      rpm: 'మోటారు వేగం',
      current: 'డ్రైవ్ కరెంట్',
      vibrationUnit: 'mm/s',
      tempUnit: '°C',
      pressureUnit: 'bar',
      acousticUnit: 'dB',
      rpmUnit: 'RPM',
      currentUnit: 'A',
    },
    overview: {
      title: 'పరికరాల ఆరోగ్యం & అసహజతల సమీక్ష',
      subtitle: 'కర్మాగార యంత్రాలలో నిజ సమయ సెన్సార్ డేటా మరియు AI వైఫల్య విశ్లేషణ',
      fleetHealth: 'మొత్తం ఆరోగ్య సూచిక',
      activeAssets: 'పర్యవేక్షించబడుతున్న యంత్రాలు',
      highRiskMachines: 'అధిక ప్రమాదకర యంత్రాలు',
      avgRul: 'సగటు మిగిలిన ఉపయోగకర జీవితం (RUL)',
      liveTelemetry: 'లైవ్ సెన్సార్ టెలిమెట్రీ స్ట్రీమ్',
      telemetryDesc: 'నిరంతర కంపనం, ఉష్ణ మరియు ధ్వని రీడింగులు',
      machineFleetStatus: 'యంత్రాల సముదాయం స్థితి',
      recentIncidents: 'ఇటీవలి హెచ్చరికలు',
      quickPrediction: 'త్వరిత అంచనా',
      viewMonitoring: 'యంత్రాన్ని పరిశీలించు',
      runAiDiagnostic: 'AI నిర్ధారణను ప్రారంభించు',
      noActiveIncidents: 'గత 24 గంటల్లో ఎటువంటి క్లిష్టమైన సమస్యలు నమోదు కాలేదు.',
      allSystemsNominal: 'అన్ని యంత్రాలు సరైన పరిమితుల్లో పనిచేస్తున్నాయి.',
    },
    monitoring: {
      title: 'నిజ సమయ యంత్ర పర్యవేక్షణ',
      subtitle: 'హై-ఫ్రీక్వెన్సీ సెన్సార్ రీడింగ్‌లు, FFT కంపన స్పెక్ట్రమ్ మరియు అకౌస్టిక్ విశ్లేషణ',
      selectMachine: 'యంత్రాన్ని ఎంచుకోండి',
      machineDetails: 'పరికర స్పెసిఫికేషన్',
      serialNo: 'సీరియల్ నంబర్',
      operatingHours: 'పనిచేసిన గంటలు',
      commissionDate: 'ప్రారంభ తేదీ',
      liveGauges: 'లైవ్ సెన్సార్ గేజ్‌లు',
      frequencySpectrum: 'FFT కంపన హార్మోనిక్ స్పెక్ట్రమ్ (0 - 500 Hz)',
      frequencyDesc: 'రొటేషనల్ మరియు బేరింగ్ లోపాలను గుర్తించే ఫాస్ట్ ఫోరియర్ ట్రాన్స్‌ఫార్మ్ స్పెక్ట్రమ్',
      acousticWaveform: 'అల్ట్రాసోనిక్ ధ్వని వేవ్‌ఫార్మ్',
      acousticDesc: 'లోపలి సూక్ష్మ పగుళ్లు మరియు ఘర్షణను గుర్తించే నిజ సమయ ధ్వని సంకేతాలు',
      emergencyStop: 'ఎమర్జెన్సీ షట్‌డౌన్ స్విచ్',
      emergencyStopConfirm: 'మీరు నిజంగా ఈ యంత్రాన్ని అత్యవసరంగా ఆపాలనుకుంటున్నారా?',
      tuneThresholds: 'పరిమితుల సవరణ',
      safeZone: 'సురక్షిత మండలం',
      warnZone: 'హెచ్చరిక పరిమితి',
      critZone: 'క్లిష్టమైన పరిమితి',
    },
    prediction: {
      title: 'AI యంత్ర వైఫల్య అంచనా వ్యవస్థ',
      subtitle: 'వైఫల్య సంభావ్యత, మిగిలిన ఆయుష్షు (RUL) మరియు కారణాలను అంచనా వేసే AI మోడల్స్',
      inputParameters: 'సెన్సార్ పారామితులు',
      loadLiveValues: 'లైవ్ డేటాను నింపండి',
      selectModel: 'మెషిన్ లెర్నింగ్ మోడల్ ఎంచుకోండి',
      runInference: 'అంచనాను అమలు చేయండి',
      inferenceRunning: 'AI విశ్లేషణ జరుగుతోంది...',
      resultsTitle: 'అంచనా ఫలితాలు & సిఫార్సులు',
      failureProbability: 'వైఫల్య సంభావ్యత',
      predictedRul: 'మిగిలిన ఉపయోగకర జీవితం (RUL)',
      failureMode: 'వైఫల్య రకం',
      confidence: 'మోడల్ విశ్వసనీయత',
      shapImportance: 'SHAP సెన్సార్ ప్రభావం',
      shapDesc: 'వైఫల్య ప్రమాదానికి దారితీసిన ముఖ్యమైన సెన్సార్ విలువల ప్రాధాన్యత',
      prescriptiveTitle: 'నివారణ నిర్వహణ సిఫార్సు',
      prescriptiveDesc: 'యంత్ర వైఫల్యాన్ని నివారించడానికి తక్షణ చర్యల సిఫార్సు',
      scheduleTicket: 'నిర్వహణ టికెట్‌ను సృష్టించండి',
      ticketScheduled: 'వర్క్ ఆర్డర్ ప్లానర్‌కు విజయవంతంగా పంపబడింది!',
      models: {
        randomForest: 'ర్యాండమ్ ఫారెస్ట్ ఎన్సెంబుల్',
        randomForestDesc: 'బహుళ డెసిషన్ ట్రీల కలయికతో కూడిన నమ్మకమైన మోడల్',
        xgboost: 'XGBoost గ్రేడియంట్ బూస్టింగ్',
        xgboostDesc: 'అత్యధిక ఖచ్చితత్వం మరియు వేగవంతమైన గణన',
        lstm: 'LSTM ఆటోఎన్‌కోడర్',
        lstmDesc: 'సీక్వెన్షియల్ టైమ్-సిరీస్ లోపాలను గుర్తించే డీప్ లెర్నింగ్',
        isolationForest: 'ఐసోలేషన్ ఫారెస్ట్',
        isolationForestDesc: 'అసహజతలను త్వరగా వేరుచేసే పద్ధతి',
      },
    },
    dataset: {
      title: 'పారిశ్రామిక IoT డేటాసెట్ ఎక్స్‌ప్లోరర్',
      subtitle: 'AI4I 2020 ప్రిడిక్టివ్ మెయింటెనెన్స్ డేటాసెట్ మరియు లైవ్ సెన్సార్ రికార్డులను పరిశీలించండి',
      selectDataset: 'డేటాసెట్ ఎంచుకోండి',
      uploadDataset: 'CSV/JSON అప్‌లోడ్ చేయండి',
      generateSample: 'లైవ్ నమూనాలు ఉత్పత్తి చేయండి',
      totalRecords: 'మొత్తం రికార్డులు',
      featuresCount: 'ఫీచర్ల సంఖ్య',
      failureRate: 'వైఫల్య రేటు',
      avgToolWear: 'సగటు టూల్ అరుగుదల',
      searchPlaceholder: 'ఉత్పత్తి ఐడీ లేదా రకం ద్వారా శోధించండి...',
      filterFailure: 'వైఫల్య ఫిల్టర్',
      columnUdi: 'UID',
      columnProduct: 'ఉత్పత్తి ID',
      columnType: 'రకం',
      columnAirTemp: 'గాలి ఉష్ణోగ్రత (K)',
      columnProcessTemp: 'ప్రాసెస్ ఉష్ణోగ్రత (K)',
      columnRpm: 'వేగం (RPM)',
      columnTorque: 'టార్క్ (Nm)',
      columnToolWear: 'టూల్ అరుగుదల (నిమిషాలు)',
      columnFailure: 'యంత్ర వైఫల్యం',
      columnFailureType: 'వైఫల్య రకం',
      uploadInstructions: 'పారిశ్రామిక టెలిమెట్రీ రికార్డులు ఉన్న CSV లేదా JSON ఫైల్‌ను అప్‌లోడ్ చేయండి.',
      dropFileHere: 'ఫైల్‌ను ఇక్కడ లాగి వదలండి లేదా క్లిక్ చేయండి',
    },
    models: {
      title: 'AI మోడల్ పనితీరు & ధృవీకరణ',
      subtitle: 'పారిశ్రామిక డేటాపై మెషిన్ లెర్నింగ్ మోడళ్ల పనితీరు కొలతలు',
      comparisonScorecard: 'మోడల్స్ పోలిక కార్డు',
      accuracy: 'ఖచ్చితత్వం (Accuracy)',
      precision: 'ప్రిసిషన్ (Precision)',
      recall: 'రీకాల్ (Recall)',
      f1Score: 'F1 స్కోరు',
      rocAuc: 'ROC-AUC',
      latency: 'అనుమితి జాప్యం (Latency)',
      confusionMatrix: 'కన్‌ఫ్యూజన్ మ్యాట్రిక్స్',
      truePositive: 'ట్రూ పాజిటివ్ (TP)',
      falsePositive: 'ఫాల్స్ పాజిటివ్ (FP)',
      trueNegative: 'ట్రూ నెగటివ్ (TN)',
      falseNegative: 'ఫాల్స్ నెగటివ్ (FN)',
      rocCurve: 'ROC వక్రరేఖ',
      precisionRecallCurve: 'ప్రిసిషన్-రీకాల్ వక్రరేఖ',
      trainingLossHistory: 'శిక్షణ నష్ట చరిత్ర',
    },
    planner: {
      title: 'నిర్వహణ ప్రణాళిక & వర్క్ ఆర్డర్లు',
      subtitle: 'వర్క్ ఆర్డర్‌లను షెడ్యూల్ చేయండి, టెక్నీషియన్‌లను కేటాయించండి మరియు MTBF/MTTR మెరుగుపరచండి',
      createWorkOrder: 'వర్క్ ఆర్డర్ సృష్టించండి',
      newWorkOrderTitle: 'కొత్త నిర్వహణ వర్క్ ఆర్డర్',
      mtbf: 'సగటు వైఫల్యాల మధ్య సమయం (MTBF)',
      mttr: 'సగటు మరమ్మత్తు సమయం (MTTR)',
      openOrders: 'క్రియాశీల వర్క్ ఆర్డర్లు',
      completedOrders: 'పూర్తయిన పనులు',
      orderTitle: 'ఆర్డర్ శీర్షిక',
      machine: 'లక్ష్య యంత్రం',
      priority: 'ప్రాధాన్యత',
      assignedTech: 'కేటాయించిన టెక్నీషియన్',
      dueDate: 'గడువు తేదీ',
      spareParts: 'అవసరమైన విడిభాగాలు',
      estimatedCost: 'అంచనా వ్యయం ($)',
      checklist: 'తనిఖీ జాబితా',
      addChecklistItem: 'పనిని జోడించండి...',
      markCompleted: 'పూర్తయినట్లు గుర్తించండి',
    },
    alerts: {
      title: 'హెచ్చరికలు & నోటిఫికేషన్ల ప్రవాహం',
      subtitle: 'పరిమితి ఉల్లంఘనలు, స్వయంచాలక అలారాలు మరియు పరిష్కార చర్యలు',
      activeAlerts: 'క్రియాశీల హెచ్చరికలు',
      filterSeverity: 'తీవ్రత ప్రకారం ఫిల్టర్ చేయండి',
      acknowledge: 'గుర్తించబడింది (Acknowledge)',
      resolve: 'పరిష్కరించండి (Resolve)',
      escalateToOrder: 'వర్క్ ఆర్డర్‌గా మార్చు',
      acknowledged: 'గుర్తించబడింది',
      resolved: 'పరిష్కరించబడింది',
      triggerRules: 'ఆటోమేటిక్ నిబంధనలు',
      noAlerts: 'ఎటువంటి క్రియాశీల అలారాలు లేవు. అన్ని యంత్రాలు సురక్షితంగా ఉన్నాయి.',
    },
    reports: {
      title: 'ఇంజనీరింగ్ నివేదికలు & ఆడిట్ లాగ్‌లు',
      subtitle: 'నివారించబడిన డౌన్‌టైమ్, ఆదా చేయబడిన ఖర్చు మరియు పూర్తి లాగ్‌లు',
      executiveSummary: 'నిర్వాహక సారాంశం',
      costAvoided: 'ఆదా చేయబడిన డౌన్‌టైమ్ ఖర్చు',
      downtimePrevented: 'నివారించబడిన డౌన్‌టైమ్ గంటలు',
      aiAccuracyReport: 'AI జోక్యాల విజయ రేటు',
      auditLog: 'ఆడిట్ లాగ్ వివరాలు',
      timestamp: 'సమయముద్ర',
      category: 'వర్గం',
      eventAction: 'తీసుకున్న చర్య',
      operator: 'వినియోగదారు / మూలం',
      downloadPdf: 'నివేదికను ప్రింట్ / డౌన్‌లోడ్ చేయండి',
    },
    settings: {
      title: 'సిస్టమ్ సెట్టింగ్‌లు & ప్రాధాన్యతలు',
      subtitle: 'సెన్సార్ పోలింగ్ సమయం, అలారం పరిమితులు మరియు భాషను సర్దుబాటు చేయండి',
      pollingInterval: 'టెలిమెట్రీ రిఫ్రెష్ విరామం',
      pollingIntervalDesc: 'సెన్సార్ డేటాను నవీకరించే సమయం',
      anomalySensitivity: 'అసహజత గుర్తింపు సున్నితత్వం',
      anomalySensitivityDesc: 'అసహజతలను గుర్తించే మోడల్ సున్నితత్వం',
      thresholdConfig: 'హెచ్చరిక & క్లిష్టమైన పరిమితులు',
      soundAlerts: 'క్లిష్టమైన సమస్యలపై ఆడియో అలారం',
      voiceSettings: 'వాయిస్ అసిస్టెంట్ భాష',
      resetDefaults: 'ఫ్యాక్టరీ రీసెట్',
    },
    about: {
      title: 'PredictAI ప్రాజెక్ట్ గురించి',
      subtitle: 'విద్యార్థి అభివృద్ధి చేసిన పారిశ్రామిక IoT మరియు మెషిన్ లెర్నింగ్ ప్రిడిక్టివ్ మెయింటెనెన్స్ వ్యవస్థ',
      projectOverview: 'ప్రాజెక్ట్ అవలోకనం & పరిశోధనా లక్ష్యాలు',
      projectDesc: 'PredictAI అనేది ఒక అధునాతన ప్రిడిక్టివ్ మెయింటెనెన్స్ వేదిక. యంత్రాల అకస్మాత్తు వైఫల్యాల వల్ల పరిశ్రమలలో లక్షల డాలర్ల నష్టం కలుగుతుంది. ఈ ప్రాజెక్ట్ నిజ సమయ సెన్సార్ డేటా, మెషిన్ లెర్నింగ్ మోడల్స్ మరియు వైఫల్య అంచనా ద్వారా సమస్యలను ముందే పసిగట్టి పరిష్కారాలను సూచిస్తుంది.',
      architectureTitle: 'సిస్టమ్ ఆర్కిటెక్చర్',
      architectureDesc: 'సెన్సార్లు → ఎడ్జ్ గేట్‌వే → ఫీచర్ ఎక్స్‌ట్రాక్షన్ (FFT, RMS) → ML ప్రిడిక్షన్ ఇంజిన్ → ఆటోమేటెడ్ వర్క్ ఆర్డర్లు.',
      methodologyTitle: 'డేటా పద్ధతులు & విశ్లేషణ',
      methodologyDesc: 'AI4I 2020 ప్రిడిక్టివ్ మెయింటెనెన్స్ డేటాసెట్ మరియు నాసా C-MAPSS డేటా ఆధారంగా మోడల్స్ రూపొందించబడ్డాయి.',
      academicCredits: 'అకడమిక్ క్రెడిట్స్',
      studentLead: 'ప్రధాన విద్యార్థి ఇంజనీర్: నేత్ర కొంజేటి',
      facultyAdvisor: 'మార్గదర్శకత్వం: కంప్యూటర్ సైన్స్ & ఇంజనీరింగ్ విభాగం',
      department: 'స్పెషలైజేషన్: ఆర్టిఫిషియల్ ఇంటెలిజెన్స్ & పారిశ్రామిక IoT',
      techStack: 'ఉపయోగించిన సాంకేతికతలు: React 19, TypeScript, Tailwind CSS, Lucide, Web Speech API',
      references: 'రిఫరెన్సులు: ISO 10816 వైబ్రేషన్ ప్రమాణాలు, నాసా C-MAPSS డేటాసెట్, AI4I 2020 రిపోజిటరీ',
    },
    voice: {
      micTitle: 'వాయిస్ అసిస్టెంట్ & వాయిస్ కమాండ్‌లు',
      enableMic: 'మైక్రోఫోన్‌ను ఆన్ చేయండి',
      notEnabled: 'మైక్రోఫోన్ ప్రస్తుతం నిలిపివేయబడింది.',
      requesting: 'బ్రౌజర్ నుండి మైక్రోఫోన్ అనుమతి కోరబడుతోంది...',
      granted: 'మైక్రోఫోన్ అనుమతి లభించింది. మాట్లాడటానికి సిద్ధం.',
      denied: 'మైక్రోఫోన్ అనుమతి తిరస్కరించబడింది.',
      unsupported: 'ఈ బ్రౌజర్‌లో వెబ్ స్పీచ్ API అందుబాటులో లేదు.',
      startRecording: 'మాట్లాడటం ప్రారంభించండి',
      stopRecording: 'రికార్డింగ్ ఆపండి',
      cancel: 'రద్దు చేయి',
      playRecording: 'రికార్డ్ చేసిన ఆడియో వినండి',
      listening: 'మీ వాయిస్ కమాండ్‌ను వింటున్నాము...',
      trySpeaking: 'ఈ ఆదేశాలలో ఒకదాన్ని చెప్పండి:',
      commandExample1: '"Show machine health" (యంత్రాల ఆరోగ్యాన్ని చూపించు)',
      commandExample2: '"Check machine failure risk" (వైఫల్య ప్రమాదాన్ని తనిఖీ చేయి)',
      commandExample3: '"Open maintenance alerts" (హెచ్చరికలను తెరువు)',
      commandExample4: '"Switch to dark theme" (డార్క్ థీమ్‌కి మారు)',
      commandExample5: '"Change language to English" (భాషను ఇంగ్లీషుకు మార్చు)',
      confirmCommandTitle: 'వాయిస్ కమాండ్ నిర్ధారణ',
      confirmExecute: 'ఆదేశాన్ని అమలు చేయండి',
      fallbackInputPlaceholder: 'లేదా ఇక్కడ టైప్ చేయండి...',
      fallbackSubmit: 'రన్ చేయి',
      speechDisclaimer: 'వాయిస్ రికగ్నిషన్ మీ బ్రౌజర్ ఇంజిన్ మీద ఆధారపడి ఉంటుంది.',
      recognizedTextPrompt: 'గుర్తించబడిన వాయిస్ కమాండ్:',
    },
  },

  hi: {
    appName: 'PredictAI',
    tagline: 'विफलताओं का पूर्वानुमान लगाएं। डाउनटाइम रोकें।',
    studentProject: 'छात्र AI/ML और औद्योगिक IoT कैपस्टोन प्रोजेक्ट',
    nav: {
      overview: 'अवलोकन डैशबोर्ड',
      monitoring: 'मशीन निगरानी',
      prediction: 'AI विफलता भविष्यवाणी',
      dataset: 'डेटासेट एक्सप्लोरर',
      models: 'मॉडल प्रदर्शन',
      planner: 'रखरखाव योजनाकार',
      alerts: 'अलर्ट और सूचनाएं',
      reports: 'रिपोर्ट और इतिहास',
      settings: 'सेटिंग्स और प्राथमिकताएं',
      about: 'परियोजना के बारे में',
    },
    themes: {
      original: 'औद्योगिक थीम',
      light: 'लाइट थीम',
      dark: 'डार्क थीम',
    },
    common: {
      status: 'स्थिति',
      actions: 'कार्रवाई',
      refresh: 'रिफ्रेश',
      exportCsv: 'CSV निर्यात करें',
      printReport: 'रिपोर्ट प्रिंट / सहेजें',
      save: 'परिवर्तन सहेजें',
      cancel: 'रद्द करें',
      delete: 'हटाएं',
      edit: 'संपादित करें',
      apply: 'लागू करें',
      reset: 'रीसेट करें',
      search: 'उपकरण या लॉग खोजें...',
      filter: 'फ़िल्टर',
      all: 'सभी',
      normal: 'सामान्य',
      warning: 'चेतावनी',
      critical: 'गंभीर',
      optimal: 'उत्कृष्ट',
      active: 'सक्रिय',
      hours: 'घंटे',
      days: 'दिन',
      details: 'विवरण',
      viewAll: 'सभी देखें',
      close: 'बंद करें',
      confirm: 'पुष्टि करें',
    },
    sensors: {
      vibration: 'कंपन RMS',
      temperature: 'बेयरिंग तापमान',
      pressure: 'हाइड्रोलिक दबाव',
      acoustic: 'ध्वनि उत्सर्जन',
      rpm: 'मोटर गति',
      current: 'ड्राइव करंट',
      vibrationUnit: 'mm/s',
      tempUnit: '°C',
      pressureUnit: 'bar',
      acousticUnit: 'dB',
      rpmUnit: 'RPM',
      currentUnit: 'A',
    },
    overview: {
      title: 'मशीन स्वास्थ्य और विसंगति अवलोकन',
      subtitle: 'वास्तविक समय टेलीमेट्री और मशीन लर्निंग विफलता निदान',
      fleetHealth: 'समग्र स्वास्थ्य सूचकांक',
      activeAssets: 'निगरानी अधीन मशीनें',
      highRiskMachines: 'उच्च जोखिम वाली मशीनें',
      avgRul: 'औसत शेष उपयोगी जीवन (RUL)',
      liveTelemetry: 'लाइव टेलीमेट्री स्ट्रीम',
      telemetryDesc: 'निरंतर कंपन, थर्मल और ध्वनिक सेंसर रीडिंग',
      machineFleetStatus: 'मशीनरी स्थिति',
      recentIncidents: 'हाल की विसंगतियां',
      quickPrediction: 'त्वरित भविष्यवाणी',
      viewMonitoring: 'मशीन जांचें',
      runAiDiagnostic: 'AI निदान चलाएं',
      noActiveIncidents: 'पिछले 24 घंटों में कोई गंभीर समस्या नहीं मिली।',
      allSystemsNominal: 'सभी उपकरण सुरक्षित सीमाओं के भीतर काम कर रहे हैं।',
    },
    monitoring: {
      title: 'वास्तविक समय मशीन निगरानी',
      subtitle: 'हाई-फ़्रीक्वेंसी सेंसर डेटा, FFT कंपन स्पेक्ट्रम और ध्वनिक विश्लेषण',
      selectMachine: 'निगरानी के लिए मशीन चुनें',
      machineDetails: 'उपकरण विनिर्देश',
      serialNo: 'सीरियल नंबर',
      operatingHours: 'कार्य के घंटे',
      commissionDate: 'चालू करने की तिथि',
      liveGauges: 'लाइव सेंसर गेज',
      frequencySpectrum: 'FFT कंपन स्पेक्ट्रम (0 - 500 Hz)',
      frequencyDesc: 'फास्ट फूरियर ट्रांसफॉर्म घूर्णन और बेयरिंग दोषों की पहचान करता है',
      acousticWaveform: 'अल्ट्रासोनिक ध्वनिक तरंग',
      acousticDesc: 'आंतरिक दरारें और घर्षण का पता लगाने वाला ध्वनिक संकेत',
      emergencyStop: 'आपातकालीन शटडाउन स्विच',
      emergencyStopConfirm: 'क्या आप आपातकालीन शटडाउन सिमुलेशन शुरू करना चाहते हैं?',
      tuneThresholds: 'सीमा समायोजन',
      safeZone: 'सुरक्षित क्षेत्र',
      warnZone: 'चेतावनी सीमा',
      critZone: 'गंभीर सीमा',
    },
    prediction: {
      title: 'AI मशीन विफलता भविष्यवाणी इंजन',
      subtitle: 'विफलता संभावना, शेष जीवन (RUL) और मूल कारणों की गणना',
      inputParameters: 'सेंसर इनपुट पैरामीटर',
      loadLiveValues: 'लाइव मान भरें',
      selectModel: 'मशीन लर्निंग मॉडल चुनें',
      runInference: 'भविष्यवाणी शुरू करें',
      inferenceRunning: 'AI विश्लेषण जारी है...',
      resultsTitle: 'निदान परिणाम और निवारक कार्रवाई',
      failureProbability: 'विफलता की संभावना',
      predictedRul: 'अनुमानित शेष उपयोगी जीवन (RUL)',
      failureMode: 'विफलता का प्रकार',
      confidence: 'मॉडल का विश्वास',
      shapImportance: 'SHAP सेंसर योगदान',
      shapDesc: 'जोखिम उत्पन्न करने वाले प्रमुख सेंसर मापदंडों का क्रम',
      prescriptiveTitle: 'निवारक रखरखाव सिफारिश',
      prescriptiveDesc: 'विफलता रोकने के लिए तत्काल इंजीनियरिंग सिफारिशें',
      scheduleTicket: 'रखरखाव टिकट बनाएं',
      ticketScheduled: 'वर्क ऑर्डर प्लानर में सफलतापूर्वक दर्ज!',
      models: {
        randomForest: 'रैंडम फ़ॉरेस्ट एन्सेम्बल',
        randomForestDesc: 'सटीक और मजबूत निर्णय वृक्षों का समूह',
        xgboost: 'XGBoost ग्रेडिएंट बूस्टिंग',
        xgboostDesc: 'अत्यधिक सटीक और तेज़ गणना',
        lstm: 'LSTM ऑटोएन्कोडर',
        lstmDesc: 'समय-श्रृंखला विसंगतियों की पहचान के लिए डीप लर्निंग',
        isolationForest: 'आइसोलेशन फ़ॉरेस्ट',
        isolationForestDesc: 'विसंगतियों को अलग करने वाली तकनीक',
      },
    },
    dataset: {
      title: 'औद्योगिक IoT डेटासेट एक्सप्लोरर',
      subtitle: 'AI4I 2020 और लाइव सेंसर डेटा रिकॉर्ड का अन्वेषण करें',
      selectDataset: 'डेटासेट चुनें',
      uploadDataset: 'CSV/JSON अपलोड करें',
      generateSample: 'लाइव नमूने उत्पन्न करें',
      totalRecords: 'कुल रिकॉर्ड',
      featuresCount: 'फ़ीचर्स की संख्या',
      failureRate: 'विफलता दर',
      avgToolWear: 'औसत टूल घिसाव',
      searchPlaceholder: 'उत्पाद आईडी या प्रकार से खोजें...',
      filterFailure: 'विफलता फ़िल्टर',
      columnUdi: 'UID',
      columnProduct: 'उत्पाद ID',
      columnType: 'प्रकार',
      columnAirTemp: 'वायु तापमान (K)',
      columnProcessTemp: 'प्रक्रिया तापमान (K)',
      columnRpm: 'घूर्णन गति (RPM)',
      columnTorque: 'टॉर्क (Nm)',
      columnToolWear: 'टूल घिसाव (मिनट)',
      columnFailure: 'मशीन विफलता',
      columnFailureType: 'विफलता प्रकार',
      uploadInstructions: 'औद्योगिक टेलीमेट्री रिकॉर्ड वाली CSV या JSON फ़ाइल अपलोड करें।',
      dropFileHere: 'फ़ाइल खींचें और छोड़ें या ब्राउज़ करें',
    },
    models: {
      title: 'AI मॉडल प्रदर्शन और सत्यापन',
      subtitle: 'औद्योगिक डेटा पर मॉडलों का तुलनात्मक मूल्यांकन',
      comparisonScorecard: 'मॉडल तुलना स्कोरकार्ड',
      accuracy: 'सटीकता (Accuracy)',
      precision: 'परिशुद्धता (Precision)',
      recall: 'रिकॉल (Recall)',
      f1Score: 'F1 स्कोर',
      rocAuc: 'ROC-AUC',
      latency: 'अनुमान विलंबता (Latency)',
      confusionMatrix: 'कन्फ्यूजन मैट्रिक्स',
      truePositive: 'ट्रू पॉजिटिव (TP)',
      falsePositive: 'फॉल्स पॉजिटिव (FP)',
      trueNegative: 'ट्रू नेगेटिव (TN)',
      falseNegative: 'फॉल्स नेगेटिव (FN)',
      rocCurve: 'ROC वक्र',
      precisionRecallCurve: 'प्रिसिजन-रिकॉल वक्र',
      trainingLossHistory: 'प्रशिक्षण हानि इतिहास',
    },
    planner: {
      title: 'निवारक रखरखाव योजनाकार और कार्य आदेश',
      subtitle: 'कार्य आदेश शेड्यूल करें, तकनीशियन सौंपें और MTBF/MTTR सुधारें',
      createWorkOrder: 'कार्य आदेश बनाएं',
      newWorkOrderTitle: 'नया रखरखाव कार्य आदेश',
      mtbf: 'विफलताओं के बीच औसत समय (MTBF)',
      mttr: 'मरम्मत का औसत समय (MTTR)',
      openOrders: 'सक्रिय कार्य आदेश',
      completedOrders: 'पूर्ण कार्य',
      orderTitle: 'आदेश शीर्षक',
      machine: 'मशीन',
      priority: 'प्राथमिकता',
      assignedTech: 'सौंपा गया तकनीशियन',
      dueDate: 'नियत तिथि',
      spareParts: 'आवश्यक स्पेयर पार्ट्स',
      estimatedCost: 'अनुमानित लागत ($)',
      checklist: 'जांच सूची',
      addChecklistItem: 'कार्य जोड़ें...',
      markCompleted: 'पूर्ण चिह्नित करें',
    },
    alerts: {
      title: 'अलर्ट, सूचनाएं और घटनाएं',
      subtitle: 'सीमा उल्लंघन, स्वचालित अलार्म और समाधान की कार्रवाई',
      activeAlerts: 'सक्रिय अलर्ट',
      filterSeverity: 'गंभीरता अनुसार फ़िल्टर करें',
      acknowledge: 'स्वीकार करें (Acknowledge)',
      resolve: 'हल करें (Resolve)',
      escalateToOrder: 'कार्य आदेश में बदलें',
      acknowledged: 'स्वीकृत',
      resolved: 'हल किया गया',
      triggerRules: 'स्वचालित नियम',
      noAlerts: 'कोई अनसुलझा अलार्म नहीं है। सभी मशीनें सुरक्षित हैं।',
    },
    reports: {
      title: 'इंजीनियरिंग रिपोर्ट और ऑडिट लॉग',
      subtitle: 'बचाया गया डाउनटाइम, अनुमानित लागत बचत और सिस्टम लॉग',
      executiveSummary: 'कार्यकारी सारांश',
      costAvoided: 'बचाई गई डाउनटाइम लागत',
      downtimePrevented: 'रोके गए डाउनटाइम घंटे',
      aiAccuracyReport: 'पूर्वानुमान सफलता दर',
      auditLog: 'सिस्टम ऑडिट लॉग',
      timestamp: 'समय',
      category: 'श्रेणी',
      eventAction: 'कार्रवाई',
      operator: 'उपयोगकर्ता / स्रोत',
      downloadPdf: 'रिपोर्ट प्रिंट / डाउनलोड करें',
    },
    settings: {
      title: 'सिस्टम सेटिंग्स और प्राथमिकताएं',
      subtitle: 'सेंसर पोलिंग अंतराल, सीमा मान और भाषा सेटिंग्स',
      pollingInterval: 'टेलीमेट्री ताज़ा अंतराल',
      pollingIntervalDesc: 'सेंसर डेटा अपडेट करने की आवृत्ति',
      anomalySensitivity: 'विसंगति संवेदनशीलता',
      anomalySensitivityDesc: 'विसंगतियों का पता लगाने की संवेदनशीलता',
      thresholdConfig: 'अलार्म और चेतावनी सीमाएं',
      soundAlerts: 'गंभीर घटनाओं पर ऑडियो अलार्म',
      voiceSettings: 'वॉयस असिस्टेंट भाषा',
      resetDefaults: 'फ़ैक्टरी रीसेट',
    },
    about: {
      title: 'PredictAI प्रोजेक्ट के बारे में',
      subtitle: 'छात्र विकसित औद्योगिक IoT और मशीन लर्निंग प्रेडिक्टिव मेंटेनेंस सिस्टम',
      projectOverview: 'परियोजना अवलोकन और अनुसंधान उद्देश्य',
      projectDesc: 'PredictAI एक उन्नत प्रेडिक्टिव मेंटेनेंस प्लेटफ़ॉर्म है। विनिर्माण उद्योगों में अचानक मशीन बंद होने से करोड़ों का नुकसान होता है। यह प्रणाली सेंसर डेटा और AI की मदद से संभावित विफलताओं का पहले ही पता लगाती है।',
      architectureTitle: 'सिस्टम आर्किटेक्चर',
      architectureDesc: 'सेंसर → एज गेटवे → फीचर निष्कर्षण (FFT, RMS) → ML इंजन → स्वचालित कार्य आदेश।',
      methodologyTitle: 'डेटा पद्धति और विश्लेषण',
      methodologyDesc: 'AI4I 2020 और NASA C-MAPSS डेटासेट पर प्रशिक्षित और मान्य।',
      academicCredits: 'शैक्षणिक श्रेय',
      studentLead: 'प्रमुख छात्र इंजीनियर: नेत्रा कोंजेटी',
      facultyAdvisor: 'मार्गदर्शन: कंप्यूटर विज्ञान और इंजीनियरिंग विभाग',
      department: 'विशेषज्ञता: आर्टिफिशियल इंटेलिजेंस और औद्योगिक IoT',
      techStack: 'उपयोग की गई तकनीकें: React 19, TypeScript, Tailwind CSS, Lucide, Web Speech API',
      references: 'संदर्भ: ISO 10816 कंपन मानक, NASA C-MAPSS डेटासेट, AI4I 2020 रिपॉजिटरी',
    },
    voice: {
      micTitle: 'वॉयस असिस्टेंट और वॉयस कमांड',
      enableMic: 'माइक्रोफ़ोन सक्षम करें',
      notEnabled: 'माइक्रोफ़ोन वर्तमान में अक्षम है।',
      requesting: 'ब्राउज़र से माइक्रोफ़ोन अनुमति का अनुरोध किया जा रहा है...',
      granted: 'माइक्रोफ़ोन अनुमति प्रदान की गई। बोलने के लिए तैयार।',
      denied: 'माइक्रोफ़ोन अनुमति अस्वीकार कर दी गई।',
      unsupported: 'ब्राउज़र वेब स्पीच API का समर्थन नहीं करता है।',
      startRecording: 'बोलना शुरू करें',
      stopRecording: 'रिकॉर्डिंग रोकें',
      cancel: 'रद्द करें',
      playRecording: 'रिकॉर्ड किया गया ऑडियो सुनें',
      listening: 'आपकी आवाज़ सुनी जा रही है...',
      trySpeaking: 'इन आदेशों में से कोई एक बोलें:',
      commandExample1: '"Show machine health" (मशीन स्वास्थ्य दिखाएं)',
      commandExample2: '"Check machine failure risk" (विफलता जोखिम जांचें)',
      commandExample3: '"Open maintenance alerts" (अलर्ट खोलें)',
      commandExample4: '"Switch to dark theme" (डार्क थीम पर जाएं)',
      commandExample5: '"Change language to English" (भाषा बदलें)',
      confirmCommandTitle: 'वॉयस कमांड पुष्टि',
      confirmExecute: 'आदेश निष्पादित करें',
      fallbackInputPlaceholder: 'या यहाँ आदेश लिखें...',
      fallbackSubmit: 'रन करें',
      speechDisclaimer: 'वॉयस पहचान सटीकता आपके ब्राउज़र पर निर्भर करती है।',
      recognizedTextPrompt: 'पहचानी गई वॉयस कमांड:',
    },
  },

  ta: {
    appName: 'PredictAI',
    tagline: 'முறிவுகளை கணிக்கவும். வேலையில்லா நேரத்தைத் தடுக்கவும்.',
    studentProject: 'மாணவர் AI/ML மற்றும் தொழில்துறை IoT திட்டம்',
    nav: {
      overview: 'மேலோட்ட டாஷ்போர்டு',
      monitoring: 'இயந்திர கண்காணிப்பு',
      prediction: 'AI தோல்வி கணிப்பு',
      dataset: 'தரவுத்தொகுப்பு ஆய்வாளர்',
      models: 'மாதிரி செயல்திறன்',
      planner: 'பராமரிப்பு திட்டமிடுபவர்',
      alerts: 'எச்சரிக்கைகள் & அறிவிப்புகள்',
      reports: 'அறிக்கைகள் & வரலாறு',
      settings: 'அமைப்புகள் & விருப்பங்கள்',
      about: 'திட்டம் பற்றி',
    },
    themes: {
      original: 'தொழில்துறை தீம்',
      light: 'லைட் தீம்',
      dark: 'டார்க் தீம்',
    },
    common: {
      status: 'நிலை',
      actions: 'செயல்கள்',
      refresh: 'புதுப்பி',
      exportCsv: 'CSV ஏற்றுமதி',
      printReport: 'அறிக்கை அச்சிடு',
      save: 'சேமிக்க',
      cancel: 'ரத்து செய்',
      delete: 'நீக்கு',
      edit: 'திருத்து',
      apply: 'பயன்படுத்து',
      reset: 'மீட்டமைக்க',
      search: 'உபகரணங்களை தேடுங்கள்...',
      filter: 'வடிகட்டு',
      all: 'அனைத்தும்',
      normal: 'இயல்பானது',
      warning: 'எச்சரிக்கை',
      critical: 'முக்கியமானது',
      optimal: 'உகந்தது',
      active: 'செயலில்',
      hours: 'மணிநேரம்',
      days: 'நாட்கள்',
      details: 'விவரங்கள்',
      viewAll: 'அனைத்தையும் பார்க்கவும்',
      close: 'மூடு',
      confirm: 'உறுதி செய்',
    },
    sensors: {
      vibration: 'அதிர்வு RMS',
      temperature: 'தாங்கி வெப்பநிலை',
      pressure: 'ஹைட்ராலிக் அழுத்தம்',
      acoustic: 'ஒலி உமிழ்வு',
      rpm: 'மோட்டார் வேகம்',
      current: 'மின்னோட்டம்',
      vibrationUnit: 'mm/s',
      tempUnit: '°C',
      pressureUnit: 'bar',
      acousticUnit: 'dB',
      rpmUnit: 'RPM',
      currentUnit: 'A',
    },
    overview: {
      title: 'இயந்திரங்களின் நலம் மற்றும் முரண்பாடுகள்',
      subtitle: 'நிகழ்நேர சென்சார் தரவு மற்றும் AI முறிவு பகுப்பாய்வு',
      fleetHealth: 'ஒட்டுமொத்த சுகாதார குறியீடு',
      activeAssets: 'கண்காணிக்கப்படும் இயந்திரங்கள்',
      highRiskMachines: 'அதிக ஆபத்துள்ள இயந்திரங்கள்',
      avgRul: 'சராசரி பயனுள்ள ஆயுட்காலம் (RUL)',
      liveTelemetry: 'லைவ் டெலிமெட்ரி ஸ்ட்ரீம்',
      telemetryDesc: 'தொடர்ச்சியான அதிர்வு, வெப்ப மற்றும் ஒலி அளவீடுகள்',
      machineFleetStatus: 'இயந்திரங்கள் நிலை',
      recentIncidents: 'சமீபத்திய முரண்பாடுகள்',
      quickPrediction: 'விரைவு கணிப்பு',
      viewMonitoring: 'ஆய்வு செய்',
      runAiDiagnostic: 'AI சோதனையைத் தொடங்கு',
      noActiveIncidents: 'கடந்த 24 மணிநேரத்தில் எந்த சிக்கலும் இல்லை.',
      allSystemsNominal: 'அனைத்து இயந்திரங்களும் பாதுகாப்பான வரம்புகளுக்குள் இயங்குகின்றன.',
    },
    monitoring: {
      title: 'நிகழ்நேர இயந்திர கண்காணிப்பு',
      subtitle: 'சென்சார் டெலிமெட்ரி, FFT அதிர்வு நிறமாலை மற்றும் ஒலி சமிக்ஞை பகுப்பாய்வு',
      selectMachine: 'இயந்திரத்தைத் தேர்ந்தெடுக்கவும்',
      machineDetails: 'உபகரண விவரங்கள்',
      serialNo: 'வரிசை எண்',
      operatingHours: 'இயங்கிய நேரம்',
      commissionDate: 'தொடங்கிய தேதி',
      liveGauges: 'லைவ் சென்சார் கேஜ்கள்',
      frequencySpectrum: 'FFT அதிர்வு நிறமாலை (0 - 500 Hz)',
      frequencyDesc: 'சுழற்சி மற்றும் தாங்கி குறைபாடுகளை கண்டறியும் ஃபாஸ்ட் ஃபூரியர் டிரான்ஸ்ஃபார்ம்',
      acousticWaveform: 'அல்ட்ராசோனிக் ஒலி அலைவடிவம்',
      acousticDesc: 'உள் விரிசல்கள் மற்றும் உராய்வைக் கண்டறியும் நிகழ்நேர ஒலி அலைகள்',
      emergencyStop: 'அவசர நிறுத்த சுவிட்ச்',
      emergencyStopConfirm: 'அவசர நிறுத்தத்தை செயல்படுத்த விரும்புகிறீர்களா?',
      tuneThresholds: 'வரம்பு சரிசெய்தல்',
      safeZone: 'பாதுகாப்பான மண்டலம்',
      warnZone: 'எச்சரிக்கை எல்லை',
      critZone: 'முக்கிய வரம்பு',
    },
    prediction: {
      title: 'AI இயந்திர தோல்வி கணிப்பு அமைப்பு',
      subtitle: 'தோல்வி நிகழ்தகவு, மீதமுள்ள ஆயுள் (RUL) மற்றும் மூல காரணங்களை கணக்கிடுதல்',
      inputParameters: 'சென்சார் அளவுருக்கள்',
      loadLiveValues: 'நேரலை மதிப்புகளை நிரப்புக',
      selectModel: 'ML மாதிரியை தேர்ந்தெடுக்கவும்',
      runInference: 'கணிப்பை தொடங்கு',
      inferenceRunning: 'AI ஆய்வு நடைபெறுகிறது...',
      resultsTitle: 'கணிப்பு முடிவுகள் மற்றும் பரிந்துரைகள்',
      failureProbability: 'தோல்வி நிகழ்தகவு',
      predictedRul: 'கணிக்கப்பட்ட மீதமுள்ள ஆயுள் (RUL)',
      failureMode: 'தோல்வி வகை',
      confidence: 'மாதிரி நம்பிக்கை',
      shapImportance: 'SHAP சென்சார் முக்கியத்துவம்',
      shapDesc: 'தோல்வி அபாயத்திற்கு காரணமான முக்கிய சென்சார் மதிப்புகள்',
      prescriptiveTitle: 'தடுப்பு பராமரிப்பு பரிந்துரை',
      prescriptiveDesc: 'முறிவைத் தவிர்க்க உடனடியாக எடுக்க வேண்டிய நடவடிக்கைகள்',
      scheduleTicket: 'பராமரிப்பு டிக்கெட்டை உருவாக்கவும்',
      ticketScheduled: 'பணி ஆணை வெற்றிகரமாக திட்டமிடப்பட்டது!',
      models: {
        randomForest: 'ரேண்டம் ஃபாரஸ்ட்',
        randomForestDesc: 'நம்பகமான முடிவு மரங்களின் தொகுப்பு',
        xgboost: 'XGBoost கிரேடியன்ட் பூஸ்டிங்',
        xgboostDesc: 'அதிக துல்லியம் மற்றும் வேகமான கணிப்பு',
        lstm: 'LSTM ஆட்டோஎன்கோடர்',
        lstmDesc: 'தொடர் தரவு முரண்பாடுகளைக் கண்டறியும் டீப் லேர்னிங்',
        isolationForest: 'ஐசோலேஷன் ஃபாரஸ்ட்',
        isolationForestDesc: 'முரண்பாடுகளை விரைவாக பிரிக்கும் முறை',
      },
    },
    dataset: {
      title: 'தொழில்துறை IoT தரவுத்தொகுப்பு ஆய்வாளர்',
      subtitle: 'AI4I 2020 தரவுத்தொகுப்பு மற்றும் நேரலை சென்சார் பதிவுகளை ஆராயுங்கள்',
      selectDataset: 'தரவுத்தொகுப்பை தேர்வு செய்யவும்',
      uploadDataset: 'CSV/JSON பதிவேற்றவும்',
      generateSample: 'மாதிரிகளை உருவாக்கவும்',
      totalRecords: 'மொத்த பதிவுகள்',
      featuresCount: 'அம்சங்களின் எண்ணிக்கை',
      failureRate: 'தோல்வி விகிதம்',
      avgToolWear: 'சராசரி கருவி தேய்மானம்',
      searchPlaceholder: 'தயாரிப்பு ஐடி அல்லது வகை மூலம் தேடவும்...',
      filterFailure: 'தோல்வி வடிகட்டி',
      columnUdi: 'UID',
      columnProduct: 'தயாரிப்பு ID',
      columnType: 'வகை',
      columnAirTemp: 'காற்று வெப்பநிலை (K)',
      columnProcessTemp: 'செயல்முறை வெப்பநிலை (K)',
      columnRpm: 'வேகம் (RPM)',
      columnTorque: 'முறுக்குவிசை (Nm)',
      columnToolWear: 'கருவி தேய்மானம் (நிமிடம்)',
      columnFailure: 'இயந்திர தோல்வி',
      columnFailureType: 'தோல்வி வகை',
      uploadInstructions: 'தொழில்துறை டெலிமெட்ரி பதிவுகள் கொண்ட CSV அல்லது JSON கோப்பை பதிவேற்றவும்.',
      dropFileHere: 'கோப்பை இங்கே இழுத்துப் போடவும் அல்லது உலாவவும்',
    },
    models: {
      title: 'AI மாதிரி செயல்திறன் மற்றும் சரிபார்ப்பு',
      subtitle: 'தொழில்துறை தரவுகளில் இயந்திர கற்றல் மாதிரிகளின் ஒப்பீட்டு மதிப்பீடு',
      comparisonScorecard: 'மாதிரி ஒப்பீட்டு அட்டை',
      accuracy: 'துல்லியம் (Accuracy)',
      precision: 'துல்லியம் (Precision)',
      recall: 'மீட்பு (Recall)',
      f1Score: 'F1 மதிப்பெண்',
      rocAuc: 'ROC-AUC',
      latency: 'தாமதம் (Latency)',
      confusionMatrix: 'குழப்ப மேட்ரிக்ஸ்',
      truePositive: 'உண்மை நேர்மறை (TP)',
      falsePositive: 'தவறான நேர்மறை (FP)',
      trueNegative: 'உண்மை எதிர்மறை (TN)',
      falseNegative: 'தவறான எதிர்மறை (FN)',
      rocCurve: 'ROC வளைவு',
      precisionRecallCurve: 'துல்லியம்-மீட்பு வளைவு',
      trainingLossHistory: 'பயிற்சி இழப்பு வரலாறு',
    },
    planner: {
      title: 'தடுப்பு பராமரிப்பு திட்டமிடுபவர் & பணி ஆணைகள்',
      subtitle: 'பணி ஆணைகளை திட்டமிடுங்கள், தொழில்நுட்ப வல்லுநர்களை ஒதுக்குங்கள்',
      createWorkOrder: 'பணி ஆணை உருவாக்கவும்',
      newWorkOrderTitle: 'புதிய பராமரிப்பு பணி ஆணை',
      mtbf: 'தோல்விகளுக்கு இடையிலான சராசரி நேரம் (MTBF)',
      mttr: 'பழுதுபார்க்கும் சராசரி நேரம் (MTTR)',
      openOrders: 'செயலில் உள்ள ஆணைகள்',
      completedOrders: 'முடிக்கப்பட்ட வேலைகள்',
      orderTitle: 'ஆணை தலைப்பு',
      machine: 'இயந்திரம்',
      priority: 'முன்னுரிமை',
      assignedTech: 'தொழில்நுட்ப வல்லுநர்',
      dueDate: 'முடிவு தேதி',
      spareParts: 'தேவையான உதிரி பாகங்கள்',
      estimatedCost: 'மதிப்பிடப்பட்ட செலவு ($)',
      checklist: 'சரிபார்ப்பு பட்டியல்',
      addChecklistItem: 'பணியை சேர்க்கவும்...',
      markCompleted: 'முடிந்தது என குறிக்கவும்',
    },
    alerts: {
      title: 'எச்சரிக்கைகள் மற்றும் அறிவிப்புகள்',
      subtitle: 'வரம்பு மீறல்கள், தானியங்கி அலாரங்கள் மற்றும் திருத்த நடவடிக்கைகள்',
      activeAlerts: 'செயலில் உள்ள எச்சரிக்கைகள்',
      filterSeverity: 'தீவிரம் வாரியாக வடிகட்டவும்',
      acknowledge: 'ஏற்றுக்கொள் (Acknowledge)',
      resolve: 'தீர்க்கவும் (Resolve)',
      escalateToOrder: 'பணி ஆணையாக மாற்று',
      acknowledged: 'ஏற்றுக்கொள்ளப்பட்டது',
      resolved: 'தீர்க்கப்பட்டது',
      triggerRules: 'தானியங்கி விதிகள்',
      noAlerts: 'அலாரங்கள் எதுவும் இல்லை. அனைத்து இயந்திரங்களும் பாதுகாப்பாக உள்ளன.',
    },
    reports: {
      title: 'பொறியியல் அறிக்கைகள் & தணிக்கை பதிவுகள்',
      subtitle: 'தவிர்க்கப்பட்ட வேலையில்லா நேரம், சேமிக்கப்பட்ட செலவு மற்றும் கணினி பதிவுகள்',
      executiveSummary: 'நிர்வாக சுருக்கம்',
      costAvoided: 'சேமிக்கப்பட்ட வேலையில்லா செலவு',
      downtimePrevented: 'தடுக்கப்பட்ட வேலையில்லா நேரம்',
      aiAccuracyReport: 'AI தலையீடு வெற்றி விகிதம்',
      auditLog: 'தணிக்கை பதிவு',
      timestamp: 'நேரமுத்திரை',
      category: 'வகை',
      eventAction: 'நடவடிக்கை',
      operator: 'பயனர் / மூலம்',
      downloadPdf: 'அறிக்கையை அச்சிடுக / பதிவிறக்குக',
    },
    settings: {
      title: 'கணினி அமைப்புகள் & விருப்பங்கள்',
      subtitle: 'சென்சார் புதுப்பிப்பு நேரம், எச்சரிக்கை வரம்புகள் மற்றும் மொழி அமைப்புகள்',
      pollingInterval: 'டெலிமெட்ரி புதுப்பிப்பு இடைவெளி',
      pollingIntervalDesc: 'சென்சார் தரவை புதுப்பிக்கும் நேரம்',
      anomalySensitivity: 'முரண்பாடு உணர்திறன்',
      anomalySensitivityDesc: 'முரண்பாடுகளை கண்டறியும் உணர்திறன்',
      thresholdConfig: 'எச்சரிக்கை மற்றும் முக்கியமான வரம்புகள்',
      soundAlerts: 'முக்கியமான நிகழ்வுகளுக்கான ஒலி எச்சரிக்கை',
      voiceSettings: 'குரல் உதவியாளர் மொழி',
      resetDefaults: 'தொழிற்சாலை அமைப்புகளுக்கு மீட்டமை',
    },
    about: {
      title: 'PredictAI திட்டம் பற்றி',
      subtitle: 'மாணவர் உருவாக்கிய தொழில்துறை IoT மற்றும் இயந்திர கற்றல் முன்கணிப்பு பராமரிப்பு தளம்',
      projectOverview: 'திட்ட கண்ணோட்டம் & ஆராய்ச்சி நோக்கங்கள்',
      projectDesc: 'PredictAI என்பது தொழில்துறை இயந்திரங்களின் திடீர் முறிவுகளை முன்கூட்டியே கண்டறிந்து தடுக்கும் ஒரு புத்திசாலித்தனமான அமைப்பாகும்.',
      architectureTitle: 'கணினி கட்டமைப்பு',
      architectureDesc: 'சென்சார்கள் → எட்ஜ் கேட்வே → அம்ச பிரித்தெடுத்தல் → ML இயந்திரம் → தானியங்கி பணி ஆணைகள்.',
      methodologyTitle: 'தரவு முறையியல் மற்றும் பகுப்பாய்வு',
      methodologyDesc: 'AI4I 2020 மற்றும் NASA C-MAPSS தரவுத்தொகுப்புகள் மூலம் பயிற்றுவிக்கப்பட்டது.',
      academicCredits: 'கல்வி வரவுகள்',
      studentLead: 'முன்னணி மாணவர் பொறியாளர்: நேத்ரா கொஞ்சேட்டி',
      facultyAdvisor: 'வழிகாட்டுதல்: கணினி அறிவியல் மற்றும் பொறியியல் துறை',
      department: 'சிறப்பு: செயற்கை நுண்ணறிவு மற்றும் தொழில்துறை IoT',
      techStack: 'பயன்படுத்தப்பட்ட தொழில்நுட்பங்கள்: React 19, TypeScript, Tailwind CSS, Lucide, Web Speech API',
      references: 'குறிப்புகள்: ISO 10816 அதிர்வு தரநிலைகள், நாசா C-MAPSS, AI4I 2020',
    },
    voice: {
      micTitle: 'குரல் உதவியாளர் & கட்டளைகள்',
      enableMic: 'மைக்ரோஃபோனை இயக்கவும்',
      notEnabled: 'மைக்ரோஃபோன் தற்போது முடக்கப்பட்டுள்ளது.',
      requesting: 'உலாவியிடம் அனுமதி கேட்கப்படுகிறது...',
      granted: 'மைக்ரோஃபோன் அனுமதி வழங்கப்பட்டது.',
      denied: 'மைக்ரோஃபோன் அனுமதி மறுக்கப்பட்டது.',
      unsupported: 'இந்த உலாவியில் Web Speech API கிடைக்கவில்லை.',
      startRecording: 'பேசத் தொடங்குங்கள்',
      stopRecording: 'பதிவை நிறுத்து',
      cancel: 'ரத்து செய்',
      playRecording: 'பதிவு செய்யப்பட்ட ஆடியோவை கேளுங்கள்',
      listening: 'உங்கள் குரல் கட்டளையை கேட்கிறது...',
      trySpeaking: 'இந்த கட்டளைகளில் ஒன்றை சொல்லுங்கள்:',
      commandExample1: '"Show machine health" (இயந்திர நலனைக் காட்டு)',
      commandExample2: '"Check machine failure risk" (தோல்வி அபாயத்தை சரிபார்க்கவும்)',
      commandExample3: '"Open maintenance alerts" (எச்சரிக்கைகளை திற)',
      commandExample4: '"Switch to dark theme" (டார்க் தீமிற்கு மாறு)',
      commandExample5: '"Change language to English" (மொழியை மாற்று)',
      confirmCommandTitle: 'குரல் கட்டளை உறுதிப்படுத்தல்',
      confirmExecute: 'கட்டளையை இயக்கு',
      fallbackInputPlaceholder: 'அல்லது இங்கே கட்டளையை தட்டச்சு செய்க...',
      fallbackSubmit: 'இயக்கு',
      speechDisclaimer: 'குரல் அறிதல் துல்லியம் உங்கள் உலாவியைப் பொறுத்தது.',
      recognizedTextPrompt: 'அடையாளம் காணப்பட்ட கட்டளை:',
    },
  },

  es: {
    appName: 'PredictAI',
    tagline: 'Prediga Fallas. Evite Tiempos de Inactividad.',
    studentProject: 'Proyecto Final Estudiantil de IA/ML e IoT Industrial',
    nav: {
      overview: 'Panel General',
      monitoring: 'Monitoreo de Máquinas',
      prediction: 'Predicción de Fallas IA',
      dataset: 'Explorador de Datos',
      models: 'Rendimiento de Modelos',
      planner: 'Planificador de Mantenimiento',
      alerts: 'Alertas y Notificaciones',
      reports: 'Informes e Historial',
      settings: 'Configuración y Preferencias',
      about: 'Acerca del Proyecto',
    },
    themes: {
      original: 'Tema Industrial',
      light: 'Tema Claro',
      dark: 'Tema Oscuro',
    },
    common: {
      status: 'Estado',
      actions: 'Acciones',
      refresh: 'Actualizar',
      exportCsv: 'Exportar CSV',
      printReport: 'Imprimir / Guardar Informe',
      save: 'Guardar Cambios',
      cancel: 'Cancelar',
      delete: 'Eliminar',
      edit: 'Editar',
      apply: 'Aplicar',
      reset: 'Restablecer Valores',
      search: 'Buscar equipos o registros...',
      filter: 'Filtrar',
      all: 'Todos',
      normal: 'Normal',
      warning: 'Advertencia',
      critical: 'Crítico',
      optimal: 'Óptimo',
      active: 'Activo',
      hours: 'hrs',
      days: 'días',
      details: 'Detalles',
      viewAll: 'Ver Todo',
      close: 'Cerrar',
      confirm: 'Confirmar Acción',
    },
    sensors: {
      vibration: 'Vibración RMS',
      temperature: 'Temperatura de Rodamiento',
      pressure: 'Presión Hidráulica',
      acoustic: 'Emisión Acústica',
      rpm: 'Velocidad de Motor',
      current: 'Corriente de Accionamiento',
      vibrationUnit: 'mm/s',
      tempUnit: '°C',
      pressureUnit: 'bar',
      acousticUnit: 'dB',
      rpmUnit: 'RPM',
      currentUnit: 'A',
    },
    overview: {
      title: 'Resumen de Salud de la Flota y Anomalías',
      subtitle: 'Telemetría de sensores en tiempo real y diagnósticos de fallas con aprendizaje automático',
      fleetHealth: 'Índice de Salud de la Flota',
      activeAssets: 'Activos Monitoreados',
      highRiskMachines: 'Máquinas en Alto Riesgo',
      avgRul: 'Vida Útil Restante Promedio (RUL)',
      liveTelemetry: 'Flujo de Telemetría en Vivo',
      telemetryDesc: 'Lecturas continuas de sensores de vibración, temperatura y acústica',
      machineFleetStatus: 'Estado de la Flota de Máquinas',
      recentIncidents: 'Eventos Recientes de Anomalía',
      quickPrediction: 'Predicción Rápida',
      viewMonitoring: 'Inspeccionar Máquina',
      runAiDiagnostic: 'Ejecutar Diagnóstico IA',
      noActiveIncidents: 'No se detectaron incidentes críticos en las últimas 24 horas.',
      allSystemsNominal: 'Todos los activos monitoreados operan dentro de los límites de tolerancia nominal.',
    },
    monitoring: {
      title: 'Monitoreo de Máquinas en Tiempo Real',
      subtitle: 'Telemetría de sensores de alta frecuencia, espectro de vibración FFT y análisis de señales acústicas',
      selectMachine: 'Seleccionar Máquina para Monitorear',
      machineDetails: 'Especificación del Activo',
      serialNo: 'Número de Serie',
      operatingHours: 'Horas de Operación',
      commissionDate: 'Fecha de Puesta en Servicio',
      liveGauges: 'Medidores de Sensores en Vivo',
      frequencySpectrum: 'Espectro Armónico de Vibración FFT (0 - 500 Hz)',
      frequencyDesc: 'Transformada Rápida de Fourier identificando armónicos 1X, 2X y frecuencias de fallas de rodamientos',
      acousticWaveform: 'Forma de Onda Ultrasónica de Alta Frecuencia',
      acousticDesc: 'Envolvente de emisión acústica en tiempo real que detecta microfisuras internas y fricción',
      emergencyStop: 'Parada de Emergencia Aislada',
      emergencyStopConfirm: '¿Está seguro de que desea simular un apagado de emergencia para esta unidad?',
      tuneThresholds: 'Márgenes de Umbral',
      safeZone: 'Zona de Operación Segura',
      warnZone: 'Límite de Advertencia',
      critZone: 'Umbral Crítico',
    },
    prediction: {
      title: 'Motor de Predicción de Fallas de Máquinas con IA',
      subtitle: 'Inferencia multimodo que calcula probabilidades de falla, vida útil restante y diagnósticos de causa raíz',
      inputParameters: 'Entradas de Sensores',
      loadLiveValues: 'Cargar Valores en Vivo de Máquina',
      selectModel: 'Seleccionar Modelo de Aprendizaje Automático',
      runInference: 'Ejecutar Predicción del Modelo',
      inferenceRunning: 'Ejecutando Inferencia de IA y Análisis SHAP...',
      resultsTitle: 'Diagnóstico de Inferencia y Acción Prescriptiva',
      failureProbability: 'Probabilidad de Falla',
      predictedRul: 'Vida Útil Restante Estimada (RUL)',
      failureMode: 'Modo de Falla Clasificado',
      confidence: 'Confianza del Modelo',
      shapImportance: 'Contribución de Características SHAP',
      shapDesc: 'Clasificación de impacto de sensores que impulsan la puntuación de riesgo',
      prescriptiveTitle: 'Recomendación de Mantenimiento Prescriptivo',
      prescriptiveDesc: 'Medidas de mitigación técnica inmediatas recomendadas',
      scheduleTicket: 'Crear Orden de Trabajo Automatizada',
      ticketScheduled: '¡Orden de trabajo enviada al planificador de mantenimiento!',
      models: {
        randomForest: 'Ensamble de Bosques Aleatorios',
        randomForestDesc: 'Robusto conjunto de árboles de decisión entrenado en 10,000 registros de sensores',
        xgboost: 'Aumento de Gradiente XGBoost',
        xgboostDesc: 'Árboles de decisión potenciados con calibración precisa de probabilidad de falla',
        lstm: 'Autoencoder LSTM',
        lstmDesc: 'Red neuronal profunda temporal que detecta patrones secuenciales de degradación',
        isolationForest: 'Bosque de Aislamiento (Anomalías)',
        isolationForestDesc: 'Aislamiento de árboles no supervisado para detectar valores atípicos multidimensionales',
      },
    },
    dataset: {
      title: 'Explorador de Conjuntos de Datos IoT Industrial',
      subtitle: 'Inspeccione registros del conjunto de referencia AI4I 2020 y telemetría de sensores en vivo',
      selectDataset: 'Elegir Conjunto de Datos',
      uploadDataset: 'Subir CSV/JSON Personalizado',
      generateSample: 'Generar Muestras en Vivo',
      totalRecords: 'Total de Registros Cargados',
      featuresCount: 'Características Técnicas',
      failureRate: 'Tasa Histórica de Fallas',
      avgToolWear: 'Desgaste Promedio de Herramienta',
      searchPlaceholder: 'Buscar por ID de Producto, Tipo o Falla...',
      filterFailure: 'Filtro de Fallas',
      columnUdi: 'UID',
      columnProduct: 'ID Producto',
      columnType: 'Tipo',
      columnAirTemp: 'Temp. Aire (K)',
      columnProcessTemp: 'Temp. Proceso (K)',
      columnRpm: 'Velocidad (RPM)',
      columnTorque: 'Torque (Nm)',
      columnToolWear: 'Desgaste Herramienta (min)',
      columnFailure: 'Falla de Máquina',
      columnFailureType: 'Tipo de Falla',
      uploadInstructions: 'Suba un archivo CSV o JSON con registros de telemetría industrial.',
      dropFileHere: 'Arrastre y suelte el archivo o haga clic para examinar (Máx. 5MB)',
    },
    models: {
      title: 'Rendimiento y Validación de Modelos de IA',
      subtitle: 'Evaluación comparativa de modelos de mantenimiento predictivo en conjuntos de datos industriales',
      comparisonScorecard: 'Tarjeta Comparativa de Modelos',
      accuracy: 'Precisión Global (Accuracy)',
      precision: 'Precisión (Precision)',
      recall: 'Sensibilidad (Recall)',
      f1Score: 'Puntuación F1',
      rocAuc: 'ROC-AUC',
      latency: 'Latencia de Inferencia',
      confusionMatrix: 'Matriz de Confusión (Conjunto de Prueba)',
      truePositive: 'Verdadero Positivo (TP)',
      falsePositive: 'Falso Positivo (FP)',
      trueNegative: 'Verdadero Negativo (TN)',
      falseNegative: 'Falso Negativo (FN)',
      rocCurve: 'Curva Característica Operativa del Receptor (ROC)',
      precisionRecallCurve: 'Curva de Precisión y Sensibilidad',
      trainingLossHistory: 'Pérdida de Entrenamiento y Convergencia de Validación',
    },
    planner: {
      title: 'Planificador de Mantenimiento Preventivo y Órdenes de Trabajo',
      subtitle: 'Programe órdenes de trabajo, asigne técnicos y optimice MTBF / MTTR',
      createWorkOrder: 'Crear Orden de Trabajo',
      newWorkOrderTitle: 'Programar Nueva Orden de Mantenimiento',
      mtbf: 'Tiempo Medio Entre Fallas (MTBF)',
      mttr: 'Tiempo Medio de Reparación (MTTR)',
      openOrders: 'Órdenes Activas',
      completedOrders: 'Mantenimientos Completados',
      orderTitle: 'Título de la Orden',
      machine: 'Activo Destino',
      priority: 'Nivel de Prioridad',
      assignedTech: 'Técnico Responsable',
      dueDate: 'Fecha Límite',
      spareParts: 'Repuestos Requeridos',
      estimatedCost: 'Costo Estimado ($)',
      checklist: 'Lista de Verificación de Procedimiento',
      addChecklistItem: 'Agregar tarea a la lista...',
      markCompleted: 'Marcar como Completada',
    },
    alerts: {
      title: 'Alertas, Notificaciones y Flujo de Incidentes',
      subtitle: 'Disparadores de umbral de telemetría en tiempo real, escaladas automáticas y confirmación de incidentes',
      activeAlerts: 'Alertas Activas de Incidentes',
      filterSeverity: 'Filtrar por Severidad',
      acknowledge: 'Reconocer',
      resolve: 'Resolver Incidente',
      escalateToOrder: 'Escalar a Orden de Trabajo',
      acknowledged: 'Reconocida',
      resolved: 'Resuelta',
      triggerRules: 'Reglas de Activación Automática Configuradas',
      noAlerts: 'Cero alarmas no reconocidas. Toda la maquinaria opera dentro de límites seguros.',
    },
    reports: {
      title: 'Informes de Ingeniería y Registros de Auditoría',
      subtitle: 'Retorno de inversión cuantificado, horas de inactividad evitadas y registros de auditoría',
      executiveSummary: 'Resumen Ejecutivo de Mantenimiento',
      costAvoided: 'Costo Estimado de Inactividad Evitado',
      downtimePrevented: 'Horas de Inactividad No Planificada Evitadas',
      aiAccuracyReport: 'Tasa de Éxito de Intervenciones Predictivas',
      auditLog: 'Registro de Auditoría de Sistemas y Telemetría',
      timestamp: 'Marca de Tiempo',
      category: 'Categoría',
      eventAction: 'Acción Realizada',
      operator: 'Usuario / Origen',
      downloadPdf: 'Imprimir / Exportar Informe PDF',
    },
    settings: {
      title: 'Preferencias del Sistema y Configuración de Sensores',
      subtitle: 'Ajuste frecuencias de sondeo, umbrales de disparo, sensibilidad y alertas sonoras',
      pollingInterval: 'Intervalo de Actualización de Telemetría',
      pollingIntervalDesc: 'Frecuencia de actualización de lecturas de sensores y recálculo de espectro',
      anomalySensitivity: 'Sensibilidad de Detección de Anomalías',
      anomalySensitivityDesc: 'Ajuste de umbral para el algoritmo de detección estadística de anomalías',
      thresholdConfig: 'Límites de Advertencia y Críticos',
      soundAlerts: 'Alarma Sonora en Excedencia Crítica',
      voiceSettings: 'Idioma Predeterminado del Asistente de Voz',
      resetDefaults: 'Restablecer Valores de Fábrica',
    },
    about: {
      title: 'Acerca del Proyecto PredictAI',
      subtitle: 'Arquitectura de Mantenimiento Predictivo con IoT Industrial y Machine Learning desarrollada por estudiantes',
      projectOverview: 'Descripción General del Proyecto y Objetivos de Investigación',
      projectDesc: 'PredictAI es una plataforma integral de mantenimiento predictivo desarrollada como proyecto final universitario. Las fallas mecánicas imprevistas en la industria causan pérdidas millonarias. PredictAI une la telemetría IoT de alta frecuencia con algoritmos de aprendizaje automático para diagnosticar fallas incipientes, estimar la Vida Útil Restante (RUL) y prescribir intervenciones antes de un colapso catastrófico.',
      architectureTitle: 'Arquitectura del Sistema de Extremo a Extremo',
      architectureDesc: 'Sensores Físicos → Puerta de Enlace Edge y MQTT → Extracción de Características (FFT, RMS) → Motor de Inferencia ML → Acciones Prescriptivas y Órdenes de Trabajo.',
      methodologyTitle: 'Metodología de Datos y Procesamiento de Señales',
      methodologyDesc: 'Validado con el conjunto de datos de mantenimiento predictivo AI4I 2020 y flujos de degradación NASA C-MAPSS.',
      academicCredits: 'Créditos Académicos y de Desarrollo',
      studentLead: 'Ingeniero Estudiantil Líder: Nethra Konjeti',
      facultyAdvisor: 'Asesoría y Mentoría: Departamento de Ciencias de la Computación e Ingeniería',
      department: 'Especialización: Inteligencia Artificial, Machine Learning e IoT Industrial',
      techStack: 'Tecnologías Utilizadas: React 19, TypeScript, Tailwind CSS, Iconos Lucide, Web Speech API',
      references: 'Referencias Académicas: Normas de vibración mecánica ISO 10816, NASA C-MAPSS, AI4I 2020',
    },
    voice: {
      micTitle: 'Asistente de Voz y Comandos Hablados',
      enableMic: 'Habilitar Micrófono',
      notEnabled: 'El micrófono está deshabilitado actualmente. Haga clic en Habilitar para comenzar.',
      requesting: 'Solicitando permiso de micrófono al navegador...',
      granted: 'Permiso de micrófono concedido. Listo para recibir comandos de voz.',
      denied: 'Permiso de micrófono denegado en la configuración del navegador.',
      unsupported: 'El navegador no admite la API Web Speech. Puede usar la barra de comandos escrita a continuación.',
      startRecording: 'Iniciar Grabación de Voz',
      stopRecording: 'Detener Grabación de Voz',
      cancel: 'Cancelar',
      playRecording: 'Reproducir Audio Grabado',
      listening: 'Escuchando su comando de voz...',
      trySpeaking: 'Pruebe pronunciar uno de estos comandos:',
      commandExample1: '"Show machine health" (Ver salud de máquinas)',
      commandExample2: '"Check machine failure risk" (Ver riesgo de fallas)',
      commandExample3: '"Open maintenance alerts" (Abrir alertas)',
      commandExample4: '"Switch to dark theme" (Cambiar a tema oscuro)',
      commandExample5: '"Change language to English" (Cambiar idioma)',
      confirmCommandTitle: 'Confirmar Ejecución del Comando de Voz',
      confirmExecute: 'Ejecutar Comando',
      fallbackInputPlaceholder: 'O escriba un comando aquí...',
      fallbackSubmit: 'Ejecutar',
      speechDisclaimer: 'La precisión del reconocimiento de voz depende de las capacidades del motor de su navegador.',
      recognizedTextPrompt: 'Comando de Voz Reconocido:',
    },
  },
};
