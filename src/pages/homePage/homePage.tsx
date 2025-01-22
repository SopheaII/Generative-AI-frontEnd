import React, { FC, useState } from 'react'
import Footer from '~/components/footer'
import Navigation from '~/components/navigation'
import SideBar from '~/components/sideBard'
import NewsLetter from './newsLetter'
import ProductCard from '~/components/productCard'
import { useAppContext } from '~/context/appContext'

const Home = () => {
  const { isMenuOpen } = useAppContext();

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <Navigation/>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-b">
          <div className="container mx-auto px-4 py-2">
            <nav className="flex flex-col space-y-2">
              {['Home', 'Shop', 'Pages', 'About', 'Blog', 'Contact'].map((item) => (
                <a key={item} href={`/${item.toLowerCase()}`} className="text-sm font-medium hover:text-blue-600">
                  {item}
                </a>
              ))}
            </nav>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <SideBar>
          <ProductCard/>
        </SideBar>

        {/* Newsletter */}
        <NewsLetter/>
        
      </main>

      {/* Footer */}
      <Footer/>
    </div>
  )
}


export default Home

