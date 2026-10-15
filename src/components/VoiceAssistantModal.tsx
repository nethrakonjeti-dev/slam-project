/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Mic,
  MicOff,
  Square,
  Play,
  X,
  AlertCircle,
  CheckCircle2,
  Send,
  HelpCircle,
  Volume2,
} from 'lucide-react';

export const VoiceAssistantModal: React.FC = () => {
  const {
    isVoiceModalOpen,
    setIsVoiceModalOpen,
    micState,
    requestMicPermission,
    startVoiceRecording,
    stopVoiceRecording,
    cancelVoiceRecording,
    playRecordedAudio,
    handleVoiceCommand,
    pendingCommand,
    confirmAndExecuteVoiceCommand,
    clearPendingCommand,
    t,
  } = useApp();

  const [textCommandInput, setTextCommandInput] = useState('');

  if (!isVoiceModalOpen) return null;

  const handleClose = () => {
    cancelVoiceRecording();
    clearPendingCommand();
    setIsVoiceModalOpen(false);
  };

  const handleTextSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (textCommandInput.trim()) {
      handleVoiceCommand(textCommandInput.trim());
      setTextCommandInput('');
    }
  };

  const sampleCommands = [
    t.voice.commandExample1,
    t.voice.commandExample2,
    t.voice.commandExample3,
    t.voice.commandExample4,
    t.voice.commandExample5,
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs select-none"
      onClick={handleClose}
    >
      <div
        className="w-full max-w-lg rounded-xl border shadow-2xl overflow-hidden flex flex-col transition-all"
        style={{
          backgroundColor: 'var(--bg-surface-elevated)',
          borderColor: 'var(--border-strong)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div
          className="flex items-center justify-between px-5 py-4 border-b"
          style={{ borderColor: 'var(--border-subtle)' }}
        >
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400">
              <Mic size={18} />
            </div>
            <div>
              <h3 className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>
                {t.voice.micTitle}
              </h3>
              <p className="text-[11px]" style={{ color: 'var(--text-muted)' }}>
                Industrial IoT Speech-to-Intent Engine
              </p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="p-1.5 rounded-lg hover:bg-slate-700/20 text-slate-400 hover:text-white transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-5 space-y-5 overflow-y-auto max-h-[75vh]">
          {/* Permission State Indicator */}
          <div
            className="p-3 rounded-lg border text-xs flex items-start gap-2.5"
            style={{
              backgroundColor: 'var(--bg-muted)',
              borderColor: 'var(--border-subtle)',
            }}
          >
            {micState.status === 'not_enabled' && (
              <>
                <AlertCircle size={16} className="text-amber-500 shrink-0 mt-0.5" />
                <div className="flex-1">
                  <div className="font-semibold text-amber-500">
                    Status: {t.voice.notEnabled}
                  </div>
                  <button
                    onClick={requestMicPermission}
                    className="mt-2 px-3 py-1.5 rounded-md bg-cyan-600 hover:bg-cyan-500 text-white font-medium text-xs transition-colors flex items-center gap-1.5"
                  >
                    <Mic size={14} />
                    <span>{t.voice.enableMic}</span>
                  </button>
                </div>
              </>
            )}

            {micState.status === 'requesting' && (
              <>
                <div className="w-4 h-4 rounded-full border-2 border-cyan-400 border-t-transparent animate-spin shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-cyan-400">
                    Status: {t.voice.requesting}
                  </div>
                </div>
              </>
            )}

            {micState.status === 'granted' && (
              <>
                <CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                <div className="flex-1">
                  <div className="font-semibold text-emerald-500">
                    Status: {t.voice.granted}
                  </div>
                </div>
              </>
            )}

            {micState.status === 'denied' && (
              <>
                <MicOff size={16} className="text-red-500 shrink-0 mt-0.5" />
                <div className="flex-1">
                  <div className="font-semibold text-red-500">
                    Status: {t.voice.denied}
                  </div>
                  <p className="text-[11px] mt-1 text-slate-400">
                    {micState.errorMessage || 'Browser denied access. Please check microphone settings.'}
                  </p>
                </div>
              </>
            )}

            {micState.status === 'unsupported' && (
              <>
                <AlertCircle size={16} className="text-amber-500 shrink-0 mt-0.5" />
                <div className="flex-1">
                  <div className="font-semibold text-amber-500">
                    Status: {t.voice.unsupported}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Recording & Waveform Zone */}
          {micState.status === 'granted' && (
            <div
              className="p-5 rounded-xl border flex flex-col items-center justify-center gap-3 transition-colors text-center"
              style={{
                backgroundColor: micState.isRecording ? 'rgba(6, 182, 212, 0.05)' : 'var(--bg-canvas)',
                borderColor: micState.isRecording ? 'var(--accent-primary)' : 'var(--border-subtle)',
              }}
            >
              {/* Active Waveform Bars */}
              {micState.isRecording ? (
                <div className="flex items-center gap-1.5 h-10">
                  <div className="w-1.5 bg-cyan-400 rounded-full animate-wave-1" />
                  <div className="w-1.5 bg-cyan-400 rounded-full animate-wave-2" />
                  <div className="w-1.5 bg-cyan-400 rounded-full animate-wave-3" />
                  <div className="w-1.5 bg-teal-400 rounded-full animate-wave-4" />
                  <div className="w-1.5 bg-teal-400 rounded-full animate-wave-5" />
                  <div className="w-1.5 bg-cyan-400 rounded-full animate-wave-2" />
                  <div className="w-1.5 bg-cyan-400 rounded-full animate-wave-1" />
                </div>
              ) : (
                <div className="w-12 h-12 rounded-full bg-cyan-500/10 flex items-center justify-center text-cyan-400">
                  <Mic size={24} />
                </div>
              )}

              <div className="text-xs font-semibold" style={{ color: 'var(--text-primary)' }}>
                {micState.isRecording ? t.voice.listening : 'Ready to record command'}
              </div>

              {/* Controls */}
              <div className="flex items-center gap-2 mt-2">
                {!micState.isRecording ? (
                  <button
                    onClick={startVoiceRecording}
                    className="px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-medium text-xs flex items-center gap-2 transition-colors shadow-sm"
                  >
                    <Mic size={14} />
                    <span>{t.voice.startRecording}</span>
                  </button>
                ) : (
                  <button
                    onClick={stopVoiceRecording}
                    className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-500 text-white font-medium text-xs flex items-center gap-2 transition-colors shadow-sm"
                  >
                    <Square size={14} />
                    <span>{t.voice.stopRecording}</span>
                  </button>
                )}

                {micState.isRecording && (
                  <button
                    onClick={cancelVoiceRecording}
                    className="px-3 py-2 rounded-lg border text-xs font-medium hover:bg-slate-700/20 transition-colors"
                    style={{ borderColor: 'var(--border-subtle)', color: 'var(--text-secondary)' }}
                  >
                    {t.voice.cancel}
                  </button>
                )}

                {micState.audioBlobUrl && !micState.isRecording && (
                  <button
                    onClick={playRecordedAudio}
                    className="px-3 py-2 rounded-lg border text-xs font-medium hover:bg-cyan-500/10 text-cyan-400 border-cyan-500/30 flex items-center gap-1.5 transition-colors"
                  >
                    <Play size={13} />
                    <span>{t.voice.playRecording}</span>
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Live Transcript / Recognized Text Display */}
          {micState.recognizedText && (
            <div
              className="p-3 rounded-lg border text-xs"
              style={{
                backgroundColor: 'var(--bg-muted)',
                borderColor: 'var(--border-subtle)',
              }}
            >
              <div className="text-[11px] font-semibold text-slate-400 mb-1">
                {t.voice.recognizedTextPrompt}
              </div>
              <div className="font-mono text-cyan-400 text-sm italic">
                "{micState.recognizedText}"
              </div>
            </div>
          )}

          {/* Confirmation Field Before Executing Consequential Commands */}
          {pendingCommand && (
            <div
              className="p-4 rounded-xl border border-amber-500/40 bg-amber-500/10 text-xs space-y-3"
            >
              <div className="flex items-center gap-2 text-amber-400 font-semibold text-sm">
                <AlertCircle size={16} />
                <span>{t.voice.confirmCommandTitle}</span>
              </div>
              <p className="text-slate-300">
                Action to execute: <span className="font-semibold text-white">{pendingCommand.label}</span>
              </p>
              <div className="flex items-center gap-2 pt-1">
                <button
                  onClick={() => confirmAndExecuteVoiceCommand(pendingCommand.action, pendingCommand.label)}
                  className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs transition-colors"
                >
                  {t.voice.confirmExecute}
                </button>
                <button
                  onClick={clearPendingCommand}
                  className="px-3 py-1.5 rounded-lg border border-slate-600 text-slate-300 hover:bg-slate-700/30 text-xs transition-colors"
                >
                  {t.common.cancel}
                </button>
              </div>
            </div>
          )}

          {/* Text-Input Alternative */}
          <div className="space-y-1.5">
            <div className="flex items-center gap-1 text-[11px] font-semibold text-slate-400">
              <Volume2 size={12} />
              <span>Text-Input Command Alternative</span>
            </div>
            <form onSubmit={handleTextSubmit} className="flex gap-2">
              <input
                type="text"
                value={textCommandInput}
                onChange={(e) => setTextCommandInput(e.target.value)}
                placeholder={t.voice.fallbackInputPlaceholder}
                className="flex-1 px-3 py-2 rounded-lg border text-xs bg-transparent focus:outline-none focus:border-cyan-400 transition-colors"
                style={{
                  borderColor: 'var(--border-subtle)',
                  color: 'var(--text-primary)',
                }}
              />
              <button
                type="submit"
                disabled={!textCommandInput.trim()}
                className="px-3 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 disabled:opacity-40 text-white text-xs font-medium flex items-center gap-1.5 transition-colors"
              >
                <Send size={13} />
                <span>{t.voice.fallbackSubmit}</span>
              </button>
            </form>
          </div>

          {/* Sample Commands Quick Clickers */}
          <div className="space-y-2">
            <div className="text-[11px] font-semibold text-slate-400 flex items-center gap-1">
              <HelpCircle size={12} />
              <span>{t.voice.trySpeaking}</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {sampleCommands.map((cmd, i) => (
                <button
                  key={i}
                  onClick={() => handleVoiceCommand(cmd.replace(/"/g, ''))}
                  className="px-2.5 py-1 rounded-md text-[11px] border hover:border-cyan-400/50 hover:bg-cyan-500/10 transition-colors text-left"
                  style={{
                    backgroundColor: 'var(--bg-muted)',
                    borderColor: 'var(--border-subtle)',
                    color: 'var(--text-secondary)',
                  }}
                >
                  {cmd}
                </button>
              ))}
            </div>
          </div>

          {/* Browser engine disclaimer */}
          <p className="text-[10px] text-slate-500 leading-normal" style={{ color: 'var(--text-muted)' }}>
            * {t.voice.speechDisclaimer}
          </p>
        </div>
      </div>
    </div>
  );
};
