import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaEnvelope, FaArrowLeft, FaShieldAlt, FaKey, FaPaperPlane, FaCheckCircle, FaExternalLinkAlt, FaCopy, FaCheck, FaLock, FaExclamationTriangle } from 'react-icons/fa';
import { motion, AnimatePresence, useAnimationControls } from 'framer-motion';
import { forgetPasswordRequest } from '../../api/index';
import { requestHandler } from '../../utils/index';

const Orb = ({ style, delay = 0 }) => (
  <motion.div
    className="absolute rounded-full pointer-events-none"
    style={style}
    animate={{ y: [0, -30, 0], x: [0, 15, 0], scale: [1, 1.08, 1], opacity: [0.55, 0.8, 0.55] }}
    transition={{ duration: 7 + delay, repeat: Infinity, ease: 'easeInOut', delay }}
  />
);

const Sparkles = ({ count = 18 }) => (
  <>
    {Array.from({ length: count }).map((_, i) => (
      <motion.div
        key={i}
        className="absolute rounded-full bg-white pointer-events-none"
        style={{
          width: Math.random() * 4 + 2,
          height: Math.random() * 4 + 2,
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
        }}
        animate={{ opacity: [0, 1, 0], scale: [0.5, 1.4, 0.5] }}
        transition={{ duration: 2.5 + Math.random() * 2, repeat: Infinity, delay: Math.random() * 4 }}
      />
    ))}
  </>
);

const EnvelopeParticles = () =>
  Array.from({ length: 8 }).map((_, i) => (
    <motion.div
      key={i}
      className="absolute text-white/60 pointer-events-none"
      style={{ fontSize: 14 + Math.random() * 14, left: `${10 + Math.random() * 80}%`, top: `${20 + Math.random() * 60}%` }}
      initial={{ opacity: 0, y: 0, rotate: 0 }}
      animate={{ opacity: [0, 1, 0], y: -120 - Math.random() * 80, rotate: (Math.random() - 0.5) * 60 }}
      transition={{ duration: 2.5 + Math.random() * 1, delay: Math.random() * 0.8, repeat: Infinity, repeatDelay: Math.random() * 2 }}
    >
      ✉
    </motion.div>
  ));

const LoadingDots = () => (
  <span className="flex items-center gap-1">
    {[0, 1, 2].map(i => (
      <motion.span
        key={i}
        className="inline-block w-1.5 h-1.5 rounded-full bg-white"
        animate={{ y: [0, -5, 0], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 0.7, repeat: Infinity, delay: i * 0.15 }}
      />
    ))}
  </span>
);

const ForgotPasswordRequest = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });
  const [testingUrl, setTestingUrl] = useState('');
  const [copied, setCopied] = useState(false);
  const [focusedField, setFocusedField] = useState(false);
  const [success, setSuccess] = useState(false);
  const [typedChars, setTypedChars] = useState(0);

  const iconControls = useAnimationControls();

  useEffect(() => {
    setTypedChars(email.length);
  }, [email]);

  useEffect(() => {
    if (email.length > 0) {
      iconControls.start({ scale: [1, 1.25, 1], transition: { duration: 0.25 } });
    }
  }, [typedChars]);

  const validateEmail = (e) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    setStatus({ type: '', message: '' });

    if (!email.trim()) return setStatus({ type: 'error', message: 'Please enter your email address' });
    if (!validateEmail(email)) return setStatus({ type: 'error', message: 'Please enter a valid email address' });

    await requestHandler(
      async () => {
        const response = await forgetPasswordRequest({ email });
        return response.data;
      },
      setIsLoading,
      (data) => {
        if (data?.forgotPasswordUrl || data?.resetUrl || data?.url) {
          setTestingUrl(data.forgotPasswordUrl || data.resetUrl || data.url);
        }
        setStatus({ type: 'success', message: data?.message || 'Password reset instructions have been sent to your email.' });
        setSuccess(true);
        setEmail('');
      },
      (error) => {
        setStatus({ type: 'error', message: error?.message || 'Failed to send reset link. Please try again.' });
      }
    );
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

        .neo-input {
          background: #F5EBFA;
          box-shadow: inset 4px 4px 10px #d8c8e4, inset -4px -4px 10px #ffffff;
          border: 1.5px solid transparent;
          transition: box-shadow 0.3s, border-color 0.3s;
        }
        .neo-input:focus {
          outline: none;
          box-shadow: inset 4px 4px 10px #cbb8da, inset -4px -4px 10px #ffffff, 0 0 0 2px #A56ABD44;
          border-color: #A56ABD;
        }
        .neo-btn {
          background: linear-gradient(135deg, #6E3482, #49225B);
          box-shadow: 6px 6px 16px #c9aed8, -4px -4px 12px #ffffff55;
          transition: box-shadow 0.25s, transform 0.15s;
        }
        .neo-btn:hover:not(:disabled) {
          box-shadow: 8px 8px 20px #b89ac9, -4px -4px 12px #ffffff66;
        }
        .neo-btn:active:not(:disabled) {
          box-shadow: inset 4px 4px 8px #3d1a50, inset -2px -2px 6px #8e4ab066;
        }
        .glass-card {
          background: rgba(255,255,255,0.45);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border: 1px solid rgba(255,255,255,0.7);
          box-shadow: 0 20px 60px rgba(73,34,91,0.18), 0 4px 16px rgba(110,52,130,0.1), inset 0 1px 0 rgba(255,255,255,0.8);
        }
        .feature-pill {
          background: rgba(255,255,255,0.15);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255,255,255,0.3);
        }
        .progress-bar {
          transition: width 0.4s cubic-bezier(0.34,1.56,0.64,1);
        }
        @keyframes spin { to { transform: rotate(360deg); } }
        .spin { animation: spin 0.8s linear infinite; }
        @keyframes ripple {
          0% { transform: translate(-50%,-50%) scale(0.8); opacity: 0.6; }
          100% { transform: translate(-50%,-50%) scale(2.2); opacity: 0; }
        }
        .ripple-ring { animation: ripple 2.2s ease-out infinite; }
        @keyframes float-up {
          0%   { transform: translateY(0) rotate(0); opacity: 0; }
          20%  { opacity: 1; }
          100% { transform: translateY(-180px) rotate(20deg); opacity: 0; }
        }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #F5EBFA; }
        ::-webkit-scrollbar-thumb { background: #A56ABD; border-radius: 4px; }
      `}</style>
      <AnimatePresence>
        {testingUrl && (
          <motion.div
            initial={{ y: -60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -60, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 120, damping: 18 }}
            className="fixed top-0 left-0 right-0 z-50"
            style={{ background: 'linear-gradient(90deg, #49225B, #6E3482)', borderBottom: '1px solid #A56ABD55' }}
          >
            <div className="max-w-7xl mx-auto px-4 py-3 sm:px-6 flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2 flex-1 min-w-0">
                <span className="text-xs font-black tracking-widest uppercase text-white/60">Dev URL</span>
                <a
                  href={testingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-white/90 hover:text-white underline underline-offset-2 truncate flex items-center gap-1"
                >
                  {testingUrl}
                  <FaExternalLinkAlt size={10} />
                </a>
              </div>
              <div className="flex items-center gap-2">
                <motion.button
                  whileTap={{ scale: 0.85 }}
                  onClick={() => copyToClipboard(testingUrl)}
                  className="p-1.5 rounded-lg transition-colors"
                  style={{ background: 'rgba(255,255,255,0.12)' }}
                >
                  <AnimatePresence mode="wait">
                    {copied
                      ? <motion.span key="check" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}><FaCheck size={13} color="#A8F0C0" /></motion.span>
                      : <motion.span key="copy" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}><FaCopy size={13} color="rgba(255,255,255,0.7)" /></motion.span>
                    }
                  </AnimatePresence>
                </motion.button>
                <span className="text-xs font-bold text-white/60 bg-white/10 px-2 py-1 rounded-full">Test Mode</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="hidden lg:flex lg:w-[52%] relative overflow-hidden"
        style={{ background: 'linear-gradient(145deg, #49225B 0%, #6E3482 50%, #A56ABD 100%)' }}
      >
        <Orb delay={0} style={{ width: 320, height: 320, top: '-60px', left: '-80px', background: 'radial-gradient(circle, #A56ABD88 0%, transparent 70%)' }} />
        <Orb delay={2} style={{ width: 240, height: 240, bottom: '60px', right: '-40px', background: 'radial-gradient(circle, #E7DBEF55 0%, transparent 70%)' }} />
        <Orb delay={4} style={{ width: 160, height: 160, bottom: '200px', left: '80px', background: 'radial-gradient(circle, #6E348266 0%, transparent 70%)' }} />
        <Sparkles />
        <div className="absolute rounded-full border border-white/10 ripple-ring" style={{ width: 420, height: 420, top: '50%', left: '50%' }} />
        <div className="absolute rounded-full border border-white/10 ripple-ring" style={{ width: 300, height: 300, top: '50%', left: '50%', animationDelay: '1.1s' }} />

        <div className="relative z-10 flex flex-col justify-between p-14 text-white w-full">
          <Link to="/login" className="flex items-center gap-2 w-fit group" style={{ color: '#E7DBEF' }}>
            <motion.div whileHover={{ x: -4 }}><FaArrowLeft size={12} /></motion.div>
            <span className="text-sm font-semibold group-hover:text-white transition-colors">Back to Login</span>
          </Link>

          <div>
            <motion.div variants={item} className="mb-10">
              <div className="relative w-fit mb-8">
                <motion.div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center"
                  animate={{ rotate: [0, -8, 8, -8, 0] }}
                  transition={{ duration: 4, repeat: Infinity, repeatDelay: 3 }}
                  style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.3)', boxShadow: '0 8px 32px rgba(73,34,91,0.3)' }}
                >
                  <FaKey size={22} />
                </motion.div>
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
                Forgot<br />Password?
              </h1>
              <p style={{ color: '#E7DBEF', fontSize: '1.05rem', lineHeight: 1.65, maxWidth: 280 }}>
                No stress. Drop your email and we'll send you a secure reset link in seconds.
              </p>
            </motion.div>

            <motion.div variants={item} className="space-y-3">
              {[
                { icon: <FaShieldAlt />, label: 'Encrypted Reset Link', sub: 'Time-limited & one-use only' },
                { icon: <FaEnvelope />, label: 'Instant Delivery', sub: 'Check inbox & spam folder' },
                { icon: <FaLock />, label: 'Safe & Secure', sub: 'Your account stays protected' },
              ].map(({ icon, label, sub }) => (
                <motion.div key={label} whileHover={{ x: 6, scale: 1.02 }} className="feature-pill flex items-center gap-4 px-5 py-3.5 rounded-2xl">
                  <span className="text-lg p-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 shadow-md">{icon}</span>
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
        <div className="absolute pointer-events-none" style={{ width: 400, height: 400, borderRadius: '40% 60% 55% 45% / 50% 45% 55% 50%', background: 'radial-gradient(circle, #A56ABD22 0%, transparent 70%)', top: '-80px', right: '-80px' }} />
        <div className="absolute pointer-events-none" style={{ width: 280, height: 280, borderRadius: '60% 40% 45% 55% / 55% 50% 50% 45%', background: 'radial-gradient(circle, #6E348215 0%, transparent 70%)', bottom: '30px', left: '-40px' }} />
        <Link to="/login" className="lg:hidden flex items-center gap-2 mb-8 self-start" style={{ color: '#6E3482' }}>
          <FaArrowLeft size={12} />
          <span className="text-sm font-semibold">Back to Login</span>
        </Link>
        <AnimatePresence>
          {success && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden"
              style={{ background: 'linear-gradient(135deg, #49225B, #6E3482, #A56ABD)' }}
            >
              <EnvelopeParticles />
              <Sparkles count={24} />
              {[1, 2, 3].map(n => (
                <motion.div
                  key={n}
                  className="absolute rounded-full border border-white/20"
                  style={{ width: 80 * n, height: 80 * n }}
                  animate={{ scale: [1, 1.6, 1], opacity: [0.4, 0, 0.4] }}
                  transition={{ duration: 2.4, repeat: Infinity, delay: n * 0.4 }}
                />
              ))}

              <motion.div
                initial={{ scale: 0, rotate: -30 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', damping: 10, stiffness: 120 }}
                className="text-8xl mb-6 relative z-10"
                style={{ color: '#E7DBEF' }}
              >
                <FaCheckCircle />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-center relative z-10 px-8"
              >
                <h2 className="text-4xl font-black text-white mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Email Sent!
                </h2>
                <p style={{ color: '#E7DBEF99' }}>Check your inbox for the reset link.</p>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  className="mt-6"
                >
                  <Link
                    to="/login"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-black"
                    style={{ background: 'rgba(255,255,255,0.18)', border: '1px solid rgba(255,255,255,0.3)', color: 'white', backdropFilter: 'blur(10px)' }}
                  >
                    <FaArrowLeft size={12} />
                    Back to Login
                  </Link>
                </motion.div>
              </motion.div>
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
          <motion.div variants={item} className="mb-8">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <motion.div
                  className="w-20 h-20 rounded-3xl flex items-center justify-center"
                  whileHover={{ rotate: [0, -10, 10, 0], transition: { duration: 0.5 } }}
                  style={{ background: 'linear-gradient(135deg, #6E3482, #49225B)', boxShadow: '0 12px 36px rgba(110,52,130,0.4), inset 0 1px 0 rgba(255,255,255,0.2)' }}
                >
                  <motion.div
                    animate={{ y: [0, -4, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    <FaKey size={26} color="white" />
                  </motion.div>
                </motion.div>
                {/* Glow ring */}
                <motion.div
                  className="absolute inset-0 rounded-3xl"
                  animate={{ boxShadow: ['0 0 0 0 rgba(110,52,130,0.5)', '0 0 0 12px rgba(110,52,130,0)', '0 0 0 0 rgba(110,52,130,0)'] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>
            </div>

            <h2
              className="font-black mb-1.5 text-center"
              style={{ fontSize: '2.2rem', color: '#49225B', fontFamily: "'Playfair Display', serif", lineHeight: 1.1 }}
            >
              Reset Password
            </h2>
            <p className="text-sm font-medium text-center" style={{ color: '#A56ABD' }}>
              Enter your email to receive a reset link
            </p>
            <AnimatePresence>
              {status.type === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: -10, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: 'auto' }}
                  exit={{ opacity: 0, y: -10, height: 0 }}
                  className="mt-4 px-4 py-3 rounded-2xl text-sm font-semibold flex items-center gap-2"
                  style={{ background: 'rgba(73,34,91,0.08)', border: '1.5px solid #A56ABD55', color: '#49225B' }}
                >
                  <motion.div
                    animate={{ rotate: [0, -10, 10, 0] }}
                    transition={{ duration: 0.4 }}
                  >
                    <FaExclamationTriangle size={14} style={{ color: '#A56ABD' }} />
                  </motion.div>
                  <span>{status.message}</span>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          <div className="space-y-5">
            <motion.div variants={item}>
              <label className="block text-xs font-bold mb-1.5 tracking-wider uppercase" style={{ color: '#6E3482' }}>
                Email Address
              </label>
              <div className="relative">
                <motion.div
                  animate={{ color: focusedField ? '#6E3482' : '#A56ABD', scale: focusedField ? 1.1 : 1 }}
                  className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"
                >
                  <motion.div animate={iconControls}>
                    <FaEnvelope size={13} />
                  </motion.div>
                </motion.div>
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); if (status.type) setStatus({ type: '', message: '' }); }}
                  onFocus={() => setFocusedField(true)}
                  onBlur={() => setFocusedField(false)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSubmit(e)}
                  className="neo-input block w-full pl-11 pr-4 py-4 rounded-2xl text-sm font-medium"
                  style={{ color: '#49225B' }}
                />
                <AnimatePresence>
                  {email.length > 0 && (
                    <motion.div
                      initial={{ scaleX: 0, opacity: 0 }}
                      animate={{ scaleX: 1, opacity: 1 }}
                      exit={{ scaleX: 0, opacity: 0 }}
                      className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full overflow-hidden"
                      style={{ transformOrigin: 'left' }}
                    >
                      <motion.div
                        className="h-full progress-bar"
                        style={{
                          width: validateEmail(email) ? '100%' : `${Math.min(email.length * 3, 85)}%`,
                          background: validateEmail(email) ? 'linear-gradient(90deg, #6E3482, #A56ABD)' : 'linear-gradient(90deg, #A56ABD, #6E3482)',
                        }}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <AnimatePresence>
                {email.length > 0 && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-2 text-xs font-medium flex items-center gap-1"
                    style={{ color: validateEmail(email) ? '#6E3482' : '#A56ABD99' }}
                  >
                    {validateEmail(email) ? (
                      <><motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring' }}>✓</motion.span> Valid email address</>
                    ) : (
                      'Keep typing…'
                    )}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>
            <motion.div variants={item} className="pt-1">
              <motion.button
                whileHover={{ scale: 1.025, y: -2 }}
                whileTap={{ scale: 0.97 }}
                type="button"
                onClick={handleSubmit}
                disabled={isLoading}
                className="neo-btn w-full py-4 rounded-2xl text-white font-black text-sm tracking-wide relative overflow-hidden"
                style={{ opacity: isLoading ? 0.75 : 1, cursor: isLoading ? 'not-allowed' : 'pointer' }}
              >
                {!isLoading && (
                  <motion.div
                    className="absolute inset-0 pointer-events-none"
                    style={{ background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.18) 50%, transparent 60%)' }}
                    animate={{ x: ['-100%', '200%'] }}
                    transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 1.5 }}
                  />
                )}
                {isLoading ? (
                  <span className="flex items-center justify-center gap-3">
                    <span className="spin" style={{ display: 'inline-block', width: 16, height: 16, border: '2.5px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%' }} />
                    Sending Reset Link
                    <LoadingDots />
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <FaPaperPlane size={13} />
                    Send Reset Link
                    <motion.span animate={{ x: [0, 4, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>→</motion.span>
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
          <motion.div variants={item} className="flex items-center justify-between text-sm">
            <Link
              to="/login"
              className="font-bold flex items-center gap-1.5 transition-colors group"
              style={{ color: '#6E3482' }}
            >
              <motion.span className="group-hover:-translate-x-1 transition-transform inline-block"><FaArrowLeft size={10} /></motion.span>
              Back to Login
            </Link>
            <Link to="/register" className="font-black" style={{ color: '#49225B' }}>
              Create account
            </Link>
          </motion.div>
          <motion.div
            variants={item}
            className="mt-5 text-center"
          >
            <motion.p
              className="text-xs font-medium flex items-center justify-center gap-1.5"
              style={{ color: '#A56ABD88' }}
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <FaShieldAlt size={10} />
              Reset link expires in 15 minutes · One-time use only
            </motion.p>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ForgotPasswordRequest;