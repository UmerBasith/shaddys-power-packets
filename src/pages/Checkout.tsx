import { useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, CreditCard, Smartphone, Building2, Wallet, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

const PAYMENT_METHODS = [
  { id: "gpay", label: "Google Pay", icon: Smartphone, description: "Pay using UPI via GPay" },
  { id: "phonepe", label: "PhonePe", icon: Smartphone, description: "Pay using UPI via PhonePe" },
  { id: "paytm", label: "Paytm", icon: Wallet, description: "Pay using Paytm wallet or UPI" },
  { id: "bank", label: "Bank Transfer", icon: Building2, description: "Direct NEFT / IMPS transfer" },
  { id: "card", label: "Credit / Debit Card", icon: CreditCard, description: "Visa, Mastercard, RuPay" },
  { id: "cod", label: "Cash on Delivery", icon: Wallet, description: "Pay when you receive" },
];

const Checkout = () => {
  const { items, total, itemCount, clearCart } = useCart();
  const navigate = useNavigate();
  const [payment, setPayment] = useState("");
  const [placed, setPlaced] = useState(false);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  if (items.length === 0 && !placed) {
    navigate("/cart");
    return null;
  }

  const handlePlaceOrder = () => {
    if (!name || !address || !phone) {
      toast.error("Please fill in all delivery details");
      return;
    }
    if (!payment) {
      toast.error("Please select a payment method");
      return;
    }
    setPlaced(true);
    clearCart();
  };

  if (placed) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", duration: 0.6 }}
        >
          <CheckCircle2 size={80} className="text-primary mb-6" />
        </motion.div>
        <h2 className="text-3xl font-heading font-bold text-foreground">Order Placed!</h2>
        <p className="text-muted-foreground mt-2 font-body text-center max-w-md">
          Thank you for your order. Your SHADDY'S SECRET protein is on its way!
        </p>
        <button
          onClick={() => navigate("/")}
          className="mt-8 bg-primary text-primary-foreground font-heading uppercase tracking-widest px-8 py-3 rounded-lg hover:bg-gold-glow transition-all"
        >
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="container max-w-4xl mx-auto">
        <button
          onClick={() => navigate("/cart")}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors font-body mb-8"
        >
          <ArrowLeft size={18} /> Back to Cart
        </button>

        <h1 className="text-4xl font-heading font-bold text-foreground mb-8">Checkout</h1>

        <div className="grid md:grid-cols-5 gap-8">
          {/* Left: form */}
          <div className="md:col-span-3 space-y-8">
            {/* Delivery details */}
            <div>
              <h3 className="text-lg font-heading font-semibold text-foreground mb-4">Delivery Details</h3>
              <div className="space-y-4">
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Full Name"
                  className="w-full bg-secondary border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground font-body focus:outline-none focus:border-primary transition-colors"
                />
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Phone Number"
                  className="w-full bg-secondary border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground font-body focus:outline-none focus:border-primary transition-colors"
                />
                <textarea
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Delivery Address"
                  rows={3}
                  className="w-full bg-secondary border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground font-body focus:outline-none focus:border-primary transition-colors resize-none"
                />
              </div>
            </div>

            {/* Payment methods */}
            <div>
              <h3 className="text-lg font-heading font-semibold text-foreground mb-4">Payment Method</h3>
              <div className="grid grid-cols-2 gap-3">
                {PAYMENT_METHODS.map((pm) => {
                  const Icon = pm.icon;
                  return (
                    <button
                      key={pm.id}
                      onClick={() => setPayment(pm.id)}
                      className={`flex items-center gap-3 p-4 rounded-lg border transition-all text-left ${
                        payment === pm.id
                          ? "border-primary bg-secondary"
                          : "border-border bg-background hover:border-muted-foreground"
                      }`}
                    >
                      <Icon
                        size={22}
                        className={payment === pm.id ? "text-primary" : "text-muted-foreground"}
                      />
                      <div>
                        <p className={`text-sm font-heading font-semibold ${payment === pm.id ? "text-foreground" : "text-muted-foreground"}`}>
                          {pm.label}
                        </p>
                        <p className="text-xs text-muted-foreground">{pm.description}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right: order summary */}
          <div className="md:col-span-2">
            <div className="bg-secondary rounded-lg border border-border p-6 sticky top-8">
              <h3 className="text-lg font-heading font-semibold text-foreground mb-4">Order Summary</h3>
              <div className="space-y-3">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm font-body">
                    <span className="text-muted-foreground">
                      {item.flavour} x{item.qty}
                    </span>
                    <span className="text-foreground">₹{item.qty * item.unitPrice}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-border mt-4 pt-4 flex justify-between">
                <span className="text-muted-foreground font-body">Total</span>
                <span className="text-2xl font-heading font-bold text-primary">₹{total}</span>
              </div>

              <button
                onClick={handlePlaceOrder}
                className="mt-6 w-full bg-primary text-primary-foreground font-heading text-lg uppercase tracking-widest py-4 rounded-lg hover:bg-gold-glow transition-all duration-300 glow-gold"
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
