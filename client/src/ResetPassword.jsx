import { API_URL } from "./config";
import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { useLanguage } from './LanguageContext';

function ResetPassword() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('token') || sessionStorage.getItem('token')) {
      navigate('/dashboard');
    }
  }, [navigate]);
  
  const id = searchParams.get('id');
  const token = searchParams.get('token');
  
  const [newPassword, setNewPassword] = useState('');
  const [msg, setMsg] = useState('');
  const [time, setTime] = useState(() => new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }));
  const { lang, toggleLanguage, t } = useLanguage();

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg('');
    try {
      const response = await fetch(`${API_URL}/auth/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, token, newPassword })
      });
      const data = await response.json();
      setMsg(data.message || (data.success ? 'Success' : t('error')));
      if (data.success) {
        setTimeout(() => navigate('/'), 2000);
      }
    } catch (err) {
      setMsg(t('error'));
    }
  };

  return (
    <div className="font-sans flex items-center justify-center sm:p-8 lg:p-14 antialiased select-none min-h-screen">
      
      <div className="relative group w-full h-[100dvh] sm:w-[365px] sm:h-[730px]">
        <div className="relative w-full h-full sm:rounded-[52px] sm:bg-app-phoneChassis sm:p-[10px] sm:shadow-phone sm:ring-1 sm:ring-white/10">
          
          <div className="hidden sm:block absolute -left-[3px] top-[108px] w-[3px] h-[24px] bg-[#3a3b3f] rounded-l-sm"></div>
          <div className="hidden sm:block absolute -left-[3px] top-[148px] w-[3px] h-[44px] bg-[#3a3b3f] rounded-l-sm"></div>
          <div className="hidden sm:block absolute -left-[3px] top-[204px] w-[3px] h-[44px] bg-[#3a3b3f] rounded-l-sm"></div>
          <div className="hidden sm:block absolute -right-[3px] top-[160px] w-[3px] h-[64px] bg-[#3a3b3f] rounded-r-sm"></div>

          <div className="w-full h-full bg-app-screen sm:rounded-[44px] overflow-hidden flex flex-col pt-12 pb-8 sm:pt-3 sm:pb-3 px-6 text-white relative">
            
            <div>
              <div className="hidden sm:flex items-center justify-between text-[13px] font-semibold tracking-tight px-3 pt-1 text-white select-none">
                <span>{time}</span>

                <div className="w-[88px] h-[24px] bg-black rounded-full flex items-center justify-end pr-2 gap-1.5 ring-1 ring-[#1a1a1a]">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#080808] ring-1 ring-[#151515]"></div>
                  <div className="w-2 h-2 rounded-full bg-[#080808]"></div>
                </div>

                <div className="flex items-center gap-1.5 text-white">
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <rect x="2" y="16" width="3" height="6" rx="0.5"/>
                    <rect x="8" y="11" width="3" height="11" rx="0.5"/>
                    <rect x="14" y="6" width="3" height="16" rx="0.5"/>
                    <rect x="20" y="2" width="3" height="20" rx="0.5"/>
                  </svg>
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 4C7.31 4 3.07 5.9 0 8.98L12 21 24 8.98A16.88 16.88 0 0012 4z"/>
                  </svg>
                  <div className="flex items-center gap-0.5">
                    <div className="w-5 h-[11px] border border-white/80 rounded-[3.5px] p-[1.5px] flex items-center">
                      <div className="w-full h-full bg-[#34c759] rounded-[1.5px]"></div>
                    </div>
                    <div className="w-[1.5px] h-[4px] bg-white/60 rounded-r-sm"></div>
                  </div>
                </div>
              </div>

              <button 
                onClick={toggleLanguage} 
                className="absolute top-6 right-6 sm:top-14 sm:right-10 px-3 py-1.5 bg-app-inputBg hover:bg-app-inputHover text-white text-[11px] font-bold rounded-full ring-1 ring-white/10 transition-colors cursor-pointer z-10"
              >
                {lang === 'en' ? '🇬🇧 EN' : '🇹🇷 TR'}
              </button>

              <div className="text-center mt-10">
                <h1 className="text-[26px] font-bold tracking-tight text-white">New Password</h1>
                <p className="text-app-subtext text-[13px] font-medium mt-2 leading-snug">
                  Set a new password for your account.
                </p>
              </div>
            </div>

            <div className="flex flex-col space-y-4 mb-auto mt-6">
              <form onSubmit={handleSubmit} className="flex flex-col space-y-3.5">
                <div>
                  <label className="block text-white text-[12px] font-medium mb-1.5 pl-1">{t('newPass')}</label>
                  <input 
                    type="password" 
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder={t('newPass')} 
                    className="w-full bg-app-inputBg text-white text-[13px] px-5 py-3.5 rounded-full border-none transition-colors focus:ring-1 focus:ring-app-lime focus:outline-none placeholder:text-app-subtext/50"
                    required
                  />
                </div>
                <button 
                  type="submit"
                  className="w-full bg-app-lime hover:bg-app-limeHover active:scale-[0.99] text-black font-bold text-[13.5px] py-3.5 rounded-full shadow-lime-btn transition-all mt-1"
                >
                  Save Password
                </button>
                {msg && <p className="text-center text-xs text-app-lime mt-2 font-medium">{msg}</p>}
              </form>
              <div className="text-center pt-2">
                <Link to="/" className="text-app-yellow text-[11.5px] font-medium hover:opacity-90 transition-opacity">
                  {t('backToLogin')}
                </Link>
              </div>
            </div>
            
            <div className="hidden sm:block absolute bottom-1.5 left-1/2 -translate-x-1/2 w-32 h-1 bg-white/40 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
