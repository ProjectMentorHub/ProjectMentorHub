import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { useAuth } from '../context/AuthContext';
import { db } from '../config/firebase';
import toast from 'react-hot-toast';
import SEO from '../components/SEO';

const toJsDate = (v) => {
  if (!v) return new Date();
  if (typeof v.toDate === 'function') return v.toDate(); // Firestore Timestamp
  if (typeof v === 'number') return new Date(v);         // RTDB server timestamp
  return new Date(v);                                    // ISO string or Date
};

const getOrderDisplayId = (order) => {
  const raw =
    order?.id ||
    order?.razorpay?.orderId ||
    order?.razorpay?.paymentId ||
    order?.localId ||
    '';
  return raw ? String(raw).slice(0, 8) : '—';
};

const asArray = (v) => (Array.isArray(v) ? v : []);

const getOrderKey = (order) =>
  order?.id ||
  order?.localId ||
  order?.razorpay?.paymentId ||
  order?.razorpay?.orderId ||
  null;

const mergeOrders = (primary = [], secondary = []) => {
  const seen = new Set();
  const merged = [];

  const pushOrder = (order) => {
    if (!order) return;
    const key =
      getOrderKey(order) ||
      `${Number(order?.total || 0)}-${toJsDate(order?.createdAt).getTime()}-${asArray(order?.items).length}`;
    if (seen.has(key)) return;
    seen.add(key);
    merged.push({
      ...order,
      createdAt: toJsDate(order?.createdAt),
    });
  };

  primary.forEach(pushOrder);
  secondary.forEach(pushOrder);

  merged.sort((a, b) => toJsDate(b?.createdAt) - toJsDate(a?.createdAt));
  return merged;
};

const Dashboard = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    let isMounted = true;
    const safeSetOrders = (data) => isMounted && setOrders(data);
    const safeSetLoading = (value) => isMounted && setLoading(value);

    const readLocalOrders = () => {
      try {
        const raw = JSON.parse(localStorage.getItem('orders') || '[]');
        return asArray(raw).map((o) => ({
          ...o,
          createdAt: toJsDate(o.createdAt),
        }));
      } catch (storageError) {
        console.warn('Failed to read orders from localStorage', storageError);
        return [];
      }
    };

    const fetchOrders = async () => {
      const localOrders = readLocalOrders();

      if (!user) {
        safeSetOrders(localOrders);
        safeSetLoading(false);
        return;
      }

      try {
        if (db) {
          const ordersQuery = query(
            collection(db, 'orders'),
            where('userId', '==', user.uid)
          );
          const querySnapshot = await getDocs(ordersQuery);
          const ordersData = querySnapshot.docs.map((doc) => {
            const data = doc.data() || {};
            return {
              id: doc.id,
              ...data,
              createdAt: toJsDate(data.createdAt),
            };
          });
          const combined = mergeOrders(ordersData, localOrders);
          safeSetOrders(combined);
        } else {
          safeSetOrders(localOrders);
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
        toast.error('Failed to load orders');
        safeSetOrders(localOrders);
      } finally {
        safeSetLoading(false);
      }
    };

    safeSetLoading(true);
    fetchOrders();
    return () => {
      isMounted = false;
    };
  }, [user]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <SEO
        title="My Orders"
        description="Review your ProjectMentorHub orders and transaction details. We will deliver your project via email within 24 hours of purchase."
        canonical="https://projectmentorhub.com/dashboard"
        noIndex
      />
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-serif font-bold mb-2">My Orders</h1>
          <p className="text-gray-600">We will send your purchased projects to your email within 24 hours.</p>
        </motion.div>

        {orders.length === 0 ? (
          <div className="bg-white p-12 border border-black/10 text-center">
            <p className="text-gray-600 text-lg mb-4">No orders found</p>
            <a href="/catalog" className="btn-primary inline-block">
              Browse Projects
            </a>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => {
              const created = toJsDate(order?.createdAt);
              const total = Number(order?.total || 0);

              return (
                <motion.div
                  key={order?.id || order?.localId || getOrderDisplayId(order)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white border border-black/10 p-6"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <p className="font-semibold text-lg">
                        Order #{getOrderDisplayId(order)}
                      </p>
                      <p className="text-sm text-gray-600">
                        {created.toLocaleDateString()} at {created.toLocaleTimeString()}
                      </p>
                      {order?.customer?.email && (
                        <p className="text-sm text-gray-500">
                          Customer: {order.customer.email}
                        </p>
                      )}
                    </div>
                    <div className="flex items-center gap-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order?.status)}`}
                      >
                        {order?.status || '—'}
                      </span>
                      <span className="text-lg font-bold">₹{total.toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    {asArray(order?.items).map((item) => {
                      const qty = Number(item?.quantity || 1);
                      const price = Number(item?.price || 0);
                      return (
                        <div
                          key={item?.id || item?.title || `${price}-${qty}`}
                          className="flex items-center justify-between text-sm"
                        >
                          <span>{item?.title || 'Item'} × {qty}</span>
                          <span>₹{(price * qty).toLocaleString()}</span>
                        </div>
                      );
                    })}
                  </div>

                  <div className="pt-4 border-t border-gray-100">
                    <p className="text-sm text-gray-600">
                      We will send your project files within 24 hours of purchase. If you need urgent access, please contact support.
                    </p>
                    <div className="mt-3 space-y-1 text-sm text-gray-500">
                      {order?.razorpay?.paymentId && (
                        <p>
                          <span className="font-medium text-gray-700">Payment ID:</span> {order.razorpay.paymentId}
                        </p>
                      )}
                      {order?.razorpay?.orderId && (
                        <p>
                          <span className="font-medium text-gray-700">Order Reference:</span> {order.razorpay.orderId}
                        </p>
                      )}
                      {order?.razorpay?.signature && (
                        <p>
                          <span className="font-medium text-gray-700">Signature:</span> {order.razorpay.signature}
                        </p>
                      )}
                      {!order?.razorpay?.paymentId && !order?.razorpay?.orderId && !order?.razorpay?.signature && (
                        <p>No additional transaction details available.</p>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
