/**
 * ============================================================
 * MARKET SECTION COMPONENT
 * ============================================================
 * Professional market display with enhanced styling.
 * ============================================================
 */

import CryptoCard from "./CryptoCard";
import { useCryptoPrices } from "@/hooks/useCryptoData";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle, RefreshCw, TrendingUp, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

const MarketSection = () => {
  const { data, loading, error, refetch } = useCryptoPrices();

  return (
    <section id="markets" className="py-24 relative">
      {/* Background accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/5 to-background" />
      
      <div className="container mx-auto px-4 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-success/10 border border-success/20 mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-success" />
            </span>
            <span className="text-sm font-medium text-success">Live Market Data</span>
          </div>
          
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-5">
            Real-Time <span className="gradient-text">Market</span> Prices
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Track live prices of top cryptocurrencies with real-time data powered by CoinGecko API. 
            Updated every minute for accurate portfolio management.
          </p>
        </div>

        {/* Error State */}
        {error && (
          <div className="max-w-md mx-auto mb-12">
            <div className="glass-card p-5 border-destructive/30 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-destructive/10 flex items-center justify-center flex-shrink-0">
                <AlertCircle className="w-6 h-6 text-destructive" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-foreground mb-1">Unable to load market data</p>
                <p className="text-sm text-muted-foreground">{error}</p>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={refetch}
                className="flex-shrink-0"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Retry
              </Button>
            </div>
          </div>
        )}

        {/* Loading Skeleton */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="glass-card p-6 animate-pulse">
                <div className="flex items-center gap-4 mb-5">
                  <Skeleton className="w-14 h-14 rounded-2xl" />
                  <div className="space-y-2 flex-1">
                    <Skeleton className="h-5 w-28" />
                    <Skeleton className="h-4 w-16" />
                  </div>
                </div>
                <Skeleton className="h-9 w-36 mb-3" />
                <Skeleton className="h-5 w-24" />
              </div>
            ))}
          </div>
        )}

        {/* Crypto Cards Grid */}
        {!loading && data.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {data.map((crypto, index) => (
              <div 
                key={crypto.symbol} 
                className="animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CryptoCard {...crypto} />
              </div>
            ))}
          </div>
        )}

        {/* View All Link */}
        <div className="text-center mt-12">
          <a 
            href="https://www.coingecko.com/" 
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-secondary/50 hover:bg-secondary/80 border border-border/50 text-foreground font-medium transition-all duration-300 group"
          >
            <TrendingUp className="w-5 h-5 text-primary" />
            Explore All Cryptocurrencies
            <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
          </a>
          <p className="text-xs text-muted-foreground mt-3">
            Data provided by CoinGecko • Prices update every 60 seconds
          </p>
        </div>
      </div>
    </section>
  );
};

export default MarketSection;
