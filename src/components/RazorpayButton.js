// src/components/RazorpayButton.js
import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { db } from '../config/firebase';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';

const RAZORPAY_SCRIPT_URL = 'https://checkout.razorpay.com/v1/checkout.js';

/* --------------------------- Runtime env helpers --------------------------- */
const getRazorpayKey = () =>
  (typeof window !== 'undefined' &&
    window._env_ &&
    (window._env_.RACT_APP_RAZORPAY_KEY || window._env_.REACT_APP_RAZORPAY_KEY)) ||
  (typeof window !== 'undefined' &&
    window.__ENV__ &&
    (window.__ENV__.RAZORPAY_KEY || window.__ENV__.REACT_APP_RAZORPAY_KEY)) ||
  process.env.REACT_APP_RAZORPAY_KEY ||
  '';

/* --------------------------- SDK load (idempotent) ------------------------- */
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

/* --------------------------- Local order helpers --------------------------- */
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

const prepareOrderSnapshot = ({ cart, amount, shippingInfo, user, paymentResponse, syntheticId }) => {
  const payload = prepareOrderPayload({ cart, amount, shippingInfo, user, paymentResponse });
  return {
    ...payload,
    id: syntheticId,       // synthetic id for UI/lookup even if Firestore fails
    localId: syntheticId,  // extra fallback
    createdAt: new Date().toISOString()
  };
};

/* ---------------------------- API convenience ----------------------------- */
/** Try to create a secure backend order. Must return { keyId, orderId, amount, currency }. */
const createServerOrder = async (body) => {
  const res = await fetch('/api/create-order', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body || {})
  });
  if (!res.ok) throw new Error('create-order failed');
  return res.json();
};

/** Try to verify payment signature on server. Must return { verified: boolean }. */
const verifyServerPayment = async (payload) => {
  const res = await fetch('/api/verify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload || {})
  });
  if (!res.ok) throw new Error('verify failed');
  return res.json();
};

/* -------------------------------- Component -------------------------------- */
export default function RazorpayButton({ amount, shippingInfo = {} }) {
  const { cart, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSuccess = useCallback(
    async (paymentResponse) => {
      // Always generate a stable id for UI even if Firestore fails.
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

    // Load SDK first
    setIsProcessing(true);
    try {
      await loadRazorpaySdk();
    } catch (error) {
      console.error(error);
      toast.error('Unable to load Razorpay checkout. Check your connection.');
      setIsProcessing(false);
      return;
    }

    // Prefer secure server-created order (recommended).
    // If the endpoint doesn’t exist, fall back to client-only flow using just the key & amount.
    let keyId = '';
    let orderId = '';
    let amtPaise = Math.round(Number(amount) * 100);
    let currency = 'INR';
    let usingServerOrder = false;

    try {
      const serverOrder = await createServerOrder({
        userId: user?.uid || null,
        cart, // if your server uses it to compute amount
      });
      keyId = serverOrder?.keyId || '';
      orderId = serverOrder?.orderId || '';
      amtPaise = typeof serverOrder?.amount === 'number' ? serverOrder.amount : amtPaise;
      currency = serverOrder?.currency || currency;
      usingServerOrder = Boolean(orderId && keyId);
    } catch {
      // No server order available; use runtime/build-time key for client-only fallback
      keyId = getRazorpayKey();
    }

    if (!keyId) {
      toast.error(
        'Razorpay key missing. Checked /api/create-order, window._env_.REACT_APP_RAZORPAY_KEY, and REACT_APP_RAZORPAY_KEY.'
      );
      setIsProcessing(false);
      return;
    }

    const s = shippingInfo || {};
    const options = {
      key: keyId,
      amount: amtPaise,
      currency,
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
      handler: async (paymentResponse) => {
        try {
          if (usingServerOrder) {
            // Verify on server when we used a server-created order
            const verifyRes = await verifyServerPayment(paymentResponse);
            if (!verifyRes?.verified) {
              toast.error('Payment verification failed. Please contact support.');
              setIsProcessing(false);
              return;
            }
          }
          await handleSuccess(paymentResponse);
        } catch (err) {
          console.error('Verify/Success error', err);
          toast.error('Something went wrong after payment. We are checking your transaction.');
          setIsProcessing(false);
        }
      },
      modal: {
        ondismiss: () => {
          toast('Payment popup closed.');
          setIsProcessing(false);
        }
      }
    };

    if (usingServerOrder && orderId) {
      options.order_id = orderId;
    }

    const razorpay = new window.Razorpay(options);

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
