'use strict';

export const HOURLY_RATE = 40000;

export const MOCK_STUDENTS = [
  { id:'s1',  name:'Bella',       koreanName:'태은',   parentName:'태은맘',   parentContact:'010-1111-0001', durationHours:1,   defaultRate:40000, regularSchedule:'Mon 4pm',       status:'active', notes:'',                    paymentType:'postpay', paymentAliases:['태은','bella'] },
  { id:'s2',  name:'Ella',        koreanName:'태린',   parentName:'태은맘',   parentContact:'010-1111-0001', durationHours:1.5, defaultRate:60000, regularSchedule:'Mon 4pm',       status:'active', notes:'Same house as Bella',  paymentType:'postpay', paymentAliases:['태린','ella'] },
  { id:'s3',  name:'Yougun',      koreanName:'유건',   parentName:'유건맘',   parentContact:'010-2222-0002', durationHours:1,   defaultRate:40000, regularSchedule:'Tue 4pm',       status:'active', notes:'',                    paymentType:'postpay', paymentAliases:['유건','yougun'] },
  { id:'s4',  name:'Young Seo',   koreanName:'명서',   parentName:'명서맘',   parentContact:'010-3333-0003', durationHours:1,   defaultRate:40000, regularSchedule:'Wed 4pm',       status:'active', notes:'Frequent cancels',     paymentType:'postpay', paymentAliases:['명서','youngseo'] },
  { id:'s5',  name:'Ayun',        koreanName:'아윤',   parentName:'아윤맘',   parentContact:'010-4444-0004', durationHours:1,   defaultRate:40000, regularSchedule:'Tue 5pm',       status:'active', notes:'',                    paymentType:'prepay',  paymentAliases:['아윤','ayun'] },
  { id:'s6',  name:'Noah',        koreanName:'정민',   parentName:'정민맘',   parentContact:'010-5555-0005', durationHours:1,   defaultRate:40000, regularSchedule:'Thu 4pm',       status:'active', notes:'',                    paymentType:'postpay', paymentAliases:['정민','noah'] },
  { id:'s7',  name:'Jay',         koreanName:'민재',   parentName:'민재맘',   parentContact:'010-6666-0006', durationHours:1,   defaultRate:40000, regularSchedule:'Tue 3pm',       status:'active', notes:'Prepay',              paymentType:'prepay',  paymentAliases:['민재','jay'] },
  { id:'s8',  name:'Yena',        koreanName:'에나',   parentName:'에나맘',   parentContact:'010-7777-0007', durationHours:1.5, defaultRate:60000, regularSchedule:'Wed 5pm',       status:'active', notes:'Prepay',              paymentType:'prepay',  paymentAliases:['에나','yena'] },
  { id:'s9',  name:'Grace',       koreanName:'예은',   parentName:'예은맘',   parentContact:'010-8888-0008', durationHours:1,   defaultRate:40000, regularSchedule:'Wed 7pm',       status:'active', notes:'',                    paymentType:'postpay', paymentAliases:['예은','grace'] },
  { id:'s10', name:'Min Chae',    koreanName:'민채',   parentName:'민채맘',   parentContact:'010-9999-0009', durationHours:1,   defaultRate:40000, regularSchedule:'Sat 4pm',       status:'active', notes:'Baling Dongsan',      paymentType:'prepay',  paymentAliases:['민채','minchae'] },
  { id:'s11', name:'Chan hee',    koreanName:'찬희',   parentName:'찬희맘',   parentContact:'010-0000-0010', durationHours:2,   defaultRate:80000, regularSchedule:'Fri 2pm',       status:'active', notes:'Frequent cancel',     paymentType:'postpay', paymentAliases:['찬희','chanhee'] },
  { id:'s12', name:'Ryan',        koreanName:'승헌',   parentName:'승헌맘',   parentContact:'010-1010-0011', durationHours:1,   defaultRate:40000, regularSchedule:'Tue 7pm + Sat 9am', status:'active', notes:'2x/week, Baling Dongsan', paymentType:'prepay', paymentAliases:['승헌','ryan'] },
  { id:'s13', name:'Liz',         koreanName:'채원',   parentName:'채원맘',   parentContact:'010-2020-0012', durationHours:1.5, defaultRate:60000, regularSchedule:'Wed 7pm',       status:'active', notes:'Same house as Teo',   paymentType:'postpay', paymentAliases:['채원','liz'] },
  { id:'s14', name:'Teo',         koreanName:'승원',   parentName:'채원맘',   parentContact:'010-2020-0012', durationHours:1,   defaultRate:40000, regularSchedule:'Wed 7pm',       status:'active', notes:'Same house as Liz',   paymentType:'postpay', paymentAliases:['승원','teo'] },
  { id:'s15', name:'Chloe',       koreanName:'이수',   parentName:'이수맘',   parentContact:'010-3030-0013', durationHours:1,   defaultRate:40000, regularSchedule:'Sat 7pm',       status:'active', notes:'Baling Dongsan',      paymentType:'prepay',  paymentAliases:['이수','chloe'] },
  { id:'s16', name:'Kim min che', koreanName:'김민체', parentName:'김민체맘', parentContact:'010-4040-0014', durationHours:1,   defaultRate:40000, regularSchedule:'Mon/Thu 2pm',   status:'active', notes:'8세 영유 2년+초등',   paymentType:'postpay', paymentAliases:['김민체'] },
];

const t = new Date();
const dAgo = n => { const d = new Date(t); d.setDate(d.getDate()-n); return d.toISOString().slice(0,10); };

export const MOCK_LESSONS = [
  { id:'l001', date:dAgo(6),  studentId:'s1',  durationHours:1,   amountCharged:40000, status:'paid',      topic:'Being a Kid',            booksRead:'Write Right 1',   workbook:'Draw Then Write 1-3', grammar:'',           homework:'Write Right p.12-13', teacherNote:'Good focus',   parentNote:'', cancelReason:'' },
  { id:'l002', date:dAgo(6),  studentId:'s2',  durationHours:1.5, amountCharged:60000, status:'paid',      topic:'Being a Kid',            booksRead:'Write Right 1',   workbook:'',                    grammar:'',           homework:'Read p.1-10',         teacherNote:'',             parentNote:'', cancelReason:'' },
  { id:'l003', date:dAgo(6),  studentId:'s3',  durationHours:1,   amountCharged:40000, status:'prepaid',   topic:'THE GIVING TREE',        booksRead:'The Giving Tree', workbook:'',                    grammar:'',           homework:'Read p.1-20',         teacherNote:'',             parentNote:'', cancelReason:'' },
  { id:'l004', date:dAgo(6),  studentId:'s4',  durationHours:1,   amountCharged:0,     status:'cancelled', topic:'',                       booksRead:'',                workbook:'',                    grammar:'',           homework:'',                    teacherNote:'',             parentNote:'', cancelReason:'Student sick' },
  { id:'l005', date:dAgo(5),  studentId:'s7',  durationHours:1,   amountCharged:40000, status:'prepaid',   topic:'Hercules',               booksRead:'Usborne YR 2-03', workbook:'',                    grammar:'',           homework:'Retell the story',    teacherNote:'Low focus',    parentNote:'', cancelReason:'' },
  { id:'l006', date:dAgo(5),  studentId:'s8',  durationHours:1.5, amountCharged:60000, status:'prepaid',   topic:'Summer Vacation Plan',   booksRead:'',                workbook:'Write Right 2',       grammar:'',           homework:'Finish essay draft',  teacherNote:'Creative',     parentNote:'', cancelReason:'' },
  { id:'l007', date:dAgo(5),  studentId:'s12', durationHours:1,   amountCharged:40000, status:'prepaid',   topic:"Sophie's Masterpiece",   booksRead:"Sophie's",        workbook:'',                    grammar:'Scholastic', homework:'Read ch.3',           teacherNote:'',             parentNote:'', cancelReason:'' },
  { id:'l008', date:dAgo(4),  studentId:'s9',  durationHours:1,   amountCharged:40000, status:'paid',      topic:'Fox and the Grapes',     booksRead:'',                workbook:'',                    grammar:'Past tense', homework:'Grammar sheet',       teacherNote:'',             parentNote:'', cancelReason:'' },
  { id:'l009', date:dAgo(4),  studentId:'s13', durationHours:1.5, amountCharged:60000, status:'paid',      topic:'Where Is Hummingbird?',  booksRead:'',                workbook:'Write Right 2',       grammar:'',           homework:'Write Right p.20',    teacherNote:'Good desc.',   parentNote:'', cancelReason:'' },
  { id:'l010', date:dAgo(4),  studentId:'s14', durationHours:1,   amountCharged:40000, status:'paid',      topic:'Where Is Hummingbird?',  booksRead:'',                workbook:'',                    grammar:'',           homework:'',                    teacherNote:'',             parentNote:'', cancelReason:'' },
  { id:'l011', date:dAgo(3),  studentId:'s11', durationHours:2,   amountCharged:80000, status:'partial',   topic:'Machines Then & Now',    booksRead:'Oxford RAD L5',   workbook:'',                    grammar:'',           homework:'Finish writing',      teacherNote:'Slow writing', parentNote:'', cancelReason:'' },
  { id:'l012', date:dAgo(3),  studentId:'s5',  durationHours:1,   amountCharged:40000, status:'prepaid',   topic:"Sophie's Masterpiece",   booksRead:"Sophie's",        workbook:'',                    grammar:'Scholastic', homework:'Read ch.3',           teacherNote:'',             parentNote:'', cancelReason:'' },
  { id:'l013', date:dAgo(1),  studentId:'s1',  durationHours:1,   amountCharged:40000, status:'unpaid',    topic:'Transportation History',  booksRead:'Oxford RAD L5',   workbook:'',                    grammar:'',           homework:'',                    teacherNote:'',             parentNote:'', cancelReason:'' },
  { id:'l014', date:dAgo(1),  studentId:'s2',  durationHours:1.5, amountCharged:60000, status:'unpaid',    topic:'Transportation History',  booksRead:'Oxford RAD L5',   workbook:'',                    grammar:'',           homework:'',                    teacherNote:'',             parentNote:'', cancelReason:'' },
  { id:'l015', date:dAgo(0),  studentId:'s3',  durationHours:1,   amountCharged:40000, status:'unpaid',    topic:'THE GIVING TREE',        booksRead:'The Giving Tree', workbook:'',                    grammar:'',           homework:'Read p.20-40',        teacherNote:'',             parentNote:'', cancelReason:'' },
  { id:'l016', date:dAgo(0),  studentId:'s12', durationHours:1,   amountCharged:40000, status:'prepaid',   topic:'Hercules',               booksRead:'Usborne YR 2-03', workbook:'',                    grammar:'',           homework:'',                    teacherNote:'',             parentNote:'', cancelReason:'' },
];

export const MOCK_HOMEWORK = [
  { id:'h1',  studentId:'s1',  lessonId:'l001', assignedDate:dAgo(6), dueDate:dAgo(-1), content:'Write Right p.12-13',    status:'not_started', memo:'' },
  { id:'h2',  studentId:'s2',  lessonId:'l002', assignedDate:dAgo(6), dueDate:dAgo(-1), content:'Read p.1-10',             status:'in_progress', memo:'Started' },
  { id:'h3',  studentId:'s3',  lessonId:'l003', assignedDate:dAgo(6), dueDate:dAgo(-1), content:'Read p.1-20',             status:'done',        memo:'' },
  { id:'h4',  studentId:'s7',  lessonId:'l005', assignedDate:dAgo(5), dueDate:dAgo(0),  content:'Retell the story',        status:'not_started', memo:'Due today!' },
  { id:'h5',  studentId:'s8',  lessonId:'l006', assignedDate:dAgo(5), dueDate:dAgo(0),  content:'Finish essay draft',      status:'in_progress', memo:'' },
  { id:'h6',  studentId:'s9',  lessonId:'l008', assignedDate:dAgo(4), dueDate:dAgo(1),  content:'Grammar sheet',           status:'done',        memo:'Submitted' },
  { id:'h7',  studentId:'s13', lessonId:'l009', assignedDate:dAgo(4), dueDate:dAgo(1),  content:'Write Right p.20',        status:'done',        memo:'' },
  { id:'h8',  studentId:'s11', lessonId:'l011', assignedDate:dAgo(3), dueDate:dAgo(2),  content:'Finish writing',          status:'skipped',     memo:'No submission' },
  { id:'h9',  studentId:'s5',  lessonId:'l012', assignedDate:dAgo(3), dueDate:dAgo(2),  content:'Read ch.3',               status:'done',        memo:'' },
  { id:'h10', studentId:'s1',  lessonId:'l013', assignedDate:dAgo(1), dueDate:dAgo(-5), content:'Review vocabulary list',  status:'not_started', memo:'' },
];

export const MOCK_CURRICULUM = [
  { id:'c1',  month:'APR', week:1, category:'역사',        topic:'교통의 변화',           workbook:'',             writingInstruction:'',                              readingBooks:'Oxford RAD L5: Transportation', activities:'',          ort:'', grammar:'',              note:'' },
  { id:'c2',  month:'APR', week:1, category:'디지털',      topic:'오스모 코딩',            workbook:'Osmo',         writingInstruction:'',                              readingBooks:'',                              activities:'Coding Awbie', ort:'', grammar:'',           note:'' },
  { id:'c3',  month:'APR', week:2, category:'역할극',      topic:'Being a Kid',           workbook:'Write Right 1', writingInstruction:'Paragraph to Essay: Being a Kid', readingBooks:'Role-play situations',         activities:'',          ort:'', grammar:'',              note:'' },
  { id:'c4',  month:'MAY', week:1, category:'생각 나누기', topic:'아낌없이 주는 나무',    workbook:'',             writingInstruction:'Opinion writing',               readingBooks:'THE GIVING TREE',               activities:'Discussion', ort:'', grammar:'',              note:'Write your opinion' },
  { id:'c5',  month:'MAY', week:2, category:'동화',        topic:'Hercules',              workbook:'',             writingInstruction:'',                              readingBooks:'Usborne Young Reading 2-03',    activities:'',          ort:'', grammar:'',              note:'' },
  { id:'c6',  month:'MAY', week:3, category:'과학',        topic:'How Dinosaurs Fossils Are Made?', workbook:'',   writingInstruction:'Explain how fossils form',      readingBooks:'',                              activities:'',          ort:'', grammar:'',              note:'' },
  { id:'c7',  month:'MAY', week:4, category:'',            topic:"Sophie's Masterpiece",  workbook:'',             writingInstruction:'',                              readingBooks:"Sophie's Masterpiece",          activities:'',          ort:'', grammar:'Scholastic G1&4', note:'' },
  { id:'c8',  month:'JUN', week:1, category:'',            topic:'My Plan for Summer',    workbook:'Write Right 2-Beginner', writingInstruction:'Explain your summer plan', readingBooks:'',                         activities:'',          ort:'', grammar:'',              note:'' },
  { id:'c9',  month:'JUN', week:2, category:'동화',        topic:'The Fox and the Grapes', workbook:'',            writingInstruction:'Why fox could not get grapes',  readingBooks:'',                              activities:'',          ort:'', grammar:'',              note:'' },
  { id:'c10', month:'JUN', week:3, category:'',            topic:'Where Is the Hummingbird?', workbook:'Write Right 2', writingInstruction:'Describe where hummingbird might be', readingBooks:'',                  activities:'',          ort:'', grammar:'',              note:'' },
  { id:'c11', month:'JUN', week:4, category:'역사',        topic:'기계의 변화',            workbook:'',             writingInstruction:'',                              readingBooks:'Oxford RAD L5: Machines Then And Now', activities:'', ort:'', grammar:'',              note:'' },
];

export const MOCK_TRANSACTIONS = [
  { id:'t1', date:dAgo(1), description:'태은맘',  deposit:100000, withdrawal:0, memo:'', matchedStudentId:'s1',  matchStatus:'matched' },
  { id:'t2', date:dAgo(2), description:'유건',    deposit:40000,  withdrawal:0, memo:'', matchedStudentId:'s3',  matchStatus:'matched' },
  { id:'t3', date:dAgo(3), description:'이체',    deposit:60000,  withdrawal:0, memo:'', matchedStudentId:null,  matchStatus:'unmatched' },
  { id:'t4', date:dAgo(4), description:'승헌맘',  deposit:80000,  withdrawal:0, memo:'', matchedStudentId:'s12', matchStatus:'possible' },
  { id:'t5', date:dAgo(5), description:'정민',    deposit:40000,  withdrawal:0, memo:'', matchedStudentId:'s6',  matchStatus:'matched' },
];
