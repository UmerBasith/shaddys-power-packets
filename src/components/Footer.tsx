const Footer = () => (
  <footer className="border-t border-border py-10 px-4 text-center">
    <p className="text-2xl font-heading font-bold text-gradient-gold">SHADDY'S SECRET</p>
    <p className="text-muted-foreground text-sm mt-2 font-body">
      © {new Date().getFullYear()} Shaddy's Secret. All rights reserved.
    </p>
  </footer>
);

export default Footer;
