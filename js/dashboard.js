'use strict';

import { store }    from './store.js';
import { $, fmtWon, fmt, today, paymentBadge, hwBadge, isOverdue } from './utils.js';

export function renderDashboard() {
  const t = today();
  const thisMonth = t.slice(0, 7);

  const activeStudents  = store.students.filter(s => s.status === 'active');
  const todayLessons    = store.lessons.filter(l => l.date === t);
  const monthLessons    = store.lessons.filter(l => l.date.startsWith(thisMonth));
  const monthPayments   = store.payments.filter(p => p.month === thisMonth);
  const expectedTotal   = monthPayments.reduce((s, p) => s + p.expectedAmount, 0);
  const paidTotal       = monthPayments.reduce((s, p) => s + p.paidAmount, 0);
  const unpaidTotal     = expectedTotal - paidTotal;
  const overdueHw       = store.homework.filter(h => h.status !== 'done' && h.status !== 'skipped' && isOverdue(h.dueDate));

  // ── Stat cards ──────────────────────────────────────────────────────
  $('stat-students').textContent    = activeStudents.length;
  $('stat-today').textContent       = todayLessons.length;
  $('stat-month-lessons').textContent = monthLessons.length;
  $('stat-expected').textContent    = fmtWon(expectedTotal);
  $('stat-unpaid').textContent      = fmtWon(unpaidTotal);

  // ── Today's schedule ─────────────────────────────────────────────────
  const scheduleEl = $('today-schedule');
  if (!todayLessons.length) {
    scheduleEl.innerHTML = '<div class="empty">오늘 수업이 없습니다</div>';
  } else {
    scheduleEl.innerHTML = `
      <div class="table-wrap">
        <table>
          <thead><tr>
            <th>시간</th><th>학생</th><th>주제</th><th>교재</th><th>숙제</th><th>수납</th><th>메모</th>
          </tr></thead>
          <tbody>
            ${todayLessons.map(l => {
              const s = store.getStudent(l.studentId);
              return `<tr>
                <td style="color:var(--text-3);font-family:var(--mono);font-size:11px">${s?.regularSchedule ?? ''}</td>
                <td><span style="font-weight:500">${s?.name ?? '?'}</span> <span style="color:var(--text-3);font-size:11px">/ ${s?.koreanName ?? ''}</span></td>
                <td style="max-width:140px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${l.topic}</td>
                <td style="color:var(--text-2);font-size:11px">${l.booksRead || l.workbook || '—'}</td>
                <td style="max-width:120px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-size:11px;color:var(--text-2)">${l.homework || '—'}</td>
                <td>${paymentBadge(l.paymentStatus)}</td>
                <td style="font-size:11px;color:var(--text-3)">${l.teacherMemo || ''}</td>
              </tr>`;
            }).join('')}
          </tbody>
        </table>
      </div>`;
  }

  // ── Payment status table ─────────────────────────────────────────────
  const payEl = $('payment-overview');
  const sorted = [...monthPayments].sort((a, b) => {
    const order = { unpaid: 0, partial: 1, paid: 2 };
    return (order[a.status] ?? 3) - (order[b.status] ?? 3);
  });

  payEl.innerHTML = `
    <div class="table-wrap">
      <table>
        <thead><tr>
          <th>학생</th><th>수업 수</th><th>예상 수업료</th><th>입금액</th><th>차액</th><th>상태</th><th>액션</th>
        </tr></thead>
        <tbody>
          ${sorted.map(p => {
            const s = store.getStudent(p.studentId);
            return `<tr>
              <td><span style="font-weight:500">${s?.name ?? '?'}</span> <span style="color:var(--text-3);font-size:11px">/ ${s?.koreanName ?? ''}</span></td>
              <td style="font-family:var(--mono);text-align:center">${p.lessonCount}회</td>
              <td style="font-family:var(--mono)">${fmtWon(p.expectedAmount)}</td>
              <td style="font-family:var(--mono)">${fmtWon(p.paidAmount)}</td>
              <td style="font-family:var(--mono);color:${p.difference > 0 ? 'var(--danger)' : 'var(--text-3)'}">
                ${p.difference > 0 ? fmtWon(p.difference) : '—'}
              </td>
              <td>${paymentBadge(p.status)}</td>
              <td>
                <button class="btn btn-sm" onclick="window._pay.copyMessage('${p.studentId}','${p.month}')">
                  <i class="ti ti-copy" style="font-size:12px"></i> 문자
                </button>
              </td>
            </tr>`;
          }).join('')}
        </tbody>
      </table>
    </div>`;

  // ── Overdue homework ──────────────────────────────────────────────────
  const hwEl = $('overdue-homework');
  if (!overdueHw.length) {
    hwEl.innerHTML = '<div style="font-size:12px;color:var(--text-3);text-align:center;padding:12px">미제출 숙제 없음 ✓</div>';
  } else {
    hwEl.innerHTML = overdueHw.map(h => {
      const s = store.getStudent(h.studentId);
      return `<div style="display:flex;align-items:center;gap:10px;padding:7px 0;border-bottom:0.5px solid var(--surface-2)">
        <span style="font-size:12px;font-weight:500;min-width:80px">${s?.name ?? '?'} / ${s?.koreanName ?? ''}</span>
        <span style="font-size:12px;flex:1;color:var(--text-2)">${h.content}</span>
        <span style="font-size:11px;color:var(--danger);font-family:var(--mono)">${h.dueDate}</span>
        ${hwBadge(h.status)}
      </div>`;
    }).join('');
  }

  // ── Recent lessons ────────────────────────────────────────────────────
  const recentEl = $('recent-lessons');
  const recent = [...store.lessons].sort((a,b) => b.date.localeCompare(a.date)).slice(0, 6);
  recentEl.innerHTML = `
    <div class="table-wrap">
      <table>
        <thead><tr>
          <th>날짜</th><th>학생</th><th>주제</th><th>강점</th><th>어려움</th><th>숙제</th><th>수납</th>
        </tr></thead>
        <tbody>
          ${recent.map(l => {
            const s = store.getStudent(l.studentId);
            return `<tr>
              <td style="font-family:var(--mono);font-size:11px;color:var(--text-3)">${l.date}</td>
              <td><span style="font-weight:500">${s?.name ?? '?'}</span><span style="color:var(--text-3);font-size:11px"> / ${s?.koreanName ?? ''}</span></td>
              <td style="max-width:120px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${l.topic}</td>
              <td style="font-size:11px;color:var(--accent);max-width:100px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${l.strengths || '—'}</td>
              <td style="font-size:11px;color:var(--danger);max-width:100px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${l.difficulties || '—'}</td>
              <td style="font-size:11px;max-width:120px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;color:var(--text-2)">${l.homework || '—'}</td>
              <td>${paymentBadge(l.paymentStatus)}</td>
            </tr>`;
          }).join('')}
        </tbody>
      </table>
    </div>`;

  // ── Monthly summary mini ──────────────────────────────────────────────
  const pct = expectedTotal > 0 ? Math.round(paidTotal / expectedTotal * 100) : 0;
  $('pay-progress-bar').style.width = `${pct}%`;
  $('pay-progress-label').textContent = `${fmtWon(paidTotal)} / ${fmtWon(expectedTotal)} (${pct}%)`;

  // Unpaid list
  const unpaidList = monthPayments.filter(p => p.status !== 'paid');
  $('unpaid-list').innerHTML = unpaidList.length
    ? unpaidList.map(p => {
        const s = store.getStudent(p.studentId);
        return `<div style="display:flex;justify-content:space-between;align-items:center;padding:5px 0;border-bottom:0.5px solid var(--surface-2);font-size:12px">
          <span style="font-weight:500">${s?.name} <span style="color:var(--text-3);font-weight:400">/ ${s?.koreanName}</span></span>
          <span style="display:flex;align-items:center;gap:6px">${fmtWon(p.difference)} ${paymentBadge(p.status)}</span>
        </div>`;
      }).join('')
    : '<div style="font-size:12px;color:var(--text-3);padding:8px 0">이번 달 미납 없음 ✓</div>';
}
