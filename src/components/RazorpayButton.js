import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { db } from '../config/firebase';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';

const RAZORPAY_SCRIPT_URL = 'https://checkout.razorpay.com/v1/checkout.js';

const loadRazorpaySdk = () =>
  new Promise((resolve, reject) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }

    const existing = document.querySelector(`script[src="${RAZORPAY_SCRIPT_URL}"]`);
    if (existing) {
      existing.addEventListener('load', () => resolve(true), { once: true });
      existing.addEventListener('error', () => reject(new Error('Failed to load Razorpay SDK')), { once: true });
      return;
    }

    const script = document.createElement('script');
    script.src = RAZORPAY_SCRIPT_URL;
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => reject(new Error('Failed to load Razorpay SDK'));
    document.body.appendChild(script);
  });

const saveOrderLocally = (order) => {
  try {
    const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    existingOrders.unshift(order);
    localStorage.setItem('orders', JSON.stringify(existingOrders));
  } catch (error) {
    console.error('Failed to persist order locally', error);
  }
};

const prepareOrderPayload = ({ cart, amount, shippingInfo, user, paymentResponse }) => {
  const safeShipping = shippingInfo || {};

  return {
    userId: user?.uid || null,
    status: 'completed',
    total: amount,
    items: cart,
    customer: {
      name: safeShipping.fullName || user?.displayName || '',
      email: safeShipping.email || user?.email || '',
      phone: safeShipping.phone || ''
    },
    shipping: {
      address: safeShipping.address || '',
      city: safeShipping.city || '',
      state: safeShipping.state || '',
      zipCode: safeShipping.zipCode || ''
    },
    razorpay: {
      paymentId: paymentResponse.razorpay_payment_id,
      orderId: paymentResponse.razorpay_order_id || null,
      signature: paymentResponse.razorpay_signature || null
    },
    createdAt: serverTimestamp()
  };
};

const prepareOrderSnapshot = ({ cart, amount, shippingInfo, user, paymentResponse }) => {
  const payload = prepareOrderPayload({ cart, amount, shippingInfo, user, paymentResponse });
  return {
    ...payload,
    createdAt: new Date().toISOString()
  };
};

export default function RazorpayButton({ amount, shippingInfo }) {
  const { cart, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);

  const key = process.env.REACT_APP_RAZORPAY_KEY;

  const handleSuccess = useCallback(
    async (paymentResponse) => {
      const orderData = prepareOrderPayload({ cart, amount, shippingInfo, user, paymentResponse });
      const orderSnapshot = prepareOrderSnapshot({ cart, amount, shippingInfo, user, paymentResponse });

      try {
        if (db) {
          await addDoc(collection(db, 'orders'), orderData);
        } else {
          saveOrderLocally(orderSnapshot);
        }
      } catch (error) {
        console.error('Failed to persist order in Firestore', error);
        saveOrderLocally(orderSnapshot);
      } finally {
        clearCart();
        setIsProcessing(false);
      }

      toast.success('Payment successful!');
      navigate('/success', {
        replace: true,
        state: {
          paymentId: paymentResponse.razorpay_payment_id,
          total: amount,
          email: shippingInfo.email
        }
      });
    },
    [amount, cart, clearCart, navigate, shippingInfo, user]
  );

  const handlePay = async () => {
    if (isProcessing) return;

    if (!cart.length) {
      toast.error('Your cart is empty.');
      return;
    }

    if (!amount || amount <= 0) {
      toast.error('Invalid order amount.');
      return;
    }

    if (!key) {
      toast.error('Razorpay key missing. Add REACT_APP_RAZORPAY_KEY to your .env file.');
      return;
    }

    setIsProcessing(true);

    try {
      await loadRazorpaySdk();
    } catch (error) {
      console.error(error);
      toast.error('Unable to load Razorpay checkout. Check your connection.');
      setIsProcessing(false);
      return;
    }

    const razorpay = new window.Razorpay({
      key,
      amount: Math.round(amount * 100),
      currency: 'INR',
      name: 'ProjectMentorHub',
      description: 'Project purchase',
      prefill: {
        name: shippingInfo.fullName,
        email: shippingInfo.email || user?.email,
        contact: shippingInfo.phone
      },
      notes: {
        address: `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state} ${shippingInfo.zipCode}`,
        userId: user?.uid || ''
      },
      theme: {
        color: '#000000'
      },
      handler: handleSuccess,
      modal: {
        ondismiss: () => {
          toast('Payment popup closed.');
          setIsProcessing(false);
        }
      }
    });

    razorpay.on('payment.failed', (response) => {
      console.error('Razorpay payment failed', response);
      toast.error(response.error?.description || 'Payment failed. Please try again.');
      setIsProcessing(false);
    });

    razorpay.open();
  };

  return (
    <button
      type="button"
      onClick={handlePay}
      disabled={isProcessing}
      className={`w-full btn-primary ${isProcessing ? 'opacity-70 cursor-not-allowed' : ''}`}
    >
      {isProcessing ? 'Processing payment…' : `Pay ₹${amount.toLocaleString()}`}
    </button>
  );
}
