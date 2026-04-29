import React, { useState, useEffect, useMemo } from 'react';

const appId = 'seobong-security-app';

// ---- Lucide-style SVG Icons (inline) ----
const Icon = ({ d, size = 20, className = "", strokeWidth = 2 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
    {Array.isArray(d) ? d.map((path, i) => <path key={i} d={path} />) : <path d={d} />}
  </svg>
);

const Icons = {
  Shield: () => <Icon d={["M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"]} />,
  Check: () => <Icon d="M20 6L9 17l-5-5" />,
  CheckCircle: () => <Icon d={["M22 11.08V12a10 10 0 1 1-5.93-9.14", "M22 4L12 14.01l-3-3"]} />,
  Clock: () => <Icon d={["M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z", "M12 6v6l4 2"]} />,
  History: () => <Icon d={["M3 3v5h5", "M3.05 13A9 9 0 1 0 6 5.3L3 8"]} />,
  Bell: () => <Icon d={["M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9", "M13.73 21a2 2 0 0 1-3.46 0"]} />,
  Alert: () => <Icon d={["M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z", "M12 9v4", "M12 17h.01"]} />,
  BarChart: () => <Icon d={["M12 20V10", "M18 20V4", "M6 20v-4"]} />,
  Download: () => <Icon d={["M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", "M7 10l5 5 5-5", "M12 15V3"]} />,
  Edit: () => <Icon d={["M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7", "M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"]} />,
  Trash: () => <Icon d={["M3 6h18", "M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2", "M10 11v6", "M14 11v6"]} />,
  X: () => <Icon d={["M18 6L6 18", "M6 6l12 12"]} />,
  Save: () => <Icon d={["M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z", "M17 21v-8H7v8", "M7 3v5h8"]} />,
  User: () => <Icon d={["M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2", "M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"]} />,
  Settings: () => <Icon d={["M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z", "M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"]} />,
  Logout: () => <Icon d={["M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4", "M16 17l5-5-5-5", "M21 12H9"]} />,
  Clipboard: () => <Icon d={["M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2", "M9 2h6a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1z"]} />,
  ChevronRight: () => <Icon d="M9 18l6-6-6-6" />,
  Wifi: () => <Icon d={["M5 12.55a11 11 0 0 1 14.08 0", "M1.42 9a16 16 0 0 1 21.16 0", "M8.53 16.11a6 16 0 0 1 6.95 0", "M12 20h.01"]} size={14} />,
  Battery: () => <Icon d={["M17 7H7a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z", "M22 11v2"]} size={14} />,
  Signal: () => <Icon d={["M2 20h2", "M7 20V15", "M12 20V10", "M17 20V5", "M22 20V2"]} size={14} />,
};

// ---- Mock Firebase (replace with real Firebase in production) ----
const mockDb = {
  logs: [],
  nextId: 1,
  listeners: [],
  addLog(data) {
    const newLog = { id: String(this.nextId++), ...data, timestamp: { seconds: Date.now() / 1000, toDate: () => new Date() } };
    this.logs.unshift(newLog);
    this.notifyListeners();
    return newLog.id;
  },
  updateLog(id, data) {
    const idx = this.logs.findIndex(l => l.id === id);
    if (idx !== -1) { this.logs[idx] = { ...this.logs[idx], ...data }; this.notifyListeners(); }
  },
  deleteLog(id) {
    this.logs = this.logs.filter(l => l.id !== id);
    this.notifyListeners();
  },
  notifyListeners() { this.listeners.forEach(fn => fn([...this.logs])); },
  subscribe(fn) {
    this.listeners.push(fn);
    fn([...this.logs]);
    return () => { this.listeners = this.listeners.filter(l => l !== fn); };
  }
};

// ---- Constants ----
const CHECKLIST_ITEMS = [
  { key: 'lightsOff',      label: '전체 소등 완료 (교실 및 복도)' },
  { key: 'windowsClosed',  label: '창문 및 모든 출입문 잠금' },
  { key: 'securitySet',    label: '무인경비 시스템(SECOM) 가동' },
  { key: 'acOff',          label: '냉난방기 및 공기청정기 OFF' },
  { key: 'trashEmptied',   label: '내부 정리 및 쓰레기 배출' },
];

const DEFAULT_CHECKLIST = { lightsOff: false, windowsClosed: false, securitySet: false, trashEmptied: false, acOff: false };

const ROLE_INFO = {
  staff:       { label: '온동네 돌봄교육센터 선생님', color: '#2563eb', bg: '#eff6ff' },
  late_leaver: { label: '19시 이후 퇴청자', color: '#7c3aed', bg: '#f5f3ff' },
  admin:       { label: '행정실장 / 늘봄전담실장', color: '#0f172a', bg: '#f1f5f9' },
};

// ---- Styles ----
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Pretendard:wght@400;500;600;700;800;900&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; -webkit-tap-highlight-color: transparent; }
  body { font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, sans-serif; background: #f1f5f9; }
  
  .app-shell {
    max-width: 420px;
    min-height: 100vh;
    margin: 0 auto;
    background: #f8fafc;
    position: relative;
    display: flex;
    flex-direction: column;
    box-shadow: 0 0 60px rgba(0,0,0,0.15);
  }

  /* Status Bar */
  .status-bar {
    background: #fff;
    padding: 10px 20px 6px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 11px;
    font-weight: 700;
    color: #0f172a;
    letter-spacing: -0.3px;
  }
  .status-icons { display: flex; gap: 5px; align-items: center; }

  /* Scrollable Content */
  .scroll-content { flex: 1; overflow-y: auto; padding-bottom: 90px; }
  .scroll-content::-webkit-scrollbar { display: none; }

  /* Tab Bar */
  .tab-bar {
    position: fixed;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    max-width: 420px;
    background: rgba(255,255,255,0.95);
    backdrop-filter: blur(20px);
    border-top: 1px solid #e2e8f0;
    display: flex;
    padding: 8px 0 calc(8px + env(safe-area-inset-bottom));
    z-index: 100;
  }
  .tab-item {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3px;
    cursor: pointer;
    padding: 4px 0;
    transition: all 0.2s;
  }
  .tab-icon { width: 24px; height: 24px; display: flex; align-items: center; justify-content: center; border-radius: 8px; transition: all 0.2s; }
  .tab-label { font-size: 10px; font-weight: 600; letter-spacing: -0.3px; color: #94a3b8; transition: color 0.2s; }
  .tab-item.active .tab-icon { background: #eff6ff; color: #2563eb; }
  .tab-item.active .tab-label { color: #2563eb; }

  /* Section Header */
  .section-header {
    background: #fff;
    padding: 16px 20px 12px;
    border-bottom: 1px solid #f1f5f9;
    position: sticky;
    top: 0;
    z-index: 10;
  }
  .section-title { font-size: 18px; font-weight: 800; color: #0f172a; letter-spacing: -0.5px; }
  .section-sub { font-size: 12px; color: #94a3b8; font-weight: 500; margin-top: 2px; }

  /* Cards */
  .card {
    background: #fff;
    border-radius: 20px;
    padding: 18px;
    margin: 0 16px 12px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04);
  }
  .card-sm {
    background: #fff;
    border-radius: 16px;
    padding: 14px 16px;
    margin: 0 16px 10px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.05);
  }

  /* Hero Banner */
  .hero-banner {
    background: linear-gradient(135deg, #1e40af 0%, #2563eb 50%, #3b82f6 100%);
    margin: 12px 16px;
    border-radius: 24px;
    padding: 22px 20px;
    color: white;
    position: relative;
    overflow: hidden;
  }
  .hero-banner::before {
    content: '';
    position: absolute;
    top: -30px; right: -30px;
    width: 120px; height: 120px;
    background: rgba(255,255,255,0.08);
    border-radius: 50%;
  }
  .hero-banner::after {
    content: '';
    position: absolute;
    bottom: -20px; right: 40px;
    width: 80px; height: 80px;
    background: rgba(255,255,255,0.05);
    border-radius: 50%;
  }

  /* Checklist Item */
  .check-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 14px;
    border-radius: 14px;
    cursor: pointer;
    border: 2px solid transparent;
    transition: all 0.2s;
    margin-bottom: 8px;
    background: #f8fafc;
    -webkit-user-select: none;
  }
  .check-item.checked { background: #eff6ff; border-color: #bfdbfe; }
  .check-box {
    width: 22px; height: 22px;
    border-radius: 7px;
    border: 2px solid #cbd5e1;
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
    transition: all 0.2s;
    background: #fff;
  }
  .check-box.checked { background: #2563eb; border-color: #2563eb; }
  .check-label { font-size: 13px; font-weight: 500; color: #475569; flex: 1; line-height: 1.4; }
  .check-label.checked { color: #1e40af; font-weight: 600; }

  /* Progress Bar */
  .progress-track { background: #e2e8f0; height: 6px; border-radius: 99px; overflow: hidden; }
  .progress-fill { height: 100%; border-radius: 99px; transition: width 0.4s cubic-bezier(0.34, 1.56, 0.64, 1); background: linear-gradient(90deg, #2563eb, #3b82f6); }

  /* Input */
  .app-input {
    width: 100%;
    padding: 13px 15px;
    background: #f8fafc;
    border: 2px solid #e2e8f0;
    border-radius: 14px;
    font-size: 14px;
    font-family: inherit;
    color: #0f172a;
    outline: none;
    transition: border-color 0.2s;
    font-weight: 500;
  }
  .app-input:focus { border-color: #2563eb; background: #fff; }
  .app-input::placeholder { color: #94a3b8; }

  /* Buttons */
  .btn-primary {
    width: 100%;
    padding: 16px;
    border-radius: 16px;
    border: none;
    font-size: 15px;
    font-weight: 700;
    font-family: inherit;
    cursor: pointer;
    transition: all 0.2s;
    letter-spacing: -0.3px;
  }
  .btn-primary:active { transform: scale(0.98); }
  .btn-blue { background: linear-gradient(135deg, #2563eb, #3b82f6); color: white; box-shadow: 0 4px 15px rgba(37, 99, 235, 0.3); }
  .btn-purple { background: linear-gradient(135deg, #7c3aed, #8b5cf6); color: white; box-shadow: 0 4px 15px rgba(124, 58, 237, 0.3); }
  .btn-dark { background: linear-gradient(135deg, #0f172a, #1e293b); color: white; box-shadow: 0 4px 15px rgba(15, 23, 42, 0.2); }
  .btn-primary:disabled { background: #e2e8f0; color: #94a3b8; box-shadow: none; cursor: not-allowed; }

  /* Log Item */
  .log-item {
    background: #fff;
    border-radius: 18px;
    padding: 16px;
    margin: 0 16px 10px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.05);
    transition: all 0.2s;
    border: 2px solid transparent;
  }
  .log-item:active { transform: scale(0.99); border-color: #bfdbfe; }

  /* Dot indicators */
  .dot-row { display: flex; gap: 4px; margin-top: 10px; }
  .dot { flex: 1; height: 4px; border-radius: 99px; }

  /* Note box */
  .note-box {
    background: #fff7ed;
    border: 1px solid #fed7aa;
    border-radius: 10px;
    padding: 10px 12px;
    font-size: 12px;
    color: #c2410c;
    margin-top: 10px;
    display: flex;
    gap: 6px;
    align-items: flex-start;
    font-style: italic;
  }

  /* Toast */
  .toast {
    position: fixed;
    top: 60px;
    left: 50%;
    transform: translateX(-50%);
    padding: 12px 20px;
    border-radius: 99px;
    font-size: 13px;
    font-weight: 600;
    font-family: inherit;
    z-index: 9999;
    white-space: nowrap;
    display: flex;
    align-items: center;
    gap: 8px;
    box-shadow: 0 8px 30px rgba(0,0,0,0.2);
    animation: toastIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  }
  @keyframes toastIn { from { opacity: 0; transform: translateX(-50%) translateY(-10px) scale(0.9); } to { opacity: 1; transform: translateX(-50%) translateY(0) scale(1); } }
  .toast-success { background: #16a34a; color: white; }
  .toast-error { background: #dc2626; color: white; }

  /* Bottom Sheet */
  .sheet-overlay {
    position: fixed; inset: 0;
    background: rgba(15,23,42,0.6);
    backdrop-filter: blur(4px);
    z-index: 200;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    animation: overlayIn 0.25s ease;
  }
  @keyframes overlayIn { from { opacity: 0; } to { opacity: 1; } }
  .bottom-sheet {
    background: #fff;
    width: 100%;
    max-width: 420px;
    border-radius: 28px 28px 0 0;
    padding: 0 0 calc(24px + env(safe-area-inset-bottom));
    max-height: 90vh;
    overflow-y: auto;
    animation: sheetIn 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
  }
  @keyframes sheetIn { from { transform: translateY(100%); } to { transform: translateY(0); } }
  .sheet-handle { width: 40px; height: 4px; background: #e2e8f0; border-radius: 99px; margin: 12px auto 0; }

  /* Onboarding */
  .role-card {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 18px;
    border-radius: 20px;
    cursor: pointer;
    border: 2px solid #e2e8f0;
    background: #fff;
    margin-bottom: 10px;
    transition: all 0.2s;
    width: 100%;
    font-family: inherit;
  }
  .role-card:active { transform: scale(0.99); }
  .role-icon { width: 48px; height: 48px; border-radius: 14px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }

  /* Stats Grid */
  .stats-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin: 0 16px 12px; }
  .stat-card { background: #fff; border-radius: 18px; padding: 16px; box-shadow: 0 1px 3px rgba(0,0,0,0.05); }

  /* Shake animation for delete confirm */
  @keyframes shake { 0%,100%{transform:translateX(0)} 20%{transform:translateX(-6px)} 40%{transform:translateX(6px)} 60%{transform:translateX(-4px)} 80%{transform:translateX(4px)} }
  .shake { animation: shake 0.4s ease; }

  /* Danger zone */
  .danger-zone { border: 2px solid #fecaca; background: #fff5f5; border-radius: 16px; padding: 16px; margin-top: 16px; }
  .danger-confirm { background: #fee2e2; border: 2px solid #fca5a5; border-radius: 12px; padding: 14px; margin-top: 12px; }
  .btn-danger { background: linear-gradient(135deg, #dc2626, #ef4444); color: white; border: none; border-radius: 12px; padding: 13px 20px; font-size: 14px; font-weight: 700; font-family: inherit; cursor: pointer; width: 100%; display: flex; align-items: center; justify-content: center; gap: 8px; transition: all 0.2s; box-shadow: 0 4px 12px rgba(220,38,38,0.3); }
  .btn-danger:active { transform: scale(0.98); }
  .btn-cancel-sm { background: #f1f5f9; color: #64748b; border: none; border-radius: 12px; padding: 13px 20px; font-size: 14px; font-weight: 700; font-family: inherit; cursor: pointer; flex: 1; transition: all 0.2s; }
  .fade-in { animation: fadeIn 0.2s ease; }
  @keyframes fadeIn { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: translateY(0); } }
`;

// ---- Time Utility ----
const getTimeStr = () => new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' });
const formatTime = (ts) => ts ? new Date(ts.seconds * 1000).toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' }) : '';
const formatDate = (ts) => ts ? new Date(ts.seconds * 1000).toLocaleDateString('ko-KR') : '';
const formatDateShort = (ts) => ts ? new Date(ts.seconds * 1000).toLocaleDateString('ko-KR', { month: 'long', day: 'numeric' }) : '';

// ---- Main App ----
export default function App() {
  const [role, setRole] = useState(null);
  const [tab, setTab] = useState('check');
  const [logs, setLogs] = useState([]);
  const [checklist, setChecklist] = useState({ ...DEFAULT_CHECKLIST });
  const [notes, setNotes] = useState('');
  const [reporterName, setReporterName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState(null);
  const [editingLog, setEditingLog] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [shakeTrigger, setShakeTrigger] = useState(false);
  const [currentTime, setCurrentTime] = useState(getTimeStr());

  useEffect(() => {
    const t = setInterval(() => setCurrentTime(getTimeStr()), 10000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const unsub = mockDb.subscribe(setLogs);
    return unsub;
  }, []);

  const stats = useMemo(() => {
    const now = new Date();
    const monthly = logs.filter(l => {
      const d = l.timestamp ? new Date(l.timestamp.seconds * 1000) : null;
      return d && d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
    });
    return {
      monthly: monthly.length,
      total: logs.length,
      issues: logs.filter(l => l.notes?.trim()).length,
      completion: logs.length > 0 ? Math.round(logs.filter(l => Object.values(l.checklist || {}).every(Boolean)).length / logs.length * 100) : 100,
    };
  }, [logs]);

  const checkedCount = Object.values(checklist).filter(Boolean).length;
  const totalItems = CHECKLIST_ITEMS.length;

  const showToast = (text, type = 'success') => {
    setToast({ text, type });
    setTimeout(() => setToast(null), 2800);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (role === 'late_leaver' && !reporterName.trim()) { showToast('기록자 성함을 입력해 주세요.', 'error'); return; }
    if (!Object.values(checklist).every(Boolean)) { showToast('모든 항목을 확인해 주세요.', 'error'); return; }
    setIsSubmitting(true);
    await new Promise(r => setTimeout(r, 600));
    const nameMap = {
      staff: '온동네 돌봄교육센터 선생님',
      late_leaver: `19시 이후 퇴청자 (${reporterName})`,
      admin: '관리자 (행정실장/늘봄전담실장)',
    };
    mockDb.addLog({
      userName: nameMap[role],
      timestamp: { seconds: Date.now() / 1000, toDate: () => new Date() },
      checklist: { ...checklist },
      notes,
      date: new Date().toLocaleDateString('ko-KR'),
    });
    setChecklist({ ...DEFAULT_CHECKLIST });
    setNotes('');
    setReporterName('');
    setIsSubmitting(false);
    showToast('보안 점검 보고가 제출되었습니다.');
    setTab('history');
  };

  const handleUpdate = async () => {
    if (!editingLog) return;
    setIsSubmitting(true);
    await new Promise(r => setTimeout(r, 500));
    mockDb.updateLog(editingLog.id, {
      checklist: editingLog.checklist,
      notes: editingLog.notes,
      lastEditedBy: '관리자',
      editTimestamp: { seconds: Date.now() / 1000 },
    });
    setIsSubmitting(false);
    setEditingLog(null);
    setShowDeleteConfirm(false);
    showToast('기록이 수정되었습니다.');
  };

  const handleDelete = async () => {
    if (!editingLog) return;
    setIsSubmitting(true);
    await new Promise(r => setTimeout(r, 500));
    mockDb.deleteLog(editingLog.id);
    setIsSubmitting(false);
    setEditingLog(null);
    setShowDeleteConfirm(false);
    showToast('기록이 삭제되었습니다.');
  };

  const triggerShake = () => {
    setShakeTrigger(true);
    setTimeout(() => setShakeTrigger(false), 400);
  };

  const copyCSV = () => {
    const headers = ['날짜', '시간', '보고자', '소등', '창문', '보안설정', '냉난방', '정리', '특이사항'];
    const rows = logs.map(l => [
      formatDate(l.timestamp), formatTime(l.timestamp), l.userName,
      l.checklist?.lightsOff ? 'O' : 'X', l.checklist?.windowsClosed ? 'O' : 'X',
      l.checklist?.securitySet ? 'O' : 'X', l.checklist?.acOff ? 'O' : 'X',
      l.checklist?.trashEmptied ? 'O' : 'X', (l.notes || '').replace(/,/g, ' ')
    ].join(','));
    navigator.clipboard?.writeText([headers.join(','), ...rows].join('\n'))
      .then(() => showToast('CSV 데이터가 복사되었습니다.'))
      .catch(() => showToast('복사에 실패했습니다.', 'error'));
  };

  // ---- Role Selection Screen ----
  if (!role) {
    return (
      <>
        <style>{css}</style>
        <div className="app-shell">
          <div className="status-bar">
            <span>{currentTime}</span>
            <div className="status-icons">
              <Icons.Signal /><Icons.Wifi /><Icons.Battery />
            </div>
          </div>

          <div style={{ flex: 1, overflowY: 'auto', padding: '20px 16px 40px' }}>
            {/* Logo */}
            <div style={{ textAlign: 'center', padding: '32px 0 28px' }}>
              <div style={{ width: 72, height: 72, background: 'linear-gradient(135deg, #1e40af, #3b82f6)', borderRadius: 22, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', boxShadow: '0 8px 30px rgba(37,99,235,0.3)' }}>
                <div style={{ color: 'white' }}><Icons.Shield /></div>
              </div>
              <h1 style={{ fontSize: 22, fontWeight: 900, color: '#0f172a', letterSpacing: '-0.5px', lineHeight: 1.3 }}>서봉초등학교<br />보안점검 시스템</h1>
              <p style={{ fontSize: 13, color: '#94a3b8', marginTop: 8, fontWeight: 500 }}>최종 퇴근 시 점검 기록을 남겨주세요</p>
            </div>

            <p style={{ fontSize: 11, fontWeight: 700, color: '#94a3b8', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: 12, paddingLeft: 4 }}>역할 선택</p>

            {[
              { key: 'staff',       label: '돌봄교육센터 선생님',      sub: '온동네 돌봄교육센터 담당 교사',    color: '#2563eb', bg: '#eff6ff', icon: <Icons.Clipboard /> },
              { key: 'late_leaver', label: '19시 이후 퇴청자',          sub: '교직원 등 늦게 퇴근하는 분',       color: '#7c3aed', bg: '#f5f3ff', icon: <Icons.Clock /> },
              { key: 'admin',       label: '관리자',                    sub: '행정실장 / 늘봄전담실장',          color: '#0f172a', bg: '#f1f5f9', icon: <Icons.Settings /> },
            ].map(r => (
              <button key={r.key} className="role-card" onClick={() => setRole(r.key)}
                style={{ borderColor: '#e2e8f0' }}
                onMouseEnter={e => e.currentTarget.style.borderColor = r.color}
                onMouseLeave={e => e.currentTarget.style.borderColor = '#e2e8f0'}
              >
                <div className="role-icon" style={{ background: r.bg, color: r.color }}>{r.icon}</div>
                <div style={{ flex: 1, textAlign: 'left' }}>
                  <div style={{ fontSize: 15, fontWeight: 700, color: '#0f172a' }}>{r.label}</div>
                  <div style={{ fontSize: 12, color: '#94a3b8', marginTop: 2 }}>{r.sub}</div>
                </div>
                <div style={{ color: '#cbd5e1' }}><Icons.ChevronRight /></div>
              </button>
            ))}
          </div>
        </div>
      </>
    );
  }

  const roleColor = ROLE_INFO[role]?.color || '#2563eb';
  const tabs = [
    { key: 'check',    label: '점검',  icon: <Icons.Clipboard /> },
    { key: 'history',  label: '기록',  icon: <Icons.History /> },
    ...(role === 'admin' ? [{ key: 'stats', label: '통계', icon: <Icons.BarChart /> }] : []),
    { key: 'profile',  label: '내 정보', icon: <Icons.User /> },
  ];

  return (
    <>
      <style>{css}</style>
      <div className="app-shell">
        {/* Status Bar */}
        <div className="status-bar">
          <span>{currentTime}</span>
          <div className="status-icons">
            <Icons.Signal /><Icons.Wifi /><Icons.Battery />
          </div>
        </div>

        {/* Toast */}
        {toast && (
          <div className={`toast ${toast.type === 'success' ? 'toast-success' : 'toast-error'}`}>
            {toast.type === 'success' ? <Icons.CheckCircle /> : <Icons.Alert />}
            {toast.text}
          </div>
        )}

        {/* Scrollable Content */}
        <div className="scroll-content">

          {/* ===== CHECK TAB ===== */}
          {tab === 'check' && (
            <>
              <div className="section-header">
                <div className="section-title">보안 점검</div>
                <div className="section-sub">{new Date().toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' })}</div>
              </div>

              {/* Hero */}
              <div className="hero-banner" style={{ marginTop: 12 }}>
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '1.5px', opacity: 0.7, marginBottom: 4, textTransform: 'uppercase' }}>Today's Security Check</div>
                <div style={{ fontSize: 28, fontWeight: 900, letterSpacing: '-0.5px' }}>
                  {checkedCount}/{totalItems}
                  <span style={{ fontSize: 14, fontWeight: 500, opacity: 0.8, marginLeft: 6 }}>항목 완료</span>
                </div>
                <div className="progress-track" style={{ marginTop: 12, background: 'rgba(255,255,255,0.2)' }}>
                  <div className="progress-fill" style={{ width: `${(checkedCount / totalItems) * 100}%`, background: 'rgba(255,255,255,0.9)' }} />
                </div>
              </div>

              <form onSubmit={handleSubmit}>
                {/* Name input for late_leaver */}
                {role === 'late_leaver' && (
                  <div className="card">
                    <div style={{ fontSize: 12, fontWeight: 700, color: '#7c3aed', marginBottom: 8 }}>기록자 성함</div>
                    <input className="app-input" type="text" value={reporterName} onChange={e => setReporterName(e.target.value)} placeholder="이름을 입력하세요" />
                  </div>
                )}

                {/* Checklist */}
                <div className="card">
                  <div style={{ fontSize: 12, fontWeight: 700, color: '#94a3b8', marginBottom: 14, letterSpacing: '0.5px' }}>점검 항목</div>
                  {CHECKLIST_ITEMS.map(item => (
                    <div key={item.key} className={`check-item${checklist[item.key] ? ' checked' : ''}`}
                      onClick={() => setChecklist(p => ({ ...p, [item.key]: !p[item.key] }))}>
                      <div className={`check-box${checklist[item.key] ? ' checked' : ''}`}>
                        {checklist[item.key] && <div style={{ color: 'white', display: 'flex', alignItems: 'center' }}><Icons.Check /></div>}
                      </div>
                      <span className={`check-label${checklist[item.key] ? ' checked' : ''}`}>{item.label}</span>
                    </div>
                  ))}
                </div>

                {/* Notes */}
                <div className="card">
                  <div style={{ fontSize: 12, fontWeight: 700, color: '#94a3b8', marginBottom: 8, letterSpacing: '0.5px' }}>특이사항 (선택)</div>
                  <textarea className="app-input" style={{ minHeight: 90, resize: 'none' }}
                    value={notes} onChange={e => setNotes(e.target.value)}
                    placeholder="행정실에 전달할 특이사항이 있다면 적어주세요." />
                </div>

                {/* Submit */}
                <div style={{ padding: '0 16px 16px' }}>
                  <button type="submit" className={`btn-primary ${role === 'late_leaver' ? 'btn-purple' : role === 'admin' ? 'btn-dark' : 'btn-blue'}`}
                    disabled={isSubmitting}>
                    {isSubmitting ? '제출 중...' : '점검 보고 제출'}
                  </button>
                </div>
              </form>
            </>
          )}

          {/* ===== HISTORY TAB ===== */}
          {tab === 'history' && (
            <>
              <div className="section-header" style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                <div>
                  <div className="section-title">기록 현황</div>
                  <div className="section-sub">총 {logs.length}건의 점검 기록</div>
                </div>
                {role === 'admin' && (
                  <button onClick={copyCSV} style={{ display: 'flex', alignItems: 'center', gap: 5, background: '#eff6ff', color: '#2563eb', border: 'none', borderRadius: 10, padding: '7px 12px', fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', marginTop: 2 }}>
                    <Icons.Download />CSV
                  </button>
                )}
              </div>

              {logs.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '60px 20px', color: '#94a3b8' }}>
                  <div style={{ fontSize: 40, marginBottom: 12 }}>
                    <div style={{ display: 'inline-flex', opacity: 0.3 }}><Icons.Clipboard /></div>
                  </div>
                  <div style={{ fontWeight: 600, fontSize: 14 }}>아직 기록이 없습니다</div>
                  <div style={{ fontSize: 12, marginTop: 4 }}>점검 탭에서 첫 보고를 제출해 보세요</div>
                </div>
              ) : logs.map((log, idx) => {
                const allDone = log.checklist && Object.values(log.checklist).every(Boolean);
                return (
                  <div key={log.id} className="log-item">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                        <div style={{
                          width: 40, height: 40, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center',
                          background: idx === 0 ? 'linear-gradient(135deg, #2563eb, #3b82f6)' : '#f1f5f9',
                          color: idx === 0 ? 'white' : '#94a3b8',
                          flexShrink: 0, boxShadow: idx === 0 ? '0 4px 12px rgba(37,99,235,0.3)' : 'none'
                        }}>
                          {idx === 0 ? <Icons.Bell /> : <Icons.CheckCircle />}
                        </div>
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                            <span style={{ fontSize: 14, fontWeight: 800, color: '#0f172a' }}>{formatDateShort(log.timestamp)}</span>
                            {idx === 0 && <span style={{ background: '#dcfce7', color: '#16a34a', fontSize: 9, padding: '2px 7px', borderRadius: 99, fontWeight: 800, letterSpacing: '0.5px' }}>NEW</span>}
                          </div>
                          <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 2, fontWeight: 500 }}>
                            {formatTime(log.timestamp)} &bull; {log.userName}
                          </div>
                        </div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        {!allDone && (
                          <div style={{ display: 'flex', alignItems: 'center', color: '#f59e0b' }}>
                            <Icons.Alert />
                          </div>
                        )}
                        {role === 'admin' && (
                          <button onClick={() => { setEditingLog({ ...log }); setShowDeleteConfirm(false); }}
                            style={{ padding: 6, background: '#f8fafc', border: 'none', borderRadius: 8, cursor: 'pointer', color: '#94a3b8', display: 'flex', alignItems: 'center' }}>
                            <Icons.Edit />
                          </button>
                        )}
                      </div>
                    </div>
                    <div className="dot-row">
                      {CHECKLIST_ITEMS.map(item => (
                        <div key={item.key} className="dot" style={{ background: log.checklist?.[item.key] ? '#2563eb' : '#e2e8f0' }} />
                      ))}
                    </div>
                    {log.notes?.trim() && (
                      <div className="note-box">
                        <div style={{ flexShrink: 0, color: '#f97316' }}><Icons.Alert /></div>
                        <span>"{log.notes}"</span>
                      </div>
                    )}
                    {log.lastEditedBy && (
                      <div style={{ fontSize: 10, color: '#94a3b8', textAlign: 'right', marginTop: 6 }}>
                        (관리자 수정: {formatDate(log.editTimestamp)})
                      </div>
                    )}
                  </div>
                );
              })}
            </>
          )}

          {/* ===== STATS TAB (admin only) ===== */}
          {tab === 'stats' && role === 'admin' && (
            <>
              <div className="section-header">
                <div className="section-title">통계 현황</div>
                <div className="section-sub">{new Date().toLocaleDateString('ko-KR', { year: 'numeric', month: 'long' })} 기준</div>
              </div>

              <div style={{ height: 12 }} />
              <div className="stats-grid">
                {[
                  { label: '이번 달 점검', value: stats.monthly, unit: '건', color: '#2563eb', bg: '#eff6ff', icon: <Icons.Clipboard /> },
                  { label: '특이사항',     value: stats.issues,  unit: '건', color: '#ea580c', bg: '#fff7ed', icon: <Icons.Alert /> },
                  { label: '총 기록',     value: stats.total,   unit: '건', color: '#16a34a', bg: '#f0fdf4', icon: <Icons.History /> },
                  { label: '완료율',       value: stats.completion, unit: '%', color: '#7c3aed', bg: '#f5f3ff', icon: <Icons.CheckCircle /> },
                ].map(s => (
                  <div key={s.label} className="stat-card">
                    <div style={{ color: s.color, display: 'flex', marginBottom: 8 }}>{s.icon}</div>
                    <div style={{ fontSize: 11, color: '#94a3b8', fontWeight: 600 }}>{s.label}</div>
                    <div style={{ fontSize: 28, fontWeight: 900, color: s.color, letterSpacing: '-1px', marginTop: 2 }}>
                      {s.value}<span style={{ fontSize: 13, fontWeight: 500, color: '#94a3b8' }}>{s.unit}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="card">
                <div style={{ fontSize: 12, fontWeight: 700, color: '#94a3b8', marginBottom: 14 }}>시스템 상태</div>
                {[
                  { label: 'Firebase 연동', status: '정상', color: '#16a34a' },
                  { label: '실시간 동기화', status: '활성화', color: '#16a34a' },
                  { label: '데이터 백업', status: '정상', color: '#16a34a' },
                ].map(s => (
                  <div key={s.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid #f1f5f9' }}>
                    <span style={{ fontSize: 13, color: '#475569', fontWeight: 500 }}>{s.label}</span>
                    <span style={{ fontSize: 12, fontWeight: 700, color: s.color, background: '#f0fdf4', padding: '3px 10px', borderRadius: 99 }}>{s.status}</span>
                  </div>
                ))}
              </div>

              <div style={{ padding: '0 16px' }}>
                <button onClick={copyCSV} className="btn-primary btn-blue">
                  전체 데이터 CSV 추출
                </button>
              </div>
            </>
          )}

          {/* ===== PROFILE TAB ===== */}
          {tab === 'profile' && (
            <>
              <div className="section-header">
                <div className="section-title">내 정보</div>
              </div>

              {/* Profile Card */}
              <div style={{ margin: '12px 16px' }}>
                <div style={{ background: `linear-gradient(135deg, ${roleColor}, ${roleColor}cc)`, borderRadius: 24, padding: '24px 20px', color: 'white', position: 'relative', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', top: -20, right: -20, width: 100, height: 100, background: 'rgba(255,255,255,0.08)', borderRadius: '50%' }} />
                  <div style={{ width: 56, height: 56, background: 'rgba(255,255,255,0.2)', borderRadius: 18, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 14 }}>
                    <Icons.User />
                  </div>
                  <div style={{ fontSize: 18, fontWeight: 800, letterSpacing: '-0.5px' }}>{ROLE_INFO[role]?.label}</div>
                  <div style={{ fontSize: 12, opacity: 0.75, marginTop: 4, fontWeight: 500 }}>서봉초등학교 보안점검 시스템</div>
                </div>
              </div>

              <div className="card">
                {[
                  { label: '내 역할', value: ROLE_INFO[role]?.label },
                  { label: '이번 달 점검', value: `${stats.monthly}건` },
                  { label: '전체 기록', value: `${stats.total}건` },
                ].map(item => (
                  <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid #f1f5f9' }}>
                    <span style={{ fontSize: 13, color: '#94a3b8', fontWeight: 600 }}>{item.label}</span>
                    <span style={{ fontSize: 13, color: '#0f172a', fontWeight: 700 }}>{item.value}</span>
                  </div>
                ))}
              </div>

              <div style={{ padding: '0 16px' }}>
                <button className="btn-primary" onClick={() => setRole(null)}
                  style={{ background: '#f1f5f9', color: '#ef4444', boxShadow: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                  <Icons.Logout />
                  역할 변경 / 로그아웃
                </button>
              </div>
            </>
          )}
        </div>

        {/* Bottom Tab Bar */}
        <div className="tab-bar">
          {tabs.map(t => (
            <div key={t.key} className={`tab-item${tab === t.key ? ' active' : ''}`} onClick={() => setTab(t.key)}>
              <div className="tab-icon">{t.icon}</div>
              <span className="tab-label">{t.label}</span>
            </div>
          ))}
        </div>

        {/* ===== ADMIN EDIT BOTTOM SHEET ===== */}
        {editingLog && (
          <div className="sheet-overlay" onClick={e => { if (e.target === e.currentTarget) { setEditingLog(null); setShowDeleteConfirm(false); } }}>
            <div className="bottom-sheet">
              <div className="sheet-handle" />

              {/* Sheet Header */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px 12px' }}>
                <div>
                  <div style={{ fontSize: 17, fontWeight: 800, color: '#0f172a', letterSpacing: '-0.5px' }}>기록 수정</div>
                  <div style={{ fontSize: 12, color: '#94a3b8', marginTop: 2 }}>{formatDateShort(editingLog.timestamp)} &bull; {editingLog.userName}</div>
                </div>
                <button onClick={() => { setEditingLog(null); setShowDeleteConfirm(false); }}
                  style={{ background: '#f1f5f9', border: 'none', borderRadius: 10, width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#64748b' }}>
                  <Icons.X />
                </button>
              </div>

              <div style={{ padding: '0 16px' }}>
                {/* Checklist edit */}
                <div style={{ marginBottom: 12 }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: '#94a3b8', marginBottom: 8, letterSpacing: '0.5px' }}>점검 항목</div>
                  {CHECKLIST_ITEMS.map(item => (
                    <div key={item.key}
                      className={`check-item${editingLog.checklist[item.key] ? ' checked' : ''}`}
                      onClick={() => setEditingLog(prev => ({ ...prev, checklist: { ...prev.checklist, [item.key]: !prev.checklist[item.key] } }))}
                      style={{ marginBottom: 6, padding: '11px 12px' }}>
                      <div className={`check-box${editingLog.checklist[item.key] ? ' checked' : ''}`}>
                        {editingLog.checklist[item.key] && <div style={{ color: 'white', display: 'flex', alignItems: 'center' }}><Icons.Check /></div>}
                      </div>
                      <span className={`check-label${editingLog.checklist[item.key] ? ' checked' : ''}`} style={{ fontSize: 12 }}>{item.label}</span>
                    </div>
                  ))}
                </div>

                {/* Notes edit */}
                <div style={{ marginBottom: 16 }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: '#94a3b8', marginBottom: 8, letterSpacing: '0.5px' }}>특이사항</div>
                  <textarea className="app-input" style={{ minHeight: 80, resize: 'none' }}
                    value={editingLog.notes}
                    onChange={e => setEditingLog(prev => ({ ...prev, notes: e.target.value }))}
                    placeholder="수정할 내용을 입력하세요." />
                </div>

                {/* Save Button */}
                <div style={{ display: 'flex', gap: 10, marginBottom: 8 }}>
                  <button className="btn-cancel-sm" onClick={() => { setEditingLog(null); setShowDeleteConfirm(false); }}>취소</button>
                  <button className="btn-primary btn-blue" style={{ flex: 2, padding: '13px' }}
                    onClick={handleUpdate} disabled={isSubmitting}>
                    {isSubmitting ? '저장 중...' : '변경사항 저장'}
                  </button>
                </div>

                {/* ---- DANGER ZONE ---- */}
                <div className={`danger-zone${shakeTrigger ? ' shake' : ''}`}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                    <div style={{ color: '#dc2626' }}><Icons.Alert /></div>
                    <span style={{ fontSize: 13, fontWeight: 800, color: '#dc2626' }}>위험 구역</span>
                  </div>
                  <div style={{ fontSize: 12, color: '#b91c1c', marginBottom: 12, lineHeight: 1.5 }}>
                    기록을 삭제하면 <strong>복구할 수 없습니다.</strong><br />신중하게 진행해 주세요.
                  </div>

                  {!showDeleteConfirm ? (
                    <button onClick={() => { setShowDeleteConfirm(true); triggerShake(); }}
                      style={{ background: 'none', border: '2px solid #fca5a5', borderRadius: 12, padding: '11px 16px', fontSize: 13, fontWeight: 700, color: '#dc2626', cursor: 'pointer', fontFamily: 'inherit', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, transition: 'all 0.2s' }}>
                      <Icons.Trash />
                      이 기록 삭제하기
                    </button>
                  ) : (
                    <div className="danger-confirm fade-in">
                      <div style={{ fontSize: 13, fontWeight: 700, color: '#b91c1c', marginBottom: 4 }}>정말 삭제하시겠습니까?</div>
                      <div style={{ fontSize: 12, color: '#ef4444', marginBottom: 12, padding: '8px', background: '#fef2f2', borderRadius: 8 }}>
                        <strong>{formatDateShort(editingLog.timestamp)}</strong> / {editingLog.userName}<br />
                        <span style={{ opacity: 0.75 }}>이 기록이 영구적으로 삭제됩니다.</span>
                      </div>
                      <div style={{ display: 'flex', gap: 8 }}>
                        <button className="btn-cancel-sm" style={{ flex: 1 }} onClick={() => setShowDeleteConfirm(false)}>취소</button>
                        <button className="btn-danger" style={{ flex: 1 }} onClick={handleDelete} disabled={isSubmitting}>
                          <Icons.Trash />
                          {isSubmitting ? '삭제 중...' : '영구 삭제'}
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                <div style={{ height: 24 }} />
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}