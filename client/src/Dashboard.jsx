import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from './LanguageContext';

function Dashboard() {
  const [subscriptions, setSubscriptions] = useState([]);
  const navigate = useNavigate();
  const { t } = useLanguage();

  // Form states
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [currency, setCurrency] = useState('TL');
  const [frequency, setFrequency] = useState('monthly');
  const [category, setCategory] = useState('movies');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);

  const fetchSubscriptions = () => {
    const token = localStorage.getItem('token');
    fetch('http://localhost:3000/api/v1/subscriptions', {
      headers: { 'Authorization': `Bearer ${token}` }
    })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        setSubscriptions(data.data);
      } else if (data.message === 'Unauthorized Token') {
        navigate('/');
      }
    })
    .catch(err => console.error(err));
  };

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/');
      return;
    }
    fetchSubscriptions();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const handleAddSubscription = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    
    try {
      const response = await fetch('http://localhost:3000/api/v1/subscriptions', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          name,
          price: Number(price),
          currency,
          frequency,
          category,
          paymentMethod,
          startDate
        }),
      });
      
      const data = await response.json();
      if (data.success) {
        fetchSubscriptions();
        setName('');
        setPrice('');
      } else {
        alert(data.message || t('error'));
      }
    } catch (error) {
      console.error(error);
      alert(t('error'));
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm(t('areYouSure'))) return;
    
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`http://localhost:3000/api/v1/subscriptions/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      if (data.success) {
        fetchSubscriptions();
      } else {
        alert(data.message || t('error'));
      }
    } catch (err) {
      console.error(err);
      alert(t('error'));
    }
  };

  return (
    <div className="font-sans flex items-center justify-center p-4 sm:p-8 lg:p-14 antialiased min-h-screen">
      
      {/* Main Dashboard Container */}
      <div className="w-full max-w-5xl bg-app-screen rounded-[44px] shadow-phone ring-1 ring-white/10 p-6 md:p-10 text-white flex flex-col xl:flex-row gap-10">
        
        {/* LEFT COLUMN: Add Subscription Form */}
        <div className="w-full xl:w-1/3 flex flex-col">
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight text-white">{t('addNew')}</h1>
            <p className="text-app-subtext text-sm font-medium mt-2">
              {t('trackService')}
            </p>
          </div>

          <form onSubmit={handleAddSubscription} className="flex flex-col space-y-4">
            
            <input 
              type="text" 
              placeholder={t('platformPlaceholder')} 
              value={name} 
              onChange={e => setName(e.target.value)} 
              required 
              className="w-full bg-app-inputBg text-white text-[13px] px-5 py-3.5 rounded-full border-none transition-colors hover:bg-app-inputHover focus:ring-1 focus:ring-app-lime focus:outline-none"
            />
            
            <input 
              type="number" 
              placeholder={t('pricePlaceholder')} 
              value={price} 
              onChange={e => setPrice(e.target.value)} 
              required 
              className="w-full bg-app-inputBg text-white text-[13px] px-5 py-3.5 rounded-full border-none transition-colors hover:bg-app-inputHover focus:ring-1 focus:ring-app-lime focus:outline-none"
            />
            
            <div className="flex gap-4">
              <select 
                value={currency} 
                onChange={e => setCurrency(e.target.value)}
                className="w-1/2 bg-app-inputBg text-white text-[13px] px-5 py-3.5 rounded-full border-none transition-colors hover:bg-app-inputHover focus:ring-1 focus:ring-app-lime focus:outline-none appearance-none cursor-pointer"
              >
                <option value="TL">TL</option>
                <option value="USD">USD</option>
                <option value="EURO">EURO</option>
              </select>

              <select 
                value={frequency} 
                onChange={e => setFrequency(e.target.value)}
                className="w-1/2 bg-app-inputBg text-white text-[13px] px-5 py-3.5 rounded-full border-none transition-colors hover:bg-app-inputHover focus:ring-1 focus:ring-app-lime focus:outline-none appearance-none cursor-pointer"
              >
                <option value="monthly">{t('monthly')}</option>
                <option value="yearly">{t('yearly')}</option>
                <option value="weekly">{t('weekly')}</option>
              </select>
            </div>

            <select 
              value={category} 
              onChange={e => setCategory(e.target.value)}
              className="w-full bg-app-inputBg text-white text-[13px] px-5 py-3.5 rounded-full border-none transition-colors hover:bg-app-inputHover focus:ring-1 focus:ring-app-lime focus:outline-none appearance-none cursor-pointer"
            >
              <option value="movies">{t('movies')}</option>
              <option value="music">{t('music')}</option>
              <option value="games">{t('games')}</option>
              <option value="sports">{t('sports')}</option>
            </select>

            <input 
              type="text" 
              placeholder={t('paymentMethod')} 
              value={paymentMethod} 
              onChange={e => setPaymentMethod(e.target.value)} 
              className="w-full bg-app-inputBg text-white text-[13px] px-5 py-3.5 rounded-full border-none transition-colors hover:bg-app-inputHover focus:ring-1 focus:ring-app-lime focus:outline-none"
            />
            
            <div className="relative">
              <label className="absolute -top-2.5 left-4 px-1 bg-app-screen text-[10px] text-app-subtext font-semibold uppercase tracking-wider">{t('startDate')}</label>
              <input 
                type="date" 
                value={startDate} 
                onChange={e => setStartDate(e.target.value)} 
                required 
                style={{ colorScheme: 'dark' }}
                className="w-full bg-app-inputBg text-white text-[13px] px-5 py-3.5 rounded-full border-none transition-colors hover:bg-app-inputHover focus:ring-1 focus:ring-app-lime focus:outline-none"
              />
            </div>
            
            <button 
              type="submit" 
              className="w-full bg-app-lime hover:bg-app-limeHover active:scale-[0.99] text-black font-bold text-[14px] py-4 rounded-full shadow-lime-btn transition-all mt-4"
            >
              {t('save')}
            </button>
          </form>
        </div>

        {/* Divider for XL screens */}
        <div className="hidden xl:block w-[1px] bg-app-line self-stretch mx-4"></div>

        {/* RIGHT COLUMN: Subscriptions List */}
        <div className="w-full xl:w-2/3 flex flex-col">
          
          {/* Header Row: Title & Logout */}
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-app-line mt-10 xl:mt-0">
            <h1 className="text-2xl font-bold tracking-tight">{t('mySubs')}</h1>
            <button 
              onClick={handleLogout} 
              className="bg-app-inputBg hover:bg-app-inputHover text-white text-[12px] font-semibold py-2 px-5 rounded-full transition-colors ring-1 ring-[#3b3c40]"
            >
              {t('logout')}
            </button>
          </div>

          {/* List Area */}
          <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
            {subscriptions.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-10 opacity-60">
                <svg className="w-16 h-16 text-app-subtext mb-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-app-subtext font-medium text-sm">{t('noSubs')}</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {subscriptions.map(sub => (
                  <div key={sub._id} className="bg-app-inputBg hover:bg-app-inputHover transition-colors rounded-[24px] p-5 flex flex-col ring-1 ring-white/5 relative group">
                    
                    {/* Top Row: Name & Delete */}
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-3">
                        {/* Fake Icon Placeholder based on category */}
                        <div className="w-10 h-10 rounded-full bg-[#2d2e32] flex items-center justify-center font-bold text-white text-[12px] uppercase">
                          {sub.name.substring(0,2)}
                        </div>
                        <div>
                          <h3 className="font-bold text-white text-[15px] leading-none">{sub.name}</h3>
                          <span className="text-[11px] text-app-subtext font-medium mt-1 block uppercase tracking-wider">{sub.category}</span>
                        </div>
                      </div>
                      
                      <button 
                        onClick={() => handleDelete(sub._id)} 
                        className="text-app-subtext hover:text-[#ff453a] hover:bg-[#ff453a]/10 p-2 rounded-full transition-colors opacity-0 group-hover:opacity-100"
                        title={t('deleteBtn')}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>

                    {/* Middle Row: Price & Frequency */}
                    <div className="mb-4">
                      <span className="text-2xl font-black text-app-lime tracking-tight">{sub.price} {sub.currency}</span>
                      <span className="text-app-subtext text-[12px] font-medium ml-1">/ {sub.frequency === 'monthly' ? t('monthly') : sub.frequency === 'yearly' ? t('yearly') : t('weekly')}</span>
                    </div>

                    {/* Bottom Row: Status & Dates */}
                    <div className="mt-auto pt-4 border-t border-app-line flex justify-between items-center text-[11px] font-medium">
                      <div className="flex items-center gap-1.5">
                        <div className={`w-2 h-2 rounded-full ${sub.status === 'active' ? 'bg-[#34c759]' : 'bg-[#ff453a]'}`}></div>
                        <span className="text-white capitalize">{t(sub.status)}</span>
                      </div>
                      <span className="text-app-subtext">
                        {t('nextRenewal')}: <span className="text-white">{new Date(sub.renewalDate).toLocaleDateString()}</span>
                      </span>
                    </div>

                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}

export default Dashboard;
