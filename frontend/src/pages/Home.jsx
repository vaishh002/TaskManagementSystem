import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  HiOutlineOfficeBuilding,
  HiOutlineUsers,
  HiOutlineDocumentReport,
  HiOutlineChartBar,
  HiOutlineSparkles,
  HiOutlineArrowNarrowRight,
  HiCheck,
  HiOutlineClock,
  HiOutlineTrendingUp,
  HiOutlineCog,
  HiOutlineViewGrid,
  HiOutlineChip,
  HiOutlineShieldCheck,
  HiOutlineLightningBolt,
} from 'react-icons/hi';

/* ── TYPEWRITER HOOK ── */
const useTypewriter = (words, typingSpeed = 65, pauseMs = 1500, deleteSpeed = 38) => {
  const [displayed, setDisplayed] = useState('');
  const [wordIdx, setWordIdx] = useState(0);
  const [phase, setPhase] = useState('typing');
  useEffect(() => {
    const word = words[wordIdx];
    let timeout;
    if (phase === 'typing') {
      if (displayed.length < word.length) timeout = setTimeout(() => setDisplayed(word.slice(0, displayed.length + 1)), typingSpeed);
      else timeout = setTimeout(() => setPhase('pause'), pauseMs);
    } else if (phase === 'pause') {
      timeout = setTimeout(() => setPhase('deleting'), 100);
    } else if (phase === 'deleting') {
      if (displayed.length > 0) timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), deleteSpeed);
      else { setWordIdx((prev) => (prev + 1) % words.length); setPhase('typing'); }
    }
    return () => clearTimeout(timeout);
  }, [displayed, phase, wordIdx, words, typingSpeed, pauseMs, deleteSpeed]);
  return { displayed };
};

/* ── ANIMATED COUNTER HOOK ── */
const useCountUp = (target, duration = 1800, start = false) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    const numeric = parseFloat(target);
    if (isNaN(numeric) || numeric === 0) { setCount(target); return; }
    const startTime = performance.now();
    const tick = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * numeric));
      if (progress < 1) requestAnimationFrame(tick); else setCount(numeric);
    };
    requestAnimationFrame(tick);
  }, [start, target, duration]);
  return count;
};

const useCountUp247 = (duration = 1800, start = false) => {
  const [display, setDisplay] = useState('0');
  useEffect(() => {
    if (!start) return;
    const startTime = performance.now();
    const tick = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(eased * 24);
      if (progress < 1) { setDisplay(`${current}`); requestAnimationFrame(tick); }
      else { setDisplay('24/7'); }
    };
    requestAnimationFrame(tick);
  }, [start, duration]);
  return display;
};

/* ══════════════════════════════
   DASHBOARD CARD COMPONENT
══════════════════════════════ */
const barData = [3,5,4,7,6,8,5,9,7,10,8,11,9,12,10,13,11,14,12,15,13,14,12,13,11,12,10,11,9,10];

const avatars = [
  { initials: 'JD', bg: 'linear-gradient(135deg,#7c3aed,#a855f7)' },
  { initials: 'MK', bg: 'linear-gradient(135deg,#a855f7,#c084fc)' },
  { initials: 'AL', bg: 'linear-gradient(135deg,#6d28d9,#9333ea)' },
  { initials: '+12', bg: 'rgba(168,85,247,0.15)', color: '#c084fc' },
];

const statCards = [
  { icon: HiOutlineUsers, value: '48', label: 'Team Members' },
  { icon: HiOutlineClock, value: '92%', label: 'On-time Delivery' },
];

const DashboardCard = ({ isDesktop = false }) => (
  <div className="float-dashboard relative w-full">
    <div className="dash-glow-ring" />
    <div
      className="relative rounded-2xl border p-5 shadow-2xl overflow-hidden"
      style={{
        background: 'rgba(15,5,40,0.93)',
        borderColor: 'rgba(168,85,247,0.4)',
        backdropFilter: 'blur(20px)',
        animation: 'dashGlow 3s ease-in-out infinite',
      }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between mb-5 pb-4"
        style={{ borderBottom: '1px solid rgba(168,85,247,0.2)' }}
      >
        <div className="flex items-center gap-2.5">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #7c3aed, #a855f7)' }}
          >
            <HiOutlineChip className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-sm" style={{ color: '#ede9fe' }}>TaskFlow TMS</h3>
            <p className="text-xs" style={{ color: '#c084fc' }}>Enterprise Edition</p>
          </div>
        </div>
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
        </div>
      </div>

      <div className="space-y-4">
        {/* Active Projects block */}
        <div
          className="rounded-xl p-4 border"
          style={{ background: 'rgba(255,255,255,0.06)', borderColor: 'rgba(168,85,247,0.25)' }}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-white">Active Projects</span>
            <span
              className="text-xs font-semibold px-2 py-0.5 rounded-full"
              style={{ color: '#15f388', background: 'rgba(105,240,174,0.12)', border: '1px solid rgba(24,255,144,0.25)' }}
            >+23%</span>
          </div>

          <div className="flex items-center gap-4 mb-2">
            <div className="relative flex-shrink-0 w-14 h-14 flex items-center justify-center">
              <div
                className="absolute inset-0 rounded-full"
                style={{ background: 'conic-gradient(#a855f7 0% 75%, rgba(168,85,247,0.12) 75% 100%)' }}
              />
              <div
                className="absolute inset-[3px] rounded-full"
                style={{ background: 'rgba(15,5,40,0.9)' }}
              />
              <span className="relative z-10 text-lg font-bold text-white">24</span>
            </div>

            <div className="flex-1">
              <div className="flex items-end gap-[3px] h-10">
                {barData.map((h, i) => {
                  const isActive = i >= 22;
                  const pulseClass = isActive ? `bar-pulse-${(i % 3) + 1}` : '';
                  return (
                    <div
                      key={i}
                      className={`flex-1 rounded-sm ${pulseClass}`}
                      style={{
                        height: `${h * 5}%`,
                        background: isActive
                          ? 'linear-gradient(to top, #a855f7, #c084fc)'
                          : 'rgba(168,85,247,0.25)',
                      }}
                    />
                  );
                })}
              </div>
              <div
                className="mt-1 h-[1px] w-full relative overflow-hidden rounded-full"
                style={{ background: 'rgba(168,85,247,0.2)' }}
              >
                <motion.div
                  className="absolute top-0 left-0 h-full rounded-full"
                  style={{ background: 'linear-gradient(90deg, #a855f7, #c084fc)' }}
                  initial={{ width: 0 }}
                  animate={{ width: '75%' }}
                  transition={{ duration: 1.6, delay: 0.6 }}
                />
              </div>
            </div>
          </div>
          <p className="text-xs text-white">8 projects due this week</p>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 gap-3">
          {statCards.map((item, i) =>
            isDesktop ? (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05, y: -2 }}
                className="rounded-xl p-3 border transition-all duration-300"
                style={{ background: 'rgba(255,255,255,0.07)', borderColor: 'rgba(168,85,247,0.4)' }}
              >
                <item.icon className="w-5 h-5 mb-2 text-white" />
                <div className="text-xl font-bold text-white">{item.value}</div>
                <div className="text-xs text-white/70">{item.label}</div>
              </motion.div>
            ) : (
              <div
                key={i}
                className="rounded-xl p-3 border"
                style={{ background: 'rgba(255,255,255,0.07)', borderColor: 'rgba(168,85,247,0.4)' }}
              >
                <item.icon className="w-5 h-5 mb-2 text-white" />
                <div className="text-xl font-bold text-white">{item.value}</div>
                <div className="text-xs text-white/70">{item.label}</div>
              </div>
            )
          )}
        </div>

        {/* Footer */}
        <div
          className="flex items-center justify-between pt-3"
          style={{ borderTop: '1px solid rgba(168,85,247,0.15)' }}
        >
          <div className="flex -space-x-2">
            {avatars.map((av, i) =>
              isDesktop ? (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.15, zIndex: 10 }}
                  className="w-8 h-8 rounded-full border-2 border-white/20 flex items-center justify-center text-xs font-bold cursor-pointer"
                  style={{ background: av.bg, color: av.color || '#fff' }}
                >{av.initials}</motion.div>
              ) : (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full border-2 border-white/20 flex items-center justify-center text-xs font-bold"
                  style={{ background: av.bg, color: av.color || '#fff' }}
                >{av.initials}</div>
              )
            )}
          </div>
          <Link
            to="dashboard"
            className="text-sm font-semibold flex items-center gap-1 text-white/80 hover:text-white transition-colors"
          >
            View Workplace <HiOutlineArrowNarrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  </div>
);

/* ══════════════════ MAIN HOME COMPONENT ══════════════════ */
const Home = () => {
  const statsRef = useRef(null);
  const [statsInView, setStatsInView] = useState(false);

  const typewriterWords = ['Streamline Your Workflow', 'Empower Your Teams', 'Track Progress Seamlessly', 'Close More Deals Faster', 'Achieve More Together'];
  const { displayed } = useTypewriter(typewriterWords);

  /* Stats IntersectionObserver */
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStatsInView(true); },
      { threshold: 0.2 }
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  /* Features scroll reveal — single useEffect, no duplicate */
  useEffect(() => {
    const headerEl = document.querySelector('.feat-header-wrap');
    if (headerEl) {
      const hObs = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          headerEl.querySelectorAll('.header-reveal').forEach((el, i) => {
            setTimeout(() => el.classList.add('visible'), i * 80);
          });
          hObs.disconnect();
        }
      }, { threshold: 0.2 });
      hObs.observe(headerEl);
    }

    const cards = document.querySelectorAll('.feat-section .feat-reveal');
    if (cards.length) {
      const cObs = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = parseInt(entry.target.dataset.idx || '0', 10);
            setTimeout(() => entry.target.classList.add('visible'), idx * 60);
            cObs.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
      cards.forEach((card) => cObs.observe(card));
    }
  }, []);

  const features = [
    { icon: HiOutlineOfficeBuilding, title: 'Project Management', desc: 'Create projects, set deadlines, and monitor progress across teams.' },
    { icon: HiOutlineUsers, title: 'Team Coordination', desc: 'Assign Team Leaders, onboard interns in bulk, and manage hierarchies.' },
    { icon: HiOutlineDocumentReport, title: 'Daily Reporting', desc: 'Date-wise task submissions with status tracking and remarks.' },
    { icon: HiOutlineChartBar, title: 'Analytics Dashboard', desc: 'Role-based dashboards for Admin & Manager with performance visibility.' },
  ];

  return (
    <div className="min-h-screen font-sans overflow-hidden" style={{ background: '#49225b' }}>

{/* ══════════════════════════════
    HERO SECTION
══════════════════════════════ */}
<section className="relative overflow-hidden" style={{ background: '#49225b', minHeight: '100vh', paddingTop: '100px', paddingBottom: '25px' }}>

  <style>{`
    @keyframes float-img1 { 0%,100%{transform:translateY(0px) rotate(-2deg)} 50%{transform:translateY(-14px) rotate(-2deg)} }
    @keyframes float-img2 { 0%,100%{transform:translateY(0px) rotate(1.5deg)} 50%{transform:translateY(-10px) rotate(1.5deg)} }
    @keyframes float-dashboard { 0%,100%{transform:translateY(0px)} 50%{transform:translateY(-8px)} }
    @keyframes dashGlow {
      0%,100%{ box-shadow: 0 0 12px rgba(168,85,247,0.4); }
      50%{ box-shadow: 0 0 28px rgba(168,85,247,0.75); }
    }
    @keyframes scalePulse {
      0%, 100% { opacity: 0.5; transform: scaleY(0.6); }
      50% { opacity: 1; transform: scaleY(1); }
    }
    @keyframes glowPulse {
      0%,100%{ opacity: 0.4; transform: scale(1); }
      50%{ opacity: 0.8; transform: scale(1.03); }
    }
    .float-img1 { animation: float-img1 6s ease-in-out infinite; }
    .float-img2 { animation: float-img2 7.5s ease-in-out infinite 0.8s; }
    .float-dashboard { animation: float-dashboard 5s ease-in-out infinite; }

    .dash-glow-ring {
      position: absolute; inset: -3px; border-radius: 22px; pointer-events: none;
      background: linear-gradient(135deg, #a855f7, #7c3aed, #c084fc);
      filter: blur(6px); animation: glowPulse 3.5s ease-in-out infinite; z-index: 0;
    }

    .bar-pulse-1 { animation: scalePulse 0.8s ease-in-out infinite; }
    .bar-pulse-2 { animation: scalePulse 1.0s ease-in-out infinite; }
    .bar-pulse-3 { animation: scalePulse 1.2s ease-in-out infinite; }

    .hero-wave-bottom { position:absolute; bottom:-2px; left:0; width:100%; overflow:hidden; line-height:0; z-index:20; }
    .hero-wave-bottom svg { display:block; width:100%; }

    .hero-main {
      position: relative; width: 100%; min-height: calc(100vh - 100px);
    }
    .hero-left {
      position: absolute; top: 25%; left: 0; transform: translateY(-50%);
      width: 360px; z-index: 20; padding-left: 12px;
    }
    .hero-center {
      position: absolute; top: 35%; left: 50%; transform: translate(-50%, -50%);
      width: 100%; max-width: 480px; z-index: 15;
      display: flex; flex-direction: column; align-items: center; text-align: center; padding: 0 16px;
    }
    .hero-right {
      position: absolute; top: 25%; right: 0; transform: translateY(-50%);
      width: 300px; z-index: 10; padding-right: 16px;
      display: flex; flex-direction: column; gap: 14px; align-items: flex-end;
    }
    .hero-mobile-dashboard { display: none; }
    .hero-tablet-img { display: none; }
    .hero-tablet-dashboard { display: none; }

    @media (max-width: 1024px) {
      .hero-main {
        display: flex; flex-direction: column; align-items: center;
        min-height: calc(100vh - 100px); padding-bottom: 60px; gap: 0;
      }
      .hero-left { display: none; }
      .hero-right { display: none; }
      .hero-center {
        position: static; transform: none; max-width: 620px; width: 100%;
        padding: 20px 24px 0; margin-bottom: 0;
      }
      .hero-center h1 {
        font-size: clamp(2.2rem, 5vw, 3.2rem) !important;
        margin-bottom: 1rem !important; white-space: normal !important;
      }
      .hero-tablet-img {
        display: block; width: 100%; max-width: 560px;
        padding: 0 24px; margin-top: 16px; margin-bottom: 4px;
      }
      .hero-tablet-dashboard {
        display: block; width: 100%; max-width: 400px;
        padding: 0 24px; margin-top: 24px; margin-bottom: 20px;
      }
    }

    @media (max-width: 640px) {
      .hero-main {
        display: flex; flex-direction: column; align-items: center;
        padding: 0 0 80px; min-height: unset;
      }
      .hero-center {
        position: static; transform: none; max-width: 100%; width: 100%;
        padding: 20px 20px 0; margin-bottom: 0;
      }
      .hero-center h1 {
        font-size: 2rem !important; white-space: normal !important; margin-bottom: 1rem !important;
      }
      .hero-left { display: none; }
      .hero-right { display: none; }
      .hero-tablet-img { display: none; }
      .hero-tablet-dashboard { display: none; }
      .hero-mobile-dashboard { display: block; width: 100%; padding: 20px 16px 0; }
    }
  `}</style>

  {/* BG image */}
  <div className="absolute inset-0" style={{ zIndex: 0 }}>
    <img
      src="https://img.freepik.com/premium-photo/close-up-hands-business-meeting_93675-11165.jpg?w=1480"
      alt="bg"
      className="w-full h-full object-cover object-center"
      style={{ opacity: 0.55 }}
    />
    <div className="absolute inset-0" style={{ background: 'rgba(53,18,68,0.65)' }} />
  </div>

  {/* Dot pattern */}
  <div className="absolute inset-0" style={{
    zIndex: 1,
    backgroundImage: 'radial-gradient(circle, rgba(220,180,255,0.08) 1px, transparent 1px)',
    backgroundSize: '32px 32px',
  }} />

  <div className="hero-main relative" style={{ zIndex: 10 }}>

    {/* CENTER */}
    <div className="hero-center">
      <motion.h1
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
        style={{
          fontSize: 'clamp(2.8rem, 4.5vw, 4.2rem)', fontWeight: 800, color: '#ffffff',
          lineHeight: 1.15, marginBottom: '1rem', whiteSpace: 'nowrap',
        }}
      >
        Task{' '}
        <span style={{ background: 'linear-gradient(135deg, #e0a8ff 0%, #c46cff 50%, #a855f7 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Management{' '}
        </span>
        System
      </motion.h1>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
        className="h-9 flex items-center justify-center mb-3">
        <span className="text-base sm:text-lg font-semibold" style={{ color: 'rgba(224,168,255,0.90)' }}>
          {displayed}
          <motion.span animate={{ opacity: [1, 0, 1] }} transition={{ repeat: Infinity, duration: 0.75 }}
            className="inline-block ml-0.5 w-[2px] h-5 align-middle rounded-sm"
            style={{ background: '#e0a8ff' }} />
        </span>
      </motion.div>

      <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.35 }}
        className="text-base sm:text-lg mb-5 leading-relaxed"
        style={{ color: 'rgba(255,255,255,0.81)', maxWidth: 460 }}>
        Role-based project management for modern organizations. Streamline projects, empower teams, and track daily work with intelligent monitoring.
      </motion.p>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.45 }}
        className="flex flex-wrap justify-center gap-5 mb-5">
        <Link to="/register"
          className="group relative px-7 py-3 text-white rounded-xl font-semibold flex items-center gap-2 transition-all duration-300 hover:scale-105 overflow-hidden shadow-lg"
          style={{ background: 'linear-gradient(135deg, #7c3aed, #a855f7)' }}>
          <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: 'linear-gradient(135deg, #6d28d9, #9333ea)' }} />
          <span className="relative z-10 text-sm">Get Started</span>
          <motion.span className="relative z-10" animate={{ x: [0, 4, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
            <HiOutlineArrowNarrowRight className="w-4 h-4" />
          </motion.span>
        </Link>
        <Link to="/about"
          className="px-7 py-3 rounded-xl font-semibold text-sm transition-all duration-300 hover:scale-105"
          style={{ border: '2px solid rgba(224,168,255,0.40)', color: '#e0a8ff', background: 'rgba(224,168,255,0.08)' }}>
          Learn More
        </Link>
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.65 }}
        className="flex flex-wrap justify-center gap-6">
        {[
          { icon: HiOutlineShieldCheck, text: 'Enterprise Secure' },
          { icon: HiOutlineLightningBolt, text: 'Lightning Fast' },
          { icon: HiCheck, text: 'Free 14-day Trial' },
        ].map((item, i) => (
          <span key={i} className="flex items-center gap-1.5 text-xs font-medium" style={{ color: 'rgba(255,255,255,0.50)' }}>
            <item.icon className="w-3.5 h-3.5" style={{ color: '#d8baf5' }} />{item.text}
          </span>
        ))}
      </motion.div>
    </div>

    {/* TABLET IMAGE */}
    <div className="hero-tablet-img">
      <div className="float-img1">
        <div style={{ borderRadius: 14, overflow: 'hidden', border: '2px solid rgb(254,254,254)', boxShadow: '0 16px 40px rgba(0,0,0,0.45)' }}>
          <img
            src="https://img.freepik.com/premium-photo/team-businesspeople-giving-high-five_107420-83031.jpg?w=1060"
            alt="team meeting"
            style={{ width: '100%', height: 200, objectFit: 'cover', objectPosition: 'center', display: 'block' }}
          />
          <div style={{ background: 'rgba(15,5,40,0.92)', padding: '8px 12px', borderTop: '1px solid rgba(168,85,247,0.2)' }}>
            <div style={{ color: '#e0a8ff', fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Team Collaboration</div>
            <div style={{ color: 'rgba(255,255,255,0.55)', fontSize: 9, marginTop: 2 }}>Real-time project tracking</div>
          </div>
        </div>
      </div>
    </div>

    {/* TABLET DASHBOARD */}
    <div className="hero-tablet-dashboard">
      <DashboardCard />
    </div>

    {/* MOBILE DASHBOARD */}
    <div className="hero-mobile-dashboard">
      <DashboardCard />
    </div>

    {/* LEFT — Desktop */}
    <motion.div
      className="hero-left"
      initial={{ opacity: 0, x: -60 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.2, type: 'spring', stiffness: 80 }}
    >
      <DashboardCard isDesktop />
    </motion.div>

    {/* RIGHT — Desktop */}
    <motion.div
      className="hero-right"
      initial={{ opacity: 0, x: 60 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, type: 'spring', stiffness: 80 }}
    >
      <div className="float-img1 relative w-full">
        <div style={{ borderRadius: 14, overflow: 'hidden', border: '2px solid rgb(254,254,254)', boxShadow: '0 16px 40px rgba(0,0,0,0.45)' }}>
          <img src="https://img.freepik.com/premium-photo/team-businesspeople-giving-high-five_107420-83031.jpg?w=1060" alt="team meeting" style={{ width: '100%', height: 170, objectFit: 'cover', objectPosition: 'center', display: 'block' }} />
          <div style={{ background: 'rgba(15,5,40,0.92)', padding: '8px 12px', borderTop: '1px solid rgba(168,85,247,0.2)' }}>
            <div style={{ color: '#e0a8ff', fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Team Collaboration</div>
            <div style={{ color: 'rgba(255,255,255,0.55)', fontSize: 9, marginTop: 2 }}>Real-time project tracking</div>
          </div>
        </div>
      </div>
      <div className="float-img2 relative" style={{ width: '85%', marginLeft: 'auto' }}>
        <div style={{ borderRadius: 12, overflow: 'hidden', border: '2px solid rgba(255,255,255,0.12)', boxShadow: '0 12px 32px rgba(0,0,0,0.5)' }}>
          <img src="https://img.freepik.com/premium-photo/economy-concept_700248-12865.jpg?w=1480" alt="analytics" style={{ width: '100%', height: 120, objectFit: 'cover', display: 'block' }} />
          <div style={{ background: 'rgba(15,5,40,0.88)', padding: '7px 10px', borderTop: '1px solid rgba(168,85,247,0.15)' }}>
            <div style={{ color: '#c084fc', fontSize: 9, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Analytics View</div>
          </div>
        </div>
      </div>
    </motion.div>

  </div>

  {/* Wave */}
  <div className="hero-wave-bottom">
    <svg viewBox="0 0 1440 90" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0,0 C240,90 480,0 720,60 C960,120 1200,20 1440,70 L1440,90 L0,90 Z" fill="#f2e4f8"/>
    </svg>
  </div>

</section>

{/* ══════════════════════════════
    HIERARCHY SECTION
══════════════════════════════ */}
<section className="py-14 px-4 relative overflow-hidden" style={{ background: '#f2e4f8', paddingBottom:  '40px' }}>

  <style>{`
    .hier-card {
      background: #49225b; border-radius: 24px; overflow: hidden;
      width: 235px; flex-shrink: 0; cursor: pointer;
      transition: transform 0.35s ease, box-shadow 0.35s ease, width 0.35s ease;
      box-shadow: 0 8px 32px rgba(73,34,91,0.28);
      position: relative; display: flex; flex-direction: column;
    }
    .hier-card:hover {
      transform: translateY(-8px) scale(1.04);
      box-shadow: 0 24px 60px rgba(73,34,91,0.45), 0 0 36px rgba(168,85,247,0.28);
      width: 248px;
    }
    .hier-card-img-wrap {
      width: 100%; padding: 8px 8px 0 8px; box-sizing: border-box;
      background: #49225b; position: relative; flex-shrink: 0;
    }
    .hier-card-img-wrap img {
      width: 100%; height: 190px; object-fit: cover; object-position: center center;
      display: block; border-radius: 14px;
      transition: transform 0.45s ease; background: #3d1050;
    }
    .hier-card:hover .hier-card-img-wrap img { transform: scale(1.08); }
    .hier-img-overlay {
      position: absolute; inset: 8px 8px 0 8px;
      background: rgba(61,15,84,0.22); pointer-events: none;
      transition: opacity 0.35s ease; border-radius: 14px 14px 0 0;
    }
    .hier-card:hover .hier-img-overlay { opacity: 0; }
    .hier-shine {
      position: absolute; inset: 8px 8px 0 8px;
      background: linear-gradient(120deg, transparent 30%, rgba(255,255,255,0.38) 50%, transparent 70%);
      transform: translateX(-100%); pointer-events: none; transition: none; border-radius: 14px 14px 0 0;
    }
    .hier-card:hover .hier-shine { animation: shineMove 0.65s ease forwards; }
    @keyframes shineMove { 0%{transform:translateX(-100%)} 100%{transform:translateX(100%)} }
    .hier-card-body {
      padding: 16px 16px 20px; display: flex; align-items: flex-start;
      justify-content: space-between; gap: 10px; flex: 1;
    }
    .hier-card-left { flex: 1; min-width: 0; }
    .hier-card-title { font-size: 17px; font-weight: 800; color: #ffffff; margin-bottom: 6px; line-height: 1.2; }
    .hier-card-desc { font-size: 11.5px; color: rgba(255,255,255,0.58); line-height: 1.5; }
    .hier-icon-wrap { flex-shrink: 0; display: flex; flex-direction: column; align-items: center; gap: 8px; padding-top: 2px; }
    .hier-icon-badge {
      width: 44px; height: 44px; border-radius: 12px; background: rgba(180,130,210,0.18);
      border: 2px solid rgba(255,255,255,0.85); display: flex; align-items: center; justify-content: center;
      transition: transform 0.35s ease;
    }
    .hier-card:hover .hier-icon-badge { transform: rotate(14deg) scale(1.10); }

    .hier-row { display: flex; align-items: center; justify-content: center; gap: 20px; flex-wrap: nowrap; }

    @media (max-width: 1024px) {
      .hier-row { display: grid; grid-template-columns: repeat(2, auto); justify-content: center; gap: 80px; }
      .hier-card { width: 280px; }
      .hier-card:hover { width: 292px; }
      .hier-card-img-wrap img { height: 170px; }
    }

    @media (max-width: 640px) {
      .hier-row { display: flex; flex-direction: column; align-items: center; gap: 20px; }
      .hier-card { width: 290px; margin: 0 auto; }
      .hier-card:hover { width: 290px; }
    }
  `}</style>

  <div className="max-w-6xl mx-auto relative z-10">

    <div className="text-center mb-16">
      <motion.h2
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-3xl sm:text-4xl font-bold mb-4"
        style={{ color: '#49225b' }}
      >
        Clear Role-Based Hierarchy
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="max-w-xl mx-auto text-base"
        style={{ color: '#7a4d8a' }}
      >
        Streamlined management flow from strategic oversight to operational execution
      </motion.p>
    </div>

    {(() => {
      const roles = [
        { title: 'Admin', desc: 'Full platform control & strategic oversight of all operations.', img: 'https://img.freepik.com/premium-vector/man-sits-desk-with-laptop-plant-background_634677-8258.jpg?w=600', icon: <HiOutlineShieldCheck className="w-5 h-5" style={{ color: '#d7cade' }} /> },
        { title: 'Manager', desc: 'Drives strategy, planning & team direction across departments.', img: 'https://img.freepik.com/free-vector/expert-marketing-broker-stock-trader-present-stock-market-year-showing-growth-rates-board-isolated_1150-52742.jpg?w=600', icon: <HiOutlineChartBar className="w-5 h-5" style={{ color: '#d7cade' }} /> },
        { title: 'Team Leader', desc: 'Coordinates tasks, guides members & reports to management.', img: 'https://img.freepik.com/free-vector/tiny-business-people-manager-tasks-goals-accomplishment-chart-task-management-project-managers-tool-task-management-software-concept_335657-2432.jpg?w=600', icon: <HiOutlineUsers className="w-5 h-5" style={{ color: '#d7cade' }} /> },
        { title: 'Interns', desc: 'Handles task execution, learning & daily submissions.', img: 'https://img.freepik.com/free-vector/business-team-communicating-via-social-media_74855-5439.jpg?w=600', icon: <HiOutlineCog className="w-5 h-5" style={{ color: '#d7cade' }} /> },
      ];
      return (
        <div className="hier-row">
          {roles.map((role, i) => (
            <motion.div key={role.title} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15, type: 'spring', stiffness: 80, damping: 14 }} style={{ display: 'flex', alignSelf: 'stretch' }}>
              <div className="hier-card">
                <div className="hier-card-img-wrap">
                  <img src={role.img} alt={role.title} loading="lazy" />
                  <div className="hier-img-overlay" />
                  <div className="hier-shine" />
                </div>
                <div className="hier-card-body">
                  <div className="hier-card-left">
                    <div className="hier-card-title">{role.title}</div>
                    <div className="hier-card-desc">{role.desc}</div>
                  </div>
                  <div className="hier-icon-wrap">
                    <div className="hier-icon-badge">{role.icon}</div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      );
    })()}

    <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.65 }} className="mt-14 text-center">
      <div className="inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full" style={{ background: 'rgba(73,34,91,0.10)', border: '1.5px solid rgba(73,34,91,0.20)' }}>
        <HiCheck className="w-4 h-4" style={{ color: '#7c3aed' }} />
        <span className="text-sm font-medium" style={{ color: '#6b2d82' }}>Clear responsibility flow from leadership to execution level</span>
      </div>
    </motion.div>

  </div>
</section>

{/* ══════════════════════════════
    FEATURES SECTION
══════════════════════════════ */}
<section className="feat-section relative py-18 px-4 overflow-hidden bg-gradient-to-b from-white to-slate-50 border-t border-slate-100" style={{ paddingBottom: '48px' }}>

  <div style={{
    position: 'absolute', inset: 0, zIndex: 0,
    backgroundImage: 'url(https://img.freepik.com/premium-vector/dots-line-connection-molecules-structure-science-medicine-concept-background-design_618588-787.jpg?w=2000)',
    backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.6
  }} />

  <style>{`
    @keyframes rippleEffect { to { transform: scale(4); opacity: 0; } }
    .feat-card {
      position: relative; border-radius: 20px; overflow: hidden;
      background: #ffffff; border: 1.5px solid #e2e8f0; cursor: pointer;
      display: flex; flex-direction: column;
      will-change: transform, box-shadow;
      transition: border-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease;
    }
    .feat-card:hover { border-color: #49225b; box-shadow: 0 20px 50px rgba(73,34,91,0.18); transform: translateY(-8px); }
    .feat-card::before {
      content: ''; position: absolute; bottom: -100%; left: 0; right: 0; height: 100%;
      background: linear-gradient(to top, #2e1139, #49225b, #6b3380);
      transition: bottom 0.45s cubic-bezier(0.4,0,0.2,1); z-index: 0;
    }
    .feat-card:hover::before { bottom: 0; }
    .feat-img-wrap { position: relative; z-index: 1; width: 100%; height: 180px; overflow: visible; flex-shrink: 0; }
    .feat-img-wrap img {
      width: 100%; height: 180px; object-fit: cover; object-position: center top; display: block;
      will-change: transform, filter;
      transition: transform 0.45s ease, filter 0.35s ease;
      filter: brightness(0.93) saturate(1.1);
    }
    .feat-card:hover .feat-img-wrap img { transform: scale(1.05); filter: brightness(0.7) saturate(1.25); }
    .feat-icon-circle {
      position: absolute; bottom: -28px; left: 50%; transform: translateX(-50%);
      width: 56px; height: 56px; border-radius: 50%; background: #49225b;
      border: 4px solid #ffffff; display: flex; align-items: center; justify-content: center;
      z-index: 10; will-change: transform, background;
      transition: background 0.3s ease, transform 0.3s cubic-bezier(.34,1.56,.64,1), border-color 0.3s ease;
      box-shadow: 0 4px 16px rgba(73,34,91,0.25);
    }
    .feat-card:hover .feat-icon-circle {
      background: rgba(255,255,255,0.25); border-color: rgba(255,255,255,0.6);
      transform: translateX(-50%) scale(1.12);
    }
    .feat-icon-circle svg { color: #ffffff; width: 22px; height: 22px; }
    .feat-card-content {
      position: relative; z-index: 2; padding: 42px 20px 24px; flex: 1;
      display: flex; flex-direction: column; align-items: center; text-align: center;
    }
    .feat-title { font-size: 15px; font-weight: 700; color: #49225b; margin-bottom: 10px; transition: color 0.25s ease; }
    .feat-card:hover .feat-title { color: #ffffff; }
    .feat-desc { font-size: 13.5px; line-height: 1.65; color: #64748b; transition: color 0.25s ease; flex: 1; }
    .feat-card:hover .feat-desc { color: rgba(255,255,255,0.78); }
    .feat-num {
      position: absolute; top: 10px; right: 14px; z-index: 4;
      font-size: 11px; font-weight: 700; color: rgba(73,34,91,0.75);
      background: rgba(255,255,255,0.9); border-radius: 999px; padding: 2px 9px;
      backdrop-filter: blur(6px); transition: color 0.25s ease, background 0.25s ease;
    }
    .feat-card:hover .feat-num { color: rgba(255,255,255,0.95); background: rgba(73,34,91,0.4); }
    .feat-divider {
      width: 40px; height: 3px; border-radius: 2px;
      background: linear-gradient(90deg, #49225b, #a855c8);
      margin: 0 auto 12px; transition: background 0.25s ease;
    }
    .feat-card:hover .feat-divider { background: rgba(255,255,255,0.5); }
    .feat-reveal {
      opacity: 0; transform: translateY(24px); will-change: opacity, transform;
      transition: opacity 0.5s ease, transform 0.5s ease;
    }
    .feat-reveal.visible { opacity: 1; transform: translateY(0); }
    .header-reveal {
      opacity: 0; transform: translateY(16px); will-change: opacity, transform;
      transition: opacity 0.45s ease, transform 0.45s ease;
    }
    .header-reveal.visible { opacity: 1; transform: translateY(0); }
    @media (max-width: 768px) {
      .feat-reveal { transform: translateY(16px); transition: opacity 0.4s ease, transform 0.4s ease; }
      .feat-card:hover { transform: translateY(-4px); }
    }
  `}</style>

  <div className="relative z-10 max-w-7xl mx-auto">

    <div className="feat-header-wrap text-center mb-16">
      <h2 className="header-reveal text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 text-slate-800">
        Everything You Need to Succeed
      </h2>
      <p className="header-reveal max-w-2xl mx-auto text-base sm:text-lg text-slate-500">
        Comprehensive tools for project management, team coordination, and performance tracking
      </p>
    </div>

    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
      {features.map((feature, idx) => {
        const vectorImages = [
          "https://img.freepik.com/premium-vector/technology-background_1302-15113.jpg?w=1480",
          "https://img.freepik.com/free-vector/teamwork-characters-operator-crew-front-screen-presentations_33099-1621.jpg?w=1060",
          "https://img.freepik.com/free-vector/online-education-learning-open-book-man-reading-tutorial-businessman_39422-674.jpg?w=1060",
          "https://img.freepik.com/premium-vector/vecteezy-linetechnology-background-df0622_1318093-14093.jpg?w=1060"
        ];
        return (
          <div
            key={idx}
            className="feat-card feat-reveal"
            data-idx={idx}
            onClick={(e) => {
              const btn = e.currentTarget;
              const circle = document.createElement('span');
              const diameter = Math.max(btn.clientWidth, btn.clientHeight);
              const rect = btn.getBoundingClientRect();
              circle.style.cssText = `position:absolute;border-radius:50%;background:rgba(255,255,255,0.25);transform:scale(0);animation:rippleEffect 0.6s linear;pointer-events:none;z-index:5;width:${diameter}px;height:${diameter}px;left:${e.clientX-rect.left-diameter/2}px;top:${e.clientY-rect.top-diameter/2}px`;
              btn.appendChild(circle);
              setTimeout(() => circle.remove(), 650);
            }}
          >
            <span className="feat-num">0{idx + 1}</span>
            <div className="feat-img-wrap" style={{ position: 'relative' }}>
              <img src={vectorImages[idx]} alt={feature.title} loading="lazy" />
              <div className="feat-icon-circle">
                <feature.icon style={{ color: '#ffffff', width: '22px', height: '22px' }} />
              </div>
            </div>
            <div className="feat-card-content">
              <div className="feat-divider" />
              <h3 className="feat-title">{feature.title}</h3>
              <p className="feat-desc">{feature.desc}</p>
            </div>
          </div>
        );
      })}
    </div>

  </div>
</section>

{/* ══════════════════════════════
    STATS SECTION
══════════════════════════════ */}
<section ref={statsRef} className="py-18 px-4 relative z-10 overflow-hidden" style={{ background: 'linear-gradient(135deg,#f8faff 0%,#ffffff 50%,#f0f4ff 100%)', paddingBottom: '48px' }}>

  <div style={{
    position: 'absolute', inset: 0, zIndex: 0,
    backgroundImage: 'url(https://img.freepik.com/premium-vector/light-purple-vector-template-with-circles-blurred-bubbles-abstract-background-with-colorful_633888-496.jpg?w=2000)',
    backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.2
  }} />

  <style>{`
    @property --angle { syntax:'<angle>'; initial-value:0deg; inherits:false; }
    @keyframes rotateBorder { to { --angle:360deg; } }
    .stat-card-wrap { position:relative; border-radius:24px; padding:2px; background:conic-gradient(from var(--angle),#e2e8f0 0%,#49225b 25%,#e2e8f0 50%,#6e3482 75%,#a56abd 100%); animation:rotateBorder 4s linear infinite; cursor:pointer; }
    .stat-card-wrap:nth-child(2){animation-duration:5s;} .stat-card-wrap:nth-child(3){animation-duration:3.5s;} .stat-card-wrap:nth-child(4){animation-duration:6s;}
    .stat-card-inner { border-radius:22px; overflow:hidden; height:300px; position:relative; }
    .stat-card-inner .stat-img { position:absolute; inset:0; background-size:cover; background-position:center; transition:transform 0.6s cubic-bezier(0.4,0,0.2,1); }
    .stat-card-wrap:hover .stat-img { transform:scale(1.1); }
    .stat-card-inner .stat-overlay { position:absolute; inset:0; background:linear-gradient(180deg,rgba(73,34,91,0.15) 0%,rgba(73,34,91,0.45) 50%,rgba(73,34,91,0.82) 100%); }
    .stat-icon-box { width:48px; height:48px; border-radius:14px; background:rgba(73,34,91,0.15); border:1px solid rgba(73,34,91,0.4); display:flex; align-items:center; justify-content:center; backdrop-filter:blur(6px); transition:background 0.3s ease,transform 0.3s cubic-bezier(.34,1.56,.64,1); }
    .stat-card-wrap:hover .stat-icon-box { background:rgba(73,34,91,0.35); transform:scale(1.1) rotate(6deg); }
    .stat-value { font-size:2.6rem; font-weight:800; color:#ffffff; letter-spacing:-1px; line-height:1; text-shadow:0 2px 12px rgba(0,0,0,0.3); }
    .stat-trend { display:inline-flex; align-items:center; gap:4px; font-size:11px; font-weight:700; padding:3px 10px; border-radius:20px; background:rgba(73,34,91,0.25); border:1px solid rgba(165,106,189,0.4); color:#ffffff; }
    .stat-progress-bg { height:3px; background:rgba(255,255,255,0.15); border-radius:3px; overflow:hidden; margin-top:12px; }
    .stat-progress-fill { height:100%; border-radius:3px; background:linear-gradient(90deg,#6e3482,#a56abd); width:0%; transition:width 1.8s cubic-bezier(0.4,0,0.2,1); }
    .stat-dot { position:absolute; top:14px; right:14px; width:8px; height:8px; border-radius:50%; background:#a56abd; animation:dotPulse 2s ease-in-out infinite; z-index:5; }
    @keyframes dotPulse { 0%,100%{box-shadow:0 0 0 0 rgba(165,106,189,0.5);} 50%{box-shadow:0 0 0 6px rgba(165,106,189,0);} }
  `}</style>

  <div className="max-w-7xl mx-auto relative z-10">
    <div className="text-center mb-16">
      <motion.h2 initial={{ opacity: 0, y: 20 }} animate={statsInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1, duration: 0.5 }}
        className="text-3xl sm:text-4xl font-bold text-slate-800 mb-3">Numbers that speak for themselves</motion.h2>
      <motion.p initial={{ opacity: 0, y: 16 }} animate={statsInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.2, duration: 0.5 }}
        className="text-slate-500 text-base max-w-xl mx-auto">Real impact across organizations, teams, and daily operations</motion.p>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {[
        { value: '500+', label: 'Active Organizations', icon: HiOutlineOfficeBuilding, trend: '+28%', progress: 72, img: 'https://img.freepik.com/premium-photo/symbolizing-business-communication-teamwork-entrepreneur_980716-3369.jpg?w=1480', sub: 'Growing every month' },
        { value: '10000+', label: 'Projects Managed', icon: HiOutlineDocumentReport, trend: '+156%', progress: 88, img: 'https://img.freepik.com/premium-photo/high-angle-view-business-people-working-table_36325-8307.jpg?w=1480', sub: 'Across all industries' },
        { value: '98%', label: 'Satisfaction Rate', icon: HiOutlineTrendingUp, trend: '+12%', progress: 98, img: 'https://img.freepik.com/premium-photo/users-rate-their-service-experience-online-application-customer-satisfaction-survey-concept_150418-1311.jpg?w=1480', sub: 'Based on user reviews' },
        { value: '24/7', label: 'Support Available', icon: HiOutlineClock, trend: 'Always On', progress: 100, img: 'https://img.freepik.com/premium-photo/support-helping-customer-service-advice-concept_53876-122881.jpg?w=1480', sub: 'Dedicated expert team' },
      ].map((stat, idx) => {
        const isSpecial = stat.value === '24/7';
        const rawValue = isSpecial ? '0' : stat.value.replace(/[^0-9.]/g, '');
        const suffix = isSpecial ? '' : stat.value.replace(/[0-9.]/g, '');
        const isNumeric = !isSpecial && rawValue !== '';
        const count = useCountUp(Number(rawValue), 1800, statsInView);
        const count247 = useCountUp247(1800, isSpecial && statsInView);
        return (
          <motion.div key={idx} initial={{ opacity: 0, y: 40 }} animate={statsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: idx * 0.13, type: 'spring', stiffness: 85, damping: 14 }} className="stat-card-wrap">
            <div className="stat-card-inner">
              <span className="stat-dot" />
              <div className="stat-img" style={{ backgroundImage: `url(${stat.img})` }} />
              <div className="stat-overlay" />
              <div className="relative z-10 h-full flex flex-col justify-between p-5">
                <div className="stat-icon-box">
                  <stat.icon className="w-5 h-5" style={{ color: '#f7f3f9' }} />
                </div>
                <div>
                  <span className="stat-trend mb-3 inline-flex">
                    <HiOutlineTrendingUp className="w-3 h-3" />{stat.trend}
                  </span>
                  <div className="stat-value mt-1">
                    {isSpecial ? count247 : isNumeric ? `${count}${suffix}` : stat.value}
                  </div>
                  <p className="text-white/90 text-sm font-semibold mt-1 mb-0.5">{stat.label}</p>
                  <p className="text-white/50 text-xs">{stat.sub}</p>
                  <div className="stat-progress-bg">
                    <div className="stat-progress-fill" style={{ width: statsInView ? `${stat.progress}%` : '0%' }} />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>

    <motion.div initial={{ opacity: 0, y: 20 }} animate={statsInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.7, duration: 0.5 }} className="mt-14 flex flex-wrap justify-center gap-4">
      {['No credit card required', 'Free 14-day trial', 'Cancel anytime', '24/7 support'].map((item, i) => (
        <motion.div key={i} whileHover={{ scale: 1.05, y: -2 }}
          className="flex items-center gap-2 rounded-full px-5 py-2 text-sm font-medium cursor-default"
          style={{ background: '#ffffff', border: '1.5px solid rgba(73,34,91,0.15)', color: '#475569', boxShadow: '0 2px 12px rgba(73,34,91,0.06)' }}>
          <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: '#49225b' }} />
          {item}
        </motion.div>
      ))}
    </motion.div>
  </div>
</section>

{/* ══════════════════════════════
    CTA SECTION
══════════════════════════════ */}
<section className="py-18 px-4 relative z-10" style={{ background: '#f6f4f8', paddingBottom: 'calc(6rem + 25px)' }}>
  <style>{`
    .cta-box:hover .cta-bg-img { transform: scale(1) !important; }
  `}</style>

  <div className="max-w-5xl mx-auto">
    <motion.div
      initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
      className="cta-box relative overflow-hidden rounded-3xl shadow-2xl"
      style={{ isolation: 'isolate' }}
    >
      <div className="cta-bg-img absolute inset-0" style={{ backgroundImage: `url('https://img.freepik.com/premium-vector/business-information-vector-pattern_702967-2530.jpg?w=1480')`, backgroundSize: 'cover', backgroundPosition: 'center', transform: 'scale(1.08)', transition: 'transform 0.7s ease-out', zIndex: 0 }} />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(73,34,91,0.92) 0%, rgba(73,34,91,0.85) 50%, rgba(73,34,91,0.92) 100%)', zIndex: 1 }} />
      <div className="absolute inset-0" style={{ backgroundImage: `radial-gradient(circle,rgba(255,255,255,0.05) 1px,transparent 1px)`, backgroundSize: '24px 24px', zIndex: 2 }} />

      <div className="relative p-8 sm:p-12 md:p-16 text-center text-white" style={{ zIndex: 3 }}>
        <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
          className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-6 text-sm font-medium"
          style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(8px)' }}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4" style={{ color: '#fbbf24' }}>
            <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6L12 2z" />
          </svg>
          Start your journey today
        </motion.div>

        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="text-2xl sm:text-3xl md:text-5xl font-bold mb-6" style={{ textShadow: '0 2px 20px rgba(0,0,0,0.4)' }}>
          Ready to Transform Your Workflow?
        </motion.h2>

        <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
          className="mb-10 text-lg max-w-2xl mx-auto leading-relaxed" style={{ color: 'rgba(203,213,225,0.9)' }}>
          Join thousands of organizations that trust TaskFlow for efficient project management and team collaboration.
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/register"
            className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-2 px-9 py-4 rounded-xl font-bold transition-all duration-300 hover:-translate-y-1 overflow-hidden"
            style={{ background: '#ffffff', color: '#49225b' }}>
            <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700" style={{ background: 'linear-gradient(90deg,transparent,rgba(73,34,91,0.15),transparent)' }} />
            <span className="relative z-10">Start Free Trial</span>
          </Link>
        </motion.div>

        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.4 }}
          className="text-sm mt-8 font-medium" style={{ color: 'rgba(200,180,210,0.85)' }}>
          No credit card required • Free 14-day trial • Cancel anytime
        </motion.p>
      </div>
    </motion.div>
  </div>
</section>

    </div>
  );
};

export default Home;