import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import Dashboard from './Dashboard';
import Profile from './Profile';
import ForgotPassword from './ForgotPassword';
import ResetPassword from './ResetPassword';
import { LanguageProvider } from './LanguageContext';
import BeamsBackground from './BeamsBackground';

function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <BeamsBackground>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </BeamsBackground>
      </BrowserRouter>
    </LanguageProvider>
  );
}

export default App;
