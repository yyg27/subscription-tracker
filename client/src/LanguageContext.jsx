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
    
    // Dashboard
    mySubs: 'My Subscriptions',
    logout: 'Logout',
    addNew: 'Add New Subscription',
    platformPlaceholder: 'Platform (e.g. Netflix)',
    pricePlaceholder: 'Price (e.g. 100)',
    monthly: 'Monthly',
    yearly: 'Yearly',
    weekly: 'Weekly',
    movies: 'Movies/Series',
    music: 'Music',
    games: 'Games',
    sports: 'Sports',
    paymentMethod: 'Payment Method (e.g. Credit Card)',
    save: 'Save',
    noSubs: 'You have no subscriptions. Add one from above.',
    category: 'Category',
    status: 'Status',
    nextRenewal: 'Next Renewal',
    deleteBtn: 'Delete',
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
    
    // Dashboard
    mySubs: 'Aboneliklerim',
    logout: 'Çıkış Yap',
    addNew: 'Yeni Abonelik Ekle',
    platformPlaceholder: 'Platform (Örn: Netflix)',
    pricePlaceholder: 'Fiyat (Örn: 100)',
    monthly: 'Aylık',
    yearly: 'Yıllık',
    weekly: 'Haftalık',
    movies: 'Film/Dizi',
    music: 'Müzik',
    games: 'Oyun',
    sports: 'Spor',
    paymentMethod: 'Ödeme Yöntemi (Örn: Kredi Kartı)',
    save: 'Kaydet',
    noSubs: 'Hiç aboneliğiniz yok. Yukarıdan ekleyebilirsiniz.',
    category: 'Kategori',
    status: 'Durum',
    nextRenewal: 'Sonraki Yenileme',
    deleteBtn: 'Sil',
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
      <div style={{ position: 'absolute', top: '10px', right: '10px' }}>
        <button 
          onClick={toggleLanguage} 
          style={{ padding: '5px 10px', cursor: 'pointer', background: '#eee', border: '1px solid #ccc', borderRadius: '4px' }}
        >
          {lang === 'en' ? '🇹🇷 TR' : '🇬🇧 EN'}
        </button>
      </div>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
