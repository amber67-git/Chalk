'use strict';
import { store } from './store.js';
import { $, fmtWon, hwBadge, statusBadge, statusDot, today, STATUS_META, generateParentNote } from './utils.js';

let filter = { studentId: '', month: '' };
let editingLessonId = null;
let editingHwId = null;

export function renderSessions() {
  const lessons = getFiltered();
  const grouped = groupByWeek(lessons);
  const container = $('sessions-list');
  if (!container) return;

  if (!lessons.length) { container.innerHTML = '<div class="empty">No lessons found</div>'; return; }

  container.innerHTML = Object.entries(grouped).map(([weekLabel, wLessons]) => `
    <div style="margin-bottom:20px">
      <div style="font-size:11px;font-weight:600;color:#a09a94;text-transform:uppercase;letter-spacing:.06em;margin-bottom:8px;padding-bottom:6px;border-bottom:0.5px solid #e2ddd8">${weekLabel}</div>
      ${wLessons.map(l => lessonCard(l)).join('')}
    </div>`).join('');
}

function lessonCard(l) {
  const s = store.getStudent(l.studentId);
  const hw = store.homework.filter(h => h.lessonId === l.id);
  return `
    <div style="background:#fff;border:0.5px solid #e2ddd8;border-radius:10px;padding:14px 16px;margin-bottom:8px;border-left:3px solid ${statusColor(l.status)}">
      <div style="display:flex;align-items:center;gap:10px;margin-bottom:10px">
        <span style="font-size:11px;color:#a09a94;font-family:var(--mono);min-width:80px">${l.date}</span>
        <span style="font-weight:500">${s?.name ?? '?'}</span>
        <span style="font-size:12px;color:#a09a94">/ ${s?.koreanName ?? ''}</span>
        <span style="font-size:11px;color:#6b6560">${l.durationHours}hr · ${fmtWon(l.amountCharged)}</span>
        <div style="margin-left:auto;display:flex;gap:6px;align-items:center">
          ${statusBadge(l.status)}
          <select class="status-quick" onchange="window._sessions.changeStatus('${l.id}',this.value)" style="font-size:11px;padding:3px 6px;border:0.5px solid #e2ddd8;border-radius:6px;background:#f7f6f3;color:#1a1816;cursor:pointer">
            ${Object.entries(STATUS_META).map(([k,v]) => `<option value="${k}" ${l.status===k?'selected':''}>${v.label}</option>`).join('')}
          </select>
          <button class="btn btn-sm" onclick="window._sessions.openEdit('${l.id}')">Edit</button>
          <button class="btn btn-sm" style="color:var(--danger);border-color:var(--danger)" onclick="window._sessions.del('${l.id}')">Del</button>
        </div>
      </div>
      ${l.status === 'cancelled' ? `<div style="font-size:12px;color:#9ca3af;font-style:italic">Cancelled${l.cancelReason ? ': ' + l.cancelReason : ''}</div>` : `
      <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:8px;font-size:12px;margin-bottom:8px">
        <div><span style="color:#a09a94">Topic</span><div style="margin-top:2px">${l.topic || '—'}</div></div>
        <div><span style="color:#a09a94">Books</span><div style="margin-top:2px;color:#6b6560">${l.booksRead || '—'}</div></div>
        <div><span style="color:#a09a94">Workbook</span><div style="margin-top:2px;color:#6b6560">${l.workbook || '—'}</div></div>
        <div><span style="color:#a09a94">Grammar</span><div style="margin-top:2px;color:#6b6560">${l.grammar || '—'}</div></div>
      </div>
      ${l.teacherNote ? `<div style="font-size:11px;color:#6b6560;background:#f7f6f3;border-radius:6px;padding:6px 10px;margin-bottom:6px">📝 ${l.teacherNote}</div>` : ''}
      <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap">
        <span style="font-size:11px;color:#a09a94">Homework:</span>
        ${hw.length ? hw.map(h => `<span style="font-size:11px">${hwBadge(h.status)} ${h.content}</span>`).join('') : `<span style="font-size:11px;color:#a09a94">${l.homework || 'None'}</span>`}
        <button class="btn btn-sm" style="margin-left:auto" onclick="window._sessions.genParentNote('${l.id}')">📋 Parent note</button>
      </div>`}
    </div>`;
}

function statusColor(status) {
  const map = { paid:'#16a34a', partial:'#d97706', unpaid:'#dc2626', cancelled:'#9ca3af', prepaid:'#2563eb', postpay:'#7c3aed' };
  return map[status] ?? '#e2ddd8';
}

function getFiltered() {
  return store.lessons.filter(l => {
    if (filter.studentId && l.studentId !== filter.studentId) return false;
    if (filter.month && !l.date.startsWith(filter.month)) return false;
    return true;
  }).sort((a,b) => b.date.localeCompare(a.date));
}

function groupByWeek(lessons) {
  const groups = {};
  lessons.forEach(l => {
    const d = new Date(l.date);
    const mon = new Date(d); mon.setDate(d.getDate() - ((d.getDay()+6)%7));
    const sun = new Date(mon); sun.setDate(mon.getDate()+6);
    const label = `Week of ${mon.toLocaleDateString('en-GB',{month:'short',day:'numeric'})} – ${sun.toLocaleDateString('en-GB',{month:'short',day:'numeric'})}`;
    if (!groups[label]) groups[label] = [];
    groups[label].push(l);
  });
  return groups;
}

export function setFilter(key, val) { filter[key] = val; renderSessions(); }

export function changeStatus(lessonId, status) {
  const l = store.lessons.find(x => x.id === lessonId);
  if (!l) return;
  l.status = status;
  if (status === 'cancelled') l.amountCharged = 0;
  store.persist('lessons');
  renderSessions();
  window.dispatchEvent(new CustomEvent('lessons:updated'));
}

export function del(id) {
  if (!confirm('Delete this lesson?')) return;
  store.lessons = store.lessons.filter(l => l.id !== id);
  store.persist('lessons');
  renderSessions();
  window.dispatchEvent(new CustomEvent('lessons:updated'));
}

export function openAdd() {
  editingLessonId = null;
  resetLessonForm();
  $('lesson-modal')?.classList.add('show');
  $('lesson-modal-title').textContent = 'Add Lesson';
}

export function openEdit(id) {
  const l = store.lessons.find(x => x.id === id);
  if (!l) return;
  editingLessonId = id;
  const set = (elId, val) => { const e = $(elId); if(e) e.value = val ?? ''; };
  set('lf-date', l.date); set('lf-student', l.studentId); set('lf-duration', l.durationHours);
  set('lf-amount', l.amountCharged); set('lf-status', l.status); set('lf-topic', l.topic);
  set('lf-books', l.booksRead); set('lf-workbook', l.workbook); set('lf-grammar', l.grammar);
  set('lf-homework', l.homework); set('lf-teacher-note', l.teacherNote); set('lf-cancel', l.cancelReason);
  $('lesson-modal')?.classList.add('show');
  $('lesson-modal-title').textContent = 'Edit Lesson';
  autoFillRate();
}

export function autoFillRate() {
  const sId = $('lf-student')?.value;
  const s = store.getStudent(sId);
  if (s && $('lf-duration') && $('lf-amount')) {
    $('lf-duration').value = s.durationHours;
    $('lf-amount').value = s.defaultRate;
  }
}

export function saveLesson() {
  const g = id => $(id)?.value.trim() ?? '';
  const sId = g('lf-student');
  if (!sId) { alert('Select a student'); return; }
  const obj = {
    studentId: sId, date: g('lf-date') || today(),
    durationHours: parseFloat($('lf-duration')?.value) || 1,
    amountCharged: parseInt($('lf-amount')?.value) || 0,
    status: g('lf-status') || 'unpaid',
    topic: g('lf-topic'), booksRead: g('lf-books'), workbook: g('lf-workbook'),
    grammar: g('lf-grammar'), homework: g('lf-homework'),
    teacherNote: g('lf-teacher-note'), parentNote: '', cancelReason: g('lf-cancel'),
  };
  if (editingLessonId) {
    const idx = store.lessons.findIndex(l => l.id === editingLessonId);
    if (idx >= 0) store.lessons[idx] = { ...store.lessons[idx], ...obj };
  } else {
    store.lessons.push({ id: store.nextId('l'), ...obj });
  }
  store.persist('lessons');
  closeLesson();
  renderSessions();
  window.dispatchEvent(new CustomEvent('lessons:updated'));
}

function closeLesson() { $('lesson-modal')?.classList.remove('show'); editingLessonId = null; }
function resetLessonForm() { ['lf-date','lf-student','lf-topic','lf-books','lf-workbook','lf-grammar','lf-homework','lf-teacher-note','lf-cancel'].forEach(id => { const e=$(id); if(e) e.value=''; }); if($('lf-status')) $('lf-status').value='unpaid'; }

export function genParentNote(lessonId) {
  const l = store.lessons.find(x => x.id === lessonId);
  if (!l) return;
  const s = store.getStudent(l.studentId);
  const parts = [`Hello, here is today's lesson note for ${s?.name} (${s?.koreanName}).\n`];
  if (l.topic) parts.push(`Today we worked on "${l.topic}".`);
  if (l.booksRead) parts.push(`We read: ${l.booksRead}.`);
  if (l.workbook) parts.push(`Workbook activity: ${l.workbook}.`);
  if (l.grammar) parts.push(`Grammar focus: ${l.grammar}.`);
  if (l.teacherNote) parts.push(`Teacher's note: ${l.teacherNote}.`);
  parts.push(`\nHomework: ${l.homework || 'No homework today.'}`);
  parts.push(`\nThank you!`);
  const note = parts.join('\n');
  navigator.clipboard.writeText(note).then(() => alert('Parent note copied!\n\n' + note)).catch(() => prompt('Copy this:', note));
}

window._sessions = { openAdd, openEdit, saveLesson, del, changeStatus, setFilter, autoFillRate, genParentNote, closeLesson };
