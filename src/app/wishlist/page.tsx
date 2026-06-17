"use client";

import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function WishlistPage() {
  const { wishlistItems, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const [addedItem, setAddedItem] = useState<string | number | null>(null);

  const handleAddToCart = (item: any) => {
    addToCart({
      id: item.id,
      title: item.title,
      price: item.price,
      color: item.color || "Default",
      image: item.image,
      quantity: 1,
    });
    setAddedItem(item.id);
    setTimeout(() => setAddedItem(null), 2000);
  };

  return (
    <div className="w-full px-[48px] pb-12 min-h-screen font-sans">
      <h1 className="pt-8 text-[16px] font-semibold text-gray-900 mb-8">
        My Wishlist <span className="font-normal text-gray-400 text-[12px]">({wishlistItems.length} items)</span>
      </h1>

      {wishlistItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 bg-[#f9f9f9] border border-gray-100">
          <p className="text-gray-500 text-[15px] mb-6">Your wishlist is currently empty.</p>
          <Link href="/shop-by" className="bg-black text-white px-8 py-3 text-[13px] uppercase tracking-wide font-medium hover:bg-gray-800 transition-colors">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {wishlistItems.map((item, idx) => (
            <div key={`${item.id}-${idx}`} className="flex flex-col gap-4 group">
              {/* Image Box */}
              <div className="w-full aspect-square relative bg-[#f9f9f9] flex items-center justify-center p-8 group-hover:bg-[#f4f4f4] transition-colors overflow-hidden">
                <Link href={`/products/${item.id}`} className="absolute inset-0 z-0 cursor-pointer">
                  <Image src={item.image} alt={item.title} fill className="object-contain p-8 transition-transform duration-500 group-hover:scale-[1.1]" />
                </Link>
                <button 
                  onClick={() => removeFromWishlist(item.id)}
                  className="absolute top-4 right-4 text-gray-400 hover:text-black transition-colors p-2 z-10 bg-white/50 rounded-full hover:bg-white"
                  aria-label="Remove from wishlist"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </button>
              </div>

              {/* Info Box */}
              <div className="flex flex-col flex-1 justify-between">
                <div>
                  <Link href={`/products/${item.id}`} className="hover:underline">
                    <h3 className="text-[14px] font-medium text-gray-900 leading-tight mb-2 line-clamp-2">{item.title}</h3>
                  </Link>
                  <div className="flex items-center gap-2 mb-4">
                    {item.originalPrice && (
                      <span className="text-[13px] text-gray-500 line-through">{item.originalPrice}</span>
                    )}
                    <span className={`text-[14px] font-medium ${item.originalPrice ? "text-red-600" : "text-black"}`}>
                      {item.price}
                    </span>
                  </div>
                </div>

                <button 
                  onClick={() => handleAddToCart(item)}
                  className="w-full py-2 border border-black text-[13px] uppercase tracking-wide font-medium hover:bg-black hover:text-white transition-colors"
                >
                  {addedItem === item.id ? "Added to Cart" : "Add to Cart"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
