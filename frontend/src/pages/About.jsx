import { motion, useMotionValue, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Users, CheckCircle, BarChart3 } from "lucide-react";
import {
  FileText,
  Target,
  ShieldCheck,
  HeartPulse,
  Wrench,
  Crown,
  User,
  Lock,
  Radio,
  Settings,
  TrendingUp,
  Plug
} from "lucide-react";

// \\\\\\\\\\\\\\\\\\\\\\
// HERO BUTTONS COMPONENT
// //////////////////////

const HeroButtons = ({ setShowVideo }) => {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full">

      <motion.button
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="w-full sm:w-auto px-8 py-4 rounded-2xl font-semibold text-lg text-white will-change-transform will-change-transform"
        style={{
          background: "linear-gradient(135deg, #49225B 0%, #6E3482 50%, #A56ABD 100%)",
          boxShadow: `
    8px 8px 18px rgba(0,0,0,0.4),
    -4px -4px 12px rgba(255,255,255,0.08),
    inset 0 1px 1px rgba(255,255,255,0.15)
  `
        }}
        whileHover={{
  y: -4,
  scale: 1.03,
  transition: { duration: 0.15 }
}}
        whileTap={{
          scale: 0.95,
          boxShadow: `
    inset 6px 6px 12px rgba(0,0,0,0.5),
    inset -4px -4px 8px rgba(255,255,255,0.1)
  `
        }}
        onClick={() => {
          document.getElementById("platform")?.scrollIntoView({
            behavior: "smooth"
          });
        }}
      >
        Explore System →
      </motion.button>

      <motion.button
        className="w-full sm:w-auto px-8 py-4 rounded-2xl font-semibold text-lg"
        style={{
          background: "rgba(245, 235, 250, 0.9)",
          color: "#49225B",
          borderRadius: "20px",
          boxShadow: `
  8px 8px 18px rgba(73, 34, 91, 0.25),
  -6px -6px 12px rgba(255, 255, 255, 0.6),
  inset 0 1px 1px rgba(255,255,255,0.5)
`
        }}
        whileHover={{
          y: -3,
          scale: 1.05,
          boxShadow: `
    12px 12px 25px rgba(73, 34, 91, 0.3),
    -6px -6px 12px rgba(255,255,255,0.7)
  `
        }}
        whileTap={{
          scale: 0.95,
          boxShadow: `
    inset 6px 6px 12px rgba(73,34,91,0.25),
    inset -6px -6px 12px rgba(255,255,255,0.7)
  `
        }}
        onClick={() => setShowVideo(true)}
      >
        Watch Demo
      </motion.button>

    </div>
  );
};

// \\\\\\\\\\\\\\\\\\\\\
// STYLES (Embedded CSS)
// /////////////////////

const styles = `
  /* Neumorphism Raised Effect */
  .neu-raised {
  background: rgba(245, 235, 250, 0.9);
  border-radius: 24px;
  box-shadow: 6px 6px 14px rgba(73, 34, 91, 0.2),
              -3px -3px 8px rgba(255, 255, 255, 0.25);
}

  .neu-raised-sm {
    background: #F5EBFA;
    border-radius: 16px;
    box-shadow: 8px 8px 16px rgba(73, 34, 91, 0.08),
                -8px -8px 16px rgba(255, 255, 255, 0.8);
  }

  /* Neumorphism Pressed Effect */
  .neu-pressed {
    background: #F5EBFA;
    border-radius: 20px;
    box-shadow: inset 6px 6px 12px rgba(73, 34, 91, 0.08),
                inset -6px -6px 12px rgba(255, 255, 255, 0.8);
  }

  /* Glassmorphism Card */
  .glass-card {
    background: rgba(245, 235, 250, 0.7);
    backdrop-filter: blur(10px);
    border-radius: 24px;
    border: 1px solid rgba(255, 255, 255, 0.3);
    box-shadow: 0 8px 32px rgba(73, 34, 91, 0.1);
    transition: all 0.3s ease;
  }

  .glass-card:hover {
    background: rgba(245, 235, 250, 0.85);
    border-color: rgba(165, 106, 189, 0.3);
  }

  /* Gradient Backgrounds */
  .gradient-primary {
    background: linear-gradient(135deg, #49225B 0%, #6E3482 50%, #A56ABD 100%);
  }

  .gradient-accent {
    background: linear-gradient(135deg, #6E3482 0%, #A56ABD 100%);
  }

  /* Text Gradient */
  .text-gradient {
    background: linear-gradient(135deg, #49225B 0%, #6E3482 50%, #A56ABD 100%);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }

  /* Glow Effects */
  .glow-primary {
    background: "linear-gradient(135deg, #49225B 0%, #6E3482 50%, #A56ABD 100%)",
  boxShadow: "8px 8px 18px rgba(0,0,0,0.4)"
  }

  .glow-accent {
    box-shadow: 0 0 20px rgba(110, 52, 130, 0.3);
  }

  /* Custom Scrollbar */
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: #E7DBEF;
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb {
    background: linear-gradient(135deg, #49225B, #A56ABD);
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(135deg, #6E3482, #A56ABD);
  }

  /* Animations */
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-20px); }
  }

  @keyframes pulse-glow {
    0%, 100% { opacity: 0.3; }
    50% { opacity: 0.6; }
  }

  .animate-float {
    animation: float 6s ease-in-out infinite;
  }

  .animate-pulse-glow {
    animation: pulse-glow 3s ease-in-out infinite;
  }

  ::selection {
    background: rgba(165, 106, 189, 0.3);
    color: #49225B;
  }
`;

if (typeof document !== 'undefined') {
  const styleSheet = document.createElement("style");
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);
}

// /////
// HOOKS
// \\\\\

const useMouseParallax = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return mousePosition;
};

// /////////////////////////////////////////////////
// HERO SECTION (UPDATED WITH HeroButtons COMPONENT)
// \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

const stats = [
  { icon: Users, value: "24", label: "Team Members" },
  { icon: CheckCircle, value: "98%", label: "Reports Complete" },
  { icon: BarChart3, value: "78%", label: "Progress" },
];

const easeCustom = [0.22, 1, 0.36, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: easeCustom },
  }),
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: (i) => ({
    opacity: 1,
    scale: 1,
    transition: { delay: 0.6 + i * 0.12, duration: 0.5, ease: easeCustom },
  }),
};

const HeroSection = () => {
  const [showVideo, setShowVideo] = useState(false);
  return (
    <section className="relative min-h-[110vh] overflow-hidden w-full" 
    style={{ backgroundColor: "#49225B" }}>
      <motion.div
        className="absolute top-20 left-[10%] w-16 h-16 rounded-full opacity-60"
        style={{ background: "linear-gradient(135deg, #B980EA, #9B51E0)" }}
        animate={{ y: [0, -25, 0], rotate: [0, 180, 360] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-32 right-[15%] w-10 h-10 rounded-full opacity-50"
        style={{ background: "linear-gradient(135deg, #D4A5FF, #B980EA)" }}
        animate={{ y: [0, -18, 0], x: [0, 10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-32 right-[8%] w-12 h-12 opacity-40 rotate-45"
        style={{ background: "linear-gradient(135deg, #C78BFA, #A35FDD)" }}
        animate={{ y: [0, -15, 0], rotate: [45, 135, 45] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />
      <motion.div
        className="absolute bottom-40 left-[5%] w-8 h-8 rounded-full opacity-30"
        style={{ background: "linear-gradient(135deg, #E1B9FF, #C48EF5)" }}
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-20">

        <motion.h1
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="font-sans tracking-tight text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold text-center leading-tight mb-6 drop-shadow-2xl"
          style={{
            color: "#EDE6F5",
            textShadow: `
    3px 3px 6px rgba(0,0,0,0.4),
    -2px -2px 4px rgba(255,255,255,0.08)
  `
          }}
        >
          About <span
            style={{
              color: "#D4A5FF",
              textShadow: `
      0 0 10px rgba(212,165,255,0.6),
      2px 2px 6px rgba(0,0,0,0.5),
      -1px -1px 3px rgba(255,255,255,0.1)
    `
            }}
          >TaskFlow</span>
        </motion.h1>

        <motion.p
          custom={2}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="text-base sm:text-lg md:text-xl text-center max-w-2xl mb-10 leading-relaxed font-medium opacity-90"
          style={{
            color: "rgba(230, 210, 255, 0.85)",
            textShadow: `
    1px 1px 2px rgba(0,0,0,0.4),
    -1px -1px 2px rgba(255,255,255,0.05)
  `,
            letterSpacing: "0.3px"
          }}
        >
          A structured, role-based web application designed to manage projects,
          teams, interns, and daily work reporting transparently.
        </motion.p>

        <motion.div
          custom={3}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="w-full flex justify-center"
        >
          <HeroButtons setShowVideo={setShowVideo} />
        </motion.div>
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 mt-16">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              custom={i}
              variants={scaleIn}
              initial="hidden"
              animate="visible"
              whileHover={{ y: -5, boxShadow: "0 15px 30px rgba(185, 128, 234, 0.2)" }}
              className="rounded-2xl px-7 py-5 flex items-center gap-4 min-w-[180px] shadow-lg"
              style={{ background: "rgba(255, 255, 255, 0.08)", backdropFilter: "blur(8px)", border: "1px solid rgba(255, 255, 255, 0.15)" }}
            >
              <span className="w-12 h-12 rounded-xl flex items-center justify-center shadow-md" style={{ background: "rgba(185, 128, 234, 0.25)" }}>
                <stat.icon className="w-5 h-5" style={{ color: "#D4A5FF" }} />
              </span>
              <div>
                <p className="text-2xl font-bold" style={{ color: "#FFFFFF" }}>{stat.value}</p>
                <p className="text-sm" style={{ color: "#E0D0F5" }}>{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-10">
        <svg
          viewBox="0 0 1440 150"
          className="w-full h-[120px]"
          preserveAspectRatio="none"
        >
          <path
            d="M0,80 C300,160 1100,0 1440,80 L1440,150 L0,150 Z"
            fill="#F5EBFA"
          />
        </svg>
      </div>

      {showVideo && (
        <div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
          onClick={() => setShowVideo(false)}
        >
          <div className="relative w-[90%] md:w-[700px]">
            <button
              className="absolute -top-10 right-0 text-white text-xl hover:text-gray-300 transition-colors"
              onClick={() => setShowVideo(false)}
            >
              ✖
            </button>
            <video
              src="/Aboutproject.mp4"
              controls
              autoPlay
              className="w-full rounded-xl"
            />
          </div>
        </div>
      )}
    </section>
  );
};

// ////////////////////////
// SYSTEM OVERVIEW SECTION
// \\\\\\\\\\\\\\\\\\\\\\\\

const systemManages = [
  "Projects", "Teams", "Interns",
  "Team Leaders", "Daily Work Reports", "Deadlines & Progress"
];

const keyObjectives = [
  "Centralized project monitoring",
  "Efficient team creation & bulk intern onboarding via CSV/Excel",
  "Deadline tracking & date-wise reporting",
  "Scalable dashboards & performance visibility",
];

const NeuCard = ({ children, delay = 0 }) => {
  return (
    <motion.div
      className="neu-raised p-8"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      whileHover={{
        y: -8,
        boxShadow: "20px 20px 40px rgba(73,34,91,0.15), -20px -20px 40px rgba(255,255,255,0.9)"
      }}
    >
      {children}
    </motion.div>
  );
};

const SystemOverview = () => {
  return (
    <section
      id="platform"
      className="py-24 px-6 lg:px-12 relative"
      style={{ background: "#F5EBFA" }}
    >
      <div className="container mx-auto max-w-6xl">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-sm font-semibold text-[#A56ABD] tracking-wider uppercase mb-2 block">
            Platform Capabilities
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gradient">
            Comprehensive Platform Management
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: "#6E3482" }}>
            The platform follows a hierarchical workflow ensuring proper monitoring, reporting, and accountability at every level.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          <NeuCard delay={0.1}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl gradient-primary flex items-center justify-center">
<FileText className="w-5 h-5 text-white" />              </div>
              <h3 className="text-xl font-bold" style={{ color: "#49225B" }}>System Manages</h3>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {systemManages.map((item, i) => (
                <motion.div
                  key={item}
                  className="neu-pressed px-4 py-3 text-sm font-medium text-center"
                  style={{ color: "#49225B" }}
                  whileHover={{ scale: 1.03 }}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.05 }}
                >
                  {item}
                </motion.div>
              ))}
            </div>
          </NeuCard>

          <NeuCard delay={0.2}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl gradient-accent flex items-center justify-center">
                <Target className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-bold" style={{ color: "#49225B" }}>Key Objectives</h3>
            </div>
            <div className="space-y-3">
              {keyObjectives.map((item, i) => (
                <motion.div
                  key={item}
                  className="flex items-start gap-3 neu-pressed px-4 py-3"
                  whileHover={{ scale: 1.02 }}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <span className="w-6 h-6 rounded-lg gradient-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs text-white">{i + 1}</span>
                  </span>
                  <span className="text-sm font-medium" style={{ color: "#49225B" }}>{item}</span>
                </motion.div>
              ))}
            </div>
          </NeuCard>
        </div>

        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          {[
            { value: "10K+", label: "Active Users" },
            { value: "500+", label: "Projects Managed" },
            { value: "99.9%", label: "Uptime" },
            { value: "24/7", label: "Support" },
          ].map((stat, i) => (
            <div key={i} className="text-center neu-raised p-6">
              <div className="text-3xl font-bold text-gradient mb-2">{stat.value}</div>
              <div className="text-sm text-[#6E3482]">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

// \\\\\\\\\\\\\\\\\\\\\\\\\\\\\
// SECURITY & TECH STACK SECTION
// /////////////////////////////

const techStack = ["React.js", "Node.js", "JWT", "Spring Boot", "REST APIs", "MongoDB"];
const securityFeatures = [
  "Encrypted password with bcrypt",
  "Role based route protection",
  "Unique email validation",
  "Server file upload validation",
  "JWT token expiration and refresh",
];
const trustBadges = [
  { icon: ShieldCheck, label: "99.99% Uptime SLA" },
  { icon: FileText, label: "ISO 27001" },
  { icon: HeartPulse, label: "HIPAA Ready" },
  { icon: Wrench, label: "24/7 Support" },
];

const SecurityTechStack = () => {
  return (
    <section className="py-24 px-6 lg:px-12 relative overflow-hidden" style={{ background: "linear-gradient(180deg, #F5EBFA, #E7DBEF)" }}>
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-3xl opacity-20"
        style={{ background: "#A56ABD" }}
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 6, repeat: Infinity }}
      />

      <div className="container mx-auto max-w-6xl relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-sm font-semibold text-[#A56ABD] tracking-wider uppercase mb-2 block">
            Enterprise Grade
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gradient">Security & Tech Stack</h2>
          <p className="text-lg" style={{ color: "#6E3482" }}>Built for the most demanding teams.</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          <motion.div
            className="neu-raised p-8"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-bold mb-8 text-center" style={{ color: "#49225B" }}>Tech Stack</h3>
            <div className="relative w-64 h-64 mx-auto">
              <div className="absolute inset-0 rounded-full border-2 border-dashed" style={{ borderColor: "rgba(165,106,189,0.3)" }} />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full gradient-primary flex items-center justify-center glow-primary">
                <span className="text-xs font-bold text-white">CORE</span>
              </div>
              {techStack.map((tech, i) => {
                const angle = (i * 360) / techStack.length - 90;
                const rad = (angle * Math.PI) / 180;
                const x = Math.cos(rad) * 110;
                const y = Math.sin(rad) * 110;
                return (
                  <motion.div
                    key={tech}
                    className="absolute neu-raised-sm px-3 py-2 text-xs font-semibold whitespace-nowrap"
                    style={{
                      color: "#49225B",
                      left: `calc(50% + ${x}px - 35px)`,
                      top: `calc(50% + ${y}px - 14px)`,
                    }}
                    whileHover={{ scale: 1.15, zIndex: 20 }}
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 3, delay: i * 0.3, repeat: Infinity }}
                  >
                    {tech}
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          <motion.div
            className="neu-raised p-8"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-bold mb-8" style={{ color: "#49225B" }}>Security Features</h3>
            <div className="space-y-1">
              {securityFeatures.map((feature, i) => (
                <motion.div
                  key={feature}
                  className="flex items-center gap-4 py-3"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div className="relative flex flex-col items-center">
                    <div className="w-4 h-4 rounded-full gradient-primary glow-accent z-10" />
                    {i < securityFeatures.length - 1 && (
                      <div className="w-0.5 h-8 absolute top-4" style={{ background: "rgba(110,52,130,0.3)" }} />
                    )}
                  </div>
                  <div className="neu-pressed px-4 py-2 flex-1">
                    <span className="text-sm font-medium" style={{ color: "#49225B" }}>{feature}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {trustBadges.map((badge, i) => (
            <motion.div
              key={badge.label}
              className="neu-raised p-5 text-center group cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -6, boxShadow: "0 0 40px rgba(165,106,189,0.25)" }}
            >
              <div className="w-12 h-12 mx-auto mb-3 rounded-2xl gradient-accent flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                <badge.icon className="w-6 h-6 text-white" />
              </div>
              <span className="text-sm font-bold" style={{ color: "#49225B" }}>{badge.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// \\\\\\\\\\\\\\\\\\\\
// SYSTEM ROLES SECTION
// ////////////////////

const roles = [
  {
    title: "Admin",
    desc: "Super user with full monitoring access",
    icon: Crown,
    gradient: "linear-gradient(135deg, #49225B, #6E3482)",
    features: ["Full system access", "User management", "Analytics dashboard"]
  },
  {
    title: "Manager",
    desc: "Create projects, sets deadlines, upload interns, form teams, assign leaders",
    icon: BarChart3,
    gradient: "linear-gradient(135deg, #49225B, #6E3482)",
    features: ["Project creation", "Team formation", "Deadline management"]
  },
  {
    title: "Team Leader",
    desc: "Execution coordinator, submits daily work reports",
    icon: Target,
    gradient: "linear-gradient(135deg, #6E3482, #49225B)",
    features: ["Daily reporting", "Team coordination", "Progress tracking"]
  },
  {
    title: "Interns",
    desc: "System users under Team Leaders",
    icon: User,
    gradient: "linear-gradient(135deg, #6E3482, #49225B)",
    features: ["Task management", "Learning path", "Performance reviews"]
  },
];

const SystemRoles = () => {
  return (
    <section className="py-24 px-6 lg:px-12 relative overflow-hidden" style={{ background: "#F5EBFA" }}>
      <div className="container mx-auto max-w-6xl relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-sm font-semibold text-[#A56ABD] tracking-wider uppercase mb-2 block">
            Role-Based Access Control
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gradient">Role-Based Architecture</h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: "#6E3482" }}>
            Each role comes with specific permissions and responsibilities
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {roles.map((role, i) => (
            <motion.div
              key={role.title}
              className="neu-raised p-6 text-center group cursor-pointer"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -12, scale: 1.02, boxShadow: "20px 20px 40px rgba(73,34,91,0.18), -15px -15px 30px rgba(255,255,255,0.9)" }}
            >
              <motion.div
                className="w-20 h-20 mx-auto mb-4 rounded-2xl flex items-center justify-center text-3xl"
                style={{ background: role.gradient }}
                whileHover={{ rotate: 10, scale: 1.1 }}
              >
                <role.icon className="w-8 h-8 text-white" />
              </motion.div>
              <h3 className="text-xl font-bold mb-2" style={{ color: "#49225B" }}>{role.title}</h3>
              <p className="text-sm leading-relaxed mb-4" style={{ color: "#6E3482" }}>{role.desc}</p>
              <div className="space-y-1">
                {role.features.map((feature, idx) => (
                  <div key={idx} className="text-xs text-[#A56ABD]">✓ {feature}</div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-16 flex justify-center"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <div className="glass-card px-8 py-6">
            <p className="text-sm font-semibold text-[#49225B] mb-3">System Hierarchy</p>
            <div className="flex items-center gap-4 flex-wrap justify-center">
              {["Admin", "Manager", "Team Leader", "Interns"].map((role, i) => (
                <div key={role} className="flex items-center">
                  <div className="neu-pressed px-4 py-2 rounded-xl">
                    <span className="text-sm font-medium text-[#49225B]">{role}</span>
                  </div>
                  {i < 3 && (
                    <svg className="w-5 h-5 mx-2 text-[#A56ABD]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  )}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// /////////////////
// FEATURES SECTION
// \\\\\\\\\\\\\\\\\

const features = [
  { title: "Secure Access Control", icon: Lock, desc: "Multi-layer authentication and authorization"},
  { title: "Activity Monitoring", icon: Radio, desc: "Real-time tracking of all system activities" },
  { title: "Custom Permissions", icon: Settings, desc: "Fine-grained permission management", color: "#49225B" },
  { title: "Role Analytics", icon: TrendingUp, desc: "Comprehensive role-based analytics dashboard"},
  { title: "Real-time Reports", icon: BarChart3, desc: "Instant report generation and sharing"},
  { title: "API Integration", icon: Plug, desc: "Seamless third-party integrations"},
];

const FeaturesSection = () => {
  const [showAll, setShowAll] = useState(false);
  return (
    <section className="py-24 px-6 lg:px-12 relative overflow-hidden" style={{ background: "linear-gradient(180deg, #E7DBEF, #F5EBFA)" }}>
      <div className="container mx-auto max-w-6xl relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-sm font-semibold text-[#A56ABD] tracking-wider uppercase mb-2 block">
            Powerful Features
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gradient mb-4">Core Features</h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: "#6E3482" }}>
            Everything you need to manage your team effectively
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {(showAll ? features : features.slice(0, 3)).map((f, i) => (
            <motion.div
              key={f.title}
              className="glass-card p-6 text-center group"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -8, boxShadow: "0 0 40px rgba(165,106,189,0.3)" }}
            >
              <motion.div
                className="text-4xl mb-4 inline-block"
                whileHover={{ scale: 1.2, rotate: 5 }}
              >
                <f.icon className="w-10 h-10 mx-auto mb-4 text-purple-600" />
              </motion.div>
              <h3 className="text-lg font-bold mb-2" style={{ color: "#49225B" }}>{f.title}</h3>
              <p className="text-sm" style={{ color: "#6E3482" }}>{f.desc}</p>
              <motion.div
                className="mt-4 w-12 h-0.5 mx-auto rounded-full"
                style={{ background: "#A56ABD" }}
                initial={{ width: 0 }}
                whileInView={{ width: 48 }}
                transition={{ delay: i * 0.1 + 0.3 }}
              />
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <p className="text-[#6E3482] mb-4">And so much more...</p>
          <motion.button
            className="neu-raised px-8 py-3 rounded-xl font-semibold"
            style={{ color: "#49225B" }}
            whileHover={{ scale: 1.05 }}
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? "Show Less ↑" : "View All Features →"}
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

// ============
// CTA SECTION
// ============

const CTASection = () => {
  return (
    <section className="py-24 px-6 lg:px-12 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #49225B, #6E3482)" }}>
      <motion.div
        className="absolute top-10 right-20 w-80 h-80 rounded-full blur-3xl opacity-20"
        style={{ background: "#A56ABD" }}
        animate={{ scale: [1, 1.3, 1] }}
        transition={{ duration: 5, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-10 left-20 w-60 h-60 rounded-full blur-3xl opacity-15"
        style={{ background: "#E7DBEF" }}
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 4, delay: 1, repeat: Infinity }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-3xl opacity-10"
        style={{ background: "#F5EBFA" }}
        animate={{ scale: [1, 1.4, 1] }}
        transition={{ duration: 7, repeat: Infinity }}
      />

      <div className="container mx-auto max-w-4xl text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >

        </motion.div>

        <motion.h2
          className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
          style={{ color: "#F5EBFA" }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          Where Productivity Meets Simplicity
        </motion.h2>

        <motion.p
          className="text-lg md:text-xl mb-8 opacity-90"
          style={{ color: "#E7DBEF" }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          Everything your team needs to plan, track, and succeed — in one place.
        </motion.p>

        <motion.div
          className="flex flex-wrap gap-4 justify-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <Link to="/register">
            <motion.button
              className="px-10 py-4 rounded-2xl font-semibold text-lg cursor-pointer"
              style={{ background: "#F5EBFA", color: "#49225B" }}
              whileHover={{ scale: 1.05, boxShadow: "0 0 50px rgba(245,235,250,0.4)" }}
              whileTap={{ scale: 0.97 }}
            >
              Start Free Trial →
            </motion.button>
          </Link>
          <Link to="/contact">
            <motion.button
              className="px-8 py-4 rounded-2xl font-semibold text-lg border"
              style={{ border: "2px solid #F5EBFA", color: "#F5EBFA", background: "transparent" }}
              whileHover={{ scale: 1.05, background: "rgba(245,235,250,0.1)" }}
              whileTap={{ scale: 0.97 }}
            >
              Schedule Demo
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

// \\\\\\\\\\\\\\\\\\\\\\\\\
// MAIN ABOUT PAGE COMPONENT
// /////////////////////////

const AboutPage = () => {
  // Smooth scroll behavior
  useEffect(() => {
    const handleAnchorClick = (e) => {
      const target = e.target.closest('a');
      if (target && target.hash && target.hash.startsWith('#')) {
        e.preventDefault();
        const element = document.querySelector(target.hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);
    return () => document.removeEventListener('click', handleAnchorClick);
  }, []);

  return (
    <div className="relative w-full max-w-[100vw] overflow-hidden">
      <HeroSection />
      <SystemOverview />
      <SecurityTechStack />
      <SystemRoles />
      <FeaturesSection />
      <CTASection />
    </div>
  );
};

export default AboutPage;