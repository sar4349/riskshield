/**
 * ============================================================
 * ABOUT PAGE - RiskShield
 * ============================================================
 */

import { useState } from "react";
import { Mail, MapPin, Shield, AlertTriangle, Zap, Users, Target, TrendingDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
  email: z.string().trim().email("Invalid email address").max(255, "Email must be less than 255 characters"),
  message: z.string().trim().min(1, "Message is required").max(1000, "Message must be less than 1000 characters"),
});

const About = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = contactSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: { name?: string; email?: string; message?: string } = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as keyof typeof fieldErrors] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    toast({
      title: "Message sent!",
      description: "Thank you for reaching out. We'll get back to you soon.",
    });
    
    setFormData({ name: "", email: "", message: "" });
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      {/* Hero Section - What is RiskShield */}
      <section className="pt-32 pb-16 relative">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-warning/10 border border-warning/20 mb-6">
                <span className="text-sm font-medium text-warning">🚀 Early Stage MVP</span>
              </div>
              <h1 className="font-display text-4xl sm:text-5xl font-bold mb-6">
                About <span className="gradient-text">RiskShield</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Automated on-chain protection that safeguards your crypto from sudden market crashes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The Problem */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="glass-card p-8 md:p-12 mb-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-full bg-destructive/20 flex items-center justify-center">
                  <AlertTriangle className="w-7 h-7 text-destructive" />
                </div>
                <h2 className="font-display text-2xl font-semibold">The Problem</h2>
              </div>
              
              <div className="space-y-4 text-muted-foreground text-lg leading-relaxed">
                <p>
                  Crypto markets are <span className="text-foreground font-medium">extremely volatile</span>. 
                  Prices can crash 30-50% in a matter of hours. Most users cannot monitor prices 24/7, 
                  and sudden crashes cause devastating losses.
                </p>
                <p>
                  Traditional stop-loss orders are <span className="text-foreground font-medium">unreliable in DeFi</span>—they 
                  require centralized exchanges, constant attention, and often fail during high volatility 
                  when you need them most.
                </p>
              </div>

              <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="flex items-center gap-3 p-4 rounded-xl bg-destructive/5 border border-destructive/20">
                  <TrendingDown className="w-5 h-5 text-destructive" />
                  <div>
                    <p className="font-semibold">-40% Avg Crash</p>
                    <p className="text-xs text-muted-foreground">In major downturns</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 rounded-xl bg-warning/5 border border-warning/20">
                  <AlertTriangle className="w-5 h-5 text-warning" />
                  <div>
                    <p className="font-semibold">24/7 Markets</p>
                    <p className="text-xs text-muted-foreground">Never sleep</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 rounded-xl bg-muted border border-border">
                  <Users className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="font-semibold">Manual = Risky</p>
                    <p className="text-xs text-muted-foreground">Human error</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Solution */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="glass-card p-8 md:p-12">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-full bg-success/20 flex items-center justify-center">
                  <Shield className="w-7 h-7 text-success" />
                </div>
                <h2 className="font-display text-2xl font-semibold">The Solution</h2>
              </div>
              
              <div className="space-y-4 text-muted-foreground text-lg leading-relaxed">
                <p>
                  <span className="text-foreground font-medium">RiskShield</span> is an automated on-chain protection system. 
                  You deposit your tokens, set a risk threshold (e.g., -20%), and if the market drops beyond that point, 
                  RiskShield <span className="text-success font-medium">automatically converts your assets to stablecoins</span> like USDC.
                </p>
                <p>
                  This happens <span className="text-foreground font-medium">instantly and automatically</span>—no manual 
                  intervention, no constant monitoring. Your portfolio is protected 24/7 while you sleep.
                </p>
                <p>
                  Everything executes <span className="text-foreground font-medium">on-chain</span>, meaning it's fully 
                  transparent, trustless, and verifiable. RiskShield never holds your funds—it only executes when 
                  your conditions are met.
                </p>
              </div>
              
              <div className="mt-8 flex flex-wrap gap-4">
                <div className="flex items-center gap-2 text-sm">
                  <Zap className="w-4 h-4 text-primary" />
                  <span>Instant Execution</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Shield className="w-4 h-4 text-success" />
                  <span>Non-Custodial</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Target className="w-4 h-4 text-accent" />
                  <span>Custom Thresholds</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Target Users */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-display text-3xl font-bold mb-8 text-center">
              Built For <span className="gradient-text">You</span>
            </h2>
            
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="glass-card p-6">
                <h3 className="font-semibold text-lg mb-2">DeFi Traders</h3>
                <p className="text-muted-foreground text-sm">
                  Active traders who need automated downside protection without leaving positions manually.
                </p>
              </div>
              <div className="glass-card p-6">
                <h3 className="font-semibold text-lg mb-2">Long-Term Holders</h3>
                <p className="text-muted-foreground text-sm">
                  HODLers who want peace of mind knowing their portfolio won't get wiped in a crash.
                </p>
              </div>
              <div className="glass-card p-6">
                <h3 className="font-semibold text-lg mb-2">Retail Investors</h3>
                <p className="text-muted-foreground text-sm">
                  Everyday crypto users who don't have time to monitor markets 24/7.
                </p>
              </div>
              <div className="glass-card p-6">
                <h3 className="font-semibold text-lg mb-2">Risk-Conscious Users</h3>
                <p className="text-muted-foreground text-sm">
                  Anyone who wants simple, transparent portfolio safety without complexity.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12">
              
              {/* Contact Info */}
              <div>
                <h2 className="font-display text-3xl font-bold mb-6">
                  Get in <span className="gradient-text">Touch</span>
                </h2>
                <p className="text-muted-foreground mb-8">
                  Have questions about RiskShield? Want to learn more about our protection mechanisms? 
                  Interested in early access? We'd love to hear from you.
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
                      <Mail className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Email us at</p>
                      <p className="font-medium">hello@riskshield.io</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Building from</p>
                      <p className="font-medium">Remote / Global</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Contact Form */}
              <div className="glass-card p-8">
                <h3 className="font-display text-xl font-semibold mb-6">Send us a message</h3>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Input
                      placeholder="Your name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className={errors.name ? "border-destructive" : ""}
                    />
                    {errors.name && (
                      <p className="text-sm text-destructive mt-1">{errors.name}</p>
                    )}
                  </div>
                  
                  <div>
                    <Input
                      type="email"
                      placeholder="Your email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={errors.email ? "border-destructive" : ""}
                    />
                    {errors.email && (
                      <p className="text-sm text-destructive mt-1">{errors.email}</p>
                    )}
                  </div>
                  
                  <div>
                    <Textarea
                      placeholder="Your message"
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className={errors.message ? "border-destructive" : ""}
                    />
                    {errors.message && (
                      <p className="text-sm text-destructive mt-1">{errors.message}</p>
                    )}
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full glow-effect"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
