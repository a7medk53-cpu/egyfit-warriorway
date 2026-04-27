/** EgyFit Warrior Way - Utility Functions */
function formatDateArabic(date = new Date()) {
  return date.toLocaleDateString('ar-EG', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
}
function formatDuration(seconds) {
  const h = Math.floor(seconds / 3600), m = Math.floor((seconds % 3600) / 60), s = seconds % 60;
  return h > 0 ? `${h}:${m.toString().padStart(2,'0')}:${s.toString().padStart(2,'0')}` : `${m}:${s.toString().padStart(2,'0')}`;
}
function formatWeight(weight, unit = 'kg') { return (!weight && weight !== 0) ? '--' : `${weight} ${unit}`; }
function generateId() { return Date.now().toString(36) + Math.random().toString(36).substr(2); }
function debounce(func, wait) { let timeout; return function(...args) { clearTimeout(timeout); timeout = setTimeout(() => func(...args), wait); }; }
const Storage = {
  get: (key, def = null) => { try { const item = localStorage.getItem(`egyfit_${key}`); return item ? JSON.parse(item) : def; } catch { return def; } },
  set: (key, val) => { try { localStorage.setItem(`egyfit_${key}`, JSON.stringify(val)); return true; } catch { return false; } },
  remove: (key) => localStorage.removeItem(`egyfit_${key}`)
};
function navigateTo(page) { window.location.href = page; }
function goBack() { if (window.history.length > 1) window.history.back(); else window.location.href = 'dashboard.html'; }
function openModal(modalId) { document.getElementById(modalId)?.classList.add('active'); document.body.style.overflow = 'hidden'; }
function closeModal(modalId) { document.getElementById(modalId)?.classList.remove('active'); document.body.style.overflow = ''; }
function showToast(message, type = 'info', duration = 3000) {
  const existing = document.getElementById('toast-notification'); if (existing) existing.remove();
  const toast = document.createElement('div'); toast.id = 'toast-notification';
  toast.style.cssText = `position:fixed;bottom:100px;left:50%;transform:translateX(-50%);background:${type==='error'?'#ff6b6b':type==='success'?'#4ade80':'#4da6ff'};color:${type==='info'?'#000':'#fff'};padding:12px 24px;border-radius:12px;font-weight:500;z-index:1000;animation:slideUp 0.3s ease;box-shadow:0 10px 40px rgba(0,0,0,0.3)`;
  toast.textContent = message; document.body.appendChild(toast);
  setTimeout(() => { toast.style.animation = 'slideDown 0.3s ease'; setTimeout(() => toast.remove(), 300); }, duration);
}
const style = document.createElement('style'); style.textContent = `@keyframes slideUp{from{opacity:0;transform:translateX(-50%) translateY(20px)}to{opacity:1;transform:translateX(-50%) translateY(0)}}@keyframes slideDown{from{opacity:1;transform:translateX(-50%) translateY(0)}to{opacity:0;transform:translateX(-50%) translateY(20px)}}`; document.head.appendChild(style);
window.formatDateArabic = formatDateArabic; window.formatDuration = formatDuration; window.formatWeight = formatWeight;
window.generateId = generateId; window.debounce = debounce; window.Storage = Storage;
window.navigateTo = navigateTo; window.goBack = goBack; window.openModal = openModal; window.closeModal = closeModal; window.showToast = showToast;
