'use strict';

export function $(id) { return document.getElementById(id); }
export function fmt(n) { return (n ?? 0).toLocaleString('ko-KR'); }
export function fmtWon(n) { return `₩${fmt(n)}`; }
export function today() { return new Date().toISOString().slice(0,10); }
export function thisMonth() { const n = new Date(); return `${n.getFullYear()}-${String(n.getMonth()+1).padStart(2,'0')}`; }
export function todayDisplay() { return new Date().toLocaleDateString('en-GB', {year:'numeric',month:'long',day:'numeric',weekday:'long'}); }
export function getWeekNumber(dateStr) {
  const d = new Date(dateStr);
  const start = new Date(d.getFullYear(), d.getMonth(), 1);
  return Math.ceil((d.getDate() + start.getDay()) / 7);
}
export function getMonthLabel(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-GB', {month:'long', year:'numeric'});
}

// ── Payment status colours ───────────────────────────────────────────
// paid=green, partial=amber, unpaid=red, cancelled=gray, prepaid=blue, postpay=purple
export const STATUS_META = {
  paid:      { label:'Paid',      cls:'status-paid',      dot:'#16a34a' },
  partial:   { label:'Partial',   cls:'status-partial',   dot:'#d97706' },
  unpaid:    { label:'Unpaid',    cls:'status-unpaid',    dot:'#dc2626' },
  cancelled: { label:'Cancelled', cls:'status-cancelled', dot:'#9ca3af' },
  prepaid:   { label:'Prepaid',   cls:'status-prepaid',   dot:'#2563eb' },
  postpay:   { label:'Post-pay',  cls:'status-postpay',   dot:'#7c3aed' },
};

export function statusBadge(status) {
  const m = STATUS_META[status] ?? { label: status, cls:'status-cancelled', dot:'#9ca3af' };
  return `<span class="badge ${m.cls}">${m.label}</span>`;
}

export function statusDot(status) {
  const m = STATUS_META[status] ?? { dot:'#9ca3af' };
  return `<span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:${m.dot};flex-shrink:0"></span>`;
}

export function hwBadge(status) {
  const map = { not_started:['hw-ns','Not started'], in_progress:['hw-ip','In progress'], done:['hw-done','Done'], skipped:['hw-skip','Skipped'] };
  const [cls, label] = map[status] ?? ['hw-ns', status];
  return `<span class="badge ${cls}">${label}</span>`;
}

export function isOverdue(dueDate) { return dueDate < today(); }

// ── Payment message generator ────────────────────────────────────────
export function generatePaymentMessage(student, month, expectedAmount, paidAmount, lessonCount) {
  const m = parseInt(month.split('-')[1]);
  const diff = expectedAmount - paidAmount;
  if (paidAmount >= expectedAmount) {
    return `Hi, this is to confirm ${student.name}'s (${student.koreanName}) tuition for ${m < 10 ? '0'+m : m} has been received.\nThank you!`;
  }
  if (paidAmount > 0) {
    return `Hi, just a reminder for ${student.name}'s (${student.koreanName}) tuition for ${m < 10 ? '0'+m : m}.\n\nTotal: ${fmtWon(expectedAmount)} (${lessonCount} lessons)\nReceived: ${fmtWon(paidAmount)}\nRemaining: ${fmtWon(diff)}\n\nPlease check when convenient. Thank you!`;
  }
  return `Hi, this is the tuition notice for ${student.name} (${student.koreanName}) — ${m < 10 ? '0'+m : m}.\n\nTotal lessons: ${lessonCount}\nAmount due: ${fmtWon(expectedAmount)}\n\nPlease check when convenient. Thank you!`;
}

// ── Calculate monthly summary per student ────────────────────────────
export function calcMonthlyPayment(lessons, studentId, month) {
  const studentLessons = lessons.filter(l => l.studentId === studentId && l.date.startsWith(month));
  const expected  = studentLessons.filter(l => l.status !== 'cancelled').reduce((s, l) => s + (l.amountCharged ?? 0), 0);
  const paid      = studentLessons.filter(l => ['paid','prepaid'].includes(l.status)).reduce((s, l) => s + (l.amountCharged ?? 0), 0);
  const partial   = studentLessons.filter(l => l.status === 'partial').reduce((s, l) => s + Math.floor((l.amountCharged ?? 0) / 2), 0);
  const cancelled = studentLessons.filter(l => l.status === 'cancelled').length;
  const paidTotal = paid + partial;
  const diff      = Math.max(0, expected - paidTotal);
  let overallStatus = 'unpaid';
  if (expected === 0)           overallStatus = 'cancelled';
  else if (paidTotal >= expected) overallStatus = 'paid';
  else if (paidTotal > 0)       overallStatus = 'partial';
  return { expected, paidTotal, diff, lessonCount: studentLessons.filter(l => l.status !== 'cancelled').length, cancelled, overallStatus };
}

export function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(() => alert('Copied!\n\n' + text)).catch(() => prompt('Copy this:', text));
}
