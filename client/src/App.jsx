import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import Dashboard from './Dashboard';
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
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </BeamsBackground>
      </BrowserRouter>
    </LanguageProvider>
  );
}

export default App;
