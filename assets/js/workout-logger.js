/** EgyFit Warrior Way - Workout Logger Module */
class WorkoutLogger {
  constructor() { this.userId = auth.currentUser?.uid; this.workoutId = null; this.exercises = []; this.restTimer = null; this.restTimerSeconds = 0; this.isTimerRunning = false; this.init(); }
  init() { if (!this.userId) { window.location.href = 'login.html'; return; } this.setDateDisplay(); this.startWorkoutTimer(); this.setupEventListeners(); this.loadExerciseLibrary(); }
  setDateDisplay() { const dateEl = document.getElementById('workoutDate'); if (dateEl) dateEl.querySelector('span').textContent = formatDateArabic(); }
  startWorkoutTimer() { this.workoutStartTime = Date.now(); this.timerInterval = setInterval(() => { const elapsed = Math.floor((Date.now() - this.workoutStartTime) / 1000); const durationEl = document.querySelector('#workoutDuration span'); if (durationEl) durationEl.textContent = formatDuration(elapsed); }, 1000); }
  setupEventListeners() {
    const searchInput = document.getElementById('exerciseSearch');
    if (searchInput) searchInput.addEventListener('input', debounce((e) => this.searchExercises(e.target.value), 300));
    window.toggleRestTimer = () => this.toggleRestTimer(); window.setRestTime = (seconds) => this.setRestTime(seconds);
    window.resetRestTimer = () => this.resetRestTimer(); window.closeRestTimer = () => this.closeRestTimer();
  }
  addExercise(exerciseData) {
    const template = document.getElementById('exerciseTemplate'); const clone = template.content.cloneNode(true);
    const card = clone.querySelector('.exercise-card'); card.dataset.exerciseId = exerciseData.id || generateId();
    card.querySelector('.exercise-name').textContent = exerciseData.name; card.querySelector('.exercise-muscle').textContent = exerciseData.muscle || '';
    
    // Add History Section
    const historyDiv = document.createElement('div');
    historyDiv.className = 'exercise-history';
    historyDiv.style.cssText = 'font-size:0.85rem; color:var(--text-muted); margin-bottom:10px; padding:8px; background:rgba(0,0,0,0.2); border-radius:6px;';
    historyDiv.innerHTML = `<span>أفضل 1RM: <strong style="color:var(--accent-gold)">${this.calculate1RM(0,0)}</strong></span> | <span>آخر أداء: --</span>`;
    card.insertBefore(historyDiv, card.querySelector('.sets-container'));

    document.getElementById('exercisesList').appendChild(card); this.addSet(card.querySelector('.add-set-btn'));
    closeAddExerciseModal(); showToast(`تم إضافة: ${exerciseData.name}`, 'success');
  }

  // Epley formula for 1RM calculation
  calculate1RM(weight, reps) {
    if (!weight || !reps) return '--';
    if (reps === 1) return weight.toFixed(1) + ' كجم';
    return (weight * (1 + (reps / 30))).toFixed(1) + ' كجم';
  }
  addSet(btn) { const template = document.getElementById('setTemplate'); const clone = template.content.cloneNode(true); const setsContainer = btn.previousElementSibling; setsContainer.appendChild(clone); }
  removeSet(btn) { const setRow = btn.closest('.set-row'); const exerciseCard = btn.closest('.exercise-card'); setRow.remove(); if (exerciseCard.querySelectorAll('.set-row').length === 0) exerciseCard.remove(); }
  removeExercise(btn) { if (confirm('هل تريد حذف هذا التمرين؟')) btn.closest('.exercise-card').remove(); }
  async searchExercises(query) {
    const resultsEl = document.getElementById('exerciseSearchResults');
    if (!query || query.length < 2) { resultsEl.innerHTML = ''; return; }
    const mockExercises = [
      { id: 'bench-press', name: 'بنش برس', muscle: 'صدر', category: 'دفع' }, { id: 'squat', name: 'سكوات', muscle: 'أرجل', category: 'أرجل' },
      { id: 'deadlift', name: 'ديدليفت', muscle: 'ظهر', category: 'سحب' }, { id: 'shoulder-press', name: 'ضغط أكتاف', muscle: 'أكتاف', category: 'دفع' },
      { id: 'bicep-curl', name: 'بايسب كرل', muscle: 'بايسب', category: 'عزل' }, { id: 'tricep-pushdown', name: 'ترايسب داون', muscle: 'ترايسب', category: 'عزل' },
      { id: 'lat-pulldown', name: 'لات بولداون', muscle: 'ظهر', category: 'سحب' }, { id: 'leg-press', name: 'ليج برس', muscle: 'أرجل', category: 'أرجل' }
    ];
    const filtered = mockExercises.filter(ex => ex.name.includes(query) || ex.muscle?.includes(query));
    if (filtered.length === 0) { resultsEl.innerHTML = '<p style="color:#666;padding:10px">لا توجد نتائج</p>'; return; }
    resultsEl.innerHTML = filtered.map(ex => `<div class="search-result-item" onclick='logger.addExercise(${JSON.stringify(ex)})'><strong>${ex.name}</strong><small style="color:#888">${ex.muscle} • ${ex.category}</small></div>`).join('');
    if (!document.getElementById('search-results-style')) { const style = document.createElement('style'); style.id = 'search-results-style'; style.textContent = `.search-result-item{padding:10px 15px;border-radius:10px;cursor:pointer;transition:background 0.2s;display:flex;justify-content:space-between;align-items:center}.search-result-item:hover{background:var(--bg-tertiary)}`; document.head.appendChild(style); }
  }
  toggleRestTimer() { const popup = document.getElementById('restTimerPopup'); popup.classList.toggle('active'); if (popup.classList.contains('active') && !this.isTimerRunning) this.resetRestTimer(); }
  setRestTime(seconds) { this.restTimerSeconds = seconds; this.startRestTimer(); }
  startRestTimer() {
    if (this.restTimer) clearInterval(this.restTimer); this.isTimerRunning = true;
    const display = document.getElementById('restTimerDisplay'); const btn = document.getElementById('restTimerBtn');
    this.restTimer = setInterval(() => {
      if (this.restTimerSeconds <= 0) { this.stopRestTimer(); new Audio('https://actions.google.com/sounds/v1/alarms/beep_short.ogg').play().catch(() => {}); showToast('⏰ انتهى وقت الراحة!', 'info', 2000); return; }
      this.restTimerSeconds--; display.textContent = formatDuration(this.restTimerSeconds);
      btn.querySelector('#timerDisplay').textContent = formatDuration(this.restTimerSeconds);
      if (this.restTimerSeconds <= 10) { display.style.color = '#ff6b6b'; display.classList.add('pulse'); }
    }, 1000);
  }
  stopRestTimer() { if (this.restTimer) { clearInterval(this.restTimer); this.restTimer = null; } this.isTimerRunning = false; document.getElementById('restTimerDisplay').style.color = ''; document.getElementById('restTimerDisplay').classList.remove('pulse'); }
  resetRestTimer() { this.stopRestTimer(); this.restTimerSeconds = 0; document.getElementById('restTimerDisplay').textContent = '00:00'; }
  closeRestTimer() { this.stopRestTimer(); document.getElementById('restTimerPopup').classList.remove('active'); }
  async saveWorkoutDraft() { showToast('💾 تم الحفظ كمسودة', 'success'); }
  async finishWorkout() {
    const exercises = this.collectExercises(); if (exercises.length === 0) { showToast('⚠️ أضف تمرين واحد على الأقل', 'error'); return; }
    const workoutData = { name: document.getElementById('workoutName').value || 'تمرين بدون اسم', date: firebase.firestore.FieldValue.serverTimestamp(), duration: Math.floor((Date.now() - this.workoutStartTime) / 1000), exercises: exercises, notes: '', completed: true };
    try {
      await db.collection('users').doc(this.userId).collection('workouts').add(workoutData);
      await this.updateUserStats(workoutData);
      showToast('✅ تم حفظ التمرين بنجاح! 🎉', 'success');
      clearInterval(this.timerInterval); setTimeout(() => { window.location.href = 'progress.html'; }, 1500);
    } catch (error) { console.error('Error saving workout:', error); showToast('❌ فشل حفظ التمرين', 'error'); }
  }
  collectExercises() {
    const exercises = [];
    document.querySelectorAll('.exercise-card').forEach(card => {
      const sets = []; card.querySelectorAll('.set-row').forEach(row => {
        const type = row.querySelector('.set-type')?.value || 'normal';
        const reps = row.querySelector('.set-reps').value; const weight = row.querySelector('.set-weight').value; const rpe = row.querySelector('.set-rpe').value;
        if (reps || weight) sets.push({ type: type, reps: reps ? parseInt(reps) : null, weight: weight ? parseFloat(weight) : null, rpe: rpe ? parseInt(rpe) : null });
      });
      if (sets.length > 0) exercises.push({ id: card.dataset.exerciseId, name: card.querySelector('.exercise-name').textContent, muscle: card.querySelector('.exercise-muscle').textContent, sets: sets });
    });
    return exercises;
  }
  async updateUserStats(workout) {
    const totalVolume = workout.exercises.reduce((sum, ex) => sum + ex.sets.reduce((s, set) => s + ((set.reps || 0) * (set.weight || 0)), 0), 0);
    await db.collection('users').doc(this.userId).update({ 'stats.totalWorkouts': firebase.firestore.FieldValue.increment(1), 'stats.totalVolume': firebase.firestore.FieldValue.increment(totalVolume), 'stats.lastWorkout': firebase.firestore.FieldValue.serverTimestamp() });
  }
  
  loadExerciseLibrary() {
    const routine = Storage.get('activeRoutine');
    if (routine) {
      document.getElementById('workoutName').value = routine.name;
      routine.exercises.forEach(ex => {
        this.addExercise(ex);
      });
      Storage.remove('activeRoutine');
    }
    const quickStart = Storage.get('quickStartExercise');
    if (quickStart) {
      this.addExercise(quickStart);
      Storage.remove('quickStartExercise');
    }
  }
}
window.addExercise = () => openModal('addExerciseModal');
window.closeAddExerciseModal = () => closeModal('addExerciseModal');
window.openMuscleMapFromLogger = () => { closeModal('addExerciseModal'); openModal('muscleMapModal'); if (window.MuscleMap && !window.muscleMapInstance) window.muscleMapInstance = new MuscleMap('muscleMapContainer'); };
let logger;
document.addEventListener('DOMContentLoaded', () => { if (document.querySelector('.workout-info')) { logger = new WorkoutLogger(); window.logger = logger; } });
