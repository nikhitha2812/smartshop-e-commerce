import { Link } from "react-router-dom";
import { categories } from "@/data/products";
import { motion } from "framer-motion";

const CategoryGrid = () => {
  return (
    <section className="container mx-auto px-4 py-16">
      <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-8">
        Shop by Category
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {categories.map((cat, i) => (
          <motion.div
            key={cat.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.05 }}
          >
            <Link
              to={`/products?category=${cat.id}`}
              className="flex flex-col items-center gap-3 p-6 bg-card rounded-xl border border-border hover:border-accent/50 hover:shadow-[var(--shadow-elevated)] transition-all group"
            >
              <span className="text-3xl group-hover:scale-110 transition-transform">{cat.icon}</span>
              <span className="font-semibold text-sm text-foreground">{cat.name}</span>
              <span className="text-xs text-muted-foreground">{cat.count} items</span>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default CategoryGrid;
