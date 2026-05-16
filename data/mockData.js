'use strict';

export const MOCK_STUDENTS = [
  { id: 's1',  name: 'Bella',     koreanName: '태은',  parentName: '태은맘',  parentContact: '010-1234-5678', defaultRate: 100000, defaultDuration: 60,  regularSchedule: '월 4시',  status: 'active',  notes: '1hr lesson', paymentAliases: ['태은', 'bella'] },
  { id: 's2',  name: 'Yougun',    koreanName: '유건',  parentName: '유건맘',  parentContact: '010-2345-6789', defaultRate: 60000,  defaultDuration: 60,  regularSchedule: '화 4시',  status: 'active',  notes: '',           paymentAliases: ['유건', 'yougun'] },
  { id: 's3',  name: 'Young Seo', koreanName: '명서',  parentName: '명서맘',  parentContact: '010-3456-7890', defaultRate: 60000,  defaultDuration: 60,  regularSchedule: '수 4시',  status: 'active',  notes: '패약 많음',  paymentAliases: ['명서', 'youngseo'] },
  { id: 's4',  name: 'Ayun',      koreanName: '아윤',  parentName: '아윤맘',  parentContact: '010-4567-8901', defaultRate: 60000,  defaultDuration: 60,  regularSchedule: '화 5시',  status: 'active',  notes: '',           paymentAliases: ['아윤', 'ayun'] },
  { id: 's5',  name: 'Noah',      koreanName: '정민',  parentName: '정민맘',  parentContact: '010-5678-9012', defaultRate: 60000,  defaultDuration: 60,  regularSchedule: '목 4시',  status: 'active',  notes: '',           paymentAliases: ['정민', 'noah'] },
  { id: 's6',  name: 'Jay',       koreanName: '민재',  parentName: '민재맘',  parentContact: '010-6789-0123', defaultRate: 60000,  defaultDuration: 60,  regularSchedule: '화 3시',  status: 'active',  notes: '*선입',      paymentAliases: ['민재', 'jay'] },
  { id: 's7',  name: 'Yena',      koreanName: '에나',  parentName: '에나맘',  parentContact: '010-7890-1234', defaultRate: 60000,  defaultDuration: 90,  regularSchedule: '수 5시',  status: 'active',  notes: '*선입',      paymentAliases: ['에나', 'yena'] },
  { id: 's8',  name: 'Grace',     koreanName: '예은',  parentName: '예은맘',  parentContact: '010-8901-2345', defaultRate: 60000,  defaultDuration: 60,  regularSchedule: '수 7시',  status: 'active',  notes: '',           paymentAliases: ['예은', 'grace'] },
  { id: 's9',  name: 'Min Chae',  koreanName: '민채',  parentName: '민채맘',  parentContact: '010-9012-3456', defaultRate: 60000,  defaultDuration: 60,  regularSchedule: '토 4시',  status: 'active',  notes: '*발링 동산', paymentAliases: ['민채', 'minchae'] },
  { id: 's10', name: 'Chan hee',  koreanName: '찬희',  parentName: '찬희맘',  parentContact: '010-0123-4567', defaultRate: 120000, defaultDuration: 120, regularSchedule: '금 2시',  status: 'active',  notes: '*패약',      paymentAliases: ['찬희', 'chanhee'] },
  { id: 's11', name: 'Ryan',      koreanName: '승헌',  parentName: '승헌맘',  parentContact: '010-1234-0987', defaultRate: 140000, defaultDuration: 90,  regularSchedule: '화 7시',  status: 'active',  notes: '*발링 동산', paymentAliases: ['승헌', 'ryan'] },
  { id: 's12', name: 'Liz',       koreanName: '채원',  parentName: '채원맘',  parentContact: '010-2345-1098', defaultRate: 100000, defaultDuration: 60,  regularSchedule: '수 7시',  status: 'active',  notes: 'Teo / 승원', paymentAliases: ['채원', 'liz', '승원'] },
  { id: 's13', name: 'Chloe',     koreanName: '이수',  parentName: '이수맘',  parentContact: '010-3456-2109', defaultRate: 60000,  defaultDuration: 60,  regularSchedule: '토 7시',  status: 'active',  notes: '*발링 동산', paymentAliases: ['이수', 'chloe'] },
  { id: 's14', name: 'Kim min che', koreanName: '김민체', parentName: '김민체맘', parentContact: '010-4567-3210', defaultRate: 60000, defaultDuration: 60, regularSchedule: '월/목 2시', status: 'active', notes: '8세 영유 2년+초등', paymentAliases: ['김민체', 'kimminche'] },
];

export const MOCK_CURRICULUM = [
  { id: 'c1', month: 'APR', week: 1, category: '역사', topic: '교통의 변화', workbook: '', writingInstruction: '', readingBooks: 'Oxford Read and Discover: Level 5 Transportation Then and Now', activities: '', ort: '', grammar: '', note: '' },
  { id: 'c2', month: 'APR', week: 1, category: '디지털', topic: '오스모 코딩', workbook: 'Osmo', writingInstruction: '', readingBooks: '', activities: 'Coding Awbie', ort: '', grammar: '', note: '' },
  { id: 'c3', month: 'APR', week: 2, category: '역할극', topic: 'Being a Kid', workbook: 'Write Right 1', writingInstruction: 'Paragraph to Essay: Being a Kid / Draw Then Write 1-3: Child', readingBooks: "Role-play: Act out different situations of being a kid", activities: '', ort: '', grammar: '', note: '' },
  { id: 'c4', month: 'MAY', week: 1, category: '생각 나누기', topic: '아낌없이 주는 나무', workbook: '', writingInstruction: '', readingBooks: 'THE GIVING TREE', activities: 'THE GIVING TREE discussion', ort: '', grammar: '', note: "Write your opinion about the story" },
  { id: 'c5', month: 'MAY', week: 2, category: '동화', topic: 'Hercules', workbook: '', writingInstruction: '', readingBooks: 'Usborne Young Reading 2-03: The Amazing Adventures of Hercules', activities: '', ort: '', grammar: '', note: '' },
  { id: 'c6', month: 'MAY', week: 3, category: '과학', topic: 'How Dinosaurs Fossils Are Made?', workbook: '', writingInstruction: 'Explain how fossils are formed', readingBooks: '', activities: '', ort: '', grammar: '', note: '' },
  { id: 'c7', month: 'MAY', week: 4, category: '', topic: "Sophie's Masterpiece", workbook: '', writingInstruction: '', readingBooks: "Sophie's Masterpiece: A Spider's Tale", activities: '', ort: '', grammar: "Scholastic Success with Grammar Grade 1&4", note: '' },
  { id: 'c8', month: 'JUN', week: 1, category: '', topic: 'My Plan for Summer Vacation', workbook: 'Write Right 2-Beginner / Write Right 3-Beginner', writingInstruction: 'Explain your plan for summer vacation', readingBooks: '', activities: '', ort: '', grammar: '', note: '' },
  { id: 'c9', month: 'JUN', week: 2, category: '동화', topic: 'The Fox and the Grapes', workbook: '', writingInstruction: 'Explain why the fox could not get the grapes', readingBooks: '', activities: '', ort: '', grammar: '', note: '' },
  { id: 'c10', month: 'JUN', week: 3, category: '', topic: 'Where Is the Hummingbird?', workbook: 'Write Right 2-Beginner', writingInstruction: 'Describe where the hummingbird might be', readingBooks: '', activities: '', ort: '', grammar: '', note: '' },
  { id: 'c11', month: 'JUN', week: 4, category: '역사', topic: '기계의 변화', workbook: '', writingInstruction: '', readingBooks: 'Oxford Read And Discover: Level 5: Machines Then And Now', activities: '', ort: '', grammar: '', note: '' },
];

const today = new Date();
const fmt = d => d.toISOString().slice(0,10);
const daysAgo = n => { const d = new Date(today); d.setDate(d.getDate()-n); return fmt(d); };

export const MOCK_LESSONS = [
  { id: 'l1',  date: daysAgo(0), studentId: 's1',  duration: 60,  topic: 'Being a Kid', booksRead: 'Write Right 1', workbook: 'Draw Then Write 1-3', grammar: '', writingActivity: 'Paragraph writing', speakingActivity: 'Role-play', activities: '', attitude: '😊', strengths: '글쓰기 집중력', difficulties: '문장 연결', homework: 'Write Right p.12-13', teacherMemo: '', parentNote: '', tuitionAmount: 100000, paymentStatus: 'paid' },
  { id: 'l2',  date: daysAgo(0), studentId: 's2',  duration: 60,  topic: 'THE GIVING TREE', booksRead: 'The Giving Tree', workbook: '', grammar: '', writingActivity: 'Opinion writing', speakingActivity: '', activities: 'Discussion', attitude: '😊', strengths: '읽기 유창성', difficulties: '의견 표현', homework: 'Read p.1-20', teacherMemo: '', parentNote: '', tuitionAmount: 60000, paymentStatus: 'paid' },
  { id: 'l3',  date: daysAgo(1), studentId: 's6',  duration: 60,  topic: 'Hercules', booksRead: 'Usborne Young Reading 2-03', workbook: '', grammar: '', writingActivity: '', speakingActivity: 'Retelling', activities: '', attitude: '😐', strengths: '어휘력', difficulties: '집중력', homework: 'Retell the story', teacherMemo: '집중력 분산', parentNote: '', tuitionAmount: 60000, paymentStatus: 'unpaid' },
  { id: 'l4',  date: daysAgo(1), studentId: 's7',  duration: 90,  topic: 'My Plan for Summer Vacation', booksRead: '', workbook: 'Write Right 2-Beginner', grammar: '', writingActivity: 'Planning essay', speakingActivity: 'Presentation', activities: '', attitude: '😊', strengths: '창의적 표현', difficulties: '문법 오류', homework: 'Finish essay draft', teacherMemo: '', parentNote: '', tuitionAmount: 60000, paymentStatus: 'paid' },
  { id: 'l5',  date: daysAgo(2), studentId: 's11', duration: 90,  topic: 'The Fox and the Grapes', booksRead: '', workbook: '', grammar: 'Past tense', writingActivity: 'Moral lesson writing', speakingActivity: '', activities: '', attitude: '😊', strengths: '문법 이해', difficulties: '', homework: 'Grammar worksheet', teacherMemo: '', parentNote: '', tuitionAmount: 140000, paymentStatus: 'unpaid' },
  { id: 'l6',  date: daysAgo(2), studentId: 's4',  duration: 60,  topic: 'Sophie\'s Masterpiece', booksRead: 'Sophie\'s Masterpiece', workbook: '', grammar: 'Scholastic Grammar', writingActivity: '', speakingActivity: '', activities: 'Craft activity', attitude: '😊', strengths: '독해력', difficulties: '발음', homework: 'Read chapter 3', teacherMemo: '', parentNote: '', tuitionAmount: 60000, paymentStatus: 'paid' },
  { id: 'l7',  date: daysAgo(3), studentId: 's10', duration: 120, topic: 'Machines Then and Now', booksRead: 'Oxford Read And Discover Level 5', workbook: '', grammar: '', writingActivity: 'Compare & contrast', speakingActivity: '', activities: '', attitude: '😐', strengths: '배경지식', difficulties: '쓰기 속도', homework: 'Finish writing', teacherMemo: '패약 사전 공지', parentNote: '', tuitionAmount: 120000, paymentStatus: 'partial' },
  { id: 'l8',  date: daysAgo(3), studentId: 's12', duration: 60,  topic: 'Where Is the Hummingbird?', booksRead: '', workbook: 'Write Right 2-Beginner', grammar: '', writingActivity: 'Descriptive writing', speakingActivity: '', activities: '', attitude: '😊', strengths: '묘사 표현', difficulties: '', homework: 'Write Right p.20', teacherMemo: '', parentNote: '', tuitionAmount: 100000, paymentStatus: 'paid' },
  { id: 'l9',  date: daysAgo(5), studentId: 's3',  duration: 60,  topic: 'Transportation Then and Now', booksRead: 'Oxford Read and Discover Level 5', workbook: '', grammar: '', writingActivity: '', speakingActivity: '', activities: '', attitude: '😴', strengths: '', difficulties: '참여도 낮음', homework: '', teacherMemo: '결석 잦음', parentNote: '', tuitionAmount: 60000, paymentStatus: 'unpaid' },
  { id: 'l10', date: daysAgo(5), studentId: 's13', duration: 60,  topic: 'Being a Kid', booksRead: 'Write Right 1', workbook: '', grammar: '', writingActivity: '', speakingActivity: 'Role-play', activities: '', attitude: '😊', strengths: '말하기', difficulties: '쓰기', homework: 'Draw and write', teacherMemo: '', parentNote: '', tuitionAmount: 60000, paymentStatus: 'paid' },
];

export const MOCK_HOMEWORK = [
  { id: 'h1', studentId: 's1',  lessonId: 'l1', assignedDate: daysAgo(0), dueDate: daysAgo(-7),  content: 'Write Right p.12-13',         status: 'not_started', memo: '' },
  { id: 'h2', studentId: 's2',  lessonId: 'l2', assignedDate: daysAgo(0), dueDate: daysAgo(-7),  content: 'Read p.1-20',                  status: 'not_started', memo: '' },
  { id: 'h3', studentId: 's6',  lessonId: 'l3', assignedDate: daysAgo(1), dueDate: daysAgo(-6),  content: 'Retell the story',             status: 'not_started', memo: '' },
  { id: 'h4', studentId: 's7',  lessonId: 'l4', assignedDate: daysAgo(1), dueDate: daysAgo(-6),  content: 'Finish essay draft',           status: 'in_progress', memo: '초안 작성 중' },
  { id: 'h5', studentId: 's11', lessonId: 'l5', assignedDate: daysAgo(2), dueDate: daysAgo(-5),  content: 'Grammar worksheet',           status: 'not_started', memo: '' },
  { id: 'h6', studentId: 's4',  lessonId: 'l6', assignedDate: daysAgo(2), dueDate: daysAgo(-5),  content: 'Read chapter 3',              status: 'done',        memo: '완료' },
  { id: 'h7', studentId: 's10', lessonId: 'l7', assignedDate: daysAgo(3), dueDate: daysAgo(-4),  content: 'Finish writing',              status: 'in_progress', memo: '' },
  { id: 'h8', studentId: 's12', lessonId: 'l8', assignedDate: daysAgo(3), dueDate: daysAgo(-4),  content: 'Write Right p.20',            status: 'done',        memo: '' },
  { id: 'h9', studentId: 's5',  lessonId: '',   assignedDate: daysAgo(7), dueDate: daysAgo(0),   content: 'Vocabulary review sheet',     status: 'not_started', memo: '오늘 마감!' },
  { id: 'h10',studentId: 's9',  lessonId: '',   assignedDate: daysAgo(10),dueDate: daysAgo(3),   content: 'Reading log week 1',          status: 'skipped',     memo: '제출 안 함' },
];

const thisMonth = `${today.getFullYear()}-${String(today.getMonth()+1).padStart(2,'0')}`;
export const MOCK_PAYMENTS = [
  { id: 'p1',  month: thisMonth, studentId: 's1',  expectedAmount: 400000, lessonCount: 4, paidAmount: 400000, difference: 0,       status: 'paid' },
  { id: 'p2',  month: thisMonth, studentId: 's2',  expectedAmount: 240000, lessonCount: 4, paidAmount: 240000, difference: 0,       status: 'paid' },
  { id: 'p3',  month: thisMonth, studentId: 's3',  expectedAmount: 180000, lessonCount: 3, paidAmount: 0,      difference: 180000,  status: 'unpaid' },
  { id: 'p4',  month: thisMonth, studentId: 's4',  expectedAmount: 240000, lessonCount: 4, paidAmount: 180000, difference: 60000,   status: 'partial' },
  { id: 'p5',  month: thisMonth, studentId: 's5',  expectedAmount: 240000, lessonCount: 4, paidAmount: 240000, difference: 0,       status: 'paid' },
  { id: 'p6',  month: thisMonth, studentId: 's6',  expectedAmount: 240000, lessonCount: 4, paidAmount: 0,      difference: 240000,  status: 'unpaid' },
  { id: 'p7',  month: thisMonth, studentId: 's7',  expectedAmount: 240000, lessonCount: 4, paidAmount: 240000, difference: 0,       status: 'paid' },
  { id: 'p8',  month: thisMonth, studentId: 's8',  expectedAmount: 240000, lessonCount: 4, paidAmount: 240000, difference: 0,       status: 'paid' },
  { id: 'p9',  month: thisMonth, studentId: 's9',  expectedAmount: 240000, lessonCount: 4, paidAmount: 240000, difference: 0,       status: 'paid' },
  { id: 'p10', month: thisMonth, studentId: 's10', expectedAmount: 480000, lessonCount: 4, paidAmount: 360000, difference: 120000,  status: 'partial' },
  { id: 'p11', month: thisMonth, studentId: 's11', expectedAmount: 560000, lessonCount: 4, paidAmount: 0,      difference: 560000,  status: 'unpaid' },
  { id: 'p12', month: thisMonth, studentId: 's12', expectedAmount: 400000, lessonCount: 4, paidAmount: 400000, difference: 0,       status: 'paid' },
  { id: 'p13', month: thisMonth, studentId: 's13', expectedAmount: 240000, lessonCount: 4, paidAmount: 240000, difference: 0,       status: 'paid' },
];

export const MOCK_TRANSACTIONS = [
  { id: 't1', date: daysAgo(1), time: '09:12', description: '태은맘',  deposit: 400000, withdrawal: 0, balance: 5400000, memo: '', matchedStudentId: 's1',  matchStatus: 'matched' },
  { id: 't2', date: daysAgo(2), time: '14:33', description: '유건',    deposit: 240000, withdrawal: 0, balance: 5000000, memo: '', matchedStudentId: 's2',  matchStatus: 'matched' },
  { id: 't3', date: daysAgo(3), time: '11:05', description: '이체',    deposit: 240000, withdrawal: 0, balance: 4760000, memo: '', matchedStudentId: null,  matchStatus: 'unmatched' },
  { id: 't4', date: daysAgo(4), time: '10:22', description: '승헌맘',  deposit: 0,      withdrawal: 0, balance: 4520000, memo: '', matchedStudentId: 's11', matchStatus: 'possible' },
  { id: 't5', date: daysAgo(5), time: '16:44', description: '정민',    deposit: 240000, withdrawal: 0, balance: 4520000, memo: '', matchedStudentId: 's5',  matchStatus: 'matched' },
];
