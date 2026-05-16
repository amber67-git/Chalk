'use strict';

import { MOCK_STUDENTS, MOCK_LESSONS, MOCK_HOMEWORK, MOCK_CURRICULUM, MOCK_TRANSACTIONS } from '../data/mockData.js';

function lsGet(k, fb) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : fb; } catch { return fb; } }
function lsSet(k, v)  { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} }

export const store = {
  students:     lsGet('chalk_students',     MOCK_STUDENTS),
  lessons:      lsGet('chalk_lessons',      MOCK_LESSONS),
  homework:     lsGet('chalk_homework',     MOCK_HOMEWORK),
  curriculum:   lsGet('chalk_curriculum',   MOCK_CURRICULUM),
  transactions: lsGet('chalk_transactions', MOCK_TRANSACTIONS),

  persist(...keys) {
    const map = { students:'chalk_students', lessons:'chalk_lessons', homework:'chalk_homework', curriculum:'chalk_curriculum', transactions:'chalk_transactions' };
    keys.forEach(k => { if (map[k]) lsSet(map[k], this[k]); });
  },

  getStudent(id)     { return this.students.find(s => s.id === id); },
  getName(id)        { const s = this.getStudent(id); return s ? `${s.name} / ${s.koreanName}` : '—'; },
  getShortName(id)   { const s = this.getStudent(id); return s ? s.name : '—'; },
  nextId(prefix)     { return prefix + Date.now(); },
};
