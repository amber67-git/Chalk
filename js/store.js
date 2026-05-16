'use strict';

import { MOCK_STUDENTS, MOCK_CURRICULUM, MOCK_LESSONS, MOCK_HOMEWORK, MOCK_PAYMENTS, MOCK_TRANSACTIONS } from '../data/mockData.js';

function lsGet(key, fallback) {
  try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; } catch { return fallback; }
}
function lsSet(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch {}
}

export const store = {
  students:     lsGet('chalk_students',     MOCK_STUDENTS),
  curriculum:   lsGet('chalk_curriculum',   MOCK_CURRICULUM),
  lessons:      lsGet('chalk_lessons',      MOCK_LESSONS),
  homework:     lsGet('chalk_homework',     MOCK_HOMEWORK),
  payments:     lsGet('chalk_payments',     MOCK_PAYMENTS),
  transactions: lsGet('chalk_transactions', MOCK_TRANSACTIONS),

  persist(...keys) {
    const map = {
      students: 'chalk_students', curriculum: 'chalk_curriculum',
      lessons: 'chalk_lessons',   homework:   'chalk_homework',
      payments: 'chalk_payments', transactions: 'chalk_transactions',
    };
    keys.forEach(k => { if (map[k]) lsSet(map[k], this[k]); });
  },

  getStudent(id)  { return this.students.find(s => s.id === id); },
  getStudentName(id) {
    const s = this.getStudent(id);
    return s ? `${s.name} / ${s.koreanName}` : '—';
  },
};
