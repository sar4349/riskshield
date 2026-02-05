/**
 * ============================================================
 * FEATURES SECTION - RiskShield
 * ============================================================
 * Key benefits of using RiskShield for DeFi protection
 * ============================================================
 */

import { Shield, Zap, Eye, Lock, Globe, Clock, ArrowRight, CheckCircle2 } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Automated Execution",
    description: "Set your risk threshold once. When triggered, RiskShield instantly converts to stablecoins—no manual action required.",
    highlights: ["Instant response", "No delays", "Works while you sleep"],
    color: "primary"
  },
  {
    icon: Eye,
    title: "24/7 Market Monitoring",
    description: "Crypto markets never sleep, but you need to. RiskShield watches your positions around the clock.",
    highlights: ["Continuous monitoring", "Real-time tracking", "Never miss a crash"],
    color: "success"
  },
  {
    icon: Lock,
    title: "On-Chain & Transparent",
    description: "All protection logic executes on-chain. No centralized servers, no hidden processes. Fully verifiable.",
    highlights: ["Trustless execution", "Open source", "Audit trail"],
    color: "accent"
  },
  {
    icon: Shield,
    title: "Non-Custodial",
    description: "Your assets stay in your control. RiskShield never holds your funds—only executes when conditions are met.",
    highlights: ["Your keys", "Your crypto", "Self-custody"],
    color: "primary"
  },
  {
    icon: Globe,
    title: "Multi-Token Support",
    description: "Protect ETH, BTC, and popular DeFi tokens. Set different thresholds for different risk profiles.",
    highlights: ["Major tokens", "DeFi assets", "Custom per token"],
    color: "success"
  },
  {
    icon: Clock,
    title: "Simple Setup",
    description: "No complex configurations or technical knowledge needed. Set up protection in under 5 minutes.",
    highlights: ["5-minute setup", "No coding", "Beginner friendly"],
    color: "accent"
  }
];

const colorClasses = {
  primary: {
    bg: "bg-primary/10",
    bgHover: "group-hover:bg-primary/20",
    text: "text-primary",
    border: "group-hover:border-primary/30",
    check: "text-primary"
  },
  success: {
    bg: "bg-success/10",
    bgHover: "group-hover:bg-success/20",
    text: "text-success",
    border: "group-hover:border-success/30",
    check: "text-success"
  },
  accent: {
    bg: "bg-accent/10",
    bgHover: "group-hover:bg-accent/20",
    text: "text-accent",
    border: "group-hover:border-accent/30",
    check: "text-accent"
  }
};

const FeaturesSection = () => {
  return (
    <section id="features" className="py-24 relative overflow-hidden">
      
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-success/3 to-transparent" />
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-x-1/2" />
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-success/5 rounded-full blur-3xl translate-x-1/2" />
      
      <div className="container mx-auto px-4 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-success/10 border border-success/20 mb-6">
            <Shield className="w-4 h-4 text-success" />
            <span className="text-sm font-medium text-success">Why Choose RiskShield</span>
          </div>
          
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-5">
            Built for <span className="gradient-text">DeFi Users</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Whether you're a trader, long-term holder, or DeFi enthusiast—RiskShield gives you 
            peace of mind without the complexity.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {features.map((feature, index) => {
            const colors = colorClasses[feature.color as keyof typeof colorClasses];
            
            return (
              <div 
                key={feature.title}
                className={`glass-card p-7 transition-all duration-300 group hover:translate-y-[-4px] ${colors.border}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Icon */}
                <div className={`w-14 h-14 rounded-2xl ${colors.bg} ${colors.bgHover} flex items-center justify-center mb-5 transition-all duration-300`}>
                  <feature.icon className={`w-7 h-7 ${colors.text}`} />
                </div>
                
                {/* Title */}
                <h3 className="font-display font-semibold text-xl mb-3">{feature.title}</h3>
                
                {/* Description */}
                <p className="text-muted-foreground leading-relaxed mb-5">{feature.description}</p>
                
                {/* Highlights */}
                <div className="flex flex-wrap gap-2">
                  {feature.highlights.map((highlight) => (
                    <div 
                      key={highlight} 
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-secondary/50 text-xs font-medium text-muted-foreground"
                    >
                      <CheckCircle2 className={`w-3 h-3 ${colors.check}`} />
                      {highlight}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <a 
            href="#protection"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium transition-colors group"
          >
            See protection in action
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
