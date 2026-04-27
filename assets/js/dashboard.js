/** EgyFit Warrior Way - Dashboard Module */
class WarriorDashboard {
  constructor() { this.userId = auth.currentUser?.uid; this.userData = null; this.init(); }
  async init() {
    if (!this.userId) { window.location.href = 'login.html'; return; }
    await this.loadUserData(); this.setDateDisplay(); this.renderStats(); this.renderWeeklyChart(); this.renderRecentWorkouts(); this.setupEventListeners();
  }
  async loadUserData() {
    try {
      const doc = await db.collection('users').doc(this.userId).get(); this.userData = doc.data();
      const name = this.userData?.profile?.name || auth.currentUser?.displayName || 'يا محارب';
      document.getElementById('welcomeMsg').textContent = `أهلاً بك، ${name}! 👋`;
    } catch (error) { console.error('Error loading user data:', error); showToast('فشل تحميل البيانات', 'error'); }
  }
  setDateDisplay() { const dateEl = document.querySelector('#dateDisplay span'); if (dateEl) dateEl.textContent = formatDateArabic(); }
  renderStats() {
    const stats = [
      { label: 'آخر وزن', value: this.userData?.profile?.weight ? `${this.userData.profile.weight} كجم` : '--', icon: '⚖️' },
      { label: 'تمارين هذا الأسبوع', value: this.userData?.stats?.weeklyWorkouts || '0', icon: '💪' },
      { label: 'أفضل إنجاز', value: 'بنش 80كجم', icon: '🏆' },
      { label: 'سلسلة الأيام', value: `${this.userData?.stats?.currentStreak || 0} أيام 🔥`, icon: '📅' }
    ];
    const container = document.getElementById('statsGrid');
    if (container) container.innerHTML = stats.map(stat => `<div class="stat-card fade-in"><div class="stat-icon">${stat.icon}</div><div class="stat-value">${stat.value}</div><div class="stat-label">${stat.label}</div></div>`).join('');
  }
  renderWeeklyChart() {
    const ctx = document.getElementById('weeklyChart'); if (!ctx) return;
    const labels = ['سبت', 'أحد', 'اثنين', 'ثلاثاء', 'أربعاء', 'خميس', 'جمعة'];
    const data = [1200, 1500, 0, 1800, 2000, 0, 1600];
    new Chart(ctx, { type: 'line', data: { labels: labels, datasets: [{ label: 'الحجم التدريبي (كجم)', data: data, borderColor: '#ffd700', backgroundColor: 'rgba(255, 215, 0, 0.1)', borderWidth: 3, pointBackgroundColor: '#ffd700', pointRadius: 4, pointHoverRadius: 6, tension: 0.4, fill: true }] }, options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true, grid: { color: 'rgba(255,255,255,0.1)' }, ticks: { color: '#aaa' } }, x: { grid: { display: false }, ticks: { color: '#aaa' } } } } });
  }
  async renderRecentWorkouts() {
    const container = document.getElementById('recentWorkoutsList'); if (!container) return;
    try {
      const snapshot = await db.collection('users').doc(this.userId).collection('workouts').orderBy('date', 'desc').limit(3).get();
      if (snapshot.empty) { container.innerHTML = '<p style="color:#666;text-align:center;padding:20px">لم تسجل أي تمارين بعد 💪</p>'; return; }
      const workouts = []; snapshot.forEach(doc => workouts.push({ id: doc.id, ...doc.data() }));
      container.innerHTML = workouts.map(workout => `<div class="workout-item fade-in" onclick="viewWorkout('${workout.id}')"><div class="workout-info"><h4>${workout.name || 'تمرين بدون اسم'}</h4><p>${new Date(workout.date?.toDate()).toLocaleDateString('ar-EG')}</p></div><div class="workout-stats"><span>${workout.exercises?.length || 0} تمارين</span><small>${formatDuration(workout.duration || 0)}</small></div></div>`).join('');
    } catch (error) { console.error('Error fetching workouts:', error); container.innerHTML = '<p style="color:#ff6b6b">فشل تحميل التمارين</p>'; }
  }
  setupEventListeners() {
    window.toggleSidebar = () => document.getElementById('sidebar')?.classList.toggle('active');
    document.addEventListener('click', (e) => {
      const sidebar = document.getElementById('sidebar'); const menuBtn = document.querySelector('.menu-btn');
      if (sidebar?.classList.contains('active') && !sidebar.contains(e.target) && !menuBtn?.contains(e.target)) sidebar.classList.remove('active');
    });
    document.querySelectorAll('.nav-item, .nav-link').forEach(link => {
      link.addEventListener('click', function() { document.querySelectorAll('.nav-item, .nav-link').forEach(l => l.classList.remove('active')); this.classList.add('active'); });
    });
    const chatForm = document.getElementById('chatForm');
    if (chatForm) chatForm.addEventListener('submit', async (e) => {
      e.preventDefault(); const input = document.getElementById('chatInput'); const message = input.value.trim(); if (!message) return;
      addChatMessage(message, 'user'); input.value = '';
      const typingId = addChatMessage('جاري التفكير...', 'ai', true);
      setTimeout(() => { removeChatMessage(typingId); addChatMessage('شكراً لسؤالك! 🤖 هذه الميزة ستكون متاحة قريباً مع المدرب الذكي.', 'ai'); }, 1500);
    });
  }
}
function addChatMessage(text, sender, isTyping = false) {
  const container = document.getElementById('chatMessages'); if (!container) return null;
  const id = 'msg-' + Date.now(); const msg = document.createElement('div');
  msg.className = `message ${sender} ${isTyping ? 'typing' : ''}`; msg.id = id; msg.textContent = text;
  container.appendChild(msg); container.scrollTop = container.scrollHeight; return isTyping ? id : null;
}
function removeChatMessage(id) { document.getElementById(id)?.remove(); }
window.startNewWorkout = () => navigateTo('workout-logger.html');
window.viewExerciseLibrary = () => navigateTo('exercise-library-app.html');
window.viewPrograms = () => navigateTo('programs.html');
window.goToProfile = () => showToast('صفحة الملف الشخصي قريباً 🚧', 'info');
window.openAICoach = () => openModal('aiCoachModal');
window.closeAICoach = () => closeModal('aiCoachModal');
window.openMuscleMap = () => { openModal('muscleMapModal'); if (window.MuscleMap && !window.muscleMapInstance) window.muscleMapInstance = new MuscleMap('muscleMapContainer'); };
window.closeMuscleMap = () => closeModal('muscleMapModal');
window.viewWorkout = (id) => showToast('عرض تفاصيل التمرين: ' + id, 'info');
document.addEventListener('DOMContentLoaded', () => { if (document.body.querySelector('.main-content')) window.dashboard = new WarriorDashboard(); });
