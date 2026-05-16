'use strict';

import { store } from './store.js';
import { generatePaymentMessage } from './utils.js';

export function copyMessage(studentId, month) {
  const student = store.getStudent(studentId);
  const payment = store.payments.find(p => p.studentId === studentId && p.month === month);
  if (!student || !payment) return;
  const msg = generatePaymentMessage(student, payment, month);
  navigator.clipboard.writeText(msg).then(() => {
    alert('수업료 안내 문자가 복사되었습니다.\n\n' + msg);
  }).catch(() => {
    prompt('아래 문자를 복사하세요:', msg);
  });
}

window._pay = { copyMessage };
