import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Users, Shield, Lock, Eye, FileEdit, BarChart3, UserCheck, GraduationCap,
  ClipboardList, CheckCircle2, ArrowRight, Zap, Settings, FileText, Activity,
  Calendar, Server, UserPlus,
} from 'lucide-react';


const PARTICLE_COUNT = 80;
const SHAPE_DUR = 180;
const TRANSITION_DUR = 60;
const COLORS = ["#088395", "#37B7C3", "#EBF4F6", "#05C7D6", "#0EA5B5"];

const makeShapes = (CX, CY, W, H) => [
  (i, t) => {
    const a = (i / PARTICLE_COUNT) * Math.PI * 2;
    const r = 48 + 22 * Math.abs(Math.cos(2 * a));
    return { x: CX + r * Math.cos(a), y: CY + r * Math.sin(a) };
  },
  (i, t) => {
    const py = (i / PARTICLE_COUNT) * H * 0.85 + H * 0.075;
    const wave = 36 * Math.sin((py - CY) * 0.09 + t * 0.03);
    return { x: CX + wave, y: py };
  },
  (i, t) => {
    const px = (i / PARTICLE_COUNT) * W * 0.85 + W * 0.075;
    const wave = 36 * Math.sin((px - CX) * 0.09 + t * 0.03);
    return { x: px, y: CY + wave };
  },
  (i, t) => {
    const a = (i / PARTICLE_COUNT) * Math.PI * 2;
    const r = i % 2 === 0 ? 58 : 38;
    return { x: CX + r * Math.cos(a + t * 0.01), y: CY + r * Math.sin(a + t * 0.01) };
  },
  (i, t) => {
    const a = (i / PARTICLE_COUNT) * Math.PI * 2;
    const r = 50 + 22 * Math.sin(3 * a + t * 0.02) + 12 * Math.cos(5 * a);
    return { x: CX + r * Math.cos(a), y: CY + r * Math.sin(a) };
  },
  (i, t) => {
    const frac = i / PARTICLE_COUNT;
    const a = frac * Math.PI * 8;
    const r = 10 + frac * 58;
    const sq = 1 / (Math.abs(Math.cos(a)) + Math.abs(Math.sin(a)));
    return { x: CX + r * sq * Math.cos(a), y: CY + r * sq * Math.sin(a) };
  },
  (i, t) => {
    const frac = i / PARTICLE_COUNT;
    const px = CX + (frac - 0.5) * 160;
    const wave = 44 * Math.sin(frac * Math.PI * 4 + t * 0.04);
    return { x: px, y: CY + wave };
  },
  (i, t) => {
    const frac = i / PARTICLE_COUNT;
    const a = frac * Math.PI * 6 + t * 0.01;
    const r = frac * 70;
    return { x: CX + r * Math.cos(a), y: CY + r * Math.sin(a) };
  },
];

const lerp = (a, b, f) => a + (b - a) * f;
const easeInOut = (t) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);
const getColor = (i) => COLORS[i % COLORS.length];

function ArcCircle({ r, stroke, strokeWidth, dashArray, rotate, rotateDir, delay, filter, opacity = 1 }) {
  const style = {
    transformOrigin: "250px 250px",
    animation: [
      rotate ? `${rotateDir === "ccw" ? "rotateCCW" : "rotateCW"} ${rotate}s linear infinite` : "",
      `fadeIn 0.5s ease ${delay}s both`,
    ]
      .filter(Boolean)
      .join(", "),
  };
  return (
    <g style={style}>
      <circle
        cx="250"
        cy="250"
        r={r}
        fill="none"
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeDasharray={dashArray}
        strokeLinecap="round"
        filter={filter}
        opacity={opacity}
        style={{
          animation: `dashIn 0.8s ease ${delay + 0.05}s both`,
          "--len": 600,
        }}
      />
    </g>
  );
}

function RadialTicks() {
  const ticks = Array.from({ length: 12 }, (_, i) => ({
    angle: i * 30,
    major: i % 3 === 0,
  }));
  return (
    <g style={{ animation: "fadeIn 1s ease 0.3s both" }} className="hud-flicker">
      {ticks.map(({ angle, major }) => (
        <g key={angle} transform={`rotate(${angle} 250 250)`}>
          <line
            x1="250"
            y1="116"
            x2="250"
            y2={major ? "124" : "122"}
            stroke="#37B7C3"
            strokeWidth={major ? 1.5 : 1}
            filter="url(#glow-teal)"
            opacity={major ? 1 : 0.7}
          />
        </g>
      ))}
    </g>
  );
}

function HUDDefs() {
  return (
    <defs>
      <filter id="glow-green">
        <feGaussianBlur stdDeviation="3" result="b" />
        <feMerge>
          <feMergeNode in="b" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
      <filter id="glow-teal">
        <feGaussianBlur stdDeviation="6" result="b" />
        <feGaussianBlur stdDeviation="4" result="b2" />
        <feMerge>
          <feMergeNode in="b" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
      <filter id="glow-cyan">
        <feGaussianBlur stdDeviation="4" result="b" />
        <feMerge>
          <feMergeNode in="b" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
      <filter id="glow-red">
        <feGaussianBlur stdDeviation="3.5" result="b" />
        <feMerge>
          <feMergeNode in="b" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
      <filter id="bloom">
        <feGaussianBlur stdDeviation="12" result="b" />
        <feMerge>
          <feMergeNode in="b" />
          <feMergeNode in="b" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
      <radialGradient id="innerBg" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#031820" />
        <stop offset="100%" stopColor="#000c10" />
      </radialGradient>
      <radialGradient id="coreGlow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#088395" stopOpacity="0.22" />
        <stop offset="60%" stopColor="#37B7C3" stopOpacity="0.08" />
        <stop offset="100%" stopColor="#000" stopOpacity="0" />
      </radialGradient>
      <clipPath id="innerClip">
        <circle cx="250" cy="250" r="118" />
      </clipPath>
    </defs>
  );
}

function ParticleCanvas() {
  const canvasRef = useRef(null);
  const stateRef = useRef({
    t: 0,
    shapeIdx: 0,
    shapeT: 0,
    particles: null,
    raf: null,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const W = 236, H = 236, CX = W / 2, CY = H / 2;
    const shapes = makeShapes(CX, CY, W, H);

    stateRef.current.particles = Array.from({ length: PARTICLE_COUNT }, (_, i) => {
      const pos = shapes[0](i, 0);
      return { x: pos.x, y: pos.y, tx: pos.x, ty: pos.y, vx: 0, vy: 0 };
    });

    function loop() {
      const s = stateRef.current;
      ctx.clearRect(0, 0, W, H);
      s.t++;
      s.shapeT++;

      if (s.shapeT >= SHAPE_DUR + TRANSITION_DUR) {
        s.shapeIdx = (s.shapeIdx + 1) % shapes.length;
        s.shapeT = 0;
      }

      const curShape = shapes[s.shapeIdx];
      const prevShape = shapes[(s.shapeIdx - 1 + shapes.length) % shapes.length];
      const blend = s.shapeT < TRANSITION_DUR ? easeInOut(s.shapeT / TRANSITION_DUR) : 1;

      s.particles.forEach((p, i) => {
        const np = curShape(i, s.t);
        const pp = prevShape(i, s.t);
        const targetX = s.shapeT < TRANSITION_DUR ? lerp(pp.x, np.x, blend) : np.x;
        const targetY = s.shapeT < TRANSITION_DUR ? lerp(pp.y, np.y, blend) : np.y;

        const dx = targetX - p.x;
        const dy = targetY - p.y;
        p.vx = p.vx * 0.72 + dx * 0.18;
        p.vy = p.vy * 0.72 + dy * 0.18;
        p.x += p.vx;
        p.y += p.vy;
      });

      for (let i = 0; i < s.particles.length; i++) {
        for (let j = i + 1; j < s.particles.length; j++) {
          if (Math.abs(i - j) > 3) continue;
          const a = s.particles[i], b = s.particles[j];
          const dist = Math.hypot(a.x - b.x, a.y - b.y);
          if (dist < 30) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = getColor(i);
            ctx.globalAlpha = (1 - dist / 30) * 0.35;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      s.particles.forEach((p, i) => {
        const col = getColor(i);
        const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, 6);
        grd.addColorStop(0, col);
        grd.addColorStop(1, "transparent");
        ctx.globalAlpha = 0.25;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 6, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();
        ctx.globalAlpha = 0.9;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = col;
        ctx.fill();
      });

      ctx.globalAlpha = 1;
      s.raf = requestAnimationFrame(loop);
    }

    const timer = setTimeout(() => {
      stateRef.current.raf = requestAnimationFrame(loop);
    }, 2200);

    return () => {
      clearTimeout(timer);
      if (stateRef.current.raf) cancelAnimationFrame(stateRef.current.raf);
    };
  }, []);

  return (
    <foreignObject x="132" y="132" width="236" height="236">
      <canvas
        ref={canvasRef}
        width="236"
        height="236"
        style={{ display: "block", borderRadius: "50%", mixBlendMode: "screen" }}
      />
    </foreignObject>
  );
}

function HUDSVG({ svgRef }) {
  return (
    <svg
      ref={svgRef}
      width="500"
      height="500"
      viewBox="0 0 500 500"
      style={{ display: "block", mixBlendMode: "screen", position: "relative", zIndex: 2 }}
    >
      <HUDDefs />

      <g filter="url(#bloom)" opacity="0.4" style={{ animation: "fadeIn 0.5s ease 1.8s both" }}>
        <circle cx="250" cy="250" r="220" fill="none" stroke="#021a20" strokeWidth="60" />
      </g>

      <circle
        cx="250" cy="250" r="130"
        fill="none"
        stroke="#088395"
        strokeWidth="1.5"
        filter="url(#glow-teal)"
        style={{ animation: "fadeIn 0.6s ease 0.1s both" }}
      />

      <RadialTicks />

      <ArcCircle r={195} stroke="#37B7C3" strokeWidth={2.5} dashArray="80 30 40 210" rotate={14} rotateDir="cw" delay={0.8} filter="url(#glow-teal)" />
      <ArcCircle r={205} stroke="#EBF4F6" strokeWidth={1.5} dashArray="55 60 25 220" rotate={10} rotateDir="ccw" delay={1.8} filter="url(#glow-green)" opacity={0.5} />
      <ArcCircle r={215} stroke="#088395" strokeWidth={3} dashArray="110 20 60 160" rotate={8} rotateDir="cw" delay={2.0} filter="url(#glow-teal)" />
      <ArcCircle r={226} stroke="#37B7C3" strokeWidth={2} dashArray="45 80 90 145" delay={2.2} filter="url(#glow-cyan)" />
      <ArcCircle r={185} stroke="#05C7D6" strokeWidth={1.5} dashArray="30 50 70 210" rotate={18} rotateDir="ccw" delay={2.4} filter="url(#glow-teal)" />

      <g style={{ transformOrigin: "250px 250px", animation: "rotateCW 22s linear infinite, fadeIn 0.6s ease 1.8s both" }}>
        <circle cx="250" cy="250" r="220" fill="none" stroke="rgba(8,131,149,0.1)" strokeWidth="18" strokeDasharray="90 270" />
      </g>

      <g style={{ animation: "fadeIn 0.6s ease 1.5s both" }}>
        {[
          { cx: 250, cy: 132, fill: "#088395", delay: "0s" },
          { cx: 368, cy: 250, fill: "#37B7C3", delay: "0.5s" },
          { cx: 132, cy: 250, fill: "#EBF4F6", delay: "1s" },
          { cx: 250, cy: 368, fill: "#05C7D6", delay: "0.3s" },
        ].map((d, i) => (
          <circle
            key={i}
            cx={d.cx} cy={d.cy} r="3"
            fill={d.fill}
            filter="url(#glow-teal)"
            style={{ animation: `hudPulse 2s ease-in-out ${d.delay} infinite` }}
          />
        ))}
      </g>

      <g style={{ animation: "fadeIn 0.5s ease 1.9s both" }}>
        <g style={{ transformOrigin: "250px 250px", animation: "rotateCW 6s linear infinite, fadeIn 0.5s ease 1.9s both" }}>
          <line x1="250" y1="135" x2="250" y2="160" stroke="#088395" strokeWidth="1" opacity="0.5" filter="url(#glow-teal)" />
          <line x1="250" y1="165" x2="250" y2="185" stroke="#088395" strokeWidth="0.8" opacity="0.35" />
          <line x1="250" y1="190" x2="250" y2="205" stroke="#088395" strokeWidth="0.6" opacity="0.2" />
        </g>
      </g>

      <circle cx="250" cy="250" r="118" fill="url(#innerBg)" style={{ animation: "fadeIn 0.4s ease 0.2s both" }} />
      <circle cx="250" cy="250" r="118" fill="url(#coreGlow)" style={{ animation: "hudPulse 3s ease-in-out infinite" }} />
      <circle cx="250" cy="250" r="118" fill="none" stroke="#088395" strokeWidth="1" opacity="0.4" filter="url(#glow-teal)" className="hud-flicker" />
      <circle cx="250" cy="250" r="112" fill="none" stroke="#0d3840" strokeWidth="0.5" />

      <ParticleCanvas />

      <g style={{ animation: "fadeIn 0.6s ease 2.6s both" }} clipPath="url(#innerClip)">
        <path
          d="M140 310 Q180 200 250 200 Q320 200 360 310"
          fill="none"
          stroke="#088395"
          strokeWidth="1"
          strokeDasharray="4 6"
          opacity="0.5"
        >
          <animate attributeName="stroke-dashoffset" values="0;-120" dur="2s" repeatCount="indefinite" />
        </path>
      </g>

      <g clipPath="url(#innerClip)" style={{ animation: "fadeIn 0.4s ease 2.3s both" }}>
        {[235, 250, 265].map((y, i) => (
          <line
            key={y}
            x1="132" y1={y} x2="368" y2={y}
            stroke="#37B7C3" strokeWidth="0.5"
            opacity={i === 1 ? 0.18 : 0.12}
            style={{ animation: `scanPulse 3s ease-in-out ${i * 0.5}s infinite` }}
          />
        ))}
      </g>

      <g style={{ animation: "fadeIn 0.6s ease 2.2s both", fontFamily: "monospace" }}>
        <text x="42" y="90" fill="#37B7C3" fontSize="8" opacity="0.55">SYS.CORE</text>
        <text x="42" y="100" fill="#088395" fontSize="7" opacity="0.4">ONLINE</text>
        <text x="380" y="90" fill="#37B7C3" fontSize="8" opacity="0.55" textAnchor="end">v4.7.1</text>
        <text x="380" y="100" fill="#EBF4F6" fontSize="7" opacity="0.4" textAnchor="end">SCAN</text>
        <text x="42" y="415" fill="#05C7D6" fontSize="7" opacity="0.45">PWR:98%</text>
        <text x="380" y="415" fill="#37B7C3" fontSize="7" opacity="0.45" textAnchor="end">SYNC:OK</text>
        {[100, 110, 120].map((x, i) => (
          <rect key={x} x={x} y="422" width="2" height={6 - i * 1.5} fill="#088395" opacity={0.3 - i * 0.05} />
        ))}
        {[370, 358, 346].map((x, i) => (
          <rect key={x} x={x} y="422" width="2" height={6 - i * 1.5} fill="#088395" opacity={0.3 - i * 0.05} />
        ))}
      </g>

      <g id="parallax-layer-svg" style={{ transformOrigin: "250px 250px" }}>
        <circle cx="250" cy="250" r="75" fill="none" stroke="#0d3840" strokeWidth="1" strokeDasharray="3 8" opacity="0.6" />
        <circle cx="250" cy="250" r="55" fill="none" stroke="#0d3840" strokeWidth="0.7" strokeDasharray="2 10" opacity="0.4" />
      </g>
    </svg>
  );
}

function FuturisticHUD() {
  const rootRef = useRef(null);
  const svgRef = useRef(null);

  const handleMouseMove = useCallback((e) => {
    if (!rootRef.current || !svgRef.current) return;
    const r = rootRef.current.getBoundingClientRect();
    const mx = (e.clientX - r.left - r.width / 2) / r.width * 2;
    const my = (e.clientY - r.top - r.height / 2) / r.height * 2;

    const layer = svgRef.current.querySelector("#parallax-layer-svg");
    if (layer) {
      layer.style.transform = `translate(${mx * 8}px, ${my * 8}px)`;
    }
    svgRef.current.style.filter = `drop-shadow(${-mx * 6}px ${-my * 6}px 18px rgba(8,131,149,0.22))`;
  }, []);

  return (
    <div
  className="hero"
  ref={rootRef}
  onMouseMove={handleMouseMove}
  style={{
    width: "100%",
    minHeight: "100vh",
    background: `
      radial-gradient(circle at 50% 50%, #020e12 0%, #000000 100%),
      radial-gradient(circle at 20% 30%, rgba(8,131,149,0.1), transparent 40%),
      radial-gradient(circle at 80% 70%, rgba(55,183,195,0.08), transparent 40%)
    `,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    overflow: "visible",
  }}
>
      <style>{`
      @keyframes floatParticle {
  0% {
    transform: translateY(0px) scale(1);
    opacity: 0.3;
  }
  50% {
    transform: translateY(-40px) scale(1.3);
    opacity: 0.8;
  }
  100% {
    transform: translateY(0px) scale(1);
    opacity: 0.3;
  }
}
      .hero::after {
  content: "";
  position: absolute;
  bottom: -1px;
  left: 0;
  width: 100%;
  height: 100px;
  pointer-events: none;
  z-index: 5;

  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0) 0%,
    rgba(8, 131, 149, 0.35) 70%,
    rgba(8, 131, 149, 0.85) 100%
  );
}
        @keyframes starTwinkle {
          0%,100% { opacity: 0.2; transform: scale(1); }
          50%     { opacity: 1; transform: scale(1.5); }
        }
        @keyframes circleReveal {
          from { stroke-dashoffset: 820; opacity: 0; }
          to   { stroke-dashoffset: 0; opacity: 1; }
        }
        @keyframes bootScale {
          from { transform: scale(0.85); opacity: 0; }
          to   { transform: scale(1);    opacity: 1; }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes hudPulse {
          0%,100% { opacity:.7; filter:blur(6px); }
          50%     { opacity:1;  filter:blur(10px); }
        }
        @keyframes rotateCW  { from{transform:rotate(0deg)}   to{transform:rotate(360deg)} }
        @keyframes rotateCCW { from{transform:rotate(0deg)}   to{transform:rotate(-360deg)} }
        @keyframes dashIn {
          from { stroke-dashoffset: var(--len, 600); }
          to   { stroke-dashoffset: 0; }
        }
        @keyframes scanPulse {
          0%   { opacity:.15; }
          50%  { opacity:.5; }
          100% { opacity:.15; }
        }
        .hud-flicker { animation: flicker 4s ease-in-out infinite 1.2s; }
        @keyframes flicker {
          0%{opacity:1}10%{opacity:.7}12%{opacity:1}
          30%{opacity:.9}32%{opacity:.6}34%{opacity:1}
          70%{opacity:1}72%{opacity:.5}74%{opacity:1}
        }
        .hud-boot-wrap {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          animation: bootScale 0.9s cubic-bezier(0.22,1,0.36,1) both;
        }
        .hud-glow-ring {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
          width: 280px; height: 280px;
          background: transparent;
          box-shadow: 0 0 60px 10px rgba(8,131,149,0.15), inset 0 0 40px 4px rgba(8,131,149,0.1);
          opacity: 0;
          animation: fadeIn 0.6s ease 0.5s forwards, glowPulse 3s ease-in-out 1.1s infinite;
        }
        @keyframes glowPulse {
          0%,100% { box-shadow: 0 0 40px 6px rgba(8,131,149,0.3), 0 0 80px 16px rgba(8,131,149,0.1); }
          50%     { box-shadow: 0 0 60px 12px rgba(55,183,195,0.5), 0 0 120px 32px rgba(8,131,149,0.2); }
        }
      `}</style>

      <div
        style={{
          position: "absolute", inset: 0, opacity: 0.03, pointerEvents: "none",
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      {Array.from({ length: 120 }).map((_, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            top: Math.random() * 100 + "%",
            left: Math.random() * 100 + "%",
            width: Math.random() * 2 + 1,
            height: Math.random() * 2 + 1,
            borderRadius: "50%",
            background: "#EBF4F6",
            opacity: Math.random() * 0.8,
            animation: `starTwinkle ${2 + Math.random() * 3}s ease-in-out infinite`,
          }}
        />
      ))}

      <div
        style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.85) 100%)",
        }}
      />

      <div
        style={{
          position: "absolute",
          zIndex: 20,
          textAlign: "center",
          maxWidth: "800px",
          padding: "0 2rem",
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "6px 18px",
            borderRadius: "999px",
            border: "1px solid rgba(55,183,195,0.4)",
            background: "rgba(8,131,149,0.12)",
            color: "#37B7C3",
            fontSize: "0.78rem",
            letterSpacing: "0.08em",
            fontFamily: "'DM Mono', monospace",
            backdropFilter: "blur(8px)",
            marginBottom: "2rem",
          }}
        >
          <span
            style={{
              width: 7,
              height: 7,
              borderRadius: "50%",
              background: "#37B7C3",
              boxShadow: "0 0 8px #37B7C3",
              display: "inline-block",
              animation: "pulse-dot 2s ease-in-out infinite",
            }}
          />
          TASKFLOW CORE v2.0
        </div>

        <h1
          style={{
            fontSize: "clamp(2.8rem, 7vw, 5.5rem)",
            fontWeight: 800,
            lineHeight: 1.08,
            letterSpacing: "-0.03em",
            fontFamily: "'Syne', sans-serif",
            marginBottom: "1.4rem",
            background: "linear-gradient(135deg, #EBF4F6 0%, #37B7C3 40%, #088395 70%, #05C7D6 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            filter: "drop-shadow(0 0 40px rgba(8,131,149,0.3))",
          }}
        >
          About TaskFlow
        </h1>

        <p
          style={{
            fontSize: "clamp(1rem, 2.2vw, 1.22rem)",
            color: "rgba(235,244,246,0.75)",
            maxWidth: 540,
            lineHeight: 1.75,
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 400,
            marginBottom: "2.8rem",
            letterSpacing: "0.01em",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          A structured, role-based web application designed to manage projects, teams, interns, and daily work reporting transparently.
        </p>

        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center", pointerEvents: "auto" }}>
          <button
            onClick={() => {
              const section = document.getElementById("system-overview");
              if (section) section.scrollIntoView({ behavior: "smooth" });
            }}
            style={{
              padding: "14px 34px",
              borderRadius: "12px",
              border: "none",
              background: "linear-gradient(135deg, #088395, #37B7C3)",
              color: "#EBF4F6",
              fontWeight: 700,
              fontSize: "0.97rem",
              fontFamily: "'DM Sans', sans-serif",
              letterSpacing: "0.02em",
              cursor: "pointer",
              boxShadow: "0 0 30px rgba(8,131,149,0.5), 0 4px 20px rgba(0,0,0,0.4)",
              transition: "all 0.25s ease",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = "translateY(-2px) scale(1.03)";
              e.currentTarget.style.boxShadow = "0 0 50px rgba(55,183,195,0.7), 0 8px 30px rgba(0,0,0,0.5)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = "translateY(0) scale(1)";
              e.currentTarget.style.boxShadow = "0 0 30px rgba(8,131,149,0.5), 0 4px 20px rgba(0,0,0,0.4)";
            }}
          >
            Explore System →
          </button>
        </div>
      </div>

      <div className="hud-boot-wrap">
        <div className="hud-glow-ring" />
        <HUDSVG svgRef={svgRef} />
      </div>
    </div>
  );
}


const roles = [
  { id: 'admin', title: 'Admin', icon: Shield, description: 'Super user with full monitoring access, views all projects, managers, and interns.', isMain: true },
  { id: 'manager', title: 'Manager', icon: Users, description: 'Create projects, sets deadlines, upload interns, form teams, assign leaders.', isMain: false },
  { id: 'team-leader', title: 'Team Leader', icon: UserCheck, description: 'Execution coordinator, Submits daily work reports for assigned team members.', isMain: false },
  { id: 'interns', title: 'Interns', icon: GraduationCap, description: 'System users under Team Leaders, no Login access.', isMain: false },
];

const features = [
  { icon: Lock, title: 'Secure Access Control', description: 'Granular permissions ensure users only access what they need.' },
  { icon: Eye, title: 'Activity Monitoring', description: 'Track all user actions with comprehensive audit logs.' },
  { icon: FileEdit, title: 'Custom Permissions', description: 'Create custom roles tailored to your organization\'s needs.' },
  { icon: BarChart3, title: 'Role Analytics', description: 'Insights into role usage and access patterns across teams.' },
];

const techItems = [
  { id: 1, label: "React.js", angle: 0, radius: 130, tooltip: "React.js with role-based dashboards" },
  { id: 2, label: "Node.js", angle: 45, radius: 130, tooltip: "Backend runtime for scalable server logic" },
  { id: 3, label: "JWT", angle: 90, radius: 130, tooltip: "Secure authentication using token-based access" },
  { id: 4, label: "Spring Boot", angle: 135, radius: 130, tooltip: "Robust backend framework for APIs and services" },
  { id: 5, label: "REST APIs", angle: 180, radius: 130, tooltip: "Standardized communication between client and server" },
  { id: 6, label: "MongoDB", angle: 225, radius: 130, tooltip: "NoSQL database with optimized query performance" },
];

const securityFeatures = [
  { id: 1, title: "Encrypted password with bcrypt", description: "Passwords are securely hashed using bcrypt. Strong encryption ensures protection against breaches and unauthorized access attempts.", tag: "Encryption" },
  { id: 2, title: "Role based route protection", description: "Access to routes is restricted based on user roles. Ensures only authorized users can view and perform specific actions.", tag: "Access Control" },
  { id: 3, title: "Unique email validation", description: "Ensures every user registers with a unique email address. Prevents duplication and maintains clean, reliable user records.", tag: "Validation" },
  { id: 4, title: "Server file upload validation", description: "All uploaded files are validated on the server side. Ensures only safe and allowed file types are accepted and processed securely.", tag: "File Security" },
  { id: 5, title: "JWT token expiration and refresh", description: "JWT tokens expire after a set duration for security. Refresh mechanisms ensure continuous access without compromising authentication safety.", tag: "Authentication" },
];

const systemManagesItems = [
  { icon: Server, text: "Projects" },
  { icon: Shield, text: "Teams" },
  { icon: UserPlus, text: "Interns" },
  { icon: Users, text: "Team Leaders" },
  { icon: FileText, text: "Daily Work Reports" },
  { icon: Calendar, text: "Deadlines & Progress" },
];

const keyObjectives = [
  { highlight: "Centralized", rest: "project monitoring" },
  { highlight: "Efficient", rest: "team creation & bulk intern onboarding via CSV/Excel" },
  { highlight: "Deadline", rest: "tracking & date wise work reporting" },
  { highlight: "Scalable", rest: "dashboards & performance visibility" },
];

const trustBadges = ["99.99% Uptime SLA", "ISO 27001", "HIPAA Ready", "24/7 Support"];


function TechPill({ item, orbitAngle }) {
  const [hovered, setHovered] = useState(false);
  const rad = ((item.angle + orbitAngle) * Math.PI) / 180;
  const x = Math.cos(rad) * item.radius;
  const y = Math.sin(rad) * item.radius;

  return (
    <div
      style={{ position: "absolute", left: "50%", top: "50%", transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))` }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="cursor-pointer"
    >
      <div
        style={{
          background: hovered ? "#c0edf0" : "#EBF4F6",
          border: hovered ? "1px solid #088395" : "1px solid #b5e4e9",
          color: "#065f6b",
          boxShadow: hovered ? "0 0 0 1px #37B7C3, 0 4px 20px rgba(8,131,149,0.18)" : "0 1px 6px rgba(0,0,0,0.07)",
          transition: "all 0.22s ease"
        }}
        className="rounded-full px-3 py-1.5 text-xs font-medium whitespace-nowrap select-none"
      >
        {item.label}
      </div>
      {hovered && (
        <div
          style={{
            position: "absolute", top: "calc(100% + 8px)", left: "50%", transform: "translateX(-50%)",
            background: "#ffffff", border: "1px solid #b5e4e9", boxShadow: "0 8px 24px rgba(8,131,149,0.12)",
            borderRadius: "8px", padding: "6px 10px", fontSize: "11px", color: "#374151", whiteSpace: "nowrap", zIndex: 20
          }}
        >
          {item.tooltip}
        </div>
      )}
    </div>
  );
}

function SecurityItem({ item, index }) {
  const [hovered, setHovered] = useState(false);
  const isLast = index === securityFeatures.length - 1;

  return (
    <div className="flex gap-4">
      <div className="flex flex-col items-center">
        <div
          style={{
            width: 10,
            height: 10,
            borderRadius: "50%",
            flexShrink: 0,
            marginTop: 6,
            position: "relative",
            zIndex: 2,
            backgroundColor: hovered ? "#088395" : "#37B7C3",
            boxShadow: hovered ? "0 0 12px #088395, 0 0 24px rgba(8,131,149,0.6)" : "none",
            transition: "background-color 0.2s ease"
          }}
        >
          {hovered && (
            <div
              style={{
                position: "absolute",
                inset: 0,
                borderRadius: "50%",
                backgroundColor: "#37B7C3",
                animation: "pulseRing 0.6s ease-out infinite"
              }}
            />
          )}
        </div>
        {!isLast && <div
          style={{
            width: 1,
            flex: 1,
            marginTop: 4,
            background: hovered
              ? "linear-gradient(to bottom, rgba(8,131,149,0.8), transparent)"
              : "linear-gradient(to bottom, #b5e4e9 60%, transparent)",
            position: "relative",
            overflow: "hidden"
          }}
        >
          {hovered && (
            <div
              style={{
                position: "absolute",
                width: "100%",
                height: "20%",
                background: "rgba(55,183,195,0.8)",
                animation: "flowDown 1.2s linear infinite"
              }}
            />
          )}
        </div>}
      </div>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          background: hovered
            ? "linear-gradient(135deg, #EBF4F6, #d4edf1)"
            : "linear-gradient(135deg, #ffffff, #f8fafc)",
          border: hovered
            ? "1px solid rgba(8,131,149,0.8)"
            : "1px solid #e5e7eb",
          outline: hovered ? "1px solid rgba(55,183,195,0.3)" : "none",
          borderRadius: 12,
          flex: 1,
          marginBottom: 12,
          transform: hovered ? "translateY(-3px)" : "translateY(0)",
          boxShadow: hovered
            ? "0 10px 40px rgba(8,131,149,0.22), 0 0 20px rgba(55,183,195,0.12)"
            : "0 2px 10px rgba(0,0,0,0.06)",
          transition: "all 0.25s ease"
        }}
        className="p-4 cursor-default relative overflow-hidden"
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: "-100%",
            width: "100%",
            height: "100%",
            background: "linear-gradient(120deg, transparent, rgba(55,183,195,0.15), transparent)",
            transition: "all 0.6s ease",
            transform: hovered ? "translateX(200%)" : "translateX(0)",
          }}
        />
        <div className="flex items-start justify-between gap-2 mb-1.5">
          <span
            className="text-sm font-semibold"
            style={{
              color: hovered ? "#065f6b" : "#1f2937",
              textShadow: hovered ? "0 0 8px rgba(8,131,149,0.3)" : "none",
              transition: "all 0.2s ease"
            }}
          >{item.title}</span>
          <span
            style={{
              fontSize: 10,
              fontWeight: 500,
              padding: "2px 8px",
              borderRadius: 999,
              border: "1px solid #e5e7eb",
              color: hovered ? "#088395" : "#6b7280",
              backgroundColor: hovered ? "#EBF4F6" : "#f1f5f9",
              borderColor: hovered ? "#37B7C3" : "#e5e7eb",
              whiteSpace: "nowrap",
              flexShrink: 0,
              transition: "all 0.2s ease",
              backdropFilter: "blur(6px)"
            }}
          >
            {item.tag}
          </span>
        </div>
        <p className="text-xs text-gray-500 leading-relaxed">{item.description}</p>
      </div>
    </div>
  );
}

function FloatingParticle({ style }) {
  const [offset, setOffset] = useState(0);
  const [opacity, setOpacity] = useState(0.12);

  useEffect(() => {
    const interval = setInterval(() => {
      setOffset(prev => prev === 0 ? -20 : 0);
      setOpacity(prev => prev === 0.12 ? 0.22 : 0.12);
    }, 4000 + Math.random() * 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        position: "absolute",
        width: 4,
        height: 4,
        borderRadius: "50%",
        backgroundColor: "#088395",
        opacity: opacity,
        transform: `translateY(${offset}px)`,
        transition: "transform 4s ease-in-out, opacity 4s ease-in-out",
        ...style
      }}
    />
  );
}

function CTACard() {
  const navigate = useNavigate();

  const handleStartTrial = () => {
    navigate('/register');
  };

  return (
    <section className="w-full px-4 py-12 mt-8">
      <div
        className="relative max-w-5xl mx-auto rounded-3xl overflow-hidden flex flex-col items-center justify-center py-10 md:py-12 gap-6"
        style={{
          background: "linear-gradient(135deg, #065f6b 0%, #088395 40%, #37B7C3 100%)",
          boxShadow: "0 20px 60px rgba(8,131,149,0.35)",
        }}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(235,244,246,0.04) 1px, transparent 1px),
              linear-gradient(90deg, rgba(235,244,246,0.04) 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
          }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-3xl"
          style={{
            boxShadow: "inset 0 0 60px 0 rgba(55,183,195,0.18)",
          }}
        />
        <h2 className="relative z-10 text-3xl md:text-5xl font-bold text-white tracking-tight text-center px-4">
          Ready to Transform Your Workflow?
        </h2>
        <button
          onClick={handleStartTrial}
          className="relative z-10 font-semibold px-7 py-3 rounded-xl transition-all duration-300 hover:scale-105 hover:-translate-y-1 cursor-pointer"
          style={{
            background: "#EBF4F6",
            color: "#065f6b",
            boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
          }}
          onMouseEnter={e => {
            e.currentTarget.style.boxShadow = "0 8px 30px rgba(235,244,246,0.3)";
          }}
          onMouseLeave={e => {
            e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.15)";
          }}
        >
          Start Free Trial →
        </button>
      </div>
    </section>
  );
}

function SecurityTechStack() {
  const [orbitAngle, setOrbitAngle] = useState(0);
  const [headerHovered, setHeaderHovered] = useState(false);

  useEffect(() => {
    let frame;
    let angle = 0;
    const animate = () => {
      angle += 0.12;
      setOrbitAngle(angle);
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, []);

  const particles = [
    { top: "12%", left: "8%" }, { top: "28%", left: "92%" }, { top: "55%", left: "4%" },
    { top: "72%", left: "88%" }, { top: "88%", left: "18%" }, { top: "40%", left: "96%" },
    { top: "6%", left: "55%" }, { top: "82%", left: "50%" },
  ];

  return (
    <div
      style={{
        padding: "60px 24px",
        fontFamily: "'DM Sans', 'Inter', sans-serif",
        position: "relative",
        overflow: "hidden",
        borderRadius: "24px",
        marginBottom: "64px",
      }}
    >
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
        <div
          style={{
            position: "absolute", top: "-10%", left: "-5%", width: 500, height: 500,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(8,131,149,0.07) 0%, transparent 70%)",
            filter: "blur(40px)", animation: "floatBg1 12s ease-in-out infinite"
          }}
        />
        <div
          style={{
            position: "absolute", bottom: "5%", right: "-5%", width: 600, height: 600,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(55,183,195,0.05) 0%, transparent 70%)",
            filter: "blur(50px)", animation: "floatBg2 15s ease-in-out infinite"
          }}
        />
      </div>
      {particles.map((s, i) => <FloatingParticle key={i} style={s} />)}

      <div style={{ display: "flex", justifyContent: "center", marginBottom: 48 }}>
        <div
          onMouseEnter={() => setHeaderHovered(true)}
          onMouseLeave={() => setHeaderHovered(false)}
          style={{
            display: "inline-flex", alignItems: "center", gap: 10,
            background: "rgba(255,255,255,0.9)", backdropFilter: "blur(12px)",
            border: headerHovered ? "1px solid #088395" : "1px solid #b5e4e9",
            borderRadius: 999, padding: "10px 22px", cursor: "default",
            transform: headerHovered ? "scale(1.04)" : "scale(1)",
            boxShadow: headerHovered ? "0 0 0 1.5px #37B7C3, 0 8px 32px rgba(8,131,149,0.16)" : "0 0 0 1px #d5eff2, 0 2px 12px rgba(0,0,0,0.06)",
            transition: "all 0.25s ease"
          }}
        >
          <svg
            width="18" height="18" viewBox="0 0 24 24" fill="none"
            stroke={headerHovered ? "#088395" : "#6b7280"}
            strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
            style={{ transform: headerHovered ? "rotate(18deg)" : "rotate(0deg)", transition: "transform 0.2s ease" }}
          >
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
          <span style={{ fontSize: 13, fontWeight: 600, letterSpacing: "0.02em", color: headerHovered ? "#088395" : "#374151", transition: "color 0.2s ease" }}>
            Security & Tech Stack
          </span>
        </div>
      </div>

      <div style={{ textAlign: "center", marginBottom: 56 }}>
        <h2 style={{ fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 700, color: "#0c3d44", letterSpacing: "-0.03em", marginBottom: 12, lineHeight: 1.15 }}>
          Built for the most<br /><span style={{ color: "#088395" }}>demanding teams.</span>
        </h2>
        <p style={{ fontSize: 15, color: "#6b7280", maxWidth: 440, margin: "0 auto", lineHeight: 1.65 }}>
          Enterprise-grade infrastructure with end-to-end security, powered by the tools your team already trusts.
        </p>
      </div>

      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        {/* Tech stack orbit */}
        <div>
          <div
  style={{
    marginBottom: 32,
    padding: "20px 24px",
    borderRadius: "16px",

    background: "rgba(255,255,255,0.08)",
    backdropFilter: "blur(20px)",

    border: "1px solid rgba(255,255,255,0.15)",

    boxShadow: "0 8px 32px rgba(0,0,0,0.25)",

    maxWidth: "fit-content"
  }}
>
  <p
    style={{
      fontSize: 11,
      fontWeight: 600,
      letterSpacing: "0.1em",
      color: "rgba(255,255,255,0.6)",
      textTransform: "uppercase",
      marginBottom: 6
    }}
  >
    TECH STACK
  </p>

  <h3
    style={{
      fontSize: 22,
      fontWeight: 700,
      color: "#ffffff",
      letterSpacing: "-0.025em",
      
    }}
  >
    The tools behind the product
  </h3>
</div>
          <div style={{ position: "relative", width: 320, height: 320, margin: "0 auto" }}>
            <div style={{ position: "absolute", inset: "15px", borderRadius: "50%", border: "1px dashed rgba(8,131,149,0.15)", animation: "spin 60s linear infinite" }} />
            <div style={{ position: "absolute", inset: "30px", borderRadius: "50%", border: "1px solid rgba(55,183,195,0.3)" }} />
            <div style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%,-50%)", zIndex: 5 }}>
              <div
                style={{
                  width: 72, height: 72, borderRadius: "50%",
                  background: "rgba(8,131,149,0.08)",
                  border: "1px solid rgba(55,183,195,0.5)",
                  boxShadow: "0 0 10px rgba(55,183,195,0.4), 0 0 25px rgba(8,131,149,0.25), inset 0 0 20px rgba(55,183,195,0.12)",
                  backdropFilter: "blur(10px)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  animation: "pulseGlow 3s ease-out infinite",
                }}
              >
                <svg width="28" height="28"
                  style={{ filter: "drop-shadow(0 0 6px #088395) drop-shadow(0 0 12px #37B7C3)" }}
                  viewBox="0 0 24 24" fill="none" stroke="#088395" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="3" width="20" height="14" rx="2" />
                  <rect x="4" y="5" width="16" height="10" rx="1.5" fill="rgba(8,131,149,0.08)" />
                  <rect x="5" y="6" width="10" height="1" rx="1" fill="#088395">
                    <animate attributeName="width" values="6;12;8;10" dur="2s" repeatCount="indefinite" />
                  </rect>
                  <rect x="5" y="8" width="8" height="1" rx="1" fill="#37B7C3">
                    <animate attributeName="width" values="4;10;6;8" dur="2s" repeatCount="indefinite" />
                  </rect>
                  <rect x="5" y="10" width="12" height="1" rx="1" fill="#8dd8de">
                    <animate attributeName="width" values="8;14;10;12" dur="2s" repeatCount="indefinite" />
                  </rect>
                  <circle cx="18" cy="13" r="0.8" fill="#088395">
                    <animate attributeName="opacity" values="1;0.2;1" dur="1s" repeatCount="indefinite" />
                  </circle>
                  <path d="M8 21h8M12 17v4" />
                </svg>
              </div>
            </div>
            {techItems.map((item, index) => {
              const angle = (360 / techItems.length) * index;
              return <TechPill key={item.id} item={{ ...item, angle }} orbitAngle={orbitAngle} />;
            })}
          </div>
          <div className="lg:hidden grid grid-cols-4 gap-2 mt-6">
            {techItems.map((item) => (
              <div
                key={item.id}
                style={{
                  border: "1px solid #b5e4e9", background: "#EBF4F6",
                  borderRadius: 8, padding: "6px 4px", textAlign: "center",
                  fontSize: 10, fontWeight: 500, color: "#065f6b", transition: "all 0.2s ease"
                }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.06)"; e.currentTarget.style.boxShadow = "0 0 0 1px #088395"; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "none"; }}
              >
                {item.label}
              </div>
            ))}
          </div>
        </div>

        {/* Security timeline */}
        <div>
          <div style={{ marginBottom: 28 }}>
            <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", color: "#9ca3af", textTransform: "uppercase", marginBottom: 6 }}>Security</p>
            <h3 style={{ fontSize: 22, fontWeight: 700, color: "#0c3d44", letterSpacing: "-0.025em" }}>Security you can rely on</h3>
          </div>
          <div>
            {securityFeatures.map((item, index) => (
              <SecurityItem key={item.id} item={item} index={index} />
            ))}
          </div>
        </div>
      </div>

      {/* Trust badges */}
      <div style={{ display: "flex", justifyContent: "center", gap: 32, marginTop: 72, flexWrap: "wrap" }}>
        {trustBadges.map((badge) => (
          <div
            key={badge}
            style={{
              display: "flex", alignItems: "center", gap: 6,
              border: "1px solid #b5e4e9", background: "#fff",
              borderRadius: 999, padding: "7px 16px", fontSize: 12, fontWeight: 500, color: "#065f6b",
              cursor: "default", transition: "all 0.2s ease"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 4px 16px rgba(8,131,149,0.12)";
              e.currentTarget.style.borderColor = "#088395";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "none";
              e.currentTarget.style.borderColor = "#b5e4e9";
            }}
          >
            <div style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: "#088395", opacity: 0.8 }} />
            {badge}
          </div>
        ))}
      </div>
      <CTACard />
    </div>
  );
}


const About = () => {
  const [hoveredRole, setHoveredRole] = useState(null);
  const [hoveredFeature, setHoveredFeature] = useState(null);

  return (
    <div className="min-h-screen" style={{ background: "#f8feff" }}>
      <style>{`
        @keyframes energyFlow {
          0%   { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
        @keyframes pulseIcon {
          0%,100% { box-shadow: 0 0 14px rgba(8,131,149,0.4); }
          50%      { box-shadow: 0 0 32px rgba(55,183,195,0.9); }
        }
        @keyframes pulseRing {
          0%   { transform: scale(1); opacity: 0.8; }
          100% { transform: scale(3); opacity: 0; }
        }
        @keyframes flowDown {
          0%   { top: -20%; }
          100% { top: 120%; }
        }
        @keyframes pulseGlow {
          0%,100% { box-shadow: 0 0 10px rgba(55,183,195,0.4), 0 0 25px rgba(8,131,149,0.25), inset 0 0 20px rgba(55,183,195,0.12); }
          50%      { box-shadow: 0 0 20px rgba(55,183,195,0.7), 0 0 50px rgba(8,131,149,0.45), inset 0 0 30px rgba(55,183,195,0.2); }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes floatBg1 {
          0%,100% { transform: translate(0,0) scale(1); }
          50%     { transform: translate(30px,-20px) scale(1.05); }
        }
        @keyframes floatBg2 {
          0%,100% { transform: translate(0,0) scale(1); }
          50%     { transform: translate(-20px,30px) scale(1.05); }
        }
      `}</style>

      <FuturisticHUD />

      <div 
  className="w-full"
  style={{
    background: `
      radial-gradient(circle at 50% 40%, rgba(55,183,195,0.15) 0%, transparent 40%),
      radial-gradient(circle at 80% 70%, rgba(55,183,195,0.08) 0%, transparent 50%),
      radial-gradient(circle at 20% 30%, rgba(8,131,149,0.25) 0%, transparent 50%),
      linear-gradient(180deg, #066b77 0%, #044c55 40%, #03363d 70%, #02262b 100%)
    `,
    position: "relative",
    overflow: "hidden"
  }}
>
  <div
  style={{
    position: "absolute",
    inset: 0,
    background: "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.6) 100%)",
    pointerEvents: "none",
    zIndex: 0
  }}
/>
<div
  style={{
    position: "absolute",
    inset: 0,
    backgroundImage: `
      linear-gradient(rgba(235,244,246,0.05) 1px, transparent 1px),
      linear-gradient(90deg, rgba(235,244,246,0.05) 1px, transparent 1px)
    `,
    backgroundSize: "60px 60px",
    opacity: 0.4,
    pointerEvents: "none"
  }}
/>
{Array.from({ length: 40 }).map((_, i) => (
  <div
    key={i}
    style={{
      position: "absolute",
      top: Math.random() * 100 + "%",
      left: Math.random() * 100 + "%",
      width: Math.random() * 3 + 1,
      height: Math.random() * 3 + 1,
      borderRadius: "50%",
      background: "#37B7C3",
      opacity: Math.random() * 0.5,
      animation: `floatParticle ${5 + Math.random() * 5}s ease-in-out infinite`
    }}
  />
))}

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 relative z-10">

          <div id="system-overview" className="mb-16">
            <div className="relative mb-8">
              <div
                className="absolute inset-0 rounded-2xl blur-sm opacity-80"
                style={{ background: "linear-gradient(135deg, #088395, #37B7C3)" }}
              />
              <div
                className="relative rounded-2xl p-6 sm:p-8 shadow-xl"
                style={{ background: "linear-gradient(135deg, #088395, #37B7C3)", boxShadow: "0 20px 50px rgba(8,131,149,0.35)" }}
              >
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="absolute inset-0 rounded-xl blur-md" style={{ background: "rgba(235,244,246,0.2)" }} />
                    <div className="relative rounded-xl p-3 border" style={{ background: "rgba(235,244,246,0.15)", borderColor: "rgba(235,244,246,0.25)" }}>
                      <ClipboardList className="w-7 h-7 text-white" strokeWidth={2} />
                    </div>
                  </div>
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">System Overview</h2>
                    <p className="text-sm mt-1" style={{ color: "rgba(235,244,246,0.8)" }}>Comprehensive platform management dashboard</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="max-w-3xl mx-auto mb-12 text-center">
              <p className="text-lg leading-relaxed" style={{ color: "#4a7a82" }}>
                The platform follows a hierarchical workflow ensuring proper monitoring, reporting,
                and accountability at every level. Admins oversee operations, Managers handle project
                execution, Team Leaders coordinate daily tasks, and Interns contribute under supervision.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* System Manages card */}
              <div className="group relative">
                <div
                  className="relative h-full p-6 sm:p-8 rounded-2xl border transition-all duration-300 hover:-translate-y-2"
                  style={{
                    background: "rgba(255,255,255,0.85)",
                    backdropFilter: "blur(20px)",
                    borderColor: "#b5e4e9",
                    boxShadow: "0 4px 20px rgba(8,131,149,0.08)",
                  }}
                  onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 20px 60px rgba(8,131,149,0.2)"; }}
                  onMouseLeave={e => { e.currentTarget.style.boxShadow = "0 4px 20px rgba(8,131,149,0.08)"; }}
                >
                  <div
                    className="absolute left-0 top-6 bottom-6 w-1 rounded-r-full overflow-hidden"
                  >
                    <div style={{ width: "100%", height: "100%", background: "linear-gradient(to bottom, #088395, #37B7C3)", animation: "energyFlow 2s linear infinite" }} />
                  </div>
                  <div className="flex items-center gap-3 mb-6 pl-4">
                    <div className="rounded-xl p-2.5 shadow-md group-hover:scale-110 transition-transform duration-300" style={{ background: "linear-gradient(135deg, #088395, #37B7C3)" }}>
                      <Settings className="w-5 h-5 text-white" strokeWidth={2} />
                    </div>
                    <h3 className="text-xl font-bold" style={{ color: "#0c3d44" }}>System Manages</h3>
                  </div>
                  <div className="space-y-0">
                    {systemManagesItems.map((item, index) => (
                      <div key={index} className="relative pl-4">
                        <div className="flex items-center gap-4 py-3.5 group/item transition-all duration-300 hover:translate-x-2">
                          <div
                            className="flex-shrink-0 w-7 h-7 rounded-full relative overflow-hidden flex items-center justify-center group-hover/item:scale-110 transition-transform duration-300"
                            style={{ background: "linear-gradient(135deg, #EBF4F6, #c8edf1)" }}
                          >
                            <div className="absolute inset-0 rounded-full animate-ping" style={{ backgroundColor: "rgba(55,183,195,0.2)" }} />
                            <CheckCircle2 className="w-4 h-4" style={{ color: "#088395" }} strokeWidth={2.5} />
                          </div>
                          <span className="font-medium transition-colors duration-300" style={{ color: "#374151" }}
                            onMouseEnter={e => { e.currentTarget.style.color = "#088395"; }}
                            onMouseLeave={e => { e.currentTarget.style.color = "#374151"; }}
                          >{item.text}</span>
                          <ArrowRight className="w-4 h-4 ml-auto opacity-0 group-hover/item:opacity-100 group-hover/item:translate-x-1 transition-all duration-300" style={{ color: "#37B7C3" }} />
                        </div>
                        {index < systemManagesItems.length - 1 && (
                          <div className="absolute left-11 right-0 h-px" style={{ background: "linear-gradient(to right, rgba(55,183,195,0.3), rgba(235,244,246,0.5), transparent)" }} />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Key Objectives card */}
              <div className="group relative">
                <div
                  className="relative h-full p-6 sm:p-8 rounded-2xl border transition-all duration-300 hover:-translate-y-2"
                  style={{
                    background: "rgba(255,255,255,0.85)",
                    backdropFilter: "blur(20px)",
                    borderColor: "#b5e4e9",
                    boxShadow: "0 4px 20px rgba(8,131,149,0.08)",
                  }}
                  onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 20px 60px rgba(8,131,149,0.2)"; }}
                  onMouseLeave={e => { e.currentTarget.style.boxShadow = "0 4px 20px rgba(8,131,149,0.08)"; }}
                >
                  <div className="absolute left-0 top-6 bottom-6 w-1 rounded-r-full overflow-hidden">
                    <div style={{ width: "100%", height: "100%", background: "linear-gradient(to bottom, #37B7C3, #088395)", animation: "energyFlow 2s linear infinite" }} />
                  </div>
                  <div className="flex items-center gap-3 mb-6 pl-4">
                    <div className="rounded-xl p-2.5 shadow-md group-hover:scale-110 transition-transform duration-300" style={{ background: "linear-gradient(135deg, #37B7C3, #088395)" }}>
                      <Activity className="w-5 h-5 text-white" strokeWidth={2} />
                    </div>
                    <h3 className="text-xl font-bold" style={{ color: "#0c3d44" }}>Key Objectives</h3>
                  </div>
                  <div className="space-y-0">
                    {keyObjectives.map((item, index) => (
                      <div key={index} className="relative pl-4">
                        <div className="flex items-start gap-4 py-3.5 group/item transition-all duration-300 hover:translate-x-2">
                          <div
                            className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center group-hover/item:scale-110 transition-transform duration-300"
                            style={{ background: "linear-gradient(135deg, #EBF4F6, #c8edf1)" }}
                          >
                            <Zap className="w-4 h-4" style={{ color: "#088395" }} strokeWidth={2.5} />
                          </div>
                          <div className="flex-1 pt-0.5">
                            <span style={{ color: "#374151" }}>
                              <span
                                className="font-bold"
                                style={{
                                  background: "linear-gradient(135deg, #088395, #37B7C3)",
                                  WebkitBackgroundClip: "text",
                                  WebkitTextFillColor: "transparent",
                                  backgroundClip: "text",
                                }}
                              >
                                {item.highlight}
                              </span>{" "}
                              {item.rest}
                            </span>
                          </div>
                        </div>
                        {index < keyObjectives.length - 1 && (
                          <div className="absolute left-11 right-0 h-px" style={{ background: "linear-gradient(to right, rgba(55,183,195,0.3), rgba(235,244,246,0.5), transparent)" }} />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── System Roles ── */}
          <div className="mb-16">
            <div className="relative mb-8">
              <div
                className="absolute inset-0 rounded-2xl blur-sm opacity-80"
                style={{ background: "linear-gradient(135deg, #065f6b, #37B7C3)" }}
              />
              <div
                className="relative rounded-2xl p-6 sm:p-8 shadow-xl"
                style={{ background: "linear-gradient(135deg, #065f6b, #088395, #37B7C3)", boxShadow: "0 20px 50px rgba(8,131,149,0.3)" }}
              >
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="absolute inset-0 rounded-xl blur-md" style={{ background: "rgba(235,244,246,0.2)" }} />
                    <div className="relative rounded-xl p-3 border" style={{ background: "rgba(235,244,246,0.15)", borderColor: "rgba(235,244,246,0.25)" }}>
                      <Shield className="w-7 h-7 text-white" strokeWidth={2} />
                    </div>
                  </div>
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">System Roles</h2>
                    <p className="text-sm mt-1" style={{ color: "rgba(235,244,246,0.8)" }}>Role-based architecture and access control</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Role cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {roles.map((role) => {
                const Icon = role.icon;
                const isHovered = hoveredRole === role.id;
                const isDimmed = hoveredRole !== null && !isHovered;
                return (
                  <div
                    key={role.id}
                    onMouseEnter={() => setHoveredRole(role.id)}
                    onMouseLeave={() => setHoveredRole(null)}
                    className={`relative group cursor-pointer transition-all duration-500 ${role.isMain ? 'lg:scale-[1.02]' : ''}`}
                    style={{
                      transform: isHovered ? 'translateY(-12px) scale(1.05)' : 'translateY(0) scale(1)',
                      opacity: isDimmed ? 0.6 : 1,
                      filter: isDimmed ? 'blur(1px)' : 'none',
                      transition: 'all 0.4s ease',
                    }}
                  >
                    <div
                      className="relative h-full p-6 rounded-2xl border overflow-hidden"
                      style={{
                        background: isHovered ? "linear-gradient(135deg, #fff, #EBF4F6)" : "#ffffff",
                        borderColor: isHovered ? "#37B7C3" : "#d5eff2",
                        boxShadow: isHovered
                          ? "0 20px 60px rgba(8,131,149,0.3), 0 0 0 1px rgba(55,183,195,0.3)"
                          : role.isMain
                            ? "0 8px 24px rgba(8,131,149,0.12)"
                            : "0 4px 12px rgba(0,0,0,0.06)",
                        transition: "all 0.4s ease",
                      }}
                    >
                      <div
                        style={{
                          position: "absolute", top: 0, left: "-100%", width: "100%", height: "100%",
                          background: "linear-gradient(120deg, transparent, rgba(55,183,195,0.12), transparent)",
                          transition: "left 0.6s ease",
                          left: isHovered ? "200%" : "-100%",
                        }}
                      />

                      <div
                        className="w-14 h-14 rounded-xl flex items-center justify-center mb-5 transition-all duration-300"
                        style={{
                          background: isHovered
                            ? "linear-gradient(135deg, #EBF4F6, #c8edf1)"
                            : "#f1f9fa",
                          transform: isHovered ? "scale(1.1) rotate(6deg)" : "scale(1) rotate(0deg)",
                          boxShadow: isHovered ? "0 0 30px rgba(8,131,149,0.5)" : "none",
                          animation: isHovered ? "pulseIcon 1.5s ease-in-out infinite" : "none",
                        }}
                      >
                        <Icon
                          className="w-7 h-7 transition-colors duration-300"
                          style={{ color: isHovered ? "#088395" : "#64a3aa" }}
                        />
                      </div>

                      <div className="relative mb-3">
                        <h3 className="text-xl font-semibold" style={{ color: "#0c3d44" }}>{role.title}</h3>
                        <div
                          className="absolute -bottom-1 left-0 h-0.5 rounded-full transition-all duration-300"
                          style={{
                            background: "linear-gradient(to right, #088395, #37B7C3)",
                            width: isHovered ? "60%" : "0%",
                          }}
                        />
                      </div>

                      <p className="text-sm leading-relaxed" style={{ color: "#6b7280" }}>{role.description}</p>

                      {role.isMain && (
                        <div
                          className="absolute -top-2 -right-2 px-2.5 py-1 text-white text-xs font-medium rounded-full shadow-lg"
                          style={{ background: "linear-gradient(135deg, #088395, #37B7C3)" }}
                        >
                          Primary
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex justify-center mb-12">
              <div
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border cursor-default transition-all duration-300"
                style={{ background: "#EBF4F6", borderColor: "#b5e4e9" }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 0 20px rgba(8,131,149,0.15)"; e.currentTarget.style.transform = "scale(1.05)"; }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "scale(1)"; }}
              >
                <Lock className="w-4 h-4" style={{ color: "#088395" }} />
                <span className="text-sm font-medium" style={{ color: "#065f6b" }}>All roles inherit permissions from lower levels with additional capabilities</span>
              </div>
            </div>

            {/* Feature cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                const isHovered = hoveredFeature === index;
                return (
                  <div
                    key={index}
                    onMouseEnter={() => setHoveredFeature(index)}
                    onMouseLeave={() => setHoveredFeature(null)}
                    className="relative p-6 rounded-2xl border cursor-default transition-all duration-300"
                    style={{
                      background: isHovered ? "#EBF4F6" : "#ffffff",
                      borderColor: isHovered ? "#37B7C3" : "#d5eff2",
                      boxShadow: isHovered
                        ? "0 16px 40px rgba(8,131,149,0.18), 0 0 0 1px rgba(55,183,195,0.2)"
                        : "0 4px 12px rgba(8,131,149,0.06)",
                      transform: isHovered ? "translateY(-4px)" : "translateY(0)",
                      transition: "all 0.3s ease",
                    }}
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300"
                        style={{
                          background: isHovered
                            ? "linear-gradient(135deg, #EBF4F6, #c8edf1)"
                            : "#f1f9fa",
                          transform: isHovered ? "scale(1.08)" : "scale(1)",
                          boxShadow: isHovered ? "0 4px 12px rgba(8,131,149,0.2)" : "none",
                        }}
                      >
                        <Icon
                          className="w-6 h-6 transition-colors duration-300"
                          style={{ color: isHovered ? "#088395" : "#64a3aa" }}
                        />
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold mb-1" style={{ color: "#0c3d44" }}>{feature.title}</h4>
                        <p className="text-sm leading-relaxed" style={{ color: "#6b7280" }}>{feature.description}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>

      <div
  className="w-full"
  style={{
    background: `
      radial-gradient(circle at 50% 30%, rgba(255,255,255,0.15) 0%, transparent 40%),
      radial-gradient(circle at 80% 70%, rgba(0,0,0,0.25) 0%, transparent 50%),
      radial-gradient(circle at 20% 30%, rgba(0,0,0,0.2) 0%, transparent 50%),
      linear-gradient(180deg, #37B7C3 0%, #249aa6 35%, #176d75 65%, #0f4c52 100%)
    `,
    position: "relative",
    overflow: "hidden"
  }}
>
  <div
  style={{
    position: "absolute",
    inset: 0,
    background: "radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.65) 100%)",
    pointerEvents: "none",
    zIndex: 0
  }}
/>
<div
  style={{
    position: "absolute",
    inset: 0,
    opacity: 0.08,
    pointerEvents: "none",
    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`
  }}
/>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 relative z-10">

          <SecurityTechStack />

          {/* Status badge */}
          <div className="text-center">
            <div
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border shadow-sm"
              style={{ background: "rgba(235,244,246,0.8)", backdropFilter: "blur(8px)", borderColor: "#b5e4e9" }}
            >
              <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: "#088395" }} />
              <span className="text-sm font-medium" style={{ color: "#065f6b" }}>All Services Operational</span>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};

export default About;