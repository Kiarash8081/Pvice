import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { RESERVATION_DAILY_AMOUNT, formatMoney } from '../../data/rates';

export function ReservePage() {
  const {
    complexes,
    parkingSpots,
    selectedComplex,
    setSelectedComplex,
    selectedSpot,
    setSelectedSpot,
    reserveSpot,
    user,
    currentAdmin,
    updateComplex,
    language
  } = useApp();

  const translations = {
    fa: {
      title: 'رزرو پارکینگ',
      back: 'بازگشت',
      complexSelect: 'انتخاب مجتمع پارکینگ',
      seeMap: 'دیدن در نقشه',
      contact: 'تماس با مجتمع',
      selectReserve: 'انتخاب و رزرو',
      step1: 'انتخاب مجتمع',
      step2: 'انتخاب جای پارک',
      step3: 'پرداخت',
      noComplex: 'مجتمع انتخابی پیدا نشد.',
      saveSuccess: 'تغییرات مجتمع با موفقیت ذخیره شد.',
      noAddress: 'لطفاً نام و آدرس مجتمع را کامل وارد کنید.',
      selectSpot: 'لطفاً ابتدا یک جای پارک انتخاب کنید.',
      unavailable: 'این جای پارک در دسترس نیست.',
      loginRequired: 'لطفاً ابتدا وارد حساب کاربری خود شوید.',
      alreadyReserved: 'این جای پارک قبلاً رزرو شده است.',
      contactLabel: 'تماس با مجتمع:',
      notSet: 'ثبت نشده',
      empty: 'خالی',
      selected: 'انتخاب شده',
      reserved: 'رزرو شده',
      pay: 'پرداخت',
      cancel: 'انصراف',
      parkingSlot: 'جای پارک',
      complexity: 'مجتمع',
      changeComplex: 'تغییر مجتمع',
      oneDay: 'یک روز'
    },
    en: {
      title: 'Parking reservation',
      back: 'Back',
      complexSelect: 'Choose parking complex',
      seeMap: 'View on map',
      contact: 'Contact complex',
      selectReserve: 'Select and reserve',
      step1: 'Choose complex',
      step2: 'Choose a parking spot',
      step3: 'Payment',
      noComplex: 'Selected complex not found.',
      saveSuccess: 'Complex changes saved successfully.',
      noAddress: 'Please complete the complex name and address.',
      selectSpot: 'Please select a parking spot first.',
      unavailable: 'This parking spot is unavailable.',
      loginRequired: 'Please log in first.',
      alreadyReserved: 'This parking spot is already reserved.',
      contactLabel: 'Contact complex:',
      notSet: 'Not set',
      empty: 'Available',
      selected: 'Selected',
      reserved: 'Reserved',
      pay: 'Pay',
      cancel: 'Cancel',
      parkingSlot: 'Parking spot',
      complexity: 'Complex',
      changeComplex: 'Change complex',
      oneDay: 'One day'
    },
    ar: {
      title: 'حجز المواقف',
      back: 'رجوع',
      complexSelect: 'اختيار المجتمع',
      seeMap: 'عرض على الخريطة',
      contact: 'الاتصال بالمجتمع',
      selectReserve: 'اختيار وحجز',
      step1: 'اختيار المجتمع',
      step2: 'اختيار مكان',
      step3: 'الدفع',
      noComplex: 'لم يتم العثور على المجتمع المحدد.',
      saveSuccess: 'تم حفظ تغييرات المجتمع بنجاح.',
      noAddress: 'يرجى إدخال اسم المجمع وعنوانه بالكامل.',
      selectSpot: 'يرجى اختيار مكان أولاً.',
      unavailable: 'هذا المكان غير متاح.',
      loginRequired: 'يرجى تسجيل الدخول أولاً.',
      alreadyReserved: 'هذا المكان محجوز بالفعل.',
      contactLabel: 'الاتصال بالمجتمع:',
      notSet: 'غير مسجل',
      empty: 'متاح',
      selected: 'محدد',
      reserved: 'محجوز',
      pay: 'الدفع',
      cancel: 'إلغاء',
      parkingSlot: 'موقف السيارة',
      complexity: 'المجتمع',
      changeComplex: 'تغيير المجتمع'
    },
    zh: {
      title: '停车位预订',
      back: '返回',
      complexSelect: '选择停车社区',
      seeMap: '查看地图',
      contact: '联系社区',
      selectReserve: '选择并预订',
      step1: '选择社区',
      step2: '选择停车位',
      step3: '支付',
      noComplex: '未找到所选社区。',
      saveSuccess: '社区修改已成功保存。',
      noAddress: '请完整填写社区名称和地址。',
      selectSpot: '请先选择停车位。',
      unavailable: '该停车位不可用。',
      loginRequired: '请先登录。',
      alreadyReserved: '该停车位已被预订。',
      contactLabel: '联系社区：',
      notSet: '未设置',
      empty: '可用',
      selected: '已选',
      reserved: '已预订',
      pay: '支付',
      cancel: '取消',
      parkingSlot: '停车位',
      complexity: '社区',
      changeComplex: '更改社区'
    },
    es: {
      title: 'Reserva de parking',
      back: 'Volver',
      complexSelect: 'Elegir complejo',
      seeMap: 'Ver en mapa',
      contact: 'Contactar complejo',
      selectReserve: 'Elegir y reservar',
      step1: 'Elegir complejo',
      step2: 'Elegir plaza',
      step3: 'Pago',
      noComplex: 'No se encontró el complejo seleccionado.',
      saveSuccess: 'Los cambios del complejo se guardaron correctamente.',
      noAddress: 'Completa el nombre y la dirección del complejo.',
      selectSpot: 'Primero selecciona una plaza.',
      unavailable: 'Esta plaza no está disponible.',
      loginRequired: 'Primero debes iniciar sesión.',
      alreadyReserved: 'Esta plaza ya está reservada.',
      contactLabel: 'Contactar complejo:',
      notSet: 'No configurado',
      empty: 'Disponible',
      selected: 'Seleccionado',
      reserved: 'Reservado',
      pay: 'Pagar',
      cancel: 'Cancelar',
      parkingSlot: 'Plaza de parking',
      complexity: 'Complejo',
      changeComplex: 'Cambiar complejo'
    }
  };

  const text = translations[language] || translations.fa;

  const [step, setStep] = useState('complex');
  const [selectedSpotIndex, setSelectedSpotIndex] = useState(null);
  const [tempLat, setTempLat] = useState(35.699756);
  const [tempLng, setTempLng] = useState(51.338076);
  const [complexDraft, setComplexDraft] = useState({
    name: '',
    status: 'available',
    location: ''
  });

  const ROWS = 6;
  const COLS = 10;

  useEffect(() => {
    setStep('complex');
    setSelectedSpotIndex(null);
  }, []);

  const selectComplex = (index) => {
    const complex = complexes[index];
    setSelectedComplex(complex);
    const parsed = parseLocationCoords(complex?.location);
    setComplexDraft({
      name: complex?.name || '',
      status: complex?.status || 'available',
      location: complex?.location || `${parsed.lat.toFixed(6)}, ${parsed.lng.toFixed(6)}`
    });
    setTempLat(parsed.lat);
    setTempLng(parsed.lng);
    setStep('parking');
    setSelectedSpotIndex(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleComplexContact = (complex) => {
    if (!complex) return;
    setSelectedComplex(complex);
    const parsed = parseLocationCoords(complex?.location);
    setComplexDraft({
      name: complex?.name || '',
      status: complex?.status || 'available',
      location: complex?.location || `${parsed.lat.toFixed(6)}, ${parsed.lng.toFixed(6)}`
    });
    setTempLat(parsed.lat);
    setTempLng(parsed.lng);
    setStep('parking');
    setSelectedSpotIndex(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goToComplexSelection = () => {
    setStep('complex');
    setSelectedSpotIndex(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSpotClick = (index) => {
    const spots = parkingSpots;
    if (spots[index].reserved) {
      alert(text.alreadyReserved);
      return;
    }
    if (selectedSpotIndex === index) {
      setSelectedSpotIndex(null);
      setSelectedSpot(null);
    } else {
      setSelectedSpotIndex(index);
      setSelectedSpot(index);
    }
  };

  const parseLocationCoords = (value) => {
    if (!value) return { lat: 35.699756, lng: 51.338076 };

    const normalized = String(value).replace(/[^0-9,.-]/g, '');
    const parts = normalized.split(',').map((p) => p.trim()).filter(Boolean);

    if (parts.length >= 2) {
      const lat = Number(parts[0]);
      const lng = Number(parts[1]);
      if (!Number.isNaN(lat) && !Number.isNaN(lng)) {
        return { lat, lng };
      }
    }

    return { lat: 35.699756, lng: 51.338076 };
  };

  const handleComplexDraftSave = () => {
    if (!selectedComplex) return;

    const index = complexes.findIndex((complex) => complex.name === selectedComplex.name);
    if (index === -1) {
      alert(text.noComplex);
      return;
    }

    const statusMap = {
      available: { statusText: 'در دسترس', dotClass: 'green' },
      full: { statusText: 'تکمیل', dotClass: 'red' },
      limited: { statusText: 'ظرفیت محدود', dotClass: 'yellow' }
    };

    const nextName = complexDraft.name.trim();
    const nextLocation = complexDraft.location.trim();

    if (!nextName || !nextLocation) {
      alert(text.noAddress);
      return;
    }

    const updatedComplex = {
      ...complexes[index],
      name: nextName,
      status: complexDraft.status,
      statusText: statusMap[complexDraft.status].statusText,
      dotClass: statusMap[complexDraft.status].dotClass,
      location: nextLocation
    };

    updateComplex(index, updatedComplex);
    setSelectedComplex(updatedComplex);
    setComplexDraft({
      name: nextName,
      status: complexDraft.status,
      location: nextLocation
    });
    alert(text.saveSuccess);
  };

  const persistMapSelection = (nextLocation, targetName = selectedComplex?.name) => {
    if (!nextLocation || !targetName) return;

    const index = complexes.findIndex((complex) => complex.name === targetName);
    if (index === -1) return;

    const nextComplex = {
      ...complexes[index],
      location: nextLocation
    };

    updateComplex(index, nextComplex);
    setSelectedComplex(nextComplex);
    setComplexDraft((prev) => ({ ...prev, location: nextLocation }));
  };

  const handlePay = () => {
    if (selectedSpotIndex === null || !selectedComplex) {
      alert(text.selectSpot);
      return;
    }

    const spots = parkingSpots;
    const spot = spots[selectedSpotIndex];
    if (!spot || spot.reserved) {
      alert(text.unavailable);
      return;
    }

    document.getElementById('reservePage').classList.remove('active');
    document.getElementById('paymentPage').classList.add('active');
    document.body.style.overflow = 'hidden';

    localStorage.setItem('prsTempReservation', JSON.stringify({
      spotIndex: selectedSpotIndex,
      spotId: spot.id,
      complexName: selectedComplex.name,
      amount: RESERVATION_DAILY_AMOUNT,
      duration: text.oneDay || 'یک روز'
    }));
  };

  const cancelReservation = () => {
    setSelectedSpotIndex(null);
    setSelectedSpot(null);
  };

  const handleBack = () => {
    document.querySelector('.site').style.display = 'block';
    document.getElementById('reservePage').classList.remove('active');
    document.body.style.overflow = 'auto';
    setStep('complex');
    setSelectedSpotIndex(null);
    setSelectedComplex(null);
  };

  const isLoggedIn = () => {
    return user !== null || currentAdmin !== null;
  };

  useEffect(() => {
    if (!isLoggedIn()) {
      alert(text.loginRequired);
      handleBack();
    }
  }, []);

  const renderParkingMap = () => {
    const spots = parkingSpots;
    const mapElements = [];

    for (let row = 0; row < ROWS; row++) {
      mapElements.push(
        <div key={`label-${row}`} className="row-label">
          ردیف {String.fromCharCode(65 + row)}
        </div>
      );

      for (let col = 0; col < COLS; col++) {
        const index = row * COLS + col;
        const spot = spots[index];
        if (!spot) continue;

        let spotClass = 'parking-spot';
        if (spot.reserved) {
          spotClass += ' reserved';
        } else {
          spotClass += ' available';
        }
        if (selectedSpotIndex === index) {
          spotClass += ' selected';
        }

        mapElements.push(
          <div
            key={`spot-${index}`}
            className={spotClass}
            onClick={() => handleSpotClick(index)}
          >
            <span className="spot-number">{spot.id}</span>
            {spot.reserved && (
              <span style={{ fontSize: '.45rem', color: '#8a5d5d' }}>رزرو</span>
            )}
          </div>
        );
      }
    }

    return mapElements;
  };

  return (
    <section className="reserve-page" id="reservePage">
      <div className="reserve-container">
        <div className="reserve-header">
          <h1><i className="fas fa-parking"></i> {text.title}</h1>
          <button className="back-btn" onClick={handleBack}>
            <i className="fas fa-arrow-right"></i> {text.back}
          </button>
        </div>

        <div className={`reserve-step ${step === 'complex' ? 'active' : ''}`} id="stepComplex">
          <h2 style={{ color: '#3e4a60', fontWeight: 600, marginBottom: '10px', fontSize: '1.1rem' }}>
            <i className="fas fa-building"></i> {text.complexSelect}
          </h2>
          <div className="complex-grid">
            {complexes.map((complex, index) => (
              <div key={index} className="complex-card">
                <div className="name">{complex.name}</div>
                <div className="status">
                  <span className={`dot ${complex.dotClass}`}></span>
                  {complex.statusText}
                </div>
                <div className="actions">
                  <button className="location-btn" onClick={() => window.openMapModal(complex, false)}>
                    <i className="fas fa-map-marker-alt"></i> {text.seeMap}
                  </button>
                  <button className="select-btn" onClick={() => handleComplexContact(complex)}>
                    <i className="fas fa-phone-volume"></i> {text.contact}
                  </button>
                  <button className="reserve-btn" onClick={() => selectComplex(index)}>
                    <i className="fas fa-check"></i> {text.selectReserve}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={`reserve-step ${step === 'parking' ? 'active' : ''}`} id="stepParking">
          <div className="step-indicator">
            <span className="step-item">
              <span className="num">1</span> {text.step1}
            </span>
            <span className="step-arrow"><i className="fas fa-chevron-left"></i></span>
            <span className="step-item active">
              <span className="num">2</span> {text.step2}
            </span>
            <span className="step-arrow"><i className="fas fa-chevron-left"></i></span>
            <span className="step-item">
              <span className="num">3</span> {text.step3}
            </span>
          </div>

          <div className="parking-map-container">
            <div className="complex-name-header">
              <i className="fas fa-building"></i>
              {text.complexity}: <strong>{selectedComplex?.name || '---'}</strong>
              <button className="back-btn" onClick={goToComplexSelection} style={{ marginRight: 'auto', padding: '5px 15px', fontSize: '.8rem' }}>
                <i className="fas fa-arrow-right"></i> {text.changeComplex}
              </button>
            </div>

            <div className="parking-map">
              {renderParkingMap()}
            </div>

            <div className="complex-contact-box">
              <i className="fas fa-phone-volume"></i>
              <span>{text.contactLabel}</span>
              <strong>{selectedComplex?.phone || text.notSet}</strong>
            </div>

            <div className="parking-legend">
              <span className="legend-item">
                <span className="color-box available"></span>
                {text.empty}
              </span>
              <span className="legend-item">
                <span className="color-box selected"></span>
                {text.selected}
              </span>
              <span className="legend-item">
                <span className="color-box reserved"></span>
                {text.reserved}
              </span>
            </div>
          </div>

          <div className={`payment-section ${selectedSpotIndex !== null ? 'active' : ''}`} id="paymentSection">
            <h3><i className="fas fa-credit-card"></i> {text.step3}</h3>
            <div className="payment-info">
              <div className="spot-info">
                {text.parkingSlot}: <strong>{selectedSpotIndex !== null ? `شماره ${parkingSpots[selectedSpotIndex]?.id}` : '---'}</strong>
                <span style={{ marginRight: '15px', fontSize: '.85rem', color: '#4b5870' }}>
                  {text.complexity}: <strong>{selectedComplex?.name || '---'}</strong>
                </span>
              </div>
              <div className="price">
                {formatMoney(RESERVATION_DAILY_AMOUNT, language)} <span>تومان</span>
              </div>
            </div>
            <div className="payment-actions">
              <button className="pay-btn" onClick={handlePay}>
                <i className="fas fa-check"></i> {text.pay}
              </button>
              <button className="cancel-btn" onClick={cancelReservation}>
                <i className="fas fa-times"></i> {text.cancel}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}