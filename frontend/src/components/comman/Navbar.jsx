import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {
  HiOutlineHome,
  HiOutlineInformationCircle,
  HiOutlineMail,
  HiOutlineQuestionMarkCircle,
  HiOutlineBell,
  HiOutlineLogin,
  HiOutlineMenu,
  HiOutlineX,
  HiCheck,
  HiOutlineUserCircle,
  HiOutlineLogout,
  HiOutlineBriefcase,
  HiOutlineSparkles
} from 'react-icons/hi'
import { Athenura_Title_Image } from '../../assets'
import { useAuth } from '../../context/AuthContext'

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  const navLinks = [
    { id: 'home', path: '/', label: 'Home', icon: HiOutlineHome },
    { id: 'about', path: '/about', label: 'About', icon: HiOutlineInformationCircle },
    { id: 'contact', path: '/contact', label: 'Contact', icon: HiOutlineMail },
    { id: 'help', path: '/help', label: 'Help', icon: HiOutlineQuestionMarkCircle }
  ]

  const { user, logout } = useAuth()

  // Handle scroll effect for transparent navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isUserMenuOpen && !event.target.closest('.user-menu')) {
        setIsUserMenuOpen(false)
      }
    }
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [isUserMenuOpen])

  // Determine if link is active based on current path
  const isActiveLink = (path) => {
    if (path === '/') {
      return location.pathname === '/'
    }
    return location.pathname.startsWith(path)
  }

  const handleLogout = async () => {
    try {
      await logout()
      navigate('/')
      setIsUserMenuOpen(false)
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  const handleWorkplaceClick = () => {
    navigate('/workplace')
    setIsMobileMenuOpen(false)
    setIsUserMenuOpen(false)
  }

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-lg shadow-lg border-b border-[#E7DBEF]'
          : 'bg-transparent'
      }`}
    >
      <div className="w-full px-6 lg:px-12">
        <div className="flex justify-between items-center h-20">
          {/* Left side - Logo and brand */}
          <Link to="/" className="flex items-center space-x-3 group cursor-pointer">
            <div className="relative">
              <img
                src={Athenura_Title_Image}
                alt="Logo"
                className="w-15 h-15 rounded-xl"
              />
            </div>
            <div className="flex flex-col">
              <span 
                className={`text-xl font-bold transition-all duration-500 ${
                  isScrolled 
                    ? 'bg-gradient-to-r from-[#49225B] via-[#6E3482] to-[#A56ABD] bg-clip-text text-transparent' 
                    : 'text-white drop-shadow-lg'
                }`}
              >
                TMS
              </span>
              <span 
                className={`text-[10px] tracking-wider font-medium transition-all duration-500 ${
                  isScrolled ? 'text-[#6E3482]' : 'text-white/90 drop-shadow-md'
                }`}
              >
                Task Management System
              </span>
            </div>
          </Link>

          {/* Center - Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => {
              const Icon = link.icon
              const isActive = isActiveLink(link.path)

              return (
                <Link
                  key={link.id}
                  to={link.path}
                  className={`relative px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 group ${
                    isScrolled
                      ? isActive
                        ? 'text-[#49225B] bg-[#F5EBFA]'
                        : 'text-[#6E3482] hover:text-[#49225B] hover:bg-[#F5EBFA]/50'
                      : isActive
                        ? 'text-white bg-white/20 backdrop-blur-sm'
                        : 'text-white/90 hover:text-white hover:bg-white/10 backdrop-blur-sm'
                  }`}
                >
                  <span className="flex items-center space-x-2">
                    <Icon className={`w-4 h-4 transition-transform duration-300 group-hover:scale-110`} />
                    <span>{link.label}</span>
                  </span>
                  {isActive && (
                    <span 
                      className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1/2 h-0.5 rounded-full ${
                        isScrolled ? 'bg-gradient-to-r from-[#6E3482] to-[#A56ABD]' : 'bg-white'
                      }`}
                    ></span>
                  )}
                </Link>
              )
            })}
          </div>

          {/* Right side - Auth buttons or User menu */}
          <div className="flex items-center space-x-4">
            {/* Notification icon - only show when logged in */}
            {user && (
              <button 
                className={`relative p-2 rounded-full transition-all duration-300 group ${
                  isScrolled 
                    ? 'text-[#6E3482] hover:text-[#49225B] hover:bg-[#F5EBFA]' 
                    : 'text-white hover:bg-white/10'
                }`}
              >
                <HiOutlineBell className="w-5 h-5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-gradient-to-r from-[#A56ABD] to-[#6E3482] rounded-full border-2 border-white"></span>
              </button>
            )}

            {/* Conditional rendering based on authentication */}
            {user ? (
              /* User is logged in - Show elegant user menu */
              <div className="relative user-menu">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-full transition-all duration-300 group border ${
                    isScrolled
                      ? 'hover:bg-[#F5EBFA] border-transparent hover:border-[#E7DBEF]'
                      : 'hover:bg-white/10 border-transparent hover:border-white/20'
                  }`}
                >
                  <div className="w-9 h-9 rounded-full bg-gradient-to-r from-[#49225B] via-[#6E3482] to-[#A56ABD] flex items-center justify-center text-white text-sm font-semibold shadow-lg">
                    {user.avatar ? (
                      <img src={user.avatar} alt={user.name} className="w-full h-full rounded-full object-cover" />
                    ) : (
                      <span>{user.name?.charAt(0).toUpperCase() || user.email?.charAt(0).toUpperCase() || 'U'}</span>
                    )}
                  </div>
                  <span 
                    className={`text-sm font-medium hidden lg:block transition-colors duration-300 ${
                      isScrolled ? 'text-[#49225B]' : 'text-white'
                    }`}
                  >
                    {user.name?.split(' ')[0] || 'User'}
                  </span>
                  <svg
                    className={`w-3.5 h-3.5 transition-all duration-300 ${
                      isScrolled ? 'text-[#6E3482]' : 'text-white/80'
                    } ${isUserMenuOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* User dropdown menu */}
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-3 w-72 bg-white rounded-2xl shadow-2xl border border-[#E7DBEF] py-2 animate-fadeInDown overflow-hidden">
                    <div className="px-4 py-4 border-b border-[#E7DBEF] bg-gradient-to-r from-[#F5EBFA] to-transparent">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#49225B] via-[#6E3482] to-[#A56ABD] flex items-center justify-center text-white text-lg font-semibold shadow-md">
                          {user.avatar ? (
                            <img src={user.avatar} alt={user.name} className="w-full h-full rounded-full object-cover" />
                          ) : (
                            <span>{user.name?.charAt(0).toUpperCase() || user.email?.charAt(0).toUpperCase() || 'U'}</span>
                          )}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-semibold text-[#49225B]">{user.name || 'User'}</p>
                          <p className="text-xs text-[#6E3482] mt-0.5">{user.email}</p>
                        </div>
                      </div>
                    </div>

                    <Link
                      to="/profile"
                      className="flex items-center space-x-3 px-4 py-2.5 text-sm text-[#6E3482] hover:bg-[#F5EBFA] hover:text-[#49225B] transition-colors"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      <HiOutlineUserCircle className="w-4 h-4" />
                      <span>Profile Settings</span>
                    </Link>

                    <button
                      onClick={handleWorkplaceClick}
                      className="w-full flex items-center space-x-3 px-4 py-2.5 text-sm text-[#6E3482] hover:bg-[#F5EBFA] hover:text-[#49225B] transition-colors"
                    >
                      <HiOutlineBriefcase className="w-4 h-4" />
                      <span>Go to Workplace</span>
                    </button>

                    <div className="border-t border-[#E7DBEF] mt-2 pt-2">
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center space-x-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <HiOutlineLogout className="w-4 h-4" />
                        <span>Sign out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* User is not logged in - Show elegant single login button */
              <Link
                to="/login"
                className={`group relative px-6 py-2.5 rounded-full text-sm font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 overflow-hidden ${
                  isScrolled
                    ? 'bg-gradient-to-r from-[#49225B] via-[#6E3482] to-[#A56ABD] text-white'
                    : 'bg-white/95 text-[#49225B] backdrop-blur-sm'
                }`}
              >
                <span className="relative z-10 flex items-center space-x-2">
                  <HiOutlineLogin className="w-4 h-4" />
                  <span>Login</span>
                </span>
                <div 
                  className={`absolute inset-0 transition-opacity duration-300 ${
                    isScrolled
                      ? 'bg-gradient-to-r from-[#6E3482] to-[#49225B] opacity-0 group-hover:opacity-100'
                      : 'bg-gradient-to-r from-[#F5EBFA] to-white opacity-0 group-hover:opacity-100'
                  }`}
                ></div>
              </Link>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`md:hidden p-2 rounded-lg transition-all duration-300 focus:outline-none ${
                isScrolled
                  ? 'text-[#6E3482] hover:text-[#49225B] hover:bg-[#F5EBFA]'
                  : 'text-white hover:bg-white/10'
              }`}
            >
              {isMobileMenuOpen ? (
                <HiOutlineX className="w-6 h-6" />
              ) : (
                <HiOutlineMenu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu with elegant animation */}
      <div
        className={`md:hidden absolute top-full left-0 right-0 transition-all duration-300 ease-in-out bg-white/98 backdrop-blur-lg border-t border-[#E7DBEF] shadow-2xl ${
          isMobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
        }`}
      >
        <div className="px-4 py-4 space-y-1">
          {navLinks.map((link) => {
            const Icon = link.icon
            const isActive = isActiveLink(link.path)

            return (
              <Link
                key={link.id}
                to={link.path}
                onClick={() => {
                  setIsMobileMenuOpen(false)
                }}
                className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                  isActive
                    ? 'bg-gradient-to-r from-[#F5EBFA] to-[#E7DBEF] text-[#49225B]'
                    : 'text-[#6E3482] hover:bg-[#F5EBFA] hover:text-[#49225B]'
                }`}
              >
                <Icon className={`w-5 h-5 ${
                  isActive ? 'text-[#6E3482]' : 'text-[#A56ABD]'
                }`} />
                <span className="font-medium">{link.label}</span>
                {isActive && (
                  <HiCheck className="w-4 h-4 ml-auto text-[#6E3482]" />
                )}
              </Link>
            )
          })}

          {/* Mobile auth based on login status */}
          {user ? (
            <>
              <div className="flex items-center space-x-3 px-4 py-4 border-t border-[#E7DBEF] mt-3 bg-gradient-to-r from-[#F5EBFA] to-transparent rounded-xl">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#49225B] via-[#6E3482] to-[#A56ABD] flex items-center justify-center text-white text-lg font-semibold shadow-md">
                  {user.avatar ? (
                    <img src={user.avatar} alt={user.name} className="w-full h-full rounded-full object-cover" />
                  ) : (
                    <span>{user.name?.charAt(0).toUpperCase() || user.email?.charAt(0).toUpperCase() || 'U'}</span>
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-[#49225B]">{user.name || 'User'}</p>
                  <p className="text-xs text-[#6E3482] mt-0.5">{user.email}</p>
                </div>
              </div>

              <button
                onClick={handleWorkplaceClick}
                className="w-full mt-2 px-4 py-3 rounded-xl bg-gradient-to-r from-[#49225B] via-[#6E3482] to-[#A56ABD] text-white font-medium hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <HiOutlineBriefcase className="w-5 h-5" />
                <span>Go to Workplace</span>
              </button>

              <button
                onClick={handleLogout}
                className="w-full mt-2 px-4 py-3 rounded-xl border border-red-200 text-red-600 font-medium hover:bg-red-50 transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <HiOutlineLogout className="w-5 h-5" />
                <span>Sign out</span>
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="w-full mt-3 px-4 py-3 rounded-xl bg-gradient-to-r from-[#49225B] via-[#6E3482] to-[#A56ABD] text-white font-medium hover:shadow-lg transform transition-all duration-300 flex items-center justify-center space-x-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <HiOutlineLogin className="w-5 h-5" />
              <span>Login to TMS</span>
            </Link>
          )}
        </div>
      </div>

      {/* Elegant bottom border gradient */}
      <div 
        className={`absolute bottom-0 left-0 right-0 h-px transition-opacity duration-500 ${
          isScrolled ? 'opacity-100' : 'opacity-0'
        } bg-gradient-to-r from-transparent via-[#A56ABD]/50 to-transparent`}
      ></div>
    </nav>
  )
}

export default Navbar