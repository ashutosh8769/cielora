"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const tabs = [
    { name: "Limited Edition", href: "/limited-edition" },
    { name: "Shop by", href: "/shop-by" },
    { name: "Collections", href: "/collections" },
    { name: "Bracelets", href: "/bracelets" },
    { name: "Earrings", href: "/earrings" },
    { name: "Necklaces", href: "/necklaces" },
    { name: "Rings", href: "/rings" },
    { name: "Charms", href: "/charms" },
    { name: "For him", href: "/for-him" },
    { name: "Outlet", href: "/outlet" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-[#fffbf7] flex flex-col">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-[70px] items-center justify-between">
          
          {/* Logo (Left) */}
          <div className="flex items-center">
            <Link href="/" className="text-[40px] tracking-tighter" style={{ fontFamily: 'var(--font-style-script), cursive', color: '#D4AF37' }}>
              Cielora
            </Link>
          </div>

          {/* Desktop Tabs Bar (Center) */}
          <nav className="hidden lg:flex items-center justify-center flex-1 mx-8 gap-1">
            {tabs.map((tab) => (
              <Link 
                key={tab.name} 
                href={tab.href}
                className="text-[14px] text-gray-600 hover:text-black font-medium px-4 py-2 whitespace-nowrap transition-colors"
              >
                {tab.name}
              </Link>
            ))}
          </nav>

          {/* Icons on Right Side */}
          <div className="flex items-center gap-4 text-gray-700 translate-x-2 sm:translate-x-4 lg:translate-x-6">
            {/* Search */}
            <button aria-label="Search" className="hover:text-black">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></svg>
            </button>
            {/* Store */}
            <button aria-label="Store" className="hidden sm:block hover:text-black">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z"></path><path d="m3 9 2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.1L21 9"></path><path d="M12 3v6"></path></svg>
            </button>
            {/* User */}
            <button aria-label="User" className="hidden sm:block hover:text-black">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
            </button>
            {/* Heart */}
            <button aria-label="Wishlist" className="hover:text-black">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path></svg>
            </button>
            {/* Bag */}
            <button aria-label="Cart" className="hover:text-black">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path><path d="M3 6h18"></path><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
            </button>
            
            {/* Mobile menu button */}
            <button onClick={() => setIsOpen(!isOpen)} aria-label="Menu" className="lg:hidden text-gray-700 hover:text-black ml-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden border-t py-4 px-4 bg-white">
          <nav className="flex flex-col gap-2">
            {tabs.map((tab) => (
              <Link 
                key={tab.name} 
                href={tab.href}
                className="text-[14px] text-gray-600 hover:text-black font-medium px-4 py-2"
                onClick={() => setIsOpen(false)}
              >
                {tab.name}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
