"use client";

import { useState } from "react";

export default function StoresPage() {
  const [showExactLocation, setShowExactLocation] = useState(false);

  const handleShowOnMap = () => {
    setShowExactLocation(true);
  };

  const mapUrl = showExactLocation
    ? "https://maps.google.com/maps?q=52.37307,4.89264+(Cielora+Flagship+Store)&t=&z=16&ie=UTF8&iwloc=B&output=embed"
    : "https://maps.google.com/maps?q=Amsterdam&t=&z=10&ie=UTF8&iwloc=&output=embed";

  return (
    <div className="flex flex-col md:flex-row min-h-[calc(100vh-70px)] bg-white">
      {/* Left Panel */}
      <div className="w-full md:w-[380px] lg:w-[450px] p-8 md:p-12 flex-shrink-0 bg-white z-10 shadow-md md:shadow-none overflow-y-auto">
        <h1 className="text-[22px] font-medium text-[#c43e27] mb-8">Store</h1>
        
        <div className="flex flex-col gap-6">
          <div className="text-gray-700 leading-relaxed text-[15px]">
            <p className="font-medium text-black mb-1">Cielora Flagship Store</p>
            <p>123 Fashion Avenue</p>
            <p>1012 AB Amsterdam</p>
            <p>The Netherlands</p>
            <p className="mt-4">Phone: +31 20 123 4567</p>
            <p>Email: store@cielora.com</p>
          </div>
          
          <button
            type="button"
            onClick={handleShowOnMap}
            className="w-full bg-black hover:bg-white text-white hover:text-black border border-black text-[14px] font-medium py-3 rounded-[2px] transition-colors mt-2 uppercase tracking-wide"
          >
            find store on map
          </button>
        </div>
      </div>

      {/* Map Panel */}
      <div className="flex-1 min-h-[400px] md:min-h-auto relative bg-[#e5e3df]">
        <iframe 
          src={mapUrl}
          className="absolute inset-0 w-full h-full border-0" 
          allowFullScreen 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
          title="Store Locator Map"
        ></iframe>
      </div>
    </div>
  );
}
