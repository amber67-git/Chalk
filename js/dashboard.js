'use strict';
import { store } from './store.js';
import { $, fmtWon, statusBadge, hwBadge, isOverdue, today, thisMonth, calcMonthlyPayment } from './utils.js';

export function renderDashboard() {
  const t = today(), m = thisMonth();
  const active     = store.students.filter(s => s.status === 'active');
  const todayL     = store.lessons.filter(l => l.date === t);
  const monthL     = store.lessons.filter(l => l.date.startsWith(m));
  const cancelledM = monthL.filter(l => l.status === 'cancelled').length;

  let totalExp = 0, totalPaid = 0;
  active.forEach(s => {
    const c = calcMonthlyPayment(store.lessons, s.id, m);
    totalExp  += c.expected;
    totalPaid += c.paidTotal;
  });
  const totalUnpaid = totalExp - totalPaid;

  // Stats
  $('stat-students').textContent       = active.length;
  $('stat-today').textContent          = todayL.length;
  $('stat-month-lessons').textContent  = monthL.filter(l=>l.status!=='cancelled').length;
  $('stat-expected').textContent       = fmtWon(totalExp);
  $('stat-unpaid').textContent         = fmtWon(totalUnpaid);

  // Today schedule
  const schedEl = $('today-schedule');
  if (!todayL.length) { schedEl.innerHTML = '<div class="empty">No lessons today</div>'; }
  else {
    schedEl.innerHTML = `<div class="table-wrap"><table>
      <thead><tr><th>Time</th><th>Student</th><th>Topic</th><th>Books / Workbook</th><th>Homework</th><th>Status</th><th>Note</th></tr></thead>
      <tbody>${todayL.map(l => {
        const s = store.getStudent(l.studentId);
        return `<tr>
          <td style="color:#a09a94;font-family:var(--mono);font-size:11px">${s?.regularSchedule??''}</td>
          <td><span style="font-weight:500">${s?.name??'?'}</span> <span style="color:#a09a94;font-size:11px">/ ${s?.koreanName??''}</span></td>
          <td>${l.topic||'—'}</td>
          <td style="font-size:11px;color:#6b6560">${[l.booksRead,l.workbook].filter(Boolean).join(' · ')||'—'}</td>
          <td style="font-size:11px;color:#6b6560;max-width:120px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${l.homework||'—'}</td>
          <td>${statusBadge(l.status)}</td>
          <td style="font-size:11px;color:#a09a94">${l.teacherNote||''}</td>
        </tr>`;
      }).join('')}</tbody></table></div>`;
  }

  // Payment progress
  const pct = totalExp > 0 ? Math.round(totalPaid/totalExp*100) : 0;
  $('pay-progress-bar').style.width = pct + '%';
  $('pay-progress-label').textContent = `${fmtWon(totalPaid)} / ${fmtWon(totalExp)} (${pct}%)`;

  // Unpaid list
  const unpaid = active.map(s => ({ s, c: calcMonthlyPayment(store.lessons, s.id, m) }))
    .filter(x => x.c.overallStatus !== 'paid' && x.c.expected > 0)
    .sort((a,b) => b.c.diff - a.c.diff);
  $('unpaid-list').innerHTML = unpaid.length
    ? unpaid.map(({s,c}) => `
        <div style="display:flex;justify-content:space-between;align-items:center;padding:5px 0;border-bottom:0.5px solid #f0ede8;font-size:12px">
          <span style="font-weight:500">${s.name} <span style="color:#a09a94;font-weight:400">/ ${s.koreanName}</span></span>
          <span style="display:flex;align-items:center;gap:6px">${fmtWon(c.diff)} ${statusBadge(c.overallStatus)}</span>
        </div>`).join('')
    : '<div style="font-size:12px;color:#a09a94;padding:8px 0">All paid this month ✓</div>';

  // Full payment overview table
  const allCalcs = active.map(s => ({s, c: calcMonthlyPayment(store.lessons, s.id, m)}))
    .sort((a,b) => { const o={unpaid:0,partial:1,paid:2,cancelled:3}; return (o[a.c.overallStatus]??4)-(o[b.c.overallStatus]??4); });
  $('payment-overview').innerHTML = `<div class="table-wrap"><table>
    <thead><tr><th>Student</th><th>Lessons</th><th>Cancelled</th><th>Expected</th><th>Paid</th><th>Remaining</th><th>Status</th><th>Action</th></tr></thead>
    <tbody>${allCalcs.map(({s,c}) => `<tr>
      <td><span style="font-weight:500">${s.name}</span> <span style="font-size:11px;color:#a09a94">/ ${s.koreanName}</span></td>
      <td style="text-align:center;font-family:var(--mono)">${c.lessonCount}</td>
      <td style="text-align:center;font-family:var(--mono);color:#9ca3af">${c.cancelled||'—'}</td>
      <td style="font-family:var(--mono)">${fmtWon(c.expected)}</td>
      <td style="font-family:var(--mono)">${fmtWon(c.paidTotal)}</td>
      <td style="font-family:var(--mono);color:${c.diff>0?'var(--danger)':'var(--text-3)'}">${c.diff>0?fmtWon(c.diff):'—'}</td>
      <td>${statusBadge(c.overallStatus)}</td>
      <td><button class="btn btn-sm" onclick="window._app.showPage('payments')">View</button></td>
    </tr>`).join('')}</tbody></table></div>`;

  // Overdue homework
  const overdueHw = store.homework.filter(h => h.status !== 'done' && h.status !== 'skipped' && isOverdue(h.dueDate));
  $('overdue-homework').innerHTML = overdueHw.length
    ? overdueHw.map(h => {
        const s = store.getStudent(h.studentId);
        return `<div style="display:flex;align-items:center;gap:8px;padding:6px 0;border-bottom:0.5px solid #f0ede8">
          <span style="font-size:12px;font-weight:500;min-width:90px">${s?.name??'?'} / ${s?.koreanName??''}</span>
          <span style="font-size:12px;flex:1;color:#6b6560">${h.content}</span>
          <span style="font-size:11px;color:var(--danger);font-family:var(--mono)">${h.dueDate}</span>
          ${hwBadge(h.status)}
        </div>`;
      }).join('')
    : '<div style="font-size:12px;color:#a09a94;text-align:center;padding:12px">No overdue homework ✓</div>';

  // Recent lessons
  const recent = [...store.lessons].sort((a,b)=>b.date.localeCompare(a.date)).slice(0,8);
  $('recent-lessons').innerHTML = `<div class="table-wrap"><table>
    <thead><tr><th>Date</th><th>Student</th><th>Topic</th><th>Duration</th><th>Amount</th><th>Status</th><th>Homework</th></tr></thead>
    <tbody>${recent.map(l => {
      const s = store.getStudent(l.studentId);
      return `<tr>
        <td style="font-family:var(--mono);font-size:11px;color:#a09a94">${l.date}</td>
        <td><span style="font-weight:500">${s?.name??'?'}</span> <span style="font-size:11px;color:#a09a94">/ ${s?.koreanName??''}</span></td>
        <td>${l.status==='cancelled'?'<span style="color:#9ca3af">Cancelled</span>':l.topic||'—'}</td>
        <td style="font-family:var(--mono);text-align:center">${l.durationHours}hr</td>
        <td style="font-family:var(--mono)">${l.status==='cancelled'?'<span style="color:#9ca3af">₩0</span>':fmtWon(l.amountCharged)}</td>
        <td>${statusBadge(l.status)}</td>
        <td style="font-size:11px;max-width:120px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;color:#6b6560">${l.homework||'—'}</td>
      </tr>`;
    }).join('')}</tbody></table></div>`;
}
