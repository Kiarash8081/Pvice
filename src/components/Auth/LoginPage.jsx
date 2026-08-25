import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { closeOverlayPage } from '../../utils/pageOverlay';

export function LoginPage() {
  const { loginUser, language } = useApp();

  const translations = {
    fa: { title: 'ورود', subtitle: 'ورود به سامانه پارکینگ', username: 'نام کاربری', password: 'رمز عبور', submit: 'ورود', back: 'بازگشت به صفحه اصلی', noUser: 'ابتدا باید ثبت‌نام کنید.', wrong: 'نام کاربری یا رمز عبور اشتباه است.', success: 'ورود با موفقیت انجام شد.' },
    en: { title: 'Login', subtitle: 'Login to the parking system', username: 'Username', password: 'Password', submit: 'Login', back: 'Back to home', noUser: 'You must sign up first.', wrong: 'Incorrect username or password.', success: 'Login successful.' },
    ar: { title: 'تسجيل الدخول', subtitle: 'تسجيل الدخول إلى نظام المواقف', username: 'اسم المستخدم', password: 'كلمة المرور', submit: 'تسجيل الدخول', back: 'العودة إلى الصفحة الرئيسية', noUser: 'يجب عليك إنشاء حساب أولاً.', wrong: 'اسم المستخدم أو كلمة المرور غير صحيحة.', success: 'تم تسجيل الدخول بنجاح.' },
    zh: { title: '登录', subtitle: '登录停车系统', username: '用户名', password: '密码', submit: '登录', back: '返回首页', noUser: '请先注册。', wrong: '用户名或密码不正确。', success: '登录成功。' },
    es: { title: 'Iniciar sesión', subtitle: 'Inicia sesión en el sistema de parking', username: 'Usuario', password: 'Contraseña', submit: 'Entrar', back: 'Volver a inicio', noUser: 'Primero debes registrarte.', wrong: 'Usuario o contraseña incorrectos.', success: 'Inicio de sesión correcto.' }
  };

  const text = translations[language] || translations.fa;
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const savedUser = JSON.parse(localStorage.getItem('prsUser'));

    if (!savedUser) {
      setMessage(text.noUser);
      setIsSuccess(false);
      return;
    }

    if (username === savedUser.username && password === savedUser.password) {
      loginUser(savedUser);
      setMessage(text.success);
      setIsSuccess(true);
      setTimeout(() => closeOverlayPage('loginPage'), 500);
    } else {
      setMessage(text.wrong);
      setIsSuccess(false);
    }
  };

  const handleBack = () => closeOverlayPage('loginPage');

  return (
    <section className="auth-page" id="loginPage">
      <div className="auth-card">
        <div className="auth-title">
          <img className="auth-logo" src="/sp-logo.png" alt="لوگو" />
          <h1>{text.title}</h1>
          <span>{text.subtitle}</span>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="field">
            <label>{text.username}</label>
            <div className="input-wrapper">
              <i className="fas fa-user"></i>
              <input
                type="text"
                placeholder={text.username}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="field">
            <label>{text.password}</label>
            <div className="input-wrapper">
              <i className="fas fa-lock"></i>
              <input
                type="password"
                placeholder={text.password}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <button type="submit" className="auth-submit">{text.submit}</button>

          <div className={`form-message ${isSuccess ? 'success' : 'error'}`}>
            {message}
          </div>

          <button type="button" className="back-home" onClick={handleBack}>
            <i className="fas fa-arrow-right"></i>
            {text.back}
          </button>
        </form>
      </div>
    </section>
  );
}