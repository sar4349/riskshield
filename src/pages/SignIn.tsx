/**
 * ============================================================
 * SIGN IN PAGE - RiskShield
 * ============================================================
 */

import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Shield, Mail, ArrowRight, Clock, Lock, Wallet } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Coming Soon",
        description: "RiskShield is currently in beta. Join our waitlist to get early access!",
      });
    }, 1000);
  };

  const handleWalletConnect = () => {
    toast({
      title: "Coming Soon",
      description: "Wallet connection will be available when RiskShield launches.",
    });
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 hero-gradient" />
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse-glow" />
      <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-success/10 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '1.5s' }} />
      
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
            <span className="text-sm font-medium text-warning">Beta - Coming Soon</span>
          </div>
        </div>

        <Card className="glass-card border-border/30 backdrop-blur-xl">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-2xl font-display">Welcome Back</CardTitle>
            <CardDescription className="text-muted-foreground">
              Sign in to manage your portfolio protection
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            {/* Security Notice */}
            <div className="flex items-center gap-3 p-3 rounded-lg bg-success/5 border border-success/20">
              <Shield className="w-5 h-5 text-success flex-shrink-0" />
              <p className="text-xs text-muted-foreground">
                Non-custodial protection. Your keys, your crypto. We never hold your funds.
              </p>
            </div>

            {/* Wallet Connect */}
            <Button
              variant="outline"
              className="w-full h-12 bg-background/50 hover:bg-background/80 border-border/50 hover:border-border transition-all"
              onClick={handleWalletConnect}
            >
              <Wallet className="w-5 h-5 mr-3" />
              Connect Wallet
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-3 text-muted-foreground">Or continue with email</span>
              </div>
            </div>

            {/* Email Login Form */}
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
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-sm font-medium">Password</Label>
                  <button 
                    type="button" 
                    className="text-xs text-primary hover:text-primary/80 transition-colors"
                    onClick={() => toast({ title: "Coming Soon", description: "Password recovery will be available at launch." })}
                  >
                    Forgot password?
                  </button>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="h-12 bg-background/50 border-border/50 focus:border-primary/50"
                />
              </div>
              <Button 
                type="submit" 
                className="w-full h-12 glow-effect font-medium"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                    Signing in...
                  </div>
                ) : (
                  <>
                    <Lock className="w-4 h-4 mr-2" />
                    Sign In
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            </form>

            <div className="pt-2">
              <p className="text-center text-sm text-muted-foreground">
                Don't have an account?{" "}
                <Link to="/signup" className="text-primary hover:text-primary/80 font-medium transition-colors">
                  Get early access
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

        {/* Trust Indicators */}
        <p className="text-center text-xs text-muted-foreground mt-6">
          On-chain protection • Non-custodial • Open source
        </p>
      </div>
    </div>
  );
};

export default SignIn;
