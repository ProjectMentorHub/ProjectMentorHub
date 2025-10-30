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

const getLocalOrderKey = (order) =>
  order?.id ||
  order?.localId ||
  order?.razorpay?.paymentId ||
  order?.razorpay?.orderId ||
  null;

const saveOrderLocally = (order) => {
  try {
    const parsed = JSON.parse(localStorage.getItem('orders') || '[]');
    const existingOrders = Array.isArray(parsed) ? parsed : [];
    const key = getLocalOrderKey(order);
    const withoutDuplicate = key
      ? existingOrders.filter((existing) => getLocalOrderKey(existing) !== key)
      : existingOrders;
    withoutDuplicate.unshift(order);
    localStorage.setItem('orders', JSON.stringify(withoutDuplicate.slice(0, 50)));
  } catch (error) {
    console.error('Failed to persist order locally', error);
  }
};

const prepareOrderPayload = ({ cart, amount, shippingInfo, user, paymentResponse }) => {
  const s = shippingInfo || {};
  return {
    userId: user?.uid || null,
    status: 'completed',
    total: Number(amount) || 0,
    items: Array.isArray(cart) ? cart : [],
    customer: {
      name: s.fullName || user?.displayName || '',
      email: s.email || user?.email || '',
      phone: s.phone || ''
    },
    shipping: {
      college: s.college || '',
      city: s.city || '',
      state: s.state || '',
      zipCode: s.zipCode || ''
    },
    razorpay: {
      paymentId: paymentResponse?.razorpay_payment_id || null,
      orderId: paymentResponse?.razorpay_order_id || null,
      signature: paymentResponse?.razorpay_signature || null
    },
    createdAt: serverTimestamp()
  };
};

// This is the snapshot we save to localStorage when Firestore isn't available/allowed.
// We embed a synthetic id so the UI can always display an order id safely.
const prepareOrderSnapshot = ({ cart, amount, shippingInfo, user, paymentResponse, syntheticId }) => {
  const payload = prepareOrderPayload({ cart, amount, shippingInfo, user, paymentResponse });
  return {
    ...payload,
    id: syntheticId,       // <- crucial for Dashboard safety
    localId: syntheticId,  // <- extra fallback
    createdAt: new Date().toISOString()
  };
};

export default function RazorpayButton({ amount, shippingInfo = {} }) {
  const { cart, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);

  const key = process.env.REACT_APP_RAZORPAY_KEY;

  const handleSuccess = useCallback(
    async (paymentResponse) => {
      // Always generate a stable id we can show in the dashboard even if Firestore fails.
      const syntheticId =
        paymentResponse?.razorpay_payment_id ||
        `local-${Date.now()}`;

      const orderData = prepareOrderPayload({ cart, amount, shippingInfo, user, paymentResponse });
      const orderSnapshot = prepareOrderSnapshot({
        cart,
        amount,
        shippingInfo,
        user,
        paymentResponse,
        syntheticId
      });

      try {
        if (db) {
          // Firestore document id will exist for Dashboard fetch via Firestore;
          // but if rules deny this, we'll still save the local snapshot with syntheticId.
          const docRef = await addDoc(collection(db, 'orders'), orderData);
          saveOrderLocally({
            ...orderSnapshot,
            id: docRef?.id || orderSnapshot.id,
            localId: orderSnapshot.localId || syntheticId
          });
        } else {
          saveOrderLocally(orderSnapshot);
        }
      } catch (error) {
        console.error('Failed to persist order in Firestore', error);
        // Fallback to local to keep the UX consistent
        saveOrderLocally(orderSnapshot);
      } finally {
        clearCart();
        setIsProcessing(false);
      }

      const paymentId = paymentResponse?.razorpay_payment_id || syntheticId;

      toast.success('Payment successful!');
      navigate(`/success?orderId=${encodeURIComponent(paymentId)}`, {
        replace: true,
        state: {
          paymentId,
          total: amount,
          email: shippingInfo?.email || user?.email || ''
        }
      });
    },
    [amount, cart, clearCart, navigate, shippingInfo, user]
  );

  const handlePay = async () => {
    if (isProcessing) return;

    if (!cart?.length) {
      toast.error('Your cart is empty.');
      return;
    }

    if (!amount || Number(amount) <= 0) {
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

    const s = shippingInfo || {};
    const razorpay = new window.Razorpay({
      key,
      amount: Math.round(Number(amount) * 100),
      currency: 'INR',
      name: 'ProjectMentorHub',
      description: 'Project purchase',
      prefill: {
        name: s.fullName || user?.displayName || '',
        email: s.email || user?.email || '',
        contact: s.phone || ''
      },
      notes: {
        college: s.college || '',
        city: s.city || '',
        state: s.state || '',
        zipCode: s.zipCode || '',
        userId: user?.uid || ''
      },
      theme: { color: '#000000' },
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
      toast.error(response?.error?.description || 'Payment failed. Please try again.');
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
      {isProcessing ? 'Processing payment…' : `Pay ₹${Number(amount).toLocaleString()}`}
    </button>
  );
}
