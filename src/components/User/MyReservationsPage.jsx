import React from 'react';
import { useApp } from '../../context/AppContext';
import { formatMoney } from '../../data/rates';

export function MyReservationsPage() {
  const { language, getCurrentUser, getUserReservations, cancelUserReservation } = useApp();

  const translations = {
    fa: {
      kicker: 'سابقه کاربر',
      title: 'رزروهای من',
      back: 'بازگشت',
      empty: 'هنوز رزروی برای این حساب ثبت نشده است.',
      login: 'برای دیدن سابقه رزرو، ابتدا وارد شوید.',
      complex: 'مجتمع',
      spot: 'جای پارک',
      amount: 'مبلغ',
      duration: 'مدت',
      date: 'تاریخ',
      status: 'وضعیت',
      active: 'فعال',
      cancelled: 'لغو شده',
      cancel: 'لغو رزرو',
      toman: 'تومان',
      confirmCancel: 'این رزرو لغو شود؟'
    },
    en: {
      kicker: 'User history',
      title: 'My reservations',
      back: 'Back',
      empty: 'No reservations are recorded for this account yet.',
      login: 'Please sign in to see your reservation history.',
      complex: 'Complex',
      spot: 'Parking spot',
      amount: 'Amount',
      duration: 'Duration',
      date: 'Date',
      status: 'Status',
      active: 'Active',
      cancelled: 'Cancelled',
      cancel: 'Cancel reservation',
      toman: 'Toman',
      confirmCancel: 'Cancel this reservation?'
    },
    ar: {
      kicker: 'سجل المستخدم',
      title: 'حجوزاتي',
      back: 'رجوع',
      empty: 'لا توجد حجوزات مسجلة لهذا الحساب بعد.',
      login: 'يرجى تسجيل الدخول لعرض سجل الحجوزات.',
      complex: 'المجتمع',
      spot: 'موقف السيارة',
      amount: 'المبلغ',
      duration: 'المدة',
      date: 'التاريخ',
      status: 'الحالة',
      active: 'نشط',
      cancelled: 'ملغى',
      cancel: 'إلغاء الحجز',
      toman: 'تومان',
      confirmCancel: 'هل تريد إلغاء هذا الحجز؟'
    },
    zh: {
      kicker: '用户记录',
      title: '我的预订',
      back: '返回',
      empty: '该账户还没有预订记录。',
      login: '请先登录以查看预订记录。',
      complex: '社区',
      spot: '车位',
      amount: '金额',
      duration: '时长',
      date: '日期',
      status: '状态',
      active: '有效',
      cancelled: '已取消',
      cancel: '取消预订',
      toman: '托曼',
      confirmCancel: '要取消此预订吗？'
    },
    es: {
      kicker: 'Historial',
      title: 'Mis reservas',
      back: 'Volver',
      empty: 'Aún no hay reservas para esta cuenta.',
      login: 'Inicia sesión para ver tu historial de reservas.',
      complex: 'Complejo',
      spot: 'Plaza',
      amount: 'Importe',
      duration: 'Duración',
      date: 'Fecha',
      status: 'Estado',
      active: 'Activa',
      cancelled: 'Cancelada',
      cancel: 'Cancelar reserva',
      toman: 'Tomán',
      confirmCancel: '¿Cancelar esta reserva?'
    }
  };

  const text = translations[language] || translations.fa;
  const current = getCurrentUser();
  const items = current ? getUserReservations(current.username) : [];

  const handleBack = () => {
    document.querySelector('.site').style.display = 'block';
    document.getElementById('myReservationsPage').classList.remove('active');
    document.body.style.overflow = 'auto';
  };

  const handleCancel = (item) => {
    if (!window.confirm(text.confirmCancel)) return;
    try {
      cancelUserReservation(item.id);
    } catch (error) {
      alert(error.message);
    }
  };

  const formatDate = (value) => {
    try {
      return new Date(value).toLocaleString(language === 'fa' || language === 'ar' ? 'fa-IR' : undefined);
    } catch {
      return '---';
    }
  };

  return (
    <section className="info-overlay-page" id="myReservationsPage">
      <div className="contact-shell">
        <div className="contact-header">
          <div>
            <span className="contact-kicker">{text.kicker}</span>
            <h1>{text.title}</h1>
          </div>
          <button type="button" className="back-home" onClick={handleBack}>
            <i className="fas fa-arrow-right"></i>
            {text.back}
          </button>
        </div>

        {!current && (
          <div className="contact-card">
            <p className="contact-note">{text.login}</p>
          </div>
        )}

        {current && items.length === 0 && (
          <div className="contact-card">
            <p className="contact-note">{text.empty}</p>
          </div>
        )}

        {current && items.length > 0 && (
          <div className="reservation-list">
            {items.map((item) => (
              <article className={`reservation-card ${item.status}`} key={item.id}>
                <div className="reservation-top">
                  <strong>{item.complexName || '---'}</strong>
                  <span className={`reservation-status ${item.status}`}>
                    {item.status === 'cancelled' ? text.cancelled : text.active}
                  </span>
                </div>
                <div className="contact-row">
                  <span>{text.spot}</span>
                  <strong>{item.spotId}</strong>
                </div>
                <div className="contact-row">
                  <span>{text.amount}</span>
                  <strong>{formatMoney(item.amount, language)} {text.toman}</strong>
                </div>
                <div className="contact-row">
                  <span>{text.duration}</span>
                  <strong>{item.duration || '---'}</strong>
                </div>
                <div className="contact-row">
                  <span>{text.date}</span>
                  <strong>{formatDate(item.createdAt)}</strong>
                </div>
                {item.status === 'active' && (
                  <button type="button" className="cancel-btn reservation-cancel" onClick={() => handleCancel(item)}>
                    <i className="fas fa-times"></i> {text.cancel}
                  </button>
                )}
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
