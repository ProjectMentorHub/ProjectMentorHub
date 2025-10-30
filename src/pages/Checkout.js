// src/pages/Checkout.js
import { useEffect, useMemo, useState } from 'react';
import RazorpayButton from '../components/RazorpayButton';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import SEO from '../components/SEO';

const Checkout = () => {
  const { cart, getTotalPrice } = useCart();
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    college: '',
    city: '',
    state: '',
    zipCode: ''
  });

  const total = getTotalPrice();

  const isFormValid = useMemo(() => {
    const f = formData;
    return (
      f.fullName.trim() &&
      f.email.trim() &&
      f.phone.trim() &&
      f.college.trim() &&
      f.city.trim() &&
      f.state.trim() &&
      f.zipCode.trim()
    );
  }, [formData]);

  const handleChange = (e) => {
    setFormData(p => ({ ...p, [e.target.name]: e.target.value }));
  };

  useEffect(() => {
    if (user?.email) {
      setFormData((prev) => (prev.email ? prev : { ...prev, email: user.email }));
    }
  }, [user]);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <SEO
        title="Checkout"
        description="Securely complete your ProjectMentorHub order and access premium academic project kits instantly."
        canonical="https://projectmentorhub.com/checkout"
        noIndex
      />
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-serif font-bold mb-2">Checkout</h1>
          <p className="text-gray-600">Complete your order</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Shipping details (NO <form> tag here) */}
          <div className="bg-white p-8 border border-black/10">
            <h2 className="text-2xl font-semibold mb-6">Shipping Information</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-black/20 focus:outline-none focus:border-black transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-black/20 focus:outline-none focus:border-black transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-black/20 focus:outline-none focus:border-black transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">College Name</label>
                <input
                  type="text"
                  name="college"
                  value={formData.college}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-black/20 focus:outline-none focus:border-black transition-colors"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">City</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-black/20 focus:outline-none focus:border-black transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">State</label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-black/20 focus:outline-none focus:border-black transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">ZIP Code</label>
                <input
                  type="text"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-black/20 focus:outline-none focus:border-black transition-colors"
                />
              </div>

              {/* Razorpay Payment Button (has its OWN <form>) */}
              <div className="pt-2">
                {cart.length === 0 ? (
                  <button type="button" disabled className="w-full btn-primary opacity-50 cursor-not-allowed">
                    Cart is empty
                  </button>
                ) : !isFormValid ? (
                  <button type="button" disabled className="w-full btn-primary opacity-50 cursor-not-allowed">
                    Fill shipping details to continue
                  </button>
                ) : (
                  <RazorpayButton amount={total} shippingInfo={formData} />
                )}
              </div>

              <p className="text-xs text-gray-500">
                Payments are processed securely by Razorpay. You’ll be redirected after payment.
              </p>
            </div>
          </div>

          {/* Order Summary */}
          <div className="bg-white p-8 border border-black/10 h-fit">
            <h2 className="text-2xl font-semibold mb-6">Order Summary</h2>

            <div className="space-y-4 mb-6">
              {cart.map((item) => (
                <div key={item.id} className="flex gap-4 pb-4 border-b border-gray-100">
                  <div className="w-16 h-16 bg-gray-200 flex-shrink-0">
                    {item.image ? (
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-gray-200" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">{item.title}</h3>
                    <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                    <p className="text-sm font-medium">₹{(item.price * item.quantity).toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-lg font-bold pt-4 border-t border-black/10">
                <span>Total</span>
                <span>₹{total.toLocaleString()}</span>
              </div>
            </div>

            <p className="text-xs text-gray-500 mt-4">
              Need GST invoice? Reply to the payment confirmation email with your GST details.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
