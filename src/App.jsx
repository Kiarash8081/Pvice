import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Background } from './components/Layout/Background';
import { BigP } from './components/Layout/BigP';
import { Header } from './components/Layout/Header';
import { LogoIntro } from './components/Layout/LogoIntro';
import { UserPanel } from './components/UserPanel/UserPanel';
import { HomePage } from './components/Home/HomePage';
import { LoginPage } from './components/Auth/LoginPage';
import { SignupPage } from './components/Auth/SignupPage';
import { SignupGate } from './components/Auth/SignupGate';
import { AdminLoginPage } from './components/Auth/AdminLoginPage';
import { ReservePage } from './components/Reserve/ReservePage';
import { PaymentPage } from './components/Payment/PaymentPage';
import { AdminPage } from './components/Admin/AdminPage';
import { ContactPage } from './components/Contact/ContactPage';
import { MyReservationsPage } from './components/User/MyReservationsPage';
import { RatesPage } from './components/Rates/RatesPage';
import { MapModal } from './components/Common/MapModal';
import './styles/App.css';

function AppShell({ siteReady, onIntroDone }) {
  const { isLoggedIn, isLoading } = useApp();
  const showGate = siteReady && !isLoading && !isLoggedIn();

  return (
    <>
      {!siteReady && <LogoIntro logoSrc="/sp-logo.png" onComplete={onIntroDone} />}
      <Background />
      <BigP />
      <UserPanel />

      <div className={`site ${siteReady ? 'site-visible' : ''}`} id="mainSite">
        <Header />
        <HomePage mapReady={siteReady} />
      </div>

      {showGate && <SignupGate />}

      <LoginPage />
      <SignupPage />
      <AdminLoginPage />
      <ReservePage />
      <PaymentPage />
      <AdminPage />
      <ContactPage />
      <MyReservationsPage />
      <RatesPage />
      <MapModal />
    </>
  );
}

function App() {
  const [siteReady, setSiteReady] = React.useState(false);
  const handleIntroDone = React.useCallback(() => setSiteReady(true), []);

  React.useEffect(() => {
    document.body.classList.toggle('intro-active', !siteReady);
    return () => document.body.classList.remove('intro-active');
  }, [siteReady]);

  return (
    <AppProvider>
      <AppShell siteReady={siteReady} onIntroDone={handleIntroDone} />
    </AppProvider>
  );
}

export default App;