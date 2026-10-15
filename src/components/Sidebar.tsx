/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useApp } from '../context/AppContext';
import { NavView } from '../types';
import {
  LayoutDashboard,
  Activity,
  BrainCircuit,
  Database,
  LineChart,
  CalendarCheck,
  AlertTriangle,
  FileText,
  Sliders,
  Info,
  ChevronLeft,
  ChevronRight,
  Radio,
  Pause,
} from 'lucide-react';

interface SidebarProps {
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  isMobileOpen: boolean;
  onCloseMobile: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  isCollapsed,
  onToggleCollapse,
  isMobileOpen,
  onCloseMobile,
}) => {
  const { activeTab, setActiveTab, t, isStreaming, toggleStreaming, unreadAlertCount } = useApp();

  const navItems: { id: NavView; label: string; icon: React.ReactNode; badge?: number }[] = [
    { id: 'overview', label: t.nav.overview, icon: <LayoutDashboard size={18} /> },
    { id: 'monitoring', label: t.nav.monitoring, icon: <Activity size={18} /> },
    { id: 'prediction', label: t.nav.prediction, icon: <BrainCircuit size={18} /> },
    { id: 'dataset', label: t.nav.dataset, icon: <Database size={18} /> },
    { id: 'models', label: t.nav.models, icon: <LineChart size={18} /> },
    { id: 'planner', label: t.nav.planner, icon: <CalendarCheck size={18} /> },
    {
      id: 'alerts',
      label: t.nav.alerts,
      icon: <AlertTriangle size={18} />,
      badge: unreadAlertCount > 0 ? unreadAlertCount : undefined,
    },
    { id: 'reports', label: t.nav.reports, icon: <FileText size={18} /> },
    { id: 'settings', label: t.nav.settings, icon: <Sliders size={18} /> },
    { id: 'about', label: t.nav.about, icon: <Info size={18} /> },
  ];

  const handleSelectTab = (tab: NavView) => {
    setActiveTab(tab);
    onCloseMobile();
  };

  const sidebarContent = (
    <div className="flex flex-col h-full select-none">
      {/* Top Telemetry Status Strip */}
      <div
        className="px-4 py-3 border-b flex items-center justify-between"
        style={{ borderColor: 'var(--border-subtle)' }}
      >
        {!isCollapsed ? (
          <div className="flex items-center justify-between w-full">
            <button
              onClick={toggleStreaming}
              className="flex items-center gap-2 text-xs font-medium px-2 py-1 rounded transition-colors"
              style={{
                backgroundColor: isStreaming ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                color: isStreaming ? 'var(--status-normal)' : 'var(--status-critical)',
              }}
              title={isStreaming ? 'Pause Sensor Telemetry' : 'Resume Sensor Telemetry'}
            >
              {isStreaming ? (
                <>
                  <Radio size={14} className="animate-pulse" />
                  <span>Telemetry Live</span>
                </>
              ) : (
                <>
                  <Pause size={14} />
                  <span>Stream Paused</span>
                </>
              )}
            </button>
            <button
              onClick={onToggleCollapse}
              aria-label="Collapse Sidebar"
              className="hidden lg:flex p-1 rounded hover:bg-slate-700/20 text-slate-400 hover:text-white transition-colors"
            >
              <ChevronLeft size={16} />
            </button>
          </div>
        ) : (
          <div className="w-full flex justify-center">
            <button
              onClick={onToggleCollapse}
              aria-label="Expand Sidebar"
              className="p-1 rounded hover:bg-slate-700/20 text-slate-400 hover:text-white transition-colors"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        )}
      </div>

      {/* Navigation List */}
      <nav className="flex-1 overflow-y-auto px-2 py-3 space-y-1">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleSelectTab(item.id)}
              title={isCollapsed ? item.label : undefined}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium transition-all duration-150 cursor-pointer ${
                isActive
                  ? 'shadow-sm font-semibold'
                  : 'hover:bg-slate-800/10 dark:hover:bg-slate-800/40'
              }`}
              style={{
                backgroundColor: isActive ? 'var(--accent-glow)' : 'transparent',
                color: isActive ? 'var(--accent-primary)' : 'var(--text-secondary)',
                border: isActive ? '1px solid var(--accent-primary)' : '1px solid transparent',
              }}
            >
              <span className={`shrink-0 ${isActive ? 'text-cyan-400' : ''}`}>{item.icon}</span>
              {!isCollapsed && <span className="truncate flex-1 text-left">{item.label}</span>}
              {!isCollapsed && item.badge !== undefined && (
                <span className="shrink-0 px-1.5 py-0.2 bg-red-500 text-white rounded-full text-[10px] font-bold tabular-nums">
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Footer Details */}
      {!isCollapsed && (
        <div
          className="p-3 border-t text-[11px] leading-relaxed"
          style={{
            borderColor: 'var(--border-subtle)',
            color: 'var(--text-muted)',
          }}
        >
          <div className="font-semibold text-slate-400" style={{ color: 'var(--text-secondary)' }}>
            PredictAI v2.4
          </div>
          <div className="truncate">{t.tagline}</div>
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={`hidden lg:block shrink-0 transition-all duration-200 border-r ${
          isCollapsed ? 'w-16' : 'w-64'
        }`}
        style={{
          backgroundColor: 'var(--bg-canvas)',
          borderColor: 'var(--border-subtle)',
        }}
      >
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs lg:hidden transition-opacity"
          onClick={onCloseMobile}
        >
          <div
            className="w-72 max-w-[85vw] h-full shadow-2xl border-r"
            style={{
              backgroundColor: 'var(--bg-surface)',
              borderColor: 'var(--border-strong)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
};
