import React, { useState } from 'react';
import {
  HiOutlineMail,
  HiOutlinePhone,
  HiOutlineClock,
  HiCheck,
  HiLocationMarker,
  HiOutlineSparkles,
  HiGlobe,
  HiChat,
  HiShieldCheck,
  HiLightningBolt,
} from 'react-icons/hi';

const HeroVector = () => (
  <svg viewBox="0 0 480 420" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', maxWidth: 480, height: 'auto' }}>
    <rect x="60" y="300" width="360" height="18" rx="9" fill="#6E3482" opacity="0.9"/>
    <rect x="90" y="318" width="16" height="60" rx="8" fill="#49225B"/>
    <rect x="374" y="318" width="16" height="60" rx="8" fill="#49225B"/>
    <rect x="140" y="160" width="200" height="130" rx="12" fill="#49225B"/>
    <rect x="150" y="170" width="180" height="110" rx="8" fill="#A56ABD" opacity="0.3"/>
    <rect x="165" y="188" width="100" height="8" rx="4" fill="#E7DBEF" opacity="0.8"/>
    <rect x="165" y="204" width="140" height="6" rx="3" fill="#E7DBEF" opacity="0.5"/>
    <rect x="165" y="218" width="120" height="6" rx="3" fill="#E7DBEF" opacity="0.5"/>
    <rect x="165" y="232" width="80" height="6" rx="3" fill="#E7DBEF" opacity="0.5"/>
    <circle cx="290" cy="230" r="22" fill="#6E3482"/>
    <polyline points="280,230 287,237 302,222" stroke="#E7DBEF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
    <rect x="228" y="290" width="24" height="14" rx="4" fill="#49225B"/>
    <rect x="210" y="300" width="60" height="6" rx="3" fill="#6E3482"/>
    <rect x="160" y="316" width="160" height="22" rx="6" fill="#6E3482" opacity="0.7"/>
    {[0,1,2,3,4,5,6,7,8,9].map(i => (
      <rect key={i} x={166 + i*15} y="321" width="11" height="8" rx="2" fill="#A56ABD" opacity="0.5"/>
    ))}
    <rect x="334" y="310" width="30" height="22" rx="10" fill="#6E3482" opacity="0.7"/>
    <line x1="349" y1="310" x2="349" y2="332" stroke="#A56ABD" strokeWidth="1.5" opacity="0.6"/>
    <g style={{ animation: 'float1 3s ease-in-out infinite' }}>
      <rect x="30" y="130" width="64" height="46" rx="8" fill="#6E3482"/>
      <polyline points="30,130 62,158 94,130" stroke="#E7DBEF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    </g>
    <g style={{ animation: 'float2 3.5s ease-in-out infinite' }}>
      <rect x="370" y="100" width="72" height="50" rx="10" fill="#A56ABD"/>
      <circle cx="386" cy="125" r="4" fill="#E7DBEF"/>
      <circle cx="406" cy="125" r="4" fill="#E7DBEF"/>
      <circle cx="426" cy="125" r="4" fill="#E7DBEF"/>
      <polygon points="380,150 370,162 392,150" fill="#A56ABD"/>
    </g>
    <g style={{ animation: 'float3 4s ease-in-out infinite' }}>
      <rect x="380" y="220" width="60" height="36" rx="8" fill="#49225B"/>
      <circle cx="396" cy="238" r="8" fill="#A56ABD"/>
      <polyline points="392,238 395,241 401,234" stroke="#E7DBEF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      <rect x="410" y="232" width="22" height="5" rx="2.5" fill="#E7DBEF" opacity="0.6"/>
      <rect x="410" y="240" width="16" height="5" rx="2.5" fill="#E7DBEF" opacity="0.4"/>
    </g>
    {[[70,80],[420,180],[100,260],[450,290],[50,320]].map(([cx,cy],i) => (
      <circle key={i} cx={cx} cy={cy} r="4" fill="#A56ABD" opacity="0.4"/>
    ))}
    {[[120,50],[350,60],[460,130]].map(([cx,cy],i) => (
      <circle key={i} cx={cx} cy={cy} r="3" fill="#E7DBEF" opacity="0.6"/>
    ))}
  </svg>
);

const SupportVector = () => (
  <svg viewBox="0 0 340 300" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 'auto' }}>
    <circle cx="170" cy="80" r="44" fill="#6E3482"/>
    <circle cx="170" cy="80" r="36" fill="#A56ABD" opacity="0.5"/>
    <circle cx="158" cy="76" r="4" fill="#E7DBEF"/>
    <circle cx="182" cy="76" r="4" fill="#E7DBEF"/>
    <path d="M160 90 Q170 98 180 90" stroke="#E7DBEF" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
    <path d="M130 72 Q130 46 170 46 Q210 46 210 72" stroke="#49225B" strokeWidth="6" strokeLinecap="round" fill="none"/>
    <rect x="122" y="68" width="16" height="24" rx="8" fill="#49225B"/>
    <rect x="202" y="68" width="16" height="24" rx="8" fill="#49225B"/>
    <path d="M110 170 Q110 140 170 140 Q230 140 230 170 L240 260 H100 Z" fill="#6E3482"/>
    <path d="M170 140 L155 165 L170 185 L185 165 Z" fill="#49225B"/>
    <circle cx="80" cy="110" r="10" fill="#A56ABD" opacity="0.5"/>
    <circle cx="260" cy="90" r="10" fill="#A56ABD" opacity="0.5"/>
    <circle cx="70" cy="200" r="7" fill="#E7DBEF" opacity="0.5"/>
    <circle cx="280" cy="190" r="7" fill="#E7DBEF" opacity="0.5"/>
    <rect x="20" y="140" width="72" height="52" rx="8" fill="#49225B"/>
    <rect x="30" y="152" width="40" height="5" rx="2.5" fill="#E7DBEF" opacity="0.7"/>
    <rect x="30" y="162" width="52" height="5" rx="2.5" fill="#A56ABD" opacity="0.5"/>
    <circle cx="32" cy="178" r="5" fill="#A56ABD"/>
    <polyline points="29,178 32,181 37,174" stroke="#E7DBEF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    <rect x="248" y="150" width="72" height="52" rx="8" fill="#49225B"/>
    <rect x="258" y="162" width="40" height="5" rx="2.5" fill="#E7DBEF" opacity="0.7"/>
    <rect x="258" y="172" width="52" height="5" rx="2.5" fill="#A56ABD" opacity="0.5"/>
    <circle cx="260" cy="188" r="5" fill="#A56ABD"/>
    <polyline points="257,188 260,191 265,184" stroke="#E7DBEF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
  </svg>
);

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState({});

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleFocus = (field) => setFocused({ ...focused, [field]: true });
  const handleBlur = (field) => setFocused({ ...focused, [field]: false });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="page-root">

      {/* ══ HERO ══════════════════════════════════════════ */}
      <section className="hero">
        <div className="hero-bg-blob blob1" />
        <div className="hero-bg-blob blob2" />

        <div className="hero-inner">
  
  {/* TEXT LEFT */}
  <div className="hero-left anim-slideUp">
    <span className="hero-eyebrow">TASKFLOW — CONTACT US</span>

    <h1 className="hero-title">
      The Best Place Where<br />
      <span className="hero-title-accent">Productivity Meets Simplicity</span>
    </h1>

    <p className="hero-desc">
      Have questions about TaskFlow? Our dedicated support team is here to help you streamline your project management. We typically respond within 24 hours.
    </p>

    <div className="hero-stats">
      <div className="hero-stat">
        <span className="hero-stat-num">4.7</span>
        <span className="hero-stat-label">★★★★★ From Google</span>
      </div>
      <div className="hero-stat-divider" />
      <div className="hero-stat">
        <span className="hero-stat-num">&lt;24h</span>
        <span className="hero-stat-label">Avg. Response Time</span>
      </div>
    </div>

    <div className="hero-actions">
      <a href="#contact-form" className="btn-primary">GET IN TOUCH</a>
      <a href="#our-support" className="btn-outline">EXPLORE SUPPORT</a>
    </div>
  </div>

  {/* VECTOR RIGHT */}
  <div className="hero-right anim-scaleIn">
    <HeroVector />
  </div>

</div>

        <div className="hero-wave">
          <svg viewBox="0 0 1440 90" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M0,45 C200,90 400,0 600,45 C800,90 1000,0 1200,45 C1350,80 1400,30 1440,45 L1440,90 L0,90 Z" fill="#ffffff"/>
          </svg>
        </div>
      </section>

      {/* ══ ABOUT / SUPPORT SECTION ══════════════════════ */}
      <section className="about-section" id="our-support">
        <div className="about-inner">
          <div className="about-left anim-slideRight">
            <div className="about-img-card">
              <div className="about-img-badge">
                <HiShieldCheck style={{ width: 18, height: 18 }} />
                <span>Trusted Support</span>
              </div>
              <SupportVector />
            </div>
          </div>
          <div className="about-right anim-slideUp">
            <span className="section-eyebrow">ABOUT US</span>
            <h2 className="section-title">We Can Help You Manage Tasks More Effectively!</h2>
            <p className="section-desc">
              TaskFlow was built to make project collaboration seamless. Our support team consists of
              seasoned productivity experts who understand the complexities of modern task management.
              Whether you're a solo freelancer or an enterprise team, we're here to guide you every step of the way.
            </p>
            <p className="section-desc">
              From onboarding to advanced integrations, our specialists ensure you get the most out of
              every feature TaskFlow has to offer.
            </p>
            <div className="about-contact-row">
              <div className="about-contact-pill">
                <HiOutlinePhone style={{ width: 18, height: 18 }} />
                <span>For More Information, Please Contact Us By Phone Or Email</span>
              </div>
            </div>
            <div className="about-contact-details">
              <span className="about-phone">+1 (555) 123-4567</span>
              <a href="mailto:support@taskflow.com" className="btn-small">MAIL US</a>
            </div>
          </div>
        </div>
      </section>

      <div className="section-wave-down">
        <svg viewBox="0 0 1440 70" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path d="M0,35 C360,70 720,0 1080,35 C1260,52 1380,20 1440,35 L1440,70 L0,70 Z" fill="#E7DBEF"/>
        </svg>
      </div>

      {/* ══ SERVICES / CHANNELS ══════════════════════════ */}
      <section className="services-section">
        <div className="services-inner">
          <span className="section-eyebrow centered">OUR SUPPORT CHANNELS</span>
          <h2 className="section-title centered">Best Convenience Services</h2>
          <p className="section-desc centered" style={{ maxWidth: 580, margin: '0 auto 48px' }}>
            Reach us through the channel that suits you best. We've made every touchpoint
            as smooth and responsive as possible.
          </p>
          <div className="services-grid">
            {[
              {
                icon: (
                  <svg viewBox="0 0 48 48" fill="none" style={{ width: 40, height: 40 }}>
                    <circle cx="24" cy="24" r="22" fill="#6E3482" opacity="0.15"/>
                    <path d="M12 16h24v18a2 2 0 01-2 2H14a2 2 0 01-2-2V16z" stroke="#6E3482" strokeWidth="2.5" strokeLinejoin="round"/>
                    <polyline points="12,16 24,26 36,16" stroke="#6E3482" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                  </svg>
                ),
                title: 'Email Support',
                desc: 'Send us a detailed message and our team will respond within 24 hours with a thorough solution tailored to your needs.',
                tag: 'support@taskflow.com',
              },
              {
                icon: (
                  <svg viewBox="0 0 48 48" fill="none" style={{ width: 40, height: 40 }}>
                    <circle cx="24" cy="24" r="22" fill="#6E3482" opacity="0.15"/>
                    <rect x="10" y="14" width="28" height="22" rx="5" stroke="#6E3482" strokeWidth="2.5"/>
                    <circle cx="19" cy="25" r="2.5" fill="#6E3482"/>
                    <circle cx="29" cy="25" r="2.5" fill="#6E3482"/>
                    <circle cx="24" cy="25" r="2.5" fill="#6E3482"/>
                  </svg>
                ),
                title: 'Live Chat',
                desc: 'Connect instantly with a support agent via our live chat widget. Available Mon–Fri 9 AM to 6 PM for real-time assistance.',
                tag: 'Available on Dashboard',
              },
              {
                icon: (
                  <svg viewBox="0 0 48 48" fill="none" style={{ width: 40, height: 40 }}>
                    <circle cx="24" cy="24" r="22" fill="#6E3482" opacity="0.15"/>
                    <path d="M14 10h20a4 4 0 014 4v12a4 4 0 01-4 4H28l-4 8-4-8H14a4 4 0 01-4-4V14a4 4 0 014-4z" stroke="#6E3482" strokeWidth="2.5" strokeLinejoin="round" fill="none"/>
                    <rect x="17" y="20" width="14" height="3" rx="1.5" fill="#6E3482" opacity="0.5"/>
                    <rect x="17" y="26" width="9" height="3" rx="1.5" fill="#6E3482" opacity="0.3"/>
                  </svg>
                ),
                title: 'Help Center',
                desc: 'Browse hundreds of articles, tutorials, and FAQs in our comprehensive knowledge base to find instant answers.',
                tag: 'help.taskflow.com',
              },
            ].map((s, i) => (
              <div key={i} className="service-card anim-fadeIn" style={{ animationDelay: `${i * 120}ms` }}>
                <div className="service-icon">{s.icon}</div>
                <h3 className="service-title">{s.title}</h3>
                <p className="service-desc">{s.desc}</p>
                <span className="service-tag">{s.tag}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-wave-up">
        <svg viewBox="0 0 1440 70" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path d="M0,35 C360,0 720,70 1080,35 C1260,18 1380,50 1440,35 L1440,70 L0,70 Z" fill="#f9f6fc"/>
        </svg>
      </div>

      {/* ══ MAIN CONTACT FORM SECTION ════════════════════ */}
      <section className="main-section" id="contact-form">
        <div className="main-inner">
          <div className="left-col anim-slideRight">
            <span className="section-eyebrow">CONTACT US</span>
            <h2 className="section-title">Get In Touch</h2>
            <p className="section-desc">
              Have questions or need support? Reach out through any of the channels below.
              Our team is ready to assist you every step of the way.
            </p>
            <div className="info-grid">
              {[
                { icon: <HiOutlinePhone className="info-icon" />, label: 'Phone Number',  value: '+1 (555) 123-4567' },
                { icon: <HiOutlineMail  className="info-icon" />, label: 'Email Address', value: 'support@taskflow.com' },
                { icon: <HiGlobe        className="info-icon" />, label: 'Website',       value: 'www.taskflow.com' },
                { icon: <HiLocationMarker className="info-icon" />, label: 'Address',     value: '123 Innovation Dr, Tech Valley, CA' },
              ].map((item, i) => (
                <div key={i} className="info-card anim-fadeIn" style={{ animationDelay: `${i * 100}ms` }}>
                  <div className="info-icon-wrap">{item.icon}</div>
                  <div>
                    <p className="info-label">{item.label}</p>
                    <p className="info-value">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="hours-card anim-scaleIn">
              <div className="hours-orb orb1" />
              <div className="hours-orb orb2" />
              <div style={{ position: 'relative', zIndex: 2 }}>
                <div className="hours-header">
                  <HiOutlineClock style={{ width: 24, height: 24, color: '#A56ABD' }} />
                  <h3 className="hours-title">Business Hours</h3>
                </div>
                {[
                  { day: 'Monday – Friday', hours: '9:00 AM – 6:00 PM' },
                  { day: 'Saturday',        hours: '10:00 AM – 4:00 PM' },
                  { day: 'Sunday',          hours: 'Closed' },
                ].map((r, i) => (
                  <div key={i} className="hours-row">
                    <span>{r.day}</span>
                    <span className="hours-value">{r.hours}</span>
                  </div>
                ))}
                <p className="hours-note">For urgent inquiries, use the form — we respond within 24 hours.</p>
              </div>
            </div>
            <div className="quick-card anim-fadeIn">
              <div className="quick-icon-wrap">
                <HiOutlineSparkles style={{ width: 22, height: 22, color: '#6E3482' }} />
              </div>
              <p className="quick-text">
                Average response time: <span className="quick-hl">&lt; 24 hours</span>
              </p>
            </div>
          </div>

          <div className="form-card anim-scaleIn">
            <div className="form-accent-bar" />
            <h2 className="form-title">You Have <span className="form-title-accent">Questions?</span></h2>
            <p className="form-sub">Fill out the form below and we'll get back to you as soon as possible.</p>
            <form onSubmit={handleSubmit} className="form-body">
              {[
                { name: 'name',    placeholder: 'Your Full Name',    type: 'text'  },
                { name: 'email',   placeholder: 'Your Email Address', type: 'email' },
                { name: 'subject', placeholder: 'Subject / Topic',    type: 'text'  },
              ].map((f) => (
                <input
                  key={f.name}
                  type={f.type}
                  name={f.name}
                  value={formData[f.name]}
                  onChange={handleChange}
                  onFocus={() => handleFocus(f.name)}
                  onBlur={() => handleBlur(f.name)}
                  required
                  placeholder={f.placeholder}
                  className={`form-input${focused[f.name] ? ' focused' : ''}`}
                />
              ))}
              <textarea
                name="message"
                rows={5}
                value={formData.message}
                onChange={handleChange}
                onFocus={() => handleFocus('message')}
                onBlur={() => handleBlur('message')}
                required
                placeholder="Your Message..."
                className={`form-input form-textarea${focused.message ? ' focused' : ''}`}
              />
              <button type="submit" className="submit-btn">SEND MESSAGE</button>
              {submitted && (
                <div className="success-msg">
                  <HiCheck style={{ width: 20, height: 20 }} />
                  <span>Message sent! We'll get back to you soon.</span>
                </div>
              )}
            </form>
          </div>
        </div>
      </section>

      {/* ══ BENEFITS STRIP ═══════════════════════════════ */}
      <section className="benefits-section">
        <div className="benefits-inner">
          <div className="benefits-left">
            <span className="section-eyebrow light">OUR BENEFITS</span>
            <h2 className="benefits-title">Productivity & Support Are Perfectly Combined Here!</h2>
            <p className="benefits-desc">
              TaskFlow's support isn't just reactive — it's proactive. We monitor system health,
              send usage tips, and reach out before issues escalate, so your team stays on track.
            </p>
            <a href="#contact-form" className="btn-white">CONTACT SUPPORT</a>
          </div>
          <div className="benefits-right">
            {[
              { icon: <HiLightningBolt style={{ width: 22, height: 22 }} />, title: 'Instant Notifications', desc: 'Real-time alerts for task updates, deadlines, and team mentions.' },
              { icon: <HiShieldCheck   style={{ width: 22, height: 22 }} />, title: 'Enterprise-Grade Security', desc: 'Your data is encrypted end-to-end. SOC 2 compliant, always.' },
              { icon: <HiChat          style={{ width: 22, height: 22 }} />, title: 'Dedicated Account Manager', desc: 'Enterprise clients get a personal manager for onboarding & support.' },
            ].map((b, i) => (
              <div key={i} className="benefit-card anim-fadeIn" style={{ animationDelay: `${i * 120}ms` }}>
                <div className="benefit-icon">{b.icon}</div>
                <div>
                  <h4 className="benefit-title">{b.title}</h4>
                  <p className="benefit-desc">{b.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ MAP ═══════════════════════════════════════════ */}
      <section className="map-section">
        <iframe
          title="TaskFlow Office Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d19862.59735854507!2d-0.12983289999999999!3d51.50244!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47d8a00baf21de75%3A0x52963a5addd52a99!2sLondon%2C%20UK!5e0!3m2!1sen!2sin!4v1680000000000!5m2!1sen!2sin"
          className="map-iframe"
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </section>

      {/* ══ STYLES ══════════════════════════════════════ */}
      <style jsx>{`
        :root {
          --plum:    #49225B;
          --purple:  #6E3482;
          --lilac:   #A56ABD;
          --lavender:#E7DBEF;
          --white:   #ffffff;
          --body-bg: #f9f6fc;
        }

        .page-root {
          width: 100%;
          background: var(--white);
          overflow-x: hidden;
          font-family: 'Segoe UI', system-ui, sans-serif;
        }
        * {
  backface-visibility: hidden;
  transform: translateZ(0);
}

        /* ── HERO ──────────────────────────────────────────
         * min-height: 660px  — taller than before (was 520px)
         *   gives the navbar visible sky above the content
         *
         * hero-inner padding-top: 160px
         *   = navbar height (~64px) + top gap (~16px) + 80px breathing room
         *   so the text/vector sits comfortably below the pill
         * ─────────────────────────────────────────────────*/
        .hero {
          width: 100%;
          min-height: 660px;
          background: linear-gradient(135deg, var(--purple) 0%, var(--plum) 55%, var(--lilac) 100%);
          position: relative;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .hero-bg-blob {
          position: absolute;
          border-radius: 50%;
          background: rgba(255,255,255,0.06);
        }
        .blob1 { width: 500px; height: 500px; top: -150px; left: -100px; }
        .blob2 { width: 360px; height: 360px; bottom: -100px; right: 60px; }

        .hero-inner {
          max-width: 1200px;
          width: 100%;
          /* top: 160px clears the floating navbar + gives breathing room */
          /* bottom: 120px ensures wave doesn't overlap content           */
          padding: 160px 40px 120px;
          display: flex;
          align-items: center;
          gap: 60px;
          flex-wrap: wrap;
          position: relative;
          z-index: 2;
        }
        .hero-left {
          flex: 1 1 340px;
           max-width: 520px;
  
         }
        
        .hero-right {
         flex: 1 1 340px;
         max-width: 600px;
         display: flex;
         justify-content: center;
         }

         .hero-right svg {
          width: 100%;
          max-width: 600px;
         }
        .hero-eyebrow {
          display: inline-block;
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.2em;
          color: var(--lavender);
          text-transform: uppercase;
          margin-bottom: 14px;
        }
        .hero-title {
        font-size: clamp(1.8rem, 3.5vw, 2.8rem);
         font-weight: 900;
         color: var(--white);
         line-height: 1.22;
         margin: 0 0 14px;
         max-width: 520px; /* controls breaking */
        }
        .hero-title-accent { color: var(--lavender); }
        .hero-desc {
          font-size: 0.96rem;
          color: rgba(231,219,239,0.85);
          line-height: 1.55;
          margin: 0 0 28px;
          max-width: 520px;
        }
        .hero-stats {
          display: flex;
          align-items: center;
          gap: 24px;
          margin-bottom: 32px;
        }
        .hero-stat-num {
          display: block;
          font-size: 1.8rem;
          font-weight: 900;
          color: var(--white);
          line-height: 1;
        }
        .hero-stat-label {
          font-size: 0.75rem;
          color: var(--lavender);
          margin-top: 4px;
          display: block;
        }
        .hero-stat-divider {
          width: 1px;
          height: 44px;
          background: rgba(231,219,239,0.3);
        }
        .hero-actions { display: flex; gap: 16px; flex-wrap: wrap; }
        .btn-primary {
          display: inline-block;
          background: var(--white);
          color: var(--plum);
          font-weight: 800;
          font-size: 0.82rem;
          letter-spacing: 0.1em;
          padding: 13px 30px;
          border-radius: 9999px;
          text-decoration: none;
          transition: all 0.25s ease;
          box-shadow: 0 4px 20px rgba(73,34,91,0.3);
          white-space: nowrap;
        }
        .btn-primary:hover {
          background: var(--lavender);
          transform: translateY(-2px);
          box-shadow: 0 8px 28px rgba(73,34,91,0.4);
        }
        .btn-outline {
          display: inline-block;
          background: transparent;
          color: var(--white);
          font-weight: 700;
          font-size: 0.82rem;
          letter-spacing: 0.1em;
          padding: 12px 28px;
          border-radius: 9999px;
          border: 2px solid rgba(255,255,255,0.5);
          text-decoration: none;
          transition: all 0.25s ease;
          white-space: nowrap;
        }
        .btn-outline:hover {
          border-color: var(--white);
          background: rgba(255,255,255,0.1);
          transform: translate3d(0, -2px, 0);
          will-change: transform;
        }
        .hero-wave {
          position: absolute;
          bottom: -2px; left: 0; width: 100%;
          line-height: 0; z-index: 3;
        }
        .hero-wave svg { display: block; width: 100%; height: 90px; }

        /* ── ABOUT ── */
        .about-section { background: var(--white); padding: 80px 0 0; }
        .about-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 40px 60px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          align-items: center;
        }
        .about-img-card {
          background: linear-gradient(135deg, var(--lavender), #f5eff9);
          border-radius: 24px;
          padding: 32px 24px 0;
          position: relative;
          overflow: hidden;
          border: 1.5px solid var(--lavender);
        }
        .about-img-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: var(--purple);
          color: var(--white);
          font-size: 0.78rem;
          font-weight: 700;
          padding: 7px 14px;
          border-radius: 9999px;
          margin-bottom: 20px;
        }
        .section-eyebrow {
          display: block;
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.2em;
          color: var(--purple);
          text-transform: uppercase;
          margin-bottom: 12px;
        }
        .section-eyebrow.centered { text-align: center; }
        .section-eyebrow.light { color: var(--lavender); }
        .section-title {
          font-size: clamp(1.6rem, 2.8vw, 2.4rem);
          font-weight: 900;
          color: var(--plum);
          margin: 0 0 16px;
          line-height: 1.2;
        }
        .section-title.centered { text-align: center; }
        .section-desc {
          font-size: 0.94rem;
          color: #6b5a75;
          line-height: 1.75;
          margin: 0 0 20px;
        }
        .section-desc.centered { text-align: center; }
        .about-contact-row { margin: 24px 0 16px; }
        .about-contact-pill {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: var(--lavender);
          color: var(--plum);
          font-size: 0.82rem;
          font-weight: 600;
          padding: 10px 18px;
          border-radius: 9999px;
        }
        .about-contact-details { display: flex; align-items: center; gap: 20px; flex-wrap: wrap; }
        .about-phone { font-size: 1.4rem; font-weight: 900; color: var(--plum); }
        .btn-small {
          display: inline-block;
          background: var(--purple);
          color: var(--white);
          font-weight: 700;
          font-size: 0.78rem;
          letter-spacing: 0.1em;
          padding: 10px 22px;
          border-radius: 9999px;
          text-decoration: none;
          transition: all 0.25s ease;
        }
        .btn-small:hover { background: var(--plum); transform: translate3d(0, -2px, 0); will-change: transform;; }

        /* ── WAVE dividers ── */
        .section-wave-down { line-height: 0; background: var(--white); }
        .section-wave-down svg { display: block; width: 100%; height: 70px; }
        .section-wave-up { line-height: 0; background: var(--lavender); }
        .section-wave-up svg { display: block; width: 100%; height: 70px; }

        /* ── SERVICES ── */
        .services-section { background: var(--lavender); padding: 60px 0 80px; }
        .services-inner { max-width: 1200px; margin: 0 auto; padding: 0 40px; }
        .services-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 28px; }
        .service-card {
          background: var(--white);
          border-radius: 20px;
          padding: 32px 28px;
          border: 1.5px solid #d8c8e4;
          transition: transform 0.25s ease, box-shadow 0.25s ease;
          cursor: default;
        }
        .service-card:hover { transform: translate3d(0, -6px, 0); will-change: transform; box-shadow: 0 16px 48px rgba(110,52,130,0.16); }
        .service-icon { margin-bottom: 20px; }
        .service-title { font-size: 1.05rem; font-weight: 800; color: var(--plum); margin: 0 0 12px; }
        .service-desc { font-size: 0.87rem; color: #7a6685; line-height: 1.7; margin: 0 0 16px; }
        .service-tag {
          display: inline-block;
          background: var(--lavender);
          color: var(--purple);
          font-size: 0.75rem;
          font-weight: 700;
          padding: 5px 12px;
          border-radius: 9999px;
        }

        /* ── MAIN CONTACT SECTION ── */
        .main-section { background: var(--body-bg); padding: 80px 0; }
        .main-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 40px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 52px;
          align-items: start;
        }
        .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 32px; }
        .info-card { display: flex; align-items: flex-start; gap: 12px; cursor: default; transition: transform 0.2s ease; }
        .info-card:hover { transform: translate3d(0, 4px, 0); will-change: transform; }
        .info-icon-wrap {
          width: 46px; height: 46px;
          border-radius: 12px;
          background: linear-gradient(135deg, var(--lavender), #e0cceb);
          border: 1.5px solid #d0bedd;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }
        .info-icon { width: 20px; height: 20px; color: var(--purple); }
        .info-label { font-weight: 700; color: var(--plum); font-size: 0.85rem; margin: 0 0 3px; }
        .info-value { color: #7a6685; font-size: 0.8rem; margin: 0; line-height: 1.5; }
        .hours-card {
          background: linear-gradient(135deg, var(--plum) 0%, var(--purple) 100%);
          border-radius: 18px;
          padding: 28px;
          color: var(--white);
          position: relative;
          overflow: hidden;
          box-shadow: 0 12px 40px rgba(73,34,91,0.3);
          margin-bottom: 20px;
        }
        .hours-orb { position: absolute; border-radius: 50%; background: rgba(255,255,255,0.08); }
        .orb1 { width: 120px; height: 120px; top: -40px; right: -40px; }
        .orb2 { width: 80px; height: 80px; bottom: -20px; left: -20px; }
        .hours-header { display: flex; align-items: center; gap: 10px; margin-bottom: 16px; }
        .hours-title { font-size: 1.05rem; font-weight: 800; margin: 0; }
        .hours-row {
          display: flex;
          justify-content: space-between;
          font-size: 0.88rem;
          color: rgba(231,219,239,0.85);
          padding: 5px 0;
          border-bottom: 1px solid rgba(165,106,189,0.2);
        }
        .hours-row:last-of-type { border-bottom: none; }
        .hours-value { font-weight: 700; color: var(--lilac); }
        .hours-note { margin: 16px 0 0; font-size: 0.8rem; color: rgba(231,219,239,0.65); line-height: 1.6; }
        .quick-card {
          background: var(--white);
          border-radius: 14px;
          padding: 18px 22px;
          border: 1.5px solid #d8c8e4;
          display: flex; align-items: center; gap: 14px;
          transition: transform 0.25s, box-shadow 0.25s;
        }
        .quick-card:hover { transform: translate3d(0, -2px, 0); will-change: transform; box-shadow: 0 8px 24px rgba(110,52,130,0.12); }
        .quick-icon-wrap {
          width: 48px; height: 48px;
          background: linear-gradient(135deg, var(--lavender), #e0cceb);
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }
        .quick-text { font-size: 0.9rem; color: #7a6685; margin: 0; }
        .quick-hl { font-weight: 800; color: var(--purple); }
        .form-card {
          background: var(--white);
          border-radius: 22px;
          padding: 36px 40px 44px;
          border: 1.5px solid #d8c8e4;
          box-shadow: 0 20px 60px rgba(73,34,91,0.10);
          position: relative;
          overflow: hidden;
          transition: box-shadow 0.3s, transform 0.3s;
        }
        .form-card:hover { box-shadow: 0 28px 72px rgba(73,34,91,0.16); transform: translate3d(0, -2px, 0); will-change: transform; }
        .form-accent-bar {
          position: absolute; top: 0; left: 0; right: 0;
          height: 4px;
          background: linear-gradient(90deg, var(--plum), var(--purple), var(--lilac));
        }
        .form-title { font-size: 1.75rem; font-weight: 900; color: var(--plum); margin: 0 0 8px; }
        .form-title-accent { color: var(--purple); }
        .form-sub { font-size: 0.88rem; color: #7a6685; margin: 0 0 24px; line-height: 1.6; }
        .form-body { display: flex; flex-direction: column; gap: 14px; }
        .form-input {
          width: 100%;
          background: var(--lavender);
          color: var(--plum);
          padding: 13px 16px;
          border-radius: 10px;
          font-size: 0.9rem;
          outline: none;
          border: 1.5px solid #d0bedd;
          transition: all 0.25s ease;
          box-sizing: border-box;
          font-family: inherit;
        }
        .form-input::placeholder { color: #a98db5; }
        .form-input:hover { border-color: var(--lilac); }
        .form-input.focused {
          border-color: var(--purple);
          box-shadow: 0 0 0 3px rgba(110,52,130,0.14);
          background: var(--white);
          // transform: scale(1.01);
        }
        .form-textarea { resize: none; }
        .submit-btn {
          background: linear-gradient(90deg, var(--plum), var(--purple));
          color: var(--white);
          font-weight: 800;
          font-size: 0.86rem;
          letter-spacing: 0.1em;
          padding: 14px 36px;
          border-radius: 10px;
          border: none;
          cursor: pointer;
          transition: all 0.25s ease;
          width: fit-content;
          box-shadow: 0 4px 16px rgba(73,34,91,0.35);
        }
        .submit-btn:hover {
          background: linear-gradient(90deg, var(--purple), var(--lilac));
          transform: scale(1.03);
          box-shadow: 0 8px 24px rgba(110,52,130,0.45);
        }
        .success-msg {
          display: flex; align-items: center; gap: 8px;
          color: #4a1a5f;
          background: var(--lavender);
          border: 1px solid var(--lilac);
          padding: 12px 16px;
          border-radius: 10px;
          font-size: 0.88rem;
        }

        /* ── BENEFITS ── */
        .benefits-section { background: linear-gradient(135deg, var(--plum), var(--purple)); padding: 80px 0; }
        .benefits-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 40px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          align-items: center;
        }
        .benefits-title { font-size: clamp(1.6rem, 2.5vw, 2.2rem); font-weight: 900; color: var(--white); margin: 0 0 16px; line-height: 1.2; }
        .benefits-desc { font-size: 0.93rem; color: rgba(231,219,239,0.8); line-height: 1.75; margin: 0 0 28px; }
        .btn-white {
          display: inline-block;
          background: var(--white);
          color: var(--plum);
          font-weight: 800;
          font-size: 0.82rem;
          letter-spacing: 0.1em;
          padding: 13px 30px;
          border-radius: 9999px;
          text-decoration: none;
          transition: all 0.25s ease;
        }
        .btn-white:hover { background: var(--lavender); transform: translate3d(0, -2px, 0); will-change: transform; }
        .benefit-card {
          display: flex; align-items: flex-start; gap: 16px;
          background: rgba(255,255,255,0.1);
          border-radius: 14px;
          padding: 20px 22px;
          border: 1px solid rgba(165,106,189,0.3);
          margin-bottom: 16px;
          transition: background 0.25s, transform 0.25s;
        }
        .benefit-card:last-child { margin-bottom: 0; }
        .benefit-card:hover { background: rgba(255,255,255,0.16); transform: translate3d(0, -4px, 0);
will-change: transform;; }
        .benefit-icon {
          width: 44px; height: 44px;
          background: rgba(165,106,189,0.3);
          border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          color: var(--lavender); flex-shrink: 0;
        }
        .benefit-title { font-size: 0.95rem; font-weight: 800; color: var(--white); margin: 0 0 5px; }
        .benefit-desc { font-size: 0.83rem; color: rgba(231,219,239,0.75); margin: 0; line-height: 1.5; }

        /* ── MAP ── */
        .map-section { width: 100%; height: 420px; overflow: hidden; }
        .map-iframe { width: 100%; height: 100%; border: none; display: block; }

        /* ── ANIMATIONS ── */
        @keyframes float1 { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
        @keyframes float2 { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-14px); } }
        @keyframes float3 { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
        @keyframes slideUp    { from { opacity:0; transform:translateY(28px); }  to { opacity:1; transform:translateY(0); } }
        @keyframes slideRight { from { opacity:0; transform:translateX(-24px); } to { opacity:1; transform:translateX(0); } }
        @keyframes scaleIn    { from { opacity:0; transform:scale(0.9); }         to { opacity:1; transform:scale(1); } }
        @keyframes fadeIn     { from { opacity:0; }                                to { opacity:1; } }
        .anim-slideUp   { animation: slideUp   0.6s ease-out both; }
        .anim-slideRight{ animation: slideRight 0.55s ease-out both; }
        .anim-scaleIn   { animation: scaleIn   0.5s cubic-bezier(0.34,1.56,0.64,1) both; }
        .anim-fadeIn    { animation: fadeIn    0.5s ease-out both; }
        .anim-slideUp,
        .anim-slideRight,
        .anim-scaleIn {
        will-change: transform, opacity;
        }

        /* ── RESPONSIVE ── */
        @media (max-width: 900px) {
          .hero {
            min-height: 600px;
          }
          .hero-inner {
            /* Slightly less padding on tablet since navbar shrinks a touch */
            padding: 140px 24px 110px;
            flex-direction: column;
            gap: 32px;
          }
          .about-inner, .main-inner, .benefits-inner {
            grid-template-columns: 1fr;
            padding-left: 24px;
            padding-right: 24px;
          }
          .services-grid { grid-template-columns: 1fr; }
          .info-grid { grid-template-columns: 1fr 1fr; }
        }

        @media (max-width: 540px) {
          .hero {
            min-height: 560px;
          }
          .hero-inner {
            padding: 120px 20px 100px;
            gap: 24px;
          }
          .hero-actions {
            flex-direction: row;
            flex-wrap: wrap;
            gap: 12px;
          }
          .btn-primary, .btn-outline {
            flex: 1 1 auto;
            text-align: center;
            padding: 13px 16px;
            font-size: 0.78rem;
          }
          .info-grid { grid-template-columns: 1fr; }
          .form-card { padding: 28px 20px 36px; }
        }
      `}</style>
    </div>
  );
};

export default Contact;