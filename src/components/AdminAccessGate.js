import { useEffect, useState } from 'react';

const HINT_STORAGE_KEY = 'pmh:admin:gate:hint';

const readHintFromEnv = () => {
  if (typeof window !== 'undefined') {
    const hint =
      window._env_?.REACT_APP_ADMIN_ACCESS_HINT ||
      window._env_?.REACT_APP_ADMIN_DASHBOARD_HINT ||
      window.__ENV__?.REACT_APP_ADMIN_ACCESS_HINT ||
      window.__ENV__?.ADMIN_ACCESS_HINT;
    if (hint) return hint;
  }
  return process.env.REACT_APP_ADMIN_ACCESS_HINT || '';
};

const safeGetLocalStorage = (key) => {
  if (typeof window === 'undefined') return null;
  try {
    return window.localStorage.getItem(key);
  } catch (error) {
    console.warn('Unable to read localStorage', error);
    return null;
  }
};

const safeSetLocalStorage = (key, value) => {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(key, value);
  } catch (error) {
    console.warn('Unable to write localStorage', error);
  }
};

export default function AdminAccessGate({
  onSubmit,
  verifying,
  error,
  isConfigured
}) {
  const [code, setCode] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [hint, setHint] = useState('');

  useEffect(() => {
    setHint(readHintFromEnv());
  }, []);

  useEffect(() => {
    const stored = safeGetLocalStorage(HINT_STORAGE_KEY);
    if (stored === 'true') {
      setShowHint(true);
    }
  }, []);

  useEffect(() => {
    safeSetLocalStorage(HINT_STORAGE_KEY, showHint ? 'true' : 'false');
  }, [showHint]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (verifying) return;
    await onSubmit(code);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center space-y-3">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10">
            <span className="text-2xl font-semibold">PMH</span>
          </div>
          <h1 className="text-3xl font-semibold">Analytics Dashboard</h1>
          <p className="text-white/70">
            Enter the admin access code to unlock sensitive business insights.
          </p>
          {!isConfigured && (
            <p className="text-sm text-red-300">
              Access control hash is not configured. Set `REACT_APP_ADMIN_ACCESS_HASH` to enable secure login.
            </p>
          )}
        </div>

        <form onSubmit={handleSubmit} className="bg-white/5 p-6 rounded-3xl space-y-5">
          <div className="space-y-2 text-left">
            <label htmlFor="admin-access-code" className="text-sm font-medium text-white/80">
              Access Code
            </label>
            <input
              id="admin-access-code"
              type="password"
              autoComplete="current-password"
              value={code}
              onChange={(event) => setCode(event.target.value)}
              className="w-full px-4 py-3 rounded-2xl bg-white/10 focus:bg-white/15 border border-white/10 focus:border-white/30 outline-none transition"
              placeholder="Enter your admin code"
            />
          </div>

          {error && (
            <div className="text-sm text-red-200 bg-red-500/10 border border-red-400/40 px-4 py-2 rounded-2xl">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3 rounded-2xl bg-white text-gray-900 font-semibold disabled:opacity-60 transition"
            disabled={verifying || !isConfigured}
          >
            {verifying ? 'Checking access…' : 'Unlock Dashboard'}
          </button>

          {hint && (
            <div className="text-left space-y-2 text-xs text-white/60">
              <button
                type="button"
                className="underline underline-offset-2"
                onClick={() => setShowHint((value) => !value)}
              >
                {showHint ? 'Hide access hint' : 'Need a hint?'}
              </button>
              {showHint && <p className="text-white/70">{hint}</p>}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
