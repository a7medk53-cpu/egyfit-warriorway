/* assets/js/navigation.js */

/**
 * Navigation utilities for Warrior Way site.
 * Handles sidebar toggle, bottom navigation active state, and smooth page transitions.
 */

// Sidebar toggling (mobile)
function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  if (sidebar) sidebar.classList.toggle('active');
}
function closeSidebar() {
  const sidebar = document.getElementById('sidebar');
  if (sidebar) sidebar.classList.remove('active');
}

// Update active navigation link based on current page
function setActiveNav(page) {
  // Header nav items (desktop)
  document.querySelectorAll('.nav-item').forEach(item => {
    const target = item.getAttribute('data-page');
    if (target === page) item.classList.add('active');
    else item.classList.remove('active');
  });
  // Bottom nav links (mobile)
  document.querySelectorAll('.nav-link').forEach(link => {
    const target = link.getAttribute('data-page');
    if (target === page) link.classList.add('active');
    else link.classList.remove('active');
  });
}

// Run on DOM ready to set active link based on URL
document.addEventListener('DOMContentLoaded', () => {
  const path = window.location.pathname.split('/').pop();
  const page = path.replace('.html', '') || 'index';
  setActiveNav(page);
  // Close sidebar on navigation click (mobile)
  document.querySelectorAll('.nav-item, .nav-link').forEach(el => {
    el.addEventListener('click', () => closeSidebar());
  });
});
