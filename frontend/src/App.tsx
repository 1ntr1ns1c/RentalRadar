import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Home from './pages/Home';
import Login from './pages/Login.tsx';
import Register from './pages/Register.tsx';
import Dashboard from './pages/Dashboard';
import Navbar from './components/Navbar';
import PropertiesPage from './pages/Properties.tsx';
import PropertyDetail from './pages/PropertyDetail.tsx';
import Contact from './pages/Contact.tsx';
import Profile from './pages/Profile.tsx';
import Inquiries from './pages/Inquiries.tsx';
import Footer from './components/Footer.tsx';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);

  return ( // ✅ This was missing
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/properties" element={<PropertiesPage />} />
          <Route path="/properties/:id" element={<PropertyDetail />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/inquiries" element={<Inquiries />} />
        </Routes>
        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;
