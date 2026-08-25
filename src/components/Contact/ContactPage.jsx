import React from 'react';
import { useApp } from '../../context/AppContext';

export function ContactPage() {
  const { settings, complexes, currentAdmin, language } = useApp();

  const translations = {
    fa: {
      title: 'تماس با تیم پشتیبانی',
      back: 'بازگشت',
      company: 'اطلاعات شرکت',
      phone: 'شماره تماس:',
      address: 'آدرس:',
      note: 'برای تماس با مجتمع خاص، در بخش رزرو مجتمع موردنظر را انتخاب کنید.',
      notSet: 'ثبت نشده',
      unknownAddress: 'آدرس شرکت هنوز ثبت نشده است'
    },
    en: {
      title: 'Contact support team',
      back: 'Back',
      company: 'Company information',
      phone: 'Phone:',
      address: 'Address:',
      note: 'To contact a specific complex, choose it in the reservation section.',
      notSet: 'Not set',
      unknownAddress: 'Company address has not been added yet.'
    },
    ar: {
      title: 'تواصل مع فريق الدعم',
      back: 'رجوع',
      company: 'معلومات الشركة',
      phone: 'رقم التواصل:',
      address: 'العنوان:',
      note: 'للتواصل مع مجتمع معين، اختره في قسم الحجز.',
      notSet: 'غير مسجل',
      unknownAddress: 'عنوان الشركة لم يتم إدخاله بعد.'
    },
    zh: {
      title: '联系支持团队',
      back: '返回',
      company: '公司信息',
      phone: '联系电话：',
      address: '地址：',
      note: '如需联系特定社区，请在预订部分选择它。',
      notSet: '未设置',
      unknownAddress: '公司地址尚未填写。'
    },
    es: {
      title: 'Contacta con el equipo de soporte',
      back: 'Volver',
      company: 'Información de la empresa',
      phone: 'Teléfono:',
      address: 'Dirección:',
      note: 'Para contactar con un complejo específico, elígelo en la sección de reserva.',
      notSet: 'No configurado',
      unknownAddress: 'La dirección de la empresa aún no está registrada.'
    }
  };

  const text = translations[language] || translations.fa;

  const handleBack = () => {
    document.querySelector('.site').style.display = 'block';
    document.getElementById('contactPage').classList.remove('active');
    document.body.style.overflow = 'auto';
  };

  const companyPhone = settings.contactPhone || '09107727044';
  const companyAddress = settings.contactAddress || 'آدرس شرکت هنوز ثبت نشده است';

  return (
    <section className="contact-page" id="contactPage">
      <div className="contact-shell">
        <div className="contact-header">
          <div>
            <span className="contact-kicker">{language === 'fa' ? 'ارتباط با ما' : language === 'ar' ? 'تواصل معنا' : language === 'zh' ? '联系我们' : language === 'es' ? 'Contáctanos' : 'Contact us'}</span>
            <h1>{text.title}</h1>
          </div>
          <button type="button" className="back-home" onClick={handleBack}>
            <i className="fas fa-arrow-right"></i>
            {text.back}
          </button>
        </div>

        <div className="contact-card primary-contact">
          <div className="contact-icon"><i className="fas fa-building"></i></div>
          <h2>{text.company}</h2>
          <div className="contact-row">
            <span>{text.phone}</span>
            <strong>{companyPhone}</strong>
          </div>
          <div className="contact-row">
            <span>{text.address}</span>
            <strong>{companyAddress || text.notSet}</strong>
          </div>
          <p className="contact-note">{text.note}</p>
        </div>
      </div>
    </section>
  );
}
