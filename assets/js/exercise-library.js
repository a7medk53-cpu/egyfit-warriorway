/** EgyFit Warrior Way - Exercise Library Module */

// Comprehensive Lyfta-inspired exercise database (Mock)
const exercisesDB = [
  { id: 'bench-press', name: 'بنش برس بالبار', muscle: 'الصدر', equipment: 'بار', type: 'مركب', icon: '🏋️', gif: 'barbell_bench_press.gif' },
  { id: 'incline-dumbbell-press', name: 'ضغط دمبل عالي', muscle: 'الصدر', equipment: 'دمبل', type: 'مركب', icon: '💪', gif: 'incline_dumbbell_press.gif' },
  { id: 'cable-crossover', name: 'تفتيح كابل', muscle: 'الصدر', equipment: 'كابل', type: 'عزل', icon: '⚡', gif: 'low_cable_crossover.gif' },
  { id: 'squat', name: 'سكوات بالبار', muscle: 'الأرجل', equipment: 'بار', type: 'مركب', icon: '🦵', gif: 'barbell_squat.gif' },
  { id: 'leg-press', name: 'ضغط أرجل (Leg Press)', muscle: 'الأرجل', equipment: 'جهاز', type: 'مركب', icon: '🦾', gif: 'lever_horizontal_leg_press.gif' },
  { id: 'romanian-deadlift', name: 'ديدليفت روماني (RDL)', muscle: 'الأرجل', equipment: 'بار', type: 'مركب', icon: '🏋️‍♂️', gif: 'barbell_romanian_deadlift.gif' },
  { id: 'deadlift', name: 'ديدليفت', muscle: 'الظهر', equipment: 'بار', type: 'مركب', icon: '🏋️', gif: 'barbell_deadlift.gif' },
  { id: 'pull-up', name: 'عقلة', muscle: 'الظهر', equipment: 'وزن الجسم', type: 'مركب', icon: '🦍', gif: 'pull_up.gif' },
  { id: 'lat-pulldown', name: 'سحب أمامي', muscle: 'الظهر', equipment: 'كابل', type: 'مركب', icon: '⚡', gif: 'lat_pulldown.gif' },
  { id: 'barbell-row', name: 'تجديف بالبار', muscle: 'الظهر', equipment: 'بار', type: 'مركب', icon: '💪', gif: 'barbell_bent_over_row.gif' },
  { id: 'shoulder-press-dumbbell', name: 'ضغط أكتاف دمبل', muscle: 'الأكتاف', equipment: 'دمبل', type: 'مركب', icon: '🦾', gif: 'dumbbell_shoulder_press.gif' },
  { id: 'lateral-raise', name: 'رفرفة جانبي', muscle: 'الأكتاف', equipment: 'دمبل', type: 'عزل', icon: '🦅', gif: 'dumbbell_lateral_raise.gif' },
  { id: 'bicep-curl-bar', name: 'طوي بايسبس بالبار', muscle: 'البايسبس', equipment: 'بار', type: 'عزل', icon: '💪', gif: 'barbell_curl.gif' },
  { id: 'tricep-pushdown', name: 'سحب ترايسبس للأسفل', muscle: 'الترايسبس', equipment: 'كابل', type: 'عزل', icon: '⚡', gif: 'pushdown.gif' },
  { id: 'crunch', name: 'كرنش بطن', muscle: 'البطن', equipment: 'وزن الجسم', type: 'عزل', icon: '🍫', gif: 'floor_crunch.gif' }
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
      <div class="ex-thumb">${ex.gif ? `<img src="../assets/New folder/${ex.gif}" alt="${ex.name}" style="width:100%; height:100%; object-fit:cover;">` : ex.icon}</div>
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
  if (ex.gif) {
    document.getElementById('modalExThumb').innerHTML = `<img src="../assets/New folder/${ex.gif}" alt="${ex.name}" style="max-width:100%; max-height:250px; border-radius:15px; border: 1px solid var(--accent-gold);">`;
  } else {
    document.getElementById('modalExThumb').innerHTML = ex.icon;
  }
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
