'use strict';

import { renderDashboard } from './dashboard.js';
import { todayDisplay }    from './utils.js';
import './payments.js';

const PAGES = ['dashboard', 'students', 'curriculum', 'lessons', 'homework', 'payments'];

export function showPage(page) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
  const pageEl = document.getElementById(`page-${page}`);
  if (pageEl) pageEl.classList.add('active');
  const idx = PAGES.indexOf(page);
  const tabs = document.querySelectorAll('.nav-tab');
  if (tabs[idx]) tabs[idx].classList.add('active');

  if (page === 'dashboard') renderDashboard();
}

window._app = { showPage };

document.addEventListener('DOMContentLoaded', () => {
  const dateEl = document.getElementById('nav-date');
  if (dateEl) dateEl.textContent = todayDisplay();
  showPage('dashboard');
});
