/** EgyFit Warrior Way - Programs Module */
class ProgramsManager {
  constructor() {
    this.userId = auth.currentUser?.uid;
    this.myRoutines = [];
    this.currentEditingRoutine = { id: null, name: '', exercises: [] };
    this.presetPrograms = [
      { id: 'ppl-push', name: 'Push (دفع)', level: 'متوسط', days: 'يوم 1', exercises: [{name: 'بنش برس', sets: 4}, {name: 'ضغط أكتاف دمبل', sets: 3}, {name: 'ترايسبس بوش داون', sets: 3}] },
      { id: 'ppl-pull', name: 'Pull (سحب)', level: 'متوسط', days: 'يوم 2', exercises: [{name: 'عقلة', sets: 4}, {name: 'تجديف بار', sets: 3}, {name: 'بايسبس كيرل بار', sets: 3}] },
      { id: 'ppl-legs', name: 'Legs (أرجل)', level: 'متوسط', days: 'يوم 3', exercises: [{name: 'سكوات بار', sets: 4}, {name: 'ليج برس', sets: 3}, {name: 'رفرفة سمانة', sets: 4}] },
      { id: 'stronglifts', name: 'StrongLifts 5x5 A', level: 'مبتدئ', days: 'قوة', exercises: [{name: 'سكوات', sets: 5}, {name: 'بنش برس', sets: 5}, {name: 'تجديف بار', sets: 5}] }
    ];
    this.init();
  }

  async init() {
    if (!this.userId) { window.location.href = 'login.html'; return; }
    await this.loadMyRoutines();
    this.renderProPrograms();
    
    // Tab switching logic
    window.switchTab = (tabId) => {
      document.querySelectorAll('.tab-content').forEach(el => el.classList.add('hidden'));
      document.querySelectorAll('.tab-btn').forEach(el => el.classList.remove('active'));
      document.getElementById(tabId).classList.remove('hidden');
      event.currentTarget.classList.add('active');
    };
  }

  async loadMyRoutines() {
    const grid = document.getElementById('myRoutinesGrid');
    try {
      const snapshot = await db.collection('users').doc(this.userId).collection('routines').get();
      this.myRoutines = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      this.renderMyRoutines();
    } catch (error) {
      console.error('Error loading routines:', error);
      showToast('فشل تحميل برامجك', 'error');
    }
  }

  renderMyRoutines() {
    const grid = document.getElementById('myRoutinesGrid');
    // Keep the "Create" card, remove others
    const createCard = grid.querySelector('.create-card').outerHTML;
    
    const routinesHTML = this.myRoutines.map(routine => `
      <div class="program-card">
        <div class="program-header">
          <h3 class="program-title">${routine.name}</h3>
          <div style="display:flex;gap:5px;">
            <button class="btn-icon" onclick="programsManager.editRoutine('${routine.id}')" title="تعديل">✏️</button>
            <button class="btn-icon" onclick="programsManager.deleteRoutine('${routine.id}')" title="حذف" style="color:var(--accent-red)">🗑️</button>
          </div>
        </div>
        <div class="program-meta">
          <span>💪 ${routine.exercises?.length || 0} تمارين</span>
        </div>
        <div class="program-exercises">
          ${(routine.exercises || []).slice(0, 3).map(e => e.name).join(', ')}${(routine.exercises?.length > 3) ? '...' : ''}
        </div>
        <div class="program-actions">
          <button class="btn-start" onclick="programsManager.startRoutine('${routine.id}')">▶ بدء التمرين</button>
        </div>
      </div>
    `).join('');
    
    grid.innerHTML = createCard + routinesHTML;
  }

  renderProPrograms() {
    const grid = document.getElementById('proRoutinesGrid');
    grid.innerHTML = this.presetPrograms.map(prog => `
      <div class="program-card">
        <div class="program-header">
          <h3 class="program-title">${prog.name}</h3>
          <span style="background:rgba(212,175,55,0.2); color:var(--accent-gold); padding:2px 8px; border-radius:10px; font-size:0.8rem;">${prog.level}</span>
        </div>
        <div class="program-meta">
          <span>📅 ${prog.days}</span>
          <span>💪 ${prog.exercises.length} تمارين</span>
        </div>
        <div class="program-exercises">
          ${prog.exercises.map(e => `${e.sets}x ${e.name}`).join('<br>')}
        </div>
        <div class="program-actions">
          <button class="btn-start" onclick="programsManager.startPreset('${prog.id}')">▶ بدء البرنامج</button>
        </div>
      </div>
    `).join('');
  }

  openCreateModal() {
    this.currentEditingRoutine = { id: null, name: '', exercises: [] };
    document.getElementById('routineModalTitle').textContent = 'إنشاء روتين جديد';
    document.getElementById('routineName').value = '';
    this.renderEditingExercises();
    openModal('createRoutineModal');
  }

  editRoutine(id) {
    const routine = this.myRoutines.find(r => r.id === id);
    if (!routine) return;
    this.currentEditingRoutine = JSON.parse(JSON.stringify(routine)); // Deep copy
    document.getElementById('routineModalTitle').textContent = 'تعديل الروتين';
    document.getElementById('routineName').value = routine.name;
    this.renderEditingExercises();
    openModal('createRoutineModal');
  }

  renderEditingExercises() {
    const list = document.getElementById('routineExercisesList');
    if (this.currentEditingRoutine.exercises.length === 0) {
      list.innerHTML = '<p style="text-align:center; color:var(--text-muted); padding:20px;">لم يتم إضافة تمارين بعد</p>';
      return;
    }
    list.innerHTML = this.currentEditingRoutine.exercises.map((ex, index) => `
      <div class="routine-ex-item">
        <div style="font-weight:bold;">${ex.name}</div>
        <button onclick="programsManager.removeExerciseFromRoutine(${index})" style="background:none; border:none; color:var(--accent-red); cursor:pointer;">✕</button>
      </div>
    `).join('');
  }

  // Mock function until exercise library is fully integrated
  openAddExercise() {
    const exName = prompt("أدخل اسم التمرين (مؤقتاً):");
    if (exName) {
      this.currentEditingRoutine.exercises.push({ id: generateId(), name: exName });
      this.renderEditingExercises();
    }
  }

  removeExerciseFromRoutine(index) {
    this.currentEditingRoutine.exercises.splice(index, 1);
    this.renderEditingExercises();
  }

  async saveRoutine() {
    const name = document.getElementById('routineName').value.trim();
    if (!name) { showToast('يرجى إدخال اسم الروتين', 'error'); return; }
    
    this.currentEditingRoutine.name = name;
    
    try {
      if (this.currentEditingRoutine.id) {
        // Update
        await db.collection('users').doc(this.userId).collection('routines').doc(this.currentEditingRoutine.id).update(this.currentEditingRoutine);
        showToast('تم التحديث بنجاح', 'success');
      } else {
        // Create
        this.currentEditingRoutine.id = generateId(); // Temporary client-side ID logic
        await db.collection('users').doc(this.userId).collection('routines').doc(this.currentEditingRoutine.id).set(this.currentEditingRoutine);
        showToast('تم إنشاء الروتين', 'success');
      }
      closeModal('createRoutineModal');
      await this.loadMyRoutines();
    } catch (error) {
      console.error('Error saving routine:', error);
      showToast('خطأ في الحفظ', 'error');
    }
  }

  async deleteRoutine(id) {
    if (!confirm('هل أنت متأكد من حذف هذا الروتين؟')) return;
    try {
      await db.collection('users').doc(this.userId).collection('routines').doc(id).delete();
      showToast('تم الحذف', 'success');
      await this.loadMyRoutines();
    } catch (error) {
      console.error('Error deleting routine:', error);
      showToast('خطأ في الحذف', 'error');
    }
  }

  startRoutine(id) {
    // Save routine to localStorage to be loaded by workout-logger
    const routine = this.myRoutines.find(r => r.id === id);
    if (routine) {
      Storage.set('activeRoutine', routine);
      navigateTo('workout-logger.html');
    }
  }

  startPreset(id) {
    const prog = this.presetPrograms.find(p => p.id === id);
    if (prog) {
      Storage.set('activeRoutine', prog);
      navigateTo('workout-logger.html');
    }
  }
}

let programsManager;
document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('myRoutinesGrid')) {
    programsManager = new ProgramsManager();
    window.programsManager = programsManager;
    window.openCreateRoutineModal = () => programsManager.openCreateModal();
    window.saveRoutine = () => programsManager.saveRoutine();
    window.openAddExerciseToRoutine = () => programsManager.openAddExercise();
  }
});
