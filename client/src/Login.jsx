import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useLanguage } from './LanguageContext';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { t } = useLanguage();

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
    <div style={{ padding: '2rem', maxWidth: '400px', margin: '0 auto' }}>
      <h1>{t('login')}</h1>
      <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div>
          <label>{t('email')}</label>
          <br/>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
            style={{ width: '100%', padding: '0.5rem' }}
          />
        </div>
        <div>
          <label>{t('password')}</label>
          <br/>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
            style={{ width: '100%', padding: '0.5rem' }}
          />
        </div>
        <button type="submit" style={{ padding: '0.5rem', cursor: 'pointer' }}>{t('signIn')}</button>
      </form>
      <p style={{ marginTop: '1rem', textAlign: 'center' }}>
        {t('noAccount')} <Link to="/register">{t('register')}</Link>
      </p>
    </div>
  );
}

export default Login;
