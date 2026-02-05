/**
 * ============================================================
 * HERO SECTION - RiskShield
 * ============================================================
 * Communicates the core value proposition: automated DeFi protection
 * ============================================================
 */

import { useState } from "react";
import { Link } from "react-router-dom";
import { Play, Shield, Zap, ArrowRight, AlertTriangle, TrendingDown, Clock, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import VideoModal from "./VideoModal";

const DEMO_VIDEO_URL = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";

const HeroSection = () => {
  const [videoOpen, setVideoOpen] = useState(false);

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 lg:pt-24 overflow-hidden">
      
      {/* Background Effects */}
      <div className="absolute inset-0 hero-gradient" />
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/8 rounded-full blur-3xl animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-success/8 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '1.5s' }} />
      
      {/* Decorative Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border)/0.1)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/0.1)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,black,transparent)]" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          
          {/* MVP Badge */}
          <div className="flex justify-center mb-8 animate-fade-in">
            <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-gradient-to-r from-primary/10 to-success/10 border border-primary/20 backdrop-blur-sm">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-warning opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-warning" />
                </span>
                <span className="text-sm font-medium text-warning">Beta MVP</span>
              </div>
              <span className="w-px h-4 bg-border/50" />
              <Link to="/signup" className="text-sm font-medium text-primary hover:text-primary/80 transition-colors flex items-center gap-1">
                Get Early Access <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>

          {/* Main Content */}
          <div className="text-center animate-slide-up">
            {/* Main Headline */}
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] mb-6 tracking-tight">
              Protect Your Crypto From{" "}
              <span className="relative">
                <span className="gradient-text">Market Crashes</span>
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 300 12" fill="none">
                  <path d="M2 10C50 4 100 4 150 7C200 10 250 6 298 2" stroke="url(#underline-gradient)" strokeWidth="3" strokeLinecap="round" />
                  <defs>
                    <linearGradient id="underline-gradient" x1="0" y1="0" x2="300" y2="0">
                      <stop stopColor="hsl(var(--primary))" />
                      <stop offset="1" stopColor="hsl(var(--success))" />
                    </linearGradient>
                  </defs>
                </svg>
              </span>
            </h1>

            {/* Subheadline - What RiskShield Does */}
            <p className="text-lg sm:text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto mb-10 leading-relaxed">
              RiskShield automatically converts your crypto to{" "}
              <span className="text-foreground font-medium">stablecoins</span> when markets drop beyond your risk threshold—
              protecting your portfolio <span className="text-foreground font-medium">24/7</span> without constant monitoring.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
              <Button 
                size="lg" 
                className="glow-effect group h-14 px-8 text-base"
                asChild
              >
                <Link to="/signup">
                  <Sparkles className="w-5 h-5 mr-2" />
                  Join the Waitlist
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="group h-14 px-8 text-base bg-background/50 hover:bg-background/80 border-border/50"
                onClick={() => setVideoOpen(true)}
              >
                <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                See How It Works
              </Button>
            </div>

            {/* Problem Statement Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 max-w-4xl mx-auto mb-12">
              <div className="glass-card p-6 group hover:border-destructive/30 transition-all duration-300">
                <div className="flex items-center justify-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-destructive/10 flex items-center justify-center group-hover:bg-destructive/20 transition-colors">
                    <TrendingDown className="w-5 h-5 text-destructive" />
                  </div>
                </div>
                <p className="text-2xl font-display font-bold mb-1">-40%</p>
                <p className="text-sm text-muted-foreground">Avg crash in 24 hours</p>
              </div>
              
              <div className="glass-card p-6 group hover:border-warning/30 transition-all duration-300">
                <div className="flex items-center justify-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-warning/10 flex items-center justify-center group-hover:bg-warning/20 transition-colors">
                    <AlertTriangle className="w-5 h-5 text-warning" />
                  </div>
                </div>
                <p className="text-2xl font-display font-bold mb-1">24/7</p>
                <p className="text-sm text-muted-foreground">Markets never sleep</p>
              </div>
              
              <div className="glass-card p-6 group hover:border-success/30 transition-all duration-300">
                <div className="flex items-center justify-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-success/10 flex items-center justify-center group-hover:bg-success/20 transition-colors">
                    <Shield className="w-5 h-5 text-success" />
                  </div>
                </div>
                <p className="text-2xl font-display font-bold mb-1">Automated</p>
                <p className="text-sm text-muted-foreground">Protection you set once</p>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center justify-center gap-6 text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                <span>On-Chain & Transparent</span>
              </div>
              <span className="w-px h-4 bg-border/50" />
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4" />
                <span>Instant Execution</span>
              </div>
              <span className="w-px h-4 bg-border/50 hidden sm:block" />
              <div className="hidden sm:flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>No Constant Monitoring</span>
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
        title="How RiskShield Works"
      />
    </section>
  );
};

export default HeroSection;
