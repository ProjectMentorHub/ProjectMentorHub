import { useEffect, useMemo, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';
import AdminAccessGate from '../components/AdminAccessGate';
import useAdminAccess from '../hooks/useAdminAccess';

const ADMIN_ORDERS_KEY = 'pmh:admin:orders:v1';
const TRAFFIC_METRICS_KEY = 'pmh:admin:traffic:v1';

const defaultTrafficMetrics = {
  visitors24h: 0,
  visitors30d: 0,
  conversions24h: 0,
  conversionRate30d: 0,
  bounceRate30d: 0,
  topTrafficSource: '',
  notes: ''
};

const trafficFields = [
  { key: 'visitors24h', label: 'Visitors (24h)', type: 'number', helper: 'Unique visitors in the last 24 hours.' },
  { key: 'visitors30d', label: 'Visitors (30d)', type: 'number', helper: 'Unique visitors over the last 30 days.' },
  { key: 'conversions24h', label: 'Conversions (24h)', type: 'number', helper: 'Successful purchases in the last 24 hours.' },
  { key: 'conversionRate30d', label: 'Conversion Rate (30d)', type: 'percent', helper: 'Purchases / visitors over the last 30 days.' },
  { key: 'bounceRate30d', label: 'Bounce Rate (30d)', type: 'percent', helper: 'Visitors who leave without browsing further.' },
  { key: 'topTrafficSource', label: 'Top Traffic Source', type: 'text', helper: 'Best performing marketing channel.' },
  { key: 'notes', label: 'Notes', type: 'textarea', helper: 'Observations or next actions.' }
];

const asArray = (value) => (Array.isArray(value) ? value : []);

const safeJsonParse = (value, fallback) => {
  if (!value || typeof value !== 'string') return fallback;
  try {
    const parsed = JSON.parse(value);
    return parsed ?? fallback;
  } catch (error) {
    console.warn('Failed to parse JSON', error);
    return fallback;
  }
};

const safeGetLocalStorage = (key, fallback) => {
  if (typeof window === 'undefined') return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? safeJsonParse(raw, fallback) : fallback;
  } catch (error) {
    console.warn('Unable to read localStorage', error);
    return fallback;
  }
};

const safeSetLocalStorage = (key, value) => {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error('Unable to write to localStorage', error);
  }
};

const toDate = (value) => {
  if (!value) return null;
  if (value instanceof Date) return Number.isNaN(value.getTime()) ? null : value;
  if (typeof value?.toDate === 'function') return value.toDate();
  const numeric = Number(value);
  if (!Number.isNaN(numeric) && `${numeric}`.length >= 10) {
    const timestamp = numeric < 1e12 ? numeric * 1000 : numeric;
    const dateFromNumber = new Date(timestamp);
    return Number.isNaN(dateFromNumber.getTime()) ? null : dateFromNumber;
  }
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
};

const getOrderKey = (order) =>
  order?.id ||
  order?.localId ||
  order?.orderId ||
  order?.reference ||
  order?.razorpay?.paymentId ||
  order?.razorpay?.orderId ||
  null;

const normaliseItem = (item, fallbackId, fallbackTitle) => {
  const quantityRaw = Number(item?.quantity);
  const quantity = Number.isFinite(quantityRaw) && quantityRaw > 0 ? quantityRaw : 1;
  const priceRaw = Number(item?.price ?? item?.amount ?? item?.netAmount);
  const price = Number.isFinite(priceRaw) ? priceRaw : 0;

  return {
    id: item?.id || item?.projectId || fallbackId,
    title: item?.title || item?.name || item?.projectTitle || fallbackTitle || 'Untitled Project',
    category: item?.category || item?.tag || item?.subject || 'Uncategorised',
    quantity,
    price,
    revenue: Number.isFinite(price) ? price * quantity : 0
  };
};

const normaliseOrder = (order, fallbackIndex) => {
  const id = getOrderKey(order) || `order-${fallbackIndex}`;
  const createdAt = toDate(order?.createdAt) || null;
  const rawTotal = Number(order?.total ?? order?.amount ?? order?.grandTotal ?? 0);
  const items = asArray(order?.items).map((item, index) =>
    normaliseItem(item, `${id}-item-${index}`, `Item ${index + 1}`)
  );
  const computedItemsTotal = items.reduce((sum, item) => sum + (Number.isFinite(item.revenue) ? item.revenue : 0), 0);
  const total = Number.isFinite(rawTotal) && rawTotal > 0 ? rawTotal : computedItemsTotal;

  return {
    id,
    status: (order?.status || 'completed').toLowerCase(),
    createdAt,
    total,
    items,
    customer: {
      name: order?.customer?.name || order?.customerName || '',
      email: order?.customer?.email || order?.customerEmail || '',
      phone: order?.customer?.phone || order?.customerPhone || ''
    },
    razorpay: order?.razorpay || null,
    source: order?.source || 'local',
    raw: order
  };
};

const mergeOrders = (sources) => {
  const merged = [];
  const seen = new Set();

  sources.forEach((orders) => {
    asArray(orders).forEach((order, index) => {
      const normalised = normaliseOrder(order, merged.length + index);
      const key = normalised.id;
      if (!key) return;
      if (seen.has(key)) return;
      seen.add(key);
      merged.push(normalised);
    });
  });

  merged.sort((a, b) => {
    const aTime = a.createdAt ? a.createdAt.getTime() : 0;
    const bTime = b.createdAt ? b.createdAt.getTime() : 0;
    return bTime - aTime;
  });

  return merged;
};

const formatCurrency = (value) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(Number.isFinite(value) ? value : 0);

const formatNumber = (value) =>
  new Intl.NumberFormat('en-IN', {
    maximumFractionDigits: 0
  }).format(Number.isFinite(value) ? value : 0);

const formatPercent = (value) =>
  `${Number.isFinite(value) ? value.toFixed(1) : '0.0'}%`;

const formatDateLabel = (date) =>
  date
    ? date.toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })
    : 'Unknown';

const buildSummary = (orders) => {
  const summary = {
    totalRevenue: 0,
    totalOrders: orders.length,
    averageOrderValue: 0,
    uniqueCustomers: 0,
    returningRate: 0,
    highestOrderValue: 0,
    timeline: [],
    topProjects: [],
    statusBreakdown: {},
    categoryBreakdown: new Map()
  };

  if (orders.length === 0) {
    return summary;
  }

  const customerOrderCounts = new Map();
  const returningCustomers = new Set();
  const timelineMap = new Map();
  const projectMap = new Map();
  const categoryMap = new Map();

  orders.forEach((order) => {
    const total = Number.isFinite(order.total) ? order.total : 0;
    summary.totalRevenue += total;
    summary.highestOrderValue = Math.max(summary.highestOrderValue, total);

    const status = order.status || 'completed';
    summary.statusBreakdown[status] = (summary.statusBreakdown[status] || 0) + 1;

    const dateKey = order.createdAt
      ? order.createdAt.toISOString().slice(0, 10)
      : 'unknown';
    const timelineEntry =
      timelineMap.get(dateKey) ||
      {
        dateKey,
        date: order.createdAt,
        revenue: 0,
        orders: 0
      };
    timelineEntry.revenue += total;
    timelineEntry.orders += 1;
    timelineMap.set(dateKey, timelineEntry);

    const email = (order.customer?.email || '').trim().toLowerCase();
    if (email) {
      const count = (customerOrderCounts.get(email) || 0) + 1;
      customerOrderCounts.set(email, count);
      if (count > 1) {
        returningCustomers.add(email);
      }
    }

    order.items.forEach((item) => {
      const key = item.id || `${item.title}-${item.category}`;
      const projectEntry =
        projectMap.get(key) ||
        {
          id: key,
          title: item.title,
          category: item.category,
          revenue: 0,
          units: 0,
          orders: 0
        };
      projectEntry.revenue += item.revenue;
      projectEntry.units += item.quantity;
      projectEntry.orders += 1;
      projectMap.set(key, projectEntry);

      const categoryKey = item.category || 'Uncategorised';
      categoryMap.set(categoryKey, (categoryMap.get(categoryKey) || 0) + item.revenue);
    });
  });

  summary.timeline = Array.from(timelineMap.values()).sort((a, b) => {
    const aTime = a.date ? a.date.getTime() : 0;
    const bTime = b.date ? b.date.getTime() : 0;
    return aTime - bTime;
  });
  summary.topProjects = Array.from(projectMap.values())
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 6);

  summary.categoryBreakdown = categoryMap;

  summary.averageOrderValue =
    summary.totalOrders > 0 ? summary.totalRevenue / summary.totalOrders : 0;

  const uniqueCustomerCount = customerOrderCounts.size;
  summary.uniqueCustomers = uniqueCustomerCount;
  summary.returningRate =
    uniqueCustomerCount === 0
      ? 0
      : (returningCustomers.size / uniqueCustomerCount) * 100;

  summary.categoryBreakdown = categoryMap;
  return summary;
};

const TrendChart = ({ data }) => {
  if (!data || data.length < 2) {
    return (
      <div className="h-48 grid place-items-center text-sm text-gray-500">
        Add more orders to see revenue trends.
      </div>
    );
  }

  const maxRevenue =
    data.reduce((max, entry) => Math.max(max, entry.revenue), 0) || 1;

  const points = data.map((entry, index) => {
    const x =
      data.length === 1 ? 0 : (index / (data.length - 1)) * 100;
    const y = 100 - Math.min(100, (entry.revenue / maxRevenue) * 100);
    return `${x},${y}`;
  });

  return (
    <div className="h-48">
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
        <defs>
          <linearGradient id="revenueGradient" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#111827" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#111827" stopOpacity="0" />
          </linearGradient>
        </defs>
        <polyline
          fill="none"
          stroke="#111827"
          strokeWidth="1.5"
          points={points.join(' ')}
        />
        <polygon
          fill="url(#revenueGradient)"
          points={[`0,100`, ...points, `100,100`].join(' ')}
        />
      </svg>
      <div className="mt-4 grid grid-cols-4 gap-2 text-xs text-gray-500">
        {data.map((entry) => (
          <div key={entry.dateKey}>
            <div className="font-medium text-gray-900">{formatDateLabel(entry.date)}</div>
            <div>{formatCurrency(entry.revenue)}</div>
            <div className="text-gray-500">{entry.orders} orders</div>
          </div>
        ))}
      </div>
    </div>
  );
};

const StatCard = ({ label, value, helper, tone = 'dark' }) => (
  <div
    className={[
      'rounded-3xl p-6 border',
      tone === 'dark' ? 'bg-gray-900 text-white border-gray-900' : 'bg-white border-black/10'
    ].join(' ')}
  >
    <p className="text-sm uppercase tracking-wide text-white/60">{label}</p>
    <p className="mt-3 text-3xl font-semibold">{value}</p>
    {helper && <p className="mt-2 text-sm text-white/60">{helper}</p>}
  </div>
);

const LightStatCard = ({ label, value, helper }) => (
  <div className="rounded-3xl p-6 border bg-white border-black/10">
    <p className="text-sm uppercase tracking-wide text-gray-500">{label}</p>
    <p className="mt-3 text-3xl font-semibold text-gray-900">{value}</p>
    {helper && <p className="mt-2 text-sm text-gray-500">{helper}</p>}
  </div>
);

const VisitorsCard = ({ metrics, onChange }) => (
  <div className="rounded-3xl border border-black/10 bg-white p-6 space-y-4">
    <div>
      <h3 className="text-xl font-semibold text-gray-900">Traffic Snapshot</h3>
      <p className="text-sm text-gray-500">
        Update these metrics manually from your analytics provider. Values are stored locally.
      </p>
    </div>
    <div className="grid gap-4 md:grid-cols-2">
      {trafficFields.map((field) => {
        const value = metrics[field.key] ?? '';
        const commonProps = {
          id: `traffic-${field.key}`,
          value: field.type === 'percent' && value !== '' ? value : value ?? '',
          onChange: (event) => {
            const raw = event.target.value;
            let nextValue = raw;
            if (field.type === 'number') {
              const numeric = Number(raw);
              nextValue = Number.isFinite(numeric) ? numeric : 0;
            }
            if (field.type === 'percent') {
              const numeric = Number(raw);
              nextValue = Number.isFinite(numeric) ? numeric : 0;
            }
            onChange(field.key, nextValue);
          },
          className: 'w-full px-4 py-3 rounded-2xl border border-black/10 focus:border-black outline-none text-sm'
        };

        if (field.type === 'textarea') {
          return (
            <div key={field.key} className="md:col-span-2">
              <label htmlFor={commonProps.id} className="block text-xs font-semibold text-gray-500 uppercase mb-2">
                {field.label}
              </label>
              <textarea
                {...commonProps}
                rows={3}
                placeholder="Key observations, campaign results, or follow-up items."
              />
              <p className="mt-1 text-xs text-gray-400">{field.helper}</p>
            </div>
          );
        }

        return (
          <div key={field.key}>
            <label htmlFor={commonProps.id} className="block text-xs font-semibold text-gray-500 uppercase mb-2">
              {field.label}
            </label>
            <input
              {...commonProps}
              type={field.type === 'text' ? 'text' : 'number'}
              placeholder={field.type === 'percent' ? '0.0' : '0'}
            />
            <p className="mt-1 text-xs text-gray-400">{field.helper}</p>
          </div>
        );
      })}
    </div>
  </div>
);

const AnalyticsEmbed = ({ url }) => {
  if (!url) {
    return (
      <div className="rounded-3xl border border-dashed border-black/10 bg-white p-6 text-sm text-gray-500">
        Configure `REACT_APP_ANALYTICS_EMBED_URL` to display your external analytics dashboard (Plausible, Google Analytics, PostHog, etc.).
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-black/10 overflow-hidden bg-white">
      <iframe
        title="Embedded analytics"
        src={url}
        className="w-full h-[480px] border-0"
        allow="fullscreen"
      />
    </div>
  );
};

const RecentOrdersTable = ({ orders }) => (
  <div className="rounded-3xl border border-black/10 bg-white overflow-hidden">
    <table className="min-w-full divide-y divide-black/10">
      <thead className="bg-gray-50 text-xs uppercase tracking-wide text-gray-500">
        <tr>
          <th className="px-4 py-3 text-left">Order</th>
          <th className="px-4 py-3 text-left">Customer</th>
          <th className="px-4 py-3 text-left">Total</th>
          <th className="px-4 py-3 text-left">Date</th>
          <th className="px-4 py-3 text-left">Status</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-black/5 text-sm">
        {orders.slice(0, 8).map((order) => (
          <tr key={order.id} className="hover:bg-gray-50/80">
            <td className="px-4 py-3 text-gray-900 font-medium">{order.id.slice(0, 10)}</td>
            <td className="px-4 py-3 text-gray-600">
              <div>{order.customer?.name || '—'}</div>
              <div className="text-xs text-gray-400">{order.customer?.email || '—'}</div>
            </td>
            <td className="px-4 py-3 font-medium text-gray-900">{formatCurrency(order.total)}</td>
            <td className="px-4 py-3 text-gray-500">{order.createdAt ? order.createdAt.toLocaleString() : '—'}</td>
            <td className="px-4 py-3">
              <span className="inline-flex items-center px-3 py-1 rounded-xl bg-gray-900 text-white text-xs capitalize">
                {order.status}
              </span>
            </td>
          </tr>
        ))}
        {orders.length === 0 && (
          <tr>
            <td className="px-4 py-6 text-center text-gray-500" colSpan={5}>
              No orders found yet. Import your order history to populate this table.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
);

const TopProjectsList = ({ projects }) => (
  <div className="rounded-3xl border border-black/10 bg-white p-6">
    <h3 className="text-xl font-semibold text-gray-900 mb-4">Top Projects</h3>
    <div className="space-y-4">
      {projects.length === 0 && (
        <p className="text-sm text-gray-500">Import orders to see revenue by project.</p>
      )}
      {projects.map((project) => (
        <div key={project.id} className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-gray-900">{project.title}</p>
            <p className="text-xs text-gray-500 uppercase tracking-wide">{project.category}</p>
          </div>
          <div className="text-right">
            <p className="text-sm font-semibold text-gray-900">{formatCurrency(project.revenue)}</p>
            <p className="text-xs text-gray-500">{project.units} units • {project.orders} orders</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const CategoryBreakdown = ({ categories }) => {
  const entries = Array.from(categories.entries()).sort((a, b) => b[1] - a[1]);

  if (entries.length === 0) {
    return (
      <div className="rounded-3xl border border-dashed border-black/10 bg-white p-6 text-sm text-gray-500">
        Category breakdown appears once you have at least one order with item categories.
      </div>
    );
  }

  const totalRevenue = entries.reduce((sum, [, value]) => sum + value, 0) || 1;

  return (
    <div className="rounded-3xl border border-black/10 bg-white p-6">
      <h3 className="text-xl font-semibold text-gray-900 mb-4">Revenue by Category</h3>
      <div className="space-y-3">
        {entries.map(([category, revenue]) => {
          const percentage = (revenue / totalRevenue) * 100;
          return (
            <div key={category}>
              <div className="flex justify-between text-sm font-medium text-gray-900">
                <span>{category}</span>
                <span>{formatCurrency(revenue)} ({percentage.toFixed(1)}%)</span>
              </div>
              <div className="h-2 rounded-full bg-gray-100 overflow-hidden mt-1">
                <div
                  className="h-full bg-gray-900"
                  style={{ width: `${Math.min(100, percentage)}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const DataControlsCard = ({ onImport, onClearImported, importedCount }) => {
  const inputRef = useRef(null);

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const parsed = JSON.parse(e.target.result);
        const array = asArray(parsed);
        onImport(array);
      } catch (error) {
        console.error('Import failed', error);
        alert('Failed to parse JSON file. Ensure it is a valid array of orders.');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="rounded-3xl border border-black/10 bg-white p-6 space-y-4">
      <div>
        <h3 className="text-xl font-semibold text-gray-900">Data Sources</h3>
        <p className="text-sm text-gray-500">
          Import a JSON export from Razorpay, Firebase, Airtable, or any tool. Only session local storage is used — no data leaves your browser.
        </p>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          className="px-4 py-2 rounded-2xl bg-gray-900 text-white text-sm font-medium"
          onClick={handleClick}
        >
          Import Orders JSON
        </button>
        <input
          ref={inputRef}
          type="file"
          accept="application/json"
          className="hidden"
          onChange={handleChange}
        />
        {importedCount > 0 && (
          <button
            type="button"
            className="px-4 py-2 rounded-2xl border border-black/10 text-sm font-medium text-gray-700 hover:border-black/30"
            onClick={onClearImported}
          >
            Clear Imported Data
          </button>
        )}
      </div>
      <p className="text-xs text-gray-400">
        Imported records stored under `{ADMIN_ORDERS_KEY}`. Delete them anytime to reset.
      </p>
    </div>
  );
};

const readAnalyticsEmbedUrl = () => {
  if (typeof window !== 'undefined') {
    const candidate =
      window._env_?.REACT_APP_ANALYTICS_EMBED_URL ||
      window.__ENV__?.REACT_APP_ANALYTICS_EMBED_URL ||
      window.__ENV__?.ANALYTICS_EMBED_URL;
    if (candidate) return candidate;
  }
  return process.env.REACT_APP_ANALYTICS_EMBED_URL || '';
};

const AdminAnalytics = () => {
  const { hasAccess, verify, verifying, error, logout, isConfigured } = useAdminAccess();
  const [orders, setOrders] = useState([]);
  const [trafficMetrics, setTrafficMetrics] = useState(defaultTrafficMetrics);
  const [importedOrdersCount, setImportedOrdersCount] = useState(0);
  const [analyticsEmbedUrl, setAnalyticsEmbedUrl] = useState('');

  useEffect(() => {
    if (!hasAccess) return;
    const mergedOrders = mergeOrders([
      safeGetLocalStorage(ADMIN_ORDERS_KEY, []),
      safeGetLocalStorage('orders', [])
    ]);
    setOrders(mergedOrders);
    setImportedOrdersCount(asArray(safeGetLocalStorage(ADMIN_ORDERS_KEY, [])).length);
    setTrafficMetrics(safeGetLocalStorage(TRAFFIC_METRICS_KEY, defaultTrafficMetrics));
    setAnalyticsEmbedUrl(readAnalyticsEmbedUrl());
  }, [hasAccess]);

  useEffect(() => {
    if (!hasAccess || typeof window === 'undefined') return;
    const handleStorage = (event) => {
      if (![ADMIN_ORDERS_KEY, 'orders', TRAFFIC_METRICS_KEY].includes(event.key)) {
        return;
      }
      setOrders(
        mergeOrders([
          safeGetLocalStorage(ADMIN_ORDERS_KEY, []),
          safeGetLocalStorage('orders', [])
        ])
      );
      setImportedOrdersCount(asArray(safeGetLocalStorage(ADMIN_ORDERS_KEY, [])).length);
      setTrafficMetrics(safeGetLocalStorage(TRAFFIC_METRICS_KEY, defaultTrafficMetrics));
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, [hasAccess]);

  const summary = useMemo(() => buildSummary(orders), [orders]);

  const handleTrafficChange = (field, value) => {
    setTrafficMetrics((current) => {
      const next = { ...current, [field]: value };
      safeSetLocalStorage(TRAFFIC_METRICS_KEY, next);
      return next;
    });
  };

  const handleImportOrders = (data) => {
    safeSetLocalStorage(ADMIN_ORDERS_KEY, data);
    setImportedOrdersCount(asArray(data).length);
    setOrders(
      mergeOrders([
        data,
        safeGetLocalStorage('orders', [])
      ])
    );
  };

  const handleClearImported = () => {
    if (typeof window === 'undefined') return;
    if (!window.confirm('Remove imported analytics data? This does not affect customer local orders.')) return;
    safeSetLocalStorage(ADMIN_ORDERS_KEY, []);
    setImportedOrdersCount(0);
    setOrders(
      mergeOrders([
        safeGetLocalStorage('orders', [])
      ])
    );
  };

  if (!hasAccess) {
    return (
      <AdminAccessGate
        onSubmit={verify}
        verifying={verifying}
        error={error}
        isConfigured={isConfigured}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <SEO
        title="Admin Analytics Dashboard"
        description="Monitor revenue, project performance, and traffic insights for ProjectMentorHub."
        canonical="https://projectmentorhub.com/admin/dashboard"
        noIndex
      />
      <div className="container mx-auto px-4 max-w-6xl space-y-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between"
        >
          <div>
            <h1 className="text-4xl font-serif font-bold text-gray-900">Analytics Dashboard</h1>
            <p className="mt-2 text-gray-600">
              Secure, client-side business intelligence. Import order data and keep a manual pulse on traffic.
            </p>
          </div>
          <button
            type="button"
            onClick={logout}
            className="self-start px-4 py-2 rounded-2xl border border-black/10 text-sm font-medium text-gray-700 hover:border-black/30"
          >
            Lock Dashboard
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05, duration: 0.4 }}
          className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"
        >
          <StatCard
            label="Total Revenue"
            value={formatCurrency(summary.totalRevenue)}
            helper="Aggregated from imported orders."
          />
          <LightStatCard
            label="Total Orders"
            value={formatNumber(summary.totalOrders)}
            helper={`${formatPercent(summary.returningRate)} returning customers`}
          />
          <LightStatCard
            label="Average Order Value"
            value={formatCurrency(summary.averageOrderValue)}
            helper={`Highest order ${formatCurrency(summary.highestOrderValue)}`}
          />
          <LightStatCard
            label="Unique Customers"
            value={formatNumber(summary.uniqueCustomers)}
            helper="Based on unique customer emails."
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          className="grid gap-6 lg:grid-cols-[3fr,2fr]"
        >
          <div className="rounded-3xl border border-black/10 bg-white p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Revenue Trend</h2>
                <p className="text-sm text-gray-500">Based on order totals grouped by day.</p>
              </div>
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                {summary.timeline.length} day{summary.timeline.length === 1 ? '' : 's'}
              </span>
            </div>
            <TrendChart data={summary.timeline} />
          </div>

          <TopProjectsList projects={summary.topProjects} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.4 }}
          className="grid gap-6 lg:grid-cols-[2fr,3fr]"
        >
          <CategoryBreakdown categories={summary.categoryBreakdown} />
          <RecentOrdersTable orders={orders} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="grid gap-6 lg:grid-cols-2"
        >
          <VisitorsCard metrics={trafficMetrics} onChange={handleTrafficChange} />
          <AnalyticsEmbed url={analyticsEmbedUrl} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.4 }}
        >
          <DataControlsCard
            onImport={handleImportOrders}
            onClearImported={handleClearImported}
            importedCount={importedOrdersCount}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default AdminAnalytics;
