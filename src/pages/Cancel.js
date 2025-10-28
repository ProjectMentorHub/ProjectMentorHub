import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';

const Cancel = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
      <SEO
        title="Payment Cancelled"
        description="Your payment was not completed. Return to checkout to finalize your ProjectMentorHub order."
        canonical="https://projectmentorhub.com/cancel"
        noIndex
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full bg-white p-8 border border-black/10 text-center"
      >
        <div className="mb-6">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
        </div>

        <h1 className="text-3xl font-serif font-bold mb-4">Payment Cancelled</h1>
        <p className="text-gray-600 mb-6">
          Your payment was not completed. No charges were made to your account.
        </p>

        <div className="space-y-3">
          <button
            onClick={() => navigate('/checkout')}
            className="w-full btn-primary"
          >
            Return to Checkout
          </button>
          <button
            onClick={() => navigate('/catalog')}
            className="w-full btn-secondary"
          >
            Continue Shopping
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Cancel;
