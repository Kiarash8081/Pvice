import React from 'react';
import { useApp } from '../../context/AppContext';
import { openOverlayPage } from '../../utils/pageOverlay';

export function SignupGate() {
  const { language } = useApp();

  const translations = {
    fa: {
      title: 'ابتدا ثبت‌نام کنید',
      text: 'برای ورود به سامانه پارکینگ، اول باید حساب بسازید.',
      signup: 'ثبت‌نام',
      login: 'قبلاً ثبت‌نام کرده‌ام'
    },
    en: {
      title: 'Please sign up first',
      text: 'Create an account to use the parking system.',
      signup: 'Sign up',
      login: 'I already have an account'
    },
    ar: {
      title: 'يرجى إنشاء حساب أولاً',
      text: 'يجب إنشاء حساب لاستخدام نظام المواقف.',
      signup: 'إنشاء حساب',
      login: 'لدي حساب بالفعل'
    },
    zh: {
      title: '请先注册',
      text: '使用停车系统前请先创建账户。',
      signup: '注册',
      login: '已有账户'
    },
    es: {
      title: 'Regístrate primero',
      text: 'Crea una cuenta para usar el sistema de parking.',
      signup: 'Registrarse',
      login: 'Ya tengo cuenta'
    }
  };

  const text = translations[language] || translations.fa;

  React.useEffect(() => {
    document.body.classList.add('signup-gate-active');
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.classList.remove('signup-gate-active');
      if (!document.querySelector('.auth-page.active')) {
        document.body.style.overflow = '';
      }
    };
  }, []);

  return (
    <div className="signup-gate">
      <div className="signup-gate-card">
        <img src="/sp-logo.png" alt="لوگو" className="signup-gate-logo" />
        <h2>{text.title}</h2>
        <p>{text.text}</p>
        <button type="button" className="signup-gate-primary" onClick={() => openOverlayPage('signupPage')}>
          {text.signup}
        </button>
        <button type="button" className="signup-gate-secondary" onClick={() => openOverlayPage('loginPage')}>
          {text.login}
        </button>
      </div>
    </div>
  );
}
