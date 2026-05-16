'use strict';
import { store } from './store.js';
import { $, fmtWon } from './utils.js';
import { HOURLY_RATE } from '../data/mockData.js';

let editingId = null;

export function renderStudents() {
  const el = $('page-students');
  if (!el) return;
  const rows = store.students.map(s => `
    <tr>
      <td style="font-weight:500">${s.name}</td>
      <td style="color:#6b6560">${s.koreanName}</td>
      <td style="font-size:11px;color:#6b6560">${s.parentName}<br><span style="color:#a09a94">${s.parentContact}</span></td>
      <td>${s.regularSchedule}</td>
      <td style="font-family:var(--mono);text-align:center">${s.durationHours}hr</td>
      <td style="font-family:var(--mono)">${fmtWon(s.defaultRate)}</td>
      <td><span class="badge ${s.paymentType === 'prepay' ? 'status-prepaid' : 'status-postpay'}">${s.paymentType === 'prepay' ? 'Prepay' : 'Post-pay'}</span></td>
      <td style="font-size:11px;color:#a09a94">${s.notes}</td>
      <td>
        <div style="display:flex;gap:4px">
          <button class="btn btn-sm" onclick="window._students.openEdit('${s.id}')">Edit</button>
          <button class="btn btn-sm" style="color:var(--danger);border-color:var(--danger)" onclick="window._students.del('${s.id}')">Del</button>
        </div>
      </td>
    </tr>`).join('');

  $('students-table-body').innerHTML = rows;
}

export function openAdd() {
  editingId = null;
  resetForm();
  $('student-modal').classList.add('show');
  $('student-modal-title').textContent = 'Add Student';
}

export function openEdit(id) {
  const s = store.getStudent(id);
  if (!s) return;
  editingId = id;
  const set = (elId, val) => { const e = $(elId); if (e) e.value = val ?? ''; };
  set('sf-name', s.name); set('sf-korean', s.koreanName); set('sf-parent', s.parentName);
  set('sf-contact', s.parentContact); set('sf-schedule', s.regularSchedule);
  set('sf-duration', s.durationHours); set('sf-rate', s.defaultRate);
  set('sf-paytype', s.paymentType); set('sf-notes', s.notes);
  set('sf-aliases', (s.paymentAliases ?? []).join(', '));
  $('student-modal').classList.add('show');
  $('student-modal-title').textContent = 'Edit Student';
}

export function save() {
  const g = id => $(id)?.value.trim() ?? '';
  const dur = parseFloat($('sf-duration')?.value) || 1;
  const rate = parseInt($('sf-rate')?.value) || Math.round(dur * HOURLY_RATE);
  const obj = {
    name: g('sf-name'), koreanName: g('sf-korean'), parentName: g('sf-parent'),
    parentContact: g('sf-contact'), regularSchedule: g('sf-schedule'),
    durationHours: dur, defaultRate: rate,
    paymentType: $('sf-paytype')?.value ?? 'postpay',
    notes: g('sf-notes'), status: 'active',
    paymentAliases: g('sf-aliases').split(',').map(a => a.trim()).filter(Boolean),
  };
  if (!obj.name) { alert('Name is required'); return; }
  if (editingId) {
    const idx = store.students.findIndex(s => s.id === editingId);
    if (idx >= 0) store.students[idx] = { ...store.students[idx], ...obj };
  } else {
    store.students.push({ id: store.nextId('s'), ...obj });
  }
  store.persist('students');
  close();
  renderStudents();
}

export function del(id) {
  if (!confirm('Delete this student?')) return;
  store.students = store.students.filter(s => s.id !== id);
  store.persist('students');
  renderStudents();
}

function close() { $('student-modal')?.classList.remove('show'); editingId = null; }
function resetForm() { ['sf-name','sf-korean','sf-parent','sf-contact','sf-schedule','sf-notes','sf-aliases'].forEach(id => { const e = $(id); if(e) e.value=''; }); if($('sf-duration')) $('sf-duration').value='1'; if($('sf-rate')) $('sf-rate').value='40000'; if($('sf-paytype')) $('sf-paytype').value='postpay'; }

export function calcRate() {
  const dur = parseFloat($('sf-duration')?.value) || 1;
  if ($('sf-rate')) $('sf-rate').value = Math.round(dur * HOURLY_RATE);
}

window._students = { openAdd, openEdit, save, del, close, calcRate };
