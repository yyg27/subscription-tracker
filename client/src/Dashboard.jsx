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
        alert(t('successAdd'));
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
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1>{t('mySubs')}</h1>
        <button onClick={handleLogout} style={{ padding: '0.5rem', cursor: 'pointer' }}>{t('logout')}</button>
      </div>
      
      {/* ADD SUBSCRIPTION FORM */}
      <div style={{ border: '1px solid #ccc', padding: '1rem', borderRadius: '5px', marginBottom: '2rem' }}>
        <h2>{t('addNew')}</h2>
        <form onSubmit={handleAddSubscription} style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
          <input type="text" placeholder={t('platformPlaceholder')} value={name} onChange={e => setName(e.target.value)} required />
          <input type="number" placeholder={t('pricePlaceholder')} value={price} onChange={e => setPrice(e.target.value)} required />
          
          <select value={currency} onChange={e => setCurrency(e.target.value)}>
            <option value="TL">TL</option>
            <option value="USD">USD</option>
            <option value="EURO">EURO</option>
          </select>

          <select value={frequency} onChange={e => setFrequency(e.target.value)}>
            <option value="monthly">{t('monthly')}</option>
            <option value="yearly">{t('yearly')}</option>
            <option value="weekly">{t('weekly')}</option>
          </select>

          <select value={category} onChange={e => setCategory(e.target.value)}>
            <option value="movies">{t('movies')}</option>
            <option value="music">{t('music')}</option>
            <option value="games">{t('games')}</option>
            <option value="sports">{t('sports')}</option>
          </select>

          <input type="text" placeholder={t('paymentMethod')} value={paymentMethod} onChange={e => setPaymentMethod(e.target.value)} required />
          <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} required />
          
          <button type="submit" style={{ padding: '0.5rem', cursor: 'pointer', backgroundColor: '#007BFF', color: 'white', border: 'none' }}>{t('save')}</button>
        </form>
      </div>

      {/* LIST */}
      {subscriptions.length === 0 ? (
        <p>{t('noSubs')}</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {subscriptions.map(sub => (
            <li key={sub._id} style={{ border: '1px solid #ccc', margin: '1rem 0', padding: '1rem', borderRadius: '5px', position: 'relative' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <h3 style={{ margin: 0 }}>{sub.name}</h3>
                <div>
                  <span style={{ fontWeight: 'bold', marginRight: '1rem' }}>{sub.price} {sub.currency} / {sub.frequency === 'monthly' ? t('monthly') : sub.frequency === 'yearly' ? t('yearly') : t('weekly')}</span>
                  <button onClick={() => handleDelete(sub._id)} style={{ padding: '0.3rem 0.6rem', cursor: 'pointer', backgroundColor: 'red', color: 'white', border: 'none', borderRadius: '3px' }}>{t('deleteBtn')}</button>
                </div>
              </div>
              <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.9rem', color: '#666' }}>
                {t('category')}: {sub.category} | {t('status')}: {sub.status} <br/>
                {t('nextRenewal')}: {new Date(sub.renewalDate).toLocaleDateString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Dashboard;
