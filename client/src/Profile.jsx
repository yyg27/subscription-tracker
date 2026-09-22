import { API_URL } from "./config";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from './LanguageContext';

function Profile() {
  const navigate = useNavigate();
  const { lang, toggleLanguage, t } = useLanguage();
  
  const [userName, setUserName] = useState('');
  const [telegramId, setTelegramId] = useState('');
  const [activeTab, setActiveTab] = useState(null); // Accordion state

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [msg, setMsg] = useState('');
  const [telegramMsg, setTelegramMsg] = useState('');

  useEffect(() => {
    const token = (localStorage.getItem('token') || sessionStorage.getItem('token'));
    if (!token) {
      navigate('/');
      return;
    }
    
    // Fetch user profile
    fetch(`${API_URL}/users/me`, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        setUserName(data.data.name);
        if (data.data.telegramId) setTelegramId(data.data.telegramId);
      }
    })
    .catch(err => console.error(err));
  }, [navigate]);

  const handleExportCSV = async () => {
    const token = (localStorage.getItem('token') || sessionStorage.getItem('token'));
    try {
      const response = await fetch(`${API_URL}/subscriptions`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      if (data.success) {
        const subs = data.data;
        if (subs.length === 0) return alert(t('noSubs'));
        
        const header = "Name,Price,Currency,Frequency,Category,Status,Next Renewal\n";
        const csv = subs.map(sub => 
          `"${sub.name}",${sub.price},${sub.currency},${sub.frequency},${sub.category},${sub.status},${new Date(sub.renewalDate).toLocaleDateString()}`
        ).join('\n');
        
        const blob = new Blob([header + csv], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.setAttribute('href', url);
        a.setAttribute('download', 'subscriptions.csv');
        a.click();
      }
    } catch (error) {
      console.error(error);
      alert(t('error'));
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setMsg('');
    const token = (localStorage.getItem('token') || sessionStorage.getItem('token'));
    try {
      const response = await fetch(`${API_URL}/users/password`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify({ oldPassword, newPassword })
      });
      const data = await response.json();
      setMsg(data.message || (data.success ? 'Success' : t('error')));
      if (data.success) {
        setOldPassword('');
        setNewPassword('');
      }
    } catch (err) {
      setMsg(t('error'));
    }
  };

  const handleSaveTelegram = async (e) => {
    e.preventDefault();
    setTelegramMsg('');
    const token = (localStorage.getItem('token') || sessionStorage.getItem('token'));
    try {
      const response = await fetch(`${API_URL}/users/me`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify({ telegramId })
      });
      const data = await response.json();
      setTelegramMsg(data.success ? 'Saved' : t('error'));
    } catch (err) {
      setTelegramMsg(t('error'));
    }
  };

  const handleDeleteAccount = async () => {
    if (!window.confirm(t('areYouSure'))) return;
    const token = (localStorage.getItem('token') || sessionStorage.getItem('token'));
    try {
      const response = await fetch(`${API_URL}/users/me`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      if (data.success) {
        localStorage.removeItem('token'); sessionStorage.removeItem('token');
        navigate('/');
      } else {
        alert(data.message || t('error'));
      }
    } catch (err) {
      alert(t('error'));
    }
  };

  const toggleTab = (tab) => {
    setActiveTab(activeTab === tab ? null : tab);
  };

  return (
    <div className="font-sans flex items-center justify-center sm:p-8 xl:p-14 antialiased min-h-screen">
      <div className="w-full h-full min-h-[100dvh] sm:min-h-0 sm:h-[730px] max-w-5xl bg-app-screen sm:rounded-[44px] sm:shadow-phone sm:ring-1 sm:ring-white/10 p-6 pt-16 md:p-10 text-white flex flex-col xl:flex-row gap-10">
        
        {/* LEFT COLUMN: Profile Info */}
        <div className="w-full xl:w-1/3 flex flex-col justify-between">
          <div className="mb-8 flex flex-col">
            <h1 className="text-2xl font-bold tracking-tight text-white/90 text-center xl:text-left">{t('settings')}</h1>
            
            <div className="mt-20 flex flex-col items-center justify-center w-full">
              <div className="mb-4 w-28 h-28 rounded-full bg-app-phoneChassis/80 ring-1 ring-white/10 flex items-center justify-center shadow-xl">
                <svg className="w-14 h-14 text-white/40" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                </svg>
              </div>
              <p className="text-3xl font-black text-white capitalize text-center">{userName}</p>
            </div>
          </div>
          
          <button 
            onClick={() => navigate('/dashboard')}
            className="mt-auto w-full bg-app-lime hover:bg-app-limeHover active:scale-[0.99] text-black font-bold text-[14px] py-4 rounded-full transition-all flex items-center justify-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
            {t('backToDash')}
          </button>
        </div>

        {/* Divider for XL screens */}
        <div className="hidden xl:block w-[1px] bg-app-line self-stretch mx-4"></div>

        {/* RIGHT COLUMN: Settings Accordion */}
        <div className="w-full xl:w-2/3 flex flex-col overflow-y-auto hide-scrollbar pb-10">
          <div className="flex flex-col gap-3">
            
            {/* Language Selection */}
            <div className="bg-app-phoneChassis/50 border border-white/5 rounded-[24px] p-5 animate-slide-up flex items-center justify-between" style={{ animationDelay: '50ms' }}>
              <div>
                <h3 className="font-bold text-white text-[15px]">{t('language')}</h3>
                <span className="text-[11px] text-app-subtext font-medium mt-1 block tracking-wider">{t('appInterface')}</span>
              </div>
              <button 
                onClick={toggleLanguage} 
                className="px-6 py-2.5 bg-app-inputBg hover:bg-app-inputHover text-white text-[13px] font-bold rounded-full ring-1 ring-white/10 transition-colors cursor-pointer"
              >
                {lang === 'en' ? '🇬🇧 EN' : '🇹🇷 TR'}
              </button>
            </div>

            {/* Telegram Accordion */}
            <div className="bg-app-phoneChassis/50 border border-white/5 rounded-[24px] overflow-hidden animate-slide-up" style={{ animationDelay: '100ms' }}>
              <button 
                onClick={() => toggleTab('telegram')}
                className={`w-full p-5 flex items-center justify-between text-left transition-colors ${activeTab === 'telegram' ? '' : 'hover:bg-white/5'}`}
              >
                <div>
                  <h3 className="font-bold text-white text-[15px]">{t('telegramReminders') || 'Telegram Reminders'}</h3>
                  <span className="text-[11px] text-app-subtext font-medium mt-1 block tracking-wider">{t('notifications') || 'NOTIFICATIONS'}</span>
                </div>
                <div className="text-app-subtext">
                  <svg className={`w-5 h-5 transition-transform ${activeTab === 'telegram' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                </div>
              </button>
              {activeTab === 'telegram' && (
                <div className="p-5 pt-0">
                  <form onSubmit={handleSaveTelegram} className="flex flex-col space-y-4">
                    <p className="text-app-subtext text-xs">{t('telegramDesc') || 'Start a chat with your Telegram Bot to get your Chat ID, then save it here.'}</p>
                    <input 
                      type="text" 
                      placeholder="Telegram Chat ID" 
                      value={telegramId}
                      onChange={e => setTelegramId(e.target.value)}
                      className="w-full bg-app-screen text-white text-[13px] px-5 py-3.5 rounded-full border-none transition-colors focus:ring-1 focus:ring-app-lime focus:outline-none"
                    />
                    <button 
                      type="submit" 
                      className="w-full bg-app-lime hover:bg-app-limeHover active:scale-[0.99] text-black font-bold text-[14px] py-3.5 rounded-full shadow-lime-btn transition-all mt-2"
                    >
                      {t('save')}
                    </button>
                    {telegramMsg && <p className="text-center text-xs text-app-lime mt-1">{telegramMsg}</p>}
                  </form>
                </div>
              )}
            </div>
            
            {/* Export Data Accordion */}
            <div className="bg-app-phoneChassis/50 border border-white/5 rounded-[24px] overflow-hidden animate-slide-up" style={{ animationDelay: '150ms' }}>
              <button 
                onClick={() => toggleTab('export')}
                className={`w-full p-5 flex items-center justify-between text-left transition-colors ${activeTab === 'export' ? '' : 'hover:bg-white/5'}`}
              >
                <div>
                  <h3 className="font-bold text-white text-[15px]">{t('exportData')}</h3>
                  <span className="text-[11px] text-app-subtext font-medium mt-1 block tracking-wider">{t('downloadBackup')}</span>
                </div>
                <div className="text-app-subtext">
                  <svg className={`w-5 h-5 transition-transform ${activeTab === 'export' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                </div>
              </button>
              {activeTab === 'export' && (
                <div className="p-5 pt-0 flex justify-end">
                  <button 
                    onClick={handleExportCSV} 
                    className="px-6 py-3 bg-app-lime hover:bg-app-limeHover text-black text-[13px] font-bold rounded-full transition-colors cursor-pointer shadow-lime-btn"
                  >
                    {t('downloadCsv')}
                  </button>
                </div>
              )}
            </div>

            {/* Change Password Accordion */}

            <div className="bg-app-inputBg border border-white/5 rounded-[24px] overflow-hidden animate-slide-up" style={{ animationDelay: '200ms' }}>
              <button 
                onClick={() => toggleTab('password')}
                className={`w-full p-5 flex items-center justify-between text-left transition-colors ${activeTab === 'password' ? '' : 'hover:bg-white/5'}`}
              >
                <div>
                  <h3 className="font-bold text-white text-[15px]">{t('changePass')}</h3>
                  <span className="text-[11px] text-app-subtext font-medium mt-1 block tracking-wider">{t('security')}</span>
                </div>
                <div className="text-app-subtext">
                  <svg className={`w-5 h-5 transition-transform ${activeTab === 'password' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                </div>
              </button>
              {activeTab === 'password' && (
                <div className="p-5 pt-0">
                  <form onSubmit={handleChangePassword} className="flex flex-col space-y-4">
                    <input 
                      type="password" 
                      placeholder={t('oldPass')} 
                      value={oldPassword}
                      onChange={e => setOldPassword(e.target.value)}
                      required
                      className="w-full bg-app-screen text-white text-[13px] px-5 py-3.5 rounded-full border-none transition-colors focus:ring-1 focus:ring-app-lime focus:outline-none"
                    />
                    <input 
                      type="password" 
                      placeholder={t('newPass')} 
                      value={newPassword}
                      onChange={e => setNewPassword(e.target.value)}
                      required
                      className="w-full bg-app-screen text-white text-[13px] px-5 py-3.5 rounded-full border-none transition-colors focus:ring-1 focus:ring-app-lime focus:outline-none"
                    />
                    <button 
                      type="submit" 
                      className="w-full bg-app-lime hover:bg-app-limeHover active:scale-[0.99] text-black font-bold text-[14px] py-3.5 rounded-full shadow-lime-btn transition-all mt-2"
                    >
                      {t('changePass')}
                    </button>
                    {msg && <p className="text-center text-xs text-app-lime mt-1">{msg}</p>}
                  </form>
                </div>
              )}
            </div>

            {/* Delete Account Accordion */}
            <div className="bg-[#ff453a]/5 border border-[#ff453a]/20 rounded-[24px] overflow-hidden animate-slide-up" style={{ animationDelay: '250ms' }}>
              <button 
                onClick={() => toggleTab('delete')}
                className={`w-full p-5 flex items-center justify-between text-left transition-colors ${activeTab === 'delete' ? '' : 'hover:bg-[#ff453a]/10'}`}
              >
                <div>
                  <h3 className="font-bold text-[#ff453a] text-[15px]">{t('deleteAccount')}</h3>
                </div>
                <div className="text-[#ff453a]">
                  <svg className={`w-5 h-5 transition-transform ${activeTab === 'delete' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                </div>
              </button>
              {activeTab === 'delete' && (
                <div className="p-5 pt-0">
                  <p className="text-[#ff453a]/70 text-xs mb-4 leading-relaxed">
                    {t('deleteWarning')}
                  </p>
                  <button 
                    onClick={handleDeleteAccount} 
                    className="w-full bg-[#ff453a]/10 hover:bg-[#ff453a]/20 active:scale-[0.99] text-[#ff453a] font-bold text-[14px] py-3.5 rounded-full transition-all"
                  >
                    {t('deleteBtn')}
                  </button>
                </div>
              )}
            </div>
            
          </div>
        </div>

      </div>
    </div>
  );
}

export default Profile;
