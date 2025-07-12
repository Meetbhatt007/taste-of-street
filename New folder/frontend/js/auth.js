// Check if user is logged in
export function isLoggedIn() {
  return localStorage.getItem('token') !== null;
}

// Get user role
export function getUserRole() {
  const token = localStorage.getItem('token');
  if (!token) return null;
  
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.user.role;
  } catch (err) {
    console.error('Error decoding token:', err);
    return null;
  }
}

// Logout function
export function logout() {
  localStorage.removeItem('token');
  window.location.href = 'login.html';
}

// Protect routes
export function protectRoute(requiredRole = null) {
  if (!isLoggedIn()) {
    window.location.href = 'login.html';
    return false;
  }
  
  if (requiredRole) {
    const userRole = getUserRole();
    if (userRole !== requiredRole) {
      window.location.href = 'index.html';
      return false;
    }
  }
  
  return true;
}