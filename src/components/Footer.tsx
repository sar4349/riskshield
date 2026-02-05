/**
 * ============================================================
 * FOOTER COMPONENT - RiskShield
 * ============================================================
 */

import { Link } from "react-router-dom";
import { Shield, Twitter, Github, Mail, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const footerLinks = {
  Product: [
    { label: "How It Works", href: "#how-it-works" },
    { label: "Features", href: "#features" },
    { label: "Protection Demo", href: "#protection" },
    { label: "Docs", href: "#", comingSoon: true },
  ],
  Company: [
    { label: "About", href: "/about", isRoute: true },
    { label: "Blog", href: "#", comingSoon: true },
    { label: "Careers", href: "#", comingSoon: true },
    { label: "Contact", href: "/about", isRoute: true },
  ],
  Resources: [
    { label: "Documentation", href: "#", comingSoon: true },
    { label: "API", href: "#", comingSoon: true },
    { label: "Status", href: "#", comingSoon: true },
    { label: "Security", href: "#", comingSoon: true },
  ],
  Legal: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
    { label: "Risk Disclosure", href: "#" },
  ],
};

const Footer = () => {
  return (
    <footer className="border-t border-border/50 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary/3 to-transparent" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Newsletter Section */}
        <div className="py-12 border-b border-border/30">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="font-display text-2xl font-bold mb-3">Stay Protected</h3>
            <p className="text-muted-foreground mb-6">
              Get notified about RiskShield updates, DeFi security tips, and early access opportunities.
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Input 
                type="email" 
                placeholder="Enter your email" 
                className="h-12 bg-background/50 border-border/50"
              />
              <Button className="h-12 px-6 glow-effect">
                Subscribe
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </form>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-2 md:grid-cols-6 gap-8 lg:gap-12">
            
            {/* Brand Column */}
            <div className="col-span-2">
              <Link to="/" className="flex items-center gap-3 mb-5 group">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-success/20 flex items-center justify-center border border-primary/30">
                  <Shield className="w-5 h-5 text-primary" />
                </div>
                <span className="font-display font-bold text-xl">RiskShield</span>
              </Link>
              
              <p className="text-sm text-muted-foreground mb-6 max-w-xs">
                Automated on-chain protection for your crypto portfolio. 
                Set your risk threshold and let RiskShield guard your assets 24/7.
              </p>

              {/* MVP Notice */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-warning/10 border border-warning/20 mb-6">
                <span className="text-xs font-medium text-warning">🚀 Early Access MVP</span>
              </div>
              
              {/* Social Links */}
              <div className="flex items-center gap-2">
                <a 
                  href="#" 
                  className="w-10 h-10 rounded-xl bg-secondary/50 flex items-center justify-center hover:bg-secondary transition-colors group"
                  aria-label="Twitter"
                >
                  <Twitter className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                </a>
                <a 
                  href="#" 
                  className="w-10 h-10 rounded-xl bg-secondary/50 flex items-center justify-center hover:bg-secondary transition-colors group"
                  aria-label="GitHub"
                >
                  <Github className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                </a>
                <a 
                  href="mailto:hello@riskshield.io" 
                  className="w-10 h-10 rounded-xl bg-secondary/50 flex items-center justify-center hover:bg-secondary transition-colors group"
                  aria-label="Email"
                >
                  <Mail className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                </a>
              </div>
            </div>

            {/* Link Columns */}
            {Object.entries(footerLinks).map(([title, links]) => (
              <div key={title}>
                <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-muted-foreground">{title}</h4>
                <ul className="space-y-3">
                  {links.map((link) => (
                    <li key={link.label}>
                      {link.isRoute ? (
                        <Link 
                          to={link.href}
                          className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1"
                        >
                          {link.label}
                          {link.comingSoon && (
                            <span className="text-[10px] px-1.5 py-0.5 rounded bg-primary/10 text-primary font-medium">Soon</span>
                          )}
                        </Link>
                      ) : (
                        <a 
                          href={link.href}
                          className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1"
                        >
                          {link.label}
                          {link.comingSoon && (
                            <span className="text-[10px] px-1.5 py-0.5 rounded bg-primary/10 text-primary font-medium">Soon</span>
                          )}
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-border/30 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © 2025 RiskShield. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <p className="text-xs text-muted-foreground">
              Cryptocurrency involves risk. Not financial advice.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
