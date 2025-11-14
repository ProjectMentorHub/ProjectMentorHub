import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PROMPT_DELAY_MS = 30_000;
const STORAGE_KEY = 'signupPromptDismissed';

const AuthPromptModal = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (loading) return;

    if (user) {
      setIsOpen(false);
      sessionStorage.setItem(STORAGE_KEY, 'true');
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      return;
    }

    const dismissed = sessionStorage.getItem(STORAGE_KEY) === 'true';
    if (dismissed || timerRef.current) return;

    timerRef.current = setTimeout(() => {
      setIsOpen(true);
      timerRef.current = null;
    }, PROMPT_DELAY_MS);
  }, [user, loading]);

  const closePrompt = () => {
    sessionStorage.setItem(STORAGE_KEY, 'true');
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white max-w-md w-full rounded-xl shadow-2xl border border-black/10 p-8 relative">
        <button
          type="button"
          aria-label="Close signup prompt"
          className="absolute top-4 right-4 text-gray-500 hover:text-black"
          onClick={closePrompt}
        >
          ×
        </button>
        <p className="text-xs uppercase tracking-[0.3em] text-gray-400 mb-3">Join the community</p>
        <h3 className="text-2xl font-serif font-semibold mb-2">Unlock premium project kits</h3>
        <p className="text-gray-600 text-sm mb-6">
          Create a free account to save your favourite projects, track orders, and access instant
          checkout support.
        </p>

        <div className="space-y-3">
          <button
            type="button"
            className="w-full py-3 rounded-md bg-black text-white font-semibold tracking-wide hover:bg-gray-900 transition"
            onClick={() => {
              closePrompt();
              navigate('/login?mode=signup');
            }}
          >
            Sign Up Free
          </button>
          <button
            type="button"
            className="w-full py-3 rounded-md border border-black text-black font-semibold tracking-wide hover:bg-gray-50 transition"
            onClick={() => {
              closePrompt();
              navigate('/login?mode=signin');
            }}
          >
            Sign In
          </button>
        </div>
        <p className="text-[11px] text-gray-400 text-center mt-4">
          Already have an account? Sign in to continue where you left off.
        </p>
      </div>
    </div>
  );
};

export default AuthPromptModal;
