import { useState } from "react";
import { motion } from "framer-motion";
import { ShoppingCart, Minus, Plus, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import proteinPacket from "@/assets/protein-packet.jpg";
import { toast } from "sonner";
import { useCart } from "@/contexts/CartContext";

const FLAVOURS = [
  { name: "Chocolate", color: "bg-amber-900" },
  { name: "Vanilla", color: "bg-amber-100" },
  { name: "Strawberry", color: "bg-pink-400" },
  { name: "Mango", color: "bg-amber-400" },
  { name: "Coffee Mocha", color: "bg-yellow-900" },
  { name: "Blueberry", color: "bg-indigo-500" },
  { name: "Cookies & Cream", color: "bg-stone-400" },
  { name: "Pista Kulfi", color: "bg-green-400" },
];

const BILLING_OPTIONS = [
  { id: "once", label: "One-time", discount: 0, badge: "" },
  { id: "monthly", label: "Monthly", discount: 10, badge: "Save 10%" },
  { id: "quarterly", label: "Quarterly", discount: 20, badge: "Best Value" },
];

const PRICE = 200;

const ProductSection = () => {
  const [qty, setQty] = useState(1);
  const [flavour, setFlavour] = useState("Chocolate");
  const [billing, setBilling] = useState("once");
  const [justAdded, setJustAdded] = useState(false);
  const { addItem, itemCount } = useCart();
  const navigate = useNavigate();

  const selectedBilling = BILLING_OPTIONS.find((b) => b.id === billing)!;
  const discountedPrice = Math.round(PRICE * (1 - selectedBilling.discount / 100));
  const total = qty * discountedPrice;

  const handleAddToCart = () => {
    addItem({
      id: `${flavour}-${billing}`,
      flavour,
      billing,
      billingLabel: selectedBilling.label,
      qty,
      unitPrice: discountedPrice,
    });
    toast.success(`${qty} ${flavour} packet${qty > 1 ? "s" : ""} added to cart!`, {
      description: `${selectedBilling.label} • Total: ₹${total}`,
    });
    setJustAdded(true);
  };

  return (
    <section id="product" className="py-24 px-4">
      <div className="container max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="bg-secondary rounded-lg p-8 flex items-center justify-center glow-gold">
              <img
                src={proteinPacket}
                alt="SHADDY'S SECRET Whey Protein Packet"
                className="w-full max-w-sm object-contain"
                loading="lazy"
                width={800}
                height={1024}
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <p className="text-primary uppercase tracking-[0.3em] text-sm font-body font-medium">
              Whey Protein Isolate
            </p>
            <h2 className="text-4xl md:text-5xl font-heading font-bold mt-2 text-foreground">
              SHADDY'S SECRET
            </h2>
            <p className="text-muted-foreground mt-4 text-lg font-body font-light leading-relaxed">
              Each packet delivers 24g of premium whey protein — clean, fast-absorbing,
              and designed for serious athletes. No fillers. No compromise.
            </p>

            {/* Flavour selector */}
            <div className="mt-8">
              <p className="text-sm text-muted-foreground uppercase tracking-wider mb-3 font-body">
                Flavour — <span className="text-foreground font-medium">{flavour}</span>
              </p>
              <div className="flex flex-wrap gap-2">
                {FLAVOURS.map((f) => (
                  <button
                    key={f.name}
                    onClick={() => { setFlavour(f.name); setJustAdded(false); }}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg border transition-all text-sm font-body ${
                      flavour === f.name
                        ? "border-primary bg-secondary text-foreground"
                        : "border-border bg-background text-muted-foreground hover:border-muted-foreground"
                    }`}
                  >
                    <span className={`w-3 h-3 rounded-full ${f.color} shrink-0`} />
                    {f.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Billing options */}
            <div className="mt-6">
              <p className="text-sm text-muted-foreground uppercase tracking-wider mb-3 font-body">
                Billing
              </p>
              <div className="grid grid-cols-3 gap-3">
                {BILLING_OPTIONS.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => { setBilling(opt.id); setJustAdded(false); }}
                    className={`relative rounded-lg border p-3 text-center transition-all font-body ${
                      billing === opt.id
                        ? "border-primary bg-secondary"
                        : "border-border bg-background hover:border-muted-foreground"
                    }`}
                  >
                    {opt.badge && (
                      <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-[10px] font-heading font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full whitespace-nowrap">
                        {opt.badge}
                      </span>
                    )}
                    <p className={`text-sm font-medium ${billing === opt.id ? "text-foreground" : "text-muted-foreground"}`}>
                      {opt.label}
                    </p>
                    <p className="text-lg font-heading font-bold text-primary mt-1">
                      ₹{Math.round(PRICE * (1 - opt.discount / 100))}
                    </p>
                    {opt.discount > 0 && (
                      <p className="text-[10px] text-muted-foreground line-through">₹{PRICE}</p>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="mt-6 grid grid-cols-3 gap-4">
              {[
                { label: "Protein", value: "24g" },
                { label: "Per Packet", value: `₹${discountedPrice}` },
                { label: "Sugar", value: "0g" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="bg-secondary rounded-lg p-4 text-center border border-border"
                >
                  <p className="text-2xl font-heading font-bold text-primary">{stat.value}</p>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mt-1">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Qty + Price */}
            <div className="mt-6 flex items-center gap-6">
              <div className="flex items-center bg-secondary rounded-lg border border-border">
                <button
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  className="p-3 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Minus size={18} />
                </button>
                <span className="px-4 text-lg font-heading font-semibold text-foreground">{qty}</span>
                <button
                  onClick={() => setQty(qty + 1)}
                  className="p-3 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Plus size={18} />
                </button>
              </div>
              <span className="text-2xl font-heading font-bold text-foreground">₹{total}</span>
              {selectedBilling.discount > 0 && (
                <span className="text-sm text-muted-foreground line-through">₹{qty * PRICE}</span>
              )}
            </div>

            {/* Add to Cart / View Cart */}
            <div className="mt-6 flex gap-3">
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-primary text-primary-foreground font-heading text-lg uppercase tracking-widest py-4 flex items-center justify-center gap-3 hover:bg-gold-glow transition-all duration-300 rounded-lg"
              >
                <ShoppingCart size={20} />
                Add to Cart
              </button>
              {(justAdded || itemCount > 0) && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  onClick={() => navigate("/cart")}
                  className="bg-secondary border border-primary text-primary font-heading text-lg uppercase tracking-widest px-6 py-4 flex items-center justify-center gap-2 hover:bg-primary hover:text-primary-foreground transition-all duration-300 rounded-lg"
                >
                  <Eye size={20} />
                  View Cart{itemCount > 0 && ` (${itemCount})`}
                </motion.button>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ProductSection;
