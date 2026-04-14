import React from 'react'
import { Athenura_Nav_Image } from '../../assets'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  // Navigation data
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

  // Icon components
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
    <footer className="relative bg-gradient-to-b from-[#F5EBFA] to-white" role="contentinfo">
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
                  className="w-48 h-auto object-contain"
                  loading="lazy"
                />
              </div>
              <p className="text-[#6E3482] text-sm leading-relaxed pr-4">
                Your trusted platform for all your needs. We're here to help you succeed with excellence and dedication.
              </p>
              {/* Decorative element */}
              <div className="flex gap-2 pt-2">
                <div className="h-1 w-12 bg-gradient-to-r from-[#49225B] to-[#A56ABD] rounded-full"></div>
                <div className="h-1 w-8 bg-[#E7DBEF] rounded-full"></div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-5">
              <h3 className="text-lg font-bold text-[#49225B] relative inline-block">
                Quick Links
                <span className="absolute -bottom-2 left-0 w-12 h-0.5 bg-gradient-to-r from-[#6E3482] to-[#A56ABD]"></span>
              </h3>
              <ul className="space-y-3 pt-2" role="list">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-[#6E3482] hover:text-[#49225B] transition-all duration-300 text-sm font-medium hover:translate-x-1 inline-block focus:outline-none focus:ring-2 focus:ring-[#A56ABD] focus:ring-offset-2 rounded"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support */}
            <div className="space-y-5">
              <h3 className="text-lg font-bold text-[#49225B] relative inline-block">
                Support
                <span className="absolute -bottom-2 left-0 w-12 h-0.5 bg-gradient-to-r from-[#6E3482] to-[#A56ABD]"></span>
              </h3>
              <ul className="space-y-3 pt-2" role="list">
                {supportLinks.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-[#6E3482] hover:text-[#49225B] transition-all duration-300 text-sm font-medium hover:translate-x-1 inline-block focus:outline-none focus:ring-2 focus:ring-[#A56ABD] focus:ring-offset-2 rounded"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div className="space-y-5">
              <h3 className="text-lg font-bold text-[#49225B] relative inline-block">
                Contact Us
                <span className="absolute -bottom-2 left-0 w-12 h-0.5 bg-gradient-to-r from-[#6E3482] to-[#A56ABD]"></span>
              </h3>
              <ul className="space-y-4 pt-2" role="list">
                <li className="flex items-start gap-3 group">
                  <LocationIcon />
                  <span className="text-sm text-[#6E3482] group-hover:text-[#49225B] transition-colors duration-300">
                    {contactInfo.address}
                  </span>
                </li>
                <li className="flex items-start gap-3 group">
                  <EmailIcon />
                  <a
                    href={`mailto:${contactInfo.email}`}
                    className="text-sm text-[#6E3482] hover:text-[#49225B] transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-[#A56ABD] focus:ring-offset-2 rounded underline decoration-[#E7DBEF] hover:decoration-[#A56ABD]"
                  >
                    {contactInfo.email}
                  </a>
                </li>
                <li className="flex items-start gap-3 group">
                  <PhoneIcon />
                  <a
                    href={`tel:${contactInfo.phone.replace(/\D/g, '')}`}
                    className="text-sm text-[#6E3482] hover:text-[#49225B] transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-[#A56ABD] focus:ring-offset-2 rounded"
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
        <div className="max-w-7xl mx-auto border-t border-[#E7DBEF]"></div>
      </div>

      {/* Bottom bar with copyright */}
      <div className="w-full px-6 lg:px-12 py-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-[#6E3482] font-medium">
              © {currentYear} Athenura. All rights reserved.
            </p>
            <div className="flex items-center gap-6" role="list">
              <a
                href="#privacy"
                className="text-sm text-[#6E3482] hover:text-[#49225B] transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-[#A56ABD] focus:ring-offset-2 rounded font-medium"
              >
                Privacy
              </a>
              <span className="text-[#E7DBEF]">•</span>
              <a
                href="#terms"
                className="text-sm text-[#6E3482] hover:text-[#49225B] transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-[#A56ABD] focus:ring-offset-2 rounded font-medium"
              >
                Terms
              </a>
              <span className="text-[#E7DBEF]">•</span>
              <a
                href="#cookies"
                className="text-sm text-[#6E3482] hover:text-[#49225B] transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-[#A56ABD] focus:ring-offset-2 rounded font-medium"
              >
                Cookies
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative bottom accent */}
      <div className="h-2 bg-gradient-to-r from-[#49225B] via-[#6E3482] via-[#A56ABD] to-[#49225B]" aria-hidden="true"></div>
    </footer>
  )
}

export default Footer