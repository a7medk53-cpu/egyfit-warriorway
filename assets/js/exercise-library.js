/** EgyFit Warrior Way - Exercise Library Module */

// Comprehensive Lyfta-inspired exercise database (Mock)
const exercisesDB = [
  { id: 'bench-press', name: 'بنش برس بالبار', muscle: 'الصدر', equipment: 'بار', type: 'مركب', icon: '🏋️' },
  { id: 'incline-dumbbell-press', name: 'ضغط دمبل عالي', muscle: 'الصدر', equipment: 'دمبل', type: 'مركب', icon: '💪' },
  { id: 'cable-crossover', name: 'تفتيح كابل', muscle: 'الصدر', equipment: 'كابل', type: 'عزل', icon: '⚡' },
  { id: 'squat', name: 'سكوات بالبار', muscle: 'الأرجل', equipment: 'بار', type: 'مركب', icon: '🦵' },
  { id: 'leg-press', name: 'ضغط أرجل (Leg Press)', muscle: 'الأرجل', equipment: 'جهاز', type: 'مركب', icon: '🦾' },
  { id: 'romanian-deadlift', name: 'ديدليفت روماني (RDL)', muscle: 'الأرجل', equipment: 'بار', type: 'مركب', icon: '🏋️‍♂️' },
  { id: 'deadlift', name: 'ديدليفت', muscle: 'الظهر', equipment: 'بار', type: 'مركب', icon: '🏋️' },
  { id: 'pull-up', name: 'عقلة', muscle: 'الظهر', equipment: 'وزن الجسم', type: 'مركب', icon: '🦍' },
  { id: 'lat-pulldown', name: 'سحب أمامي', muscle: 'الظهر', equipment: 'كابل', type: 'مركب', icon: '⚡' },
  { id: 'barbell-row', name: 'تجديف بالبار', muscle: 'الظهر', equipment: 'بار', type: 'مركب', icon: '💪' },
  { id: 'shoulder-press-dumbbell', name: 'ضغط أكتاف دمبل', muscle: 'الأكتاف', equipment: 'دمبل', type: 'مركب', icon: '🦾' },
  { id: 'lateral-raise', name: 'رفرفة جانبي', muscle: 'الأكتاف', equipment: 'دمبل', type: 'عزل', icon: '🦅' },
  { id: 'bicep-curl-bar', name: 'طوي بايسبس بالبار', muscle: 'البايسبس', equipment: 'بار', type: 'عزل', icon: '💪' },
  { id: 'tricep-pushdown', name: 'سحب ترايسبس للأسفل', muscle: 'الترايسبس', equipment: 'كابل', type: 'عزل', icon: '⚡' },
  { id: 'crunch', name: 'كرنش بطن', muscle: 'البطن', equipment: 'وزن الجسم', type: 'عزل', icon: '🍫' }
];

let currentFilter = 'الكل';

function renderExercises(query = '') {
  const grid = document.getElementById('exercisesGrid');
  if (!grid) return;

  const filtered = exercisesDB.filter(ex => {
    const matchesMuscle = currentFilter === 'الكل' || ex.muscle === currentFilter;
    const matchesSearch = ex.name.includes(query) || ex.muscle.includes(query);
    return matchesMuscle && matchesSearch;
  });

  if (filtered.length === 0) {
    grid.innerHTML = '<p style="color:var(--text-muted); text-align:center; grid-column:1/-1; padding:20px;">لم يتم العثور على تمارين تطابق بحثك.</p>';
    return;
  }

  grid.innerHTML = filtered.map(ex => `
    <div class="ex-card" onclick='openExerciseDetails(${JSON.stringify(ex)})'>
      <div class="ex-thumb">${ex.icon}</div>
      <div class="ex-info">
        <div class="ex-title">${ex.name}</div>
        <div class="ex-meta">
          <span>${ex.muscle}</span>
          <span>• ${ex.equipment}</span>
        </div>
      </div>
    </div>
  `).join('');
}

function openExerciseDetails(ex) {
  document.getElementById('modalExTitle').textContent = ex.name;
  document.getElementById('modalExThumb').textContent = ex.icon;
  document.getElementById('modalExMuscle').textContent = 'العضلة: ' + ex.muscle;
  document.getElementById('modalExEquip').textContent = 'الأداة: ' + ex.equipment;
  
  // Store globally so startThisExercise can use it
  window.currentSelectedExercise = ex;
  
  openModal('exDetailsModal');
}

function startThisExercise() {
  if (window.currentSelectedExercise) {
    // Add to current workout or start a new one
    Storage.set('quickStartExercise', window.currentSelectedExercise);
    navigateTo('workout-logger.html');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('exSearch');
  if (searchInput) {
    searchInput.addEventListener('input', debounce((e) => renderExercises(e.target.value), 300));
  }

  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      currentFilter = e.target.getAttribute('data-filter');
      renderExercises(searchInput ? searchInput.value : '');
    });
  });

  renderExercises();
});
