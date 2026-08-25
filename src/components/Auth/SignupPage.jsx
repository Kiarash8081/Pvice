import React, { useState } from 'react';
import { useApp, MASTER_ADMIN } from '../../context/AppContext';
import { closeOverlayPage } from '../../utils/pageOverlay';

export function SignupPage() {
  const { loginUser, getAdmins, language } = useApp();

  const translations = {
    fa: { title: 'ثبت‌نام', subtitle: 'ایجاد حساب کاربری در سامانه', fullName: 'نام و نام خانوادگی', username: 'نام کاربری', password: 'رمز عبور', submit: 'ثبت‌نام', back: 'بازگشت به صفحه اصلی', fill: 'لطفاً تمام اطلاعات را وارد کنید.', shortPassword: 'رمز عبور باید حداقل ۴ کاراکتر باشد.', duplicate: 'این نام کاربری قبلاً ثبت شده است.', success: 'ثبت‌نام با موفقیت انجام شد.' },
    en: { title: 'Sign up', subtitle: 'Create a user account', fullName: 'Full name', username: 'Username', password: 'Password', submit: 'Sign up', back: 'Back to home', fill: 'Please complete all fields.', shortPassword: 'Password must be at least 4 characters.', duplicate: 'This username is already taken.', success: 'Signed up successfully.' },
    ar: { title: 'إنشاء حساب', subtitle: 'إنشاء حساب مستخدم', fullName: 'الاسم الكامل', username: 'اسم المستخدم', password: 'كلمة المرور', submit: 'إنشاء الحساب', back: 'العودة إلى الصفحة الرئيسية', fill: 'يرجى إدخال جميع المعلومات.', shortPassword: 'يجب أن تكون كلمة المرور 4 أحرف على الأقل.', duplicate: 'اسم المستخدم هذا موجود بالفعل.', success: 'تم إنشاء الحساب بنجاح.' },
    zh: { title: '注册', subtitle: '创建用户账户', fullName: '全名', username: '用户名', password: '密码', submit: '注册', back: '返回首页', fill: '请填写完整信息。', shortPassword: '密码至少需要 4 个字符。', duplicate: '该用户名已被使用。', success: '注册成功。' },
    es: { title: 'Registrarse', subtitle: 'Crear cuenta de usuario', fullName: 'Nombre completo', username: 'Usuario', password: 'Contraseña', submit: 'Registrarse', back: 'Volver a inicio', fill: 'Por favor completa todos los campos.', shortPassword: 'La contraseña debe tener al menos 4 caracteres.', duplicate: 'Este nombre de usuario ya existe.', success: 'Registro completado con éxito.' }
  };

  const text = translations[language] || translations.fa;
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !username || !password) {
      setMessage(text.fill);
      setIsSuccess(false);
      return;
    }

    if (password.length < 4) {
      setMessage(text.shortPassword);
      setIsSuccess(false);
      return;
    }

    if (username === MASTER_ADMIN.username) {
      setMessage(text.duplicate);
      setIsSuccess(false);
      return;
    }

    const admins = getAdmins();
    if (admins.some(a => a.username === username)) {
      setMessage(text.duplicate);
      setIsSuccess(false);
      return;
    }

    const user = { name, username, password };
    loginUser(user);
    setMessage(text.success);
    setIsSuccess(true);

    setTimeout(() => closeOverlayPage('signupPage'), 500);
  };

  const handleBack = () => closeOverlayPage('signupPage');

  return (
    <section className="auth-page" id="signupPage">
      <div className="auth-card">
        <div className="auth-title">
          <img className="auth-logo" src="/sp-logo.png" alt="لوگو" />
          <h1>{text.title}</h1>
          <span>{text.subtitle}</span>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="field">
            <label>{text.fullName}</label>
            <div className="input-wrapper">
              <i className="fas fa-id-card"></i>
              <input
                type="text"
                placeholder={text.fullName}
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          </div>

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