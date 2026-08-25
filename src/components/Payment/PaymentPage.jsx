import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { RESERVATION_DAILY_AMOUNT, formatMoney } from '../../data/rates';

export function PaymentPage() {
  const { reserveSpot, user, currentAdmin, language } = useApp();
  const [reservation, setReservation] = useState(null);

  const translations = {
    fa: {
      notFound: 'اطلاعات رزرو یافت نشد.',
      return: 'بازگشت',
      error: 'خطا',
      retry: 'لطفاً دوباره تلاش کنید.',
      confirm: 'تایید پرداخت',
      priceLabel: 'تومان',
      spot: 'جای پارک',
      complex: 'مجتمع',
      duration: 'مدت',
      oneDay: 'یک روز',
      confirmPay: 'تایید و پرداخت',
      cancel: 'انصراف'
    },
    en: {
      notFound: 'Reservation data was not found.',
      return: 'Back',
      error: 'Error',
      retry: 'Please try again.',
      confirm: 'Confirm payment',
      priceLabel: 'Toman',
      spot: 'Parking spot',
      complex: 'Complex',
      duration: 'Duration',
      oneDay: 'One day',
      confirmPay: 'Confirm and pay',
      cancel: 'Cancel'
    },
    ar: {
      notFound: 'لم يتم العثور على بيانات الحجز.',
      return: 'رجوع',
      error: 'خطأ',
      retry: 'يرجى المحاولة مرة أخرى.',
      confirm: 'تأكيد الدفع',
      priceLabel: 'ريال',
      spot: 'موقف السيارة',
      complex: 'المجتمع',
      duration: 'المدة',
      oneDay: 'يوم واحد',
      confirmPay: 'تأكيد والدفع',
      cancel: 'إلغاء'
    },
    zh: {
      notFound: '未找到预约信息。',
      return: '返回',
      error: '错误',
      retry: '请重试。',
      confirm: '确认支付',
      priceLabel: '元',
      spot: '停车位',
      complex: '社区',
      duration: '时长',
      oneDay: '一天',
      confirmPay: '确认并支付',
      cancel: '取消'
    },
    es: {
      notFound: 'No se encontraron datos de reserva.',
      return: 'Volver',
      error: 'Error',
      retry: 'Inténtalo de nuevo.',
      confirm: 'Confirmar pago',
      priceLabel: 'Toman',
      spot: 'Plaza de parking',
      complex: 'Complejo',
      duration: 'Duración',
      oneDay: 'Un día',
      confirmPay: 'Confirmar y pagar',
      cancel: 'Cancelar'
    }
  };

  const text = translations[language] || translations.fa;

  useEffect(() => {
    const data = localStorage.getItem('prsTempReservation');
    if (data) {
      try {
        setReservation(JSON.parse(data));
      } catch {
        setReservation(null);
      }
    }
  }, []);

  const handleConfirmPayment = () => {
    if (!reservation) {
      alert(text.notFound);
      return;
    }

    try {
      const username = user?.username || currentAdmin?.username || 'کاربر';
      reserveSpot(reservation.spotIndex, username, {
        spotId: reservation.spotId,
        complexName: reservation.complexName,
        amount: reservation.amount ?? RESERVATION_DAILY_AMOUNT,
        duration: reservation.duration || text.oneDay
      });
      
      alert(`✅ جای پارک شماره ${reservation.spotId} در مجتمع "${reservation.complexName}" با موفقیت رزرو شد!`);
      
      localStorage.removeItem('prsTempReservation');
      document.getElementById('paymentPage').classList.remove('active');
      document.body.style.overflow = 'auto';
      document.querySelector('.site').style.display = 'block';
    } catch (error) {
      alert(error.message);
    }
  };

  const handleCancelPayment = () => {
    localStorage.removeItem('prsTempReservation');
    document.getElementById('paymentPage').classList.remove('active');
    document.getElementById('reservePage').classList.add('active');
    document.body.style.overflow = 'auto';
  };

  if (!reservation) {
    return (
      <section className="payment-page" id="paymentPage">
        <div className="payment-card">
          <div className="payment-icon">
            <i className="fas fa-exclamation-triangle"></i>
          </div>
          <h2>{text.error}</h2>
          <p>{text.notFound} {text.retry}</p>
          <div className="pay-actions">
            <button className="cancel-pay-btn" onClick={handleCancelPayment}>
              <i className="fas fa-times"></i> {text.return}
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="payment-page" id="paymentPage">
      <div className="payment-card">
        <div className="payment-icon">
          <i className="fas fa-receipt"></i>
        </div>

        <h2>{text.confirm}</h2>

        <div className="amount">
          {formatMoney(reservation.amount ?? RESERVATION_DAILY_AMOUNT, language)} <span>{text.priceLabel}</span>
        </div>

        <div className="details">
          <p>{text.spot}: <strong>{reservation.spotId}</strong></p>
          <p>{text.complex}: <strong>{reservation.complexName}</strong></p>
          <p>{text.duration}: <strong>{text.oneDay}</strong></p>
        </div>

        <div className="pay-actions">
          <button className="confirm-btn" onClick={handleConfirmPayment}>
            <i className="fas fa-check-circle"></i> {text.confirmPay}
          </button>
          <button className="cancel-pay-btn" onClick={handleCancelPayment}>
            <i className="fas fa-times"></i> {text.cancel}
          </button>
        </div>
      </div>
    </section>
  );
}