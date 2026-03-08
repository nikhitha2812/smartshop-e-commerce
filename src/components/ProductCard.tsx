import { Link } from "react-router-dom";
import { Heart, Star, ShoppingCart } from "lucide-react";
import { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { motion } from "framer-motion";

interface ProductCardProps {
  product: Product;
  index?: number;
}

const ProductCard = ({ product, index = 0 }: ProductCardProps) => {
  const { addToCart, wishlist, toggleWishlist } = useCart();
  const isWished = wishlist.includes(product.id);
  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="group bg-card rounded-xl overflow-hidden border border-border product-card-hover"
    >
      <div className="relative overflow-hidden aspect-square">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/5 transition-colors" />
        {product.badge && (
          <span className="absolute top-3 left-3 badge-sale">{product.badge}</span>
        )}
        {discount > 0 && (
          <span className="absolute top-3 right-3 bg-destructive text-destructive-foreground text-xs font-semibold px-2 py-0.5 rounded-full">
            -{discount}%
          </span>
        )}
        <div className="absolute bottom-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={(e) => { e.preventDefault(); toggleWishlist(product.id); }}
            className="p-2 bg-card/90 backdrop-blur rounded-full hover:bg-card transition-colors"
          >
            <Heart className={`w-4 h-4 ${isWished ? "fill-destructive text-destructive" : "text-foreground"}`} />
          </button>
          <button
            onClick={(e) => { e.preventDefault(); addToCart(product); }}
            className="p-2 bg-card/90 backdrop-blur rounded-full hover:bg-card transition-colors"
          >
            <ShoppingCart className="w-4 h-4 text-foreground" />
          </button>
        </div>
      </div>
      <Link to={`/product/${product.id}`} className="block p-4">
        <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">{product.category}</p>
        <h3 className="font-semibold text-sm text-foreground line-clamp-2 mb-2 group-hover:text-accent transition-colors">
          {product.name}
        </h3>
        <div className="flex items-center gap-1 mb-2">
          <Star className="w-3.5 h-3.5 fill-accent text-accent" />
          <span className="text-xs font-medium text-foreground">{product.rating}</span>
          <span className="text-xs text-muted-foreground">({product.reviewCount.toLocaleString()})</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-bold text-foreground">${product.price.toFixed(2)}</span>
          {product.originalPrice && (
            <span className="text-sm text-muted-foreground line-through">${product.originalPrice.toFixed(2)}</span>
          )}
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;
