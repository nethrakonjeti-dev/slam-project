/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { VoiceAssistantModal } from './components/VoiceAssistantModal';
import { OverviewDashboard } from './components/views/OverviewDashboard';
import { MachineMonitoring } from './components/views/MachineMonitoring';
import { FailurePrediction } from './components/views/FailurePrediction';
import { DatasetExplorer } from './components/views/DatasetExplorer';
import { ModelPerformance } from './components/views/ModelPerformance';
import { MaintenancePlanner } from './components/views/MaintenancePlanner';
import { AlertsNotifications } from './components/views/AlertsNotifications';
import { ReportsHistory } from './components/views/ReportsHistory';
import { SettingsPreferences } from './components/views/SettingsPreferences';
import { AboutProject } from './components/views/AboutProject';

const MainLayout: React.FC = () => {
  const { activeTab } = useApp();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const renderActiveView = () => {
    switch (activeTab) {
      case 'overview':
        return <OverviewDashboard />;
      case 'monitoring':
        return <MachineMonitoring />;
      case 'prediction':
        return <FailurePrediction />;
      case 'dataset':
        return <DatasetExplorer />;
      case 'models':
        return <ModelPerformance />;
      case 'planner':
        return <MaintenancePlanner />;
      case 'alerts':
        return <AlertsNotifications />;
      case 'reports':
        return <ReportsHistory />;
      case 'settings':
        return <SettingsPreferences />;
      case 'about':
        return <AboutProject />;
      default:
        return <OverviewDashboard />;
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col transition-colors duration-200"
      style={{
        backgroundColor: 'var(--bg-page)',
        color: 'var(--text-primary)',
      }}
    >
      {/* Top Header */}
      <Header
        onToggleMobileSidebar={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
        isMobileSidebarOpen={isMobileSidebarOpen}
      />

      {/* Main Body with Sidebar + Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Navigation Sidebar */}
        <Sidebar
          isCollapsed={isSidebarCollapsed}
          onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          isMobileOpen={isMobileSidebarOpen}
          onCloseMobile={() => setIsMobileSidebarOpen(false)}
        />

        {/* Dynamic Content Viewport */}
        <main className="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="max-w-7xl mx-auto">
            {renderActiveView()}
          </div>
        </main>
      </div>

      {/* Global Voice Assistant Modal */}
      <VoiceAssistantModal />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}
