/** EgyFit Warrior Way - Charts & Analytics Module */

class ChartsManager {
  constructor() {
    this.userId = auth.currentUser?.uid;
    this.workouts = [];
    this.volumeChartInstance = null;
    this.ormChartInstance = null;
    
    // Set Chart.js defaults for Dark Theme
    Chart.defaults.color = '#8892b0';
    Chart.defaults.borderColor = 'rgba(212, 175, 55, 0.1)';
    Chart.defaults.font.family = "'Tajawal', sans-serif";

    if (document.getElementById('volumeChart')) {
      this.initProgressPage();
    }
  }

  async initProgressPage() {
    if (!this.userId) return;
    try {
      const snapshot = await db.collection('users').doc(this.userId).collection('history').orderBy('date', 'asc').get();
      this.workouts = snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          date: data.date ? new Date(data.date.seconds * 1000) : new Date(),
          exercises: data.exercises || [],
          totalVolume: this.calculateWorkoutVolume(data.exercises)
        };
      });

      this.updateOverviewStats();
      this.renderCalendar();
      this.renderVolumeChart();
      this.updateOrmChart();
    } catch (error) {
      console.error("Error fetching history for charts", error);
    }
  }

  calculateWorkoutVolume(exercises) {
    if (!exercises) return 0;
    return exercises.reduce((sum, ex) => {
      return sum + (ex.sets || []).reduce((setSum, set) => setSum + ((set.reps || 0) * (set.weight || 0)), 0);
    }, 0);
  }

  updateOverviewStats() {
    document.getElementById('statWorkouts').textContent = this.workouts.length;
    const totalVol = this.workouts.reduce((sum, w) => sum + w.totalVolume, 0);
    document.getElementById('statVolume').textContent = (totalVol / 1000).toFixed(1) + 'k'; // in tons
  }

  renderCalendar() {
    const wrapper = document.getElementById('calendarHeatmap');
    if (!wrapper) return;
    
    // Generate last 30 days
    const today = new Date();
    const days = [];
    for(let i = 29; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      days.push(d);
    }

    const html = `<div class="cal-month">` + days.map(d => {
      const dateStr = d.toISOString().split('T')[0];
      // Check if worked out on this date
      const workoutCount = this.workouts.filter(w => w.date.toISOString().split('T')[0] === dateStr).length;
      
      let className = 'cal-day';
      if (workoutCount === 1) className += ' active';
      if (workoutCount > 1) className += ' active-high';

      return `<div class="${className}" title="${dateStr} - ${workoutCount} تمارين">${d.getDate()}</div>`;
    }).join('') + `</div>`;

    wrapper.innerHTML = html;
  }

  renderVolumeChart() {
    const ctx = document.getElementById('volumeChart');
    if (!ctx) return;

    // Group by week or just show last 10 workouts
    const recentWorkouts = this.workouts.slice(-10);
    const labels = recentWorkouts.map(w => w.date.toLocaleDateString('ar-EG', {month: 'short', day: 'numeric'}));
    const data = recentWorkouts.map(w => w.totalVolume);

    if (this.volumeChartInstance) this.volumeChartInstance.destroy();

    this.volumeChartInstance = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels.length ? labels : ['لا يوجد بيانات'],
        datasets: [{
          label: 'الحجم التدريبي (كجم)',
          data: data.length ? data : [0],
          backgroundColor: 'rgba(212, 175, 55, 0.5)',
          borderColor: '#d4af37',
          borderWidth: 1,
          borderRadius: 4
        }]
      },
      options: {
        responsive: true,
        plugins: { legend: { display: false } },
        scales: {
          y: { beginAtZero: true }
        }
      }
    });
  }

  updateOrmChart() {
    const ctx = document.getElementById('ormChart');
    if (!ctx) return;
    
    const exerciseName = document.getElementById('ormExerciseSelect').value;
    
    // Extract 1RM history for this specific exercise
    const history = [];
    this.workouts.forEach(w => {
      const ex = w.exercises.find(e => e.name === exerciseName);
      if (ex && ex.sets && ex.sets.length > 0) {
        // Find best 1RM in this workout using Epley
        let best1RM = 0;
        ex.sets.forEach(set => {
          if (set.weight > 0 && set.reps > 0) {
            let orm = set.reps === 1 ? set.weight : set.weight * (1 + (set.reps / 30));
            if (orm > best1RM) best1RM = orm;
          }
        });
        if (best1RM > 0) {
          history.push({ date: w.date.toLocaleDateString('ar-EG', {month: 'short', day: 'numeric'}), orm: best1RM.toFixed(1) });
        }
      }
    });

    const labels = history.map(h => h.date);
    const data = history.map(h => h.orm);

    if (this.ormChartInstance) this.ormChartInstance.destroy();

    this.ormChartInstance = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels.length ? labels : ['لا يوجد بيانات'],
        datasets: [{
          label: 'أقصى وزن (1RM)',
          data: data.length ? data : [0],
          borderColor: '#ff6b6b',
          backgroundColor: 'rgba(255, 107, 107, 0.1)',
          borderWidth: 2,
          fill: true,
          tension: 0.4,
          pointBackgroundColor: '#ff6b6b'
        }]
      },
      options: {
        responsive: true,
        plugins: { legend: { display: false } },
        scales: {
          y: { beginAtZero: false }
        }
      }
    });
  }
}

// Global instance
let chartsManager;
document.addEventListener('DOMContentLoaded', () => {
  chartsManager = new ChartsManager();
  window.chartsManager = chartsManager;
});
