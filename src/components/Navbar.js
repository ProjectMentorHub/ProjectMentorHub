import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const { setIsOpen, getCartItemCount } = useCart();
  const { user, logOut } = useAuth();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const firstName = user?.displayName?.split(' ')[0] || user?.email?.split('@')[0] || '';
  const userInitial = firstName?.charAt(0)?.toUpperCase() || user?.email?.charAt(0)?.toUpperCase() || 'U';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/catalog', label: 'Catalog' },
    { to: '/about', label: 'About' },
    { to: '/journals', label: 'Journal Services' },
    { to: '/dashboard', label: 'Dashboard' }
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`sticky top-0 z-50 bg-white backdrop-blur-md transition-all duration-300 ${
        isScrolled ? 'border-b border-black/20 shadow-sm' : 'border-b border-black/10'
      }`}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">P</span>
              </div>
            </motion.div>
            <span className="text-2xl font-serif font-bold group-hover:text-gray-600 transition-colors">
              ProjectMentorHub
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link, idx) => (
              <Link
                key={link.to}
                to={link.to}
                className="relative px-4 py-2 rounded-lg transition-colors group"
              >
                <motion.span
                  initial={false}
                  animate={{
                    color: isActive(link.to) ? '#000' : '#666',
                    fontWeight: isActive(link.to) ? '600' : '400'
                  }}
                  className="relative z-10"
                >
                  {link.label}
                </motion.span>
                {isActive(link.to) && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-gray-100 rounded-lg"
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Cart Button & Auth */}
          <div className="flex items-center space-x-4">
            {user && (
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center text-sm font-semibold">
                  {userInitial}
                </div>
                <span className="mt-1 text-xs font-medium text-gray-700">{firstName}</span>
              </div>
            )}
            {user && (
              <button
                onClick={logOut}
                className="hidden md:block text-sm text-gray-600 hover:text-black transition-colors"
              >
                Sign Out
              </button>
            )}
            {!user && (
              <button
                onClick={() => navigate('/login')}
                className="hidden md:block text-sm text-gray-600 hover:text-black transition-colors"
              >
                Login
              </button>
            )}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsOpen(true)}
              className="relative p-3 hover:bg-gray-100 rounded-full transition-colors group"
              aria-label="Shopping cart"
            >
              <svg className="w-6 h-6 group-hover:text-black transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {getCartItemCount() > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 bg-black text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-semibold"
                >
                  {getCartItemCount()}
                </motion.span>
              )}
            </motion.button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Menu"
            >
              <motion.div
                animate={isMobileMenuOpen ? { rotate: 180 } : { rotate: 0 }}
                transition={{ duration: 0.3 }}
              >
                {isMobileMenuOpen ? (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </motion.div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden border-t border-black/10 bg-white overflow-hidden"
          >
            <div className="container mx-auto px-4 py-4 space-y-2">
              {navLinks.map((link, idx) => (
                <motion.div
                  key={link.to}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <Link
                    to={link.to}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`block px-4 py-3 rounded-lg transition-colors ${
                      isActive(link.to) 
                        ? 'bg-black text-white font-semibold' 
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              
              {/* Auth Button in Mobile Menu */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navLinks.length * 0.1 }}
                className="pt-2 border-t border-gray-200"
              >
                {user && (
                  <div className="flex flex-col items-center mb-4">
                    <div className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center text-base font-semibold">
                      {userInitial}
                    </div>
                    <span className="mt-2 text-sm font-medium text-gray-700">{firstName}</span>
                  </div>
                )}
                {user ? (
                  <button
                    onClick={() => {
                      logOut();
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-100 transition-colors text-gray-700 font-medium"
                  >
                    Sign Out
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      navigate('/login');
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-100 transition-colors text-gray-700 font-medium"
                  >
                    Login
                  </button>
                )}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
