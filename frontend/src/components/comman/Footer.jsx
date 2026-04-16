import React from 'react'
import { Athenura_Nav_Image } from '../../assets'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const quickLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About Us', href: '#about' },
    { name: 'Contact', href: '#contact' },
    { name: 'Help Center', href: '#help' }
  ]

  const supportLinks = [
    { name: 'FAQ', href: '#faq' },
    { name: 'Privacy Policy', href: '#privacy' },
    { name: 'Terms of Service', href: '#terms' },
    { name: 'Cookie Policy', href: '#cookies' }
  ]

  const contactInfo = {
    address: '123 Business Street, NY 10001',
    email: 'contact@athenura.com',
    phone: '+1 (555) 123-4567'
  }

  // Social Media Icons
  const InstagramIcon = () => (
    <svg className="w-6 h-6 text-[#A56ABD] hover:text-white transition-all duration-300 hover:scale-110" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
    </svg>
  )

  const TwitterIcon = () => (
    <svg className="w-6 h-6 text-[#A56ABD] hover:text-white transition-all duration-300 hover:scale-110" fill="currentColor" viewBox="0 0 24 24">
      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
    </svg>
  )

  const LinkedInIcon = () => (
    <svg className="w-6 h-6 text-[#A56ABD] hover:text-white transition-all duration-300 hover:scale-110" fill="currentColor" viewBox="0 0 24 24">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  )

  const MediumIcon = () => (
    <svg className="w-6 h-6 text-[#A56ABD] hover:text-white transition-all duration-300 hover:scale-110" fill="currentColor" viewBox="0 0 24 24">
      <path d="M13.54 9a2.46 2.46 0 0 0-3.08 2.45v3.71a.75.75 0 0 1-.75.75H7.5a.75.75 0 0 1-.75-.75V9.26a2.46 2.46 0 0 0-3.08 2.45 2.46 2.46 0 0 0 4.88 0V11a.75.75 0 0 1 .75-.75h1.71a.75.75 0 0 1 .75.75v4.22a2.46 2.46 0 0 0 4.88 0 2.46 2.46 0 0 0-1.58-2.3v-.05z"/>
      <path d="M23.979 12.96c-.0003-.92-.748-1.666-1.67-1.666H19.47a1.5 1.5 0 0 0-1.5 1.5v6.79a1.5 1.5 0 0 0 1.5 1.5h2.84a1.5 1.5 0 0 0 1.5-1.5v-6.123zm-3.479 5.662h-2.34v-4.354h2.34zM16.5 0A1.5 1.5 0 0 0 15 1.5v21a1.5 1.5 0 0 0 3 0V1.5A1.5 1.5 0 0 0 16.5 0z"/>
    </svg>
  )

  const LocationIcon = () => (
    <svg className="w-5 h-5 text-[#A56ABD] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  )

  const EmailIcon = () => (
    <svg className="w-5 h-5 text-[#A56ABD] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  )

  const PhoneIcon = () => (
    <svg className="w-5 h-5 text-[#A56ABD] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
  )

  return (
    <footer className="relative bg-[#6E3482]" role="contentinfo">
      {/* Decorative top gradient line */}
      <div className="h-1 bg-gradient-to-r from-[#49225B] via-[#A56ABD] to-[#49225B]" aria-hidden="true"></div>

      {/* Main footer content */}
      <div className="w-full px-6 lg:px-12 py-12 sm:py-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">

            {/* Company Info */}
            <div className="space-y-5 lg:col-span-1">
              <div className="flex items-center">
                <img
                  src={Athenura_Nav_Image}
                  alt="Athenura logo"
                  className="w-48 h-auto object-contain brightness-0 invert"
                  loading="lazy"
                />
              </div>
              
              <p className="text-[#E7DBEF] text-sm leading-relaxed pr-4">
                Your trusted platform for all your needs. We're here to help you succeed with excellence and dedication.
              </p>

              {/* Social Media Links - MOVED HERE AFTER DESCRIPTION */}
              <div className="flex items-center gap-4 pt-4">
                <a href="https://www.instagram.com/athenura.in" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                  <InstagramIcon />
                </a>
                <a href="https://x.com/athenura_in" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                  <TwitterIcon />
                </a>
                <a href="https://www.linkedin.com/company/athenura/posts/?feedView=all" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                  <LinkedInIcon />
                </a>
                <a href="https://athenura.medium.com" target="_blank" rel="noopener noreferrer" aria-label="Medium">
                  <MediumIcon />
                </a>
              </div>
              
              {/* Decorative element */}
              <div className="flex gap-2 pt-4">
                <div className="h-1 w-12 bg-gradient-to-r from-[#A56ABD] to-[#E7DBEF] rounded-full"></div>
                <div className="h-1 w-8 bg-white/20 rounded-full"></div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-5">
              <h3 className="text-lg font-bold text-white relative inline-block">
                Quick Links
                <span className="absolute -bottom-2 left-0 w-12 h-0.5 bg-gradient-to-r from-[#A56ABD] to-[#E7DBEF]"></span>
              </h3>
              <ul className="space-y-3 pt-2" role="list">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-[#E7DBEF] hover:text-white transition-all duration-300 text-sm font-medium hover:translate-x-1 inline-block focus:outline-none focus:ring-2 focus:ring-[#A56ABD] focus:ring-offset-2 rounded"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support */}
            <div className="space-y-5">
              <h3 className="text-lg font-bold text-white relative inline-block">
                Support
                <span className="absolute -bottom-2 left-0 w-12 h-0.5 bg-gradient-to-r from-[#A56ABD] to-[#E7DBEF]"></span>
              </h3>
              <ul className="space-y-3 pt-2" role="list">
                {supportLinks.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-[#E7DBEF] hover:text-white transition-all duration-300 text-sm font-medium hover:translate-x-1 inline-block focus:outline-none focus:ring-2 focus:ring-[#A56ABD] focus:ring-offset-2 rounded"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div className="space-y-5">
              <h3 className="text-lg font-bold text-white relative inline-block">
                Contact Us
                <span className="absolute -bottom-2 left-0 w-12 h-0.5 bg-gradient-to-r from-[#A56ABD] to-[#E7DBEF]"></span>
              </h3>
              <ul className="space-y-4 pt-2" role="list">
                <li className="flex items-start gap-3 group">
                  <LocationIcon />
                  <span className="text-sm text-[#E7DBEF] group-hover:text-white transition-colors duration-300">
                    {contactInfo.address}
                  </span>
                </li>
                <li className="flex items-start gap-3 group">
                  <EmailIcon />
                  <a
                    href={`mailto:${contactInfo.email}`}
                    className="text-sm text-[#E7DBEF] hover:text-white transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-[#A56ABD] focus:ring-offset-2 rounded underline decoration-white/20 hover:decoration-white"
                  >
                    {contactInfo.email}
                  </a>
                </li>
                <li className="flex items-start gap-3 group">
                  <PhoneIcon />
                  <a
                    href={`tel:${contactInfo.phone.replace(/\D/g, '')}`}
                    className="text-sm text-[#E7DBEF] hover:text-white transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-[#A56ABD] focus:ring-offset-2 rounded"
                  >
                    {contactInfo.phone}
                  </a>
                </li>
              </ul>
            </div>

          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="w-full px-6 lg:px-12">
        <div className="max-w-7xl mx-auto border-t border-white/20"></div>
      </div>

      {/* Bottom bar */}
      <div className="w-full px-6 lg:px-12 py-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-[#E7DBEF] font-medium">
              © {currentYear} Athenura. All rights reserved.
            </p>
            <div className="flex items-center gap-6" role="list">
              {['Privacy', 'Terms', 'Cookies'].map((item, i, arr) => (
                <React.Fragment key={item}>
                  <a
                    href={`#${item.toLowerCase()}`}
                    className="text-sm text-[#E7DBEF] hover:text-white transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-[#A56ABD] focus:ring-offset-2 rounded font-medium"
                  >
                    {item}
                  </a>
                  {i < arr.length - 1 && <span className="text-white/30">•</span>}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Decorative bottom accent */}
      <div className="h-2 bg-gradient-to-r from-[#49225B] via-[#A56ABD] to-[#49225B]" aria-hidden="true"></div>
    </footer>
  )
}

export default Footer