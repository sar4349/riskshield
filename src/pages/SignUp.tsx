/**
 * ============================================================
 * SIGN UP / WAITLIST PAGE - RiskShield
 * ============================================================
 */

import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Shield, Sparkles, ArrowRight, Clock, CheckCircle2, Zap, Lock, Bell } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [acceptUpdates, setAcceptUpdates] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "🎉 You're on the list!",
        description: "We'll notify you when RiskShield launches. Check your email for confirmation.",
      });
      setEmail("");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 hero-gradient" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-success/10 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '1.5s' }} />
      
      <div className="w-full max-w-md relative z-10">
        {/* Logo */}
        <Link to="/" className="flex items-center justify-center gap-2 mb-8 group">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-success/20 flex items-center justify-center border border-primary/30 group-hover:border-primary/50 transition-colors">
            <Shield className="w-7 h-7 text-primary" />
          </div>
          <span className="font-display font-bold text-2xl">RiskShield</span>
        </Link>

        {/* Beta Badge */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-warning/10 border border-warning/20">
            <Clock className="w-4 h-4 text-warning" />
            <span className="text-sm font-medium text-warning">Early Access MVP</span>
          </div>
        </div>

        <Card className="glass-card border-border/30 backdrop-blur-xl">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-2xl font-display">Get Early Access</CardTitle>
            <CardDescription className="text-muted-foreground">
              Join the waitlist to be first when RiskShield launches
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            
            {/* Benefits */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 rounded-lg bg-success/5 border border-success/20">
                <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium">Priority Access</p>
                  <p className="text-xs text-muted-foreground">Be first to protect your portfolio</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-primary/5 border border-primary/20">
                <Zap className="w-5 h-5 text-primary flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium">Founder Benefits</p>
                  <p className="text-xs text-muted-foreground">Exclusive perks for early supporters</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-accent/5 border border-accent/20">
                <Bell className="w-5 h-5 text-accent flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium">Launch Updates</p>
                  <p className="text-xs text-muted-foreground">Get notified about progress & features</p>
                </div>
              </div>
            </div>

            {/* Signup Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-12 bg-background/50 border-border/50 focus:border-primary/50"
                />
              </div>

              <div className="flex items-start space-x-3">
                <Checkbox
                  id="updates"
                  checked={acceptUpdates}
                  onCheckedChange={(checked) => setAcceptUpdates(checked as boolean)}
                  className="mt-0.5"
                />
                <Label htmlFor="updates" className="text-sm text-muted-foreground leading-relaxed">
                  I want to receive updates about RiskShield development, launch news, and DeFi security tips.
                </Label>
              </div>

              <Button 
                type="submit" 
                className="w-full h-12 glow-effect font-medium"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                    Joining waitlist...
                  </div>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 mr-2" />
                    Join the Waitlist
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </>
                )}
              </Button>
            </form>

            {/* Trust Text */}
            <div className="text-center">
              <p className="text-xs text-muted-foreground flex items-center justify-center gap-2">
                <Lock className="w-3 h-3" />
                We respect your privacy. No spam, ever.
              </p>
            </div>

            <div className="pt-2">
              <p className="text-center text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link to="/signin" className="text-primary hover:text-primary/80 font-medium transition-colors">
                  Sign in
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Footer Links */}
        <div className="flex items-center justify-center gap-4 mt-6 text-xs text-muted-foreground">
          <Link to="/" className="hover:text-foreground transition-colors">← Back to home</Link>
          <span>•</span>
          <Link to="/about" className="hover:text-foreground transition-colors">About RiskShield</Link>
        </div>

        {/* Social Proof */}
        <p className="text-center text-xs text-muted-foreground mt-6">
          Join 500+ users waiting for launch
        </p>
      </div>
    </div>
  );
};

export default SignUp;
