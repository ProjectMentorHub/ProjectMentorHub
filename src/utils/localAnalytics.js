const SEARCH_EVENTS_KEY = 'pmh:analytics:searches:v1';

const safeRead = (key) => {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(key);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.warn('Failed to read analytics storage', error);
    return [];
  }
};

const safeWrite = (key, value) => {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.warn('Failed to write analytics storage', error);
  }
};

export const getSearchEvents = () => safeRead(SEARCH_EVENTS_KEY);

export const clearSearchEvents = () => safeWrite(SEARCH_EVENTS_KEY, []);

export const logCatalogSearch = ({ query, category = 'All', results = [], totalResults = null }) => {
  if (typeof window === 'undefined') return;

  const trimmedQuery = String(query || '').trim();
  if (!trimmedQuery) return;

  const payload = {
    query: trimmedQuery.slice(0, 120),
    category: category || 'All',
    timestamp: Date.now(),
    totalResults: typeof totalResults === 'number' ? totalResults : results.length,
    results: Array.isArray(results)
      ? results.slice(0, 5).map((item, index) => ({
          id: String(item?.id ?? `unknown-${index}`),
          title: String(item?.title ?? 'Untitled Project'),
          category: String(item?.category ?? 'Uncategorised'),
          rank: index + 1
        }))
      : []
  };

  const existing = getSearchEvents();
  existing.unshift(payload);

  // Keep the most recent 300 events to limit storage growth
  safeWrite(SEARCH_EVENTS_KEY, existing.slice(0, 300));
};

export const ANALYTICS_STORAGE = {
  SEARCH_EVENTS_KEY
};

export default {
  logCatalogSearch,
  getSearchEvents,
  clearSearchEvents,
  ANALYTICS_STORAGE
};
