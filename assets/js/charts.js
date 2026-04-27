/** EgyFit Warrior Way - Charts Module */
const WarriorCharts = {
  defaults: {
    responsive: true, maintainAspectRatio: false,
    plugins: { legend: { labels: { font: { family: 'Segoe UI, Tahoma, sans-serif' }, color: '#aaa' } } },
    scales: {
      x: { ticks: { color: '#aaa', font: { family: 'Segoe UI, Tahoma, sans-serif' } }, grid: { color: 'rgba(255,255,255,0.1)' } },
      y: { ticks: { color: '#aaa', font: { family: 'Segoe UI, Tahoma, sans-serif' } }, grid: { color: 'rgba(255,255,255,0.1)' } }
    }
  },
  createProgressChart(canvasId, labels, data, options = {}) {
    const ctx = document.getElementById(canvasId); if (!ctx) return null;
    return new Chart(ctx.getContext('2d'), {
      type: 'line',
      data: { labels: labels, datasets: [{ label: options.label || 'التقدم', data: data, borderColor: options.color || '#ffd700', backgroundColor: options.fillColor || 'rgba(255, 215, 0, 0.1)', borderWidth: 3, pointBackgroundColor: options.color || '#ffd700', pointRadius: 4, pointHoverRadius: 6, tension: 0.4, fill: true }] },
      options: { ...this.defaults, ...options.chartOptions }
    });
  },
  createMuscleChart(canvasId, labels, data, options = {}) {
    const ctx = document.getElementById(canvasId); if (!ctx) return null;
    return new Chart(ctx.getContext('2d'), {
      type: 'bar',
      data: { labels: labels, datasets: [{ label: options.label || 'الحجم التدريبي', data: data, backgroundColor: options.colors || ['rgba(255, 215, 0, 0.8)', 'rgba(77, 166, 255, 0.8)', 'rgba(74, 222, 128, 0.8)', 'rgba(255, 107, 107, 0.8)'], borderColor: options.borderColors || ['#ffd700', '#4da6ff', '#4ade80', '#ff6b6b'], borderWidth: 2, borderRadius: 8 }] },
      options: { ...this.defaults, plugins: { legend: { display: false } }, ...options.chartOptions }
    });
  },
  createDistributionChart(canvasId, labels, values, options = {}) {
    const ctx = document.getElementById(canvasId); if (!ctx) return null;
    return new Chart(ctx.getContext('2d'), {
      type: 'doughnut',
      data: { labels: labels, datasets: [{ data: values, backgroundColor: options.colors || ['#ffd700', '#4da6ff', '#4ade80', '#ff6b6b', '#a78bfa'], borderWidth: 2, borderColor: '#1a1a2e' }] },
      options: { responsive: true, maintainAspectRatio: false, cutout: '70%', plugins: { legend: { position: 'bottom', labels: { color: '#aaa', font: { family: 'Segoe UI, Tahoma, sans-serif' }, padding: 15 } } } }
    });
  }
};
window.WarriorCharts = WarriorCharts;
