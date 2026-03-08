import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import HeroBanner from "@/components/HeroBanner";
import CategoryGrid from "@/components/CategoryGrid";
import { Link } from "react-router-dom";
import { ArrowRight, Truck, ShieldCheck, RotateCcw } from "lucide-react";

const Index = () => {
  const featured = products.filter((p) => p.badge);
  const onSale = products.filter((p) => p.originalPrice);

  return (
    <div>
      <HeroBanner />

      {/* Trust Badges */}
      <div className="container mx-auto px-4 -mt-6 relative z-10">
        <div className="bg-card rounded-xl border border-border shadow-[var(--shadow-elevated)] p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: Truck, label: "Free Shipping", desc: "On orders over $50" },
            { icon: ShieldCheck, label: "Secure Payment", desc: "100% protected" },
            { icon: RotateCcw, label: "Easy Returns", desc: "30-day policy" },
          ].map(({ icon: Icon, label, desc }) => (
            <div key={label} className="flex items-center gap-3">
              <div className="p-2.5 bg-accent/10 rounded-lg">
                <Icon className="w-5 h-5 text-accent" />
              </div>
              <div>
                <p className="font-semibold text-sm text-foreground">{label}</p>
                <p className="text-xs text-muted-foreground">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <CategoryGrid />

      {/* Featured Products */}
      <section className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">Featured Products</h2>
          <Link to="/products" className="nav-link flex items-center gap-1">
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {featured.slice(0, 4).map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </section>

      {/* Sale Banner */}
      <section className="container mx-auto px-4 py-8">
        <div className="bg-primary rounded-2xl p-8 md:p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent/20 rounded-full blur-3xl" />
          <div className="relative">
            <p className="text-accent font-semibold text-sm uppercase tracking-widest mb-2">Limited Time Offer</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
              Up to 40% Off
            </h2>
            <p className="text-primary-foreground/70 mb-6 max-w-md">
              Don't miss out on our biggest sale of the season. Premium products at unbeatable prices.
            </p>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
            >
              Shop Sale <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* On Sale */}
      <section className="container mx-auto px-4 py-8">
        <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-8">On Sale</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {onSale.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Index;
