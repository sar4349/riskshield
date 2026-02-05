/**
 * ============================================================
 * HOW IT WORKS SECTION - RiskShield
 * ============================================================
 * Explains the simple 3-step process of using RiskShield
 * ============================================================
 */

import { Wallet, Sliders, Shield, ArrowRight, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const steps = [
  {
    number: "01",
    icon: Wallet,
    title: "Deposit Your Tokens",
    description: "Connect your wallet and deposit the crypto assets you want to protect. Supports major tokens like ETH, BTC, and popular DeFi assets.",
    highlights: ["Non-custodial", "Your keys, your crypto", "Multiple tokens supported"],
    color: "primary"
  },
  {
    number: "02",
    icon: Sliders,
    title: "Set Your Risk Threshold",
    description: "Choose your protection level—for example, a 20% drawdown trigger. When the market drops beyond this point, RiskShield activates automatically.",
    highlights: ["Customizable limits", "Flexible thresholds", "Set once, forget"],
    color: "accent"
  },
  {
    number: "03",
    icon: Shield,
    title: "Automatic Protection",
    description: "When your threshold is hit, RiskShield instantly converts your assets to stablecoins like USDC, protecting you from further losses.",
    highlights: ["Instant execution", "Exit to stablecoins", "Minimize losses"],
    color: "success"
  }
];

const colorClasses = {
  primary: {
    bg: "bg-primary/10",
    bgHover: "group-hover:bg-primary/20",
    text: "text-primary",
    border: "border-primary/30",
    number: "text-primary/20"
  },
  accent: {
    bg: "bg-accent/10",
    bgHover: "group-hover:bg-accent/20",
    text: "text-accent",
    border: "border-accent/30",
    number: "text-accent/20"
  },
  success: {
    bg: "bg-success/10",
    bgHover: "group-hover:bg-success/20",
    text: "text-success",
    border: "border-success/30",
    number: "text-success/20"
  }
};

const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="py-24 relative overflow-hidden">
      
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/3 to-transparent" />
      
      <div className="container mx-auto px-4 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Shield className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Simple 3-Step Process</span>
          </div>
          
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-5">
            How <span className="gradient-text">RiskShield</span> Works
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Set up your protection in minutes. No coding required, no constant monitoring needed. 
            Just deposit, configure, and let RiskShield guard your assets.
          </p>
        </div>

        {/* Steps */}
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {steps.map((step, index) => {
              const colors = colorClasses[step.color as keyof typeof colorClasses];
              
              return (
                <div 
                  key={step.number}
                  className={`glass-card p-8 relative group hover:translate-y-[-4px] transition-all duration-300 hover:border-${step.color}/30`}
                >
                  {/* Step Number */}
                  <div className={`absolute top-4 right-4 text-6xl font-display font-bold ${colors.number}`}>
                    {step.number}
                  </div>
                  
                  {/* Icon */}
                  <div className={`w-14 h-14 rounded-2xl ${colors.bg} ${colors.bgHover} flex items-center justify-center mb-6 transition-all duration-300`}>
                    <step.icon className={`w-7 h-7 ${colors.text}`} />
                  </div>
                  
                  {/* Content */}
                  <h3 className="font-display font-semibold text-xl mb-3">{step.title}</h3>
                  <p className="text-muted-foreground leading-relaxed mb-5">{step.description}</p>
                  
                  {/* Highlights */}
                  <div className="space-y-2">
                    {step.highlights.map((highlight) => (
                      <div 
                        key={highlight} 
                        className="flex items-center gap-2 text-sm text-muted-foreground"
                      >
                        <CheckCircle2 className={`w-4 h-4 ${colors.text}`} />
                        {highlight}
                      </div>
                    ))}
                  </div>
                  
                  {/* Arrow connector (not on last item) */}
                  {index < steps.length - 1 && (
                    <div className="hidden lg:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10">
                      <div className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center">
                        <ArrowRight className="w-4 h-4 text-muted-foreground" />
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <Button size="lg" className="glow-effect" asChild>
            <Link to="/signup">
              Start Protecting Your Portfolio
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
