export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  rating: number;
  reviewCount: number;
  description: string;
  features: string[];
  inStock: boolean;
  badge?: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  count: number;
}

export const categories: Category[] = [
  { id: "electronics", name: "Electronics", icon: "📱", count: 42 },
  { id: "fashion", name: "Fashion", icon: "👗", count: 86 },
  { id: "home", name: "Home & Living", icon: "🏠", count: 64 },
  { id: "sports", name: "Sports", icon: "⚽", count: 35 },
  { id: "books", name: "Books", icon: "📚", count: 120 },
  { id: "beauty", name: "Beauty", icon: "✨", count: 53 },
];

export const products: Product[] = [
  {
    id: "1",
    name: "Wireless Noise-Cancelling Headphones",
    price: 249.99,
    originalPrice: 349.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80",
    category: "electronics",
    rating: 4.8,
    reviewCount: 2341,
    description: "Experience premium sound with our flagship wireless headphones. Active noise cancellation, 30-hour battery life, and ultra-comfortable design for all-day listening.",
    features: ["Active Noise Cancellation", "30h Battery Life", "Bluetooth 5.3", "Hi-Res Audio"],
    inStock: true,
    badge: "Best Seller",
  },
  {
    id: "2",
    name: "Minimalist Leather Watch",
    price: 189.00,
    image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=500&q=80",
    category: "fashion",
    rating: 4.6,
    reviewCount: 876,
    description: "Elegant timepiece crafted with genuine Italian leather and Swiss movement. A perfect blend of classic design and modern craftsmanship.",
    features: ["Swiss Movement", "Italian Leather", "Sapphire Crystal", "Water Resistant"],
    inStock: true,
  },
  {
    id: "3",
    name: "Smart Home Speaker",
    price: 129.99,
    originalPrice: 179.99,
    image: "https://images.unsplash.com/photo-1543512214-318c7553f230?w=500&q=80",
    category: "electronics",
    rating: 4.5,
    reviewCount: 1567,
    description: "Fill your room with rich, immersive sound. Built-in voice assistant, multi-room audio support, and sleek fabric design.",
    features: ["Voice Assistant", "Multi-Room Audio", "Wi-Fi & Bluetooth", "360° Sound"],
    inStock: true,
    badge: "Sale",
  },
  {
    id: "4",
    name: "Organic Cotton Hoodie",
    price: 79.00,
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500&q=80",
    category: "fashion",
    rating: 4.7,
    reviewCount: 432,
    description: "Ultra-soft organic cotton hoodie with a relaxed fit. Sustainably made for everyday comfort.",
    features: ["100% Organic Cotton", "Relaxed Fit", "Sustainably Made", "Pre-shrunk"],
    inStock: true,
  },
  {
    id: "5",
    name: "Ceramic Pour-Over Coffee Set",
    price: 54.99,
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500&q=80",
    category: "home",
    rating: 4.9,
    reviewCount: 289,
    description: "Handcrafted ceramic dripper with double-walled glass server. Brew the perfect cup every morning.",
    features: ["Handcrafted Ceramic", "Double-Walled Glass", "Reusable Filter", "Gift Box"],
    inStock: true,
    badge: "New",
  },
  {
    id: "6",
    name: "Yoga Mat Premium",
    price: 68.00,
    originalPrice: 89.00,
    image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500&q=80",
    category: "sports",
    rating: 4.4,
    reviewCount: 654,
    description: "Non-slip natural rubber yoga mat with alignment markings. Extra thick for comfort on any surface.",
    features: ["Natural Rubber", "Alignment Markings", "6mm Thick", "Carrying Strap"],
    inStock: true,
  },
  {
    id: "7",
    name: "Bestselling Novel Collection",
    price: 42.99,
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=500&q=80",
    category: "books",
    rating: 4.8,
    reviewCount: 1203,
    description: "Curated collection of 5 bestselling novels. Beautifully bound editions perfect for your bookshelf.",
    features: ["5 Books", "Hardcover", "Collector's Edition", "Gift Wrapped"],
    inStock: true,
  },
  {
    id: "8",
    name: "Luxury Skincare Set",
    price: 119.00,
    originalPrice: 159.00,
    image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=500&q=80",
    category: "beauty",
    rating: 4.6,
    reviewCount: 987,
    description: "Complete skincare routine with cleanser, serum, moisturizer, and eye cream. Dermatologist tested.",
    features: ["4-Step Routine", "Dermatologist Tested", "Vegan", "Fragrance-Free"],
    inStock: true,
    badge: "Popular",
  },
  {
    id: "9",
    name: "Wireless Mechanical Keyboard",
    price: 159.99,
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&q=80",
    category: "electronics",
    rating: 4.7,
    reviewCount: 1876,
    description: "Premium mechanical keyboard with hot-swappable switches, RGB backlighting, and wireless connectivity.",
    features: ["Hot-Swappable", "RGB Backlight", "Bluetooth + USB-C", "75% Layout"],
    inStock: true,
  },
  {
    id: "10",
    name: "Indoor Plant Collection",
    price: 45.00,
    image: "https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=500&q=80",
    category: "home",
    rating: 4.3,
    reviewCount: 341,
    description: "Set of 3 easy-care indoor plants with decorative pots. Perfect for brightening any space.",
    features: ["3 Plants", "Decorative Pots", "Care Guide", "Low Maintenance"],
    inStock: true,
    badge: "New",
  },
  {
    id: "11",
    name: "Running Shoes Ultra",
    price: 134.99,
    originalPrice: 169.99,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80",
    category: "sports",
    rating: 4.5,
    reviewCount: 2109,
    description: "Lightweight running shoes with responsive cushioning and breathable mesh upper. Built for speed.",
    features: ["Responsive Cushion", "Breathable Mesh", "Carbon Plate", "Lightweight"],
    inStock: true,
    badge: "Best Seller",
  },
  {
    id: "12",
    name: "Artisan Candle Set",
    price: 38.00,
    image: "https://images.unsplash.com/photo-1602028915047-37269d1a73f7?w=500&q=80",
    category: "home",
    rating: 4.8,
    reviewCount: 567,
    description: "Hand-poured soy candles in three signature scents. 40+ hour burn time each.",
    features: ["Soy Wax", "3 Scents", "40h Burn Time", "Reusable Jars"],
    inStock: true,
  },
];
