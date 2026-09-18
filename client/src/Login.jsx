import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useLanguage } from './LanguageContext';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [time, setTime] = useState(() => new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }));
  const navigate = useNavigate();
  const { t } = useLanguage();

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/api/v1/auth/sign-in', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      
      const data = await response.json();
      if (data.success) {
        localStorage.setItem('token', data.data.token);
        navigate('/dashboard');
      } else {
        alert(data.message || t('error'));
      }
    } catch (error) {
      console.error('Error:', error);
      alert(t('error'));
    }
  };

  return (
    <div className="font-sans flex items-center justify-center p-4 sm:p-8 lg:p-14 antialiased select-none h-full min-h-screen">
      
      <div className="relative group">
        <div className="relative w-[340px] sm:w-[365px] h-[730px] rounded-[52px] bg-app-phoneChassis p-[10px] shadow-phone ring-1 ring-white/10">
          
          <div className="absolute -left-[3px] top-[108px] w-[3px] h-[24px] bg-[#3a3b3f] rounded-l-sm"></div>
          <div className="absolute -left-[3px] top-[148px] w-[3px] h-[44px] bg-[#3a3b3f] rounded-l-sm"></div>
          <div className="absolute -left-[3px] top-[204px] w-[3px] h-[44px] bg-[#3a3b3f] rounded-l-sm"></div>
          <div className="absolute -right-[3px] top-[160px] w-[3px] h-[64px] bg-[#3a3b3f] rounded-r-sm"></div>

          <div className="w-full h-full bg-app-screen rounded-[44px] overflow-hidden flex flex-col justify-between pt-3 pb-3 px-6 text-white relative">
            
            <div>
              <div className="flex items-center justify-between text-[13px] font-semibold tracking-tight px-3 pt-1 text-white select-none">
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

              <div className="text-center mt-10">
                <h1 className="text-[26px] font-bold tracking-tight text-white">{t('login')}</h1>
                <p className="text-app-subtext text-[13px] font-medium mt-2 leading-snug">
                  {t('welcomeDesc')}
                </p>
              </div>
            </div>

            <div className="flex flex-col space-y-4 mb-auto mt-6">
              <form onSubmit={handleLogin} className="flex flex-col space-y-3.5">
                <div>
                  <label className="block text-white text-[12px] font-medium mb-1.5 pl-1">{t('email')}</label>
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full bg-app-inputBg text-white text-[12.5px] px-5 py-3 rounded-full border-none transition-colors hover:bg-app-inputHover focus:ring-1 focus:ring-app-lime focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-white text-[12px] font-medium mb-1.5 pl-1">{t('password')}</label>
                  <div className="relative flex items-center">
                    <input 
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      placeholder={t('password')} 
                      className="w-full bg-app-inputBg text-white text-[12.5px] px-5 py-3 pr-11 rounded-full border-none transition-colors hover:bg-app-inputHover focus:ring-1 focus:ring-app-lime focus:outline-none"
                    />
                    <button 
                      type="button" 
                      onClick={() => setShowPassword(!showPassword)}
                      className={`absolute right-4 transition-colors ${showPassword ? 'text-app-lime' : 'text-app-subtext hover:text-white'}`}
                    >
                      <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"/>
                      </svg>
                    </button>
                  </div>
                </div>

                <div className="text-right pt-0.5">
                  <a href="#" className="text-app-yellow text-[11.5px] font-medium hover:opacity-90 transition-opacity">
                    {t('forgetPass')}
                  </a>
                </div>

                <button 
                  type="submit"
                  className="w-full bg-app-lime hover:bg-app-limeHover active:scale-[0.99] text-black font-bold text-[13.5px] py-3.5 rounded-full shadow-lime-btn transition-all mt-1"
                >
                  {t('signIn')}
                </button>
              </form>

              <div className="text-center pt-2">
                <span className="text-[11px] text-white">
                  {t('noAccount')} <Link to="/register" className="text-app-yellow font-semibold hover:underline">{t('register')}</Link>
                </span>
              </div>

            </div>

            <div className="pt-2 pb-1">
              <div className="w-32 h-[4.5px] bg-white rounded-full mx-auto"></div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
