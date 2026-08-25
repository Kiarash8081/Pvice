import React from 'react';
import { useApp } from '../../context/AppContext';
import { UNION_RATES, UNION_RATES_YEAR, formatMoney } from '../../data/rates';

export function RatesPage() {
  const { language } = useApp();

  const translations = {
    fa: {
      kicker: 'تعرفه به‌روز',
      title: 'نرخنامه اتحادیه پارکینگ',
      back: 'بازگشت',
      intro: `نرخ‌های زیر معادل نرخ اتحادیه پارکینگ‌های عمومی برای سال ${UNION_RATES_YEAR} است. شهرداری تهران اعلام کرده نرخ پارکینگ‌های شهرداری حدود ۵۰٪ کمتر از اتحادیه است؛ بنابراین ارقام اتحادیه بر همان مبنای مصوب ۱۴۰۵ محاسبه شده‌اند.`,
      firstHour: 'ورودی / ساعت اول',
      extra: 'هر نیم‌ساعت اضافه',
      daily: 'شبانه روزی',
      toman: 'تومان',
      note: 'رزرو جای مشخص در پارکینگ، طبق اعلام اتحادیه و شهرداری، با تعرفه جداگانه قابل ارائه است.'
    },
    en: {
      kicker: 'Current tariff',
      title: 'Parking union rates',
      back: 'Back',
      intro: `These figures follow the public parking union tariff for ${UNION_RATES_YEAR}. Tehran municipality stated its own rates are about 50% below the union, so the union amounts are calculated from the approved 1405 municipal base.`,
      firstHour: 'Entry / first hour',
      extra: 'Each extra 30 minutes',
      daily: '24-hour stay',
      toman: 'Toman',
      note: 'Booking a specific space can be offered at a separate union/municipality surcharge.'
    },
    ar: {
      kicker: 'التعرفة الحالية',
      title: 'أسعار اتحاد المواقف',
      back: 'رجوع',
      intro: `الأرقام أدناه تعادل تعرفة اتحاد المواقف العامة لعام ${UNION_RATES_YEAR}. أعلنت بلدية طهران أن أسعارها أقل بنحو ٥٠٪ من الاتحاد، لذلك حُسبت أسعار الاتحاد على أساس تعرفة ١٤٠٥.`,
      firstHour: 'الدخول / الساعة الأولى',
      extra: 'كل نصف ساعة إضافية',
      daily: 'يومي',
      toman: 'تومان',
      note: 'يمكن تقديم حجز مكان محدد برسم منفصل وفق الاتحاد والبلدية.'
    },
    zh: {
      kicker: '最新费率',
      title: '停车行业协会费率',
      back: '返回',
      intro: `以下为 ${UNION_RATES_YEAR} 年公共停车行业协会费率。德黑兰市政表示其费率约为协会的一半，因此协会价格按 1405 年核准基数换算。`,
      firstHour: '入场 / 首小时',
      extra: '之后每 30 分钟',
      daily: '全天',
      toman: '托曼',
      note: '预留指定车位可按协会/市政规定另行计费。'
    },
    es: {
      kicker: 'Tarifa vigente',
      title: 'Tarifas del sindicato de parking',
      back: 'Volver',
      intro: `Estas cifras siguen la tarifa sindical de parkings públicos para ${UNION_RATES_YEAR}. El municipio de Teherán indicó que sus tarifas están un 50% por debajo del sindicato, así que los importes sindicales se calculan sobre la base aprobada de 1405.`,
      firstHour: 'Entrada / primera hora',
      extra: 'Cada 30 minutos extra',
      daily: 'Día completo',
      toman: 'Tomán',
      note: 'Reservar una plaza concreta puede tener un recargo aparte según el sindicato y el municipio.'
    }
  };

  const text = translations[language] || translations.fa;

  const handleBack = () => {
    document.querySelector('.site').style.display = 'block';
    document.getElementById('ratesPage').classList.remove('active');
    document.body.style.overflow = 'auto';
  };

  return (
    <section className="info-overlay-page" id="ratesPage">
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

        <p className="rates-intro">{text.intro}</p>

        <div className="rates-grid">
          {UNION_RATES.map((rate) => (
            <article className="rate-card" key={rate.id}>
              <div className="rate-card-title">
                <i className={`fas ${rate.icon}`}></i>
                <h2>{rate.title[language] || rate.title.fa}</h2>
              </div>
              <div className="contact-row">
                <span>{text.firstHour}</span>
                <strong>{formatMoney(rate.firstHour, language)} {text.toman}</strong>
              </div>
              <div className="contact-row">
                <span>{text.extra}</span>
                <strong>{formatMoney(rate.extraHalfHour, language)} {text.toman}</strong>
              </div>
              <div className="contact-row">
                <span>{text.daily}</span>
                <strong>{formatMoney(rate.daily, language)} {text.toman}</strong>
              </div>
            </article>
          ))}
        </div>

        <p className="contact-note">{text.note}</p>
      </div>
    </section>
  );
}
