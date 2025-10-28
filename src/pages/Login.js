import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';

// ⬇️ Add these: Firebase Auth + Google provider
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../config/firebase';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const { signUp, logIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';
  const loginPromptMessage =
    location.state?.from?.pathname === '/checkout'
      ? 'Please sign in to finish your checkout.'
      : null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        await logIn(email, password);
      } else {
        await signUp(email, password, fullName);
      }
      navigate(from, { replace: true });
    } catch (error) {
      // Error toast is handled in context
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // ⬇️ Google sign-in handler
  const handleGoogleLogin = async () => {
    try {
      setGoogleLoading(true);
      await signInWithPopup(auth, googleProvider);
      navigate(from, { replace: true });
    } catch (error) {
      console.error('Google login error:', error);
      // You can surface a toast here if you want
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
      <SEO
        title={isLogin ? 'Login' : 'Create Account'}
        description="Sign in to ProjectMentorHub or create a free account to access your project purchases and checkout securely."
        canonical="https://projectmentorhub.com/login"
        noIndex
      />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full"
      >
        <div className="bg-white p-8 border border-black/10 shadow-lg rounded-lg">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-serif font-bold mb-2">
              {isLogin ? 'Welcome Back' : 'Create Account'}
            </h2>
            <p className="text-gray-600">
              {isLogin ? 'Sign in to continue' : 'Join ProjectMentorHub today'}
            </p>
            {loginPromptMessage && (
              <p className="mt-2 text-sm text-black font-medium">{loginPromptMessage}</p>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium mb-2">Full Name</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required={!isLogin}
                  className="w-full px-4 py-2 border border-black/20 focus:outline-none focus:border-black transition-colors"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2 border border-black/20 focus:outline-none focus:border-black transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="w-full px-4 py-2 border border-black/20 focus:outline-none focus:border-black transition-colors"
              />
            </div>

            <button
              type="submit"
              disabled={loading || googleLoading}
              className="w-full btn-primary"
            >
              {loading ? 'Processing...' : isLogin ? 'Sign In' : 'Sign Up'}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-1 h-px bg-black/10" />
            <span className="px-3 text-xs uppercase tracking-wider text-gray-500">
              or continue with
            </span>
            <div className="flex-1 h-px bg-black/10" />
          </div>

          {/* Google button */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={googleLoading || loading}
            className="w-full flex items-center justify-center gap-3 border border-black rounded-md py-2 transition hover:bg-black hover:text-white"
            aria-label="Continue with Google"
          >
            <img
              src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
              alt=""
              className="w-5 h-5"
            />
            <span>{googleLoading ? 'Connecting…' : 'Continue with Google'}</span>
          </button>

          <p className="mt-6 text-center text-sm text-gray-600">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button
              onClick={() => {
                setIsLogin(!isLogin);
                setEmail('');
                setPassword('');
                setFullName('');
              }}
              className="text-black font-medium hover:underline"
            >
              {isLogin ? 'Sign up' : 'Sign in'}
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
