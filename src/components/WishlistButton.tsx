"use client";

import { useWishlist } from "@/context/WishlistContext";

interface WishlistButtonProps {
  product: {
    id: string | number;
    title: string;
    price: string;
    image: string;
    color?: string;
  };
  className?: string;
  iconWidth?: number;
  iconHeight?: number;
}

export default function WishlistButton({ product, className = "", iconWidth = 24, iconHeight = 24 }: WishlistButtonProps) {
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const active = isInWishlist(product.id);

  return (
    <button 
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        if (active) {
          removeFromWishlist(product.id);
        } else {
          addToWishlist({
            id: product.id.toString(),
            title: product.title,
            price: product.price,
            color: product.color || "Silver",
            image: product.image
          });
        }
      }}
      className={`transition-all duration-300 active:scale-75 ${className} ${active ? "text-[#ac2505]" : "text-gray-500 hover:text-[#ac2505]"}`}
      aria-label="Add to wishlist"
    >
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width={iconWidth} 
        height={iconHeight} 
        viewBox="0 0 24 24" 
        fill={active ? "#ac2505" : "none"} 
        stroke={active ? "#ac2505" : "currentColor"} 
        strokeWidth="1.2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        className="transition-all duration-300 ease-in-out"
      >
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    </button>
  );
}
