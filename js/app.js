'use strict';
import { renderDashboard } from './dashboard.js';
import { renderStudents, openAdd as studentAdd } from './students.js';
import { renderSessions, setFilter as sessionFilter, openAdd as sessionAdd } from './sessions.js';
import { renderPayments, setMonth as paySetMonth } from './payments.js';
import { todayDisplay, thisMonth } from './utils.js';
import { store } from './store.js';

const PAGES = ['dashboard','students','sessions','payments','curriculum'];
let currentPage = 'dashboard';

export function showPage(page) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
  const el = document.getElementById('page-'+page);
  if (el) el.classList.add('active');
  const idx = PAGES.indexOf(page);
  const tabs = document.querySelectorAll('.nav-tab');
  if (tabs[idx]) tabs[idx].classList.add('active');
  currentPage = page;
  if (page === 'dashboard') renderDashboard();
  if (page === 'students')  renderStudents();
  if (page === 'sessions')  renderSessions();
  if (page === 'payments')  renderPayments();
}

window._app = { showPage };

// Re-render dashboard on data changes
['lessons:updated','students:updated'].forEach(ev => {
  window.addEventListener(ev, () => { if (currentPage === 'dashboard') renderDashboard(); });
});

// Populate student selects
function populateSelects() {
  const opts = store.students.filter(s=>s.status==='active').map(s=>`<option value="${s.id}">${s.name} / ${s.koreanName}</option>`).join('');
  ['lf-student','session-filter-student'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.innerHTML = '<option value="">All students</option>' + opts;
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const dateEl = document.getElementById('nav-date');
  if (dateEl) dateEl.textContent = todayDisplay();

  // Month filter default
  const mEl = document.getElementById('pm-month');
  if (mEl) mEl.value = thisMonth();

  populateSelects();
  showPage('dashboard');

  // Close modals on backdrop
  document.querySelectorAll('.modal-overlay').forEach(m => {
    m.addEventListener('click', e => { if (e.target === m) m.classList.remove('show'); });
  });
});
