/**
 * ============================================================
 * NAVBAR COMPONENT - RiskShield
 * ============================================================
 */

import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Shield, Sparkles, Sun, Moon, Monitor } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/hooks/useTheme";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { theme, resolvedTheme, toggleTheme } = useTheme();

  const getThemeIcon = () => {
    if (theme === "system") return <Monitor className="w-4 h-4" />;
    if (resolvedTheme === "dark") return <Moon className="w-4 h-4" />;
    return <Sun className="w-4 h-4" />;
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "How It Works", href: "#how-it-works" },
    { label: "Features", href: "#features" },
    { label: "Protection Demo", href: "#protection" },
    { label: "About", href: "/about", isRoute: true },
  ];

  const isHomePage = location.pathname === "/";

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? "glass-card border-b border-border/30 shadow-lg" 
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 lg:h-20">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-success/20 flex items-center justify-center border border-primary/30 group-hover:border-primary/50 transition-all duration-300 group-hover:scale-105">
                <Shield className="w-5 h-5 text-primary" />
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-success animate-pulse" />
            </div>
            <div className="flex flex-col">
              <span className="font-display font-bold text-xl tracking-tight">RiskShield</span>
              <span className="text-[10px] text-muted-foreground uppercase tracking-widest">DeFi Protection</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              link.isRoute ? (
                <Link
                  key={link.label}
                  to={link.href}
                  className="px-4 py-2 text-muted-foreground hover:text-foreground transition-colors text-sm font-medium rounded-lg hover:bg-secondary/50"
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  key={link.label}
                  href={isHomePage ? link.href : `/${link.href}`}
                  className="px-4 py-2 text-muted-foreground hover:text-foreground transition-colors text-sm font-medium rounded-lg hover:bg-secondary/50"
                >
                  {link.label}
                </a>
              )
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="text-muted-foreground hover:text-foreground"
              aria-label="Toggle theme"
            >
              {getThemeIcon()}
            </Button>
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground" asChild>
              <Link to="/signin">Sign In</Link>
            </Button>
            <Button size="sm" className="glow-effect group relative overflow-hidden" asChild>
              <Link to="/signup">
                <span className="relative z-10 flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  Get Early Access
                </span>
              </Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 rounded-lg hover:bg-secondary/50 transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div 
          className={`lg:hidden overflow-hidden transition-all duration-300 ${
            isOpen ? "max-h-96 pb-4" : "max-h-0"
          }`}
        >
          <div className="pt-4 border-t border-border/30 space-y-1">
            {navLinks.map((link) => (
              link.isRoute ? (
                <Link
                  key={link.label}
                  to={link.href}
                  className="block px-4 py-3 text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors text-sm font-medium rounded-lg"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  key={link.label}
                  href={isHomePage ? link.href : `/${link.href}`}
                  className="block px-4 py-3 text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors text-sm font-medium rounded-lg"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </a>
              )
            ))}
            <div className="flex flex-col gap-2 pt-4 mt-4 border-t border-border/30">
              <div className="flex items-center justify-between px-4 py-2">
                <span className="text-sm text-muted-foreground">Theme</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={toggleTheme}
                  className="flex items-center gap-2"
                >
                  {getThemeIcon()}
                  <span className="capitalize">{theme}</span>
                </Button>
              </div>
              <Button variant="outline" size="sm" className="w-full justify-center" asChild>
                <Link to="/signin" onClick={() => setIsOpen(false)}>Sign In</Link>
              </Button>
              <Button size="sm" className="w-full justify-center glow-effect" asChild>
                <Link to="/signup" onClick={() => setIsOpen(false)}>
                  <Sparkles className="w-4 h-4 mr-2" />
                  Get Early Access
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
