/** EgyFit Warrior Way - Authentication Module */
document.addEventListener('DOMContentLoaded', () => {
  auth.onAuthStateChanged(user => {
    const isGuest = localStorage.getItem('guestMode') === 'true';
    if (user || isGuest) {
      if (window.location.pathname.includes('login.html')) window.location.href = 'dashboard.html';
      if (user) updateUserUI(user);
      else updateUserUI({ displayName: 'مستخدم ضيف', uid: 'guest_user' });
    } else {
      if (!window.location.pathname.includes('login.html') && !window.location.pathname.includes('index.html')) {
        window.location.href = 'login.html';
      }
    }
  });
});
function skipLogin() {
  localStorage.setItem('guestMode', 'true');
  window.location.href = 'dashboard.html';
}
async function signInWithGoogle() {
  showLoading(true);
  try {
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });
    const result = await auth.signInWithPopup(provider);
    await saveUserData(result.user);
    window.location.href = 'dashboard.html';
  } catch (error) { showError(error.message); console.error('Google sign-in error:', error); }
  finally { showLoading(false); }
}
async function signInWithApple() {
  showLoading(true);
  try {
    const provider = new firebase.auth.OAuthProvider('apple.com');
    provider.setCustomParameters({ prompt: 'login' });
    const result = await auth.signInWithPopup(provider);
    await saveUserData(result.user);
    window.location.href = 'dashboard.html';
  } catch (error) { showError(error.message); console.error('Apple sign-in error:', error); }
  finally { showLoading(false); }
}
document.getElementById('emailForm')?.addEventListener('submit', async (e) => {
  e.preventDefault(); showLoading(true);
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const isSignUp = window.isSignUp || false;
  try {
    let result;
    if (isSignUp) result = await auth.createUserWithEmailAndPassword(email, password);
    else result = await auth.signInWithEmailAndPassword(email, password);
    await saveUserData(result.user); window.location.href = 'dashboard.html';
  } catch (error) { showError(getAuthErrorMessage(error.code)); console.error('Email auth error:', error); }
  finally { showLoading(false); }
});
async function saveUserData(user) {
  const userRef = db.collection('users').doc(user.uid);
  const userDoc = await userRef.get();
  if (!userDoc.exists) {
    await userRef.set({
      uid: user.uid, email: user.email, displayName: user.displayName || '',
      photoURL: user.photoURL || '', createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      lastLogin: firebase.firestore.FieldValue.serverTimestamp(),
      profile: { weight: null, height: null, age: null, gender: null, goal: 'general_fitness', experience: 'beginner' },
      preferences: { language: 'ar', units: 'kg', theme: 'dark' },
      stats: { totalWorkouts: 0, totalVolume: 0, currentStreak: 0, bestStreak: 0 }
    });
  } else { await userRef.update({ lastLogin: firebase.firestore.FieldValue.serverTimestamp() }); }
}
function updateUserUI(user) {
  const initial = user.displayName?.charAt(0)?.toUpperCase() || user.email?.charAt(0)?.toUpperCase() || 'م';
  document.getElementById('userInitial')?.textContent = initial;
  const welcomeMsg = document.getElementById('welcomeMsg');
  if (welcomeMsg && user.displayName) welcomeMsg.textContent = `أهلاً بك، ${user.displayName}! 👋`;
}
async function signOut() { try { localStorage.removeItem('guestMode'); if (auth.currentUser) await auth.signOut(); window.location.href = 'login.html'; } catch (error) { showError('فشل تسجيل الخروج'); console.error('Sign out error:', error); } }
function showLoading(show) { const loading = document.getElementById('loading'); if (loading) loading.style.display = show ? 'block' : 'none'; }
function showError(msg) { const errorEl = document.getElementById('errorMsg'); if (errorEl) { errorEl.textContent = msg; errorEl.style.display = 'block'; setTimeout(() => { errorEl.style.display = 'none'; }, 5000); } else { alert(msg); } }
function getAuthErrorMessage(code) {
  const messages = {
    'auth/user-not-found': 'لا يوجد حساب بهذا البريد الإلكتروني', 'auth/wrong-password': 'كلمة المرور غير صحيحة',
    'auth/email-already-in-use': 'هذا البريد الإلكتروني مسجل مسبقاً', 'auth/weak-password': 'كلمة المرور ضعيفة جداً (6 أحرف على الأقل)',
    'auth/invalid-email': 'البريد الإلكتروني غير صالح', 'auth/network-request-failed': 'خطأ في الاتصال، تأكد من الإنترنت',
    'auth/too-many-requests': 'محاولات كثيرة، حاول لاحقاً'
  };
  return messages[code] || 'حدث خطأ، حاول مرة أخرى';
}
window.signInWithGoogle = signInWithGoogle; window.signInWithApple = signInWithApple;
window.signOut = signOut; window.updateUserUI = updateUserUI; window.skipLogin = skipLogin;
