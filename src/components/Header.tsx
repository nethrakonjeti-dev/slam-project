/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { BrandLogo } from './common/BrandLogo';
import { LanguageCode, ThemeMode } from '../types';
import {
  Mic,
  Bell,
  Sun,
  Moon,
  Cpu,
  Menu,
  X,
  Languages,
  Check,
} from 'lucide-react';

interface HeaderProps {
  onToggleMobileSidebar: () => void;
  isMobileSidebarOpen: boolean;
}

export const Header: React.FC<HeaderProps> = ({ onToggleMobileSidebar, isMobileSidebarOpen }) => {
  const {
    theme,
    setTheme,
    language,
    setLanguage,
    t,
    activeTab,
    setActiveTab,
    unreadAlertCount,
    setIsVoiceModalOpen,
    micState,
  } = useApp();

  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const [isThemeMenuOpen, setIsThemeMenuOpen] = useState(false);

  const langRef = useRef<HTMLDivElement>(null);
  const themeRef = useRef<HTMLDivElement>(null);

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(event.target as Node)) {
        setIsLangMenuOpen(false);
      }
      if (themeRef.current && !themeRef.current.contains(event.target as Node)) {
        setIsThemeMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const languageOptions: { code: LanguageCode; nativeLabel: string; englishLabel: string }[] = [
    { code: 'en', nativeLabel: 'English', englishLabel: 'English' },
    { code: 'te', nativeLabel: 'తెలుగు', englishLabel: 'Telugu' },
    { code: 'hi', nativeLabel: 'हिन्दी', englishLabel: 'Hindi' },
    { code: 'ta', nativeLabel: 'தமிழ்', englishLabel: 'Tamil' },
    { code: 'es', nativeLabel: 'Español', englishLabel: 'Spanish' },
  ];

  const currentViewTitle = t.nav[activeTab] || 'Dashboard';

  return (
    <header
      className="sticky top-0 z-40 w-full flex items-center justify-between gap-4 px-4 sm:px-6 py-3 transition-colors duration-200 border-b select-none"
      style={{
        backgroundColor: 'var(--bg-surface)',
        borderColor: 'var(--border-subtle)',
      }}
    >
      {/* Zone 1: Brand & Mobile Hamburger */}
      <div className="flex items-center gap-3 shrink-0">
        <button
          onClick={onToggleMobileSidebar}
          aria-label="Toggle Navigation Menu"
          className="lg:hidden p-1.5 rounded-md hover:bg-slate-700/20 text-slate-400 hover:text-white transition-colors"
          style={{ color: 'var(--text-secondary)' }}
        >
          {isMobileSidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        <button
          onClick={() => setActiveTab('overview')}
          className="flex items-center text-left focus:outline-none"
        >
          <BrandLogo size={32} />
        </button>
      </div>

      {/* Zone 2: Current Contextual Page Title */}
      <div className="hidden md:flex items-center gap-2 overflow-hidden">
        <span className="text-xs uppercase tracking-wider text-slate-400" style={{ color: 'var(--text-muted)' }}>
          {t.appName}
        </span>
        <span className="text-slate-500" style={{ color: 'var(--text-muted)' }}>/</span>
        <span className="text-sm font-semibold truncate" style={{ color: 'var(--text-primary)' }}>
          {currentViewTitle}
        </span>
      </div>

      {/* Zone 3: Actions (Voice Mic, Notification, Language, Theme) */}
      <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
        {/* Voice Assistant Microphone Button */}
        <button
          onClick={() => setIsVoiceModalOpen(true)}
          title={t.voice.micTitle}
          aria-label="Open Voice Assistant"
          className="relative flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs font-medium transition-all duration-150 cursor-pointer"
          style={{
            backgroundColor: micState.isRecording ? 'rgba(239, 68, 68, 0.15)' : 'var(--bg-muted)',
            borderColor: micState.isRecording ? '#ef4444' : 'var(--border-subtle)',
            color: micState.isRecording ? '#ef4444' : 'var(--text-primary)',
          }}
        >
          <Mic
            size={16}
            className={micState.isRecording ? 'animate-pulse text-red-500' : 'text-cyan-400'}
          />
          <span className="hidden sm:inline">
            {micState.isRecording ? t.voice.listening : 'Voice'}
          </span>
          {micState.status === 'granted' && !micState.isRecording && (
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          )}
        </button>

        {/* Notifications Icon with Badge */}
        <button
          onClick={() => setActiveTab('alerts')}
          title={t.nav.alerts}
          aria-label={`Alerts (${unreadAlertCount} unread)`}
          className="relative p-2 rounded-lg border transition-colors cursor-pointer"
          style={{
            backgroundColor: 'var(--bg-muted)',
            borderColor: 'var(--border-subtle)',
            color: 'var(--text-secondary)',
          }}
        >
          <Bell size={16} />
          {unreadAlertCount > 0 && (
            <span className="absolute -top-1 -right-1 px-1.5 py-0.2 bg-red-500 text-white rounded-full text-[10px] font-bold tabular-nums">
              {unreadAlertCount}
            </span>
          )}
        </button>

        {/* Language Selector Dropdown */}
        <div className="relative" ref={langRef}>
          <button
            onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
            title="Select Language"
            aria-label="Language Selector"
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs font-medium transition-colors cursor-pointer"
            style={{
              backgroundColor: 'var(--bg-muted)',
              borderColor: 'var(--border-subtle)',
              color: 'var(--text-primary)',
            }}
          >
            <Languages size={15} className="text-cyan-400" />
            <span className="hidden sm:inline font-sans font-semibold">
              {languageOptions.find((l) => l.code === language)?.nativeLabel}
            </span>
          </button>

          {isLangMenuOpen && (
            <div
              className="absolute right-0 mt-2 w-48 rounded-lg shadow-xl border py-1.5 z-50 text-xs"
              style={{
                backgroundColor: 'var(--bg-surface-elevated)',
                borderColor: 'var(--border-strong)',
              }}
            >
              {languageOptions.map((opt) => (
                <button
                  key={opt.code}
                  onClick={() => {
                    setLanguage(opt.code);
                    setIsLangMenuOpen(false);
                  }}
                  className="w-full flex items-center justify-between px-3 py-2 text-left hover:bg-cyan-500/10 transition-colors"
                  style={{
                    color: opt.code === language ? 'var(--accent-primary)' : 'var(--text-primary)',
                  }}
                >
                  <div className="flex flex-col">
                    <span className="font-semibold">{opt.nativeLabel}</span>
                    <span className="text-[10px]" style={{ color: 'var(--text-muted)' }}>
                      {opt.englishLabel}
                    </span>
                  </div>
                  {opt.code === language && <Check size={14} />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Three-Theme Selector Dropdown */}
        <div className="relative" ref={themeRef}>
          <button
            onClick={() => setIsThemeMenuOpen(!isThemeMenuOpen)}
            title="Select Theme"
            aria-label="Theme Selector"
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs font-medium transition-colors cursor-pointer"
            style={{
              backgroundColor: 'var(--bg-muted)',
              borderColor: 'var(--border-subtle)',
              color: 'var(--text-primary)',
            }}
          >
            {theme === 'original' && <Cpu size={15} className="text-teal-400" />}
            {theme === 'light' && <Sun size={15} className="text-amber-500" />}
            {theme === 'dark' && <Moon size={15} className="text-sky-400" />}
            <span className="hidden md:inline capitalize">
              {theme === 'original' ? t.themes.original : theme === 'light' ? t.themes.light : t.themes.dark}
            </span>
          </button>

          {isThemeMenuOpen && (
            <div
              className="absolute right-0 mt-2 w-44 rounded-lg shadow-xl border py-1.5 z-50 text-xs"
              style={{
                backgroundColor: 'var(--bg-surface-elevated)',
                borderColor: 'var(--border-strong)',
              }}
            >
              <button
                onClick={() => {
                  setTheme('original');
                  setIsThemeMenuOpen(false);
                }}
                className="w-full flex items-center justify-between px-3 py-2 text-left hover:bg-cyan-500/10 transition-colors"
                style={{
                  color: theme === 'original' ? 'var(--accent-primary)' : 'var(--text-primary)',
                }}
              >
                <div className="flex items-center gap-2">
                  <Cpu size={14} className="text-teal-400" />
                  <span>{t.themes.original}</span>
                </div>
                {theme === 'original' && <Check size={14} />}
              </button>

              <button
                onClick={() => {
                  setTheme('light');
                  setIsThemeMenuOpen(false);
                }}
                className="w-full flex items-center justify-between px-3 py-2 text-left hover:bg-cyan-500/10 transition-colors"
                style={{
                  color: theme === 'light' ? 'var(--accent-primary)' : 'var(--text-primary)',
                }}
              >
                <div className="flex items-center gap-2">
                  <Sun size={14} className="text-amber-500" />
                  <span>{t.themes.light}</span>
                </div>
                {theme === 'light' && <Check size={14} />}
              </button>

              <button
                onClick={() => {
                  setTheme('dark');
                  setIsThemeMenuOpen(false);
                }}
                className="w-full flex items-center justify-between px-3 py-2 text-left hover:bg-cyan-500/10 transition-colors"
                style={{
                  color: theme === 'dark' ? 'var(--accent-primary)' : 'var(--text-primary)',
                }}
              >
                <div className="flex items-center gap-2">
                  <Moon size={14} className="text-sky-400" />
                  <span>{t.themes.dark}</span>
                </div>
                {theme === 'dark' && <Check size={14} />}
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
