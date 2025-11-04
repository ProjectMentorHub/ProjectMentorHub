import { useCallback, useEffect, useMemo, useState } from 'react';

const STORAGE_KEY = 'pmh:admin:access:v1';
const DEFAULT_HASH = '49889d152ef3f29e174d2646c9b7840dbb2812e7978f3df6d7caa9819938cc38'; // sha256('admin-demo-access')

const readHashFromEnv = () => {
  if (typeof window !== 'undefined') {
    const candidates = [
      window._env_?.REACT_APP_ADMIN_ACCESS_HASH,
      window._env_?.REACT_APP_ADMIN_DASHBOARD_HASH,
      window.__ENV__?.REACT_APP_ADMIN_ACCESS_HASH,
      window.__ENV__?.ADMIN_ACCESS_HASH,
      window.__ENV__?.REACT_APP_ADMIN_DASHBOARD_HASH
    ].filter(Boolean);
    if (candidates.length > 0) {
      return candidates[0];
    }
  }

  return (
    process.env.REACT_APP_ADMIN_ACCESS_HASH ||
    process.env.REACT_APP_ADMIN_DASHBOARD_HASH ||
    DEFAULT_HASH
  );
};

const bufferToHex = (buffer) =>
  Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');

const hashString = async (value) => {
  if (typeof value !== 'string') {
    throw new Error('Value must be a string');
  }
  if (typeof window === 'undefined') {
    throw new Error('Hashing requires browser crypto APIs');
  }

  const cryptoObj = window.crypto || window.msCrypto;

  if (!cryptoObj?.subtle) {
    throw new Error('Secure hashing is not supported in this browser');
  }

  const encoder = new TextEncoder();
  const data = encoder.encode(value);
  const hashBuffer = await cryptoObj.subtle.digest('SHA-256', data);
  return bufferToHex(hashBuffer);
};

const safeGetSessionItem = (key) => {
  if (typeof window === 'undefined') return null;
  try {
    return window.sessionStorage.getItem(key);
  } catch (error) {
    console.warn('Unable to read sessionStorage', error);
    return null;
  }
};

const safeSetSessionItem = (key, value) => {
  if (typeof window === 'undefined') return;
  try {
    window.sessionStorage.setItem(key, value);
  } catch (error) {
    console.warn('Unable to write sessionStorage', error);
  }
};

const safeRemoveSessionItem = (key) => {
  if (typeof window === 'undefined') return;
  try {
    window.sessionStorage.removeItem(key);
  } catch (error) {
    console.warn('Unable to remove sessionStorage item', error);
  }
};

export const useAdminAccess = () => {
  const [hasAccess, setHasAccess] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [error, setError] = useState('');

  const configuredHash = useMemo(() => readHashFromEnv() || '', []);
  const isConfigured = Boolean(configuredHash);

  useEffect(() => {
    if (!isConfigured) return;
    const storedHash = safeGetSessionItem(STORAGE_KEY);
    if (storedHash && storedHash === configuredHash) {
      setHasAccess(true);
    }
  }, [configuredHash, isConfigured]);

  const verify = useCallback(
    async (code) => {
      if (!isConfigured) {
        setError('Dashboard access is not configured. Set REACT_APP_ADMIN_ACCESS_HASH first.');
        return false;
      }

      const trimmed = (code || '').trim();
      if (!trimmed) {
        setError('Enter your access code to continue.');
        return false;
      }

      setVerifying(true);
      setError('');

      try {
        const hashedInput = await hashString(trimmed);
        if (hashedInput === configuredHash) {
          setHasAccess(true);
          safeSetSessionItem(STORAGE_KEY, configuredHash);
          return true;
        }
        setError('Invalid access code. Try again.');
        return false;
      } catch (hashError) {
        console.error('Failed to verify admin access', hashError);
        setError('Your browser does not support secure verification.');
        return false;
      } finally {
        setVerifying(false);
      }
    },
    [configuredHash, isConfigured]
  );

  const logout = useCallback(() => {
    safeRemoveSessionItem(STORAGE_KEY);
    setHasAccess(false);
    setError('');
  }, []);

  const clearError = useCallback(() => setError(''), []);

  return {
    hasAccess,
    verify,
    logout,
    verifying,
    error,
    clearError,
    isConfigured
  };
};

export default useAdminAccess;
