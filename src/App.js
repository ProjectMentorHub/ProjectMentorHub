import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import CartDrawer from './components/CartDrawer';
import AdBanner from './components/AdBanner';
import Footer from './components/Footer';
import SupportChatbot from './components/SupportChatbot';
import Home from './pages/Home';
import About from './pages/About';
import Login from './pages/Login';
import Catalog from './pages/Catalog';
import JournalServices from './pages/JournalServices';
import ProjectDetails from './pages/ProjectDetails';
import Checkout from './pages/Checkout';
import Cart from './pages/Cart';
import Orders from './pages/Dashboard';
import Admin from './pages/Admin';
import AdminAnalytics from './pages/AdminAnalytics';
import Success from './pages/Success';
import Cancel from './pages/Cancel';
import RequireAuth from './components/RequireAuth';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
        <div className="min-h-screen bg-white">
          <Toaster position="top-right" />
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/journals" element={<JournalServices />} />
            <Route path="/journal-services" element={<Navigate to="/journals" replace />} />
            <Route path="/journalservices" element={<Navigate to="/journals" replace />} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/project/:id" element={<ProjectDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route
              path="/checkout"
              element={
                <RequireAuth>
                  <Checkout />
                </RequireAuth>
              }
            />
            <Route
              path="/orders"
              element={
                <RequireAuth>
                  <Orders />
                </RequireAuth>
              }
            />
            <Route path="/dashboard" element={<Navigate to="/orders" replace />} />
            <Route
              path="/admin"
              element={
                <RequireAuth>
                  <Admin />
                </RequireAuth>
              }
            />
            <Route path="/admin/dashboard" element={<AdminAnalytics />} />
            <Route path="/success" element={<Success />} />
            <Route path="/cancel" element={<Cancel />} />
          </Routes>
          <SupportChatbot />
          <CartDrawer />
          <AdBanner />
          <Footer />
        </div>
      </Router>
    </CartProvider>
    </AuthProvider>
  );
}

export default App;
