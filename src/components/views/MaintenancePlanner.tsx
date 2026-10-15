/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { WorkOrder, WorkOrderPriority } from '../../types';
import {
  CalendarCheck,
  Plus,
  Clock,
  Wrench,
  CheckCircle2,
  AlertCircle,
  X,
  Package,
  Calendar,
  User,
} from 'lucide-react';

export const MaintenancePlanner: React.FC = () => {
  const {
    t,
    workOrders,
    createWorkOrder,
    updateWorkOrderStatus,
    toggleWorkOrderChecklist,
    machines,
    formatNumber,
  } = useApp();

  const [showCreateModal, setShowCreateModal] = useState(false);

  // New Work Order Form State
  const [title, setTitle] = useState('');
  const [machineId, setMachineId] = useState(machines[0]?.id || 'M-01');
  const [priority, setPriority] = useState<WorkOrderPriority>('high');
  const [assignedTech, setAssignedTech] = useState('Sarah Jenkins (Vibration Cat II)');
  const [dueDate, setDueDate] = useState(
    new Date(Date.now() + 72 * 3600000).toISOString().split('T')[0]
  );
  const [cost, setCost] = useState('850');
  const [description, setDescription] = useState('');
  const [checklistTasks, setChecklistTasks] = useState([
    'Inspect mechanical couplings for torsional backlash',
    'Replenish high-pressure synthetic lubricant',
    'Perform post-repair baseline sensor verification',
  ]);
  const [newTaskInput, setNewTaskInput] = useState('');

  const handleAddTask = () => {
    if (newTaskInput.trim()) {
      setChecklistTasks([...checklistTasks, newTaskInput.trim()]);
      setNewTaskInput('');
    }
  };

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const targetMachine = machines.find((m) => m.id === machineId);
    createWorkOrder({
      title: title || 'Scheduled Preventive Service',
      machineId,
      machineName: targetMachine?.name || 'Machine Asset',
      priority,
      status: 'scheduled',
      assignedTechnician: assignedTech,
      dueDate,
      description: description || 'Regular scheduled inspection and maintenance procedure.',
      checklist: checklistTasks.map((t) => ({ item: t, completed: false })),
      spareParts: ['SKF Bearing Replacement Set', 'Viton Oil Seals', 'Industrial Grease ISO VG 68'],
      estimatedCost: parseFloat(cost) || 750,
    });
    setShowCreateModal(false);
    setTitle('');
    setDescription('');
  };

  // KPIs
  const activeOrders = workOrders.filter((w) => w.status !== 'completed').length;
  const completedOrders = workOrders.filter((w) => w.status === 'completed').length;
  const mtbfHours = 740;
  const mttrHours = 4.2;

  return (
    <div className="space-y-6">
      {/* 1. Header with Create Action */}
      <div
        className="rounded-xl p-5 border flex flex-col md:flex-row md:items-center justify-between gap-4"
        style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)' }}
      >
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-cyan-400 mb-1">
            <CalendarCheck size={16} />
            <span>Preventive Maintenance Operations</span>
          </div>
          <h2 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>
            {t.planner.title}
          </h2>
          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
            {t.planner.subtitle}
          </p>
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className="px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-xs flex items-center gap-2 transition-colors shadow-sm cursor-pointer"
        >
          <Plus size={15} />
          <span>{t.planner.createWorkOrder}</span>
        </button>
      </div>

      {/* 2. MTBF & MTTR Reliability Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div
          className="rounded-xl p-4 border"
          style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)' }}
        >
          <span className="text-xs text-slate-400 block">{t.planner.mtbf}</span>
          <div className="text-2xl font-bold font-mono tabular-nums text-emerald-400 mt-1">
            {mtbfHours} <span className="text-xs font-normal text-slate-400">hours</span>
          </div>
          <span className="text-[11px] text-slate-500">+14% reliability uplift</span>
        </div>

        <div
          className="rounded-xl p-4 border"
          style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)' }}
        >
          <span className="text-xs text-slate-400 block">{t.planner.mttr}</span>
          <div className="text-2xl font-bold font-mono tabular-nums text-cyan-400 mt-1">
            {mttrHours} <span className="text-xs font-normal text-slate-400">hours</span>
          </div>
          <span className="text-[11px] text-slate-500">-28% faster resolution</span>
        </div>

        <div
          className="rounded-xl p-4 border"
          style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)' }}
        >
          <span className="text-xs text-slate-400 block">{t.planner.openOrders}</span>
          <div className="text-2xl font-bold font-mono tabular-nums text-amber-400 mt-1">
            {activeOrders}
          </div>
          <span className="text-[11px] text-slate-500">Active Field Dispatches</span>
        </div>

        <div
          className="rounded-xl p-4 border"
          style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)' }}
        >
          <span className="text-xs text-slate-400 block">{t.planner.completedOrders}</span>
          <div className="text-2xl font-bold font-mono tabular-nums text-teal-400 mt-1">
            {completedOrders}
          </div>
          <span className="text-[11px] text-slate-500">Verified Past 30 Days</span>
        </div>
      </div>

      {/* 3. Work Orders List */}
      <div className="space-y-4">
        {workOrders.map((order) => {
          const isDone = order.status === 'completed';
          const completedCount = order.checklist.filter((c) => c.completed).length;

          return (
            <div
              key={order.id}
              className={`rounded-xl p-5 border transition-all ${
                isDone ? 'opacity-70 bg-black/10' : ''
              }`}
              style={{
                backgroundColor: 'var(--bg-surface)',
                borderColor:
                  order.priority === 'critical'
                    ? 'rgba(239, 68, 68, 0.4)'
                    : order.priority === 'high'
                    ? 'rgba(245, 158, 11, 0.4)'
                    : 'var(--border-subtle)',
              }}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b pb-3 mb-3" style={{ borderColor: 'var(--border-subtle)' }}>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono text-xs font-semibold text-cyan-400">{order.id}</span>
                    <span className="text-slate-500">·</span>
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider ${
                        order.priority === 'critical'
                          ? 'text-red-400'
                          : order.priority === 'high'
                          ? 'text-amber-400'
                          : 'text-slate-300'
                      }`}
                    >
                      {order.priority} Priority
                    </span>
                    <span className="text-slate-500">·</span>
                    <span className="text-xs text-slate-400">{order.machineName}</span>
                  </div>
                  <h3 className="text-sm font-bold text-white">{order.title}</h3>
                </div>

                {/* Status Switcher */}
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400">Status:</span>
                  <select
                    value={order.status}
                    onChange={(e) => updateWorkOrderStatus(order.id, e.target.value as WorkOrder['status'])}
                    className="px-2.5 py-1 rounded-lg border text-xs bg-transparent focus:outline-none focus:border-cyan-400"
                    style={{
                      backgroundColor: 'var(--bg-canvas)',
                      borderColor: 'var(--border-subtle)',
                      color: 'var(--text-primary)',
                    }}
                  >
                    <option value="scheduled" className="bg-slate-900 text-white">Scheduled</option>
                    <option value="in_progress" className="bg-slate-900 text-white">In Progress</option>
                    <option value="completed" className="bg-slate-900 text-white">Completed</option>
                    <option value="overdue" className="bg-slate-900 text-white">Overdue</option>
                  </select>
                </div>
              </div>

              <p className="text-xs text-slate-300 mb-4 leading-relaxed">
                {order.description}
              </p>

              {/* Checklist & Spare Parts Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs pt-1">
                {/* Checklist */}
                <div className="p-3 rounded-lg border bg-black/20" style={{ borderColor: 'var(--border-subtle)' }}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold text-slate-300">{t.planner.checklist}</span>
                    <span className="font-mono text-[11px] text-cyan-400">
                      {completedCount}/{order.checklist.length} Completed
                    </span>
                  </div>
                  <div className="space-y-1.5">
                    {order.checklist.map((item, idx) => (
                      <label key={idx} className="flex items-center gap-2 cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={item.completed}
                          onChange={() => toggleWorkOrderChecklist(order.id, idx)}
                          className="accent-cyan-400 rounded"
                        />
                        <span className={item.completed ? 'line-through text-slate-500' : 'text-slate-300'}>
                          {item.item}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Details & Spare Parts */}
                <div className="p-3 rounded-lg border bg-black/20 flex flex-col justify-between" style={{ borderColor: 'var(--border-subtle)' }}>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-slate-400">
                      <User size={13} className="text-cyan-400" />
                      <span>{t.planner.assignedTech}:</span>
                      <span className="font-semibold text-white">{order.assignedTechnician}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-400">
                      <Calendar size={13} className="text-amber-400" />
                      <span>{t.planner.dueDate}:</span>
                      <span className="font-mono text-white">{order.dueDate}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-400">
                      <Package size={13} className="text-teal-400" />
                      <span>{t.planner.spareParts}:</span>
                      <span className="text-slate-300">{order.spareParts.join(', ')}</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-3 border-t mt-3" style={{ borderColor: 'var(--border-subtle)' }}>
                    <span className="text-slate-400">{t.planner.estimatedCost}:</span>
                    <span className="font-mono font-bold text-emerald-400">${order.estimatedCost}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Create Work Order Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div
            className="w-full max-w-lg rounded-xl border shadow-2xl p-5 space-y-4 max-h-[85vh] overflow-y-auto"
            style={{ backgroundColor: 'var(--bg-surface-elevated)', borderColor: 'var(--border-strong)' }}
          >
            <div className="flex items-center justify-between border-b pb-3" style={{ borderColor: 'var(--border-subtle)' }}>
              <h3 className="font-bold text-sm text-white">{t.planner.newWorkOrderTitle}</h3>
              <button onClick={() => setShowCreateModal(false)} className="text-slate-400 hover:text-white">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-400 mb-1 font-medium">{t.planner.orderTitle}</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Ultrasonic Bearing Purge & Laser Alignment"
                  className="w-full px-3 py-2 rounded-lg border bg-transparent focus:outline-none focus:border-cyan-400"
                  style={{ borderColor: 'var(--border-subtle)', color: 'var(--text-primary)' }}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1 font-medium">{t.planner.machine}</label>
                  <select
                    value={machineId}
                    onChange={(e) => setMachineId(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border bg-transparent"
                    style={{ borderColor: 'var(--border-subtle)', color: 'var(--text-primary)', backgroundColor: 'var(--bg-canvas)' }}
                  >
                    {machines.map((m) => (
                      <option key={m.id} value={m.id} className="bg-slate-900 text-white">
                        {m.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-slate-400 mb-1 font-medium">{t.planner.priority}</label>
                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value as WorkOrderPriority)}
                    className="w-full px-3 py-2 rounded-lg border bg-transparent"
                    style={{ borderColor: 'var(--border-subtle)', color: 'var(--text-primary)', backgroundColor: 'var(--bg-canvas)' }}
                  >
                    <option value="critical" className="bg-slate-900 text-white">Critical</option>
                    <option value="high" className="bg-slate-900 text-white">High</option>
                    <option value="medium" className="bg-slate-900 text-white">Medium</option>
                    <option value="low" className="bg-slate-900 text-white">Low</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1 font-medium">{t.planner.assignedTech}</label>
                  <input
                    type="text"
                    value={assignedTech}
                    onChange={(e) => setAssignedTech(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border bg-transparent"
                    style={{ borderColor: 'var(--border-subtle)', color: 'var(--text-primary)' }}
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1 font-medium">{t.planner.dueDate}</label>
                  <input
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border bg-transparent"
                    style={{ borderColor: 'var(--border-subtle)', color: 'var(--text-primary)' }}
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 mb-1 font-medium">Estimated Cost ($)</label>
                <input
                  type="number"
                  value={cost}
                  onChange={(e) => setCost(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border bg-transparent"
                  style={{ borderColor: 'var(--border-subtle)', color: 'var(--text-primary)' }}
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1 font-medium">Description</label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Engineering instructions for technician team..."
                  className="w-full px-3 py-2 rounded-lg border bg-transparent focus:outline-none"
                  style={{ borderColor: 'var(--border-subtle)', color: 'var(--text-primary)' }}
                />
              </div>

              {/* Tasks list */}
              <div>
                <label className="block text-slate-400 mb-1 font-medium">Checklist Tasks</label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={newTaskInput}
                    onChange={(e) => setNewTaskInput(e.target.value)}
                    placeholder={t.planner.addChecklistItem}
                    className="flex-1 px-3 py-1.5 rounded-lg border bg-transparent"
                    style={{ borderColor: 'var(--border-subtle)', color: 'var(--text-primary)' }}
                  />
                  <button
                    type="button"
                    onClick={handleAddTask}
                    className="px-3 py-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-white font-medium"
                  >
                    Add
                  </button>
                </div>
                <ul className="space-y-1 text-slate-400 pl-4 list-disc">
                  {checklistTasks.map((task, i) => (
                    <li key={i}>{task}</li>
                  ))}
                </ul>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t" style={{ borderColor: 'var(--border-subtle)' }}>
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-3 py-2 rounded-lg border text-slate-300 hover:bg-slate-700/20"
                  style={{ borderColor: 'var(--border-subtle)' }}
                >
                  {t.common.cancel}
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-semibold shadow-sm"
                >
                  Dispatch Work Order
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
