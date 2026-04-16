import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../comman/Navbar'
import Footer from '../comman/Footer'

const PagesLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />

      {/* pt-20 matches the navbar height (h-20) to push content below the fixed navbar */}
      <main className="flex-grow w-full pt-">
        <Outlet />
      </main>

      <Footer />
    </div>
  )
}

export default PagesLayout