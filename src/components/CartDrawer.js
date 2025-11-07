import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const CartDrawer = () => {
  const { cart, isOpen, setIsOpen, removeFromCart, updateQuantity, getTotalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const subtotal = getTotalPrice();
  const total = subtotal;

  const handleCheckout = () => {
    if (!user) {
      toast.error('Please log in to proceed to checkout.');
      setIsOpen(false);
      navigate('/login', { state: { from: { pathname: '/checkout' } } });
      return;
    }

    setIsOpen(false);
    navigate('/checkout');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/50 z-50"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col"
          >
            <div className="p-6 border-b border-black/10">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-serif font-bold">Cart</h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-gray-100 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <p className="text-gray-500 mb-4">Your cart is empty</p>
                  <Link
                    to="/projects"
                    onClick={() => setIsOpen(false)}
                    className="btn-primary"
                  >
                    Browse Projects
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div key={item.id} className="flex gap-4 pb-4 border-b border-gray-100">
                      <div className="w-24 h-24 bg-gray-200 flex-shrink-0">
                        {item.image ? (
                          <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full bg-gray-200" />
                        )}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium mb-1">{item.title}</h3>
                        <p className="text-sm text-gray-600 mb-2">₹{item.price.toLocaleString()}</p>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1 border border-black/20 hover:bg-gray-100"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                            </svg>
                          </button>
                          <span className="px-3 py-1 border border-black/20">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 border border-black/20 hover:bg-gray-100"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                          </button>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="ml-auto text-sm text-gray-600 hover:text-black"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div className="border-t border-black/10 p-6 space-y-4">
                <div className="space-y-2">
              <div className="flex justify-between font-bold text-lg pt-2 border-t border-black/10">
                <span>Total</span>
                <span>₹{total.toLocaleString()}</span>
              </div>
                </div>
                <button onClick={handleCheckout} className="w-full btn-primary">
                  Checkout
                </button>
                <button onClick={clearCart} className="w-full text-sm text-gray-600 hover:text-black transition-colors">
                  Clear Cart
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
