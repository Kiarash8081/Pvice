import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { closeOverlayPage } from '../../utils/pageOverlay';

export function AdminLoginPage() {
  const { loginAdmin, getAdmins, language } = useApp();

  const translations = {
    fa: { title: 'ورود ادمین', subtitle: 'ورود به پنل مدیریت', username: 'نام کاربری ادمین', password: 'رمز عبور', submit: 'ورود به پنل مدیریت', back: 'بازگشت به صفحه اصلی', correct: 'ورود به پنل مدیریت با موفقیت انجام شد.', wrong: 'نام کاربری یا رمز عبور اشتباه است.' },
    en: { title: 'Admin login', subtitle: 'Login to admin panel', username: 'Admin username', password: 'Password', submit: 'Login to panel', back: 'Back to home', correct: 'Login to admin panel successful.', wrong: 'Incorrect username or password.' },
    ar: { title: 'تسجيل دخول المدير', subtitle: 'الدخول إلى لوحة الإدارة', username: 'اسم مستخدم المدير', password: 'كلمة المرور', submit: 'الدخول إلى اللوحة', back: 'العودة إلى الصفحة الرئيسية', correct: 'تم تسجيل الدخول إلى لوحة الإدارة بنجاح.', wrong: 'اسم المستخدم أو كلمة المرور غير صحيحة.' },
    zh: { title: '管理员登录', subtitle: '登录管理面板', username: '管理员用户名', password: '密码', submit: '登录管理面板', back: '返回首页', correct: '已成功登录管理员面板。', wrong: '用户名或密码不正确。' },
    es: { title: 'Acceso admin', subtitle: 'Entrar al panel de administración', username: 'Usuario administrador', password: 'Contraseña', submit: 'Entrar al panel', back: 'Volver a inicio', correct: 'Acceso al panel de administración correcto.', wrong: 'Usuario o contraseña incorrectos.' }
  };

  const text = translations[language] || translations.fa;
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const admins = getAdmins();
    const admin = admins.find(a => a.username === username && a.password === password);

    if (admin) {
      loginAdmin(admin);
      setMessage(text.correct);
      setIsSuccess(true);
      setTimeout(() => {
        document.querySelector('.site').style.display = 'none';
        document.getElementById('adminLoginPage').classList.remove('active');
        document.getElementById('adminPage').classList.add('active');
        document.body.style.overflow = 'auto';
      }, 500);
    } else {
      setMessage(text.wrong);
      setIsSuccess(false);
    }
  };

  const handleBack = () => closeOverlayPage('adminLoginPage');

  return (
    <section className="auth-page" id="adminLoginPage">
      <div className="auth-card">
        <div className="auth-title">
          <img src="/sp-logo.png" alt="لوگو" className="auth-logo" />
          <h1>{text.title}</h1>
          <span>{text.subtitle}</span>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="field">
            <label>{text.username}</label>
            <div className="input-wrapper">
              <i className="fas fa-user-cog"></i>
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