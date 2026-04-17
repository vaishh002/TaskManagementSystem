import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  LayoutGrid,
  ShieldCheck,
  UserPlus,
  FolderKanban,
  BarChart3,
  Search,
  X,
  ChevronDown,
  Share2,
  Bookmark,
  ArrowRight,
  Link2,
  HelpCircle,
  Clock,
  ThumbsUp,
  MessageCircle,
  AlertCircle,
  Sparkles,
  Zap,
} from "lucide-react";

//── Importing your images (place them in the same folder or adjust paths)
//import heroBg from "./bgimage.png";
//import helpIcon from "./help.png";
//import supportBg from "./support.png";
//import supportCardBg from "./supportcardbg.png";
import contactcardbg from "./contactcardbg.jpg";
import herosection from "./herosection.jpg";
import gettingStartedIcon from "./GettingStartedGuide.png";
import videoTutorialsIcon from "./Videotutorials.png";
import faqIcon from "./faq.png";
import apiIcon from "./api.png";
import noteIcon from "./note.png";

/* ─── Color Palette
   #49225B  → darkPurple   (primary dark)
   #6E3482  → medPurple  (primary accent)
   #A56ABD  → lightPurple (secondary accent)
   #E7DBEF  → paleLavender (background / light surface)
─────────────────────────────────────────────── */

/* ─── Animated Accordion Item ────────────────────────────── */
const AccordionItem = ({ faq, idx, isOpen, onToggle }) => {
  const bodyRef = useRef(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (bodyRef.current) {
      setHeight(isOpen ? bodyRef.current.scrollHeight : 0);
    }
  }, [isOpen]);

  const categoryColors = {
    access: "bg-[#E7DBEF] text-[#49225B]",
    onboarding: "bg-[#E7DBEF] text-[#6E3482]",
    projects: "bg-[#E7DBEF] text-[#A56ABD]",
    reporting: "bg-[#E7DBEF] text-[#49225B]",
    deadlines: "bg-[#E7DBEF] text-[#6E3482]",
    general: "bg-[#E7DBEF] text-[#A56ABD]",
  };

  const badgeClass =
    categoryColors[faq.category] || "bg-[#E7DBEF] text-[#49225B]";

  return (
    <div
      className={`group bg-white rounded-2xl border transition-all duration-300 overflow-hidden faq-card backdrop-blur-sm ${
        isOpen
          ? "border-[#A56ABD] shadow-2xl shadow-[#6E3482]/20 scale-100"
          : "border-[#E7DBEF] shadow-md hover:shadow-lg hover:border-[#A56ABD] hover:scale-[1.02]"
      }`}
      style={{ animationDelay: `${idx * 80}ms` }}
    >
      <button
        onClick={onToggle}
        className="w-full text-left p-5 sm:p-6 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A56ABD] rounded-2xl transition-all duration-300"
        aria-expanded={isOpen}
      >
        <div className="flex items-start gap-4">
          {/* Icon bubble */}
          <div
            className={`shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 icon-bubble ${
              isOpen
                ? "text-white shadow-lg shadow-[#6E3482]/30 scale-110"
                : "bg-[#E7DBEF] text-[#6E3482] group-hover:bg-[#E7DBEF] group-hover:scale-105"
            }`}
            style={
              isOpen
                ? {
                    background:
                      "linear-gradient(135deg, #e0a8ff 0%,#c46cff 50%,#a855f7 100%)",
                  }
                : {}
            }
          >
            <faq.IconComp size={18} strokeWidth={2} />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <span
                className={`text-xs font-semibold uppercase tracking-wide px-2.5 py-1 rounded-full transition-all duration-300 ${badgeClass} shadow-sm`}
              >
                {faq.category}
              </span>
            </div>
            <h3 className="text-base sm:text-lg font-semibold text-[#49225B] leading-snug pr-2 group-hover:text-[#6E3482] transition-colors duration-300">
              {faq.q}
            </h3>
          </div>

          {/* Chevron */}
          <div
            className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 chevron-icon ${
              isOpen
                ? "text-white rotate-180 shadow-lg shadow-[#6E3482]/30"
                : "bg-[#E7DBEF] text-[#A56ABD] group-hover:bg-[#E7DBEF] group-hover:text-[#6E3482]"
            }`}
            style={
              isOpen
                ? {
                    background:
                      "linear-gradient(135deg, #e0a8ff 0%,#c46cff 50%,#a855f7 100%)",
                  }
                : {}
            }
          >
            <ChevronDown size={16} strokeWidth={2.5} />
          </div>
        </div>
      </button>

      {/* Expandable body */}
      <div
        ref={bodyRef}
        style={{ height, transition: "height 0.35s cubic-bezier(0.4,0,0.2,1)" }}
        className="overflow-hidden"
      >
        <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-2 pl-20 sm:pl-24 answer-content">
          <div
            className="w-12 h-1 rounded-full mb-3 answer-line"
            style={{ background: "linear-gradient(90deg, #d38dea, #A56ABD)" }}
          />
          <p className="text-[#49225B]/70 leading-relaxed text-sm sm:text-base">
            {faq.a}
          </p>
          <div className="mt-4 flex gap-4">
            <button className="text-xs sm:text-sm text-[#6E3482] hover:text-[#49225B] font-medium flex items-center gap-1.5 group/btn transition-all duration-300 hover:bg-[#E7DBEF] px-3 py-1.5 rounded-lg">
              <Share2
                size={14}
                className="group-hover/btn:scale-125 group-hover/btn:rotate-12 transition-transform"
              />
              Share
            </button>
            <button className="text-xs sm:text-sm text-[#49225B]/50 hover:text-[#49225B] font-medium flex items-center gap-1.5 group/btn transition-all duration-300 hover:bg-[#E7DBEF] px-3 py-1.5 rounded-lg">
              <Bookmark
                size={14}
                className="group-hover/btn:scale-125 group-hover/btn:fill-current transition-transform"
              />
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

//main component
const Help = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [expandedFaq, setExpandedFaq] = useState(null);

  const categories = [
    { name: "All", value: "all", Icon: LayoutGrid },
    { name: "Access", value: "access", Icon: ShieldCheck },
    { name: "Onboarding", value: "onboarding", Icon: UserPlus },
    { name: "Projects", value: "projects", Icon: FolderKanban },
    { name: "Reporting", value: "reporting", Icon: BarChart3 },
  ];

  const faqs = [
    /* ── Access ── */
    {
      q: "Who can log in to TaskFlow?",
      a: "Only Admins and Managers have login access. Team Leaders have a limited task submission form, and Interns do not log in.",
      category: "access",
      IconComp: ShieldCheck,
    },
    {
      q: "How do I reset my password?",
      a: 'Click "Forgot Password" on the login page. A reset link will be sent to your registered email. Links expire after 30 minutes for security.',
      category: "access",
      IconComp: ShieldCheck,
    },
    {
      q: "Can an Admin revoke a Manager",
      a: "Yes. Admins can deactivate any account from the User Management panel. Deactivated accounts are logged out immediately and cannot log in.",
      category: "access",
      IconComp: ShieldCheck,
    },
    /* ── Onboarding ── */
    {
      q: "How are interns onboarded?",
      a: "Managers can upload interns in bulk using CSV or Excel files. The system validates emails, unique IDs, and formats automatically.",
      category: "onboarding",
      IconComp: UserPlus,
    },
    {
      q: "What fields are required in the bulk-upload template?",
      a: "Full Name, Email, Unique ID, Department, and Start Date are mandatory. Phone and secondary email are optional.",
      category: "onboarding",
      IconComp: UserPlus,
    },
    {
      q: "Can I onboard a single intern without a CSV?",
      a: 'Yes. Use the "Add Intern" form inside Onboarding → Manual Entry to add one intern at a time with the same required fields.',
      category: "onboarding",
      IconComp: UserPlus,
    },
    /* ── Projects ── */
    {
      q: "Can a Team Leader create projects?",
      a: "No, Team Leaders cannot create projects. They only submit daily work reports for their assigned team members.",
      category: "projects",
      IconComp: FolderKanban,
    },
    {
      q: "How do I archive a completed project?",
      a: 'Admins and Managers can mark a project as "Archived" from the Project Settings menu. Archived projects are hidden from active views but remain searchable.',
      category: "projects",
      IconComp: FolderKanban,
    },
    {
      q: "Can multiple teams be assigned to one project?",
      a: "Yes. A project can have multiple teams attached. Each team sees only their own tasks and reports unless granted broader visibility by an Admin.",
      category: "projects",
      IconComp: FolderKanban,
    },
    /* ── Reporting ── */
    {
      q: "How does task reporting work?",
      a: "Team Leaders select a project, date, team member, enter work description, status, and remarks. Reports are stored date-wise and visible to Managers and Admins.",
      category: "reporting",
      IconComp: BarChart3,
    },
    {
      q: "Can I export reports to Excel or PDF?",
      a: "Yes. From the Reports section, choose your date range and filters, then click Export. Excel (.xlsx) and PDF formats are both supported.",
      category: "reporting",
      IconComp: BarChart3,
    },
    {
      q: "What happens if a project deadline is missed?",
      a: "Admins and Managers can monitor deadlines on dashboards; email notifications can be enabled for proactive alerts before and after the deadline.",
      category: "reporting",
      IconComp: AlertCircle,
    },
  ];

  const filteredFaqs = faqs.filter((faq) => {
    const matchesSearch =
      faq.q.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.a.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleToggle = (idx) =>
    setExpandedFaq((prev) => (prev === idx ? null : idx));
  const handleCategoryChange = (val) => {
    setSelectedCategory(val);
    setExpandedFaq(null);
  };

  return (
    <div
      className="min-h-screen w-full flex flex-col relative overflow-hidden"
      style={{ background: "#F5EBFA" }}
    >
      {/* ── HERO SECTION with first image as background ── */}
      <div
        className="relative w-full overflow-hidden"
        style={{
          backgroundColor: "#49225B",
          minHeight: "430px",
        }}
      >
        {/* site_support_13 vector — palette-tinted */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${herosection})`,
            backgroundSize: "cover",
            backgroundPosition: "center top",
            backgroundRepeat: "no-repeat",
            opacity: 0.55,
            filter: "hue-rotate(220deg) saturate(1.5) brightness(0.7)",
          }}
        />
        {/* Palette overlay for readability */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(160deg, rgba(73,34,91,0.82) 0%, rgba(110,52,130,0.70) 60%, rgba(165,106,189,0.55) 100%)",
          }}
        />

        {/* Animated subtle blobs on top of image */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute -top-20 -right-20 w-72 h-72 rounded-full opacity-20 animate-blob"
            style={{ background: "#A56ABD", filter: "blur(60px)" }}
          />
          <div
            className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full opacity-20 animate-blob animation-delay-2000"
            style={{ background: "#6E3482", filter: "blur(60px)" }}
          />
        </div>

        {/* Hero Content */}
        <div
          className="relative z-10 flex flex-col items-center justify-between text-center px-4 pt-10 pb-10 sm:pt-14 sm:pb-12"
          style={{ minHeight: "500px" }}
        >
          {/* ── BOTTOM — Heading + Subtext + Search ── */}
          <div className="w-full animate-slideUp animation-delay-200">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-3 leading-tight drop-shadow-lg">
              How can we help you?
            </h1>
            <p
              className="text-base sm:text-lg max-w-2xl mx-auto leading-relaxed mb-8"
              style={{ color: "#E7DBEF", opacity: 0.9 }}
            >
              Find answers, get support, and learn how to make the most of
              TaskFlow
            </p>

            {/* ── Search Bar ── */}
            <div className="w-full max-w-2xl mx-auto animate-slideUp animation-delay-300">
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Search
                    className="w-5 h-5 transition-colors duration-300"
                    style={{ color: "#6E3482" }}
                    strokeWidth={2}
                  />
                </div>
                <input
                  type="text"
                  placeholder="Search for answers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-10 py-4 rounded-2xl focus:ring-4 transition-all duration-300 shadow-2xl text-[#49225B] outline-none"
                  style={{
                    background: "rgba(231,219,239,0.97)",
                    border: "2px solid #A56ABD",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "#6E3482")}
                  onBlur={(e) => (e.target.style.borderColor = "#A56ABD")}
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm("")}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center hover:scale-110 transition-transform"
                    aria-label="Clear search"
                  >
                    <X
                      className="w-5 h-5 transition-colors"
                      style={{ color: "#6E3482" }}
                    />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* END HERO */}

      {/* ── Main Body ── */}
      <div className="flex-1 w-full px-4 pt-10 pb-20">
        <div className="max-w-6xl w-full mx-auto relative z-10">
          {/* ── Category Filters ── */}
          <div className="flex justify-center mb-12 animate-fadeIn animation-delay-400">
            <div className="flex items-center flex-wrap justify-center gap-y-6">
              {categories.map((cat, idx) => {
                const isActive = selectedCategory === cat.value;
                return (
                  <div key={cat.value} className="flex items-center">
                    <button
                      onClick={() => handleCategoryChange(cat.value)}
                      className="flex flex-col items-center gap-2 group focus:outline-none transition-all duration-300"
                      style={{ animationDelay: `${idx * 70}ms` }}
                    >
                      <div
                        className="w-14 h-14 rounded-full flex items-center justify-center border-2 transition-all duration-300 category-bubble"
                        style={{
                          borderColor: isActive ? "#6E3482" : "#A56ABD",
                          background: isActive
                            ? "linear-gradient(135deg, #E7DBEF, #D4B8E0)"
                            : "white",
                          transform: isActive ? "scale(1.1)" : "scale(1)",
                          boxShadow: isActive
                            ? "0 8px 24px rgba(110,52,130,0.25)"
                            : "none",
                        }}
                      >
                        <cat.Icon
                          size={20}
                          strokeWidth={isActive ? 2.5 : 2}
                          style={{ color: isActive ? "#49225B" : "#A56ABD" }}
                        />
                      </div>
                      <span
                        className="text-xs font-semibold tracking-wide transition-all duration-300"
                        style={{
                          color: isActive ? "#49225B" : "#6E3482",
                          fontWeight: isActive ? 700 : 600,
                        }}
                      >
                        {cat.name}
                      </span>
                    </button>

                    {idx < categories.length - 1 && (
                      <div className="mx-1 sm:mx-2 mb-5 flex items-center">
                        <div
                          className="h-1 w-6 sm:w-10 rounded-full transition-all duration-500"
                          style={{
                            background:
                              selectedCategory === cat.value ||
                              selectedCategory === categories[idx + 1].value
                                ? "linear-gradient(90deg, #6E3482, #A56ABD)"
                                : "#E7DBEF",
                          }}
                        />
                        <div
                          className="w-2 h-2 rounded-full mx-0.5 transition-all duration-500"
                          style={{
                            background:
                              selectedCategory === cat.value ||
                              selectedCategory === categories[idx + 1].value
                                ? "#49225B"
                                : "#A56ABD",
                            transform:
                              selectedCategory === cat.value ||
                              selectedCategory === categories[idx + 1].value
                                ? "scale(1.25)"
                                : "scale(1)",
                          }}
                        />
                        <div
                          className="h-1 w-6 sm:w-10 rounded-full transition-all duration-500"
                          style={{
                            background:
                              selectedCategory === cat.value ||
                              selectedCategory === categories[idx + 1].value
                                ? "linear-gradient(90deg, #A56ABD, #6E3482)"
                                : "#E7DBEF",
                          }}
                        />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* ── FAQ Section Label ── */}
          <div className="flex items-center gap-3 mb-8 animate-slideUp">
            <div
              className="flex-1 h-px"
              style={{
                background:
                  "linear-gradient(90deg, transparent, #A56ABD, transparent)",
              }}
            />
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4" style={{ color: "#6E3482" }} />
              <span
                className="text-sm font-semibold uppercase tracking-widest whitespace-nowrap"
                style={{ color: "#49225B" }}
              >
                Frequently Asked Questions
              </span>
              <Sparkles className="w-4 h-4" style={{ color: "#6E3482" }} />
            </div>
            <div
              className="flex-1 h-px"
              style={{
                background:
                  "linear-gradient(90deg, transparent, #A56ABD, transparent)",
              }}
            />
          </div>

          {/* ── FAQ Cards ── */}
          <div className="grid gap-4 mb-12">
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((faq, idx) => (
                <AccordionItem
                  key={`${faq.q}-${idx}`}
                  faq={faq}
                  idx={idx}
                  isOpen={expandedFaq === idx}
                  onToggle={() => handleToggle(idx)}
                />
              ))
            ) : (
              <div className="text-center py-16 animate-fadeIn">
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 animate-bounce"
                  style={{
                    background: "linear-gradient(135deg, #E7DBEF, #D4B8E0)",
                  }}
                >
                  <Search className="w-8 h-8" style={{ color: "#A56ABD" }} />
                </div>
                <h3
                  className="text-xl font-semibold mb-2"
                  style={{ color: "#49225B" }}
                >
                  No results found
                </h3>
                <p style={{ color: "#6E3482" }}>
                  Try adjusting your search or browse by category
                </p>
              </div>
            )}
          </div>

          {/* ── Support Cards ── */}
          <div className="grid md:grid-cols-2 gap-6 mt-8">
            {/* Contact Support Card — contactcardbg.jpg background, original colors preserved */}
            <div
              className="group rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-2 animate-slideUp animation-delay-500 relative overflow-hidden flex flex-col items-center justify-center"
              style={{
                minHeight: "320px",
              }}
            >
              {/* contactcardbg — original colors, no filter */}
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: `url(${contactcardbg})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
              />
              {/* Subtle dark overlay just for text readability */}
              <div
                className="absolute inset-0 transition-opacity duration-300"
                style={{
                  background: "rgba(110, 41, 143, 0.6)",
                }}
              />

              {/* ALL content centered */}
              <div className="relative z-10 flex flex-col items-center justify-center text-center px-8 py-10 gap-5 w-full">
                {/* Icon — centered */}
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center group-hover:scale-125 transition-transform"
                  style={{
                    background: "rgba(231,219,239,0.20)",
                    backdropFilter: "blur(8px)",
                  }}
                >
                  <MessageCircle
                    className="w-8 h-8 text-white"
                    strokeWidth={1.5}
                  />
                </div>

                {/* Heading — centered */}
                <h2 className="text-2xl font-bold text-white m-0">
                  Need direct support?
                </h2>

                {/* Button — centered */}
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 px-8 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 group/link"
                  style={{ background: "#E7DBEF", color: "#49225B" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "#A56ABD";
                    e.currentTarget.style.color = "white";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "#E7DBEF";
                    e.currentTarget.style.color = "#49225B";
                  }}
                >
                  Contact Support
                  <ArrowRight className="w-5 h-5 group-hover/link:translate-x-2 transition-transform" />
                </Link>

                {/* Description — centered */}
                <p className="text-sm" style={{ color: "#E7DBEF", opacity: 1 }}>
                  Our team is ready to help you with any questions
                </p>
              </div>
            </div>

            {/* Quick Resources — styled like reference image */}
            <div
              className="rounded-2xl shadow-2xl overflow-hidden animate-scaleIn animation-delay-500 relative flex flex-col"
              style={{
                minHeight: "320px",
                background:
                  "linear-gradient(135deg, #49225B 0%, #6E3482 60%, #A56ABD 100%)",
              }}
            >
              {/* Wavy blob decorations */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div
                  className="absolute -top-16 -left-16 w-64 h-64 rounded-full opacity-25"
                  style={{ background: "#A56ABD" }}
                />
                <div
                  className="absolute top-8 right-0 w-48 h-48 rounded-full opacity-20"
                  style={{ background: "#F5EBFA" }}
                />
                <div
                  className="absolute bottom-0 left-1/3 w-56 h-56 rounded-full opacity-15"
                  style={{ background: "#6E3482" }}
                />
                <div
                  className="absolute -bottom-10 right-10 w-40 h-40 rounded-full opacity-20"
                  style={{ background: "#A56ABD" }}
                />
              </div>

              {/* Header */}
              <div className="relative z-10 px-7 pt-7 pb-3">
                <h3 className="text-2xl font-bold text-white">Quick Links</h3>
              </div>

              {/* Icon Grid */}
              <div className="relative z-10 flex-1 px-6 pb-6">
                <div className="grid grid-cols-3 gap-4">
                  {[
                    {
                      label: "Getting Started",
                      icon: gettingStartedIcon,
                      to: "#",
                    },
                    {
                      label: "Video Tutorials",
                      icon: videoTutorialsIcon,
                      to: "#",
                    },
                    { label: "FAQ", icon: faqIcon, to: "/faq" },
                    { label: "API Docs", icon: apiIcon, to: "#" },
                    { label: "Release Notes", icon: noteIcon, to: "#" },
                  ].map((item, i) => (
                    <Link
                      key={i}
                      to={item.to}
                      className="flex flex-col items-center gap-2 group/item"
                      style={{ animationDelay: `${i * 80}ms` }}
                    >
                      {/* Icon bubble */}
                      <div
                        className="w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover/item:scale-110 group-hover/item:shadow-xl"
                        style={{
                          background: "rgba(231,219,239,0.15)",
                          backdropFilter: "blur(8px)",
                          border: "1px solid rgba(231,219,239,0.25)",
                        }}
                      >
                        <img
                          src={item.icon}
                          alt={item.label}
                          className="w-10 h-10 object-contain"
                        />
                      </div>
                      {/* Label */}
                      <span
                        className="text-xs font-semibold text-center leading-tight transition-colors duration-300 group-hover/item:text-white"
                        style={{ color: "rgba(231,219,239,0.85)" }}
                      >
                        {item.label}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ── Stats ── */}
          <div className="mt-12 grid grid-cols-3 gap-4">
            {[
              { val: "24/7", label: "Support Available", Icon: Clock },
              { val: "< 2hr", label: "Response Time", Icon: Zap },
              { val: "98%", label: "Satisfaction Rate", Icon: ThumbsUp },
            ].map(({ val, label, Icon }, i) => (
              <div
                key={i}
                className="text-center p-6 animate-scaleIn rounded-xl border transition-all duration-300 hover:shadow-lg transform hover:scale-105"
                style={{
                  background: "white",
                  borderColor: "#E7DBEF",
                  animationDelay: `${i * 100}ms`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "#A56ABD";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "#E7DBEF";
                }}
              >
                <div className="flex justify-center mb-3">
                  <div
                    className="p-2 rounded-lg"
                    style={{
                      background: "linear-gradient(135deg, #E7DBEF, #D4B8E0)",
                    }}
                  >
                    <Icon
                      className="w-5 h-5"
                      style={{ color: "#6E3482" }}
                      strokeWidth={2}
                    />
                  </div>
                </div>
                <div
                  className="text-2xl sm:text-3xl font-bold mb-1"
                  style={{
                    background: "linear-gradient(135deg, #49225B, #6E3482)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {val}
                </div>
                <div
                  className="text-xs sm:text-sm font-medium"
                  style={{ color: "#6E3482" }}
                >
                  {label}
                </div>
              </div>
            ))}
          </div>

          {/* ── Global Styles ── */}
          <style>{`
            @keyframes blob {
              0%   { transform: translate(0px, 0px) scale(1); }
              33%  { transform: translate(30px, -50px) scale(1.1); }
              66%  { transform: translate(-20px, 20px) scale(0.9); }
              100% { transform: translate(0px, 0px) scale(1); }
            }
            .animate-blob { animation: blob 7s infinite; }
            .animation-delay-2000 { animation-delay: 2s; }
            .animation-delay-3000 { animation-delay: 3s; }
            .animation-delay-4000 { animation-delay: 4s; }

            @keyframes slideUp {
              from { opacity: 0; transform: translateY(24px); }
              to   { opacity: 1; transform: translateY(0); }
            }
            @keyframes fadeIn {
              from { opacity: 0; }
              to   { opacity: 1; }
            }
            @keyframes scaleIn {
              from { opacity: 0; transform: scale(0.92); }
              to   { opacity: 1; transform: scale(1); }
            }

            .animate-slideUp  { animation: slideUp  0.5s ease forwards; }
            .animate-fadeIn   { animation: fadeIn   0.5s ease forwards; }
            .animate-scaleIn  { animation: scaleIn  0.4s ease forwards; }

            .animation-delay-200 { animation-delay: 0.2s; }
            .animation-delay-300 { animation-delay: 0.3s; }
            .animation-delay-400 { animation-delay: 0.4s; }
            .animation-delay-500 { animation-delay: 0.5s; }

            .faq-card { animation: slideUp 0.45s ease both; }

            @keyframes bubblePop {
              0%   { transform: scale(0.8); opacity: 0; }
              60%  { transform: scale(1.12); }
              100% { transform: scale(1); opacity: 1; }
            }
            .bubble-filter-enter { animation: bubblePop 0.35s cubic-bezier(0.34,1.56,0.64,1) both; }

            .answer-content { animation: slideUp 0.35s ease forwards; }
            .answer-line    { animation: slideUp 0.4s ease forwards; }

            button, a { transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); }
          `}</style>
        </div>
      </div>
    </div>
  );
};

export default Help;
