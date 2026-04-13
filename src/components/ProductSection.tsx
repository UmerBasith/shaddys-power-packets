import { useState } from "react";
import { motion } from "framer-motion";
import { ShoppingCart, Minus, Plus } from "lucide-react";
import proteinPacket from "@/assets/protein-packet.jpg";
import { toast } from "sonner";

const ProductSection = () => {
  const [qty, setQty] = useState(1);

  const handleAddToCart = () => {
    toast.success(`${qty} packet${qty > 1 ? "s" : ""} added to cart!`, {
      description: `Total: ₹${qty * 200}`,
    });
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

            <div className="mt-8 grid grid-cols-3 gap-4">
              {[
                { label: "Protein", value: "24g" },
                { label: "Per Packet", value: "₹200" },
                { label: "Sugar", value: "0g" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="bg-secondary rounded-lg p-4 text-center border border-border"
                >
                  <p className="text-2xl font-heading font-bold text-primary">
                    {stat.value}
                  </p>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mt-1">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8 flex items-center gap-6">
              <div className="flex items-center bg-secondary rounded-lg border border-border">
                <button
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  className="p-3 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Minus size={18} />
                </button>
                <span className="px-4 text-lg font-heading font-semibold text-foreground">
                  {qty}
                </span>
                <button
                  onClick={() => setQty(qty + 1)}
                  className="p-3 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Plus size={18} />
                </button>
              </div>
              <span className="text-2xl font-heading font-bold text-foreground">
                ₹{qty * 200}
              </span>
            </div>

            <button
              onClick={handleAddToCart}
              className="mt-6 w-full bg-primary text-primary-foreground font-heading text-lg uppercase tracking-widest py-4 flex items-center justify-center gap-3 hover:bg-gold-glow transition-all duration-300 animate-pulse-glow rounded-lg"
            >
              <ShoppingCart size={20} />
              Add to Cart
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ProductSection;
