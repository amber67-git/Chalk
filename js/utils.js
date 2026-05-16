'use strict';

export function $(id) { return document.getElementById(id); }
export function fmt(n) { return n?.toLocaleString('ko-KR') ?? '0'; }
export function fmtWon(n) { return `₩${fmt(n)}`; }
export function today() { return new Date().toISOString().slice(0,10); }
export function todayDisplay() {
  return new Date().toLocaleDateString('ko-KR', { year:'numeric', month:'long', day:'numeric', weekday:'long' });
}

export function paymentBadge(status) {
  const map = {
    paid:    ['badge-green', '완납'],
    unpaid:  ['badge-red',   '미납'],
    partial: ['badge-amber', '부분'],
    overpaid:['badge-blue',  '초과'],
  };
  const [cls, label] = map[status] ?? ['badge-gray', status];
  return `<span class="badge ${cls}">${label}</span>`;
}

export function hwBadge(status) {
  const map = {
    not_started: ['badge-gray',  '미시작'],
    in_progress: ['badge-blue',  '진행중'],
    done:        ['badge-green', '완료'],
    skipped:     ['badge-red',   '미제출'],
  };
  const [cls, label] = map[status] ?? ['badge-gray', status];
  return `<span class="badge ${cls}">${label}</span>`;
}

export function isOverdue(dueDate) {
  return dueDate < today();
}

/**
 * Generate Korean parent note from lesson data.
 */
export function generateParentNote(lesson, studentName) {
  const parts = [];
  parts.push(`안녕하세요, 오늘 수업 노트 전달드립니다.\n`);

  let intro = `오늘은 [${lesson.topic}] 주제로 수업을 진행했습니다.`;
  if (lesson.booksRead) intro += ` [${lesson.booksRead}]를 함께 읽고,`;
  if (lesson.writingActivity) intro += ` [${lesson.writingActivity}] 활동을 통해 내용을 정리했습니다.`;
  parts.push(intro);

  if (lesson.strengths) {
    let good = `\n${studentName}는 오늘 [${lesson.strengths}] 부분에서 좋은 모습을 보여주었습니다.`;
    const extras = [lesson.grammar, lesson.speakingActivity, lesson.writingActivity].filter(Boolean);
    if (extras.length) good += ` 특히 [${extras[0]}] 활동에서 집중해서 참여했습니다.`;
    parts.push(good);
  }

  if (lesson.difficulties) {
    parts.push(`\n다만 [${lesson.difficulties}] 부분은 아직 조금 어려워하는 모습이 있어, 수업 중 예시를 보여주며 천천히 연습했습니다.`);
  }

  if (lesson.activities) {
    parts.push(`\n활동 시간에는 [${lesson.activities}]를 하며 즐겁게 마무리했습니다.`);
  }

  parts.push(`\n숙제는 ${lesson.homework || '오늘 별도 숙제는 없습니다.'}`);
  parts.push(`\n감사합니다.`);

  return parts.join('');
}

/**
 * Calculate monthly tuition for a student.
 */
export function calculateMonthlyTuition(lessons, studentId, month) {
  return lessons
    .filter(l => l.studentId === studentId && l.date.startsWith(month))
    .reduce((sum, l) => sum + (l.tuitionAmount ?? 0), 0);
}

/**
 * Match bank transactions to students using name + amount rules.
 */
export function matchBankTransactions(transactions, students, payments) {
  return transactions.map(tx => {
    const desc = tx.description?.toLowerCase() ?? '';

    // Name match
    let matchedStudent = students.find(s =>
      [s.name, s.koreanName, s.parentName, ...(s.paymentAliases ?? [])]
        .some(alias => alias && desc.includes(alias.toLowerCase()))
    );

    if (!matchedStudent) return { ...tx, matchedStudentId: null, matchStatus: 'unmatched' };

    // Amount match
    const payment = payments.find(p => p.studentId === matchedStudent.id);
    const amountMatch = payment && tx.deposit === payment.expectedAmount;
    const matchStatus = amountMatch ? 'matched' : 'possible';

    return { ...tx, matchedStudentId: matchedStudent.id, matchStatus };
  });
}

/**
 * Generate Korean payment request message.
 */
export function generatePaymentMessage(student, payment, month) {
  const m = parseInt(month.split('-')[1]);
  if (payment.status === 'paid') {
    return `안녕하세요, ${student.name} ${m}월 수업료 입금 확인되었습니다.\n\n감사합니다.`;
  }
  if (payment.status === 'partial') {
    return `안녕하세요, ${student.name} ${m}월 수업료 확인 안내드립니다.\n\n이번 달 수업료는 총 ${fmtWon(payment.expectedAmount)}이며, 현재 ${fmtWon(payment.paidAmount)} 입금 확인되었습니다.\n차액 ${fmtWon(payment.difference)}원 확인 부탁드립니다.\n\n감사합니다.`;
  }
  return `안녕하세요, ${student.name} ${m}월 수업료 안내드립니다.\n\n이번 달 총 수업은 ${payment.lessonCount}회로, 수업료는 ${fmtWon(payment.expectedAmount)}입니다.\n\n편하실 때 확인 부탁드립니다.\n감사합니다.`;
}
