import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import SEO from '../components/SEO';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, clearCart, getTotalPrice } = useCart();
  const navigate = useNavigate();
  const total = getTotalPrice();
  const hasItems = cart.length > 0;

  const handleCheckout = () => {
    if (!hasItems) return;
    navigate('/checkout');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <SEO
        title="Cart"
        description="Review the projects in your ProjectMentorHub cart before proceeding to checkout."
        canonical="https://projectmentorhub.com/cart"
        noIndex
      />
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-serif font-bold mb-2">Your Cart</h1>
          <p className="text-gray-600">Manage your selected projects before completing the order.</p>
        </motion.div>

        {hasItems ? (
          <div className="grid lg:grid-cols-[2fr,1fr] gap-8">
            <div className="bg-white border border-black/10">
              <div className="divide-y">
                {cart.map((item) => (
                  <div key={item.id} className="p-6 flex gap-5">
                    <div className="w-24 h-24 bg-gray-100 flex-shrink-0 overflow-hidden">
                      {item.image ? (
                        <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full bg-gray-200" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                        <div>
                          <h3 className="font-semibold text-lg leading-tight">{item.title}</h3>
                          <p className="text-sm text-gray-600 mt-1">
                            ₹{item.price.toLocaleString()} each
                          </p>
                        </div>
                        <div className="flex items-center gap-2 sm:ml-4">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-2 border border-black/20 hover:bg-gray-100 transition"
                            aria-label="Decrease quantity"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                            </svg>
                          </button>
                          <span className="px-4 py-2 border border-black/20 text-sm">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-2 border border-black/20 hover:bg-gray-100 transition"
                            aria-label="Increase quantity"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                          </button>
                        </div>
                      </div>

                      <div className="mt-4 flex items-center justify-between text-sm">
                        <span className="font-medium">
                          Subtotal: ₹{(item.price * item.quantity).toLocaleString()}
                        </span>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-gray-600 hover:text-black transition"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-6 border-t border-black/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <button
                  onClick={clearCart}
                  className="text-sm text-gray-600 hover:text-black transition"
                >
                  Clear Cart
                </button>
                <Link to="/catalog" className="text-sm text-gray-900 hover:underline">
                  Continue browsing projects
                </Link>
              </div>
            </div>

            <div className="bg-white border border-black/10 p-6 h-fit sticky top-32">
              <h2 className="text-2xl font-semibold mb-6">Order Summary</h2>
              <div className="space-y-3">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Subtotal</span>
                  <span>₹{total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-lg font-bold pt-4 border-t border-black/10">
                  <span>Total</span>
                  <span>₹{total.toLocaleString()}</span>
                </div>
              </div>
              <button
                onClick={handleCheckout}
                className="w-full mt-6 btn-primary"
              >
                Proceed to Checkout
              </button>
              <p className="text-xs text-gray-500 mt-4 text-center">
                You can still review your order details on the checkout page.
              </p>
            </div>
          </div>
        ) : (
          <div className="bg-white border border-black/10 p-12 text-center">
            <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-6">
              Browse our catalog to discover curated academic projects crafted by experts.
            </p>
            <Link to="/catalog" className="btn-primary inline-flex items-center gap-2">
              Explore Catalog
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
