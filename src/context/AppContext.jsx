import React, { createContext, useContext, useState, useEffect } from 'react';
import { MASTER_ADMIN, TOTAL_SPOTS } from '../data/constants';
import { RESERVATION_DAILY_AMOUNT } from '../data/rates';
import { DEFAULT_CHARTER } from '../data/charter';

const AppContext = createContext();

const THEME_VALUES = ['default', 'dark', 'gold', 'blue', 'red', 'green', 'purple', 'teal', 'orange', 'rose', 'olive'];

const DEFAULT_COMPLEX = {
  name: 'هدیش مال',
  status: 'available',
  statusText: 'در دسترس',
  dotClass: 'green',
  location: 'تهران، هدیش مال',
  phone: ''
};

export function AppProvider({ children }) {
  const [user, setUser] = useState(null);
  const [currentAdmin, setCurrentAdmin] = useState(null);
  const [complexes, setComplexes] = useState([]);
  const [parkingSpots, setParkingSpots] = useState([]);
  const [settings, setSettings] = useState({
    features: '',
    payment: '',
    contactPhone: '09107727044',
    contactAddress: '',
    charter: DEFAULT_CHARTER
  });
  const [language, setLanguage] = useState('fa');
  const [theme, setThemeState] = useState('default');
  const [selectedComplex, setSelectedComplex] = useState(null);
  const [selectedSpot, setSelectedSpot] = useState(null);
  const [reservations, setReservations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getFromLocalStorage = (key, defaultValue) => {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : defaultValue;
    } catch {
      return defaultValue;
    }
  };

  const saveToLocalStorage = (key, data) => {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      console.error(`Error saving to localStorage (${key}):`, error);
    }
  };

  useEffect(() => {
    const savedPrefs = getFromLocalStorage('prsAppPreferences', { language: 'fa', theme: 'default' });
    const preferredLanguage = ['fa', 'en', 'ar', 'zh', 'es'].includes(savedPrefs.language) ? savedPrefs.language : 'fa';
    const preferredTheme = THEME_VALUES.includes(savedPrefs.theme) ? savedPrefs.theme : 'default';
    setLanguage(preferredLanguage);
    setThemeState(preferredTheme);

    const savedUser = getFromLocalStorage('prsUser', null);
    setUser(savedUser);

    const savedAdmin = getFromLocalStorage('prsCurrentAdmin', null);
    setCurrentAdmin(savedAdmin);

    let savedComplexes = getFromLocalStorage('prsComplexes', null);
    if (!Array.isArray(savedComplexes) || savedComplexes.length === 0) {
      savedComplexes = [DEFAULT_COMPLEX];
      saveToLocalStorage('prsComplexes', savedComplexes);
    } else {
      const hasDefault = savedComplexes.some((complex) => complex?.name === DEFAULT_COMPLEX.name);
      if (!hasDefault) {
        savedComplexes = [DEFAULT_COMPLEX, ...savedComplexes];
        saveToLocalStorage('prsComplexes', savedComplexes);
      }
    }
    setComplexes(savedComplexes);

    let savedSpots = getFromLocalStorage('prsParkingSpots', null);
    if (!savedSpots) {
      savedSpots = [];
      for (let i = 0; i < TOTAL_SPOTS; i++) {
        savedSpots.push({
          id: i + 1,
          reserved: Math.random() < 0.1,
          reservedBy: null
        });
      }
      saveToLocalStorage('prsParkingSpots', savedSpots);
    }
    setParkingSpots(savedSpots);

    let savedReservations = getFromLocalStorage('prsReservations', []);
    if (!Array.isArray(savedReservations)) {
      savedReservations = [];
    }
    savedSpots.forEach((spot, index) => {
      if (!spot?.reserved || !spot.reservedBy) return;
      const exists = savedReservations.some((item) => (
        item.spotIndex === index && item.username === spot.reservedBy && item.status === 'active'
      ));
      if (!exists) {
        savedReservations.push({
          id: `legacy-${spot.id}-${index}`,
          username: spot.reservedBy,
          spotId: spot.id,
          spotIndex: index,
          complexName: savedComplexes[0]?.name || 'هدیش مال',
          amount: RESERVATION_DAILY_AMOUNT,
          duration: 'یک روز',
          status: 'active',
          createdAt: Date.now()
        });
      }
    });
    saveToLocalStorage('prsReservations', savedReservations);
    setReservations(savedReservations);

    let savedSettings = getFromLocalStorage('prsSettings', null);
    if (!savedSettings) {
      savedSettings = {
        features: '',
        payment: '',
        contactPhone: '09107727044',
        contactAddress: '',
        charter: DEFAULT_CHARTER
      };
      saveToLocalStorage('prsSettings', savedSettings);
    } else {
      savedSettings = {
        features: savedSettings.features || '',
        payment: savedSettings.payment || '',
        contactPhone: savedSettings.contactPhone || '09107727044',
        contactAddress: savedSettings.contactAddress || '',
        charter: savedSettings.charter || DEFAULT_CHARTER
      };
      saveToLocalStorage('prsSettings', savedSettings);
    }
    setSettings(savedSettings);

    const admins = getFromLocalStorage('prsAdmins', []);
    const masterExists = admins.some(a => a.username === MASTER_ADMIN.username);
    if (!masterExists) {
      admins.unshift(MASTER_ADMIN);
      saveToLocalStorage('prsAdmins', admins);
    }

    setIsLoading(false);
  }, []);

  const loginUser = (userData) => {
    setUser(userData);
    saveToLocalStorage('prsUser', userData);
  };

  const logoutUser = () => {
    setUser(null);
    localStorage.removeItem('prsUser');
  };

  const loginAdmin = (adminData) => {
    setCurrentAdmin(adminData);
    saveToLocalStorage('prsCurrentAdmin', adminData);
  };

  const logoutAdmin = () => {
    setCurrentAdmin(null);
    localStorage.removeItem('prsCurrentAdmin');
  };

  const getAdmins = () => {
    const admins = getFromLocalStorage('prsAdmins', []);
    const masterExists = admins.some(a => a.username === MASTER_ADMIN.username);
    if (!masterExists) {
      admins.unshift(MASTER_ADMIN);
      saveToLocalStorage('prsAdmins', admins);
    }
    return admins;
  };

  const addAdmin = (newAdmin) => {
    const admins = getAdmins();
    if (admins.some(a => a.username === newAdmin.username)) {
      throw new Error('این نام کاربری قبلاً ثبت شده است');
    }
    admins.push(newAdmin);
    saveToLocalStorage('prsAdmins', admins);
  };

  const removeAdmin = (index) => {
    const admins = getAdmins();
    if (admins[index]?.username === MASTER_ADMIN.username) {
      throw new Error('نمی‌توانید ادمین اصلی را حذف کنید');
    }
    admins.splice(index, 1);
    saveToLocalStorage('prsAdmins', admins);
  };

  const addComplex = (complex) => {
    setComplexes((prevComplexes) => {
      if (prevComplexes.some(c => c.name === complex.name)) {
        throw new Error('مجتمعی با این نام قبلاً وجود دارد');
      }

      const newComplexes = [...prevComplexes, complex];
      saveToLocalStorage('prsComplexes', newComplexes);
      return newComplexes;
    });
  };

  const removeComplex = (index) => {
    setComplexes((prevComplexes) => {
      if (prevComplexes[index]?.name === 'هدیش مال') {
        throw new Error('نمی‌توانید مجتمع پیش‌فرض را حذف کنید');
      }

      const newComplexes = prevComplexes.filter((_, i) => i !== index);
      saveToLocalStorage('prsComplexes', newComplexes);
      return newComplexes;
    });
  };

  const updateComplex = (index, updatedComplex) => {
    if (typeof index !== 'number' || index < 0) {
      return;
    }

    setComplexes((prevComplexes) => {
      const newComplexes = [...prevComplexes];
      if (!newComplexes[index]) {
        return prevComplexes;
      }
      newComplexes[index] = updatedComplex;
      saveToLocalStorage('prsComplexes', newComplexes);
      return newComplexes;
    });
  };

  const reserveSpot = (spotIndex, username, extra = {}) => {
    const newSpots = [...parkingSpots];
    if (newSpots[spotIndex].reserved) {
      throw new Error('این جای پارک قبلاً رزرو شده است');
    }
    newSpots[spotIndex].reserved = true;
    newSpots[spotIndex].reservedBy = username || 'کاربر';
    setParkingSpots(newSpots);
    saveToLocalStorage('prsParkingSpots', newSpots);

    const record = {
      id: `${Date.now()}-${spotIndex}`,
      username: username || 'کاربر',
      spotId: extra.spotId || newSpots[spotIndex].id,
      spotIndex,
      complexName: extra.complexName || '---',
      amount: extra.amount ?? RESERVATION_DAILY_AMOUNT,
      duration: extra.duration || 'یک روز',
      status: 'active',
      createdAt: Date.now()
    };

    setReservations((prev) => {
      const next = [record, ...prev];
      saveToLocalStorage('prsReservations', next);
      return next;
    });
  };

  const cancelReservation = (spotIndex) => {
    const newSpots = [...parkingSpots];
    newSpots[spotIndex].reserved = false;
    newSpots[spotIndex].reservedBy = null;
    setParkingSpots(newSpots);
    saveToLocalStorage('prsParkingSpots', newSpots);
  };

  const getUserReservations = (username) => {
    if (!username) return [];
    return reservations.filter((item) => item.username === username);
  };

  const cancelUserReservation = (reservationId) => {
    const target = reservations.find((item) => item.id === reservationId);
    if (!target) {
      throw new Error('رزرو پیدا نشد');
    }
    if (target.status === 'cancelled') {
      return;
    }
    if (typeof target.spotIndex === 'number') {
      cancelReservation(target.spotIndex);
    }
    setReservations((prev) => {
      const next = prev.map((item) => (
        item.id === reservationId ? { ...item, status: 'cancelled' } : item
      ));
      saveToLocalStorage('prsReservations', next);
      return next;
    });
  };

  const updateSettings = (newSettings) => {
    setSettings((prevSettings) => {
      const mergedSettings = { ...prevSettings, ...newSettings };
      saveToLocalStorage('prsSettings', mergedSettings);
      return mergedSettings;
    });
  };

  const updateLanguage = (nextLanguage) => {
    const safeLanguage = ['fa', 'en', 'ar', 'zh', 'es'].includes(nextLanguage) ? nextLanguage : 'fa';
    setLanguage(safeLanguage);
    saveToLocalStorage('prsAppPreferences', { language: safeLanguage, theme });
  };

  const updateTheme = (nextTheme) => {
    const safeTheme = THEME_VALUES.includes(nextTheme) ? nextTheme : 'default';
    setThemeState(safeTheme);
    saveToLocalStorage('prsAppPreferences', { language, theme: safeTheme });
  };

  useEffect(() => {
    if (theme === 'default') {
      document.documentElement.removeAttribute('data-theme');
    } else {
      document.documentElement.setAttribute('data-theme', theme);
    }
    document.documentElement.lang = language;
    document.documentElement.dir = ['ar', 'fa'].includes(language) ? 'rtl' : 'ltr';
  }, [language, theme]);

  const isLoggedIn = () => {
    return user !== null || currentAdmin !== null;
  };

  const getCurrentUser = () => {
    if (user) return { ...user, type: 'user' };
    if (currentAdmin) return { ...currentAdmin, type: 'admin' };
    return null;
  };

  const value = {
    user,
    currentAdmin,
    complexes,
    parkingSpots,
    settings,
    language,
    theme,
    selectedComplex,
    selectedSpot,
    reservations,
    isLoading,
    setUser: loginUser,
    setCurrentAdmin: loginAdmin,
    setComplexes,
    setParkingSpots,
    setSettings: updateSettings,
    setSelectedComplex,
    setSelectedSpot,
    setLanguage: updateLanguage,
    setTheme: updateTheme,
    loginUser,
    logoutUser,
    loginAdmin,
    logoutAdmin,
    getAdmins,
    addAdmin,
    removeAdmin,
    addComplex,
    removeComplex,
    updateComplex,
    reserveSpot,
    cancelReservation,
    getUserReservations,
    cancelUserReservation,
    updateSettings,
    updateLanguage,
    updateTheme,
    isLoggedIn,
    getCurrentUser
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}

export { MASTER_ADMIN };