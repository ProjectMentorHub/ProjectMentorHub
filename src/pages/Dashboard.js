import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { useAuth } from '../context/AuthContext';
import { db } from '../config/firebase';
import toast from 'react-hot-toast';
import SEO from '../components/SEO';

const Dashboard = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        if (db && user) {
          // Fetch from Firebase
          const ordersQuery = query(
            collection(db, 'orders'),
            where('userId', '==', user.uid),
            orderBy('createdAt', 'desc')
          );
          const querySnapshot = await getDocs(ordersQuery);
          const ordersData = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
            createdAt: doc.data().createdAt?.toDate() || new Date()
          }));
          setOrders(ordersData);
        } else {
          // Fallback to localStorage
          const savedOrders = JSON.parse(localStorage.getItem('orders') || '[]');
          setOrders(savedOrders);
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
        toast.error('Failed to load orders');
        // Fallback to localStorage
        const savedOrders = JSON.parse(localStorage.getItem('orders') || '[]');
        setOrders(savedOrders);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
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
        title="My Dashboard"
        description="Review your ProjectMentorHub orders, download project resources, and manage your purchases in one place."
        canonical="https://projectmentorhub.com/dashboard"
        noIndex
      />
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-serif font-bold mb-2">My Dashboard</h1>
          <p className="text-gray-600">View your orders and downloads</p>
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
            {orders.map((order) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white border border-black/10 p-6"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="font-semibold text-lg">Order #{order.id.slice(0, 8)}</p>
                    <p className="text-sm text-gray-600">
                      {order.createdAt?.toLocaleDateString?.() || new Date(order.createdAt).toLocaleDateString()} at {order.createdAt?.toLocaleTimeString?.() || new Date(order.createdAt).toLocaleTimeString()}
                    </p>
                    {order.customer?.email && (
                      <p className="text-sm text-gray-500">Customer: {order.customer.email}</p>
                    )}
                  </div>
                  <div className="flex items-center gap-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                    <span className="text-lg font-bold">₹{order.total.toLocaleString()}</span>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex items-center justify-between text-sm">
                      <span>{item.title} × {item.quantity}</span>
                      <span>₹{(item.price * item.quantity).toLocaleString()}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t border-gray-100">
                  <button
                    onClick={() => alert('Download functionality - files would be accessible here')}
                    className="btn-secondary text-sm"
                  >
                    Download Files
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
