import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

// ── SVG Icons ──────────────────────────────────────────────────────────────
const IconUser = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
  </svg>
);
const IconMail = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
    <rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
  </svg>
);
const IconPhone = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.18 2 2 0 0 1 3.6 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.6a16 16 0 0 0 6 6l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
  </svg>
);
const IconLock = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
  </svg>
);
const IconKey = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
    <circle cx="7.5" cy="15.5" r="5.5"/><path d="m21 2-9.6 9.6M15.5 7.5l3 3L22 7l-3-3"/>
  </svg>
);
const IconEye = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/>
  </svg>
);
const IconEyeOff = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
    <line x1="1" y1="1" x2="23" y2="23"/>
  </svg>
);
const IconArrowLeft = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" width="14" height="14">
    <path d="M19 12H5M12 5l-7 7 7 7"/>
  </svg>
);
const IconShield = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>
);
const IconCheckCircle = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="88" height="88">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
  </svg>
);
// ─────────────────────────────────────────────────────────────────────────────

// Floating Label Input Component
const FloatingInput = ({ name, type = 'text', label, icon: Icon, value, onChange, required, rightSlot, accentColor = false }) => {
  const [focused, setFocused] = useState(false);
  const isFloated = focused || (value && value.length > 0);

  const borderColor = focused
    ? (accentColor ? '#c084fc' : '#a855f7')
    : 'rgba(255,255,255,0.15)';

  const bgColor = accentColor
    ? 'rgba(192,132,252,0.08)'
    : 'rgba(255,255,255,0.06)';

  return (
    <div style={{ position: 'relative', width: '100%' }}>
      <span style={{
        position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)',
        color: focused ? (accentColor ? '#c084fc' : '#a855f7') : 'rgba(255,255,255,0.4)',
        pointerEvents: 'none', transition: 'color 0.2s', zIndex: 2,
        display: 'flex', alignItems: 'center',
      }}>
        <Icon />
      </span>

      <label style={{
        position: 'absolute',
        left: '46px',
        top: isFloated ? '8px' : '50%',
        transform: isFloated ? 'translateY(0) scale(0.78)' : 'translateY(-50%) scale(1)',
        transformOrigin: 'left center',
        color: isFloated
          ? (accentColor ? '#c084fc' : '#a855f7')
          : 'rgb(255, 255, 255)',
        fontSize: '14px',
        fontWeight: '500',
        pointerEvents: 'none',
        transition: 'all 0.2s cubic-bezier(0.4,0,0.2,1)',
        zIndex: 2,
        letterSpacing: '0.01em',
      }}>
        {label}
      </label>

      <input
        name={name}
        type={type}
        required={required}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        autoComplete="off"
        style={{
          width: '100%',
          paddingTop: '22px',
          paddingBottom: '10px',
          paddingLeft: '46px',
          paddingRight: rightSlot ? '48px' : '16px',
          background: bgColor,
          border: `1.5px solid ${borderColor}`,
          borderRadius: '16px',
          color: '#fff',
          fontSize: '14px',
          fontWeight: '400',
          outline: 'none',
          transition: 'all 0.25s cubic-bezier(0.4,0,0.2,1)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          boxSizing: 'border-box',
          boxShadow: focused
            ? `0 0 0 3px ${accentColor ? 'rgba(192,132,252,0.18)' : 'rgba(168,85,247,0.18)'}`
            : 'none',
        }}
      />

      {rightSlot && (
        <span style={{
          position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)',
          color: 'rgba(255,255,255,0.4)', cursor: 'pointer', zIndex: 2,
          display: 'flex', alignItems: 'center',
          transition: 'color 0.2s',
        }}>
          {rightSlot}
        </span>
      )}
    </div>
  );
};
// ─────────────────────────────────────────────────────────────────────────────

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showSuperSecretKey, setShowSuperSecretKey] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    superSecretKey: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrorMsg('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg('');
    try {
      await register({
        name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        superSecretKey: formData.superSecretKey,
      });
      setIsSuccess(true);
      setTimeout(() => navigate('/login'), 1800);
    } catch (err) {
      setIsSubmitting(false);
      setErrorMsg(err.response?.data?.message || 'Registration failed. Please try again.');
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.15 } },
  };
  const itemVariants = {
    hidden: { y: 28, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100, damping: 18 } },
  };

  return (
    <>
      <style>{`
        input::placeholder { color: transparent !important; }
        input:-webkit-autofill,
        input:-webkit-autofill:hover,
        input:-webkit-autofill:focus {
          -webkit-text-fill-color: #fff !important;
          -webkit-box-shadow: 0 0 0px 1000px rgba(109,52,130,0.5) inset !important;
          transition: background-color 5000s ease-in-out 0s;
        }
        .reg-page * { box-sizing: border-box; }
        @keyframes floatBlob {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-20px) scale(1.04); }
        }
        @keyframes rotateSlow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .sign-up-btn {
          background: linear-gradient(135deg, #7c3aed, #a855f7, #c084fc);
          background-size: 200% auto;
          transition: background-position 0.5s ease, transform 0.15s ease, box-shadow 0.2s ease;
        }
        .sign-up-btn:hover:not(:disabled) {
          background-position: right center;
          box-shadow: 0 12px 40px rgba(168,85,247,0.5) !important;
          transform: translateY(-1px);
        }
        .sign-up-btn:active:not(:disabled) {
          transform: scale(0.98) translateY(0);
        }
        .eye-btn:hover { color: #c084fc !important; }

        /* Mobile back button — sirf tablet/phone pe dikhega */
        .mobile-back-btn {
          display: none;
        }

        /* ── Responsive ── */
        @media (max-width: 1023px) {
          .reg-left-panel { display: none !important; }

          .mobile-back-btn {
            display: inline-flex !important;
            align-items: center;
            gap: 7px;
            color: rgba(192,132,252,0.75);
            text-decoration: none;
            font-size: 13px;
            font-weight: 600;
            letter-spacing: 0.02em;
            width: fit-content;
            margin-bottom: 20px;
            transition: color 0.2s;
            background: rgba(192,132,252,0.08);
            border: 1px solid rgba(192,132,252,0.18);
            border-radius: 20px;
            padding: 7px 14px 7px 10px;
          }
          .mobile-back-btn:hover {
            color: #c084fc;
            background: rgba(192,132,252,0.14);
          }

          .reg-right-panel {
            width: 100% !important;
            padding: 32px 20px !important;
            align-items: center !important;
          }
          .reg-glass-card {
            inset: 16px !important;
          }
          .reg-form-inner {
            max-width: 100% !important;
            width: 100% !important;
            padding: 0 24px !important;
          }
        }

        @media (min-width: 768px) and (max-width: 1023px) {
          .reg-form-inner {
            padding: 0 48px !important;
             max-width: 580px !important; 
          }
            
        }

        @media (max-width: 480px) {
          .reg-right-panel { padding: 24px 16px !important; }
          .reg-glass-card { inset: 12px !important; }
          .reg-form-inner { padding: 0 20px !important; }
        }
      `}</style>

      <motion.div
        initial="hidden" animate="visible" variants={containerVariants}
        className="reg-page"
        style={{
          minHeight: '100vh',
          display: 'flex',
          position: 'relative',
          overflow: 'hidden',
          backgroundColor: '#1a0a22',
        }}
      >
        {/* ── Full-page Background ─────────────────────────── */}
        <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(135deg, #1a0a22 0%, #2d1040 40%, #1e0d35 70%, #120820 100%)',
          }}/>
          <div style={{
            position: 'absolute', top: '-120px', left: '-100px',
            width: '500px', height: '500px', borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(124,58,237,0.45) 0%, transparent 70%)',
            animation: 'floatBlob 8s ease-in-out infinite',
          }}/>
          <div style={{
            position: 'absolute', top: '30%', right: '-80px',
            width: '400px', height: '400px', borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(168,85,247,0.3) 0%, transparent 70%)',
            animation: 'floatBlob 11s ease-in-out infinite 2s',
          }}/>
          <div style={{
            position: 'absolute', bottom: '-100px', left: '30%',
            width: '450px', height: '450px', borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(192,132,252,0.2) 0%, transparent 70%)',
            animation: 'floatBlob 9s ease-in-out infinite 1s',
          }}/>
          <div style={{
            position: 'absolute', bottom: '10%', right: '10%',
            width: '280px', height: '280px', borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(109,40,217,0.35) 0%, transparent 70%)',
            animation: 'floatBlob 13s ease-in-out infinite 3s',
          }}/>
          <div style={{
            position: 'absolute', inset: 0,
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}/>
          <div style={{
            position: 'absolute', top: '10%', right: '15%',
            width: '200px', height: '200px',
            border: '1px solid rgba(168,85,247,0.12)',
            borderRadius: '50%',
            animation: 'rotateSlow 20s linear infinite',
          }}/>
          <div style={{
            position: 'absolute', top: '10%', right: '15%',
            width: '140px', height: '140px',
            margin: '30px',
            border: '1px solid rgba(192,132,252,0.08)',
            borderRadius: '50%',
            animation: 'rotateSlow 14s linear infinite reverse',
          }}/>
          <img
            src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=2070&auto=format&fit=crop"
            alt=""
            aria-hidden="true"
            style={{
              position: 'absolute', inset: 0,
              width: '100%', height: '100%',
              objectFit: 'cover',
              opacity: 0.04,
              mixBlendMode: 'luminosity',
            }}
          />
        </div>

        {/* ── LEFT PANEL ──────────────────────────────────────────── */}
        <motion.div
          className="reg-left-panel"
          initial={{ x: -60, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          style={{
            width: '50%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '48px',
            position: 'relative',
            zIndex: 1,
          }}
        >
          <Link to="/" style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            color: 'rgba(192,132,252,0.7)', textDecoration: 'none',
            fontSize: '13px', fontWeight: '600', letterSpacing: '0.02em',
            transition: 'color 0.2s',
            width: 'fit-content',
          }}
          onMouseEnter={e => e.currentTarget.style.color = '#c084fc'}
          onMouseLeave={e => e.currentTarget.style.color = 'rgba(192,132,252,0.7)'}
          >
            <IconArrowLeft /> Back to Home
          </Link>

          <div>
            <motion.div variants={itemVariants}>
              <h1 style={{
                fontSize: 'clamp(40px, 5vw, 60px)',
                fontWeight: '900',
                color: '#fff',
                lineHeight: '1.05',
                marginBottom: '20px',
                letterSpacing: '-0.03em',
              }}>
                Master Your<br />
                <span style={{
                  background: 'linear-gradient(90deg, #c084fc, #a855f7, #7c3aed)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}>
                  Workflow
                </span>
              </h1>

              <p style={{
                color: 'rgba(196,167,220,0.75)',
                fontSize: '15px',
                lineHeight: '1.7',
                maxWidth: '320px',
                fontWeight: '400',
              }}>
                Join the team and start managing projects, interns and tasks efficiently.
              </p>
            </motion.div>

            {/* Superuser Card */}
            <motion.div
              variants={itemVariants}
              style={{
                marginTop: '40px',
                padding: '22px 24px',
                background: 'rgba(255,255,255,0.04)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                borderRadius: '20px',
                border: '1px solid rgba(168,85,247,0.2)',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
                background: 'linear-gradient(90deg, transparent, #a855f7, transparent)',
              }}/>
              <p style={{
                fontSize: '10px', fontWeight: '800', letterSpacing: '0.15em',
                textTransform: 'uppercase', color: '#a855f7', marginBottom: '8px',
              }}>
                Currently Registering As
              </p>
              <p style={{ fontSize: '26px', fontWeight: '900', color: '#fff', marginBottom: '6px' }}>
                Superuser
              </p>
              <p style={{ fontSize: '13px', color: 'rgba(196,167,220,0.7)', lineHeight: '1.6' }}>
                Superuser — Full system visibility, workspace creation, and management control.
              </p>

              <div style={{
                position: 'absolute', right: '20px', bottom: '20px',
                display: 'grid', gridTemplateColumns: 'repeat(4, 6px)', gap: '4px',
              }}>
                {Array.from({ length: 12 }).map((_, i) => (
                  <div key={i} style={{
                    width: '4px', height: '4px', borderRadius: '50%',
                    background: `rgba(168,85,247,${0.15 + (i % 3) * 0.1})`,
                  }}/>
                ))}
              </div>
            </motion.div>
          </div>

          <p style={{ fontSize: '12px', color: 'rgba(196,167,220,0.35)', fontWeight: '400' }}>
            Task Management System © 2025
          </p>
        </motion.div>

        {/* ── RIGHT PANEL ─────────────────────────────────────────── */}
        <div
          className="reg-right-panel"
          style={{
            width: '50%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '48px 56px',
            position: 'relative',
            zIndex: 1,
          }}
        >
          {/* Glass card */}
          <div
            className="reg-glass-card"
            style={{
              position: 'absolute', inset: '24px',
              background: 'rgba(255,255,255,0.03)',
              backdropFilter: 'blur(14px)',
              WebkitBackdropFilter: 'blur(14px)',
              borderRadius: '28px',
              border: '1px solid rgba(255,255,255,0.07)',
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.06)',
              pointerEvents: 'none',
            }}
          />

          <div style={{
            position: 'absolute', top: '-50px', right: '-50px',
            width: '300px', height: '300px', borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(192,132,252,0.2) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}/>
          <div style={{
            position: 'absolute', bottom: '-30px', left: '10%',
            width: '200px', height: '200px', borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(124,58,237,0.2) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}/>

          {/* ── Success Overlay ──────────────────────────────────── */}
          <AnimatePresence>
            {isSuccess && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{
                  position: 'absolute', inset: 0, zIndex: 50,
                  display: 'flex', flexDirection: 'column',
                  alignItems: 'center', justifyContent: 'center',
                  background: 'rgba(26,10,34,0.95)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  borderRadius: '28px',
                }}
              >
                <motion.div
                  initial={{ scale: 0, rotate: -20 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: 'spring', damping: 12, stiffness: 120 }}
                  style={{ color: '#a855f7' }}
                >
                  <IconCheckCircle />
                </motion.div>
                <h2 style={{ fontSize: '28px', fontWeight: '900', color: '#fff', marginTop: '16px' }}>
                  Account Created!
                </h2>
                <p style={{ color: 'rgba(192,132,252,0.7)', marginTop: '8px', fontSize: '14px' }}>
                  Welcome to the team. Redirecting to login…
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── Form Content ─────────────────────────────────────── */}
          <div
            className="reg-form-inner"
            style={{
              maxWidth: '400px',
              width: '100%',
              margin: '0 auto',
              position: 'relative',
              zIndex: 2,
              padding: '0 8px',
            }}
          >
            {/* ── Mobile/Tablet Back Button ── sirf <= 1023px pe show hoga */}
            <motion.div variants={itemVariants}>
              <Link
                to="/"
                className="mobile-back-btn"
              >
                <IconArrowLeft /> Back to Home
              </Link>
            </motion.div>

            <motion.div variants={itemVariants} style={{ marginBottom: '32px' }}>
              <h2 style={{
                fontSize: 'clamp(28px, 3.5vw, 38px)',
                fontWeight: '900',
                color: '#fff',
                marginBottom: '6px',
                letterSpacing: '-0.025em',
                lineHeight: '1.1',
              }}>
                Create Account
              </h2>
              <p style={{ fontSize: '14px', color: 'rgba(196,167,220,0.6)', fontWeight: '400' }}>
                Join us and start managing your tasks efficiently
              </p>

              {errorMsg && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{
                    marginTop: '14px',
                    padding: '12px 16px',
                    background: 'rgba(220,38,38,0.12)',
                    border: '1px solid rgba(220,38,38,0.3)',
                    borderRadius: '12px',
                    color: '#fca5a5',
                    fontSize: '13px',
                    fontWeight: '500',
                  }}
                >
                  {errorMsg}
                </motion.div>
              )}
            </motion.div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>

              <motion.div variants={itemVariants}>
                <FloatingInput
                  name="fullName" label="Full Name" icon={IconUser}
                  value={formData.fullName} onChange={handleChange} required
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <FloatingInput
                  name="email" type="email" label="Email Address" icon={IconMail}
                  value={formData.email} onChange={handleChange} required
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <FloatingInput
                  name="phone" type="tel" label="Phone Number" icon={IconPhone}
                  value={formData.phone} onChange={handleChange} required
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <FloatingInput
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  label="Password"
                  icon={IconLock}
                  value={formData.password}
                  onChange={handleChange}
                  required
                  rightSlot={
                    <button
                      type="button"
                      className="eye-btn"
                      onClick={() => setShowPassword(!showPassword)}
                      style={{
                        background: 'none', border: 'none', cursor: 'pointer',
                        color: 'rgba(255,255,255,0.4)', padding: 0,
                        display: 'flex', alignItems: 'center',
                      }}
                    >
                      {showPassword ? <IconEyeOff /> : <IconEye />}
                    </button>
                  }
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <FloatingInput
                  name="superSecretKey"
                  type={showSuperSecretKey ? 'text' : 'password'}
                  label="Super Secret Key"
                  icon={IconKey}
                  value={formData.superSecretKey}
                  onChange={handleChange}
                  required
                  accentColor
                  rightSlot={
                    <button
                      type="button"
                      className="eye-btn"
                      onClick={() => setShowSuperSecretKey(!showSuperSecretKey)}
                      style={{
                        background: 'none', border: 'none', cursor: 'pointer',
                        color: 'rgba(255,255,255,0.4)', padding: 0,
                        display: 'flex', alignItems: 'center',
                      }}
                    >
                      {showSuperSecretKey ? <IconEyeOff /> : <IconEye />}
                    </button>
                  }
                />
              </motion.div>

              {/* Secret key hint */}
              <motion.div
                variants={itemVariants}
                style={{
                  display: 'flex', alignItems: 'flex-start', gap: '8px',
                  padding: '10px 14px',
                  background: 'rgba(192,132,252,0.07)',
                  border: '1px solid rgba(192,132,252,0.15)',
                  borderRadius: '12px',
                }}
              >
                <span style={{ color: '#c084fc', flexShrink: 0, marginTop: '1px' }}><IconShield /></span>
                <p style={{ fontSize: '12px', color: 'rgba(196,167,220,0.65)', lineHeight: '1.6', margin: 0 }}>
                  Enter the Super Secret Key provided by your system administrator to construct a master workspace god-mode account.
                </p>
              </motion.div>

              {/* Submit Button */}
              <motion.button
                variants={itemVariants}
                whileTap={{ scale: 0.97 }}
                disabled={isSubmitting}
                type="submit"
                className="sign-up-btn"
                style={{
                  width: '100%',
                  padding: '16px',
                  border: 'none',
                  borderRadius: '16px',
                  color: '#fff',
                  fontSize: '15px',
                  fontWeight: '800',
                  letterSpacing: '0.04em',
                  cursor: isSubmitting ? 'not-allowed' : 'pointer',
                  opacity: isSubmitting ? 0.7 : 1,
                  marginTop: '4px',
                  boxShadow: '0 8px 32px rgba(124,58,237,0.4)',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {isSubmitting ? (
                  <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                    <span style={{
                      width: '16px', height: '16px',
                      border: '2px solid rgba(255,255,255,0.3)',
                      borderTopColor: '#fff',
                      borderRadius: '50%',
                      display: 'inline-block',
                      animation: 'rotateSlow 0.7s linear infinite',
                    }}/>
                    Creating Account…
                  </span>
                ) : 'Sign Up'}
              </motion.button>
            </form>

            <motion.p variants={itemVariants} style={{
              textAlign: 'center',
              marginTop: '24px',
              fontSize: '14px',
              color: 'rgba(196,167,220,0.5)',
            }}>
              Already have an account?{' '}
              <Link to="/login" style={{
                color: '#c084fc',
                fontWeight: '700',
                textDecoration: 'none',
                transition: 'color 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.color = '#e9d5ff'}
              onMouseLeave={e => e.currentTarget.style.color = '#c084fc'}
              >
                Login here
              </Link>
            </motion.p>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Register;