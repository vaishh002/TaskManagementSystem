import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaLock, FaEnvelope, FaEye, FaEyeSlash, FaCheckCircle, FaArrowLeft, FaShieldAlt, FaFolderOpen, FaBolt, FaExclamationTriangle } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';

const Orb = ({ style, delay = 0 }) => (
  <motion.div
    className="absolute rounded-full pointer-events-none"
    style={style}
    animate={{
      y: [0, -30, 0],
      x: [0, 15, 0],
      scale: [1, 1.08, 1],
      opacity: [0.55, 0.8, 0.55],
    }}
    transition={{ duration: 7 + delay, repeat: Infinity, ease: 'easeInOut', delay }}
  />
);

const Sparkles = () => {
  const dots = Array.from({ length: 18 });
  return (
    <>
      {dots.map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-white"
          style={{
            width: Math.random() * 4 + 2,
            height: Math.random() * 4 + 2,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{ opacity: [0, 1, 0], scale: [0.5, 1.4, 0.5] }}
          transition={{
            duration: 2.5 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 4,
          }}
        />
      ))}
    </>
  );
};

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({ email: '', password: '' });
  const [focusedField, setFocusedField] = useState(null);
  const [remember, setRemember] = useState(false);
  const [shakeForgot, setShakeForgot] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) return setError('Please fill all fields');
    try {
      setLoading(true);
      await login(form);
      setSuccess(true);
      setTimeout(() => navigate('/workspaces'), 1400);
    } catch (err) {
      if (err?.response?.status === 404) {
        setError("No account found. Please register first.");
      } else if (err?.response?.status === 401) {
        setError("Incorrect password. Try again.");
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const container = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.09, delayChildren: 0.25 } },
  };
  const item = {
    hidden: { y: 28, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 110, damping: 14 } },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={container}
      className="min-h-screen flex"
      style={{ background: '#F5EBFA', fontFamily: "'DM Sans', sans-serif" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700;900&family=Playfair+Display:wght@700;900&display=swap');

        /* Neomorphic input */
        .neo-input {
          background: #F5EBFA;
          box-shadow:
            inset 4px 4px 10px #d8c8e4,
            inset -4px -4px 10px #ffffff;
          border: 1.5px solid transparent;
          transition: box-shadow 0.3s, border-color 0.3s;
        }
        .neo-input:focus {
          outline: none;
          box-shadow:
            inset 4px 4px 10px #cbb8da,
            inset -4px -4px 10px #ffffff,
            0 0 0 2px #A56ABD44;
          border-color: #A56ABD;
        }

        /* Neomorphic button */
        .neo-btn {
          background: linear-gradient(135deg, #6E3482, #49225B);
          box-shadow:
            6px 6px 16px #c9aed8,
            -4px -4px 12px #ffffff55;
          transition: box-shadow 0.25s, transform 0.15s;
        }
        .neo-btn:hover:not(:disabled) {
          box-shadow:
            8px 8px 20px #b89ac9,
            -4px -4px 12px #ffffff66;
        }
        .neo-btn:active:not(:disabled) {
          box-shadow:
            inset 4px 4px 8px #3d1a50,
            inset -2px -2px 6px #8e4ab066;
        }

        /* Glass card */
        .glass-card {
          background: rgba(255, 255, 255, 0.45);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border: 1px solid rgba(255,255,255,0.7);
          box-shadow:
            0 20px 60px rgba(73, 34, 91, 0.18),
            0 4px 16px rgba(110, 52, 130, 0.1),
            inset 0 1px 0 rgba(255,255,255,0.8);
        }

        /* Feature pill */
        .feature-pill {
          background: rgba(255,255,255,0.15);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255,255,255,0.3);
        }

        /* Checkbox purple */
        input[type="checkbox"]:checked {
          accent-color: #6E3482;
        }

        /* Scrollbar */
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #F5EBFA; }
        ::-webkit-scrollbar-thumb { background: #A56ABD; border-radius: 4px; }

        /* Spin */
        @keyframes spin { to { transform: rotate(360deg); } }
        .spin { animation: spin 0.8s linear infinite; }

        /* Ripple */
        @keyframes ripple {
          0% { transform: scale(0.8); opacity: 0.6; }
          100% { transform: scale(2.2); opacity: 0; }
        }
        .ripple-ring {
          animation: ripple 2.2s ease-out infinite;
        }
      `}</style>

      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="hidden lg:flex lg:w-[52%] relative overflow-hidden"
        style={{ background: 'linear-gradient(145deg, #49225B 0%, #6E3482 50%, #A56ABD 100%)' }}
      >
        <Orb
          delay={0}
          style={{
            width: 320, height: 320, top: '-60px', left: '-80px',
            background: 'radial-gradient(circle, #A56ABD88 0%, transparent 70%)',
          }}
        />
        <Orb
          delay={2}
          style={{
            width: 240, height: 240, bottom: '60px', right: '-40px',
            background: 'radial-gradient(circle, #E7DBEF55 0%, transparent 70%)',
          }}
        />
        <Orb
          delay={4}
          style={{
            width: 160, height: 160, bottom: '200px', left: '80px',
            background: 'radial-gradient(circle, #6E348266 0%, transparent 70%)',
          }}
        />
        <Sparkles />

        <div
          className="absolute rounded-full border border-white/10 ripple-ring"
          style={{ width: 420, height: 420, top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }}
        />
        <div
          className="absolute rounded-full border border-white/10 ripple-ring"
          style={{ width: 300, height: 300, top: '50%', left: '50%', transform: 'translate(-50%,-50%)', animationDelay: '1.1s' }}
        />

        <div className="relative z-10 flex flex-col justify-between p-14 text-white w-full">
          {/* Back link */}
          <Link
            to="/"
            className="flex items-center gap-2 w-fit group"
            style={{ color: '#E7DBEF' }}
          >
            <motion.div whileHover={{ x: -4 }} className="transition-transform">
              <FaArrowLeft size={12} />
            </motion.div>
            <span className="text-sm font-semibold group-hover:text-white transition-colors">Back to Home</span>
          </Link>

          <div>
            <motion.div
              variants={item}
              className="mb-10"
            >
              <div className="relative w-fit mb-8">
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center"
                  style={{
                    background: 'rgba(255,255,255,0.15)',
                    backdropFilter: 'blur(12px)',
                    border: '1px solid rgba(255,255,255,0.3)',
                    boxShadow: '0 8px 32px rgba(73,34,91,0.3)',
                  }}
                >
                  <FaLock size={22} />
                </div>
                <motion.div
                  className="absolute inset-0 rounded-2xl"
                  animate={{ boxShadow: ['0 0 0 0 rgba(231,219,239,0.4)', '0 0 0 14px rgba(231,219,239,0)', '0 0 0 0 rgba(231,219,239,0)'] }}
                  transition={{ duration: 2.5, repeat: Infinity }}
                />
              </div>

              <h1
                className="text-6xl font-black mb-4 leading-[1.05]"
                style={{ fontFamily: "'Playfair Display', serif", textShadow: '0 4px 24px rgba(73,34,91,0.4)' }}
              >
                Welcome<br />Back
              </h1>
              <p style={{ color: '#E7DBEF', fontSize: '1.05rem', lineHeight: 1.65, maxWidth: 280 }}>
                Step back into your workspace. Your tasks, your rhythm — all waiting.
              </p>
            </motion.div>

            <motion.div variants={item} className="space-y-3">
              {[
                { icon: <FaShieldAlt />, label: 'Secure Authentication', sub: 'End-to-end encrypted' },
                { icon: <FaFolderOpen />, label: 'Workspace Management', sub: 'Multi-project support' },
                { icon: <FaBolt />, label: 'Real-time Sync', sub: 'Instant updates everywhere' },
              ].map(({ icon, label, sub }) => (
                <motion.div
                  key={label}
                  whileHover={{ x: 6, scale: 1.02 }}
                  className="feature-pill flex items-center gap-4 px-5 py-3.5 rounded-2xl"
                >
                  <span className="text-lg p-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 shadow-md">
                    {icon}
                  </span>
                  <div>
                    <p className="text-sm font-bold text-white">{label}</p>
                    <p className="text-xs" style={{ color: '#E7DBEF99' }}>{sub}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.div>

      <div
        className="w-full lg:w-[48%] flex flex-col justify-center items-center px-8 sm:px-12 lg:px-16 py-14 relative overflow-hidden"
        style={{ background: 'linear-gradient(160deg, #F5EBFA 0%, #E7DBEF 100%)' }}
      >
        <div
          className="absolute pointer-events-none"
          style={{
            width: 400, height: 400, borderRadius: '40% 60% 55% 45% / 50% 45% 55% 50%',
            background: 'radial-gradient(circle, #A56ABD22 0%, transparent 70%)',
            top: '-80px', right: '-80px',
          }}
        />
        <div
          className="absolute pointer-events-none"
          style={{
            width: 280, height: 280, borderRadius: '60% 40% 45% 55% / 55% 50% 50% 45%',
            background: 'radial-gradient(circle, #6E348215 0%, transparent 70%)',
            bottom: '30px', left: '-40px',
          }}
        />

        <Link
          to="/"
          className="lg:hidden flex items-center gap-2 mb-8 self-start"
          style={{ color: '#6E3482' }}
        >
          <FaArrowLeft size={12} />
          <span className="text-sm font-semibold">Back to Home</span>
        </Link>

        <AnimatePresence>
          {success && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex flex-col items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #49225B, #6E3482, #A56ABD)' }}
            >
              <motion.div
                initial={{ scale: 0, rotate: -30 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', damping: 10, stiffness: 120 }}
                className="text-8xl mb-6"
                style={{ color: '#E7DBEF' }}
              >
                <FaCheckCircle />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-center"
              >
                <h2 className="text-4xl font-black text-white mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Welcome back!
                </h2>
                <p style={{ color: '#E7DBEF99' }}>Redirecting you to your workspaces…</p>
              </motion.div>
              {/* Success sparkles */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <Sparkles />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          className="glass-card rounded-3xl p-10 w-full"
          style={{ maxWidth: 420 }}
        >
          <motion.div variants={item} className="mb-8 text-center">
            <h2
              className="font-black mb-1.5 text-center"
              style={{ fontSize: '2.4rem', color: '#49225B', fontFamily: "'Playfair Display', serif", lineHeight: 1.1 }}
            >
              Sign In
            </h2>
            <p className="text-sm font-medium text-center" style={{ color: '#A56ABD' }}>
              Enter your credentials to continue
            </p>

            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: 'auto' }}
                  exit={{ opacity: 0, y: -10, height: 0 }}
                  className="mt-4 px-4 py-3 rounded-2xl text-sm font-semibold flex items-center gap-2"
                  style={{
                    background: 'rgba(73,34,91,0.08)',
                    border: '1.5px solid #A56ABD55',
                    color: '#49225B',
                  }}
                >
                  <FaExclamationTriangle size={14} style={{ color: '#A56ABD' }} />
                  <span>{error}</span>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          <div className="space-y-4">
            {/* Email field */}
            <motion.div variants={item}>
              <label className="block text-xs font-bold mb-1.5 tracking-wider uppercase" style={{ color: '#6E3482' }}>
                Email Address
              </label>
              <div className="relative">
                <motion.div
                  animate={{ color: focusedField === 'email' ? '#6E3482' : '#A56ABD' }}
                  className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"
                >
                  <FaEnvelope size={13} />
                </motion.div>
                <input
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  className="neo-input block w-full pl-11 pr-4 py-4 rounded-2xl text-sm font-medium"
                  style={{ color: '#49225B' }}
                />
              </div>
            </motion.div>

            <motion.div variants={item}>
              <label className="block text-xs font-bold mb-1.5 tracking-wider uppercase" style={{ color: '#6E3482' }}>
                Password
              </label>
              <div className="relative">
                <motion.div
                  animate={{ color: focusedField === 'password' ? '#6E3482' : '#A56ABD' }}
                  className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"
                >
                  <FaLock size={13} />
                </motion.div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="••••••••"
                  value={form.password}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('password')}
                  onBlur={() => setFocusedField(null)}
                  className="neo-input block w-full pl-11 pr-12 py-4 rounded-2xl text-sm font-medium"
                  style={{ color: '#49225B' }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(p => !p)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center transition-colors"
                  style={{ color: '#A56ABD' }}
                >
                  <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
                    {showPassword ? <FaEyeSlash size={15} /> : <FaEye size={15} />}
                  </motion.div>
                </button>
              </div>
            </motion.div>

            <motion.div variants={item} className="flex items-center justify-between text-sm pt-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="rounded"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                />
                <span className="font-medium" style={{ color: '#6E3482' }}>Remember me</span>
              </label>
              <motion.div
                animate={
                  error
                    ? { x: [0, -6, 6, -6, 6, 0] }
                    : { x: 0 }
                }
                transition={{
                  duration: 0.5,
                  ease: "easeInOut"
                }}
              >
                <Link
                  to="/forgot-password-request"
                  className="font-bold transition-colors"
                  style={{ color: '#6E3482' }}
                >
                  Forgot password?
                </Link>
              </motion.div>
            </motion.div>

            <motion.div variants={item} className="pt-2">
              <motion.button
                whileHover={{ scale: 1.025, y: -2 }}
                whileTap={{ scale: 0.97 }}
                type="button"
                onClick={handleSubmit}
                disabled={loading || !remember}
                className="neo-btn w-full py-4 rounded-2xl text-white font-black text-sm tracking-wide relative overflow-hidden"
                style={{
                  opacity: loading || !remember ? 0.5 : 1,
                  cursor: loading || !remember ? 'not-allowed' : 'pointer'
                }}
              >
                {!loading && (
                  <motion.div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.18) 50%, transparent 60%)',
                    }}
                    animate={{ x: ['-100%', '200%'] }}
                    transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 1.5 }}
                  />
                )}
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span
                      className="spin"
                      style={{ display: 'inline-block', width: 16, height: 16, border: '2.5px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%' }}
                    />
                    Authenticating…
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    Login
                    <motion.span
                      animate={{ x: [0, 4, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      →
                    </motion.span>
                  </span>
                )}
              </motion.button>
            </motion.div>
          </div>

          <motion.div variants={item} className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px" style={{ background: 'linear-gradient(to right, transparent, #A56ABD44)' }} />
            <span className="text-xs font-bold tracking-widest uppercase" style={{ color: '#A56ABD' }}>or</span>
            <div className="flex-1 h-px" style={{ background: 'linear-gradient(to left, transparent, #A56ABD44)' }} />
          </motion.div>

          <motion.p variants={item} className="text-center text-sm" style={{ color: '#6E3482' }}>
            Don't have an account?{' '}
            <motion.div
              animate={{
                x: [0, -3, 3, -3, 3, 0]
              }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                repeatDelay: 3
              }}
            >
              <Link
                to="/register"
                className="font-black relative group"
                style={{ color: '#49225B' }}
              >
                <span>Register here</span>
              </Link>
            </motion.div>
          </motion.p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Login;   
