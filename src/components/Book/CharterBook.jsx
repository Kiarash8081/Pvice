import React, { useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { buildCharterPages } from '../../data/charter';
import { BookStandalone } from './BookStandalone';

export function CharterBook() {
  const { settings, language } = useApp();
  const pages = useMemo(() => buildCharterPages(settings.charter), [settings.charter]);
  const isRtl = language === 'fa' || language === 'ar';

  const headings = {
    fa: { kicker: 'منشور', title: 'حقوق مشتری' },
    en: { kicker: 'Charter', title: 'Customer rights' },
    ar: { kicker: 'الميثاق', title: 'حقوق العميل' },
    zh: { kicker: '章程', title: '客户权利' },
    es: { kicker: 'Carta', title: 'Derechos del cliente' }
  };
  const heading = headings[language] || headings.fa;

  return (
    <section className="charter-section" aria-label={heading.title}>
      <div className="charter-heading">
        <span>{heading.kicker}</span>
        <h2>{heading.title}</h2>
      </div>
      <div className="charter-book">
        <BookStandalone pages={pages} isRtl={isRtl} logoSrc="/sp-logo.png" />
      </div>
    </section>
  );
}
