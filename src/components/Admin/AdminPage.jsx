import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { LocationPicker } from './LocationPicker';
import { DEFAULT_CHARTER } from '../../data/charter';

export function AdminPage() {
  const {
    currentAdmin,
    complexes,
    settings,
    addComplex,
    removeComplex,
    updateComplex,
    addAdmin,
    removeAdmin,
    getAdmins,
    updateSettings,
    logoutAdmin,
    setCurrentAdmin,
    language
  } = useApp();

  const translations = {
    fa: {
      title: 'داشبورد ادمین',
      back: 'بازگشت',
      logout: 'خروج',
      complexes: 'مدیریت مجتمع‌ها',
      addComplex: 'افزودن مجتمع',
      list: 'لیست مجتمع‌ها',
      edit: 'ویرایش مجتمع',
      adminManagement: 'مدیریت ادمین‌ها',
      settings: 'تنظیمات و توضیحات',
      save: 'ذخیره تنظیمات',
      saveComplex: 'ذخیره تنظیمات مجتمع',
      status: 'وضعیت',
      phone: 'شماره تماس مجتمع',
      location: 'موقعیت مکانی',
      name: 'نام مجتمع',
      adminUsername: 'نام کاربری ادمین',
      password: 'رمز عبور',
      adminType: 'نوع ادمین',
      full: 'ادمین کامل',
      complex: 'ادمین مجتمعی',
      assignComplex: 'مجتمع اختصاصی',
      selectComplex: 'انتخاب مجتمع...',
      addAdmin: 'افزودن ادمین',
      listAdmins: 'لیست ادمین‌ها',
      noComplexes: 'هیچ مجتمعی اضافه نشده است.',
      chooseMap: 'انتخاب روی نقشه',
      cancel: 'انصراف',
      companyPhone: 'شماره تماس شرکت',
      companyAddress: 'آدرس شرکت'
    },
    en: {
      title: 'Admin dashboard',
      back: 'Back',
      logout: 'Logout',
      complexes: 'Manage complexes',
      addComplex: 'Add complex',
      list: 'Complex list',
      edit: 'Edit complex',
      adminManagement: 'Manage admins',
      settings: 'Settings and details',
      save: 'Save settings',
      saveComplex: 'Save complex settings',
      status: 'Status',
      phone: 'Complex phone',
      location: 'Location',
      name: 'Complex name',
      adminUsername: 'Admin username',
      password: 'Password',
      adminType: 'Admin type',
      full: 'Full admin',
      complex: 'Complex admin',
      assignComplex: 'Assigned complex',
      selectComplex: 'Select complex...',
      addAdmin: 'Add admin',
      listAdmins: 'Admin list',
      noComplexes: 'No complexes added yet.',
      chooseMap: 'Pick on map',
      cancel: 'Cancel',
      companyPhone: 'Company phone',
      companyAddress: 'Company address'
    },
    ar: {
      title: 'لوحة المدير',
      back: 'رجوع',
      logout: 'تسجيل الخروج',
      complexes: 'إدارة المجتمعات',
      addComplex: 'إضافة مجتمع',
      list: 'قائمة المجتمعات',
      edit: 'تعديل المجتمع',
      adminManagement: 'إدارة المديرين',
      settings: 'الإعدادات والتفاصيل',
      save: 'حفظ الإعدادات',
      saveComplex: 'حفظ إعدادات المجتمع',
      status: 'الحالة',
      phone: 'هاتف المجتمع',
      location: 'الموقع',
      name: 'اسم المجتمع',
      adminUsername: 'اسم مستخدم المدير',
      password: 'كلمة المرور',
      adminType: 'نوع المدير',
      full: 'مدير كامل',
      complex: 'مدير مجتمع',
      assignComplex: 'المجتمع المخصص',
      selectComplex: 'اختر المجتمع...',
      addAdmin: 'إضافة مدير',
      listAdmins: 'قائمة المديرين',
      noComplexes: 'لا توجد مجتمعات مضافة.',
      chooseMap: 'اختيار على الخريطة',
      cancel: 'إلغاء',
      companyPhone: 'هاتف الشركة',
      companyAddress: 'عنوان الشركة'
    },
    zh: {
      title: '管理员面板',
      back: '返回',
      logout: '退出',
      complexes: '管理社区',
      addComplex: '添加社区',
      list: '社区列表',
      edit: '编辑社区',
      adminManagement: '管理员管理',
      settings: '设置与说明',
      save: '保存设置',
      saveComplex: '保存社区设置',
      status: '状态',
      phone: '社区电话',
      location: '位置',
      name: '社区名称',
      adminUsername: '管理员用户名',
      password: '密码',
      adminType: '管理员类型',
      full: '超级管理员',
      complex: '社区管理员',
      assignComplex: '指定社区',
      selectComplex: '选择社区...',
      addAdmin: '添加管理员',
      listAdmins: '管理员列表',
      noComplexes: '尚未添加任何社区。',
      chooseMap: '在地图上选择',
      cancel: '取消',
      companyPhone: '公司电话',
      companyAddress: '公司地址'
    },
    es: {
      title: 'Panel de administración',
      back: 'Volver',
      logout: 'Cerrar sesión',
      complexes: 'Gestionar complejos',
      addComplex: 'Añadir complejo',
      list: 'Lista de complejos',
      edit: 'Editar complejo',
      adminManagement: 'Gestionar administradores',
      settings: 'Configuración y detalles',
      save: 'Guardar ajustes',
      saveComplex: 'Guardar ajustes del complejo',
      status: 'Estado',
      phone: 'Teléfono del complejo',
      location: 'Ubicación',
      name: 'Nombre del complejo',
      adminUsername: 'Usuario administrador',
      password: 'Contraseña',
      adminType: 'Tipo de admin',
      full: 'Admin completo',
      complex: 'Admin de complejo',
      assignComplex: 'Complejo asignado',
      selectComplex: 'Selecciona complejo...',
      addAdmin: 'Añadir admin',
      listAdmins: 'Lista de admins',
      noComplexes: 'Todavía no hay complejos.',
      chooseMap: 'Elegir en mapa',
      cancel: 'Cancelar',
      companyPhone: 'Teléfono de la empresa',
      companyAddress: 'Dirección de la empresa'
    }
  };

  const text = translations[language] || translations.fa;

  // State برای مدیریت مجتمع
  const [adminName, setAdminName] = useState('');
  const [adminStatus, setAdminStatus] = useState('available');
  const [adminLocation, setAdminLocation] = useState('');
  const [adminPhone, setAdminPhone] = useState('');
  
  // State برای مدیریت ادمین
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newType, setNewType] = useState('full');
  const [newComplex, setNewComplex] = useState('');
  
  // State برای تنظیمات
  const [featuresText, setFeaturesText] = useState('');
  const [paymentText, setPaymentText] = useState('');
  const [contactPhone, setContactPhone] = useState('09107727044');
  const [contactAddress, setContactAddress] = useState('');
  const [charterTitle, setCharterTitle] = useState('');
  const [charterSubtitle, setCharterSubtitle] = useState('');
  const [charterAuthor, setCharterAuthor] = useState('');
  const [charterChapters, setCharterChapters] = useState([]);
  
  // State برای ادمین مجتمعی
  const [complexOnlyStatus, setComplexOnlyStatus] = useState('available');
  const [complexOnlyLocation, setComplexOnlyLocation] = useState('');
  
  // State برای نقشه انتخاب موقعیت
  const [showLocationPicker, setShowLocationPicker] = useState(false);
  const [tempLat, setTempLat] = useState(35.699756);
  const [tempLng, setTempLng] = useState(51.338076);
  const [editingComplexIndex, setEditingComplexIndex] = useState(null);
  const [complexEditor, setComplexEditor] = useState(null);
  const [complexEditorForm, setComplexEditorForm] = useState({
    name: '',
    status: 'available',
    location: '',
    phone: ''
  });

  const isFullAdmin = currentAdmin?.type === 'full';
  const isComplexAdmin = currentAdmin?.type === 'complex';
  const visibleComplexes = complexes;
  const canEditComplex = (complex) => !isComplexAdmin || !currentAdmin?.complex || complex.name === currentAdmin.complex;

  // =====================================================
  // EFECTS
  // =====================================================

  useEffect(() => {
    setFeaturesText(settings.features || '');
    setPaymentText(settings.payment || '');
    setContactPhone(settings.contactPhone || '09107727044');
    setContactAddress(settings.contactAddress || '');
    setCharterTitle(settings.charter?.coverTitle || DEFAULT_CHARTER.coverTitle);
    setCharterSubtitle(settings.charter?.coverSubtitle || DEFAULT_CHARTER.coverSubtitle);
    setCharterAuthor(settings.charter?.coverAuthor || DEFAULT_CHARTER.coverAuthor);
    setCharterChapters(settings.charter?.chapters || DEFAULT_CHARTER.chapters);

    if (isComplexAdmin && currentAdmin?.complex) {
      const complex = complexes.find(c => c.name === currentAdmin.complex);
      if (complex) {
        setComplexOnlyStatus(complex.status || 'available');
        setComplexOnlyLocation(complex.location || '');
      }
    }

    renderComplexList();
    renderAdminList();
    updateComplexSelect();
  }, [complexes, currentAdmin, settings, isFullAdmin, isComplexAdmin]);

  // =====================================================
  // RENDER FUNCTIONS
  // =====================================================

  const renderComplexList = () => {
    const list = document.getElementById('complexList');
    if (!list) return;

    list.innerHTML = '';
    const listComplexes = complexes;
    if (listComplexes.length === 0) {
      list.innerHTML = '<li style="padding:10px; color:#4b5870; text-align:center;">هیچ مجتمعی وجود ندارد.</li>';
      return;
    }

    listComplexes.forEach((complex, index) => {
      const realIndex = complexes.findIndex((item) => item.name === complex.name && item.location === complex.location);
      const canEditThisComplex = canEditComplex(complex);
      const li = document.createElement('li');
      li.innerHTML = `
        <span>
          <strong>${complex.name}</strong>
          <span style="font-size:.75rem; color:#4b5870; margin-right:8px;">${complex.location || 'بدون آدرس'}</span>
          <span class="badge" style="background:${complex.dotClass === 'green' ? 'rgba(90,160,120,.15)' : complex.dotClass === 'red' ? 'rgba(180,80,80,.15)' : 'rgba(180,160,60,.15)'}; color:${complex.dotClass === 'green' ? '#3a6a4a' : complex.dotClass === 'red' ? '#7a4a4a' : '#8a7a3a'};">${complex.statusText}</span>
        </span>
        <div style="display:flex; gap:6px; flex-wrap:wrap;">
          ${canEditThisComplex ? `
            <button class="edit-btn" data-index="${index}" title="ویرایش مجتمع">
              <i class="fas fa-edit"></i>
            </button>
          ` : ''}
          <button class="location-preview-btn" style="padding:4px 10px; font-size:.7rem;" data-index="${index}" title="دیدن در نقشه">
            <i class="fas fa-map-marker-alt"></i>
          </button>
          <button class="delete-btn" data-index="${index}" style="color:#8a5d5d;" title="حذف">
            <i class="fas fa-trash-alt"></i>
          </button>
        </div>
      `;
      list.appendChild(li);
    });

    document.querySelectorAll('#complexList .location-preview-btn').forEach(btn => {
      btn.addEventListener('click', function() {
        const index = parseInt(this.dataset.index);
        const actualComplex = listComplexes[index];
        if (actualComplex && window.openMapModal) {
          window.openMapModal(actualComplex, false);
        }
      });
    });

    document.querySelectorAll('#complexList .edit-btn').forEach(btn => {
      btn.addEventListener('click', function() {
        const index = parseInt(this.dataset.index);
        const actualComplex = listComplexes[index];
        if (!actualComplex) return;
        openComplexEditor(index);
      });
    });

    document.querySelectorAll('#complexList .delete-btn').forEach(btn => {
      btn.addEventListener('click', function() {
        const index = parseInt(this.dataset.index);
        const actualComplex = listComplexes[index];
        if (!actualComplex) return;
        if (isComplexAdmin && currentAdmin?.complex !== actualComplex.name) {
          alert('ادمین مجتمعی فقط مجاز به حذف مجتمع خودش است.');
          return;
        }
        if (confirm(`آیا از حذف مجتمع "${actualComplex.name}" مطمئن هستید؟`)) {
          const actualIndex = complexes.findIndex((item) => item.name === actualComplex.name && item.location === actualComplex.location);
          removeComplex(actualIndex >= 0 ? actualIndex : index);
          renderComplexList();
          updateComplexSelect();
        }
      });
    });
  };


  const renderAdminList = () => {
    const list = document.getElementById('adminList');
    if (!list) return;
    
    const admins = getAdmins();
    list.innerHTML = '';
    
    admins.forEach((admin, index) => {
      const li = document.createElement('li');
      const typeLabel = admin.type === 'full' ? 'ادمین کامل' : 'ادمین مجتمعی';
      const typeClass = admin.type === 'full' ? 'full' : 'complex';
      const isMaster = admin.username === 'Paar';
      
      li.innerHTML = `
        <span>
          <strong>${admin.username}</strong>
          <span class="badge ${typeClass}">${typeLabel}</span>
          ${admin.complex ? `<span style="font-size:.75rem; color:#4b5870;">(${admin.complex})</span>` : ''}
          ${isMaster ? ' <span style="font-size:.65rem; color:#2a5a8a;">(ادمین اصلی)</span>' : ''}
        </span>
        ${!isMaster ? `
          <button class="delete-btn" data-index="${index}">
            <i class="fas fa-trash-alt"></i>
          </button>
        ` : ''}
      `;
      list.appendChild(li);
    });
    
    document.querySelectorAll('#adminList .delete-btn').forEach(btn => {
      btn.addEventListener('click', function() {
        const index = parseInt(this.dataset.index);
        const admins = getAdmins();
        if (admins[index]?.username === 'Paar') {
          alert('نمی‌توانید ادمین اصلی را حذف کنید.');
          return;
        }
        if (confirm(`آیا از حذف ادمین "${admins[index]?.username}" مطمئن هستید؟`)) {
          removeAdmin(index);
          renderAdminList();
          updateComplexSelect();
        }
      });
    });
  };

  const updateComplexSelect = () => {
    const select = document.getElementById('adminComplexSelect');
    if (!select) return;
    
    select.innerHTML = '<option value="">انتخاب مجتمع...</option>';
    visibleComplexes.forEach(c => {
      const opt = document.createElement('option');
      opt.value = c.name;
      opt.textContent = c.name;
      select.appendChild(opt);
    });
  };

  // =====================================================
  // HANDLE FUNCTIONS
  // =====================================================

  const parseLocationCoords = (value) => {
    if (!value) {
      return { lat: 35.699756, lng: 51.338076 };
    }

    const cleaned = String(value).replace(/[^0-9,.-]/g, '');
    const parts = cleaned.split(',').map(p => p.trim()).filter(Boolean);

    if (parts.length >= 2) {
      const lat = Number(parts[0]);
      const lng = Number(parts[1]);
      if (!Number.isNaN(lat) && !Number.isNaN(lng)) {
        return { lat, lng };
      }
    }

    return { lat: 35.699756, lng: 51.338076 };
  };

  const openComplexEditor = (index) => {
    const complex = complexes[index];
    if (!complex || !canEditComplex(complex)) return;

    setComplexEditor({ index, name: complex.name });
    setComplexEditorForm({
      name: complex.name,
      status: complex.status || 'available',
      location: complex.location || '',
      phone: complex.phone || ''
    });
  };

  const handleComplexEditorSave = () => {
    if (!complexEditor) return;

    const nextName = complexEditorForm.name.trim();
    const nextLocation = complexEditorForm.location.trim();

    if (!nextName || !nextLocation) {
      alert('لطفاً نام و آدرس مجتمع را کامل وارد کنید.');
      return;
    }

    const targetIndex = complexes.findIndex((complex) => complex.name === complexEditor.name);
    if (targetIndex === -1) return;

    const statusMap = {
      available: { statusText: 'در دسترس', dotClass: 'green' },
      full: { statusText: 'تکمیل', dotClass: 'red' },
      limited: { statusText: 'ظرفیت محدود', dotClass: 'yellow' }
    };

    const updatedComplex = {
      ...complexes[targetIndex],
      name: nextName,
      status: complexEditorForm.status,
      statusText: statusMap[complexEditorForm.status].statusText,
      dotClass: statusMap[complexEditorForm.status].dotClass,
      location: nextLocation,
      phone: complexEditorForm.phone.trim()
    };

    updateComplex(targetIndex, updatedComplex);

    if (currentAdmin?.type === 'complex' && currentAdmin?.complex === complexEditor.name) {
      setCurrentAdmin({ ...currentAdmin, complex: nextName });
    }

    setComplexEditor(null);
    setComplexEditorForm({ name: '', status: 'available', location: '', phone: '' });
    renderComplexList();
    updateComplexSelect();
  };

  const handleComplexEditorMapSelect = (coords) => {
    const [lat, lng] = String(coords).split(',').map((part) => Number(part.trim()));
    const nextLocation = !Number.isNaN(lat) && !Number.isNaN(lng)
      ? `${lat.toFixed(6)}, ${lng.toFixed(6)}`
      : coords;

    setTempLat(Number.isFinite(lat) ? lat : tempLat);
    setTempLng(Number.isFinite(lng) ? lng : tempLng);
    setComplexEditorForm((prev) => ({ ...prev, location: nextLocation }));

    if (complexEditor?.name) {
      persistComplexLocation(complexEditor.name, nextLocation);
    }
  };

  const openComplexLocationEditor = (index) => {
    const complex = complexes[index];
    if (!complex) return;

    const { lat, lng } = parseLocationCoords(complex.location);
    setEditingComplexIndex(index);
    setTempLat(lat);
    setTempLng(lng);
    setAdminLocation(complex.location || `${lat.toFixed(6)}, ${lng.toFixed(6)}`);
    setShowLocationPicker(true);
  };

  const handleLocationSelect = (lat, lng) => {
    setTempLat(lat);
    setTempLng(lng);
    setAdminLocation(`${lat.toFixed(6)}, ${lng.toFixed(6)}`);
  };

  const handleAddComplex = () => {
    if (!isFullAdmin) {
      alert('فقط ادمین کامل می‌تواند مجتمع اضافه کند.');
      return;
    }
    
    if (!adminName.trim() || !adminLocation.trim()) {
      alert('لطفاً نام و موقعیت مکانی مجتمع را وارد کنید.');
      return;
    }
    
    const statusMap = {
      'available': { statusText: 'در دسترس', dotClass: 'green' },
      'full': { statusText: 'تکمیل', dotClass: 'red' },
      'limited': { statusText: 'ظرفیت محدود', dotClass: 'yellow' }
    };
    
    try {
      addComplex({
        name: adminName.trim(),
        status: adminStatus,
        statusText: statusMap[adminStatus].statusText,
        dotClass: statusMap[adminStatus].dotClass,
        location: adminLocation.trim(),
        phone: adminPhone.trim()
      });
      
      setAdminName('');
      setAdminLocation('');
      setAdminPhone('');
      alert('مجتمع با موفقیت اضافه شد.');
      renderComplexList();
      updateComplexSelect();
    } catch (error) {
      alert(error.message);
    }
  };

  const handleAddAdmin = () => {
    if (!isFullAdmin) {
      alert('فقط ادمین کامل می‌تواند ادمین جدید اضافه کند.');
      return;
    }
    
    if (!newUsername.trim() || !newPassword.trim()) {
      alert('لطفاً نام کاربری و رمز عبور را وارد کنید.');
      return;
    }
    
    if (newPassword.length < 4) {
      alert('رمز عبور باید حداقل ۴ کاراکتر باشد.');
      return;
    }
    
    if (newUsername.trim() === 'Paar') {
      alert('این نام کاربری قابل استفاده نیست.');
      return;
    }
    
    if (newType === 'complex' && !newComplex) {
      alert('لطفاً مجتمع اختصاصی را انتخاب کنید.');
      return;
    }
    
    try {
      addAdmin({
        username: newUsername.trim(),
        password: newPassword.trim(),
        type: newType,
        complex: newType === 'complex' ? newComplex : null
      });
      
      setNewUsername('');
      setNewPassword('');
      setNewComplex('');
      alert('ادمین با موفقیت اضافه شد.');
      renderAdminList();
      updateComplexSelect();
    } catch (error) {
      alert(error.message);
    }
  };

  const updateComplexPhone = (complexName, value) => {
    const index = complexes.findIndex((complex) => complex.name === complexName);
    if (index === -1) return;

    updateComplex(index, {
      ...complexes[index],
      phone: value
    });
  };

  const handleSaveSettings = () => {
    if (!isFullAdmin) {
      alert('فقط ادمین کامل می‌تواند تنظیمات را تغییر دهد.');
      return;
    }
    
    updateSettings({
      features: featuresText,
      payment: paymentText,
      contactPhone,
      contactAddress,
      charter: {
        coverTitle: charterTitle,
        coverSubtitle: charterSubtitle,
        coverAuthor: charterAuthor,
        chapters: charterChapters
      }
    });
    alert('تنظیمات با موفقیت ذخیره شد.');
  };

  const handleComplexOnlySave = () => {
    if (!isComplexAdmin || !currentAdmin?.complex) {
      alert('شما دسترسی به این بخش ندارید.');
      return;
    }
    
    if (!complexOnlyLocation.trim()) {
      alert('لطفاً موقعیت مکانی را وارد کنید.');
      return;
    }
    
    const complexIndex = complexes.findIndex(c => c.name === currentAdmin.complex);
    if (complexIndex === -1) {
      alert('مجتمع مورد نظر یافت نشد.');
      return;
    }
    
    const statusMap = {
      'available': { statusText: 'در دسترس', dotClass: 'green' },
      'full': { statusText: 'تکمیل', dotClass: 'red' },
      'limited': { statusText: 'ظرفیت محدود', dotClass: 'yellow' }
    };
    
    const updatedComplex = {
      ...complexes[complexIndex],
      status: complexOnlyStatus,
      statusText: statusMap[complexOnlyStatus].statusText,
      dotClass: statusMap[complexOnlyStatus].dotClass,
      location: complexOnlyLocation.trim(),
      phone: complexes[complexIndex].phone || ''
    };
    
    updateComplex(complexIndex, updatedComplex);
    alert('تنظیمات مجتمع با موفقیت ذخیره شد.');
    renderComplexList();
  };

  const persistComplexLocation = (targetName, nextLocation) => {
    if (!targetName || !nextLocation) return;

    const complexIndex = complexes.findIndex((complex) => complex.name === targetName);
    if (complexIndex === -1) return;

    const nextComplex = {
      ...complexes[complexIndex],
      location: nextLocation
    };

    updateComplex(complexIndex, nextComplex);
  };

  const handleBack = () => {
    document.querySelector('.site').style.display = 'block';
    document.getElementById('adminPage').classList.remove('active');
    document.body.style.overflow = 'auto';
  };

  const handleLogout = () => {
    if (confirm('آیا از خروج از پنل ادمین مطمئن هستید؟')) {
      logoutAdmin();
      document.querySelector('.site').style.display = 'block';
      document.getElementById('adminPage').classList.remove('active');
      document.body.style.overflow = 'auto';
    }
  };

  const handleNewTypeChange = (e) => {
    const value = e.target.value;
    setNewType(value);
    const group = document.getElementById('adminComplexSelectGroup');
    if (group) {
      group.style.display = value === 'complex' ? 'block' : 'none';
    }
  };

  // =====================================================
  // RENDER
  // =====================================================

  return (
    <section className="admin-page" id="adminPage">
      <div className="admin-container">
        <div className="admin-header">
          <h1><i className="fas fa-user-shield"></i> {text.title}</h1>
          <div className="admin-actions">
            <button onClick={handleBack}><i className="fas fa-arrow-right"></i> {text.back}</button>
            <button onClick={handleLogout} className="danger"><i className="fas fa-sign-out-alt"></i> {text.logout}</button>
          </div>
        </div>

        <div className="admin-content">
          {isFullAdmin && (
            <>
              {/* =============================================
                  مدیریت مجتمع‌ها
              ============================================= */}
              <div className="admin-card" id="adminComplexSection">
                <h3><i className="fas fa-building"></i> {text.complexes}</h3>
                <div className="form-group">
                  <label>{text.name}</label>
                  <input 
                    type="text" 
                    placeholder="مثال: هدیش مال" 
                    value={adminName}
                    onChange={(e) => setAdminName(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>{text.status}</label>
                  <select value={adminStatus} onChange={(e) => setAdminStatus(e.target.value)}>
                    <option value="available">در دسترس</option>
                    <option value="full">تکمیل</option>
                    <option value="limited">ظرفیت محدود</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>{text.phone}</label>
                  <input
                    type="tel"
                    placeholder="مثال: 09107727044"
                    value={adminPhone || ''}
                    onChange={(e) => setAdminPhone(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>{text.location}</label>
                  <div className="location-picker">
                    <input 
                      type="text" 
                      placeholder="مثال: تهران، هدیش مال یا 35.699756,51.338076" 
                      value={adminLocation}
                      onChange={(e) => setAdminLocation(e.target.value)}
                    />
                    <button 
                      className="location-select-btn" 
                      onClick={() => {
                        window.openMapModal({
                          name: adminName || 'مجتمع جدید',
                          location: adminLocation || `${tempLat}, ${tempLng}`
                        }, true, (coords) => {
                          const [lat, lng] = String(coords).split(',').map((part) => Number(part.trim()));
                          const nextLocation = !Number.isNaN(lat) && !Number.isNaN(lng)
                            ? `${lat.toFixed(6)}, ${lng.toFixed(6)}`
                            : coords;

                          setTempLat(Number.isFinite(lat) ? lat : tempLat);
                          setTempLng(Number.isFinite(lng) ? lng : tempLng);
                          setAdminLocation(nextLocation);
                        });
                      }}
                      type="button"
                    >
                      <i className="fas fa-map-marker-alt"></i> {text.chooseMap}
                    </button>
                  </div>
                </div>
                <button className="btn-submit" onClick={handleAddComplex}>
                  <i className="fas fa-plus"></i> {text.addComplex}
                </button>

                <hr style={{ margin: '18px 0', borderColor: 'rgba(75,88,110,.1)' }} />

                <h4 style={{ fontSize: '.9rem', color: '#3e4a60', marginBottom: '10px' }}>{text.list}</h4>
                <ul className="admin-list" id="complexList"></ul>

                {complexEditor && (
                  <div style={{ marginTop: '18px', padding: '16px', border: '1px solid rgba(75,88,110,.15)', borderRadius: '12px', background: '#f9fbff' }}>
                    <h4 style={{ margin: '0 0 12px', color: '#3e4a60' }}>{text.edit}</h4>
                    <div className="form-group">
                      <label>{text.name}</label>
                      <input
                        type="text"
                        value={complexEditorForm.name}
                        onChange={(e) => setComplexEditorForm({ ...complexEditorForm, name: e.target.value })}
                      />
                    </div>
                    <div className="form-group">
                      <label>وضعیت</label>
                      <select value={complexEditorForm.status} onChange={(e) => setComplexEditorForm({ ...complexEditorForm, status: e.target.value })}>
                        <option value="available">در دسترس</option>
                        <option value="full">تکمیل</option>
                        <option value="limited">ظرفیت محدود</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>{text.phone}</label>
                      <input
                        type="tel"
                        value={complexEditorForm.phone}
                        onChange={(e) => setComplexEditorForm({ ...complexEditorForm, phone: e.target.value })}
                        placeholder="09107727044"
                      />
                    </div>
                    <div className="form-group">
                      <label>{text.location}</label>
                      <div className="location-picker">
                        <input
                          type="text"
                          value={complexEditorForm.location}
                          onChange={(e) => setComplexEditorForm({ ...complexEditorForm, location: e.target.value })}
                        />
                        <button
                          className="location-select-btn"
                          type="button"
                          onClick={() => {
                            if (window.openMapModal) {
                              window.openMapModal({
                                name: complexEditorForm.name || complexEditor?.name,
                                location: complexEditorForm.location || `${tempLat}, ${tempLng}`
                              }, true, handleComplexEditorMapSelect);
                            }
                          }}
                        >
                          <i className="fas fa-map-marker-alt"></i> {text.chooseMap}
                        </button>
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                      <button className="btn-submit" onClick={handleComplexEditorSave}>
                        <i className="fas fa-save"></i> {text.save}
                      </button>
                      <button className="cancel-btn" onClick={() => setComplexEditor(null)}>
                        <i className="fas fa-times"></i> {text.cancel}
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* =============================================
                  مدیریت ادمین‌ها
              ============================================= */}
              <div className="admin-card" id="adminUserSection">
                <h3><i className="fas fa-users-cog"></i> مدیریت ادمین‌ها</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
                  <div className="form-group">
                    <label>نام کاربری ادمین</label>
                    <input 
                      type="text" 
                      placeholder="نام کاربری" 
                      value={newUsername}
                      onChange={(e) => setNewUsername(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>رمز عبور</label>
                    <input 
                      type="password" 
                      placeholder="رمز عبور" 
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label>نوع ادمین</label>
                  <select value={newType} onChange={handleNewTypeChange}>
                    <option value="full">ادمین کامل</option>
                    <option value="complex">ادمین مجتمعی</option>
                  </select>
                </div>
                <div className="form-group" id="adminComplexSelectGroup" style={{ display: newType === 'complex' ? 'block' : 'none' }}>
                  <label>مجتمع اختصاصی</label>
                  <select id="adminComplexSelect" value={newComplex} onChange={(e) => setNewComplex(e.target.value)}>
                    <option value="">انتخاب مجتمع...</option>
                  </select>
                </div>
                <button className="btn-submit" onClick={handleAddAdmin}>
                  <i className="fas fa-user-plus"></i> افزودن ادمین
                </button>

                <hr style={{ margin: '18px 0', borderColor: 'rgba(75,88,110,.1)' }} />

                <h4 style={{ fontSize: '.9rem', color: '#3e4a60', marginBottom: '10px' }}>لیست ادمین‌ها</h4>
                <ul className="admin-list" id="adminList"></ul>
              </div>

              {/* =============================================
                  تنظیمات
              ============================================= */}
              <div className="admin-card" id="adminSettingsSection">
                <h3><i className="fas fa-cog"></i> تنظیمات و توضیحات</h3>
                <div className="form-group">
                  <label>توضیحات امکانات</label>
                  <textarea 
                    placeholder="توضیحات مربوط به امکانات پارکینگ..." 
                    value={featuresText}
                    onChange={(e) => setFeaturesText(e.target.value)}
                  ></textarea>
                </div>
                <div className="form-group">
                  <label>توضیحات نحوه پرداخت</label>
                  <textarea 
                    placeholder="توضیحات مربوط به نحوه پرداخت..." 
                    value={paymentText}
                    onChange={(e) => setPaymentText(e.target.value)}
                  ></textarea>
                </div>
                <div className="form-group">
                  <label>شماره تماس شرکت</label>
                  <input
                    type="tel"
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                    placeholder="09107727044"
                  />
                </div>
                <div className="form-group">
                  <label>آدرس شرکت</label>
                  <textarea
                    placeholder="آدرس شرکت را وارد کنید..."
                    value={contactAddress}
                    onChange={(e) => setContactAddress(e.target.value)}
                  ></textarea>
                </div>
                <div className="form-group">
                  <label>منشور حقوق مشتری — عنوان جلد</label>
                  <input
                    type="text"
                    value={charterTitle}
                    onChange={(e) => setCharterTitle(e.target.value)}
                    placeholder="منشور حقوق مشتری"
                  />
                </div>
                <div className="form-group">
                  <label>زیرعنوان جلد</label>
                  <input
                    type="text"
                    value={charterSubtitle}
                    onChange={(e) => setCharterSubtitle(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>خط روی جلد</label>
                  <input
                    type="text"
                    value={charterAuthor}
                    onChange={(e) => setCharterAuthor(e.target.value)}
                  />
                </div>
                {charterChapters.map((chapter, index) => (
                  <div className="form-group charter-editor-block" key={chapter.id || index}>
                    <label>برگ {index + 1}</label>
                    <input
                      type="text"
                      value={chapter.chapter}
                      placeholder="عنوان فصل"
                      onChange={(e) => {
                        const next = [...charterChapters];
                        next[index] = { ...next[index], chapter: e.target.value };
                        setCharterChapters(next);
                      }}
                    />
                    <input
                      type="text"
                      value={chapter.title}
                      placeholder="عنوان برگ"
                      onChange={(e) => {
                        const next = [...charterChapters];
                        next[index] = { ...next[index], title: e.target.value };
                        setCharterChapters(next);
                      }}
                    />
                    <textarea
                      value={chapter.body}
                      placeholder="متن منشور در این برگ..."
                      onChange={(e) => {
                        const next = [...charterChapters];
                        next[index] = { ...next[index], body: e.target.value };
                        setCharterChapters(next);
                      }}
                    />
                    <button
                      type="button"
                      className="btn-submit"
                      onClick={() => setCharterChapters(charterChapters.filter((_, i) => i !== index))}
                    >
                      حذف این برگ
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  className="btn-submit"
                  onClick={() => setCharterChapters([
                    ...charterChapters,
                    { id: `c${Date.now()}`, chapter: `اصل ${charterChapters.length + 1}`, title: '', body: '' }
                  ])}
                >
                  افزودن برگ جدید
                </button>
                <div className="form-group">
                  <label>لیست مجتمع‌ها</label>
                  <div style={{ display: 'grid', gap: '8px' }}>
                    {complexes.length === 0 ? (
                      <div style={{ color: '#4b5870', fontSize: '.85rem' }}>هیچ مجتمعی اضافه نشده است.</div>
                    ) : (
                      complexes.map((complex, index) => (
                        <div key={`${complex.name}-${index}`} style={{
                          padding: '10px 12px',
                          border: '1px solid rgba(75,88,110,.15)',
                          borderRadius: '8px',
                          background: '#f4f7fb',
                          color: '#3e4a60',
                          display: 'grid',
                          gap: '8px'
                        }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', gap: '8px', flexWrap: 'wrap' }}>
                            <span><strong>{complex.name}</strong></span>
                            <span style={{ color: '#4b5870', fontSize: '.75rem' }}>{complex.location || 'بدون آدرس'}</span>
                            <span className="badge" style={{ background: complex.dotClass === 'green' ? 'rgba(90,160,120,.15)' : complex.dotClass === 'red' ? 'rgba(180,80,80,.15)' : 'rgba(180,160,60,.15)', color: complex.dotClass === 'green' ? '#3a6a4a' : complex.dotClass === 'red' ? '#7a4a4a' : '#8a7a3a' }}>
                              {complex.statusText}
                            </span>
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                            <label style={{ color: '#4b5870', fontSize: '.72rem', minWidth: '76px' }}>شماره تماس:</label>
                            <input
                              type="tel"
                              value={complex.phone || ''}
                              onChange={(e) => updateComplexPhone(complex.name, e.target.value)}
                              placeholder="شماره تماس مجتمع"
                              style={{
                                flex: '1',
                                minWidth: '160px',
                                border: '1px solid rgba(75,88,110,.18)',
                                borderRadius: '8px',
                                padding: '8px 10px',
                                background: '#fff'
                              }}
                            />
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
                <button className="btn-submit" onClick={handleSaveSettings}>
                  <i className="fas fa-save"></i> ذخیره تنظیمات
                </button>
              </div>
            </>
          )}

          {/* =============================================
              تنظیمات ادمین مجتمعی
          ============================================= */}
          {isComplexAdmin && currentAdmin?.complex && (
            <div className="admin-card complex-only-section active" id="adminComplexOnlySection">
              <h3><i className="fas fa-building"></i> تنظیمات مجتمع: <span>{currentAdmin.complex}</span></h3>
              <div className="form-group">
                <label>وضعیت مجتمع</label>
                <select value={complexOnlyStatus} onChange={(e) => setComplexOnlyStatus(e.target.value)}>
                  <option value="available">در دسترس</option>
                  <option value="full">تکمیل</option>
                  <option value="limited">ظرفیت محدود</option>
                </select>
              </div>
              <div className="form-group">
                <label>شماره تماس مجتمع</label>
                <input
                  type="tel"
                  value={complexes.find(c => c.name === currentAdmin.complex)?.phone || ''}
                  onChange={(e) => {
                    const complexIndex = complexes.findIndex(c => c.name === currentAdmin.complex);
                    if (complexIndex === -1) return;
                    const updatedComplex = {
                      ...complexes[complexIndex],
                      phone: e.target.value
                    };
                    updateComplex(complexIndex, updatedComplex);
                  }}
                  placeholder="شماره تماس مجتمع"
                />
              </div>
              <div className="form-group">
                <label>موقعیت مکانی</label>
                <div className="location-picker">
                  <input 
                    type="text" 
                    placeholder="موقعیت مکانی" 
                    value={complexOnlyLocation}
                    onChange={(e) => setComplexOnlyLocation(e.target.value)}
                  />
                  <button 
                    className="location-select-btn" 
                    onClick={() => {
                      if (window.openMapModal) {
                        window.openMapModal({ 
                          name: currentAdmin.complex, 
                          location: complexOnlyLocation || `${tempLat}, ${tempLng}`
                        }, true, (coords) => {
                          const [lat, lng] = String(coords).split(',').map((part) => Number(part.trim()));
                          const nextLocation = !Number.isNaN(lat) && !Number.isNaN(lng)
                            ? `${lat.toFixed(6)}, ${lng.toFixed(6)}`
                            : coords;

                          setTempLat(Number.isFinite(lat) ? lat : tempLat);
                          setTempLng(Number.isFinite(lng) ? lng : tempLng);
                          setComplexOnlyLocation(nextLocation);
                          persistComplexLocation(currentAdmin.complex, nextLocation);
                        });
                      }
                    }}
                  >
                    <i className="fas fa-map-marker-alt"></i> انتخاب روی نقشه
                  </button>
                </div>
              </div>
              <button className="btn-submit" onClick={handleComplexOnlySave}>
                <i className="fas fa-save"></i> ذخیره تنظیمات مجتمع
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}