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

// ── Import your images (place them in the same folder or adjust paths)
import heroBg from "./bgimage.png";
import helpIcon from "./help.png";
import supportBg from "./support.png";
import gettingStartedIcon from "./GettingStartedGuide.png";
import videoTutorialsIcon from "./Videotutorials.png";
import faqIcon from "./faq.png";
import apiIcon from "./api.png";
import noteIcon from "./note.png";

/* ─── Color Palette
   #071952  → darkNavy   (primary dark)
   #088395  → teal       (primary accent)
   #37B7C3  → lightTeal  (secondary accent)
   #EBF4F6  → iceBlue    (background / light surface)
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
    access: "bg-[#EBF4F6] text-[#071952]",
    onboarding: "bg-[#EBF4F6] text-[#088395]",
    projects: "bg-[#EBF4F6] text-[#37B7C3]",
    reporting: "bg-[#EBF4F6] text-[#071952]",
    deadlines: "bg-[#EBF4F6] text-[#088395]",
    general: "bg-[#EBF4F6] text-[#37B7C3]",
  };

  const badgeClass =
    categoryColors[faq.category] || "bg-[#EBF4F6] text-[#071952]";

  return (
    <div
      className={`group bg-white rounded-2xl border transition-all duration-300 overflow-hidden faq-card backdrop-blur-sm ${
        isOpen
          ? "border-[#37B7C3] shadow-2xl shadow-[#088395]/20 scale-100"
          : "border-[#EBF4F6] shadow-md hover:shadow-lg hover:border-[#37B7C3] hover:scale-[1.02]"
      }`}
      style={{ animationDelay: `${idx * 80}ms` }}
    >
      <button
        onClick={onToggle}
        className="w-full text-left p-5 sm:p-6 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#37B7C3] rounded-2xl transition-all duration-300"
        aria-expanded={isOpen}
      >
        <div className="flex items-start gap-4">
          {/* Icon bubble */}
          <div
            className={`shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 icon-bubble ${
              isOpen
                ? "text-white shadow-lg shadow-[#088395]/30 scale-110"
                : "bg-[#EBF4F6] text-[#088395] group-hover:bg-[#EBF4F6] group-hover:scale-105"
            }`}
            style={
              isOpen
                ? { background: "linear-gradient(135deg, #088395, #071952)" }
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
            <h3 className="text-base sm:text-lg font-semibold text-[#071952] leading-snug pr-2 group-hover:text-[#088395] transition-colors duration-300">
              {faq.q}
            </h3>
          </div>

          {/* Chevron */}
          <div
            className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 chevron-icon ${
              isOpen
                ? "text-white rotate-180 shadow-lg shadow-[#088395]/30"
                : "bg-[#EBF4F6] text-[#37B7C3] group-hover:bg-[#EBF4F6] group-hover:text-[#088395]"
            }`}
            style={
              isOpen
                ? { background: "linear-gradient(135deg, #088395, #071952)" }
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
            style={{ background: "linear-gradient(90deg, #088395, #37B7C3)" }}
          />
          <p className="text-[#071952]/70 leading-relaxed text-sm sm:text-base">
            {faq.a}
          </p>
          <div className="mt-4 flex gap-4">
            <button className="text-xs sm:text-sm text-[#088395] hover:text-[#071952] font-medium flex items-center gap-1.5 group/btn transition-all duration-300 hover:bg-[#EBF4F6] px-3 py-1.5 rounded-lg">
              <Share2
                size={14}
                className="group-hover/btn:scale-125 group-hover/btn:rotate-12 transition-transform"
              />
              Share
            </button>
            <button className="text-xs sm:text-sm text-[#071952]/50 hover:text-[#071952] font-medium flex items-center gap-1.5 group/btn transition-all duration-300 hover:bg-[#EBF4F6] px-3 py-1.5 rounded-lg">
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

/* ─── Main Component ──────────────────────────────────────── */
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
      style={{ background: "#EBF4F6" }}
    >
      {/* ── HERO SECTION with first image as background ── */}
      <div
        className="relative w-full overflow-hidden"
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center top",
          backgroundRepeat: "no-repeat",
          minHeight: "420px",
        }}
      >
        {/* Dark navy overlay for readability */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(160deg, rgba(7,25,82,0.82) 0%, rgba(8,131,149,0.70) 60%, rgba(55,183,195,0.55) 100%)",
          }}
        />

        {/* Animated subtle blobs on top of image */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute -top-20 -right-20 w-72 h-72 rounded-full opacity-20 animate-blob"
            style={{ background: "#37B7C3", filter: "blur(60px)" }}
          />
          <div
            className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full opacity-20 animate-blob animation-delay-2000"
            style={{ background: "#088395", filter: "blur(60px)" }}
          />
        </div>

        {/* Hero Content */}
        <div
          className="relative z-10 flex flex-col items-center justify-between text-center px-4 pt-10 pb-10 sm:pt-14 sm:pb-12"
          style={{ minHeight: "420px" }}
        >
          {/* ── TOP — Logo ── */}
          <div className="inline-flex items-center justify-center relative animate-slideUp">
            {/* Glowing ring behind logo */}
            <div
              className="absolute inset-0 rounded-2xl blur-2xl opacity-70 animate-pulse"
              style={{
                background: "linear-gradient(135deg, #37B7C3, #088395)",
              }}
            />
            <div
              className="relative w-24 h-24 rounded-2xl flex items-center justify-center shadow-2xl transform hover:scale-110 hover:rotate-3 transition-all duration-300 p-1"
              style={{
                background:
                  "linear-gradient(135deg, #EBF4F6 0%, #37B7C3 50%, #088395 100%)",
                boxShadow: "0 8px 32px rgba(8,131,149,0.45)",
              }}
            >
              <img
                src={helpIcon}
                alt="Help"
                className="w-16 h-16 object-contain drop-shadow-lg"
                style={{ filter: "drop-shadow(0 2px 8px rgba(7,25,82,0.3))" }}
              />
            </div>
          </div>

          {/* ── BOTTOM — Heading + Subtext + Search ── */}
          <div className="w-full animate-slideUp animation-delay-200">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-3 leading-tight drop-shadow-lg">
              How can we <span style={{ color: "#37B7C3" }}>help you?</span>
            </h1>
            <p
              className="text-base sm:text-lg max-w-2xl mx-auto leading-relaxed mb-8"
              style={{ color: "#EBF4F6", opacity: 0.9 }}
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
                    style={{ color: "#088395" }}
                    strokeWidth={2}
                  />
                </div>
                <input
                  type="text"
                  placeholder="Search for answers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-10 py-4 rounded-2xl focus:ring-4 transition-all duration-300 shadow-2xl text-[#071952] outline-none"
                  style={{
                    background: "rgba(235,244,246,0.97)",
                    border: "2px solid #37B7C3",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "#088395")}
                  onBlur={(e) => (e.target.style.borderColor = "#37B7C3")}
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm("")}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center hover:scale-110 transition-transform"
                    aria-label="Clear search"
                  >
                    <X
                      className="w-5 h-5 transition-colors"
                      style={{ color: "#088395" }}
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
                          borderColor: isActive ? "#088395" : "#37B7C3",
                          background: isActive
                            ? "linear-gradient(135deg, #EBF4F6, #d0ecf0)"
                            : "white",
                          transform: isActive ? "scale(1.1)" : "scale(1)",
                          boxShadow: isActive
                            ? "0 8px 24px rgba(8,131,149,0.25)"
                            : "none",
                        }}
                      >
                        <cat.Icon
                          size={20}
                          strokeWidth={isActive ? 2.5 : 2}
                          style={{ color: isActive ? "#071952" : "#37B7C3" }}
                        />
                      </div>
                      <span
                        className="text-xs font-semibold tracking-wide transition-all duration-300"
                        style={{
                          color: isActive ? "#071952" : "#088395",
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
                                ? "linear-gradient(90deg, #088395, #37B7C3)"
                                : "#EBF4F6",
                          }}
                        />
                        <div
                          className="w-2 h-2 rounded-full mx-0.5 transition-all duration-500"
                          style={{
                            background:
                              selectedCategory === cat.value ||
                              selectedCategory === categories[idx + 1].value
                                ? "#071952"
                                : "#37B7C3",
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
                                ? "linear-gradient(90deg, #37B7C3, #088395)"
                                : "#EBF4F6",
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
                  "linear-gradient(90deg, transparent, #37B7C3, transparent)",
              }}
            />
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4" style={{ color: "#088395" }} />
              <span
                className="text-sm font-semibold uppercase tracking-widest whitespace-nowrap"
                style={{ color: "#071952" }}
              >
                Frequently Asked Questions
              </span>
              <Sparkles className="w-4 h-4" style={{ color: "#088395" }} />
            </div>
            <div
              className="flex-1 h-px"
              style={{
                background:
                  "linear-gradient(90deg, transparent, #37B7C3, transparent)",
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
                    background: "linear-gradient(135deg, #EBF4F6, #d0ecf0)",
                  }}
                >
                  <Search className="w-8 h-8" style={{ color: "#37B7C3" }} />
                </div>
                <h3
                  className="text-xl font-semibold mb-2"
                  style={{ color: "#071952" }}
                >
                  No results found
                </h3>
                <p style={{ color: "#088395" }}>
                  Try adjusting your search or browse by category
                </p>
              </div>
            )}
          </div>

          {/* ── Support Cards ── */}
          <div className="grid md:grid-cols-2 gap-6 mt-8">
            {/* Contact Support Card — support.png full background, centered text */}
            <div
              className="group rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-2 animate-slideUp animation-delay-500 relative overflow-hidden flex flex-col"
              style={{
                backgroundImage: `url(${supportBg})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                minHeight: "320px",
              }}
            >
              {/* Dark navy-to-teal overlay for readability */}
              <div
                className="absolute inset-0 transition-opacity duration-300"
                style={{
                  background:
                    "linear-gradient(160deg, rgba(7,25,82,0.55) 0%, rgba(8,131,149,0.50) 100%)",
                }}
              />

              {/* TOP — Logo + heading */}
              <div className="relative z-10 flex flex-col items-center text-center px-8 pt-8">
                <div
                  className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-125 transition-transform duration-300"
                  style={{
                    background: "rgba(235,244,246,0.20)",
                    backdropFilter: "blur(8px)",
                  }}
                >
                  <MessageCircle
                    className="w-10 h-10 text-white"
                    strokeWidth={1.5}
                  />
                </div>
                <h2 className="text-2xl font-bold text-white mb-0">
                  Need direct support?
                </h2>
              </div>

              {/* MIDDLE — spacer */}
              <div className="flex-1" />

              {/* BOTTOM — button then description */}
              <div className="relative z-10 flex flex-col items-center text-center px-8 pb-8 gap-4">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 px-8 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 group/link"
                  style={{ background: "#EBF4F6", color: "#071952" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "#37B7C3";
                    e.currentTarget.style.color = "white";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "#EBF4F6";
                    e.currentTarget.style.color = "#071952";
                  }}
                >
                  Contact Support
                  <ArrowRight className="w-5 h-5 group-hover/link:translate-x-2 transition-transform" />
                </Link>
                <p
                  className="text-sm"
                  style={{ color: "#EBF4F6", opacity: 0.9 }}
                >
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
                  "linear-gradient(135deg, #071952 0%, #088395 60%, #37B7C3 100%)",
              }}
            >
              {/* Wavy blob decorations */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div
                  className="absolute -top-16 -left-16 w-64 h-64 rounded-full opacity-25"
                  style={{ background: "#37B7C3" }}
                />
                <div
                  className="absolute top-8 right-0 w-48 h-48 rounded-full opacity-20"
                  style={{ background: "#EBF4F6" }}
                />
                <div
                  className="absolute bottom-0 left-1/3 w-56 h-56 rounded-full opacity-15"
                  style={{ background: "#088395" }}
                />
                <div
                  className="absolute -bottom-10 right-10 w-40 h-40 rounded-full opacity-20"
                  style={{ background: "#37B7C3" }}
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
                          background: "rgba(235,244,246,0.15)",
                          backdropFilter: "blur(8px)",
                          border: "1px solid rgba(235,244,246,0.25)",
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
                        style={{ color: "rgba(235,244,246,0.85)" }}
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
                  borderColor: "#EBF4F6",
                  animationDelay: `${i * 100}ms`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "#37B7C3";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "#EBF4F6";
                }}
              >
                <div className="flex justify-center mb-3">
                  <div
                    className="p-2 rounded-lg"
                    style={{
                      background: "linear-gradient(135deg, #EBF4F6, #d0ecf0)",
                    }}
                  >
                    <Icon
                      className="w-5 h-5"
                      style={{ color: "#088395" }}
                      strokeWidth={2}
                    />
                  </div>
                </div>
                <div
                  className="text-2xl sm:text-3xl font-bold mb-1"
                  style={{
                    background: "linear-gradient(135deg, #071952, #088395)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {val}
                </div>
                <div
                  className="text-xs sm:text-sm font-medium"
                  style={{ color: "#088395" }}
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
