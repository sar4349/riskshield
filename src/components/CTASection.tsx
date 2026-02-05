/**
 * ============================================================
 * CTA SECTION - RiskShield
 * ============================================================
 * Final call-to-action for waitlist signup
 * ============================================================
 */

import { useState } from "react";
import { Link } from "react-router-dom";
import { Play, Sparkles, ArrowRight, Clock, Shield, Zap, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import VideoModal from "./VideoModal";

const DEMO_VIDEO_URL = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";

const CTASection = () => {
  const [videoOpen, setVideoOpen] = useState(false);

  return (
    <section className="py-24 relative overflow-hidden">
      
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-success/5 to-primary/5" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2" />
      <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-success/10 rounded-full blur-3xl -translate-y-1/2" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="glass-card p-8 sm:p-12 lg:p-16 text-center glow-effect relative overflow-hidden">
            
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-primary/10 to-transparent rounded-bl-full" />
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-tr from-success/10 to-transparent rounded-tr-full" />
            
            {/* Content */}
            <div className="relative z-10">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-warning/10 border border-warning/20 mb-8">
                <Clock className="w-4 h-4 text-warning" />
                <span className="text-sm font-medium text-warning">Early Access MVP</span>
              </div>
              
              {/* Headline */}
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-5">
                Be First to{" "}
                <span className="gradient-text">Protect Your Portfolio</span>
              </h2>
              
              {/* Description */}
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
                RiskShield is currently in beta. Join our waitlist to get early access 
                and help shape the future of DeFi risk management.
              </p>
              
              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
                <Button 
                  size="lg" 
                  className="glow-effect group h-14 px-8 text-base"
                  asChild
                >
                  <Link to="/signup">
                    <Sparkles className="w-5 h-5 mr-2" />
                    Get Early Access
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  className="group h-14 px-8 text-base bg-background/50 hover:bg-background/80"
                  onClick={() => setVideoOpen(true)}
                >
                  <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                  Watch Demo
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t border-border/30">
                <div className="flex items-center justify-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Users className="w-5 h-5 text-primary" />
                  </div>
                  <div className="text-left">
                    <p className="font-display font-bold text-xl">500+</p>
                    <p className="text-xs text-muted-foreground">Waitlist Signups</p>
                  </div>
                </div>
                <div className="flex items-center justify-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-success/10 flex items-center justify-center">
                    <Shield className="w-5 h-5 text-success" />
                  </div>
                  <div className="text-left">
                    <p className="font-display font-bold text-xl">On-Chain</p>
                    <p className="text-xs text-muted-foreground">Trustless Design</p>
                  </div>
                </div>
                <div className="flex items-center justify-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                    <Zap className="w-5 h-5 text-accent" />
                  </div>
                  <div className="text-left">
                    <p className="font-display font-bold text-xl">Instant</p>
                    <p className="text-xs text-muted-foreground">Execution Speed</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      <VideoModal 
        open={videoOpen} 
        onOpenChange={setVideoOpen} 
        videoUrl={DEMO_VIDEO_URL}
        title="RiskShield Demo"
      />
    </section>
  );
};

export default CTASection;
