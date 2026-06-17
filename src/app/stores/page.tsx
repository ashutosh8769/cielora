"use client";

import { useState, useEffect } from "react";

interface Store {
  id: string;
  name: string;
  address: string;
  city: string;
  postcode: string;
  country: string;
  phone: string;
  email: string;
  googleMapsUrl: string;
}

export default function StoresPage() {
  const [stores, setStores] = useState<Store[]>([]);
  const [selectedStore, setSelectedStore] = useState<Store | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/db")
      .then((res) => res.json())
      .then((data) => {
        if (data.stores && data.stores.length > 0) {
          setStores(data.stores);
          setSelectedStore(data.stores[0]);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading stores:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-70px)] bg-white text-gray-500 font-medium">
        Loading store locations...
      </div>
    );
  }

  if (stores.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-70px)] bg-white text-gray-500 font-medium">
        No store locations configured.
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row min-h-[calc(100vh-70px)] bg-white">
      {/* Left Panel */}
      <div className="w-full md:w-[380px] lg:w-[450px] p-6 md:p-8 flex-shrink-0 bg-white z-10 shadow-md md:shadow-none overflow-y-auto border-r border-gray-100 flex flex-col gap-6">
        <h1 className="text-[22px] font-medium text-[#c43e27]">Stores</h1>
        
        <div className="flex flex-col gap-5">
          {stores.map((store) => (
            <div
              key={store.id}
              onClick={() => setSelectedStore(store)}
              className={`p-5 cursor-pointer border transition-all rounded-[3px] ${
                selectedStore?.id === store.id
                  ? "border-[#d2977a] bg-[#fffbf7]"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <p className="font-semibold text-[15px] text-gray-900 mb-2">{store.name}</p>
              <div className="text-gray-600 leading-relaxed text-[13px]">
                <p>{store.address}</p>
                <p>{store.postcode} {store.city}</p>
                <p>{store.country}</p>
                {store.phone && <p className="mt-3 font-medium text-gray-800">Phone: {store.phone}</p>}
                {store.email && <p className="font-medium text-gray-800">Email: {store.email}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Map Panel */}
      <div className="flex-1 min-h-[400px] md:min-h-auto relative bg-[#e5e3df]">
        {selectedStore && (
          <iframe 
            src={selectedStore.googleMapsUrl}
            className="absolute inset-0 w-full h-full border-0" 
            allowFullScreen 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title={`${selectedStore.name} Map`}
          ></iframe>
        )}
      </div>
    </div>
  );
}

