import React from 'react';
import { useApp } from '../../context/AppContext';
import { AngularButton } from '../Common/AngularButton';
import { IranMap } from './IranMap';
import { CharterBook } from '../Book/CharterBook';

export function HomePage({ mapReady = false }) {
  const { isLoggedIn, settings, language } = useApp();
  const [activeAction, setActiveAction] = React.useState('signup');

  const translations = {
    fa: {
      badge: 'پارکینگ هوشمند',
      title: 'رزرو سریع، مدیریت دقیق و تجربه‌ای مدرن',
      text: 'با یک تجربه‌ی ساده و حرفه‌ای، پارکینگ موردنظر خود را در چند کلیک انتخاب کنید.',
      signup: 'ثبت‌نام',
      login: 'ورود',
      reserve: 'رزرو پارکینگ',
      myReservations: 'رزروهای من',
      rates: 'نرخنامه',
      loginDetail: 'ورود سریع به حساب کاربری و دسترسی به رزروهای ذخیره‌شده.',
      reserveDetail: 'انتخاب مجتمع و جای پارک، سپس تکمیل رزرو و پرداخت در چند مرحله ساده.',
      myReservationsDetail: 'مشاهده سابقه رزروهای همین حساب کاربری.',
      ratesDetail: 'تعرفه به‌روز اتحادیه پارکینگ‌های عمومی.',
      contactDetail: 'ارتباط سریع با تیم پشتیبانی و دریافت پاسخ در کمترین زمان ممکن.',
      features: 'امکانات',
      payment: 'نوع پرداخت',
      contact: 'ارتباط با ما',
      featureHeading: 'چرا این سامانه انتخاب مناسبی است؟',
      workTitle: 'ویژگی‌های اصلی',
      featureIntro: 'سیستم هوشمند پارکینگ با امکانات پیشرفته:',
      paymentIntro: 'روش‌های پرداخت متنوع:',
      featureItems: ['رزرو آنلاین جای پارک', 'پرداخت امن و سریع', 'نمایش وضعیت لحظه‌ای', 'مدیریت مجتمع‌ها'],
      paymentItems: ['پرداخت آنلاین با کارت بانکی', 'کیف پول الکترونیکی', 'پرداخت در محل', 'اشتراک ماهانه'],
      showcaseTitle: 'ویژگی‌های اصلی',
      cards: [
        { title: 'نقشه و مکان دقیق', text: 'نمایش موقعیت مجتمع‌ها روی نقشه و انتخاب آدرس با دقت بالا.' },
        { title: 'امنیت و کنترل', text: 'دسترسی‌های مجزا برای ادمین اصلی، ادمین مجتمع و کاربران عادی.' },
        { title: 'رزرو سریع', text: 'انتخاب جای پارک، رزرو آنلاین و ثبت سریع درخواست بدون سردرگمی.' },
        { title: 'مدیریت هوشمند', text: 'نمایش وضعیت مجتمع‌ها و مدیریت ظرفیت با تجربه‌ای حرفه‌ای‌تر.' }
      ]
    },
    en: {
      badge: 'Smart Parking',
      title: 'Fast booking, precise management, and a modern experience',
      text: 'Enjoy a simple, professional flow to choose the perfect parking spot in just a few clicks.',
      signup: 'Sign up',
      login: 'Login',
      reserve: 'Reserve parking',
      myReservations: 'My reservations',
      rates: 'Rate list',
      loginDetail: 'Quickly sign in to access saved reservations.',
      reserveDetail: 'Choose a complex and spot, then complete booking and payment.',
      myReservationsDetail: 'See the reservation history of this account.',
      ratesDetail: 'Current public parking union tariff.',
      contactDetail: 'Reach support quickly and get help in the shortest time.',
      features: 'Features',
      payment: 'Payment methods',
      contact: 'Contact us',
      featureHeading: 'Why this system is a smart choice?',
      workTitle: 'Main features',
      featureIntro: 'An intelligent parking system with advanced capabilities:',
      paymentIntro: 'Various payment methods:',
      featureItems: ['Online parking booking', 'Secure and fast payments', 'Live status updates', 'Community management'],
      paymentItems: ['Online card payment', 'Digital wallet', 'On-site payment', 'Monthly subscription'],
      showcaseTitle: 'Main features',
      cards: [
        { title: 'Map and precise location', text: 'Display the position of complexes on a map and choose the address accurately.' },
        { title: 'Security and control', text: 'Separate access for the main admin, complex admin and regular users.' },
        { title: 'Quick reservation', text: 'Choose a parking space and submit a booking without confusion.' },
        { title: 'Smart management', text: 'Monitor complex status and manage capacity with a professional workflow.' }
      ]
    },
    ar: {
      badge: 'مواقف ذكية',
      title: 'حجز سريع، إدارة دقيقة وتجربة عصرية',
      text: 'استمتع بتجربة بسيطة ومهنية لاختيار موقفك المثالي خلال ثوانٍ.',
      signup: 'إنشاء حساب',
      login: 'تسجيل الدخول',
      reserve: 'حجز الموقف',
      myReservations: 'حجوزاتي',
      rates: 'التعرفة',
      loginDetail: 'تسجيل سريع للوصول إلى الحجوزات المحفوظة.',
      reserveDetail: 'اختر المجتمع والمكان ثم أكمل الحجز والدفع.',
      myReservationsDetail: 'عرض سجل حجوزات هذا الحساب.',
      ratesDetail: 'تعرفة اتحاد المواقف العامة الحالية.',
      contactDetail: 'تواصل مع الدعم بسرعة واحصل على المساعدة فورًا.',
      features: 'المزايا',
      payment: 'الدفع',
      contact: 'تواصل معنا',
      featureHeading: 'لماذا هذا النظام خيارًا ذكيًا؟',
      workTitle: 'الميزات الرئيسية',
      featureIntro: 'نظام مواقف ذكي مع ميزات متقدمة:',
      paymentIntro: 'طرق دفع متنوعة:',
      featureItems: ['حجز المواقف عبر الإنترنت', 'دفع آمن وسريع', 'عرض الحالة فورياً', 'إدارة المجتمعات'],
      paymentItems: ['الدفع عبر الإنترنت', 'المحفظة الإلكترونية', 'الدفع عند الوصول', 'اشتراك شهري'],
      showcaseTitle: 'الميزات الرئيسية',
      cards: [
        { title: 'خريطة وموقع دقيق', text: 'عرض أماكن المجتمعات على الخريطة واختيار العنوان بدقة.' },
        { title: 'الأمان والتحكم', text: 'صلاحيات منفصلة للمدير الرئيسي ومدير المجتمع والمستخدمين العاديين.' },
        { title: 'حجز سريع', text: 'اختيار مكان وقبول الحجز بسرعة ودون تعقيد.' },
        { title: 'إدارة ذكية', text: 'عرض حالة المجتمعات وإدارة السعة بشكل احترافي.' }
      ]
    },
    zh: {
      badge: '智能停车',
      title: '快速预订、精确管理和现代体验',
      text: '通过简单专业的流程，在几次点击内选择理想的停车位。',
      signup: '注册',
      login: '登录',
      reserve: '预订停车位',
      myReservations: '我的预订',
      rates: '费率表',
      loginDetail: '快速登录以访问已保存的预订。',
      reserveDetail: '选择社区和车位，然后完成预订和支付。',
      myReservationsDetail: '查看本账户的预订记录。',
      ratesDetail: '最新公共停车行业协会费率。',
      contactDetail: '快速联系支持并在最短时间内获得帮助。',
      features: '功能',
      payment: '支付',
      contact: '联系我们',
      featureHeading: '为什么这个系统是明智之选？',
      workTitle: '核心功能',
      featureIntro: '一套具备高级功能的智能停车系统：',
      paymentIntro: '多种支付方式：',
      featureItems: ['在线预订车位', '安全快速支付', '实时状态展示', '社区管理'],
      paymentItems: ['在线刷卡支付', '电子钱包', '现场支付', '月度订阅'],
      showcaseTitle: '核心功能',
      cards: [
        { title: '地图与精确位置', text: '在地图上显示社区位置，并精确选择地址。' },
        { title: '安全与控制', text: '为总管理员、社区管理员和普通用户提供独立权限。' },
        { title: '快速预约', text: '选择停车位并快速完成预约流程。' },
        { title: '智能管理', text: '实时查看社区状态并专业管理停车容量。' }
      ]
    },
    es: {
      badge: 'Estacionamiento inteligente',
      title: 'Reserva rápida, gestión precisa y experiencia moderna',
      text: 'Disfruta de un flujo simple y profesional para elegir tu plaza ideal en segundos.',
      signup: 'Registrarse',
      login: 'Iniciar sesión',
      reserve: 'Reservar plaza',
      myReservations: 'Mis reservas',
      rates: 'Tarifas',
      loginDetail: 'Inicia sesión rápidamente para acceder a reservas guardadas.',
      reserveDetail: 'Elige un complejo y plaza, luego completa la reserva y el pago.',
      myReservationsDetail: 'Consulta el historial de reservas de esta cuenta.',
      ratesDetail: 'Tarifa vigente del sindicato de parkings públicos.',
      contactDetail: 'Contacta con soporte rápidamente y recibe ayuda cuanto antes.',
      features: 'Funciones',
      payment: 'Pagos',
      contact: 'Contacto',
      featureHeading: '¿Por qué este sistema es una buena opción?',
      workTitle: 'Funciones principales',
      featureIntro: 'Un sistema inteligente con capacidades avanzadas:',
      paymentIntro: 'Diversos métodos de pago:',
      featureItems: ['Reserva online del estacionamiento', 'Pago seguro y rápido', 'Estado en tiempo real', 'Gestión de comunidades'],
      paymentItems: ['Pago con tarjeta online', 'Billetera digital', 'Pago en sitio', 'Suscripción mensual'],
      showcaseTitle: 'Funciones principales',
      cards: [
        { title: 'Mapa y ubicación precisa', text: 'Muestra la posición de los complejos en un mapa y selecciona la dirección con precisión.' },
        { title: 'Seguridad y control', text: 'Permisos separados para el administrador principal, el administrador del complejo y los usuarios.' },
        { title: 'Reserva rápida', text: 'Elige tu plaza y realiza la reserva sin complicaciones.' },
        { title: 'Gestión inteligente', text: 'Consulta el estado de los complejos y gestiona la capacidad de forma profesional.' }
      ]
    }
  };

  const text = translations[language] || translations.fa;

  const handleShowLogin = () => {
    document.querySelector('.site').style.display = 'none';
    document.getElementById('loginPage').classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const handleShowSignup = () => {
    document.querySelector('.site').style.display = 'none';
    document.getElementById('signupPage').classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const handleShowReserve = () => {
    if (!isLoggedIn()) {
      alert('لطفاً ابتدا وارد حساب کاربری خود شوید.');
      return;
    }
    document.querySelector('.site').style.display = 'none';
    document.getElementById('reservePage').classList.add('active');
    document.body.style.overflow = 'auto';
  };

  const scrollToInfo = () => {
    const infoSection = document.getElementById('infoSection');
    if (infoSection) {
      infoSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleShowContact = () => {
    document.querySelector('.site').style.display = 'none';
    document.getElementById('contactPage').classList.add('active');
    document.body.style.overflow = 'auto';
  };

  const handleShowMyReservations = () => {
    if (!isLoggedIn()) {
      alert(language === 'fa' ? 'لطفاً ابتدا وارد حساب کاربری خود شوید.' : 'Please log in first.');
      return;
    }
    document.querySelector('.site').style.display = 'none';
    document.getElementById('myReservationsPage').classList.add('active');
    document.body.style.overflow = 'auto';
  };

  const handleShowRates = () => {
    document.querySelector('.site').style.display = 'none';
    document.getElementById('ratesPage').classList.add('active');
    document.body.style.overflow = 'auto';
  };

  const quickActions = [
    {
      key: 'signup',
      label: text.signup,
      icon: 'fa-user-plus',
      detail: text.text,
      onClick: handleShowSignup
    },
    {
      key: 'login',
      label: text.login,
      icon: 'fa-sign-in-alt',
      detail: text.loginDetail || text.text,
      onClick: handleShowLogin
    },
    {
      key: 'reserve',
      label: text.reserve,
      icon: 'fa-calendar-check',
      detail: text.reserveDetail || text.text,
      onClick: handleShowReserve
    },
    {
      key: 'myReservations',
      label: text.myReservations,
      icon: 'fa-clipboard-list',
      detail: text.myReservationsDetail,
      onClick: handleShowMyReservations
    },
    {
      key: 'rates',
      label: text.rates,
      icon: 'fa-tags',
      detail: text.ratesDetail,
      onClick: handleShowRates
    },
    {
      key: 'features',
      label: text.features,
      icon: 'fa-chevron-down',
      detail: text.featureIntro,
      onClick: scrollToInfo
    },
    {
      key: 'payment',
      label: text.payment,
      icon: 'fa-credit-card',
      detail: text.paymentIntro,
      onClick: scrollToInfo
    },
    {
      key: 'contact',
      label: text.contact,
      icon: 'fa-phone-volume',
      detail: text.contactDetail || text.text,
      onClick: handleShowContact
    }
  ];

  return (
    <main className="home-page">
      <IranMap active={mapReady} />

      <section className="menu-section app-actions-section">
        <div className="quick-actions centered-stack">
          <div className="actions-row top-row">
            {['signup', 'login'].map((k) => {
              const action = quickActions.find((a) => a.key === k);
              return (
                <AngularButton
                  key={action.key}
                  className={`quick-action-card ${activeAction === action.key ? 'active' : ''}`}
                  onClick={() => {
                    setActiveAction(action.key);
                    action.onClick();
                  }}
                >
                  <i className={`fas ${action.icon}`} />
                  <span>{action.label}</span>
                </AngularButton>
              );
            })}
          </div>

          <div className="actions-row middle-row">
            {(() => {
              const action = quickActions.find((a) => a.key === 'reserve');
              return (
                <AngularButton
                  key={action.key}
                  className={`quick-action-card reserve-card ${activeAction === action.key ? 'active' : ''}`}
                  onClick={() => {
                    setActiveAction(action.key);
                    action.onClick();
                  }}
                >
                  <i className={`fas ${action.icon}`} />
                  <span>{action.label}</span>
                </AngularButton>
              );
            })()}
          </div>

          <div className="actions-row extra-row">
            {['myReservations', 'rates'].map((k) => {
              const action = quickActions.find((a) => a.key === k);
              return (
                <AngularButton
                  key={action.key}
                  className={`quick-action-card ${activeAction === action.key ? 'active' : ''}`}
                  onClick={() => {
                    setActiveAction(action.key);
                    action.onClick();
                  }}
                >
                  <i className={`fas ${action.icon}`} />
                  <span>{action.label}</span>
                </AngularButton>
              );
            })}
          </div>

          <div className="actions-row bottom-row">
            {['features', 'payment', 'contact'].map((k) => {
              const action = quickActions.find((a) => a.key === k);
              return (
                <AngularButton
                  key={action.key}
                  className={`quick-action-card ${activeAction === action.key ? 'active' : ''}`}
                  onClick={() => {
                    setActiveAction(action.key);
                    action.onClick();
                  }}
                >
                  <i className={`fas ${action.icon}`} />
                  <span>{action.label}</span>
                </AngularButton>
              );
            })}
          </div>
        </div>
      </section>

      <section className="menu-section hero-panel">
        <div className="hero-copy">
          <span className="eyebrow">{text.badge}</span>
          <h2>{text.title}</h2>
          <p>{text.text}</p>
        </div>
      </section>

      <div className="info-section" id="infoSection">
        <div className="info-card">
          <div className="info-icon">
            <i className="fas fa-cogs"></i>
          </div>
          <h3>
            <i className="fas fa-chevron-left"></i> امکانات
          </h3>
          <div className="info-content" id="featuresContent">
            {settings.features ? (
              <div dangerouslySetInnerHTML={{ __html: settings.features.replace(/\n/g, '<br>') }} />
            ) : (
              <>
                <p>{text.featureIntro}</p>
                <ul>
                  {text.featureItems.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </div>

        <div className="info-card">
          <div className="info-icon">
            <i className="fas fa-credit-card"></i>
          </div>
          <h3>
            <i className="fas fa-chevron-left"></i> نوع پرداخت
          </h3>
          <div className="info-content" id="paymentContent">
            {settings.payment ? (
              <div dangerouslySetInnerHTML={{ __html: settings.payment.replace(/\n/g, '<br>') }} />
            ) : (
              <>
                <p>{text.paymentIntro}</p>
                <ul>
                  {text.paymentItems.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </div>
      </div>

      <section className="feature-showcase">
        <div className="feature-header">
          <span className="mini-badge">{text.workTitle}</span>
          <h3>{text.featureHeading}</h3>
        </div>

        <div className="feature-grid">
          {text.cards.map((card, index) => (
            <div className="feature-card" key={card.title}>
              <i className={[
                'fas fa-map-marked-alt',
                'fas fa-shield-alt',
                'fas fa-calendar-check',
                'fas fa-chart-line'
              ][index]}></i>
              <h4>{card.title}</h4>
              <p>{card.text}</p>
            </div>
          ))}
        </div>
      </section>

      <CharterBook />
    </main>
  );
}