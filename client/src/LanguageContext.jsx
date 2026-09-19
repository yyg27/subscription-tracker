import { createContext, useState, useContext } from 'react';

const translations = {
  en: {
    // Auth
    login: 'Login',
    register: 'Register',
    email: 'Email',
    password: 'Password',
    fullName: 'Full Name',
    noAccount: "Don't have an account?",
    hasAccount: "Already have an account?",
    signIn: 'Sign In',
    createAccount: 'Create Account',
    welcomeDesc: 'Welcome Back! Ready To Manage Payments?',
    forgetPass: 'Forget Password?',
    or: 'Or',
    continueApple: 'Continue With Apple',
    continueGoogle: 'Continue With Google',
    registerDesc: 'Create An Account Now Start Managing Payments!',
    agreeTerms: 'I agree to',
    terms: 'Terms',
    and: 'and',
    privacy: 'Privacy Policy.',
    
    // Dashboard
    mySubs: 'My Subscriptions',
    logout: 'Logout',
    addNew: 'Add New Subscription',
    trackService: 'Track a new service in seconds.',
    platformPlaceholder: 'Platform (e.g. Netflix)',
    pricePlaceholder: 'Price (e.g. 100)',
    monthly: 'Monthly',
    yearly: 'Yearly',
    weekly: 'Weekly',
    movies: 'Movies/Series',
    music: 'Music',
    games: 'Games',
    sports: 'Sports',
    paymentMethod: 'Payment Method (Optional)',
    save: 'Save',
    noSubs: 'You have no subscriptions. Add one from above.',
    category: 'Category',
    status: 'Status',
    nextRenewal: 'Next Renewal',
    startDate: 'Start Date',
    deleteBtn: 'Delete',
    active: 'Active',
    cancelled: 'Cancelled',
    expired: 'Expired',
    totalMonthly: 'Total Monthly',
    areYouSure: 'Are you sure?',
    successAdd: 'Subscription added!',
    error: 'An error occurred',
  },
  tr: {
    // Auth
    login: 'Giriş Yap',
    register: 'Kayıt Ol',
    email: 'E-posta',
    password: 'Şifre',
    fullName: 'Ad Soyad',
    noAccount: "Hesabın yok mu?",
    hasAccount: "Zaten hesabın var mı?",
    signIn: 'Giriş Yap',
    createAccount: 'Hesap Oluştur',
    welcomeDesc: "Tekrar Hoş Geldin! Ödemeleri Yönetmeye Hazır mısın?",
    forgetPass: 'Şifremi Unuttum?',
    or: 'Veya',
    continueApple: 'Apple ile Devam Et',
    continueGoogle: 'Google ile Devam Et',
    registerDesc: 'Hemen Hesap Aç ve Aboneliklerini Yönet!',
    agreeTerms: 'Kabul ediyorum:',
    terms: 'Şartlar',
    and: 've',
    privacy: 'Gizlilik Politikası.',
    
    // Dashboard
    mySubs: 'Aboneliklerim',
    logout: 'Çıkış Yap',
    addNew: 'Yeni Abonelik Ekle',
    trackService: 'Yeni bir servisi saniyeler içinde takibe al.',
    platformPlaceholder: 'Platform (Örn: Netflix)',
    pricePlaceholder: 'Fiyat (Örn: 100)',
    monthly: 'Aylık',
    yearly: 'Yıllık',
    weekly: 'Haftalık',
    movies: 'Film/Dizi',
    music: 'Müzik',
    games: 'Oyun',
    sports: 'Spor',
    paymentMethod: 'Ödeme Yöntemi (Opsiyonel)',
    save: 'Kaydet',
    noSubs: 'Hiç aboneliğiniz yok. Yukarıdan ekleyebilirsiniz.',
    category: 'Kategori',
    status: 'Durum',
    nextRenewal: 'Sonraki Yenileme',
    startDate: 'Başlangıç Tarihi',
    deleteBtn: 'Sil',
    active: 'Aktif',
    cancelled: 'İptal Edildi',
    expired: 'Süresi Doldu',
    totalMonthly: 'Aylık Toplam',
    areYouSure: 'Emin misin?',
    successAdd: 'Abonelik eklendi!',
    error: 'Hata oluştu',
  }
};

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  // Default to English, but check localStorage if user previously selected TR
  const [lang, setLang] = useState(localStorage.getItem('lang') || 'en');

  const toggleLanguage = () => {
    const newLang = lang === 'en' ? 'tr' : 'en';
    setLang(newLang);
    localStorage.setItem('lang', newLang);
  };

  const t = (key) => {
    return translations[lang][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, toggleLanguage, t }}>
      <div style={{ position: 'absolute', top: '20px', right: '20px', zIndex: 50 }}>
        <button 
          onClick={toggleLanguage} 
          className="px-4 py-2 bg-app-inputBg hover:bg-app-inputHover text-white text-[12px] font-bold rounded-full ring-1 ring-white/10 transition-colors shadow-phone cursor-pointer"
        >
          {lang === 'en' ? '🇹🇷 TR' : '🇬🇧 EN'}
        </button>
      </div>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
