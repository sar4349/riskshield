/**
 * ============================================================
 * CRYPTO CARD COMPONENT
 * ============================================================
 * Individual card component that displays a single cryptocurrency.
 * Used in the MarketSection grid.
 * 
 * Features:
 * - Coin icon and name
 * - Current price in USD
 * - 24h percentage change (green/red)
 * - Mini bar chart visualization
 * 
 * PROPS (data passed to this component):
 * - name: Full cryptocurrency name
 * - symbol: Short code (BTC, ETH)
 * - price: Current price in USD
 * - change: 24h change percentage
 * - icon: Unicode symbol for the coin
 * - color: Brand color (hex)
 * ============================================================
 */

import { TrendingUp, TrendingDown } from "lucide-react";

// TypeScript interface defining the props this component accepts
interface CryptoCardProps {
  name: string;
  symbol: string;
  price: number;
  change: number;
  icon: string;
  color: string;
}

const CryptoCard = ({ name, symbol, price, change, icon, color }: CryptoCardProps) => {
  // Determine if price change is positive or negative
  const isPositive = change >= 0;

  return (
    <div className="glass-card p-5 hover:border-primary/30 transition-all duration-300 group cursor-pointer">
      
      {/* ========================================
          CARD HEADER
          ----------------------------------------
          Contains coin icon, name, and change percentage
          ======================================== */}
      <div className="flex items-start justify-between mb-4">
        
        {/* Coin icon and name */}
        <div className="flex items-center gap-3">
          {/* Icon container - uses the coin's brand color */}
          <div 
            className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
            style={{ backgroundColor: `${color}20` }} // 20 = 12% opacity in hex
          >
            {icon}
          </div>
          <div>
            <h3 className="font-semibold">{name}</h3>
            <p className="text-sm text-muted-foreground">{symbol}</p>
          </div>
        </div>
        
        {/* Price change badge - green if positive, red if negative */}
        <div className={`flex items-center gap-1 text-sm font-medium ${isPositive ? 'text-success' : 'text-destructive'}`}>
          {isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
          {isPositive ? '+' : ''}{change.toFixed(2)}%
        </div>
      </div>
      
      {/* ========================================
          CARD FOOTER
          ----------------------------------------
          Contains price and mini chart
          ======================================== */}
      <div className="flex items-end justify-between">
        
        {/* Current price */}
        <div>
          <p className="text-2xl font-display font-bold">
            ${price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
          <p className="text-xs text-muted-foreground mt-1">USD</p>
        </div>
        
        {/* ========================================
            MINI CHART
            ----------------------------------------
            Simple bar visualization
            Edit the array values to change bar heights (0-100)
            ======================================== */}
        <div className="h-10 w-20 flex items-end gap-0.5">
          {[40, 55, 45, 60, 50, 70, 65, 80].map((height, i) => (
            <div 
              key={i}
              className={`w-2 rounded-sm ${isPositive ? 'bg-success/60' : 'bg-destructive/60'} group-hover:opacity-100 opacity-70 transition-opacity`}
              style={{ height: `${height}%` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CryptoCard;
