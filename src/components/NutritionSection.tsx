import { motion } from "framer-motion";
import { Zap, Dumbbell, Droplets, ShieldCheck } from "lucide-react";

const benefits = [
  { icon: Zap, title: "Fast Absorbing", desc: "Rapidly digested whey isolate for quick muscle recovery." },
  { icon: Dumbbell, title: "24g Protein", desc: "High-quality protein to fuel muscle growth every serving." },
  { icon: Droplets, title: "Zero Sugar", desc: "Clean formula with no added sugars or artificial fillers." },
  { icon: ShieldCheck, title: "Lab Tested", desc: "Third-party tested for purity and potency you can trust." },
];

const NutritionSection = () => (
  <section className="py-24 px-4 bg-secondary/50">
    <div className="container max-w-6xl mx-auto text-center">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-4xl md:text-5xl font-heading font-bold text-foreground"
      >
        WHY <span className="text-gradient-gold">SHADDY'S?</span>
      </motion.h2>
      <p className="text-muted-foreground mt-3 font-body font-light max-w-lg mx-auto">
        Every packet is engineered for performance.
      </p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-14">
        {benefits.map((b, i) => (
          <motion.div
            key={b.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="bg-card border border-border rounded-lg p-6 hover:border-glow transition-colors duration-300"
          >
            <b.icon className="mx-auto text-primary" size={32} />
            <h3 className="font-heading text-lg font-semibold mt-4 text-foreground">{b.title}</h3>
            <p className="text-muted-foreground text-sm mt-2 font-body font-light">{b.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default NutritionSection;
