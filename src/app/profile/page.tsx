"use client";

import { useState } from "react";
import Link from "next/link";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<"login" | "create">("login");
  const [showPassword, setShowPassword] = useState(false);
  const [showCreatePassword, setShowCreatePassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="w-full min-h-[70vh] bg-white flex justify-center py-20 px-4">
      <div className="w-full max-w-[1000px] grid grid-cols-1 md:grid-cols-2 gap-20">
        
        {/* Left Column - Authentication */}
        <div className="flex flex-col w-full">
          {/* Tabs */}
          <div className="flex w-full mb-8 border-b border-gray-200 relative">
            <button 
              onClick={() => setActiveTab("login")}
              className={`flex-1 pb-4 text-center text-[14px] ${activeTab === "login" ? "text-gray-900 font-medium" : "text-gray-500 hover:text-gray-700"}`}
            >
              Login
            </button>
            <button 
              onClick={() => setActiveTab("create")}
              className={`flex-1 pb-4 text-center text-[14px] ${activeTab === "create" ? "text-gray-900 font-medium" : "text-gray-500 hover:text-gray-700"}`}
            >
              Create account
            </button>
            {/* Active indicator */}
            <div 
              className="absolute bottom-0 h-[2px] bg-[#ac2505] transition-all duration-300 w-1/2"
              style={{ left: activeTab === "login" ? "0%" : "50%" }}
            ></div>
          </div>

          {activeTab === "login" && (
            <div className="flex flex-col gap-5 w-full">
              <input 
                type="email" 
                placeholder="Email" 
                className="w-full border border-gray-200 px-4 py-3 text-[14px] text-gray-900 placeholder:text-gray-400 outline-none focus:border-gray-400 transition-colors"
              />
              
              <div className="w-full relative">
                <input 
                  type={showPassword ? "text" : "password"} 
                  placeholder="Password" 
                  className="w-full border border-gray-200 px-4 py-3 text-[14px] text-gray-900 placeholder:text-gray-400 outline-none focus:border-gray-400 transition-colors pr-12"
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                  )}
                </button>
              </div>

              <div className="flex justify-between items-center mt-1 mb-2">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <div className="relative w-[18px] h-[18px] shrink-0">
                    <input type="checkbox" className="peer opacity-0 absolute w-full h-full cursor-pointer z-20" />
                    <div className="absolute inset-0 border border-gray-300 peer-checked:bg-[#1a1a1a] peer-checked:border-[#1a1a1a] group-hover:border-gray-500 transition-colors z-0"></div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 peer-checked:opacity-100 transition-opacity z-10 pointer-events-none"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  </div>
                  <span className="text-[13px] text-gray-800">Remember me</span>
                </label>
                <Link href="#" className="text-[13px] text-gray-600 hover:text-black">
                  forgot password?
                </Link>
              </div>

              <button className="w-full bg-[#1a1a1a] text-white border border-[#1a1a1a] py-3.5 text-[14px] font-medium hover:bg-white hover:text-black transition-colors">
                Login
              </button>
            </div>
          )}

          {activeTab === "create" && (
            <div className="flex flex-col gap-5 w-full">
              <input 
                type="text" 
                placeholder="First Name *" 
                className="w-full border border-gray-200 px-4 py-3 text-[14px] text-gray-900 placeholder:text-gray-400 outline-none focus:border-gray-400 transition-colors"
              />
              <input 
                type="text" 
                placeholder="Last Name *" 
                className="w-full border border-gray-200 px-4 py-3 text-[14px] text-gray-900 placeholder:text-gray-400 outline-none focus:border-gray-400 transition-colors"
              />
              <input 
                type="tel" 
                placeholder="Phone" 
                className="w-full border border-gray-200 px-4 py-3 text-[14px] text-gray-900 placeholder:text-gray-400 outline-none focus:border-gray-400 transition-colors"
              />
              
              <div className="flex flex-col gap-2 mt-1">
                <label className="text-[14px] font-semibold text-gray-900">Date of birth*</label>
                <div className="w-full relative">
                  <input 
                    type="date" 
                    className="w-full border border-gray-200 px-4 py-3 text-[14px] text-gray-900 outline-none focus:border-gray-400 transition-colors"
                  />
                </div>
              </div>

              <input 
                type="email" 
                placeholder="Email *" 
                className="w-full border border-gray-200 px-4 py-3 text-[14px] text-gray-900 placeholder:text-gray-400 outline-none focus:border-gray-400 transition-colors mt-1"
              />

              <div className="w-full relative">
                <input 
                  type={showCreatePassword ? "text" : "password"} 
                  placeholder="Password *" 
                  className="w-full border border-gray-200 px-4 py-3 text-[14px] text-gray-900 placeholder:text-gray-400 outline-none focus:border-gray-400 transition-colors pr-12"
                />
                <button 
                  type="button"
                  onClick={() => setShowCreatePassword(!showCreatePassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                  aria-label={showCreatePassword ? "Hide password" : "Show password"}
                >
                  {showCreatePassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                  )}
                </button>
              </div>

              <div className="w-full relative">
                <input 
                  type={showConfirmPassword ? "text" : "password"} 
                  placeholder="Confirm Password *" 
                  className="w-full border border-gray-200 px-4 py-3 text-[14px] text-gray-900 placeholder:text-gray-400 outline-none focus:border-gray-400 transition-colors pr-12"
                />
                <button 
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                  aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                >
                  {showConfirmPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                  )}
                </button>
              </div>

              <div className="flex items-center gap-6 mt-1 mb-2">
                <span className="text-[14px] font-semibold text-gray-900">Gender*</span>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="gender" value="female" className="w-[16px] h-[16px] border-gray-300 focus:ring-black accent-black" />
                  <span className="text-[14px] text-gray-800">Female</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="gender" value="male" className="w-[16px] h-[16px] border-gray-300 focus:ring-black accent-black" />
                  <span className="text-[14px] text-gray-800">Male</span>
                </label>
              </div>

              <div className="flex flex-col gap-3">
                <label className="flex items-start gap-3 cursor-pointer group">
                  <div className="relative w-[18px] h-[18px] mt-[2px] shrink-0">
                    <input type="checkbox" className="peer opacity-0 absolute w-full h-full cursor-pointer z-20" />
                    <div className="absolute inset-0 border border-gray-300 peer-checked:bg-[#1a1a1a] peer-checked:border-[#1a1a1a] group-hover:border-gray-500 transition-colors z-0"></div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 peer-checked:opacity-100 transition-opacity z-10 pointer-events-none"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  </div>
                  <span className="text-[13px] text-gray-900 leading-[1.3]">
                    I have read and understand the <Link href="#" className="underline hover:text-gray-600 transition-colors">See privacy policy</Link>
                  </span>
                </label>
              </div>

              <button className="w-full bg-[#1a1a1a] text-white border border-[#1a1a1a] py-3.5 text-[14px] font-medium hover:bg-white hover:text-black transition-colors mt-2">
                Create Account
              </button>
            </div>
          )}
        </div>

        {/* Right Column - Check Order */}
        <div className="flex flex-col w-full pl-0 md:pl-8">
          <h2 className="text-[14px] font-medium text-gray-900 mb-2">Check order</h2>
          <p className="text-[13px] text-gray-500 leading-relaxed mb-6 pr-8">
            See your order even if you are not a registered user. Enter the order number and the billing address ZIP code.
          </p>

          <div className="flex flex-col gap-5 w-full">
            <input 
              type="text" 
              placeholder="Order number" 
              className="w-full border border-gray-200 px-4 py-3 text-[14px] text-gray-900 placeholder:text-gray-400 outline-none focus:border-gray-400 transition-colors"
            />
            <input 
              type="email" 
              placeholder="Order Email" 
              className="w-full border border-gray-200 px-4 py-3 text-[14px] text-gray-900 placeholder:text-gray-400 outline-none focus:border-gray-400 transition-colors"
            />
            <input 
              type="text" 
              placeholder="Billing ZIP code" 
              className="w-full border border-gray-200 px-4 py-3 text-[14px] text-gray-900 placeholder:text-gray-400 outline-none focus:border-gray-400 transition-colors"
            />
            
            <button className="w-full bg-white border border-black text-black py-3.5 text-[14px] font-medium hover:bg-black hover:text-white transition-colors mt-2">
              Check status
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
