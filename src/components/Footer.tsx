import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground mt-20">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
                <span className="text-accent-foreground font-bold text-sm">S</span>
              </div>
              <span className="font-display text-xl font-bold">SmartShop</span>
            </div>
            <p className="text-primary-foreground/60 text-sm leading-relaxed">
              Your destination for premium products at unbeatable prices. Quality meets convenience.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider">Shop</h4>
            <div className="flex flex-col gap-2">
              <Link to="/products" className="text-primary-foreground/60 hover:text-primary-foreground text-sm transition-colors">All Products</Link>
              <Link to="/products?category=electronics" className="text-primary-foreground/60 hover:text-primary-foreground text-sm transition-colors">Electronics</Link>
              <Link to="/products?category=fashion" className="text-primary-foreground/60 hover:text-primary-foreground text-sm transition-colors">Fashion</Link>
              <Link to="/products?category=home" className="text-primary-foreground/60 hover:text-primary-foreground text-sm transition-colors">Home & Living</Link>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider">Support</h4>
            <div className="flex flex-col gap-2">
              <span className="text-primary-foreground/60 text-sm">Contact Us</span>
              <span className="text-primary-foreground/60 text-sm">Shipping Info</span>
              <span className="text-primary-foreground/60 text-sm">Returns</span>
              <span className="text-primary-foreground/60 text-sm">FAQ</span>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider">Stay Updated</h4>
            <p className="text-primary-foreground/60 text-sm mb-4">Subscribe for exclusive deals.</p>
            <div className="flex">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 px-3 py-2 rounded-l-lg bg-primary-foreground/10 border border-primary-foreground/20 text-sm text-primary-foreground placeholder:text-primary-foreground/40 focus:outline-none focus:border-accent"
              />
              <button className="px-4 py-2 bg-accent text-accent-foreground rounded-r-lg text-sm font-semibold hover:opacity-90 transition-opacity">
                Join
              </button>
            </div>
          </div>
        </div>
        <div className="border-t border-primary-foreground/10 mt-12 pt-8 text-center text-primary-foreground/40 text-sm">
          © 2026 SmartShop. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
