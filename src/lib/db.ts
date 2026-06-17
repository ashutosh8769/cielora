import fs from "fs";
import path from "path";
import { products as initialProducts } from "../data/products";

// Define TypeScript interfaces for our DB models
export interface Product {
  id: string;
  title: string;
  description: string;
  price: string;
  priceValue: number;
  label?: string;
  labelColor?: string;
  bottomLabel?: string;
  colors: ("silver" | "gold")[];
  images: {
    silver?: { img1: string; img2: string; galleryImages?: string[] };
    gold?: { img1: string; img2: string; galleryImages?: string[] };
  };
  galleryImages?: string[];
  collectionName?: string;
  category?: string;
  sizes: string[]; // customizable sizes
  specs: {         // accordion specs
    itemCode: string;
    gender: string;
    plating: string;
    material: string;
    color: string;
    minLength: string;
    [key: string]: string;
  };
  inventory: number; // For low stock alerts
}

export interface Store {
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

export interface Banner {
  id: string;
  name: string; // Identifier e.g. "topHero", "arcadia", "midBanner", "flutter", "luminis"
  image: string;
  title: string;
  subtitle?: string;
  link: string;
  linkLabel: string;
  visible: boolean;
}

export interface Label {
  id: string;
  name: string;
  color: string;
}

export interface OrderItem {
  id: string;
  title: string;
  price: string;
  priceValue: number;
  quantity: number;
  color: string;
  image: string;
}

export interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: string;
  items: OrderItem[];
  subtotal: number;
  tax: number;
  total: number;
  status: "Pending" | "Processing" | "Shipped" | "Delivered" | "Cancelled";
  courier: string;
  trackingCode: string;
  date: string;
}

export interface NavbarTab {
  name: string;
  href: string;
}

export interface GlobalSettings {
  klarnaEnabled: boolean;
  paypalEnabled: boolean;
  installmentsCount: number;
  legalDisclaimer: string;
  shippingReturns: {
    freeReturnsDays: number;
    freeDeliveryText: string;
    helpLink: string;
    handcraftedText: string;
  };
}

export interface DbSchema {
  products: Product[];
  stores: Store[];
  banners: Banner[];
  labels: Label[];
  orders: Order[];
  navbarTabs: NavbarTab[];
  settings: GlobalSettings;
}

const DB_PATH = path.join(process.cwd(), "src", "data", "db.json");

// Default initial state
function getInitialDbState(): DbSchema {
  const formattedProducts: Product[] = initialProducts.map((p, index) => {
    // Add default sizes
    const sizes = p.category === "Rings" ? ["5", "6", "7", "8", "9"] : ["S", "M", "L"];
    
    // Add default specs
    const plating = p.description.includes("18K gold-plated") ? "18K Gold Plated" : "Sterling Silver";
    const specs = {
      itemCode: `LLA${String(1000 + Number(p.id)).padStart(4, "0")}`,
      gender: p.description.includes("men's") ? "Male" : "Female",
      plating: plating,
      material: p.description.includes("Leather") ? "Leather & Metal" : "Metal",
      color: p.colors.join(" / "),
      minLength: "4 cm",
    };

    return {
      id: String(p.id),
      title: p.title,
      description: p.description,
      price: p.price,
      priceValue: p.priceValue,
      label: p.label,
      labelColor: p.labelColor,
      bottomLabel: p.bottomLabel,
      colors: p.colors,
      images: p.images as any,
      galleryImages: p.galleryImages,
      collectionName: p.collectionName || (index < 8 ? "Arcadia" : index < 16 ? "Silver Collection" : "Classic"),
      category: p.category || "Jewelry",
      sizes,
      specs,
      inventory: 10 + (index % 5), // default stock
    };
  });

  const stores: Store[] = [
    {
      id: "1",
      name: "Cielora Flagship Store",
      address: "123 Fashion Avenue",
      city: "Amsterdam",
      postcode: "1012 AB",
      country: "The Netherlands",
      phone: "+31 20 123 4567",
      email: "store@cielora.com",
      googleMapsUrl: "https://maps.google.com/maps?q=52.37307,4.89264+(Cielora+Flagship+Store)&t=&z=16&ie=UTF8&iwloc=B&output=embed"
    },
    {
      id: "2",
      name: "Cielora London Boutique",
      address: "45 Regent St",
      city: "London",
      postcode: "W1B 4DY",
      country: "United Kingdom",
      phone: "+44 20 7946 0958",
      email: "london@cielora.com",
      googleMapsUrl: "https://maps.google.com/maps?q=51.509865,-0.134882+(Cielora+London+Boutique)&t=&z=16&ie=UTF8&iwloc=B&output=embed"
    }
  ];

  const banners: Banner[] = [
    {
      id: "topHero",
      name: "Top Hero Section",
      image: "/images/Banner_GWP_LlaveroDAD_desktop.webp",
      title: "For dad",
      subtitle: "",
      link: "/for-him",
      linkLabel: "VIEW MEN'S JEWELRY >",
      visible: true
    },
    {
      id: "arcadia",
      name: "Arcadia Section",
      image: "/images/HEADER_NEW-IN_ARCADIA_desktop.jpg",
      title: "New in",
      subtitle: "",
      link: "/collections?filter=Arcadia",
      linkLabel: "Discover",
      visible: true
    },
    {
      id: "midBanner",
      name: "Sticky Icons Section",
      image: "/images/banner 3.jpg",
      title: "Icons that always come back",
      subtitle: "",
      link: "/shop-by?filter=UNOde50+Icons",
      linkLabel: "DISCOVER",
      visible: true
    },
    {
      id: "flutter",
      name: "Flutter Section",
      image: "/images/banner 4.jpg",
      title: "Discover Flutter",
      subtitle: "",
      link: "/collections?filter=Flutter",
      linkLabel: "DISCOVER FLUTTER >",
      visible: true
    },
    {
      id: "luminis",
      name: "Luminis Edition Section",
      image: "/images/banner 5.webp",
      title: "Luminis Edition",
      subtitle: "",
      link: "/collections?filter=Luminis+Edition",
      linkLabel: "DISCOVER THE COLLECTION >",
      visible: true
    }
  ];

  const labels: Label[] = [
    { id: "1", name: "New in", color: "#cde6ec" },
    { id: "2", name: "Best seller", color: "#e1bbff" },
    { id: "3", name: "Free Keyring", color: "#7ce5bf" },
    { id: "4", name: "Free Shipping", color: "#ffb3c7" }
  ];

  const navbarTabs: NavbarTab[] = [
    { name: "Limited Edition", href: "/limited-edition" },
    { name: "Shop by", href: "/shop-by" },
    { name: "Collections", href: "/collections" },
    { name: "Bracelets", href: "/bracelets" },
    { name: "Earrings", href: "/earrings" },
    { name: "Necklaces", href: "/necklaces" },
    { name: "Rings", href: "/rings" },
    { name: "Charms", href: "/charms" },
    { name: "For him", href: "/for-him" },
    { name: "Outlet", href: "/outlet" }
  ];

  const orders: Order[] = [
    {
      id: "ORD-2026-9871",
      customerName: "John Doe",
      customerEmail: "john.doe@example.com",
      customerPhone: "+44 7911 123456",
      shippingAddress: "45 Regent St, London, W1B 4DY, UK",
      items: [
        { id: "1", title: "Silver Earring", price: "£ 165.00", priceValue: 165, quantity: 1, color: "silver", image: "/images/product 1.2.PNG" }
      ],
      subtotal: 165.00,
      tax: 28.63,
      total: 193.63,
      status: "Delivered",
      courier: "Royal Mail",
      trackingCode: "GB123456789RM",
      date: "2026-06-15T10:30:00.000Z"
    },
    {
      id: "ORD-2026-9872",
      customerName: "Emma Watson",
      customerEmail: "emma.w@example.com",
      customerPhone: "+31 6 1234 5678",
      shippingAddress: "Keizersgracht 456, 1016 GD Amsterdam, NL",
      items: [
        { id: "2", title: "Silver Fish shape earings", price: "£ 115.00", priceValue: 115, quantity: 2, color: "silver", image: "/images/product 7.PNG" }
      ],
      subtotal: 230.00,
      tax: 39.91,
      total: 269.91,
      status: "Processing",
      courier: "",
      trackingCode: "",
      date: "2026-06-16T15:45:00.000Z"
    }
  ];

  const settings: GlobalSettings = {
    klarnaEnabled: true,
    paypalEnabled: true,
    installmentsCount: 3,
    legalDisclaimer: "18+, T&C apply, Credit subject to status.",
    shippingReturns: {
      freeReturnsDays: 30,
      freeDeliveryText: "Free standard delivery",
      helpLink: "#",
      handcraftedText: "Our jewelry is made in Spain and 100% handcrafted."
    }
  };

  return {
    products: formattedProducts,
    stores,
    banners,
    labels,
    orders,
    navbarTabs,
    settings
  };
}

// Read and write operations
export function getDb(): DbSchema {
  // Check if directory exists
  const dir = path.dirname(DB_PATH);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  // Check if file exists, if not initialize it
  if (!fs.existsSync(DB_PATH)) {
    const initialState = getInitialDbState();
    fs.writeFileSync(DB_PATH, JSON.stringify(initialState, null, 2), "utf8");
    return initialState;
  }

  try {
    const data = fs.readFileSync(DB_PATH, "utf8");
    return JSON.parse(data) as DbSchema;
  } catch (error) {
    console.error("Error reading database file, resetting to initial state", error);
    const initialState = getInitialDbState();
    fs.writeFileSync(DB_PATH, JSON.stringify(initialState, null, 2), "utf8");
    return initialState;
  }
}

export function saveDb(data: DbSchema): void {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), "utf8");
}
