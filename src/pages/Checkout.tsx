import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Check } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";

const Checkout = () => {
  const { items, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [step, setStep] = useState<"shipping" | "payment" | "confirm">("shipping");
  const [orderPlaced, setOrderPlaced] = useState(false);

  const [shipping, setShipping] = useState({
    name: "", email: "", address: "", city: "", zip: "", country: "",
  });
  const [payment, setPayment] = useState<"card" | "paypal">("card");

  const shippingCost = totalPrice >= 50 ? 0 : 5.99;
  const total = totalPrice + shippingCost;

  if (items.length === 0 && !orderPlaced) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="font-display text-2xl font-bold text-foreground mb-4">Nothing to checkout</h1>
        <Link to="/products" className="text-accent hover:underline">Go shopping</Link>
      </div>
    );
  }

  if (orderPlaced) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-20 h-20 bg-success rounded-full flex items-center justify-center mx-auto mb-6">
          <Check className="w-10 h-10 text-success-foreground" />
        </motion.div>
        <h1 className="font-display text-3xl font-bold text-foreground mb-2">Order Placed!</h1>
        <p className="text-muted-foreground mb-6">Thank you for your purchase. You'll receive a confirmation email shortly.</p>
        <Link to="/products" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity">
          Continue Shopping
        </Link>
      </div>
    );
  }

  const handlePlaceOrder = () => {
    if (!shipping.name || !shipping.email || !shipping.address || !shipping.city || !shipping.zip) {
      toast.error("Please fill in all shipping details");
      setStep("shipping");
      return;
    }
    clearCart();
    setOrderPlaced(true);
  };

  const steps = [
    { key: "shipping", label: "Shipping" },
    { key: "payment", label: "Payment" },
    { key: "confirm", label: "Confirm" },
  ] as const;

  const inputClass = "w-full px-4 py-2.5 rounded-lg border border-input bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring";

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <Link to="/cart" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to cart
      </Link>
      <h1 className="font-display text-3xl font-bold text-foreground mb-8">Checkout</h1>

      {/* Step Indicator */}
      <div className="flex items-center gap-2 mb-10">
        {steps.map((s, i) => (
          <div key={s.key} className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-colors ${
              step === s.key ? "bg-primary text-primary-foreground" :
              steps.findIndex((x) => x.key === step) > i ? "bg-success text-success-foreground" :
              "bg-secondary text-muted-foreground"
            }`}>
              {steps.findIndex((x) => x.key === step) > i ? <Check className="w-4 h-4" /> : i + 1}
            </div>
            <span className={`text-sm font-medium ${step === s.key ? "text-foreground" : "text-muted-foreground"}`}>{s.label}</span>
            {i < steps.length - 1 && <div className="w-12 h-px bg-border mx-1" />}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
        <div className="md:col-span-3">
          {step === "shipping" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
              <h2 className="font-semibold text-foreground mb-4">Shipping Information</h2>
              <input className={inputClass} placeholder="Full Name" value={shipping.name} onChange={(e) => setShipping({ ...shipping, name: e.target.value })} />
              <input className={inputClass} placeholder="Email" type="email" value={shipping.email} onChange={(e) => setShipping({ ...shipping, email: e.target.value })} />
              <input className={inputClass} placeholder="Address" value={shipping.address} onChange={(e) => setShipping({ ...shipping, address: e.target.value })} />
              <div className="grid grid-cols-2 gap-4">
                <input className={inputClass} placeholder="City" value={shipping.city} onChange={(e) => setShipping({ ...shipping, city: e.target.value })} />
                <input className={inputClass} placeholder="ZIP Code" value={shipping.zip} onChange={(e) => setShipping({ ...shipping, zip: e.target.value })} />
              </div>
              <input className={inputClass} placeholder="Country" value={shipping.country} onChange={(e) => setShipping({ ...shipping, country: e.target.value })} />
              <button onClick={() => setStep("payment")} className="w-full bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity mt-4">
                Continue to Payment
              </button>
            </motion.div>
          )}

          {step === "payment" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
              <h2 className="font-semibold text-foreground mb-4">Payment Method</h2>
              {(["card", "paypal"] as const).map((m) => (
                <button
                  key={m}
                  onClick={() => setPayment(m)}
                  className={`w-full text-left p-4 rounded-lg border transition-colors ${payment === m ? "border-accent bg-accent/5" : "border-border bg-card hover:bg-secondary"}`}
                >
                  <span className="font-semibold text-sm text-foreground">{m === "card" ? "💳 Credit / Debit Card" : "🅿️ PayPal"}</span>
                  <p className="text-xs text-muted-foreground mt-1">{m === "card" ? "Visa, Mastercard, Amex" : "Pay with your PayPal account"}</p>
                </button>
              ))}
              <div className="flex gap-3 mt-4">
                <button onClick={() => setStep("shipping")} className="flex-1 border border-border text-foreground px-6 py-3 rounded-lg font-semibold hover:bg-secondary transition-colors">
                  Back
                </button>
                <button onClick={() => setStep("confirm")} className="flex-1 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity">
                  Review Order
                </button>
              </div>
            </motion.div>
          )}

          {step === "confirm" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <h2 className="font-semibold text-foreground mb-4">Review & Confirm</h2>
              <div className="bg-secondary/50 rounded-lg p-4">
                <h4 className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Shipping to</h4>
                <p className="text-sm text-foreground font-medium">{shipping.name}</p>
                <p className="text-sm text-muted-foreground">{shipping.address}, {shipping.city} {shipping.zip}</p>
              </div>
              <div className="bg-secondary/50 rounded-lg p-4">
                <h4 className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Payment</h4>
                <p className="text-sm text-foreground font-medium">{payment === "card" ? "Credit / Debit Card" : "PayPal"}</p>
              </div>
              <div className="space-y-3">
                {items.map((item) => (
                  <div key={item.product.id} className="flex items-center gap-3 text-sm">
                    <img src={item.product.image} alt={item.product.name} className="w-10 h-10 rounded object-cover" />
                    <span className="flex-1 text-foreground">{item.product.name} × {item.quantity}</span>
                    <span className="font-medium text-foreground">${(item.product.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="flex gap-3">
                <button onClick={() => setStep("payment")} className="flex-1 border border-border text-foreground px-6 py-3 rounded-lg font-semibold hover:bg-secondary transition-colors">
                  Back
                </button>
                <button onClick={handlePlaceOrder} className="flex-1 bg-accent text-accent-foreground px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity">
                  Place Order — ${total.toFixed(2)}
                </button>
              </div>
            </motion.div>
          )}
        </div>

        {/* Order Summary Sidebar */}
        <div className="md:col-span-2">
          <div className="bg-card rounded-xl border border-border p-5 sticky top-24">
            <h3 className="font-semibold text-foreground text-sm mb-4">Order Summary</h3>
            <div className="space-y-2 mb-4">
              {items.map((item) => (
                <div key={item.product.id} className="flex justify-between text-sm">
                  <span className="text-muted-foreground truncate pr-2">{item.product.name} × {item.quantity}</span>
                  <span className="text-foreground shrink-0">${(item.product.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-border pt-3 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="text-foreground">${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Shipping</span>
                <span className="text-foreground">{shippingCost === 0 ? "Free" : `$${shippingCost.toFixed(2)}`}</span>
              </div>
              <div className="border-t border-border pt-2 flex justify-between">
                <span className="font-semibold text-foreground">Total</span>
                <span className="font-bold text-foreground">${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
