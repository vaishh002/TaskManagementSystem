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
import { Athenura_Nav_Image } from '../../assets'
import { useAuth } from '../../context/AuthContext'

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  const navLinks = [
    { id: 'home',    path: '/',        label: 'Home',    icon: HiOutlineHome },
    { id: 'about',   path: '/about',   label: 'About',   icon: HiOutlineInformationCircle },
    { id: 'contact', path: '/contact', label: 'Contact', icon: HiOutlineMail },
    { id: 'help',    path: '/help',    label: 'Help',    icon: HiOutlineQuestionMarkCircle },
  ]

  const { user, logout } = useAuth()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isUserMenuOpen && !event.target.closest('.user-menu')) {
        setIsUserMenuOpen(false)
      }
    }
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [isUserMenuOpen])

  const isActiveLink = (path) => {
    if (path === '/') return location.pathname === '/'
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
    <>
      {/* ── Floating pill navbar ────────────────────────────── */}
      <div
        className={`
          fixed top-0 left-0 right-0 z-50
          flex justify-center
          px-4 sm:px-6 lg:px-8
          transition-all duration-500
          ${isScrolled ? 'pt-3' : 'pt-4'}
        `}
      >
        <nav
          className={`
            w-full max-w-6xl
            flex justify-between items-center
            px-3 sm:px-4 lg:px-6
            h-16
            bg-white
            rounded-full
            border border-[#E7DBEF]
            transition-all duration-500
            ${isScrolled
              ? 'shadow-xl shadow-[#A56ABD]/20 border-[#A56ABD]/40'
              : 'shadow-lg shadow-[#6E3482]/10'
            }
          `}
        >

          {/* ── Logo ── */}
          <Link to="/" className="flex items-center group cursor-pointer flex-shrink-0">
            <img
              src={Athenura_Nav_Image}
              alt="Logo"
              className="h-10 w-auto rounded-xl object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </Link>

          {/* ── Desktop nav links ── */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const Icon = link.icon
              const isActive = isActiveLink(link.path)
              return (
                <Link
                  key={link.id}
                  to={link.path}
                  className={`
                    relative px-3 py-1.5 rounded-xl text-sm font-medium
                    transition-all duration-300 group
                    ${isActive
                      ? 'text-[#49225B] bg-[#F5EBFA]'
                      : 'text-[#6E3482] hover:text-[#49225B] hover:bg-[#F5EBFA]/70'
                    }
                  `}
                >
                  <span className="flex items-center gap-1.5">
                    <Icon className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" />
                    <span>{link.label}</span>
                  </span>
                  {isActive && (
                    <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-2/3 h-0.5 rounded-full bg-gradient-to-r from-[#6E3482] to-[#A56ABD]" />
                  )}
                </Link>
              )
            })}
          </div>

          {/* ── Right side ── */}
          <div className="flex items-center gap-2 flex-shrink-0">

            {/* Notification bell — only when logged in */}
            {user && (
              <button className="relative p-2 rounded-full text-[#6E3482] hover:text-[#49225B] hover:bg-[#F5EBFA] transition-all duration-300">
                <HiOutlineBell className="w-5 h-5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-gradient-to-r from-[#A56ABD] to-[#6E3482] rounded-full border-2 border-white" />
              </button>
            )}

            {user ? (
              /* User menu */
              <div className="relative user-menu">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#E7DBEF] hover:bg-[#F5EBFA] hover:border-[#A56ABD] transition-all duration-300"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#49225B] via-[#6E3482] to-[#A56ABD] flex items-center justify-center text-white text-sm font-semibold shadow-sm">
                    {user.avatar
                      ? <img src={user.avatar} alt={user.name} className="w-full h-full rounded-full object-cover" />
                      : <span>{user.name?.charAt(0).toUpperCase() || user.email?.charAt(0).toUpperCase() || 'U'}</span>
                    }
                  </div>
                  <span className="text-sm font-medium hidden lg:block text-[#49225B]">
                    {user.name?.split(' ')[0] || 'User'}
                  </span>
                  <svg
                    className={`w-3.5 h-3.5 text-[#6E3482] transition-transform duration-300 ${isUserMenuOpen ? 'rotate-180' : ''}`}
                    fill="none" stroke="currentColor" viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Dropdown */}
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-3 w-72 bg-white rounded-2xl shadow-2xl border border-[#E7DBEF] py-2 overflow-hidden animate-fadeInDown">
                    <div className="px-4 py-4 border-b border-[#E7DBEF] bg-gradient-to-r from-[#F5EBFA] to-transparent">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#49225B] via-[#6E3482] to-[#A56ABD] flex items-center justify-center text-white text-lg font-semibold shadow-md">
                          {user.avatar
                            ? <img src={user.avatar} alt={user.name} className="w-full h-full rounded-full object-cover" />
                            : <span>{user.name?.charAt(0).toUpperCase() || user.email?.charAt(0).toUpperCase() || 'U'}</span>
                          }
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-semibold text-[#49225B]">{user.name || 'User'}</p>
                          <p className="text-xs text-[#6E3482] mt-0.5">{user.email}</p>
                        </div>
                      </div>
                    </div>

                    <Link
                      to="/profile"
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-[#6E3482] hover:bg-[#F5EBFA] hover:text-[#49225B] transition-colors"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      <HiOutlineUserCircle className="w-4 h-4" />
                      <span>Profile Settings</span>
                    </Link>

                    <button
                      onClick={handleWorkplaceClick}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-[#6E3482] hover:bg-[#F5EBFA] hover:text-[#49225B] transition-colors"
                    >
                      <HiOutlineBriefcase className="w-4 h-4" />
                      <span>Go to Workplace</span>
                    </button>

                    <div className="border-t border-[#E7DBEF] mt-2 pt-2">
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors"
                      >
                        <HiOutlineLogout className="w-4 h-4" />
                        <span>Sign out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* Login button */
              <Link
                to="/login"
                className="group relative px-5 py-2 rounded-full text-sm font-semibold bg-gradient-to-r from-[#49225B] via-[#6E3482] to-[#A56ABD] text-white shadow-md hover:shadow-lg hover:shadow-[#A56ABD]/30 hover:scale-105 transition-all duration-300 overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-1.5">
                  <HiOutlineLogin className="w-4 h-4" />
                  <span>Login</span>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#6E3482] to-[#49225B] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Link>
            )}

            {/* Mobile hamburger */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-xl text-[#6E3482] hover:text-[#49225B] hover:bg-[#F5EBFA] transition-all duration-300 focus:outline-none"
            >
              {isMobileMenuOpen
                ? <HiOutlineX className="w-5 h-5" />
                : <HiOutlineMenu className="w-5 h-5" />
              }
            </button>
          </div>
        </nav>

        {/* ── Mobile dropdown — sits below the pill, same width ── */}
        <div
          className={`
            md:hidden
            absolute top-full left-4 right-4 sm:left-6 sm:right-6 lg:left-8 lg:right-8
            mt-2
            bg-white
            rounded-2xl
            border border-[#E7DBEF]
            shadow-xl shadow-[#A56ABD]/15
            transition-all duration-300 ease-in-out
            overflow-hidden
            ${isMobileMenuOpen
              ? 'opacity-100 translate-y-0 max-h-[600px]'
              : 'opacity-0 -translate-y-3 max-h-0 pointer-events-none'
            }
          `}
        >
          <div className="px-4 py-4 space-y-1">
            {navLinks.map((link) => {
              const Icon = link.icon
              const isActive = isActiveLink(link.path)
              return (
                <Link
                  key={link.id}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-xl
                    transition-all duration-300
                    ${isActive
                      ? 'bg-gradient-to-r from-[#F5EBFA] to-[#E7DBEF] text-[#49225B]'
                      : 'text-[#6E3482] hover:bg-[#F5EBFA] hover:text-[#49225B]'
                    }
                  `}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'text-[#6E3482]' : 'text-[#A56ABD]'}`} />
                  <span className="font-medium">{link.label}</span>
                  {isActive && <HiCheck className="w-4 h-4 ml-auto text-[#6E3482]" />}
                </Link>
              )
            })}

            {/* Mobile auth section */}
            {user ? (
              <>
                <div className="flex items-center gap-3 px-4 py-4 border-t border-[#E7DBEF] mt-2 bg-gradient-to-r from-[#F5EBFA] to-transparent rounded-xl">
                  <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#49225B] via-[#6E3482] to-[#A56ABD] flex items-center justify-center text-white text-base font-semibold shadow-md">
                    {user.avatar
                      ? <img src={user.avatar} alt={user.name} className="w-full h-full rounded-full object-cover" />
                      : <span>{user.name?.charAt(0).toUpperCase() || user.email?.charAt(0).toUpperCase() || 'U'}</span>
                    }
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-[#49225B]">{user.name || 'User'}</p>
                    <p className="text-xs text-[#6E3482] mt-0.5">{user.email}</p>
                  </div>
                </div>

                <button
                  onClick={handleWorkplaceClick}
                  className="w-full mt-1 px-4 py-3 rounded-xl bg-gradient-to-r from-[#49225B] via-[#6E3482] to-[#A56ABD] text-white font-medium hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <HiOutlineBriefcase className="w-5 h-5" />
                  <span>Go to Workplace</span>
                </button>

                <button
                  onClick={handleLogout}
                  className="w-full mt-2 px-4 py-3 rounded-xl border border-red-200 text-red-500 font-medium hover:bg-red-50 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <HiOutlineLogout className="w-5 h-5" />
                  <span>Sign out</span>
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="w-full mt-2 px-4 py-3 rounded-xl bg-gradient-to-r from-[#49225B] via-[#6E3482] to-[#A56ABD] text-white font-medium hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <HiOutlineLogin className="w-5 h-5" />
                <span>Login</span>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* ── Page offset so content doesn't hide under the floating nav ── */}
      {/* Add pt-24 (or pt-28 if you want more breathing room) to your page wrapper */}
    </>
  )
}

export default Navbar