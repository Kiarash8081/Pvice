export const UNION_RATES_YEAR = '1405';

export const UNION_RATES = [
  {
    id: 'grade1',
    icon: 'fa-car',
    title: {
      fa: 'سواری — رده اول (هوشمند)',
      en: 'Car — Grade 1 (smart)',
      ar: 'سيارة — الدرجة الأولى (ذكي)',
      zh: '轿车 — 一级（智能）',
      es: 'Turismo — Grado 1 (inteligente)'
    },
    firstHour: 39000,
    extraHalfHour: 7600,
    daily: 340000
  },
  {
    id: 'grade2',
    icon: 'fa-warehouse',
    title: {
      fa: 'سواری — رده دوم',
      en: 'Car — Grade 2',
      ar: 'سيارة — الدرجة الثانية',
      zh: '轿车 — 二级',
      es: 'Turismo — Grado 2'
    },
    firstHour: 31200,
    extraHalfHour: 6200,
    daily: 270000
  },
  {
    id: 'grade3',
    icon: 'fa-parking',
    title: {
      fa: 'سواری — رده سوم (روباز)',
      en: 'Car — Grade 3 (open-air)',
      ar: 'سيارة — الدرجة الثالثة (مكشوف)',
      zh: '轿车 — 三级（露天）',
      es: 'Turismo — Grado 3 (descubierto)'
    },
    firstHour: 23000,
    extraHalfHour: 5200,
    daily: 200000
  },
  {
    id: 'moto',
    icon: 'fa-motorcycle',
    title: {
      fa: 'موتورسیکلت (۲۰٪ نرخ سواری)',
      en: 'Motorcycle (20% of car rate)',
      ar: 'دراجة نارية (٢٠٪ من سعر السيارة)',
      zh: '摩托车（轿车费率的 20%）',
      es: 'Motocicleta (20% de la tarifa del auto)'
    },
    firstHour: 12000,
    extraHalfHour: 4000,
    daily: 54000
  }
];

export const RESERVATION_DAILY_AMOUNT = 270000;

export function formatMoney(amount, language = 'fa') {
  const locale = language === 'fa' || language === 'ar' ? 'fa-IR' : language === 'zh' ? 'zh-CN' : 'en-US';
  return Number(amount || 0).toLocaleString(locale);
}
