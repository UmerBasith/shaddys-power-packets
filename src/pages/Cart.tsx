import { useCart } from "@/contexts/CartContext";
import { useNavigate } from "react-router-dom";
import { Trash2, ArrowLeft, ShoppingCart } from "lucide-react";
import { motion } from "framer-motion";

const Cart = () => {
  const { items, removeItem, total, itemCount } = useCart();
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4">
        <ShoppingCart size={64} className="text-muted-foreground mb-4" />
        <h2 className="text-2xl font-heading font-bold text-foreground">Your cart is empty</h2>
        <p className="text-muted-foreground mt-2 font-body">Add some protein to get started!</p>
        <button
          onClick={() => navigate("/")}
          className="mt-6 bg-primary text-primary-foreground font-heading uppercase tracking-widest px-8 py-3 rounded-lg hover:bg-gold-glow transition-all"
        >
          Shop Now
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="container max-w-3xl mx-auto">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors font-body mb-8"
        >
          <ArrowLeft size={18} /> Continue Shopping
        </button>

        <h1 className="text-4xl font-heading font-bold text-foreground mb-8">Your Cart</h1>

        <div className="space-y-4">
          {items.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-secondary rounded-lg border border-border p-5 flex items-center justify-between"
            >
              <div>
                <p className="text-lg font-heading font-semibold text-foreground">{item.flavour}</p>
                <p className="text-sm text-muted-foreground font-body">
                  {item.billingLabel} • Qty: {item.qty}
                </p>
              </div>
              <div className="flex items-center gap-6">
                <p className="text-xl font-heading font-bold text-primary">
                  ₹{item.qty * item.unitPrice}
                </p>
                <button
                  onClick={() => removeItem(item.id)}
                  className="text-muted-foreground hover:text-destructive transition-colors"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 bg-secondary rounded-lg border border-border p-6">
          <div className="flex justify-between items-center">
            <p className="text-muted-foreground font-body">
              {itemCount} item{itemCount > 1 ? "s" : ""}
            </p>
            <p className="text-3xl font-heading font-bold text-foreground">₹{total}</p>
          </div>
          <button
            onClick={() => navigate("/checkout")}
            className="mt-4 w-full bg-primary text-primary-foreground font-heading text-lg uppercase tracking-widest py-4 rounded-lg hover:bg-gold-glow transition-all duration-300 glow-gold"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
