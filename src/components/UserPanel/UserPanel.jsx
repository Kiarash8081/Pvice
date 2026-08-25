import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

export function UserPanel() {
  const { user, currentAdmin, logoutUser, logoutAdmin, getCurrentUser, language, theme, setLanguage, setTheme } = useApp();
  const [isOpen, setIsOpen] = useState(false);

  const languageOptions = [
    { value: 'fa', label: 'فارسی' },
    { value: 'en', label: 'English' },
    { value: 'ar', label: 'العربية' },
    { value: 'zh', label: '中文' },
    { value: 'es', label: 'Español' }
  ];

  const themeOptions = [
    { value: 'default', label: 'پیش‌فرض' },
    { value: 'dark', label: 'مشکی' },
    { value: 'gold', label: 'زرد' },
    { value: 'blue', label: 'آبی' },
    { value: 'red', label: 'قرمز' },
    { value: 'green', label: 'سبز' },
    { value: 'purple', label: 'بنفش' },
    { value: 'teal', label: 'فیروزه‌ای' },
    { value: 'orange', label: 'نارنجی' },
    { value: 'rose', label: 'صورتی' },
    { value: 'olive', label: 'زیتونی' }
  ];

  const translations = {
    fa: {
      panel: 'پنل کاربری',
      login: 'ورود',
      signup: 'ثبت‌نام',
      adminLogin: 'ورود ادمین',
      adminSettings: 'تنظیمات ادمین',
      language: 'زبان',
      theme: 'تم',
      myReservations: 'رزروهای من',
      rates: 'نرخنامه',
      logout: 'خروج'
    },
    en: {
      panel: 'User panel',
      login: 'Login',
      signup: 'Sign up',
      adminLogin: 'Admin login',
      adminSettings: 'Admin settings',
      language: 'Language',
      theme: 'Theme',
      myReservations: 'My reservations',
      rates: 'Rate list',
      logout: 'Logout'
    },
    ar: {
      panel: 'لوحة المستخدم',
      login: 'تسجيل الدخول',
      signup: 'إنشاء حساب',
      adminLogin: 'دخول المدير',
      adminSettings: 'إعدادات المدير',
      language: 'اللغة',
      theme: 'السمة',
      myReservations: 'حجوزاتي',
      rates: 'التعرفة',
      logout: 'تسجيل الخروج'
    },
    zh: {
      panel: '用户面板',
      login: '登录',
      signup: '注册',
      adminLogin: '管理员登录',
      adminSettings: '管理员设置',
      language: '语言',
      theme: '主题',
      myReservations: '我的预订',
      rates: '费率表',
      logout: '退出'
    },
    es: {
      panel: 'Panel de usuario',
      login: 'Iniciar sesión',
      signup: 'Registrarse',
      adminLogin: 'Acceso admin',
      adminSettings: 'Configuración admin',
      language: 'Idioma',
      theme: 'Tema',
      myReservations: 'Mis reservas',
      rates: 'Tarifas',
      logout: 'Cerrar sesión'
    }
  };

  const text = translations[language] || translations.fa;

  const togglePanel = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    if (currentAdmin) {
      logoutAdmin();
    } else {
      logoutUser();
    }
    setIsOpen(false);
  };

  const handleShowLogin = () => {
    document.querySelector('.site').style.display = 'none';
    document.getElementById('loginPage').classList.add('active');
    document.body.style.overflow = 'hidden';
    setIsOpen(false);
  };

  const handleShowSignup = () => {
    document.querySelector('.site').style.display = 'none';
    document.getElementById('signupPage').classList.add('active');
    document.body.style.overflow = 'hidden';
    setIsOpen(false);
  };

  const handleShowAdminLogin = () => {
    document.querySelector('.site').style.display = 'none';
    document.getElementById('adminLoginPage').classList.add('active');
    document.body.style.overflow = 'hidden';
    setIsOpen(false);
  };

  const handleShowAdminDashboard = () => {
    document.querySelector('.site').style.display = 'none';
    document.getElementById('adminPage').classList.add('active');
    document.body.style.overflow = 'auto';
    setIsOpen(false);
  };

  const handleShowMyReservations = () => {
    document.querySelector('.site').style.display = 'none';
    document.getElementById('myReservationsPage').classList.add('active');
    document.body.style.overflow = 'auto';
    setIsOpen(false);
  };

  const handleShowRates = () => {
    document.querySelector('.site').style.display = 'none';
    document.getElementById('ratesPage').classList.add('active');
    document.body.style.overflow = 'auto';
    setIsOpen(false);
  };

  const current = getCurrentUser();
  const isLoggedIn = current !== null;

  return (
    <>
      <div className={`panel-overlay ${isOpen ? 'open' : ''}`} onClick={togglePanel}></div>

      <div
        className={`user-panel-toggle ${isOpen ? 'open' : ''}`}
        onClick={togglePanel}
      >
        <i className="fas fa-user-circle"></i>
      </div>

      <div
        className={`user-panel ${isOpen ? 'open' : ''}`}
      >
        <div className="panel-title">
          <i className="fas fa-user-circle"></i> {text.panel}
        </div>

        {!isLoggedIn && (
          <>
            <button className="panel-btn" onClick={handleShowLogin}>
              <i className="fas fa-sign-in-alt"></i> {text.login}
            </button>
            <button className="panel-btn" onClick={handleShowSignup}>
              <i className="fas fa-user-plus"></i> {text.signup}
            </button>
            <button className="panel-btn admin-btn" onClick={handleShowAdminLogin}>
              <i className="fas fa-user-shield"></i> {text.adminLogin}
            </button>
          </>
        )}

        {isLoggedIn && (
          <>
            <div className="user-name-display">
              <i className="fas fa-user"></i> <strong>{current?.name || current?.username || '---'}</strong>
            </div>
            <button className="panel-btn" onClick={handleShowMyReservations}>
              <i className="fas fa-clipboard-list"></i> {text.myReservations}
            </button>
            {currentAdmin?.type === 'full' && (
              <div className="admin-settings-link show">
                <button className="panel-btn" onClick={handleShowAdminDashboard}>
                  <i className="fas fa-cog"></i> {text.adminSettings}
                </button>
              </div>
            )}
          </>
        )}

        <div className="panel-section">
          <button className="panel-btn" onClick={handleShowRates}>
            <i className="fas fa-tags"></i> {text.rates}
          </button>
        </div>

        <div className="panel-section">
          <label className="panel-label">{text.language}</label>
          <select className="panel-select" value={language} onChange={(e) => setLanguage(e.target.value)}>
            {languageOptions.map((option) => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>

        <div className="panel-section">
          <label className="panel-label">{text.theme}</label>
          <div className="theme-options">
            {themeOptions.map((option) => (
              <button
                key={option.value}
                type="button"
                className={`theme-swatch ${theme === option.value ? 'active' : ''}`}
                onClick={() => setTheme(option.value)}
                title={option.label}
                data-theme-value={option.value}
              >
                <span className="swatch-dot" />
              </button>
            ))}
          </div>
        </div>

        {isLoggedIn && (
          <button className="panel-btn" onClick={handleLogout} style={{ color: '#8a5d5d' }}>
            <i className="fas fa-sign-out-alt"></i> {text.logout}
          </button>
        )}
      </div>
    </>
  );
}