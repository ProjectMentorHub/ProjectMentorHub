import { useEffect } from 'react';
import { useNavigate, useSearchParams, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';

const Success = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const navigationState = location.state || {};
  const orderId = searchParams.get('orderId') || navigationState.paymentId || null;
  const paymentTotal = navigationState.total || null;
  const customerEmail = navigationState.email || null;

  useEffect(() => {
    // Clear cart or perform any cleanup
    const timer = setTimeout(() => {
      // Optionally redirect after showing success
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
      <SEO
        title="Order Successful"
        description="Your ProjectMentorHub order has been confirmed. We will deliver your project within 24 hours via email."
        canonical="https://projectmentorhub.com/success"
        noIndex
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full bg-white p-8 border border-black/10 text-center"
      >
        <div className="mb-6">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>

        <h1 className="text-3xl font-serif font-bold mb-4">Order Successful!</h1>
        <p className="text-gray-600 mb-6">
          Thank you for your purchase. We are preparing your project and will send it to your email within 24 hours.
          {orderId && (
            <span className="block mt-2 text-sm">
              Order ID: {orderId}
            </span>
          )}
          {paymentTotal ? (
            <span className="block mt-1 text-sm">
              Amount Paid: ₹{Number(paymentTotal).toLocaleString()}
            </span>
          ) : null}
          {customerEmail ? (
            <span className="block mt-1 text-sm text-gray-500">
              Delivery email: {customerEmail}
            </span>
          ) : null}
        </p>

        <div className="space-y-3">
          <button
            onClick={() => navigate('/orders')}
            className="w-full btn-primary"
          >
            View My Orders
          </button>
          <button
            onClick={() => navigate('/projects')}
            className="w-full btn-secondary"
          >
            Continue Shopping
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Success;
