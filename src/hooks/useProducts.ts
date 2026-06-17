"use client";

import { useState, useEffect } from "react";
import { Product } from "@/lib/db";

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/db")
      .then((res) => res.json())
      .then((data) => {
        if (data.products) {
          setProducts(data.products);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading products via useProducts hook:", err);
        setLoading(false);
      });
  }, []);

  return { products, loading };
}
