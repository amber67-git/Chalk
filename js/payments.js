'use strict';
import { store } from './store.js';
import { $, fmtWon, statusBadge, statusDot, thisMonth, getMonthLabel, calcMonthlyPayment, generatePaymentMessage, copyToClipboard, STATUS_META } from './utils.js';

let selectedMonth = thisMonth();

export function renderPayments() {
  const pm = $('pm-month');
  if (pm && !pm.value) pm.value = selectedMonth;
  selectedMonth = pm?.value || thisMonth();
  $('pm-month-label').textContent = getMonthLabel(selectedMonth + '-01');

  const students = store.students.filter(s => s.status === 'active');
  let totalExpected = 0, totalPaid = 0, totalUnpaid = 0, cancelCount = 0;

  const rows = students.map(s => {
    const calc = calcMonthlyPayment(store.lessons, s.id, selectedMonth);
    totalExpected += calc.expected;
    totalPaid     += calc.paidTotal;
    totalUnpaid   += calc.diff;
    cancelCount   += calc.cancelled;

    return { s, calc };
  }).sort((a,b) => {
    const order = { unpaid:0, partial:1, paid:2, cancelled:3 };
    return (order[a.calc.overallStatus]??4) - (order[b.calc.overallStatus]??4);
  });

  // Stats
  $('pm-stat-expected').textContent = fmtWon(totalExpected);
  $('pm-stat-paid').textContent     = fmtWon(totalPaid);
  $('pm-stat-unpaid').textContent   = fmtWon(totalUnpaid);
  $('pm-stat-cancel').textContent   = cancelCount + ' lessons';

  // Progress bar
  const pct = totalExpected > 0 ? Math.round(totalPaid / totalExpected * 100) : 0;
  $('pm-bar').style.width = pct + '%';
  $('pm-bar-label').textContent = `${fmtWon(totalPaid)} collected of ${fmtWon(totalExpected)} (${pct}%)`;

  // Table
  $('pm-table-body').innerHTML = rows.map(({ s, calc }) => `
    <tr>
      <td>
        <div style="font-weight:500">${s.name}</div>
        <div style="font-size:11px;color:#a09a94">${s.koreanName} · ${s.regularSchedule}</div>
      </td>
      <td style="text-align:center;font-family:var(--mono)">${calc.lessonCount}</td>
      <td style="text-align:center;font-family:var(--mono);color:#9ca3af">${calc.cancelled > 0 ? calc.cancelled : '—'}</td>
      <td style="font-family:var(--mono)">${fmtWon(calc.expected)}</td>
      <td style="font-family:var(--mono)">${fmtWon(calc.paidTotal)}</td>
      <td style="font-family:var(--mono);color:${calc.diff > 0 ? 'var(--danger)' : 'var(--text-3)'}">
        ${calc.diff > 0 ? fmtWon(calc.diff) : '—'}
      </td>
      <td>${statusBadge(calc.overallStatus)}</td>
      <td>
        <div style="display:flex;gap:4px;align-items:center">
          <select onchange="window._pay.bulkStatus('${s.id}',this.value,'${selectedMonth}')" style="font-size:11px;padding:3px 6px;border:0.5px solid #e2ddd8;border-radius:6px;background:#f7f6f3;cursor:pointer">
            <option value="">Quick set all…</option>
            ${Object.entries(STATUS_META).map(([k,v]) => `<option value="${k}">${v.label}</option>`).join('')}
          </select>
          <button class="btn btn-sm" onclick="window._pay.copyMsg('${s.id}','${selectedMonth}','${calc.expected}','${calc.paidTotal}','${calc.lessonCount}')">
            Copy msg
          </button>
        </div>
      </td>
    </tr>`).join('');

  // Per-lesson breakdown
  renderLessonBreakdown(selectedMonth);
}

function renderLessonBreakdown(month) {
  const lessons = store.lessons.filter(l => l.date.startsWith(month)).sort((a,b) => a.date.localeCompare(b.date));
  if (!lessons.length) { $('pm-lesson-list').innerHTML = '<div class="empty">No lessons this month</div>'; return; }

  // Group by week
  const weeks = {};
  lessons.forEach(l => {
    const d = new Date(l.date);
    const mon = new Date(d); mon.setDate(d.getDate() - ((d.getDay()+6)%7));
    const label = `Week of ${mon.toLocaleDateString('en-GB',{month:'short',day:'numeric'})}`;
    if (!weeks[label]) weeks[label] = [];
    weeks[label].push(l);
  });

  $('pm-lesson-list').innerHTML = Object.entries(weeks).map(([week, wLessons]) => {
    const weekTotal = wLessons.filter(l=>l.status!=='cancelled').reduce((s,l)=>s+l.amountCharged,0);
    return `
      <div style="margin-bottom:16px">
        <div style="display:flex;justify-content:space-between;align-items:center;font-size:11px;font-weight:600;color:#a09a94;text-transform:uppercase;letter-spacing:.06em;margin-bottom:6px;padding-bottom:5px;border-bottom:0.5px solid #e2ddd8">
          <span>${week}</span><span style="font-family:var(--mono)">${fmtWon(weekTotal)}</span>
        </div>
        ${wLessons.map(l => {
          const s = store.getStudent(l.studentId);
          return `<div style="display:flex;align-items:center;gap:10px;padding:6px 8px;border-radius:6px;margin-bottom:3px;background:#fff;border:0.5px solid #f0ede8">
            <div style="width:3px;height:32px;border-radius:99px;background:${statusColorFn(l.status)};flex-shrink:0"></div>
            <span style="font-size:11px;color:#a09a94;font-family:var(--mono);width:80px;flex-shrink:0">${l.date}</span>
            <span style="font-weight:500;min-width:100px">${s?.name ?? '?'}</span>
            <span style="font-size:11px;color:#6b6560;min-width:60px">${s?.koreanName ?? ''}</span>
            <span style="font-size:11px;flex:1;color:#6b6560">${l.status === 'cancelled' ? '— Cancelled' + (l.cancelReason ? ': '+l.cancelReason : '') : l.topic || '—'}</span>
            <span style="font-family:var(--mono);font-size:12px;min-width:70px;text-align:right">${l.status === 'cancelled' ? '₩0' : fmtWon(l.amountCharged)}</span>
            <select onchange="window._pay.singleStatus('${l.id}',this.value)" style="font-size:11px;padding:2px 5px;border:0.5px solid #e2ddd8;border-radius:4px;background:#f7f6f3;cursor:pointer">
              ${Object.entries(STATUS_META).map(([k,v]) => `<option value="${k}" ${l.status===k?'selected':''}>${v.label}</option>`).join('')}
            </select>
          </div>`;
        }).join('')}
      </div>`;
  }).join('');
}

function statusColorFn(s) {
  return { paid:'#16a34a', partial:'#d97706', unpaid:'#dc2626', cancelled:'#9ca3af', prepaid:'#2563eb', postpay:'#7c3aed' }[s] ?? '#e2ddd8';
}

export function bulkStatus(studentId, status, month) {
  if (!status) return;
  store.lessons.filter(l => l.studentId === studentId && l.date.startsWith(month) && l.status !== 'cancelled')
    .forEach(l => { l.status = status; });
  store.persist('lessons');
  renderPayments();
  window.dispatchEvent(new CustomEvent('lessons:updated'));
}

export function singleStatus(lessonId, status) {
  const l = store.lessons.find(x => x.id === lessonId);
  if (!l) return;
  l.status = status;
  if (status === 'cancelled') l.amountCharged = 0;
  store.persist('lessons');
  renderPayments();
  window.dispatchEvent(new CustomEvent('lessons:updated'));
}

export function copyMsg(studentId, month, expected, paid, lessonCount) {
  const s = store.getStudent(studentId);
  if (!s) return;
  const msg = generatePaymentMessage(s, month, parseInt(expected), parseInt(paid), parseInt(lessonCount));
  copyToClipboard(msg);
}

export function setMonth(val) {
  selectedMonth = val;
  renderPayments();
}

window._pay = { bulkStatus, singleStatus, copyMsg, setMonth };
