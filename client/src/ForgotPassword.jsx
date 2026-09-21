import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from './LanguageContext';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState('');
  const { t } = useLanguage();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg('');
    try {
      const response = await fetch('http://localhost:3000/api/v1/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      const data = await response.json();
      setMsg(data.message || (data.success ? 'Email sent' : t('error')));
    } catch (err) {
      setMsg(t('error'));
    }
  };

  return (
    <div className="font-sans flex items-center justify-center min-h-[100dvh] sm:p-8 xl:p-14 antialiased">
      <div className="w-full h-[100dvh] sm:h-[85vh] sm:min-h-[700px] sm:max-h-[900px] max-w-sm bg-app-screen sm:rounded-[44px] sm:shadow-phone sm:ring-1 sm:ring-white/10 relative overflow-hidden flex flex-col">
        <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-app-phoneChassis/80 to-transparent pointer-events-none" />
        <div className="flex-1 flex flex-col pt-12 sm:pt-16 pb-8 px-6 sm:px-8 relative z-10 overflow-y-auto hide-scrollbar">
          <div className="flex-1 flex flex-col justify-center">
            <div className="bg-app-phoneChassis/50 backdrop-blur-md rounded-[32px] p-6 sm:p-8 border border-white/5 shadow-2xl relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
              <div className="relative z-10 space-y-6">
                <div>
                  <h1 className="text-[26px] font-bold tracking-tight text-white">Reset Password</h1>
                  <p className="text-app-subtext text-[13px] font-medium mt-1 leading-relaxed">
                    Enter your email to receive a reset link.
                  </p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-white text-[12px] font-medium mb-1.5 pl-1">{t('email')}</label>
                    <input 
                      type="email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={t('email')} 
                      className="w-full bg-app-inputBg text-white text-[13px] px-5 py-3.5 rounded-full border border-white/5 transition-all hover:bg-app-inputHover hover:border-white/10 focus:bg-app-inputHover focus:border-app-lime/50 focus:ring-1 focus:ring-app-lime focus:outline-none placeholder:text-app-subtext/50"
                      required
                    />
                  </div>
                  <button 
                    type="submit"
                    className="w-full bg-app-lime hover:bg-app-limeHover active:scale-[0.99] text-black font-bold text-[13.5px] py-3.5 rounded-full shadow-lime-btn transition-all mt-1"
                  >
                    Send Link
                  </button>
                  {msg && <p className="text-center text-xs text-app-lime mt-2 font-medium">{msg}</p>}
                </form>
              </div>
            </div>
            <div className="mt-8 text-center">
              <p className="text-app-subtext text-[12.5px] font-medium">
                Back to <Link to="/" className="text-app-lime font-semibold hover:underline">Login</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
