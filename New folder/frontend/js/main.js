import { isLoggedIn, getUserRole, logout } from './auth.js';

// Check authentication on page load
document.addEventListener('DOMContentLoaded', () => {
  if (!isLoggedIn() && !window.location.pathname.endsWith('login.html')) {
    window.location.href = 'login.html';
  }
  
  // Update UI based on login state
  const loginBtn = document.getElementById('loginBtn');
  const logoutBtn = document.getElementById('logoutBtn');
  const profileBtn = document.getElementById('profileBtn');
  
  if (isLoggedIn()) {
    if (loginBtn) loginBtn.style.display = 'none';
    if (logoutBtn) logoutBtn.style.display = 'block';
    if (profileBtn) profileBtn.style.display = 'block';
  } else {
    if (loginBtn) loginBtn.style.display = 'block';
    if (logoutBtn) logoutBtn.style.display = 'none';
    if (profileBtn) profileBtn.style.display = 'none';
  }
  
  // Logout functionality
  if (logoutBtn) {
    logoutBtn.addEventListener('click', logout);
  }
});