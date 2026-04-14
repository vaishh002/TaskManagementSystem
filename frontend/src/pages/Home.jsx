import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
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

/* ── DOT GRID BACKGROUND ── */
const DotGrid = () => (
  <div
    className="absolute inset-0 pointer-events-none"
    style={{
      backgroundImage: `radial-gradient(circle, #94a3b8 1px, transparent 1px)`,
      backgroundSize: '28px 28px',
      maskImage: 'radial-gradient(ellipse 90% 70% at 50% 50%, black 30%, transparent 100%)',
      WebkitMaskImage: 'radial-gradient(ellipse 90% 70% at 50% 50%, black 30%, transparent 100%)',
      opacity: 0.45,
    }}
  />
);

/* ── ANIMATED CANVAS BACKGROUND ── */
const AnimatedBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    let particles = [];
    let mouse = { x: -9999, y: -9999 };

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
      init();
    };

    const init = () => {
      particles = [];
      const W = canvas.offsetWidth;
      const H = canvas.offsetHeight;
      const count = Math.floor((W * H) / 8000);
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * W,
          y: Math.random() * H,
          vx: (Math.random() - 0.5) * 0.45,
          vy: (Math.random() - 0.5) * 0.45,
          r: Math.random() * 2.2 + 0.8,
          opacity: Math.random() * 0.55 + 0.15,
        });
      }
    };

    const draw = () => {
      const W = canvas.offsetWidth;
      const H = canvas.offsetHeight;
      ctx.clearRect(0, 0, W, H);

      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > W) p.vx *= -1;
        if (p.y < 0 || p.y > H) p.vy *= -1;
      });

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i], b = particles[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 130) {
            const alpha = (1 - dist / 130) * 0.22;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(41,104,236,${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }

        const mdx = particles[i].x - mouse.x;
        const mdy = particles[i].y - mouse.y;
        const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (mdist < 160) {
          const alpha = (1 - mdist / 160) * 0.4;
          ctx.beginPath();
          ctx.strokeStyle = `rgba(41,104,236,${alpha})`;
          ctx.lineWidth = 1;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }
      }

      particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(41,104,236,${p.opacity})`;
        ctx.fill();
      });

      animId = requestAnimationFrame(draw);
    };

    const handleMouse = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };

    window.addEventListener('resize', resize);
    canvas.addEventListener('mousemove', handleMouse);
    canvas.addEventListener('mouseleave', handleMouseLeave);
    resize();
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('mousemove', handleMouse);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ zIndex: 1 }}
    />
  );
};

/* ── TYPEWRITER HOOK ── */
const useTypewriter = (words, typingSpeed = 65, pauseMs = 1500, deleteSpeed = 38) => {
  const [displayed, setDisplayed] = useState('');
  const [wordIdx, setWordIdx] = useState(0);
  const [phase, setPhase] = useState('typing');

  useEffect(() => {
    const word = words[wordIdx];
    let timeout;
    if (phase === 'typing') {
      if (displayed.length < word.length) {
        timeout = setTimeout(() => setDisplayed(word.slice(0, displayed.length + 1)), typingSpeed);
      } else {
        timeout = setTimeout(() => setPhase('pause'), pauseMs);
      }
    } else if (phase === 'pause') {
      timeout = setTimeout(() => setPhase('deleting'), 100);
    } else if (phase === 'deleting') {
      if (displayed.length > 0) {
        timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), deleteSpeed);
      } else {
        setWordIdx((prev) => (prev + 1) % words.length);
        setPhase('typing');
      }
    }
    return () => clearTimeout(timeout);
  }, [displayed, phase, wordIdx, words, typingSpeed, pauseMs, deleteSpeed]);

  return { displayed, isTyping: phase === 'typing' };
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
      if (progress < 1) requestAnimationFrame(tick);
      else setCount(numeric);
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
      if (progress < 1) {
        setDisplay(`${current}`);
        requestAnimationFrame(tick);
      } else {
        setDisplay('24/7');
      }
    };
    requestAnimationFrame(tick);
  }, [start, duration]);
  return display;
};

/* ── STAT CARD ── */
const StatCard = ({ stat, idx, inView }) => {
  const [hovered, setHovered] = useState(false);

  let rawValue = stat.value;
  let suffix = '';
  if (typeof stat.value === 'string') {
    if (stat.value.includes('/')) {
      const parts = stat.value.split('/');
      rawValue = parts[0];
      suffix = '/' + parts[1];
    } else {
      rawValue = stat.value.replace(/[^0-9.]/g, '');
      suffix = stat.value.replace(/[0-9.]/g, '');
    }
  }
  const isNumeric = rawValue !== '';
  const count = useCountUp(Number(rawValue), 1800, inView);

  const cards = [
    {
      neon: '#818cf8',
      neonShadow: 'rgba(129,140,248,0.7)',
      bg: 'from-indigo-500/80 via-violet-600/75 to-indigo-700/80',
      img: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&q=80',
    },
    {
      neon: '#34d399',
      neonShadow: 'rgba(52,211,153,0.7)',
      bg: 'from-emerald-500/80 via-teal-600/75 to-emerald-700/80',
      img: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=400&q=80',
    },
    {
      neon: '#f59e0b',
      neonShadow: 'rgba(245,158,11,0.7)',
      bg: 'from-amber-500/80 via-orange-500/75 to-amber-700/80',
      img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&q=80',
    },
    {
      neon: '#f472b6',
      neonShadow: 'rgba(244,114,182,0.7)',
      bg: 'from-pink-500/80 via-rose-500/75 to-pink-700/80',
      img: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400&q=80',
    },
  ];

  const c = cards[idx % cards.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: idx * 0.13, type: 'spring', stiffness: 90, damping: 14 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="relative rounded-3xl overflow-hidden cursor-pointer"
      style={{ height: '320px' }}
    >
      <motion.div
        animate={{ scale: hovered ? 1.08 : 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${c.img})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <motion.div
        animate={{ opacity: hovered ? 0.55 : 0.82 }}
        transition={{ duration: 0.4 }}
        className={`absolute inset-0 bg-gradient-to-b ${c.bg}`}
      />
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 4, ease: 'linear' }}
        className="absolute inset-0 rounded-3xl pointer-events-none"
        style={{
          background: `conic-gradient(from 0deg, transparent 60%, ${c.neon} 80%, transparent 100%)`,
          padding: '2.5px',
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
          boxShadow: `0 0 18px 2px ${c.neonShadow}`,
          borderRadius: '1.5rem',
        }}
      />
      <div
        className="absolute inset-0 rounded-3xl pointer-events-none"
        style={{ border: `1.5px solid ${c.neon}55`, borderRadius: '1.5rem' }}
      />
      <div className="relative z-10 h-full flex flex-col justify-between p-6">
        <motion.div animate={{ y: hovered ? -4 : 0, opacity: hovered ? 0.85 : 1 }} transition={{ duration: 0.35 }}>
          <div className="w-12 h-12 rounded-2xl bg-white/15 backdrop-blur-sm flex items-center justify-center border border-white/20">
            <stat.icon className="w-6 h-6 text-white" />
          </div>
        </motion.div>
        <motion.div animate={{ y: hovered ? 12 : 0 }} transition={{ duration: 0.35, ease: 'easeOut' }}>
          <div className="text-4xl font-bold text-white mb-2 tabular-nums drop-shadow-lg">
            {isNumeric ? `${count}${suffix}` : stat.value}
          </div>
          <p className="text-white/80 text-sm leading-relaxed mb-3">{stat.label}</p>
          <div className="grid grid-cols-2 lg:flex lg:flex-nowrap justify-center items-center gap-5 lg:gap-2">
            <span className="text-white font-semibold text-sm">TMS Platform</span>
            <span
              className="flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full"
              style={{ background: 'rgba(255,255,255,0.15)', border: `1px solid ${c.neon}80`, color: '#fff', backdropFilter: 'blur(4px)' }}
            >
              <HiOutlineTrendingUp className="w-3 h-3" />
              {stat.trend}
            </span>
          </div>
        </motion.div>
      </div>
      <motion.div
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none rounded-b-3xl"
        style={{ background: `linear-gradient(to top, ${c.neon}30, transparent)` }}
      />
    </motion.div>
  );
};

/* ── MAIN HOME COMPONENT ── */
const Home = () => {
  const statsRef = useRef(null);
  const [statsInView, setStatsInView] = useState(false);

  const typewriterWords = [
    'Streamline Your Workflow',
    'Empower Your Teams',
    'Track Progress Seamlessly',
    'Close More Deals Faster',
    'Achieve More Together',
  ];
  const { displayed, isTyping } = useTypewriter(typewriterWords);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStatsInView(true); },
      { threshold: 0.2 }
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  const features = [
    {
      icon: HiOutlineOfficeBuilding,
      title: 'Project Management',
      desc: 'Create projects, set deadlines, and monitor progress across teams.',
      gradient: 'from-slate-600 to-slate-800',
      iconBg: 'bg-slate-100',
      iconColor: 'text-slate-700',
      borderColor: '#94a3b8',
      illustration: () => (
        <svg viewBox="0 0 120 80" fill="none" className="w-full h-full">
          <rect x="10" y="10" width="100" height="60" rx="6" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="0.8" />
          <rect x="18" y="18" width="26" height="8" rx="3" fill="#94a3b8" />
          <rect x="50" y="18" width="26" height="8" rx="3" fill="#7c3aed" opacity="0.4" />
          <rect x="82" y="18" width="26" height="8" rx="3" fill="#3b82f6" opacity="0.4" />
          <rect x="18" y="30" width="26" height="10" rx="3" fill="white" stroke="#e2e8f0" strokeWidth="0.6" />
          <rect x="18" y="44" width="26" height="10" rx="3" fill="white" stroke="#e2e8f0" strokeWidth="0.6" />
          <rect x="50" y="30" width="26" height="10" rx="3" fill="white" stroke="#e2e8f0" strokeWidth="0.6" />
          <rect x="82" y="30" width="26" height="10" rx="3" fill="white" stroke="#e2e8f0" strokeWidth="0.6" />
          <rect x="82" y="44" width="26" height="10" rx="3" fill="white" stroke="#e2e8f0" strokeWidth="0.6" />
          <rect x="18" y="60" width="84" height="4" rx="2" fill="#e2e8f0" />
          <rect x="18" y="60" width="55" height="4" rx="2" fill="#475569" />
        </svg>
      ),
    },
    {
      icon: HiOutlineUsers,
      title: 'Team Coordination',
      desc: 'Assign Team Leaders, onboard interns in bulk, and manage hierarchies.',
      gradient: 'from-indigo-600 to-indigo-800',
      iconBg: 'bg-indigo-100',
      iconColor: 'text-indigo-700',
       borderColor: '#2968ec',
      illustration: () => (
        <svg viewBox="0 0 120 80" fill="none" className="w-full h-full">
          <circle cx="60" cy="38" r="13" fill="#e0e7ff" stroke="#a5b4fc" strokeWidth="1" />
          <circle cx="60" cy="33" r="5" fill="#6366f1" />
          <path d="M49 50c0-6 5-9 11-9s11 3 11 9" stroke="#6366f1" strokeWidth="1.2" strokeLinecap="round" fill="none" />
          <circle cx="60" cy="38" r="24" stroke="#c7d2fe" strokeWidth="0.8" strokeDasharray="3 3" />
          <circle cx="36" cy="26" r="8" fill="#ede9fe" stroke="#a5b4fc" strokeWidth="0.8" />
          <circle cx="36" cy="23" r="3" fill="#818cf8" />
          <path d="M30 33c0-4 3-5 6-5s6 1 6 5" stroke="#818cf8" strokeWidth="1" strokeLinecap="round" fill="none" />
          <circle cx="84" cy="26" r="8" fill="#ede9fe" stroke="#a5b4fc" strokeWidth="0.8" />
          <circle cx="84" cy="23" r="3" fill="#818cf8" />
          <path d="M78 33c0-4 3-5 6-5s6 1 6 5" stroke="#818cf8" strokeWidth="1" strokeLinecap="round" fill="none" />
          <circle cx="36" cy="54" r="8" fill="#ede9fe" stroke="#a5b4fc" strokeWidth="0.8" />
          <circle cx="36" cy="51" r="3" fill="#818cf8" />
          <path d="M30 61c0-4 3-5 6-5s6 1 6 5" stroke="#818cf8" strokeWidth="1" strokeLinecap="round" fill="none" />
          <circle cx="84" cy="54" r="8" fill="#ede9fe" stroke="#a5b4fc" strokeWidth="0.8" />
          <circle cx="84" cy="51" r="3" fill="#818cf8" />
          <path d="M78 61c0-4 3-5 6-5s6 1 6 5" stroke="#818cf8" strokeWidth="1" strokeLinecap="round" fill="none" />
          <line x1="44" y1="30" x2="50" y2="34" stroke="#c7d2fe" strokeWidth="0.8" />
          <line x1="76" y1="30" x2="70" y2="34" stroke="#c7d2fe" strokeWidth="0.8" />
          <line x1="44" y1="50" x2="50" y2="44" stroke="#c7d2fe" strokeWidth="0.8" />
          <line x1="76" y1="50" x2="70" y2="44" stroke="#c7d2fe" strokeWidth="0.8" />
        </svg>
      ),
    },
    {
      icon: HiOutlineDocumentReport,
      title: 'Daily Reporting',
      desc: 'Date-wise task submissions with status tracking and remarks.',
      gradient: 'from-emerald-600 to-emerald-800',
      iconBg: 'bg-emerald-100',
      iconColor: 'text-emerald-700',
       borderColor: '#10b981',
      illustration: () => (
        <svg viewBox="0 0 120 80" fill="none" className="w-full h-full">
          <rect x="22" y="8" width="76" height="64" rx="5" fill="#f0fdf4" stroke="#bbf7d0" strokeWidth="0.8" />
          <path d="M82 8 L98 24 L82 24 Z" fill="#d1fae5" stroke="#bbf7d0" strokeWidth="0.8" />
          <rect x="30" y="30" width="60" height="3.5" rx="1.5" fill="#6ee7b7" />
          <rect x="30" y="38" width="45" height="3.5" rx="1.5" fill="#a7f3d0" />
          <rect x="30" y="46" width="52" height="3.5" rx="1.5" fill="#6ee7b7" opacity="0.6" />
          <rect x="30" y="54" width="38" height="3.5" rx="1.5" fill="#a7f3d0" opacity="0.5" />
          <circle cx="26" cy="31.5" r="2.5" fill="#10b981" />
          <circle cx="26" cy="39.5" r="2.5" fill="#f59e0b" />
          <circle cx="26" cy="47.5" r="2.5" fill="#10b981" />
          <circle cx="26" cy="55.5" r="2.5" fill="#ef4444" />
          <rect x="30" y="14" width="28" height="12" rx="3" fill="#d1fae5" stroke="#6ee7b7" strokeWidth="0.6" />
          <line x1="30" y1="19" x2="58" y2="19" stroke="#6ee7b7" strokeWidth="0.6" />
        </svg>
      ),
    },
    {
      icon: HiOutlineChartBar,
      title: 'Analytics Dashboard',
      desc: 'Role-based dashboards for Admin & Manager with performance visibility.',
      gradient: 'from-amber-600 to-amber-800',
      iconBg: 'bg-amber-100',
      iconColor: 'text-amber-700',
      borderColor: '#f59e0b',
      illustration: () => (
        <svg viewBox="0 0 120 80" fill="none" className="w-full h-full">
          <line x1="12" y1="20" x2="112" y2="20" stroke="#fde68a" strokeWidth="0.6" />
          <line x1="12" y1="35" x2="112" y2="35" stroke="#fde68a" strokeWidth="0.6" />
          <line x1="12" y1="50" x2="112" y2="50" stroke="#fde68a" strokeWidth="0.6" />
          <line x1="12" y1="68" x2="112" y2="68" stroke="#fbbf24" strokeWidth="0.8" />
          <rect x="18" y="46" width="11" height="22" rx="3" fill="#fcd34d" />
          <rect x="34" y="32" width="11" height="36" rx="3" fill="#f59e0b" />
          <rect x="50" y="40" width="11" height="28" rx="3" fill="#fcd34d" />
          <rect x="66" y="24" width="11" height="44" rx="3" fill="#d97706" />
          <rect x="82" y="36" width="11" height="32" rx="3" fill="#fcd34d" />
          <rect x="98" y="18" width="11" height="50" rx="3" fill="#b45309" />
          <polyline points="23,46 39,32 55,40 71,24 87,36 103,18" stroke="#92400e" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" fill="none" strokeDasharray="3 2" />
          <circle cx="23" cy="46" r="2.5" fill="#92400e" />
          <circle cx="39" cy="32" r="2.5" fill="#92400e" />
          <circle cx="55" cy="40" r="2.5" fill="#92400e" />
          <circle cx="71" cy="24" r="2.5" fill="#92400e" />
          <circle cx="87" cy="36" r="2.5" fill="#92400e" />
          <circle cx="103" cy="18" r="2.5" fill="#92400e" />
        </svg>
      ),
    },
  ];

  const hierarchy = [
    {
      name: 'Admin',
      description: 'Oversight & Control',
      color: 'from-purple-600 to-purple-700',
      shadowColor: 'shadow-purple-200',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8 text-white" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6L12 2z" fill="currentColor" opacity="0.9" />
        </svg>
      ),
    },
    {
      name: 'Manager',
      description: 'Strategy & Planning',
      color: 'from-blue-600 to-blue-700',
      shadowColor: 'shadow-blue-200',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8 text-white" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="7" height="7" rx="1" fill="currentColor" opacity="0.9" />
          <rect x="14" y="3" width="7" height="7" rx="1" fill="currentColor" opacity="0.6" />
          <rect x="3" y="14" width="7" height="7" rx="1" fill="currentColor" opacity="0.6" />
          <rect x="14" y="14" width="7" height="7" rx="1" fill="currentColor" opacity="0.9" />
        </svg>
      ),
    },
    {
      name: 'Team Leader',
      description: 'Coordination & Guidance',
      color: 'from-emerald-600 to-emerald-700',
      shadowColor: 'shadow-emerald-200',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8 text-white" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="8" r="3.5" fill="currentColor" opacity="0.9" />
          <circle cx="5" cy="17" r="2.5" fill="currentColor" opacity="0.7" />
          <circle cx="19" cy="17" r="2.5" fill="currentColor" opacity="0.7" />
          <line x1="12" y1="11.5" x2="5" y2="14.5" stroke="currentColor" strokeWidth="1.2" opacity="0.6" />
          <line x1="12" y1="11.5" x2="19" y2="14.5" stroke="currentColor" strokeWidth="1.2" opacity="0.6" />
        </svg>
      ),
    },
    {
      name: 'Interns',
      description: 'Execution & Learning',
      color: 'from-amber-500 to-amber-600',
      shadowColor: 'shadow-amber-200',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8 text-white" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" fill="currentColor" opacity="0.15" />
          <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" fill="none" />
          <path d="M8 17c0-2.2 1.8-4 4-4s4 1.8 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" />
          <circle cx="12" cy="9" r="2" fill="currentColor" opacity="0.8" />
        </svg>
      ),
    },
  ];

  const stats = [
    { value: '500+', label: 'Active Organizations', icon: HiOutlineOfficeBuilding, trend: '+28%' },
    { value: '10000+', label: 'Projects Managed', icon: HiOutlineDocumentReport, trend: '+156%' },
    { value: '98%', label: 'Satisfaction Rate', icon: HiOutlineTrendingUp, trend: '+12%' },
    { value: '24/7', label: 'Support Available', icon: HiOutlineClock, trend: 'Always' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 font-sans overflow-hidden">

{/* ══════════════════════════════
    HERO SECTION
══════════════════════════════ */}
<section className="pt-20 pb-16 relative overflow-hidden min-h-screen flex items-center">

  <style>{`
    @keyframes orbFloat1 {
      0%, 100% { transform: translate(0px, 0px) scale(1); }
      33%       { transform: translate(30px, -25px) scale(1.05); }
      66%       { transform: translate(-20px, 20px) scale(0.97); }
    }
    @keyframes orbFloat2 {
      0%, 100% { transform: translate(0px, 0px) scale(1); }
      40%       { transform: translate(-25px, 30px) scale(1.04); }
      70%       { transform: translate(20px, -15px) scale(0.98); }
    }
    @keyframes orbFloat3 {
      0%, 100% { transform: translate(0px, 0px); }
      50%       { transform: translate(15px, -20px); }
    }
  `}</style>

  {/* ── Background ── */}
  <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }}>

    {/* Base gradient — blue tones */}
    <div className="absolute inset-0" style={{
      background: 'linear-gradient(135deg, #e8f0fe 0%, #dbeafe 20%, #eff6ff 45%, #e0eaff 70%, #e8f0fe 100%)',
    }} />

    {/* Orb top-left — blue */}
    <div className="absolute rounded-full" style={{
      width: 680, height: 680,
      top: '-200px', left: '-200px',
      background: 'radial-gradient(circle, rgba(41,104,236,0.22) 0%, transparent 65%)',
      animation: 'orbFloat1 13s ease-in-out infinite',
    }} />

    {/* Orb bottom-right — lighter blue */}
    <div className="absolute rounded-full" style={{
      width: 580, height: 580,
      bottom: '-160px', right: '-130px',
      background: 'radial-gradient(circle, rgba(59,130,246,0.14) 0%, transparent 65%)',
      animation: 'orbFloat2 16s ease-in-out infinite',
    }} />

    {/* Orb center — sky blue */}
    <div className="absolute rounded-full" style={{
      width: 420, height: 420,
      top: '25%', right: '22%',
      background: 'radial-gradient(circle, rgba(96,165,250,0.16) 0%, transparent 65%)',
      animation: 'orbFloat3 11s ease-in-out infinite',
    }} />

    {/* Orb small — blue top-right */}
    <div className="absolute rounded-full" style={{
      width: 260, height: 260,
      top: '6%', right: '6%',
      background: 'radial-gradient(circle, rgba(41,104,236,0.13) 0%, transparent 70%)',
      animation: 'orbFloat2 9s ease-in-out infinite reverse',
    }} />

    {/* Grid */}
    <div className="absolute inset-0" style={{
      backgroundImage: 'linear-gradient(rgba(41,104,236,0.055) 1px, transparent 1px), linear-gradient(90deg, rgba(41,104,236,0.055) 1px, transparent 1px)',
      backgroundSize: '64px 64px',
      maskImage: 'radial-gradient(ellipse 100% 100% at 50% 50%, black 15%, transparent 82%)',
      WebkitMaskImage: 'radial-gradient(ellipse 100% 100% at 50% 50%, black 15%, transparent 82%)',
    }} />
  </div>

  {/* ── Canvas Particles ── */}
  <div className="absolute inset-0" style={{ zIndex: 2 }}>
    <AnimatedBackground />
  </div>

  {/* ── Main Content ── */}
  <div className="w-full max-w-[1400px] mx-auto relative px-8 xl:px-16" style={{ zIndex: 10 }}>
    <div className="grid lg:grid-cols-2 gap-12 xl:gap-20 items-center">

      {/* LEFT: Text */}
      <div className="text-center lg:text-left">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 border rounded-full px-4 py-2 mb-8"
          style={{ background: 'rgba(41,104,236,0.08)', borderColor: 'rgba(41,104,236,0.25)' }}
        >
          <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#2968ec' }} />
          <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: '#2968ec' }}>
            Task Management System
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-5"
        >
          <span style={{
            background: 'linear-gradient(135deg, #1a3fa8 0%, #2968ec 50%, #1565c0 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            TMS
          </span>
        </motion.h1>

        {/* Typewriter */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25 }}
          className="h-14 flex items-center justify-center lg:justify-start mb-6"
        >
          <span className="text-xl sm:text-2xl lg:text-3xl font-semibold" style={{ color: '#4a5568' }}>
            {displayed}
            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{ repeat: Infinity, duration: 0.75 }}
              className="inline-block ml-0.5 w-[2px] h-7 align-middle rounded-sm"
              style={{ background: '#2968ec' }}
            />
          </span>
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="text-base sm:text-lg mb-9 leading-relaxed max-w-lg mx-auto lg:mx-0"
          style={{ color: '#64748b' }}
        >
          Role-based project management system for modern organizations.
          Streamline projects, empower teams, and track daily work with
          intelligent monitoring and analytics.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="flex flex-wrap justify-center lg:justify-start gap-4 mb-10"
        >
          <Link
            to="/register"
            className="group relative px-8 py-3.5 text-white rounded-xl font-semibold flex items-center gap-2 transition-all duration-300 hover:scale-105 overflow-hidden shadow-lg"
            style={{ background: 'linear-gradient(135deg, #1a3fa8, #2968ec)' }}
          >
            <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ background: 'linear-gradient(135deg, #1532a0, #1e58d4)' }} />
            <span className="relative z-10">Get Started</span>
            <motion.span
              className="relative z-10"
              animate={{ x: [0, 4, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <HiOutlineArrowNarrowRight className="w-5 h-5" />
            </motion.span>
          </Link>
          <Link
            to="/about"
            className="px-8 py-3.5 rounded-xl font-semibold transition-all duration-300 hover:scale-105"
            style={{
              border: '2px solid rgba(41,104,236,0.3)',
              color: '#2968ec',
              background: 'rgba(41,104,236,0.06)',
            }}
          >
            Learn More
          </Link>
        </motion.div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="flex flex-wrap justify-center lg:justify-start gap-5"
        >
          {[
            { icon: HiOutlineShieldCheck, text: 'Enterprise Secure' },
            { icon: HiOutlineLightningBolt, text: 'Lightning Fast' },
            { icon: HiCheck, text: 'Free 14-day Trial' },
          ].map((item, i) => (
            <span key={i} className="flex items-center gap-1.5 text-xs font-medium" style={{ color: '#7c7c9c' }}>
              <item.icon className="w-3.5 h-3.5" style={{ color: '#2968ec' }} />
              {item.text}
            </span>
          ))}
        </motion.div>
      </div>

      {/* RIGHT: Dashboard Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, type: 'spring', stiffness: 90 }}
        className="relative"
      >
        {/* Glow ring — blue */}
        <motion.div
          animate={{ opacity: [0.4, 0.8, 0.4], scale: [1, 1.03, 1] }}
          transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut' }}
          className="absolute -inset-[3px] rounded-[22px] pointer-events-none"
          style={{
            background: 'linear-gradient(135deg, #2968ec, #60a5fa, #1a3fa8)',
            filter: 'blur(6px)',
          }}
        />

        {/* Card */}
        <div className="relative rounded-2xl border p-6 shadow-2xl hover:scale-[1.015] transition-all duration-500 overflow-hidden"
          style={{ background: 'rgba(5,10,35,0.92)', borderColor: 'rgba(41,104,236,0.4)', backdropFilter: 'blur(20px)' }}>

          {/* Card BG Image */}
          <div className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              opacity: 0.12,
              borderRadius: '1rem',
            }}
          />
          <div className="absolute inset-0 pointer-events-none rounded-2xl"
            style={{ background: 'rgba(5,10,35,0.3)' }}
          />

          {/* Card header */}
          <div className="flex items-center justify-between mb-6 pb-4" style={{ borderBottom: '1px solid rgba(41,104,236,0.2)' }}>
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center shadow-sm"
                style={{ background: 'linear-gradient(135deg, #1a3fa8, #2968ec)' }}>
                <HiOutlineChip className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-sm" style={{ color: '#dbeafe' }}>TaskFlow TMS</h3>
                <p className="text-xs" style={{ color: '#60a5fa' }}>Enterprise Edition</p>
              </div>
            </div>
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
            </div>
          </div>

          <div className="space-y-4">

            <style>{`
              @keyframes scalePulse {
                0%, 100% { opacity: 0.5; transform: scaleY(0.6); }
                50% { opacity: 1; transform: scaleY(1); }
              }
            `}</style>

            <motion.div
              whileHover={{ y: -2 }}
              className="rounded-xl p-4 border transition-all duration-300 hover:shadow-md"
              style={{ background: 'rgba(255,255,255,0.06)', borderColor: 'rgba(41,104,236,0.25)' }}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: '#ffffff' }}>
                  Active Projects
                </span>
                <motion.span
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 }}
                  className="text-xs font-semibold px-2 py-0.5 rounded-full"
                  style={{ color: '#15f388', background: 'rgba(105,240,174,0.12)', border: '1px solid rgba(24,255,144,0.25)' }}
                >
                  +23%
                </motion.span>
              </div>

              <div className="flex items-center gap-4 mb-2">
                {/* Circular glow number — blue */}
                <div className="relative flex-shrink-0 w-14 h-14 flex items-center justify-center">
                  <div className="absolute inset-0 rounded-full"
                    style={{
                      background: 'conic-gradient(#2968ec 0% 75%, rgba(41,104,236,0.12) 75% 100%)',
                      padding: '2px',
                    }}
                  />
                  <div className="absolute inset-[3px] rounded-full"
                    style={{ background: 'rgba(5,10,30,0.9)' }}
                  />
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    animate={{ boxShadow: ['0 0 8px 2px rgba(41,104,236,0.4)', '0 0 18px 5px rgba(41,104,236,0.7)', '0 0 8px 2px rgba(41,104,236,0.4)'] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                  />
                  <span className="relative z-10 text-lg font-bold" style={{ color: '#dbeafe' }}>24</span>
                </div>

                {/* Vertical scale bars */}
                <div className="flex-1">
                  <div className="flex items-end gap-[3px] h-10">
                    {[3,5,4,7,6,8,5,9,7,10,8,11,9,12,10,13,11,14,12,15,13,14,12,13,11,12,10,11,9,10].map((h, i) => (
                      <motion.div
                        key={i}
                        className="flex-1 rounded-sm"
                        style={{
                          height: `${h * 5}%`,
                          background: i >= 22
                            ? 'linear-gradient(to top, #2968ec, #60a5fa)'
                            : 'rgba(41,104,236,0.25)',
                          animation: i >= 22 ? `scalePulse ${0.8 + (i % 3) * 0.2}s ease-in-out infinite` : 'none',
                          animationDelay: `${i * 0.05}s`,
                        }}
                      />
                    ))}
                  </div>
                  <div className="mt-1 h-[1px] w-full relative overflow-hidden rounded-full"
                    style={{ background: 'rgba(41,104,236,0.2)' }}>
                    <motion.div
                      className="absolute top-0 left-0 h-full rounded-full"
                      style={{ background: 'linear-gradient(90deg, #2968ec, #60a5fa)', width: '75%' }}
                      initial={{ width: 0 }}
                      animate={{ width: '75%' }}
                      transition={{ duration: 1.6, delay: 0.6 }}
                    />
                  </div>
                </div>
              </div>

              <p className="text-xs" style={{ color: 'rgb(255,255,255)' }}>8 projects due this week</p>
            </motion.div>

            {/* Mini stats */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: HiOutlineUsers, color: '#ffffff', value: '48', label: 'Team Members' },
                { icon: HiOutlineClock, color: '#ffffff', value: '92%', label: 'On-time Delivery' },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="rounded-xl p-3 border transition-all duration-300"
                  style={{ background: 'rgba(255,255,255,0.07)', borderColor: 'rgba(41,104,236,0.4)' }}
                >
                  <item.icon className="w-5 h-5 mb-2" style={{ color: item.color }} />
                  <div className="text-xl font-bold" style={{ color: '#ffffff' }}>{item.value}</div>
                  <div className="text-xs" style={{ color: '#ffffff' }}>{item.label}</div>
                </motion.div>
              ))}
            </div>

            {/* Avatars + link */}
            <div className="flex items-center justify-between pt-3" style={{ borderTop: '1px solid rgba(41,104,236,0.15)' }}>
              <div className="flex -space-x-2">
                {[
                  { initials: 'JD', bg: 'linear-gradient(135deg,#1a3fa8,#2968ec)' },
                  { initials: 'MK', bg: 'linear-gradient(135deg,#2968ec,#60a5fa)' },
                  { initials: 'AL', bg: 'linear-gradient(135deg,#1565c0,#3b82f6)' },
                  { initials: '+12', bg: 'rgba(41,104,236,0.15)', color: '#60a5fa' },
                ].map((av, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.15, zIndex: 10 }}
                    className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-xs font-bold cursor-pointer"
                    style={{ background: av.bg, color: av.color || '#fff' }}
                  >
                    {av.initials}
                  </motion.div>
                ))}
              </div>
              <Link
                to="/dashboard"
                className="text-sm font-semibold flex items-center gap-1 group transition-colors"
                style={{ color: '#ffffff' }}
              >
                View Workplace
                <HiOutlineArrowNarrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

          </div>
        </div>
      </motion.div>

    </div>
  </div>
</section>

{/* ══════════════════════════════
    HIERARCHY SECTION
══════════════════════════════ */}
<section className="py-24 px-4 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #dbeafe 0%, #eff6ff 25%, #f0f9ff 50%, #e0f2fe 75%, #dbeafe 100%)' }}>

<style>{`
  .flip-scene {
    width: 220px;
    height: 280px;
    perspective: 1200px;
    cursor: pointer;
  }
  @media (max-width: 650px) {
    .flip-scene { width: 85vw; max-width: 280px; height: 270px; }
    .flip-scene-wrap { width: 85vw; max-width: 280px; }
  }
  @media (min-width: 651px) and (max-width: 1000px) {
    .flip-scene { width: 210px; height: 265px; }
  }
  @media (min-width: 1001px) and (max-width: 1100px) {
    .flip-scene { width: 188px; height: 255px; }
    .flip-front .f-title { font-size: 14px; }
    .flip-front .f-desc-front { font-size: 11px; }
  }

  .flip-inner {
    position: relative;
    width: 100%;
    height: 100%;
    transform-style: preserve-3d;
    transition: transform 0.78s cubic-bezier(0.4, 0.2, 0.2, 1);
  }
  .flip-scene:hover .flip-inner {
    transform: rotateY(180deg);
  }

  .flip-front, .flip-back {
    position: absolute;
    inset: 0;
    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;
    border-radius: 24px;
    overflow: hidden;
  }

  /* ── FRONT ── */
  .flip-front {
    background: linear-gradient(145deg, #1d4ed8, #2563eb, #3b82f6);
    border: 2px solid rgba(147,197,253,0.5);
    box-shadow: 0 8px 32px rgba(37,99,235,0.25), inset 0 1px 0 rgba(255,255,255,0.15);
    backdrop-filter: blur(14px);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 28px 20px;
    text-align: center;
    gap: 0;
  }

  /* Morphing icon bg */
  .morph-wrap {
    width: 70px;
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 18px;
    position: relative;
    transition: transform 0.4s cubic-bezier(.34,1.56,.64,1);
  }
  .flip-scene:hover .morph-wrap {
    transform: scale(1.12) rotate(8deg);
  }
  .morph-bg {
    position: absolute;
    inset: 0;
    background: rgba(255,255,255,0.18);
    border: 2px solid rgba(255,255,255,0.4);
    border-radius: 50%;
    transition: border-radius 0.6s cubic-bezier(0.4,0,0.2,1), background 0.4s ease;
    animation: morphShape 4s ease-in-out infinite;
  }
  @keyframes morphShape {
    0%,100% { border-radius: 50%; }
    25%      { border-radius: 38% 62% 63% 37% / 41% 44% 56% 59%; }
    50%      { border-radius: 30% 70% 35% 65% / 65% 30% 70% 35%; }
    75%      { border-radius: 58% 42% 54% 46% / 32% 68% 32% 68%; }
  }
  .flip-scene:hover .morph-bg {
    background: rgba(255,255,255,0.28);
    animation-play-state: paused;
    border-radius: 18px !important;
  }

  .f-corner-num {
    position: absolute;
    top: 13px; right: 15px;
    font-size: 11px; font-weight: 700;
    color: rgba(255,255,255,0.45);
    z-index: 2;
  }
  .f-title {
    font-size: 17px; font-weight: 700;
    color: #ffffff;
    margin-bottom: 6px;
  }
  .f-desc-front {
    font-size: 12.5px;
    color: rgba(255,255,255,0.78);
    font-weight: 500;
  }
  .f-hint {
    position: absolute;
    bottom: 13px;
    font-size: 10.5px;
    color: rgba(255,255,255,0.5);
    display: flex;
    align-items: center;
    gap: 4px;
    font-weight: 500;
  }
  .f-bottom-bar {
    position: absolute;
    bottom: 0; left: 20%; right: 20%;
    height: 3px;
    border-radius: 3px 3px 0 0;
    background: rgba(255,255,255,0.3);
  }

  /* ── BACK ── */
  .flip-back {
    transform: rotateY(180deg);
    position: relative;
  }
  .flip-back .back-img {
    position: absolute;
    inset: 0;
    background-size: cover;
    background-position: center;
    transition: transform 0.6s ease;
  }
  .flip-scene:hover .back-img {
    transform: scale(1.06);
  }
  .flip-back .back-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      180deg,
      rgba(7,25,82,0.25) 0%,
      rgba(7,25,82,0.55) 40%,
      rgba(7,25,82,0.88) 100%
    );
    z-index: 1;
  }
  .flip-back .back-content {
    position: relative;
    z-index: 2;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 18px 16px;
    text-align: left;
  }
  .back-badge {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: #bfdbfe;
    background: rgba(37,99,235,0.55);
    border: 1px solid rgba(147,197,253,0.5);
    border-radius: 20px;
    padding: 3px 10px;
    margin-bottom: 8px;
    backdrop-filter: blur(4px);
    width: fit-content;
  }
  .back-title {
    font-size: 16px;
    font-weight: 700;
    color: #ffffff;
    margin-bottom: 5px;
    line-height: 1.2;
  }
  .back-desc {
    font-size: 12px;
    color: rgba(219,234,254,0.85);
    line-height: 1.55;
    margin-bottom: 10px;
  }
  .back-tag {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    font-size: 10.5px;
    font-weight: 600;
    color: #93c5fd;
    background: rgba(255,255,255,0.1);
    border: 1px solid rgba(147,197,253,0.35);
    border-radius: 12px;
    padding: 3px 10px;
    width: fit-content;
  }

  @keyframes floatCard0 { 0%,100%{transform:translateY(0px)} 50%{transform:translateY(-8px)} }
  @keyframes floatCard1 { 0%,100%{transform:translateY(0px)} 50%{transform:translateY(-8px)} }
  @keyframes floatCard2 { 0%,100%{transform:translateY(0px)} 50%{transform:translateY(-8px)} }
  @keyframes floatCard3 { 0%,100%{transform:translateY(0px)} 50%{transform:translateY(-8px)} }
  @keyframes dashFlow { 0%{stroke-dashoffset:16} 100%{stroke-dashoffset:0} }
  .dash-arrow line {
    stroke-dasharray: 5 3;
    animation: dashFlow 1s linear infinite;
  }

  .hier-layout {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    flex-wrap: nowrap;
    gap: 0;
  }
  .hier-card-wrap { display: flex; flex-direction: column; align-items: center; }
  .arrow-h { display: flex; align-items: center; }
  .arrow-v { display: flex; flex-direction: column; align-items: center; }

  @media (max-width: 650px) {
    .hier-layout { display: flex; flex-direction: column; align-items: center; gap: 0; }
    .hier-card-wrap { width: 85vw; max-width: 280px; }
    .arrow-h { display: none !important; }
    .arrow-v { display: flex !important; }
    .slot-c1,.slot-c2,.slot-c3,.slot-c4 { all: unset; }
    .slot-ah1,.slot-ah2,.slot-av1,.slot-av2 { all: unset; }
    .slot-ah2-desktop { display: none !important; }
    .mobile-arrow-1,.mobile-arrow-2,.mobile-arrow-3 { display: flex !important; flex-direction: column; align-items: center; }
  }
  .slot-av2 { display: none !important; }
  .slot-av1 { display: none !important; }

  @media (min-width: 651px) and (max-width: 1000px) {
    .hier-layout {
      display: grid;
      grid-template-columns: 1fr auto 1fr;
      grid-template-rows: auto auto auto auto auto;
      align-items: center;
      justify-items: center;
      max-width: 600px;
      margin: 0 auto;
      gap: 0;
    }
    .mobile-arrow-1,.mobile-arrow-2,.mobile-arrow-3 { display: none !important; }
    .slot-ah2-desktop { display: none !important; }
    .slot-c1  { grid-column: 1; grid-row: 1; }
    .slot-ah1 { grid-column: 2; grid-row: 1; display: flex !important; }
    .slot-c2  { grid-column: 3; grid-row: 1; }
    .slot-av1 { grid-column: 1; grid-row: 2; display: none !important; }
    .slot-av2 { grid-column: 3; grid-row: 2; display: flex !important; }
    .slot-c4  { grid-column: 1; grid-row: 3; }
    .slot-ah2 { grid-column: 2; grid-row: 3; display: flex !important; }
    .slot-c3  { grid-column: 3; grid-row: 3; }
  }

  @media (min-width: 1001px) {
    .hier-layout { display: flex; flex-direction: row; flex-wrap: nowrap; align-items: center; justify-content: center; }
    .arrow-h { display: flex !important; }
    .arrow-v { display: none !important; }
    .slot-ah2-desktop { display: flex !important; }
    .mobile-arrow-1,.mobile-arrow-2,.mobile-arrow-3 { display: none !important; }
    .slot-c1,.slot-ah1,.slot-c2,.slot-av1,.slot-av2,.slot-c3,.slot-ah2,.slot-c4 { all: unset; display: contents; }
  }
  @media (min-width: 1001px) and (max-width: 1100px) {
    .arrow-h svg { width: 40px !important; }
  }

  @media (min-width: 1001px) {
    .slot-ah2-desktop { display: flex !important; }
    .slot-av1 { display: none !important; }
    .slot-av2 { display: none !important; }
    .mobile-arrow-1,.mobile-arrow-2,.mobile-arrow-3 { display: none !important; }
    .tablet-arrow-reverse { display: none !important; }
    .desktop-arrow-forward { display: flex !important; }
  }
  @media (min-width: 651px) and (max-width: 1000px) {
    .tablet-arrow-reverse { display: flex !important; }
    .desktop-arrow-forward { display: none !important; }
  }
  @media (max-width: 650px) {
    .tablet-arrow-reverse { display: none !important; }
    .desktop-arrow-forward { display: none !important; }
  }
`}</style>

  {/* Bg dots */}
  <div className="absolute inset-0 pointer-events-none" style={{
    backgroundImage: 'radial-gradient(circle, rgba(37,99,235,0.07) 1px, transparent 1px)',
    backgroundSize: '32px 32px',
    maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 0%, transparent 100%)',
    WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 0%, transparent 100%)',
  }} />

  {/* Left blue glow */}
  <div className="absolute inset-y-0 left-0 w-1/3 pointer-events-none" style={{
    background: 'radial-gradient(ellipse at left center, rgba(59,130,246,0.18) 0%, transparent 70%)',
  }} />

  {/* Right blue glow */}
  <div className="absolute inset-y-0 right-0 w-1/3 pointer-events-none" style={{
    background: 'radial-gradient(ellipse at right center, rgba(37,99,235,0.15) 0%, transparent 70%)',
  }} />

  <div className="max-w-7xl mx-auto relative z-10 px-4">

    {/* ── Header ── */}
    <div className="text-center mb-16">
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-5 border"
        style={{ background: 'rgba(37,99,235,0.1)', borderColor: 'rgba(37,99,235,0.25)', backdropFilter: 'blur(8px)' }}
      >
        <HiOutlineViewGrid className="w-4 h-4" style={{ color: '#1d4ed8' }} />
        <span className="text-sm font-semibold" style={{ color: '#1d4ed8' }}>Organizational Structure</span>
      </motion.div>
      <motion.h2
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-3xl sm:text-4xl font-bold mb-4"
        style={{ color: '#1e3a8a' }}
      >
        Clear Role-Based Hierarchy
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="max-w-xl mx-auto text-base"
        style={{ color: '#3b5bdb' }}
      >
        Streamlined management flow from strategic oversight to operational execution
      </motion.p>
    </div>

    {/* ── Cards Data ── */}
    {(() => {
      const roles = [
        {
          num: '01',
          title: 'Admin',
          descFront: 'Oversight & Control',
          descBack: 'Full platform access — manage organizations, users, projects and system-wide settings with complete authority.',
          tag: 'Full Access',
          img: 'https://img.freepik.com/premium-vector/man-sits-desk-with-laptop-plant-background_634677-8258.jpg?w=1480',
          icon: (
            <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 28, height: 28, color: '#ffffff' }}>
              <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6L12 2z" />
            </svg>
          ),
          floatAnim: 'floatCard0 4s ease-in-out infinite',
        },
        {
          num: '02',
          title: 'Manager',
          descFront: 'Strategy & Planning',
          descBack: 'Create and oversee projects, assign team leaders, track milestones and generate performance reports.',
          tag: 'Project Owner',
          img: 'https://img.freepik.com/free-vector/expert-marketing-broker-stock-trader-present-stock-market-year-showing-growth-rates-board-isolated_1150-52742.jpg?w=1480',
          icon: (
            <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 28, height: 28, color: '#ffffff' }}>
              <rect x="3" y="3" width="7" height="7" rx="1.5" />
              <rect x="14" y="3" width="7" height="7" rx="1.5" opacity="0.7" />
              <rect x="3" y="14" width="7" height="7" rx="1.5" opacity="0.7" />
              <rect x="14" y="14" width="7" height="7" rx="1.5" />
            </svg>
          ),
          floatAnim: 'floatCard1 4.5s ease-in-out infinite 0.6s',
        },
        {
          num: '03',
          title: 'Team Leader',
          descFront: 'Coordination & Guidance',
          descBack: 'Distribute tasks among interns, monitor daily progress, submit reports and guide the team to success.',
          tag: 'Team Guide',
          img: 'https://img.freepik.com/free-vector/tiny-business-people-manager-tasks-goals-accomplishment-chart-task-management-project-managers-tool-task-management-software-concept_335657-2432.jpg?w=1480',
          icon: (
            <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 28, height: 28, color: '#ffffff' }}>
              <circle cx="12" cy="6" r="3.5" />
              <circle cx="5" cy="17" r="2.5" opacity="0.85" />
              <circle cx="19" cy="17" r="2.5" opacity="0.85" />
              <line x1="12" y1="9.5" x2="5" y2="14.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              <line x1="12" y1="9.5" x2="19" y2="14.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          ),
          floatAnim: 'floatCard2 5s ease-in-out infinite 1.1s',
        },
        {
          num: '04',
          title: 'Interns',
          descFront: 'Execution & Learning',
          descBack: 'Log daily tasks, submit work reports, track personal progress and grow through hands-on experience.',
          tag: 'Task Executor',
          img: 'https://img.freepik.com/premium-vector/human-daily-activity-concept-vector-illustration_1287271-63348.jpg?w=1480',
          icon: (
            <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 28, height: 28, color: '#ffffff' }}>
              <circle cx="12" cy="7" r="3" />
              <path d="M5 20v-1a7 7 0 0114 0v1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" fill="none" />
            </svg>
          ),
          floatAnim: 'floatCard3 3.8s ease-in-out infinite 1.6s',
        },
      ];

      const ArrowH = ({ delay, className }) => (
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay }}
          className={`arrow-h ${className || ''}`}
        >
          <svg width="60" height="24" viewBox="0 0 60 24" className="dash-arrow">
            <line x1="0" y1="12" x2="44" y2="12" stroke="rgba(37,99,235,0.55)" strokeWidth="2" />
            <polyline points="40,5 52,12 40,19" fill="none" stroke="rgba(37,99,235,0.55)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.div>
      );

      const ArrowHReverse = ({ delay, className }) => (
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay }}
          className={`arrow-h ${className || ''}`}
        >
          <svg width="60" height="24" viewBox="0 0 60 24" className="dash-arrow">
            <line x1="52" y1="12" x2="8" y2="12" stroke="rgba(37,99,235,0.55)" strokeWidth="2" />
            <polyline points="12,5 0,12 12,19" fill="none" stroke="rgba(37,99,235,0.55)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.div>
      );

      const ArrowV = ({ delay, className }) => (
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay }}
          className={`${className || ''}`}
          style={{ display: 'none' }}
        >
          <svg width="24" height="48" viewBox="0 0 24 48" className="dash-arrow">
            <line x1="12" y1="0" x2="12" y2="34" stroke="rgba(37,99,235,0.55)" strokeWidth="2" />
            <polyline points="5,30 12,42 19,30" fill="none" stroke="rgba(37,99,235,0.55)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.div>
      );

      return (
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="hier-layout"
        >
          {/* Card 1: Admin */}
          <div className="hier-card-wrap slot-c1">
            <motion.div
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0, type: 'spring', stiffness: 85 }}
              style={{ animation: roles[0].floatAnim }}
            >
              <div className="flip-scene">
                <div className="flip-inner">
                  <div className="flip-front">
                    <span className="f-corner-num">{roles[0].num}</span>
                    <div className="morph-wrap">
                      <div className="morph-bg" />
                      <div style={{ position: 'relative', zIndex: 1 }}>{roles[0].icon}</div>
                    </div>
                    <div className="f-title">{roles[0].title}</div>
                    <div className="f-desc-front">{roles[0].descFront}</div>
                    <div className="f-hint">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg>
                      Hover to explore
                    </div>
                    <span className="f-bottom-bar" />
                  </div>
                  <div className="flip-back">
                    <div className="back-img" style={{ backgroundImage: `url('${roles[0].img}')` }} />
                    <div className="back-overlay" />
                    <div className="back-content">
                      <span className="back-badge">★ {roles[0].tag}</span>
                      <div className="back-title">{roles[0].title}</div>
                      <div className="back-desc">{roles[0].descBack}</div>
                      <span className="back-tag">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>
                        {roles[0].descFront}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Arrow: Admin → Manager */}
          <ArrowH delay={0.2} className="slot-ah1" />
          <ArrowV delay={0.2} className="mobile-arrow-1" />

          {/* Card 2: Manager */}
          <div className="hier-card-wrap slot-c2">
            <motion.div
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15, type: 'spring', stiffness: 85 }}
              style={{ animation: roles[1].floatAnim }}
            >
              <div className="flip-scene">
                <div className="flip-inner">
                  <div className="flip-front">
                    <span className="f-corner-num">{roles[1].num}</span>
                    <div className="morph-wrap">
                      <div className="morph-bg" style={{ animationDelay: '1s' }} />
                      <div style={{ position: 'relative', zIndex: 1 }}>{roles[1].icon}</div>
                    </div>
                    <div className="f-title">{roles[1].title}</div>
                    <div className="f-desc-front">{roles[1].descFront}</div>
                    <div className="f-hint">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg>
                      Hover to explore
                    </div>
                    <span className="f-bottom-bar" />
                  </div>
                  <div className="flip-back">
                    <div className="back-img" style={{ backgroundImage: `url('${roles[1].img}')` }} />
                    <div className="back-overlay" />
                    <div className="back-content">
                      <span className="back-badge">◈ {roles[1].tag}</span>
                      <div className="back-title">{roles[1].title}</div>
                      <div className="back-desc">{roles[1].descBack}</div>
                      <span className="back-tag">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>
                        {roles[1].descFront}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Vertical arrow tablet col3 */}
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.3 }} className="arrow-v slot-av1" style={{ display: 'none' }}>
            <svg width="24" height="48" viewBox="0 0 24 48" className="dash-arrow">
              <line x1="12" y1="0" x2="12" y2="34" stroke="rgba(37,99,235,0.55)" strokeWidth="2" />
              <polyline points="5,30 12,42 19,30" fill="none" stroke="rgba(37,99,235,0.55)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.4 }} className="arrow-v slot-av2" style={{ display: 'none' }}>
            <svg width="24" height="48" viewBox="0 0 24 48" className="dash-arrow">
              <line x1="12" y1="0" x2="12" y2="34" stroke="rgba(37,99,235,0.55)" strokeWidth="2" />
              <polyline points="5,30 12,42 19,30" fill="none" stroke="rgba(37,99,235,0.55)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.div>

          {/* Arrow: Manager → TeamLeader desktop */}
          <ArrowH delay={0.35} className="slot-ah2-desktop" />
          <ArrowV delay={0.35} className="mobile-arrow-2" />

          {/* Card 3: Team Leader */}
          <div className="hier-card-wrap slot-c3">
            <motion.div
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, type: 'spring', stiffness: 85 }}
              style={{ animation: roles[2].floatAnim }}
            >
              <div className="flip-scene">
                <div className="flip-inner">
                  <div className="flip-front">
                    <span className="f-corner-num">{roles[2].num}</span>
                    <div className="morph-wrap">
                      <div className="morph-bg" style={{ animationDelay: '2s' }} />
                      <div style={{ position: 'relative', zIndex: 1 }}>{roles[2].icon}</div>
                    </div>
                    <div className="f-title">{roles[2].title}</div>
                    <div className="f-desc-front">{roles[2].descFront}</div>
                    <div className="f-hint">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg>
                      Hover to explore
                    </div>
                    <span className="f-bottom-bar" />
                  </div>
                  <div className="flip-back">
                    <div className="back-img" style={{ backgroundImage: `url('${roles[2].img}')` }} />
                    <div className="back-overlay" />
                    <div className="back-content">
                      <span className="back-badge">⬡ {roles[2].tag}</span>
                      <div className="back-title">{roles[2].title}</div>
                      <div className="back-desc">{roles[2].descBack}</div>
                      <span className="back-tag">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>
                        {roles[2].descFront}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Arrow: TeamLeader → Interns tablet (reverse) */}
          <ArrowHReverse delay={0.5} className="slot-ah2 tablet-arrow-reverse" />
          {/* Arrow: TeamLeader → Interns desktop (forward) */}
          <ArrowH delay={0.5} className="slot-ah2 desktop-arrow-forward" />
          <ArrowV delay={0.5} className="mobile-arrow-3" />

          {/* Card 4: Interns */}
          <div className="hier-card-wrap slot-c4">
            <motion.div
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.45, type: 'spring', stiffness: 85 }}
              style={{ animation: roles[3].floatAnim }}
            >
              <div className="flip-scene">
                <div className="flip-inner">
                  <div className="flip-front">
                    <span className="f-corner-num">{roles[3].num}</span>
                    <div className="morph-wrap">
                      <div className="morph-bg" style={{ animationDelay: '3s' }} />
                      <div style={{ position: 'relative', zIndex: 1 }}>{roles[3].icon}</div>
                    </div>
                    <div className="f-title">{roles[3].title}</div>
                    <div className="f-desc-front">{roles[3].descFront}</div>
                    <div className="f-hint">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg>
                      Hover to explore
                    </div>
                    <span className="f-bottom-bar" />
                  </div>
                  <div className="flip-back">
                    <div className="back-img" style={{ backgroundImage: `url('${roles[3].img}')` }} />
                    <div className="back-overlay" />
                    <div className="back-content">
                      <span className="back-badge">◎ {roles[3].tag}</span>
                      <div className="back-title">{roles[3].title}</div>
                      <div className="back-desc">{roles[3].descBack}</div>
                      <span className="back-tag">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>
                        {roles[3].descFront}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

        </motion.div>
      );
    })()}

    {/* ── Footer badge ── */}
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.65 }}
      className="mt-16 text-center"
    >
      <div className="inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full border"
        style={{
          background: 'rgba(37,99,235,0.08)',
          borderColor: 'rgba(37,99,235,0.2)',
          boxShadow: '0 4px 20px rgba(37,99,235,0.1)',
          backdropFilter: 'blur(8px)',
        }}
      >
        <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
          style={{ background: 'rgba(37,99,235,0.15)' }}>
          <HiCheck className="w-3 h-3" style={{ color: '#1d4ed8' }} />
        </div>
        <span className="text-sm font-medium" style={{ color: '#1e40af' }}>
          Clear responsibility flow from leadership to execution level
        </span>
      </div>
    </motion.div>

  </div>
</section>

   {/* ══════════════════════════════
    FEATURES SECTION
══════════════════════════════ */}
<section className="relative py-24 px-4 overflow-hidden bg-gradient-to-b from-white to-slate-50 border-t border-slate-100">

  <style>{`
    .feat-card {
      position: relative;
      border-radius: 20px;
      overflow: hidden;
      background: #ffffff;
      border: 1.5px solid #e2e8f0;
      cursor: pointer;
      transition: border-color 0.35s ease, box-shadow 0.35s ease, transform 0.35s ease;
      display: flex;
      flex-direction: column;
    }
    .feat-card:hover {
      border-color: #2968ec;
      box-shadow: 0 20px 50px rgba(41,104,236,0.18);
      transform: translateY(-8px);
    }

    /* Liquid fill from bottom */
    .feat-card::before {
      content: '';
      position: absolute;
      bottom: -100%;
      left: 0;
      right: 0;
      height: 100%;
      background: linear-gradient(to top, #1a50c8, #2968ec, #4d8ef0);
      transition: bottom 0.55s cubic-bezier(0.4, 0, 0.2, 1);
      z-index: 0;
    }
    .feat-card:hover::before { bottom: 0; }

    /* Image area with pyramid clip */
    .feat-img-wrap {
      position: relative;
      z-index: 1;
      width: 100%;
      height: 160px;
      overflow: hidden;
      flex-shrink: 0;
      background: #f1f5f9;
    }
    .feat-img-wrap img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center top;
      transition: transform 0.55s ease, filter 0.45s ease;
      filter: brightness(0.93) saturate(1.1);
      clip-path: polygon(0% 0%, 100% 0%, 100% 72%, 75% 100%, 50% 72%, 25% 100%, 0% 72%);
      -webkit-clip-path: polygon(0% 0%, 100% 0%, 100% 72%, 75% 100%, 50% 72%, 25% 100%, 0% 72%);
    }
    .feat-card:hover .feat-img-wrap img {
      transform: scale(1.08);
      filter: brightness(0.7) saturate(1.25) hue-rotate(5deg);
      clip-path: polygon(0% 0%, 100% 0%, 100% 72%, 75% 100%, 50% 72%, 25% 100%, 0% 72%);
      -webkit-clip-path: polygon(0% 0%, 100% 0%, 100% 72%, 75% 100%, 50% 72%, 25% 100%, 0% 72%);
    }

    /* Blue tint overlay on image */
    .feat-img-wrap::before {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(
        135deg,
        rgba(41,104,236,0.08) 0%,
        rgba(41,104,236,0) 60%
      );
      z-index: 2;
      pointer-events: none;
      transition: background 0.4s ease;
    }
    .feat-card:hover .feat-img-wrap::before {
      background: linear-gradient(
        135deg,
        rgba(41,104,236,0.35) 0%,
        rgba(26,80,200,0.15) 60%
      );
    }

    /* Top accent bar */
    .feat-card .accent-bar {
      height: 3px;
      width: 100%;
      background: linear-gradient(90deg, #2968ec, #7db4f7);
      transform: scaleX(0);
      transform-origin: left;
      transition: transform 0.4s ease;
      position: relative;
      z-index: 3;
      flex-shrink: 0;
    }
    .feat-card:hover .accent-bar { transform: scaleX(1); }

    /* Icon box */
    .feat-card .icon-box {
      position: relative;
      z-index: 2;
      width: 44px;
      height: 44px;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 14px;
      transition: background 0.35s ease, transform 0.35s cubic-bezier(.34,1.56,.64,1);
    }
    .feat-card:hover .icon-box {
      background: rgba(255,255,255,0.2) !important;
      transform: rotate(10deg) scale(1.15);
    }
    .feat-card .icon-box svg {
      transition: color 0.3s ease;
    }
    .feat-card:hover .icon-box svg {
      color: #ffffff !important;
    }

    /* Title */
    .feat-card .feat-title {
      position: relative;
      z-index: 2;
      font-size: 15px;
      font-weight: 700;
      color: #1e293b;
      margin-bottom: 8px;
      transition: color 0.3s ease;
    }
    .feat-card:hover .feat-title { color: #ffffff; }

    /* Desc */
    .feat-card .feat-desc {
      position: relative;
      z-index: 2;
      font-size: 13.5px;
      line-height: 1.65;
      color: #64748b;
      transition: color 0.3s ease;
      flex: 1;
    }
    .feat-card:hover .feat-desc { color: rgba(255,255,255,0.78); }

    /* Arrow chip */
    .feat-card .feat-arrow {
      position: relative;
      z-index: 2;
      display: inline-flex;
      align-items: center;
      gap: 5px;
      margin-top: 14px;
      font-size: 12.5px;
      font-weight: 600;
      color: #2968ec;
      background: rgba(41,104,236,0.08);
      border: 1px solid rgba(41,104,236,0.25);
      border-radius: 20px;
      padding: 4px 12px 4px 10px;
      opacity: 0;
      transform: translateY(8px);
      transition: opacity 0.3s ease 0.1s, transform 0.3s ease 0.1s, color 0.3s ease, background 0.3s ease, border-color 0.3s ease;
      align-self: flex-start;
    }
    .feat-card:hover .feat-arrow {
      opacity: 1;
      transform: translateY(0);
      color: #ffffff;
      background: rgba(255,255,255,0.15);
      border-color: rgba(255,255,255,0.35);
    }
    .feat-arrow-icon {
      transition: transform 0.3s ease;
    }
    .feat-card:hover .feat-arrow-icon {
      transform: translateX(3px);
    }

    /* Card number badge */
    .feat-card .feat-num {
      position: absolute;
      top: 10px;
      right: 14px;
      z-index: 4;
      font-size: 11px;
      font-weight: 700;
      color: rgba(41,104,236,0.75);
      background: rgba(255,255,255,0.9);
      border-radius: 999px;
      padding: 2px 9px;
      backdrop-filter: blur(6px);
      -webkit-backdrop-filter: blur(6px);
      transition: color 0.3s ease, background 0.3s ease;
    }
    .feat-card:hover .feat-num {
      color: rgba(255,255,255,0.95);
      background: rgba(41,104,236,0.4);
    }

    /* Shimmer bottom line */
    .feat-card .shimmer-line {
      position: absolute;
      bottom: 0; left: 15%; right: 15%;
      height: 2px;
      border-radius: 2px 2px 0 0;
      background: rgba(41,104,236,0.15);
      z-index: 3;
      transition: background 0.3s ease;
    }
    .feat-card:hover .shimmer-line {
      background: rgba(255,255,255,0.3);
    }

    /* Ripple on click */
    .feat-card .ripple {
      position: absolute;
      border-radius: 50%;
      background: rgba(255,255,255,0.25);
      transform: scale(0);
      animation: rippleEffect 0.6s linear;
      pointer-events: none;
      z-index: 5;
    }
    @keyframes rippleEffect {
      to { transform: scale(4); opacity: 0; }
    }

    /* Card content area */
    .feat-card-content {
      position: relative;
      z-index: 2;
      padding: 14px 20px 22px;
      flex: 1;
      display: flex;
      flex-direction: column;
    }
  `}</style>

  <div className="relative z-10 max-w-7xl mx-auto">
    <div className="text-center mb-16">
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-4 border border-indigo-100 bg-indigo-50"
      >
        <HiOutlineSparkles className="w-4 h-4 text-indigo-600" />
        <span className="text-sm font-medium text-indigo-700">Powerful Features</span>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 text-slate-800"
      >
        Everything You Need to Succeed
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="max-w-2xl mx-auto text-base sm:text-lg text-slate-500"
      >
        Comprehensive tools for project management, team coordination, and performance tracking
      </motion.p>
    </div>

    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
      {features.map((feature, idx) => {

        const vectorImages = [
          "https://img.freepik.com/premium-vector/technology-background_1302-15113.jpg?w=1480",
          "https://img.freepik.com/free-vector/teamwork-characters-operator-crew-front-screen-presentations_33099-1621.jpg?t=st=1776079240~exp=1776082840~hmac=1b9cfb573986cb62b22af8f408544e32ab5449b1c2cf41344b278fb254132655&w=1060",
          "https://img.freepik.com/free-vector/online-education-learning-open-book-man-reading-tutorial-businessman_39422-674.jpg?t=st=1776080189~exp=1776083789~hmac=8f7599c8c4fbbc90c350eefa1305c1bd43732fa3cbc57e40b16703ca7225bebc&w=1060",
          "https://img.freepik.com/premium-vector/vecteezy-linetechnology-background-df0622_1318093-14093.jpg?w=1060"
        ];

        return (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="feat-card"
            onClick={(e) => {
              const btn = e.currentTarget;
              const circle = document.createElement('span');
              const diameter = Math.max(btn.clientWidth, btn.clientHeight);
              const rect = btn.getBoundingClientRect();
              circle.className = 'ripple';
              circle.style.width = circle.style.height = `${diameter}px`;
              circle.style.left = `${e.clientX - rect.left - diameter / 2}px`;
              circle.style.top = `${e.clientY - rect.top - diameter / 2}px`;
              btn.appendChild(circle);
              setTimeout(() => circle.remove(), 650);
            }}
          >
            {/* Top accent bar */}
            <div className="accent-bar" />

            {/* Card number badge — top right corner */}
            <span className="feat-num">0{idx + 1}</span>

            {/* Vector Image with Pyramid clip-path */}
            <div className="feat-img-wrap">
              <img
                src={vectorImages[idx]}
                alt={feature.title}
                loading="lazy"
              />
            </div>

            {/* Content */}
            <div className="feat-card-content">
              <div className={`icon-box ${feature.iconBg}`}>
                <feature.icon className={`w-5 h-5 ${feature.iconColor}`} />
              </div>
              <h3 className="feat-title">{feature.title}</h3>
              <p className="feat-desc">{feature.desc}</p>
              <span className="feat-arrow">
                Explore
                <HiOutlineArrowNarrowRight className="feat-arrow-icon w-3.5 h-3.5" />
              </span>
            </div>

            {/* Shimmer bottom line */}
            <span className="shimmer-line" />
          </motion.div>
        );
      })}
    </div>
  </div>
</section>

{/* ══════════════════════════════
    STATS SECTION
══════════════════════════════ */}
<section ref={statsRef} className="py-24 px-4 relative z-10 overflow-hidden" style={{ background: 'linear-gradient(135deg, #f8faff 0%, #ffffff 50%, #f0f4ff 100%)' }}>

  <style>{`
    /* ── Rotating gradient border ── */
    @property --angle {
      syntax: '<angle>';
      initial-value: 0deg;
      inherits: false;
    }
    @keyframes rotateBorder {
      to { --angle: 360deg; }
    }

    .stat-card-wrap {
      position: relative;
      border-radius: 24px;
      padding: 2px;
      background: conic-gradient(from var(--angle), #e2e8f0 0%, #284d9c 25%, #e2e8f0 50%, #0e45bb 75%, #e2e8f0 100%);
      animation: rotateBorder 4s linear infinite;
      cursor: pointer;
    }
    .stat-card-wrap:nth-child(2) { animation-duration: 5s; }
    .stat-card-wrap:nth-child(3) { animation-duration: 3.5s; }
    .stat-card-wrap:nth-child(4) { animation-duration: 6s; }

    .stat-card-inner {
      border-radius: 22px;
      overflow: hidden;
      height: 300px;
      position: relative;
    }

    /* Image zoom on hover */
    .stat-card-inner .stat-img {
      position: absolute;
      inset: 0;
      background-size: cover;
      background-position: center;
      transition: transform 0.6s cubic-bezier(0.4,0,0.2,1);
    }
    .stat-card-wrap:hover .stat-img {
      transform: scale(1.1);
    }

    /* Overlay — light blue tint instead of heavy gradient */
    .stat-card-inner .stat-overlay {
      position: absolute;
      inset: 0;
      background: linear-gradient(
        180deg,
        rgba(10, 30, 80, 0.15) 0%,
        rgba(10, 30, 80, 0.45) 50%,
        rgba(10, 30, 80, 0.82) 100%
      );
      transition: opacity 0.4s ease;
    }
    .stat-card-wrap:hover .stat-overlay {
      opacity: 0.7;
    }

    /* Blue shimmer line top */
    .stat-card-inner .stat-topline {
      position: absolute;
      top: 0; left: 0; right: 0;
      height: 3px;
      background: linear-gradient(90deg, transparent, #2968ec, #60a5fa, transparent);
      opacity: 0;
      transition: opacity 0.4s ease;
      z-index: 5;
    }
    .stat-card-wrap:hover .stat-topline { opacity: 1; }

    /* Icon box */
    .stat-icon-box {
      width: 48px; height: 48px;
      border-radius: 14px;
      background: rgba(41,104,236,0.15);
      border: 1px solid rgba(41,104,236,0.4);
      display: flex; align-items: center; justify-content: center;
      backdrop-filter: blur(6px);
      transition: background 0.3s ease, transform 0.3s cubic-bezier(.34,1.56,.64,1);
    }
    .stat-card-wrap:hover .stat-icon-box {
      background: rgba(41,104,236,0.35);
      transform: scale(1.1) rotate(6deg);
    }

    /* Value number */
    .stat-value {
      font-size: 2.6rem;
      font-weight: 800;
      color: #ffffff;
      letter-spacing: -1px;
      line-height: 1;
      text-shadow: 0 2px 12px rgba(0,0,0,0.3);
      transition: transform 0.3s ease;
    }
    .stat-card-wrap:hover .stat-value {
      transform: translateY(-3px);
    }

    /* Trend badge */
    .stat-trend {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      font-size: 11px;
      font-weight: 700;
      padding: 3px 10px;
      border-radius: 20px;
      background: rgba(41,104,236,0.25);
      border: 1px solid rgba(96,165,250,0.4);
      color: #93c5fd;
      backdrop-filter: blur(4px);
      transition: background 0.3s ease;
    }
    .stat-card-wrap:hover .stat-trend {
      background: rgba(41,104,236,0.45);
    }

    /* Bottom progress bar */
    .stat-progress-bg {
      height: 3px;
      background: rgba(255,255,255,0.15);
      border-radius: 3px;
      overflow: hidden;
      margin-top: 12px;
    }
    .stat-progress-fill {
      height: 100%;
      border-radius: 3px;
      background: linear-gradient(90deg, #2968ec, #60a5fa);
      width: 0%;
      transition: width 1.8s cubic-bezier(0.4,0,0.2,1);
    }

    /* Floating dot top-right */
    .stat-dot {
      position: absolute;
      top: 14px; right: 14px;
      width: 8px; height: 8px;
      border-radius: 50%;
      background: #60a5fa;
      box-shadow: 0 0 0 0 rgba(96,165,250,0.5);
      animation: dotPulse 2s ease-in-out infinite;
      z-index: 5;
    }
    @keyframes dotPulse {
      0%, 100% { box-shadow: 0 0 0 0 rgba(96,165,250,0.5); }
      50% { box-shadow: 0 0 0 6px rgba(96,165,250,0); }
    }
  `}</style>

  {/* Subtle bg decoration */}
  <div className="absolute inset-0 pointer-events-none" style={{
    backgroundImage: 'radial-gradient(circle, rgba(41,104,236,0.06) 1px, transparent 1px)',
    backgroundSize: '36px 36px',
    maskImage: 'radial-gradient(ellipse 85% 85% at 50% 50%, black 0%, transparent 100%)',
    WebkitMaskImage: 'radial-gradient(ellipse 85% 85% at 50% 50%, black 0%, transparent 100%)',
  }} />

  <div className="max-w-7xl mx-auto relative z-10">

    {/* Header */}
    <div className="text-center mb-16">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={statsInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="inline-flex items-center gap-2 border rounded-full px-4 py-1.5 mb-5"
        style={{ background: 'rgba(41,104,236,0.07)', borderColor: 'rgba(41,104,236,0.2)' }}
      >
        <motion.span
          animate={{ rotate: [0, 15, -10, 0] }}
          transition={{ repeat: Infinity, duration: 3 }}
        >
          <HiOutlineTrendingUp className="w-3.5 h-3.5" style={{ color: '#2968ec' }} />
        </motion.span>
        <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: '#2968ec' }}>
          Trusted Worldwide
        </span>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={statsInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.1, duration: 0.5 }}
        className="text-3xl sm:text-4xl font-bold text-slate-800 mb-3"
      >
        Numbers that speak for themselves
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={statsInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="text-slate-500 text-base max-w-xl mx-auto"
      >
        Real impact across organizations, teams, and daily operations
      </motion.p>
    </div>

    {/* Cards */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {[
        {
          value: '500+',
          label: 'Active Organizations',
          icon: HiOutlineOfficeBuilding,
          trend: '+28%',
          progress: 72,
          img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&q=80',
          sub: 'Growing every month',
        },
        {
          value: '10000+',
          label: 'Projects Managed',
          icon: HiOutlineDocumentReport,
          trend: '+156%',
          progress: 88,
          img: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=600&q=80',
          sub: 'Across all industries',
        },
        {
          value: '98%',
          label: 'Satisfaction Rate',
          icon: HiOutlineTrendingUp,
          trend: '+12%',
          progress: 98,
          img: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&q=80',
          sub: 'Based on user reviews',
        },
        {
          value: '24/7',
          label: 'Support Available',
          icon: HiOutlineClock,
          trend: 'Always On',
          progress: 100,
          img: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=600&q=80',
          sub: 'Dedicated expert team',
        },
      ].map((stat, idx) => {
        // parse value
 const isSpecial = stat.value === '24/7';
let rawValue = isSpecial ? '0' : stat.value.replace(/[^0-9.]/g, '');
let suffix = isSpecial ? '' : stat.value.replace(/[0-9.]/g, '');
const isNumeric = !isSpecial && rawValue !== '';
const count = useCountUp(Number(rawValue), 1800, statsInView);
const count247 = useCountUp247(1800, isSpecial && statsInView);

        return (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 40 }}
            animate={statsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: idx * 0.13, type: 'spring', stiffness: 85, damping: 14 }}
            className="stat-card-wrap"
          >
            <div className="stat-card-inner">

              {/* Pulsing dot */}
              <span className="stat-dot" />

              {/* Top shimmer */}
              <div className="stat-topline" />

              {/* Background image */}
              <div
                className="stat-img"
                style={{ backgroundImage: `url(${stat.img})` }}
              />

              {/* Overlay */}
              <div className="stat-overlay" />

              {/* Content */}
              <div className="relative z-10 h-full flex flex-col justify-between p-5">

                {/* Top: icon */}
                <div className="stat-icon-box">
                  <stat.icon className="w-5 h-5" style={{ color: '#93c5fd' }} />
                </div>

                {/* Bottom: value + label */}
                <div>
                  {/* Trend badge */}
                  <span className="stat-trend mb-3 inline-flex">
                    <HiOutlineTrendingUp className="w-3 h-3" />
                    {stat.trend}
                  </span>

                 {/* Number */}
<div className="stat-value mt-1">
  {isSpecial ? count247 : isNumeric ? `${count}${suffix}` : stat.value}
</div>

                  {/* Label */}
                  <p className="text-white/90 text-sm font-semibold mt-1 mb-0.5">
                    {stat.label}
                  </p>

                  {/* Sub text */}
                  <p className="text-white/50 text-xs">{stat.sub}</p>

                  {/* Progress bar */}
                  <div className="stat-progress-bg">
                    <div
                      className="stat-progress-fill"
                      style={{ width: statsInView ? `${stat.progress}%` : '0%' }}
                    />
                  </div>
                </div>

              </div>
            </div>
          </motion.div>
        );
      })}
    </div>

    {/* Bottom trust badges */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={statsInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.7, duration: 0.5 }}
      className="mt-14 flex flex-wrap justify-center gap-4"
    >
      {['No credit card required', 'Free 14-day trial', 'Cancel anytime', '24/7 support'].map((item, i) => (
        <motion.div
          key={i}
          whileHover={{ scale: 1.05, y: -2 }}
          className="flex items-center gap-2 rounded-full px-5 py-2 text-sm font-medium cursor-default"
          style={{
            background: '#ffffff',
            border: '1.5px solid rgba(41,104,236,0.15)',
            color: '#475569',
            boxShadow: '0 2px 12px rgba(41,104,236,0.06)',
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: '#2968ec' }} />
          {item}
        </motion.div>
      ))}
    </motion.div>

  </div>
</section>

      {/* ══════════════════════════════
    CTA SECTION
══════════════════════════════ */}
<section className="py-24 px-4 relative z-10">
  <style>{`
    .cta-box:hover .cta-bg-img {
      transform: scale(1) !important;
    }
  `}</style>

  <div className="max-w-5xl mx-auto">
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="cta-box relative overflow-hidden rounded-3xl shadow-2xl"
      style={{ isolation: 'isolate' }}
    >
      {/* ── Background Image ── */}
      <div
        className="cta-bg-img absolute inset-0"
        style={{
          backgroundImage: `url('https://img.freepik.com/premium-vector/business-information-vector-pattern_702967-2530.jpg?w=1480')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          transform: 'scale(1.08)',
          transition: 'transform 0.7s ease-out',
          zIndex: 0,
        }}
      />

      {/* ── Dark overlay ── */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, rgba(10,20,60,0.88) 0%, rgba(20,35,90,0.82) 50%, rgba(30,20,70,0.88) 100%)',
          zIndex: 1,
        }}
      />

      {/* ── Dot pattern overlay ── */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)`,
          backgroundSize: '24px 24px',
          zIndex: 2,
        }}
      />

      {/* ── Blue glow spots ── */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: 420, height: 420,
          top: '-100px', left: '-80px',
          background: 'radial-gradient(circle, rgba(41,104,236,0.18) 0%, transparent 65%)',
          zIndex: 2,
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          width: 320, height: 320,
          bottom: '-80px', right: '-60px',
          background: 'radial-gradient(circle, rgba(96,165,250,0.14) 0%, transparent 65%)',
          zIndex: 2,
        }}
      />

      {/* ── Content ── */}
      <div className="relative p-8 sm:p-12 md:p-16 text-center text-white" style={{ zIndex: 3 }}>

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-6 text-sm font-medium"
          style={{
            background: 'rgba(255,255,255,0.1)',
            border: '1px solid rgba(255,255,255,0.2)',
            color: 'rgba(255,255,255,0.9)',
            backdropFilter: 'blur(8px)',
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-4 h-4"
            style={{ color: '#fbbf24' }}
          >
            <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6L12 2z" />
          </svg>
          Start your journey today
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-2xl sm:text-3xl md:text-5xl font-bold mb-6"
          style={{ textShadow: '0 2px 20px rgba(0,0,0,0.4)' }}
        >
          Ready to Transform Your Workflow?
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="mb-10 text-lg max-w-2xl mx-auto leading-relaxed"
          style={{ color: 'rgba(203,213,225,0.9)' }}
        >
          Join thousands of organizations that trust TaskFlow for efficient project management and team collaboration.
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            to="/register"
            className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-2 px-9 py-4 rounded-xl font-bold transition-all duration-300 hover:-translate-y-1 overflow-hidden"
            style={{
              background: '#ffffff',
              color: '#1e3a8a',
            }}
          >
            <span
              className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700"
              style={{ background: 'linear-gradient(90deg, transparent, rgba(99,130,255,0.15), transparent)' }}
            />
            <span className="relative z-10">Start Free Trial</span>
            <HiOutlineArrowNarrowRight
              className="relative z-10 w-5 h-5 group-hover:translate-x-1 transition-transform"
              style={{ color: '#1e3a8a' }}
            />
          </Link>
        </motion.div>

        {/* Fine print */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-sm mt-8 font-medium"
          style={{ color: 'rgba(148,163,184,0.85)' }}
        >
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