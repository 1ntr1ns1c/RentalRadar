import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Home from './pages/Home';
import Login from './pages/Login.tsx';
import Register from  './pages/Register.tsx'
import Dashboard from './pages/Dashboard';
import Navbar from './components/Navbar';
import PropertiesPage from './pages/Properties.tsx';
import Contact from './pages/Contact.tsx';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/properties" element={<PropertiesPage />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
