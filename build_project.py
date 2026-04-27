import os

base_dir = r"c:\Users\____\Downloads\warriorway-landing"

files = {
    r"app\login.html": r"""<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <title>تسجيل الدخول - EgyFit Warrior Way</title>
  <link rel="stylesheet" href="../assets/css/main.css">
  <link rel="stylesheet" href="../assets/css/rtl.css">
  <link rel="icon" type="image/png" href="../ic_logo.png">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background: linear-gradient(135deg, #0f0f1a 0%, #1a1a2e 50%, #16213e 100%);
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
      color: #fff;
    }
    .login-container {
      width: 100%;
      max-width: 420px;
      background: rgba(26, 26, 46, 0.95);
      border-radius: 24px;
      padding: 2.5rem 2rem;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
      border: 1px solid rgba(255, 215, 0, 0.2);
    }
    .logo-section { text-align: center; margin-bottom: 2rem; }
    .logo-section img {
      width: 80px; height: 80px; border-radius: 50%;
      border: 3px solid #ffd700; margin-bottom: 1rem; object-fit: cover;
    }
    .logo-section h1 { font-size: 1.5rem; color: #ffd700; margin-bottom: 0.5rem; }
    .logo-section p { color: #aaa; font-size: 0.95rem; }
    .welcome-text { text-align: center; margin-bottom: 2rem; }
    .welcome-text h2 { font-size: 1.4rem; margin-bottom: 0.5rem; }
    .welcome-text p { color: #888; font-size: 0.9rem; }
    .social-btn {
      width: 100%; padding: 14px 20px; margin: 10px 0; border: none;
      border-radius: 14px; background: #fff; color: #1a1a2e; font-weight: 600;
      font-size: 1rem; cursor: pointer; display: flex; align-items: center;
      justify-content: center; gap: 12px; transition: all 0.2s ease;
    }
    .social-btn:hover { transform: translateY(-2px); box-shadow: 0 10px 30px rgba(0,0,0,0.3); }
    .social-btn.google { background: #fff; }
    .social-btn.apple { background: #000; color: #fff; }
    .divider {
      text-align: center; margin: 25px 0; color: #666; position: relative; font-size: 0.9rem;
    }
    .divider::before {
      content: ""; position: absolute; top: 50%; left: 0; right: 0;
      height: 1px; background: linear-gradient(90deg, transparent, #444, transparent);
    }
    .divider span { background: rgba(26, 26, 46, 0.95); padding: 0 20px; position: relative; z-index: 1; }
    .email-form { display: flex; flex-direction: column; gap: 12px; }
    .email-form input {
      padding: 14px 18px; border-radius: 12px; border: 1px solid #444;
      background: #222; color: #fff; font-size: 1rem; outline: none;
      transition: border-color 0.2s;
    }
    .email-form input:focus { border-color: #ffd700; }
    .email-form input::placeholder { color: #777; }
    .btn-primary {
      width: 100%; padding: 14px; border: none; border-radius: 14px;
      background: linear-gradient(135deg, #ffd700 0%, #ffaa00 100%);
      color: #000; font-weight: 700; font-size: 1.05rem; cursor: pointer;
      transition: all 0.2s; margin-top: 10px;
    }
    .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 10px 30px rgba(255, 215, 0, 0.4); }
    .btn-primary:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }
    .footer-links { text-align: center; margin-top: 25px; font-size: 0.9rem; color: #888; }
    .footer-links a { color: #ffd700; text-decoration: none; margin: 0 5px; }
    .footer-links a:hover { text-decoration: underline; }
    .error-msg {
      background: rgba(255, 82, 82, 0.15); color: #ff6b6b; padding: 10px 15px;
      border-radius: 10px; margin-bottom: 15px; font-size: 0.9rem;
      display: none; border: 1px solid rgba(255, 82, 82, 0.3);
    }
    .loading { display: none; text-align: center; padding: 10px; color: #ffd700; }
    @media (max-width: 480px) {
      .login-container { padding: 2rem 1.5rem; border-radius: 20px; }
    }
  </style>
</head>
<body>
  <div class="login-container">
    <div class="logo-section">
      <img src="../ic_logo.png" alt="EgyFit Logo" onerror="this.src='data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 100 100\'><circle cx=\'50\' cy=\'50\' r=\'45\' fill=\'%23ffd700\'/><text x=\'50\' y=\'60\' font-size=\'40\' text-anchor=\'middle\' fill=\'%231a1a2e\'>⚔️</text></svg>'">
      <h1>Warrior Way ⚔️</h1>
      <p>رحلتك نحو القوة تبدأ من هنا</p>
    </div>
    <div class="welcome-text">
      <h2>أهلاً بك يا محارب 👋</h2>
      <p>سجل دخولك لمتابعة تقدمك وبدء تمارينك</p>
    </div>
    <div class="error-msg" id="errorMsg"></div>
    <div class="loading" id="loading">جاري التحميل...</div>
    <button class="social-btn google" onclick="signInWithGoogle()">
      <svg width="20" height="20" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
      المتابعة بحساب جوجل
    </button>
    <button class="social-btn apple" onclick="signInWithApple()">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="#fff"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.13-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
      المتابعة بحساب أبل
    </button>
    <div class="divider"><span>أو استخدم البريد الإلكتروني</span></div>
    <form class="email-form" id="emailForm">
      <input type="email" id="email" placeholder="البريد الإلكتروني" required autocomplete="email">
      <input type="password" id="password" placeholder="كلمة المرور" required autocomplete="current-password">
      <button type="submit" class="btn-primary">تسجيل الدخول</button>
    </form>
    <div class="footer-links">
      <a href="#" onclick="showForgotPassword()">نسيت كلمة المرور؟</a> | 
      <a href="#" onclick="toggleSignUp()">إنشاء حساب جديد</a>
    </div>
  </div>
  <script src="https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js"></script>
  <script src="https://www.gstatic.com/firebasejs/10.7.1/firebase-auth-compat.js"></script>
  <script src="https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore-compat.js"></script>
  <script src="../assets/js/firebase-config.js"></script>
  <script src="../assets/js/auth.js"></script>
  <script>
    let isSignUp = false;
    function toggleSignUp() {
      isSignUp = !isSignUp;
      document.querySelector('.welcome-text h2').textContent = isSignUp ? 'إنشاء حساب جديد 🎉' : 'أهلاً بك يا محارب 👋';
      document.querySelector('.welcome-text p').textContent = isSignUp ? 'انضم إلينا وابدأ رحلتك نحو القوة' : 'سجل دخولك لمتابعة تقدمك وبدء تمارينك';
      document.querySelector('.btn-primary').textContent = isSignUp ? 'إنشاء الحساب' : 'تسجيل الدخول';
    }
    function showForgotPassword() {
      const email = prompt('أدخل بريدك الإلكتروني لإعادة تعيين كلمة المرور:');
      if (email) {
        firebase.auth().sendPasswordResetEmail(email)
          .then(() => alert('تم إرسال رابط إعادة التعيين إلى بريدك'))
          .catch(err => showError(err.message));
      }
    }
    function showError(msg) {
      const el = document.getElementById('errorMsg');
      el.textContent = msg;
      el.style.display = 'block';
      setTimeout(() => el.style.display = 'none', 5000);
    }
  </script>
</body>
</html>
""",
    r"app\dashboard.html": r"""<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <title>لوحة التحكم - EgyFit Warrior Way</title>
  <link rel="stylesheet" href="../assets/css/main.css">
  <link rel="stylesheet" href="../assets/css/dashboard.css">
  <link rel="stylesheet" href="../assets/css/rtl.css">
  <link rel="icon" type="image/png" href="../ic_logo.png">
  <script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.1"></script>
</head>
<body>
  <header class="app-header">
    <div class="header-left">
      <button class="menu-btn" onclick="toggleSidebar()">☰</button>
      <div class="logo">
        <img src="../ic_logo.png" alt="Logo" width="32" height="32" onerror="this.src='data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 100 100\'><circle cx=\'50\' cy=\'50\' r=\'45\' fill=\'%23ffd700\'/><text x=\'50\' y=\'60\' font-size=\'40\' text-anchor=\'middle\' fill=\'%231a1a2e\'>⚔️</text></svg>'">
        <span>Warrior Way ⚔️</span>
      </div>
    </div>
    <div class="header-right">
      <button class="ai-coach-btn" onclick="openAICoach()">🤖 المدرب الذكي</button>
      <div class="user-avatar" onclick="goToProfile()">
        <span id="userInitial">م</span>
      </div>
    </div>
  </header>
  <aside class="sidebar" id="sidebar">
    <nav class="nav-menu">
      <a href="#" class="nav-item active" data-page="dashboard">🏠 الرئيسية</a>
      <a href="workout-logger.html" class="nav-item">💪 تسجيل تمرين</a>
      <a href="exercise-library-app.html" class="nav-item">📚 مكتبة التمارين</a>
      <a href="progress.html" class="nav-item">📊 التقدم والإنجازات</a>
      <a href="programs.html" class="nav-item">🎯 برامج التدريب</a>
      <a href="#" class="nav-item" onclick="openMuscleMap()">🗺️ خريطة العضلات</a>
      <a href="settings.html" class="nav-item">⚙️ الإعدادات</a>
      <a href="#" class="nav-item logout" onclick="signOut()">🚪 تسجيل الخروج</a>
    </nav>
  </aside>
  <main class="main-content">
    <section class="welcome-section">
      <h1 id="welcomeMsg">أهلاً بك، يا محارب! 👋</h1>
      <p id="dateDisplay">اليوم: <span></span></p>
    </section>
    <section class="stats-grid" id="statsGrid"></section>
    <section class="chart-section">
      <h3>📈 تقدمك هذا الأسبوع</h3>
      <canvas id="weeklyChart"></canvas>
    </section>
    <section class="quick-actions">
      <h3>⚡ إجراءات سريعة</h3>
      <div class="actions-grid">
        <button class="action-card" onclick="startNewWorkout()">
          <span class="action-icon">🏋️</span><span>ابدأ تمرين جديد</span>
        </button>
        <button class="action-card" onclick="viewExerciseLibrary()">
          <span class="action-icon">🔍</span><span>ابحث عن تمرين</span>
        </button>
        <button class="action-card" onclick="viewPrograms()">
          <span class="action-icon">📋</span><span>برامجي التدريبية</span>
        </button>
        <button class="action-card" onclick="openMuscleMap()">
          <span class="action-icon">🗺️</span><span>خريطة العضلات</span>
        </button>
      </div>
    </section>
    <section class="recent-workouts">
      <div class="section-header">
        <h3>🕐 آخر التمارين</h3>
        <a href="progress.html">عرض الكل ←</a>
      </div>
      <div id="recentWorkoutsList" class="workouts-list"></div>
    </section>
    <button class="floating-ai" onclick="openAICoach()">🤖 اسأل المدرب</button>
  </main>
  <nav class="bottom-nav">
    <a href="#" class="nav-link active" data-page="dashboard">🏠</a>
    <a href="workout-logger.html" class="nav-link">💪</a>
    <a href="exercise-library-app.html" class="nav-link">📚</a>
    <a href="progress.html" class="nav-link">📊</a>
    <a href="#" class="nav-link" onclick="goToProfile()">👤</a>
  </nav>
  <div class="modal" id="muscleMapModal">
    <div class="modal-content">
      <div class="modal-header">
        <h3>🗺️ خريطة العضلات التفاعلية</h3>
        <button class="close-btn" onclick="closeMuscleMap()">✕</button>
      </div>
      <div class="modal-body" id="muscleMapContainer"></div>
    </div>
  </div>
  <div class="modal" id="aiCoachModal">
    <div class="modal-content ai-modal">
      <div class="modal-header">
        <h3>🤖 المدرب الذكي</h3>
        <button class="close-btn" onclick="closeAICoach()">✕</button>
      </div>
      <div class="modal-body chat-container">
        <div class="chat-messages" id="chatMessages">
          <div class="message ai">أهلاً بك يا محارب! 💪 كيف يمكنني مساعدتك اليوم؟</div>
        </div>
        <form class="chat-input" id="chatForm">
          <input type="text" id="chatInput" placeholder="اكتب سؤالك هنا..." autocomplete="off">
          <button type="submit">➤</button>
        </form>
      </div>
    </div>
  </div>
  <script src="https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js"></script>
  <script src="https://www.gstatic.com/firebasejs/10.7.1/firebase-auth-compat.js"></script>
  <script src="https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore-compat.js"></script>
  <script src="../assets/js/firebase-config.js"></script>
  <script src="../assets/js/auth.js"></script>
  <script src="../assets/js/utils.js"></script>
  <script src="../assets/js/charts.js"></script>
  <script src="../assets/js/muscle-map.js"></script>
  <script src="../assets/js/dashboard.js"></script>
</body>
</html>
""",
    r"app\workout-logger.html": r"""<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>تسجيل التمرين - EgyFit Warrior Way</title>
  <link rel="stylesheet" href="../assets/css/main.css">
  <link rel="stylesheet" href="../assets/css/workout-logger.css">
  <link rel="stylesheet" href="../assets/css/rtl.css">
  <link rel="icon" type="image/png" href="../ic_logo.png">
</head>
<body>
  <header class="app-header">
    <div class="header-left">
      <button class="back-btn" onclick="goBack()">← رجوع</button>
      <h2>💪 تسجيل التمرين</h2>
    </div>
    <div class="header-right">
      <button class="timer-btn" id="restTimerBtn" onclick="toggleRestTimer()">⏱️ <span id="timerDisplay">00:00</span></button>
    </div>
  </header>
  <section class="workout-info">
    <input type="text" id="workoutName" placeholder="اسم التمرين" class="workout-title" style="background:transparent; border:none; color:#fff; font-size:1.5rem; outline:none; border-bottom:1px solid #444; width:100%; padding:10px 0; margin-bottom:10px;">
    <div class="workout-meta">
      <span id="workoutDate">📅 <span></span></span>
      <span id="workoutDuration">⏱️ <span>00:00</span></span>
    </div>
  </section>
  <section class="exercises-section">
    <div class="section-header">
      <h3>التمارين</h3>
      <button class="add-exercise-btn btn-secondary" onclick="addExercise()">+ إضافة تمرين</button>
    </div>
    <div id="exercisesList" class="exercises-list"></div>
  </section>
  <div class="modal" id="addExerciseModal">
    <div class="modal-content">
      <div class="modal-header">
        <h3>🔍 إضافة تمرين</h3>
        <button class="close-btn" onclick="closeAddExerciseModal()">✕</button>
      </div>
      <div class="modal-body">
        <input type="text" id="exerciseSearch" placeholder="ابحث عن تمرين..." class="search-input" style="width:100%; padding:10px; margin-bottom:15px; border-radius:8px; border:1px solid #444; background:#222; color:#fff;">
        <div id="exerciseSearchResults" class="search-results"></div>
        <div class="muscle-filter" style="margin-top:20px; text-align:center;">
          <span>أو اختر من خريطة العضلات: </span>
          <button class="muscle-map-btn btn-secondary" onclick="openMuscleMapFromLogger()" style="padding:8px 16px;">🗺️ خريطة العضلات</button>
        </div>
      </div>
    </div>
  </div>
  <template id="setTemplate">
    <div class="set-row" style="display:grid; grid-template-columns: 1fr 1fr 1fr auto; gap: 10px; margin-bottom: 10px; align-items:center;">
      <input type="number" class="set-reps" placeholder="تكرار" min="1" style="width:100%; padding:8px; border-radius:6px; border:1px solid #444; background:#222; color:#fff;">
      <input type="number" class="set-weight" placeholder="وزن" min="0" step="0.5" style="width:100%; padding:8px; border-radius:6px; border:1px solid #444; background:#222; color:#fff;">
      <input type="number" class="set-rpe" placeholder="RPE" min="1" max="10" style="width:100%; padding:8px; border-radius:6px; border:1px solid #444; background:#222; color:#fff;">
      <button class="remove-set-btn" onclick="removeSet(this)" style="background:none; border:none; color:#ff6b6b; cursor:pointer; font-size:1.2rem;">🗑️</button>
    </div>
  </template>
  <template id="exerciseTemplate">
    <div class="exercise-card" style="background:var(--bg-card); border:1px solid var(--border-color); border-radius:var(--radius-md); padding:var(--spacing-md); margin-bottom:var(--spacing-md);">
      <div class="exercise-header" style="display:flex; justify-content:space-between; margin-bottom:10px;">
        <h4 class="exercise-name" style="color:var(--accent-gold);"></h4>
        <button class="remove-exercise-btn" onclick="removeExercise(this)" style="background:none; border:none; color:#aaa; cursor:pointer;">✕</button>
      </div>
      <p class="exercise-muscle" style="color:var(--text-secondary); font-size:0.85rem; margin-bottom:15px;"></p>
      <div class="sets-container"></div>
      <button class="add-set-btn btn-secondary" onclick="addSet(this)" style="width:100%; padding:8px; margin-top:10px;">+ إضافة مجموعة</button>
    </div>
  </template>
  <section class="action-buttons" style="display:flex; gap:10px; margin-top:20px;">
    <button class="btn-secondary" onclick="saveWorkoutDraft()" style="flex:1;">💾 مسودة</button>
    <button class="btn-primary" onclick="finishWorkout()" style="flex:2;">✅ إنهاء التمرين</button>
  </section>
  <div class="rest-timer-popup modal" id="restTimerPopup" style="align-items:flex-end;">
    <div class="modal-content" style="padding:20px; text-align:center;">
      <div class="timer-display" id="restTimerDisplay" style="font-size:3rem; color:var(--accent-gold); font-weight:bold; margin-bottom:20px;">00:00</div>
      <div class="timer-controls" style="display:flex; justify-content:center; gap:10px; flex-wrap:wrap;">
        <button class="btn-secondary" onclick="setRestTime(60)">1 د</button>
        <button class="btn-secondary" onclick="setRestTime(90)">1.5 د</button>
        <button class="btn-secondary" onclick="setRestTime(120)">2 د</button>
        <button class="btn-secondary" onclick="setRestTime(180)">3 د</button>
        <button class="btn-secondary" onclick="resetRestTimer()">↺</button>
        <button class="btn-secondary" onclick="closeRestTimer()">✕</button>
      </div>
    </div>
  </div>
  <script src="https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js"></script>
  <script src="https://www.gstatic.com/firebasejs/10.7.1/firebase-auth-compat.js"></script>
  <script src="https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore-compat.js"></script>
  <script src="../assets/js/firebase-config.js"></script>
  <script src="../assets/js/auth.js"></script>
  <script src="../assets/js/utils.js"></script>
  <script src="../assets/js/muscle-map.js"></script>
  <script src="../assets/js/workout-logger.js"></script>
</body>
</html>
""",
    r"assets\css\main.css": r""":root {
  --bg-primary: #0f0f1a; --bg-secondary: #1a1a2e; --bg-tertiary: #16213e;
  --bg-card: rgba(26, 26, 46, 0.95);
  --text-primary: #ffffff; --text-secondary: #aaaaaa; --text-muted: #666666;
  --accent-gold: #ffd700; --accent-gold-dark: #ffaa00;
  --accent-blue: #4da6ff; --accent-green: #4ade80; --accent-red: #ff6b6b;
  --border-color: rgba(255, 215, 0, 0.2); --border-light: rgba(255, 255, 255, 0.1);
  --shadow-sm: 0 2px 8px rgba(0,0,0,0.3); --shadow-md: 0 4px 20px rgba(0,0,0,0.4);
  --shadow-lg: 0 10px 40px rgba(0,0,0,0.5); --shadow-gold: 0 5px 25px rgba(255,215,0,0.3);
  --radius-sm: 8px; --radius-md: 14px; --radius-lg: 24px; --radius-full: 9999px;
  --spacing-xs: 4px; --spacing-sm: 8px; --spacing-md: 16px; --spacing-lg: 24px; --spacing-xl: 32px;
  --transition-fast: 0.15s ease; --transition-normal: 0.3s ease;
}
*, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
html { scroll-behavior: smooth; }
body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, 'Noto Sans Arabic', sans-serif;
  background: var(--bg-primary); color: var(--text-primary); line-height: 1.5;
  -webkit-font-smoothing: antialiased; overflow-x: hidden;
}
.app-header {
  position: sticky; top: 0; z-index: 100; display: flex; align-items: center;
  justify-content: space-between; padding: var(--spacing-md) var(--spacing-lg);
  background: var(--bg-secondary); border-bottom: 1px solid var(--border-color);
  backdrop-filter: blur(10px);
}
.header-left, .header-right { display: flex; align-items: center; gap: var(--spacing-md); }
.logo { display: flex; align-items: center; gap: var(--spacing-sm); font-weight: 700; font-size: 1.1rem; color: var(--accent-gold); }
.logo img { border-radius: 50%; border: 2px solid var(--accent-gold); }
.menu-btn, .back-btn {
  background: none; border: none; color: var(--text-primary); font-size: 1.3rem;
  cursor: pointer; padding: var(--spacing-sm); border-radius: var(--radius-sm);
  transition: background var(--transition-fast);
}
.menu-btn:hover, .back-btn:hover { background: var(--border-light); }
.user-avatar {
  width: 40px; height: 40px; border-radius: 50%;
  background: linear-gradient(135deg, var(--accent-gold), var(--accent-gold-dark));
  display: flex; align-items: center; justify-content: center;
  font-weight: 700; color: #000; cursor: pointer; transition: transform var(--transition-fast);
}
.user-avatar:hover { transform: scale(1.05); }
.ai-coach-btn {
  background: linear-gradient(135deg, var(--accent-blue), #7ab8ff); color: #000;
  border: none; padding: var(--spacing-sm) var(--spacing-md); border-radius: var(--radius-full);
  font-weight: 600; font-size: 0.9rem; cursor: pointer; transition: all var(--transition-fast);
}
.ai-coach-btn:hover { transform: translateY(-2px); box-shadow: var(--shadow-gold); }
.sidebar {
  position: fixed; top: 0; right: -280px; width: 280px; height: 100vh;
  background: var(--bg-secondary); border-left: 1px solid var(--border-color);
  padding: var(--spacing-lg) var(--spacing-md); transition: right var(--transition-normal);
  z-index: 200; overflow-y: auto;
}
.sidebar.active { right: 0; }
.nav-menu { display: flex; flex-direction: column; gap: var(--spacing-xs); }
.nav-item {
  display: flex; align-items: center; gap: var(--spacing-md); padding: var(--spacing-md);
  color: var(--text-secondary); text-decoration: none; border-radius: var(--radius-md);
  transition: all var(--transition-fast); font-weight: 500;
}
.nav-item:hover, .nav-item.active { background: var(--bg-tertiary); color: var(--accent-gold); }
.nav-item.logout { margin-top: auto; color: var(--accent-red); }
.nav-item.logout:hover { background: rgba(255, 107, 107, 0.1); }
.main-content { padding: var(--spacing-lg); padding-bottom: 80px; max-width: 1200px; margin: 0 auto; }
.welcome-section { margin-bottom: var(--spacing-lg); }
.welcome-section h1 { font-size: 1.8rem; margin-bottom: var(--spacing-xs); }
.welcome-section p { color: var(--text-secondary); }
.stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: var(--spacing-md); margin-bottom: var(--spacing-lg); }
.stat-card {
  background: var(--bg-card); border: 1px solid var(--border-color);
  border-radius: var(--radius-md); padding: var(--spacing-md); text-align: center;
  transition: transform var(--transition-fast);
}
.stat-card:hover { transform: translateY(-3px); }
.stat-icon { font-size: 1.5rem; margin-bottom: var(--spacing-sm); }
.stat-value { font-size: 1.4rem; font-weight: 700; color: var(--accent-gold); margin-bottom: var(--spacing-xs); }
.stat-label { font-size: 0.85rem; color: var(--text-secondary); }
.chart-section {
  background: var(--bg-card); border: 1px solid var(--border-color);
  border-radius: var(--radius-md); padding: var(--spacing-md); margin-bottom: var(--spacing-lg);
}
.chart-section h3 { margin-bottom: var(--spacing-md); font-size: 1.1rem; }
.chart-section canvas { max-height: 250px; }
.quick-actions h3 { margin-bottom: var(--spacing-md); font-size: 1.1rem; }
.actions-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: var(--spacing-md); margin-bottom: var(--spacing-lg); }
.action-card {
  background: var(--bg-card); border: 1px solid var(--border-color);
  border-radius: var(--radius-md); padding: var(--spacing-lg) var(--spacing-md);
  display: flex; flex-direction: column; align-items: center; gap: var(--spacing-sm);
  cursor: pointer; transition: all var(--transition-fast); text-align: center;
}
.action-card:hover { border-color: var(--accent-gold); transform: translateY(-3px); box-shadow: var(--shadow-gold); }
.action-icon { font-size: 1.8rem; }
.action-card span:last-child { font-size: 0.9rem; font-weight: 500; }
.recent-workouts { margin-bottom: var(--spacing-lg); }
.section-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--spacing-md); }
.section-header h3 { font-size: 1.1rem; }
.section-header a { color: var(--accent-gold); text-decoration: none; font-size: 0.9rem; }
.workouts-list { display: flex; flex-direction: column; gap: var(--spacing-sm); }
.workout-item {
  background: var(--bg-card); border: 1px solid var(--border-light);
  border-radius: var(--radius-md); padding: var(--spacing-md);
  display: flex; justify-content: space-between; align-items: center;
  cursor: pointer; transition: background var(--transition-fast);
}
.workout-item:hover { background: var(--bg-tertiary); }
.workout-info h4 { margin-bottom: var(--spacing-xs); }
.workout-info p { font-size: 0.85rem; color: var(--text-secondary); }
.workout-stats { text-align: left; }
.workout-stats span { display: block; font-size: 0.9rem; font-weight: 600; color: var(--accent-gold); }
.btn-primary, .btn-secondary {
  padding: var(--spacing-md) var(--spacing-lg); border-radius: var(--radius-full);
  font-weight: 600; font-size: 1rem; cursor: pointer; transition: all var(--transition-fast); border: none;
}
.btn-primary { background: linear-gradient(135deg, var(--accent-gold), var(--accent-gold-dark)); color: #000; }
.btn-primary:hover { transform: translateY(-2px); box-shadow: var(--shadow-gold); }
.btn-secondary { background: var(--bg-tertiary); color: var(--text-primary); border: 1px solid var(--border-color); }
.btn-secondary:hover { background: var(--bg-card); }
.modal {
  display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%;
  background: rgba(0, 0, 0, 0.7); z-index: 300; align-items: center;
  justify-content: center; padding: var(--spacing-md);
}
.modal.active { display: flex; }
.modal-content {
  background: var(--bg-secondary); border: 1px solid var(--border-color);
  border-radius: var(--radius-lg); width: 100%; max-width: 500px;
  max-height: 90vh; display: flex; flex-direction: column; overflow: hidden;
}
.modal-header {
  display: flex; justify-content: space-between; align-items: center;
  padding: var(--spacing-md) var(--spacing-lg); border-bottom: 1px solid var(--border-light);
}
.modal-header h3 { font-size: 1.2rem; }
.close-btn {
  background: none; border: none; color: var(--text-secondary); font-size: 1.5rem;
  cursor: pointer; padding: var(--spacing-xs); border-radius: var(--radius-sm);
  transition: background var(--transition-fast);
}
.close-btn:hover { background: var(--border-light); color: var(--text-primary); }
.modal-body { padding: var(--spacing-lg); overflow-y: auto; flex: 1; }
.ai-modal { max-width: 400px; max-height: 80vh; }
.chat-container { display: flex; flex-direction: column; height: 100%; }
.chat-messages {
  flex: 1; overflow-y: auto; padding: var(--spacing-md) 0;
  display: flex; flex-direction: column; gap: var(--spacing-md);
}
.message {
  max-width: 85%; padding: var(--spacing-md); border-radius: var(--radius-md);
  font-size: 0.95rem; line-height: 1.4;
}
.message.ai {
  align-self: flex-start; background: var(--bg-tertiary);
  border: 1px solid var(--border-light); border-bottom-right-radius: var(--radius-sm);
}
.message.user {
  align-self: flex-end; background: linear-gradient(135deg, var(--accent-gold), var(--accent-gold-dark));
  color: #000; border-bottom-left-radius: var(--radius-sm);
}
.chat-input { display: flex; gap: var(--spacing-sm); padding-top: var(--spacing-md); border-top: 1px solid var(--border-light); }
.chat-input input {
  flex: 1; padding: var(--spacing-md); border-radius: var(--radius-full);
  border: 1px solid var(--border-color); background: var(--bg-tertiary);
  color: var(--text-primary); outline: none; font-size: 0.95rem;
}
.chat-input input:focus { border-color: var(--accent-gold); }
.chat-input button {
  background: var(--accent-gold); color: #000; border: none; width: 44px; height: 44px;
  border-radius: 50%; font-size: 1.2rem; cursor: pointer; transition: transform var(--transition-fast);
}
.chat-input button:hover { transform: scale(1.05); }
.floating-ai {
  position: fixed; bottom: 90px; left: var(--spacing-lg);
  background: linear-gradient(135deg, var(--accent-blue), #7ab8ff);
  color: #000; border: none; padding: var(--spacing-md) var(--spacing-lg);
  border-radius: var(--radius-full); font-weight: 600; font-size: 0.95rem;
  cursor: pointer; box-shadow: var(--shadow-lg); z-index: 150;
  transition: all var(--transition-fast);
}
.floating-ai:hover { transform: translateY(-3px); box-shadow: 0 15px 50px rgba(77, 166, 255, 0.4); }
.bottom-nav {
  position: fixed; bottom: 0; left: 0; right: 0; display: flex;
  justify-content: space-around; padding: var(--spacing-sm) 0;
  background: var(--bg-secondary); border-top: 1px solid var(--border-color); z-index: 100;
}
.nav-link {
  display: flex; flex-direction: column; align-items: center; gap: var(--spacing-xs);
  padding: var(--spacing-sm) var(--spacing-md); color: var(--text-secondary);
  text-decoration: none; font-size: 0.8rem; transition: color var(--transition-fast);
}
.nav-link.active, .nav-link:hover { color: var(--accent-gold); }
.nav-link span:first-child { font-size: 1.3rem; }
.hidden { display: none !important; }
.text-center { text-align: center; }
.text-gold { color: var(--accent-gold); }
.mt-1 { margin-top: var(--spacing-sm); }
.mt-2 { margin-top: var(--spacing-md); }
.mb-1 { margin-bottom: var(--spacing-sm); }
.mb-2 { margin-bottom: var(--spacing-md); }
@media (min-width: 768px) {
  .sidebar { right: 0; width: 240px; border-right: 1px solid var(--border-color); border-left: none; }
  .main-content { margin-right: 240px; padding-right: var(--spacing-xl); }
  .bottom-nav { display: none; }
  .floating-ai { bottom: var(--spacing-lg); }
}
@media (max-width: 480px) {
  .actions-grid { grid-template-columns: 1fr; }
  .modal-content { margin: var(--spacing-sm); max-height: 95vh; }
}
@keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
.fade-in { animation: fadeIn var(--transition-normal); }
@keyframes pulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.05); } }
.pulse { animation: pulse 2s infinite; }
""",
    r"assets\css\rtl.css": r"""[dir="rtl"] .header-left { flex-direction: row-reverse; }
[dir="rtl"] .header-right { flex-direction: row-reverse; }
[dir="rtl"] .nav-item { flex-direction: row-reverse; }
[dir="rtl"] .action-card { flex-direction: column; }
[dir="rtl"] .workout-item { flex-direction: row-reverse; }
[dir="rtl"] .workout-stats { text-align: right; }
[dir="rtl"] .chat-input { flex-direction: row-reverse; }
[dir="rtl"] .message.user { border-bottom-left-radius: var(--radius-md); border-bottom-right-radius: var(--radius-sm); }
[dir="rtl"] .message.ai { border-bottom-right-radius: var(--radius-md); border-bottom-left-radius: var(--radius-sm); }
[dir="rtl"] .floating-ai { left: auto; right: var(--spacing-lg); }
[dir="rtl"] .sidebar { right: auto; left: -280px; border-right: 1px solid var(--border-color); border-left: none; }
[dir="rtl"] .sidebar.active { left: 0; }
@media (min-width: 768px) {
  [dir="rtl"] .sidebar { left: 0; right: auto; border-left: 1px solid var(--border-color); border-right: none; }
  [dir="rtl"] .main-content { margin-right: 0; margin-left: 240px; padding-right: var(--spacing-lg); padding-left: var(--spacing-xl); }
}
[dir="rtl"] input, [dir="rtl"] textarea, [dir="rtl"] select { text-align: right; }
[dir="rtl"] input::placeholder, [dir="rtl"] textarea::placeholder { text-align: right; }
[dir="rtl"] canvas { direction: rtl; }
""",
    r"assets\css\workout-logger.css": r""".timer-btn {
  background: var(--bg-tertiary); border: 1px solid var(--border-color);
  color: var(--text-primary); padding: var(--spacing-sm) var(--spacing-md);
  border-radius: var(--radius-full); font-weight: 600; font-size: 0.9rem;
  cursor: pointer; display: flex; align-items: center; gap: var(--spacing-xs);
  transition: all var(--transition-fast);
}
.timer-btn:hover { background: var(--accent-gold); color: #000; border-color: var(--accent-gold); }
.timer-btn.active { background: var(--accent-red); border-color: var(--accent-red); animation: pulse 1s infinite; }
#exerciseSearchResults {
  border: 1px solid var(--border-light); border-radius: var(--radius-md);
  max-height: 250px; overflow-y: auto;
}
.search-result-item {
  padding: var(--spacing-md); border-bottom: 1px solid var(--border-light);
  cursor: pointer; transition: background var(--transition-fast);
  display: flex; justify-content: space-between; align-items: center;
}
.search-result-item:last-child { border-bottom: none; }
.search-result-item:hover { background: var(--bg-tertiary); }
.search-result-item strong { color: var(--text-primary); }
.search-result-item small { color: var(--text-secondary); }
.set-row input::placeholder { color: var(--text-muted); font-size: 0.85rem; }
.set-row input:focus { box-shadow: 0 0 0 2px rgba(255, 215, 0, 0.3); }
.add-exercise-btn { display: flex; align-items: center; gap: var(--spacing-xs); }
.exercise-card { animation: slideIn 0.3s ease; }
@keyframes slideIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
.rest-timer-popup {
  animation: slideUp 0.3s ease;
}
@keyframes slideUp { from { opacity: 0; transform: translateX(-50%) translateY(20px); } to { opacity: 1; transform: translateX(-50%) translateY(0); } }
.timer-display.pulse { animation: pulse 0.5s infinite; }
@keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.7; } }
@media (max-width: 480px) {
  .set-row { grid-template-columns: 1fr 1fr; gap: var(--spacing-xs); }
  .set-row input:nth-child(3) { grid-column: span 2; }
  .remove-set-btn { position: absolute; left: var(--spacing-xs); top: var(--spacing-xs); }
  .set-row { position: relative; padding-right: var(--spacing-md); }
  .action-buttons { flex-direction: column; }
  .action-buttons .btn-secondary { order: 2; }
  .action-buttons .btn-primary { order: 1; }
}
@media print {
  .app-header, .bottom-nav, .action-buttons, .floating-ai { display: none !important; }
  .main-content { padding: 0; max-width: 100%; }
  .exercise-card { break-inside: avoid; border: 1px solid #000; }
}
""",
    r"assets\js\firebase-config.js": r"""/**
 * EgyFit Warrior Way - Firebase Configuration
 * ⚠️ استبدل القيم التالية بإعدادات مشروعك الحقيقي من Firebase Console
 */
const firebaseConfig = {
  apiKey: "AIzaSyDXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "egyfit-warriorway.firebaseapp.com",
  projectId: "egyfit-warriorway",
  storageBucket: "egyfit-warriorway.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef1234567890",
  measurementId: "G-XXXXXXXXXX"
};
if (!firebase.apps.length) { firebase.initializeApp(firebaseConfig); }
const db = firebase.firestore();
const auth = firebase.auth();
db.enablePersistence().catch((err) => {
  if (err.code === 'failed-precondition') console.log('Persistence failed: Multiple tabs open');
  else if (err.code === 'unimplemented') console.log('Persistence not supported');
});
window.firebase = firebase; window.db = db; window.auth = auth;
console.log('✅ Firebase initialized for EgyFit Warrior Way');
""",
    r"assets\js\auth.js": r"""/** EgyFit Warrior Way - Authentication Module */
document.addEventListener('DOMContentLoaded', () => {
  auth.onAuthStateChanged(user => {
    if (user) {
      if (window.location.pathname.includes('login.html')) window.location.href = 'dashboard.html';
      updateUserUI(user);
    } else {
      if (!window.location.pathname.includes('login.html') && !window.location.pathname.includes('index.html')) {
        window.location.href = 'login.html';
      }
    }
  });
});
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
async function signOut() { try { await auth.signOut(); window.location.href = 'login.html'; } catch (error) { showError('فشل تسجيل الخروج'); console.error('Sign out error:', error); } }
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
window.signOut = signOut; window.updateUserUI = updateUserUI;
""",
    r"assets\js\utils.js": r"""/** EgyFit Warrior Way - Utility Functions */
function formatDateArabic(date = new Date()) {
  return date.toLocaleDateString('ar-EG', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
}
function formatDuration(seconds) {
  const h = Math.floor(seconds / 3600), m = Math.floor((seconds % 3600) / 60), s = seconds % 60;
  return h > 0 ? `${h}:${m.toString().padStart(2,'0')}:${s.toString().padStart(2,'0')}` : `${m}:${s.toString().padStart(2,'0')}`;
}
function formatWeight(weight, unit = 'kg') { return (!weight && weight !== 0) ? '--' : `${weight} ${unit}`; }
function generateId() { return Date.now().toString(36) + Math.random().toString(36).substr(2); }
function debounce(func, wait) { let timeout; return function(...args) { clearTimeout(timeout); timeout = setTimeout(() => func(...args), wait); }; }
const Storage = {
  get: (key, def = null) => { try { const item = localStorage.getItem(`egyfit_${key}`); return item ? JSON.parse(item) : def; } catch { return def; } },
  set: (key, val) => { try { localStorage.setItem(`egyfit_${key}`, JSON.stringify(val)); return true; } catch { return false; } },
  remove: (key) => localStorage.removeItem(`egyfit_${key}`)
};
function navigateTo(page) { window.location.href = page; }
function goBack() { if (window.history.length > 1) window.history.back(); else window.location.href = 'dashboard.html'; }
function openModal(modalId) { document.getElementById(modalId)?.classList.add('active'); document.body.style.overflow = 'hidden'; }
function closeModal(modalId) { document.getElementById(modalId)?.classList.remove('active'); document.body.style.overflow = ''; }
function showToast(message, type = 'info', duration = 3000) {
  const existing = document.getElementById('toast-notification'); if (existing) existing.remove();
  const toast = document.createElement('div'); toast.id = 'toast-notification';
  toast.style.cssText = `position:fixed;bottom:100px;left:50%;transform:translateX(-50%);background:${type==='error'?'#ff6b6b':type==='success'?'#4ade80':'#4da6ff'};color:${type==='info'?'#000':'#fff'};padding:12px 24px;border-radius:12px;font-weight:500;z-index:1000;animation:slideUp 0.3s ease;box-shadow:0 10px 40px rgba(0,0,0,0.3)`;
  toast.textContent = message; document.body.appendChild(toast);
  setTimeout(() => { toast.style.animation = 'slideDown 0.3s ease'; setTimeout(() => toast.remove(), 300); }, duration);
}
const style = document.createElement('style'); style.textContent = `@keyframes slideUp{from{opacity:0;transform:translateX(-50%) translateY(20px)}to{opacity:1;transform:translateX(-50%) translateY(0)}}@keyframes slideDown{from{opacity:1;transform:translateX(-50%) translateY(0)}to{opacity:0;transform:translateX(-50%) translateY(20px)}}`; document.head.appendChild(style);
window.formatDateArabic = formatDateArabic; window.formatDuration = formatDuration; window.formatWeight = formatWeight;
window.generateId = generateId; window.debounce = debounce; window.Storage = Storage;
window.navigateTo = navigateTo; window.goBack = goBack; window.openModal = openModal; window.closeModal = closeModal; window.showToast = showToast;
""",
    r"assets\js\charts.js": r"""/** EgyFit Warrior Way - Charts Module */
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
""",
    r"assets\js\dashboard.js": r"""/** EgyFit Warrior Way - Dashboard Module */
class WarriorDashboard {
  constructor() { this.userId = auth.currentUser?.uid; this.userData = null; this.init(); }
  async init() {
    if (!this.userId) { window.location.href = 'login.html'; return; }
    await this.loadUserData(); this.setDateDisplay(); this.renderStats(); this.renderWeeklyChart(); this.renderRecentWorkouts(); this.setupEventListeners();
  }
  async loadUserData() {
    try {
      const doc = await db.collection('users').doc(this.userId).get(); this.userData = doc.data();
      const name = this.userData?.profile?.name || auth.currentUser?.displayName || 'يا محارب';
      document.getElementById('welcomeMsg').textContent = `أهلاً بك، ${name}! 👋`;
    } catch (error) { console.error('Error loading user data:', error); showToast('فشل تحميل البيانات', 'error'); }
  }
  setDateDisplay() { const dateEl = document.querySelector('#dateDisplay span'); if (dateEl) dateEl.textContent = formatDateArabic(); }
  renderStats() {
    const stats = [
      { label: 'آخر وزن', value: this.userData?.profile?.weight ? `${this.userData.profile.weight} كجم` : '--', icon: '⚖️' },
      { label: 'تمارين هذا الأسبوع', value: this.userData?.stats?.weeklyWorkouts || '0', icon: '💪' },
      { label: 'أفضل إنجاز', value: 'بنش 80كجم', icon: '🏆' },
      { label: 'سلسلة الأيام', value: `${this.userData?.stats?.currentStreak || 0} أيام 🔥`, icon: '📅' }
    ];
    const container = document.getElementById('statsGrid');
    if (container) container.innerHTML = stats.map(stat => `<div class="stat-card fade-in"><div class="stat-icon">${stat.icon}</div><div class="stat-value">${stat.value}</div><div class="stat-label">${stat.label}</div></div>`).join('');
  }
  renderWeeklyChart() {
    const ctx = document.getElementById('weeklyChart'); if (!ctx) return;
    const labels = ['سبت', 'أحد', 'اثنين', 'ثلاثاء', 'أربعاء', 'خميس', 'جمعة'];
    const data = [1200, 1500, 0, 1800, 2000, 0, 1600];
    new Chart(ctx, { type: 'line', data: { labels: labels, datasets: [{ label: 'الحجم التدريبي (كجم)', data: data, borderColor: '#ffd700', backgroundColor: 'rgba(255, 215, 0, 0.1)', borderWidth: 3, pointBackgroundColor: '#ffd700', pointRadius: 4, pointHoverRadius: 6, tension: 0.4, fill: true }] }, options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true, grid: { color: 'rgba(255,255,255,0.1)' }, ticks: { color: '#aaa' } }, x: { grid: { display: false }, ticks: { color: '#aaa' } } } } });
  }
  async renderRecentWorkouts() {
    const container = document.getElementById('recentWorkoutsList'); if (!container) return;
    try {
      const snapshot = await db.collection('users').doc(this.userId).collection('workouts').orderBy('date', 'desc').limit(3).get();
      if (snapshot.empty) { container.innerHTML = '<p style="color:#666;text-align:center;padding:20px">لم تسجل أي تمارين بعد 💪</p>'; return; }
      const workouts = []; snapshot.forEach(doc => workouts.push({ id: doc.id, ...doc.data() }));
      container.innerHTML = workouts.map(workout => `<div class="workout-item fade-in" onclick="viewWorkout('${workout.id}')"><div class="workout-info"><h4>${workout.name || 'تمرين بدون اسم'}</h4><p>${new Date(workout.date?.toDate()).toLocaleDateString('ar-EG')}</p></div><div class="workout-stats"><span>${workout.exercises?.length || 0} تمارين</span><small>${formatDuration(workout.duration || 0)}</small></div></div>`).join('');
    } catch (error) { console.error('Error fetching workouts:', error); container.innerHTML = '<p style="color:#ff6b6b">فشل تحميل التمارين</p>'; }
  }
  setupEventListeners() {
    window.toggleSidebar = () => document.getElementById('sidebar')?.classList.toggle('active');
    document.addEventListener('click', (e) => {
      const sidebar = document.getElementById('sidebar'); const menuBtn = document.querySelector('.menu-btn');
      if (sidebar?.classList.contains('active') && !sidebar.contains(e.target) && !menuBtn?.contains(e.target)) sidebar.classList.remove('active');
    });
    document.querySelectorAll('.nav-item, .nav-link').forEach(link => {
      link.addEventListener('click', function() { document.querySelectorAll('.nav-item, .nav-link').forEach(l => l.classList.remove('active')); this.classList.add('active'); });
    });
    const chatForm = document.getElementById('chatForm');
    if (chatForm) chatForm.addEventListener('submit', async (e) => {
      e.preventDefault(); const input = document.getElementById('chatInput'); const message = input.value.trim(); if (!message) return;
      addChatMessage(message, 'user'); input.value = '';
      const typingId = addChatMessage('جاري التفكير...', 'ai', true);
      setTimeout(() => { removeChatMessage(typingId); addChatMessage('شكراً لسؤالك! 🤖 هذه الميزة ستكون متاحة قريباً مع المدرب الذكي.', 'ai'); }, 1500);
    });
  }
}
function addChatMessage(text, sender, isTyping = false) {
  const container = document.getElementById('chatMessages'); if (!container) return null;
  const id = 'msg-' + Date.now(); const msg = document.createElement('div');
  msg.className = `message ${sender} ${isTyping ? 'typing' : ''}`; msg.id = id; msg.textContent = text;
  container.appendChild(msg); container.scrollTop = container.scrollHeight; return isTyping ? id : null;
}
function removeChatMessage(id) { document.getElementById(id)?.remove(); }
window.startNewWorkout = () => navigateTo('workout-logger.html');
window.viewExerciseLibrary = () => navigateTo('exercise-library-app.html');
window.viewPrograms = () => navigateTo('programs.html');
window.goToProfile = () => showToast('صفحة الملف الشخصي قريباً 🚧', 'info');
window.openAICoach = () => openModal('aiCoachModal');
window.closeAICoach = () => closeModal('aiCoachModal');
window.openMuscleMap = () => { openModal('muscleMapModal'); if (window.MuscleMap && !window.muscleMapInstance) window.muscleMapInstance = new MuscleMap('muscleMapContainer'); };
window.closeMuscleMap = () => closeModal('muscleMapModal');
window.viewWorkout = (id) => showToast('عرض تفاصيل التمرين: ' + id, 'info');
document.addEventListener('DOMContentLoaded', () => { if (document.body.querySelector('.main-content')) window.dashboard = new WarriorDashboard(); });
""",
    r"assets\js\workout-logger.js": r"""/** EgyFit Warrior Way - Workout Logger Module */
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
    document.getElementById('exercisesList').appendChild(card); this.addSet(card.querySelector('.add-set-btn'));
    closeAddExerciseModal(); showToast(`تم إضافة: ${exerciseData.name}`, 'success');
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
        const reps = row.querySelector('.set-reps').value; const weight = row.querySelector('.set-weight').value; const rpe = row.querySelector('.set-rpe').value;
        if (reps || weight) sets.push({ reps: reps ? parseInt(reps) : null, weight: weight ? parseFloat(weight) : null, rpe: rpe ? parseInt(rpe) : null });
      });
      if (sets.length > 0) exercises.push({ id: card.dataset.exerciseId, name: card.querySelector('.exercise-name').textContent, muscle: card.querySelector('.exercise-muscle').textContent, sets: sets });
    });
    return exercises;
  }
  async updateUserStats(workout) {
    const totalVolume = workout.exercises.reduce((sum, ex) => sum + ex.sets.reduce((s, set) => s + ((set.reps || 0) * (set.weight || 0)), 0), 0);
    await db.collection('users').doc(this.userId).update({ 'stats.totalWorkouts': firebase.firestore.FieldValue.increment(1), 'stats.totalVolume': firebase.firestore.FieldValue.increment(totalVolume), 'stats.lastWorkout': firebase.firestore.FieldValue.serverTimestamp() });
  }
  loadExerciseLibrary() {}
}
window.addExercise = () => openModal('addExerciseModal');
window.closeAddExerciseModal = () => closeModal('addExerciseModal');
window.openMuscleMapFromLogger = () => { closeModal('addExerciseModal'); openModal('muscleMapModal'); if (window.MuscleMap && !window.muscleMapInstance) window.muscleMapInstance = new MuscleMap('muscleMapContainer'); };
let logger;
document.addEventListener('DOMContentLoaded', () => { if (document.querySelector('.workout-info')) { logger = new WorkoutLogger(); window.logger = logger; } });
""",
    r"README.md": r"""# ⚔️ EgyFit Warrior Way

تطبيق لياقة بدنية ذكي باللغة العربية، يجمع بين قوة الذكاء الاصطناعي وتصميم عصري.

## 🌟 المميزات
- 🤖 مدرب ذكي مدعوم بالذكاء الاصطناعي
- 🗺️ خريطة عضلات تفاعلية
- 💪 تسجيل تمارين احترافي
- 📊 لوحات تقدم تفاعلية
- 🔄 مزامنة مع Google Health Connect و Apple Health
- 🌐 دعم ثنائي اللغة: عربي / إنجليزي

## 🚀 البدء السريع

### المتطلبات
- متصفح حديث (Chrome, Firefox, Safari, Edge)
- اتصال بالإنترنت
- حساب Firebase (للتخزين والمصادقة)

### التثبيت المحلي
```bash
# استنساخ المستودع
git clone https://github.com/a7medk53-cpu/egyfit-warriorway.git
cd egyfit-warriorway

# تشغيل محلياً
python -m http.server 8000
# ثم افتح: http://localhost:8000/app/login.html
```
"""
}

import os

for rel_path, content in files.items():
    full_path = os.path.join(base_dir, rel_path)
    os.makedirs(os.path.dirname(full_path), exist_ok=True)
    with open(full_path, "w", encoding="utf-8") as f:
        f.write(content)

print("Project files generated successfully!")
