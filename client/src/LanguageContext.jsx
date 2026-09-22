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
    movies: 'Movies',
    news: 'News',
    series: 'Series',
    documentary: 'Documentary',
    software: 'Software',
    cloud: 'Cloud',
    education: 'Education',
    health: 'Health',
    shopping: 'Shopping',
    other: 'Other',
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

    // Profile
    profile: 'Profile',
    backToDash: 'Back to Dashboard',
    exportData: 'Export Data (CSV)',
    language: 'Language',
    changePass: 'Change Password',
    oldPass: 'Old Password',
    newPass: 'New Password',
    updateAccount: 'Update Account',
    deleteAccount: 'Delete Account',
    notifications: 'Notifications',
    emailReminders: 'Email Reminders',
    telegramReminders: 'Telegram Reminders',
    telegramDesc: 'Start a chat with your Telegram Bot to get your Chat ID, then save it here.',
    settings: 'Settings',
    appInterface: 'APP INTERFACE',
    downloadBackup: 'DOWNLOAD BACKUP',
    downloadCsv: 'Download CSV',
    security: 'SECURITY',
    
    
    dangerZone: 'DANGER ZONE',
    updateSubscription: 'Update Subscription',
    update: 'Update',
    cancel: 'Cancel',
    editTitle: 'Edit',
    deleteWarning: 'Permanently remove your account and all associated subscription data. This action cannot be undone.',
    rememberMe: 'Keep me signed in',
    forgotPassTitle: 'Reset Password',
    forgotPassDesc: 'Enter your email to receive a reset link.',
    sendResetLink: 'Send Reset Link',
    backToLogin: 'Back to Login',
    resetPassTitle: 'Set New Password',
    resetPassDesc: 'Enter your new password below.',
    setNewPass: 'Set New Password',
    remindMeBefore: 'Remind me before:',
    days: 'days',
    emailSent: 'Email sent'
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
    movies: 'Film',
    music: 'Müzik',
    games: 'Oyun',
    sports: 'Spor',
    news: 'Haber',
    series: 'Dizi',
    documentary: 'Belgesel',
    software: 'Yazılım',
    cloud: 'Bulut',
    education: 'Eğitim',
    health: 'Sağlık',
    shopping: 'Alışveriş',
    other: 'Diğer',
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

    // Profile
    profile: 'Profil',
    backToDash: 'Panoya Dön',
    exportData: 'Verileri Dışa Aktar (CSV)',
    language: 'Dil',
    changePass: 'Şifre Değiştir',
    oldPass: 'Eski Şifre',
    newPass: 'Yeni Şifre',
    updateAccount: 'Hesabı Güncelle',
    deleteAccount: 'Hesabı Sil',
    notifications: 'Bildirimler',
    emailReminders: 'E-posta Hatırlatıcıları',
    telegramReminders: 'Telegram Hatırlatıcıları',
    telegramDesc: 'Telegram Botunuzla sohbet başlatıp Chat ID numaranızı alın ve buraya kaydedin.',
    settings: 'Ayarlar',
    appInterface: 'UYGULAMA ARAYÜZÜ',
    downloadBackup: 'YEDEK İNDİR',
    downloadCsv: 'CSV İndir',
    security: 'GÜVENLİK',
    
    
    dangerZone: 'TEHLİKE BÖLGESİ',
    updateSubscription: 'Aboneliği Güncelle',
    update: 'Güncelle',
    cancel: 'İptal',
    editTitle: 'Düzenle',
    deleteWarning: 'Hesabınızı ve ilişkili tüm abonelik verilerinizi kalıcı olarak siler. Bu işlem geri alınamaz.',
    rememberMe: 'Beni hatırla',
    forgotPassTitle: 'Şifreyi Sıfırla',
    forgotPassDesc: 'Sıfırlama bağlantısı almak için e-posta adresinizi girin.',
    sendResetLink: 'Sıfırlama Linki Gönder',
    backToLogin: 'Giriş Sayfasına Dön',
    resetPassTitle: 'Yeni Şifre Belirle',
    resetPassDesc: 'Aşağıya yeni şifrenizi girin.',
    setNewPass: 'Yeni Şifreyi Kaydet',
    remindMeBefore: 'Önceden hatırlat:',
    days: 'gün',
    emailSent: 'E-posta gönderildi'
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
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);

