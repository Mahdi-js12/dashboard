/* ===================================================================
   🔹 فایل: main.js
   📌 توضیح: اسکریپت مشترک تمام صفحات پروژه CRM
   ⚡ شامل: Toast، Modal، Dropdown، Sidebar
   =================================================================== */

// ---------- ۱. تابع Toast (نمایش پیام) ----------
function showToast(message, type = 'success') {
  const existingToast = document.querySelector('.toast');
  if (existingToast) existingToast.remove();

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `
    <div class="toast-icon">${type === 'success' ? '✓' : '✕'}</div>
    <div>${message}</div>
  `;
  document.body.appendChild(toast);

  setTimeout(() => toast.classList.add('show'), 50);
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 400);
  }, 3000);
}

// ---------- ۲. باز و بسته کردن Modal ----------
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) modal.classList.add('active');
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) modal.classList.remove('active');
}

// بستن Modal با کلیک روی پس‌زمینه
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('modal-overlay')) {
    e.target.classList.remove('active');
  }
});

// ---------- ۳. Dropdown Menu ----------
document.addEventListener('click', (e) => {
  const dropdown = e.target.closest('.dropdown');
  
  // بستن همه Dropdownها
  document.querySelectorAll('.dropdown').forEach(d => {
    if (d !== dropdown) d.classList.remove('open');
  });

  // باز کردن Dropdown کلیک شده
  if (dropdown) {
    const toggle = e.target.closest('.dropdown-toggle');
    if (toggle || e.target.closest('.dropdown-toggle')) {
      dropdown.classList.toggle('open');
    }
  }
});

// ---------- ۴. مدیریت Tabs ----------
function initTabs() {
  document.querySelectorAll('.tabs').forEach(tabGroup => {
    const tabs = tabGroup.querySelectorAll('.tab');
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
      });
    });
  });
}

// ---------- ۵. Sidebar موبایل ----------
function toggleSidebar() {
  const sidebar = document.querySelector('.sidebar');
  if (sidebar) sidebar.classList.toggle('open');
}

// ---------- ۶. اجرا در لود صفحه ----------
document.addEventListener('DOMContentLoaded', () => {
  initTabs();
  
  // دکمه خروج
  const logoutBtn = document.getElementById('logout-btn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      if (confirm('آیا مطمئن هستید که می‌خواهید خارج شوید؟')) {
        showToast('با موفقیت خارج شدید', 'success');
        setTimeout(() => window.location.href = 'login.html', 1000);
      }
    });
  }
});