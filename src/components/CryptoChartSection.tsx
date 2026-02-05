/**
 * ============================================================
 * PROTECTION DEMO SECTION - RiskShield
 * ============================================================
 * Visualizes how RiskShield protection works with real market data
 * ============================================================
 */

import { useState, useMemo } from "react";
import { Area, AreaChart, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts";
import { TrendingUp, TrendingDown, Loader2, Shield, Info, AlertTriangle } from "lucide-react";
import { useHistoricalPrices, useCryptoPrices } from "@/hooks/useCryptoData";
import { Skeleton } from "@/components/ui/skeleton";

// CoinGecko API IDs for ETH, MATIC, and WBTC
const cryptoOptions = [
  { id: "ethereum", name: "Ethereum", symbol: "ETH", color: "#627EEA", icon: "Ξ" },
  { id: "matic-network", name: "Polygon", symbol: "MATIC", color: "#8247E5", icon: "⬡" },
  { id: "wrapped-bitcoin", name: "Wrapped BTC", symbol: "WBTC", color: "#F7931A", icon: "₿" },
];

const timeOptions = [
  { days: 10, label: "10D" },
  { days: 30, label: "30D" },
  { days: 90, label: "90D" },
];

const CryptoChartSection = () => {
  const [selectedCrypto, setSelectedCrypto] = useState(cryptoOptions[0]);
  const [riskThreshold, setRiskThreshold] = useState(5); // 5% drawdown
  const [selectedDays, setSelectedDays] = useState(90); // Default to 90 days

  const { data: priceData } = useCryptoPrices();
  const { data: chartData, loading, error } = useHistoricalPrices(selectedCrypto.id, selectedDays);

  const currentPrice = useMemo(() => {
    const coin = priceData.find((c) => c.id === selectedCrypto.id);
    return coin?.price || 0;
  }, [priceData, selectedCrypto.id]);

  // Calculate protection simulation - tracks from ALL-TIME HIGH in the period
  const chartDataWithProtection = useMemo(() => {
    if (chartData.length === 0) return [];
    
    // First pass: find the all-time high in the entire dataset
    const allTimeHigh = Math.max(...chartData.map(p => p.price));
    
    let isProtected = false;
    let protectedValue = 0;
    let protectionTriggeredAt = -1;
    
    // Second pass: calculate protection based on drawdown from ATH
    const result = chartData.map((point, index) => {
      // Calculate drawdown from the all-time high (not just current high water mark)
      const drawdownFromATH = ((allTimeHigh - point.price) / allTimeHigh) * 100;
      
      if (drawdownFromATH >= riskThreshold && !isProtected) {
        // Protection triggered - lock in value at this point
        isProtected = true;
        protectedValue = point.price;
        protectionTriggeredAt = index;
      }
      
      // If not protected, track market price; if protected, stay flat at exit price
      const shieldedPrice = isProtected ? protectedValue : point.price;
      
      return {
        ...point,
        protectedPrice: Math.round(shieldedPrice * 100) / 100,
        drawdown: drawdownFromATH.toFixed(1),
        allTimeHigh,
        isProtectionTriggered: isProtected && index >= protectionTriggeredAt,
      };
    });
    
    return result;
  }, [chartData, riskThreshold]);

  const priceChange = useMemo(() => {
    if (chartData.length < 2) return 0;
    const startPrice = chartData[0].price;
    const endPrice = chartData[chartData.length - 1].price;
    return ((endPrice - startPrice) / startPrice) * 100;
  }, [chartData]);

  const protectedChange = useMemo(() => {
    if (chartDataWithProtection.length < 2) return 0;
    const startPrice = chartDataWithProtection[0].price;
    const endProtected = chartDataWithProtection[chartDataWithProtection.length - 1].protectedPrice;
    return ((endProtected - startPrice) / startPrice) * 100;
  }, [chartDataWithProtection]);

  const savedAmount = protectedChange - priceChange;
  const isPositive = priceChange >= 0;

  return (
    <section id="protection" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/5 to-background" />
      
      <div className="container mx-auto px-4 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-success/10 border border-success/20 mb-6">
            <Shield className="w-4 h-4 text-success" />
            <span className="text-sm font-medium text-success">Protection Visualization</span>
          </div>
          
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-5">
            See <span className="gradient-text">RiskShield</span> in Action
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Using real market data, see how RiskShield would have protected your portfolio 
            during market downturns.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="glass-card p-6 lg:p-8">
            
            {/* Controls Row */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-8">
              
              {/* Cryptocurrency Selector */}
              <div className="flex flex-wrap gap-2">
                {cryptoOptions.map((crypto) => (
                  <button
                    key={crypto.symbol}
                    onClick={() => setSelectedCrypto(crypto)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all duration-200 ${
                      selectedCrypto.symbol === crypto.symbol
                        ? "bg-primary/20 border-2 border-primary text-primary shadow-lg shadow-primary/20"
                        : "bg-secondary/50 border-2 border-transparent hover:border-primary/30 hover:bg-secondary"
                    }`}
                  >
                    <span className="text-lg">{crypto.icon}</span>
                    <span className="font-semibold">{crypto.symbol}</span>
                  </button>
                ))}
              </div>

              {/* Time Period Selector */}
              <div className="flex items-center gap-4">
                <span className="text-sm text-muted-foreground">Time Period:</span>
                <div className="flex gap-1 bg-secondary/50 p-1.5 rounded-xl">
                  {timeOptions.map((option) => (
                    <button
                      key={option.days}
                      onClick={() => setSelectedDays(option.days)}
                      className={`px-3 py-2 rounded-lg font-medium text-sm transition-all duration-200 ${
                        selectedDays === option.days
                          ? "bg-primary text-primary-foreground shadow-lg"
                          : "text-muted-foreground hover:text-foreground hover:bg-secondary/80"
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Risk Threshold Selector */}
              <div className="flex items-center gap-4">
                <span className="text-sm text-muted-foreground">Protection Threshold:</span>
                <div className="flex gap-1 bg-secondary/50 p-1.5 rounded-xl">
                  {[5, 10, 20].map((threshold) => (
                    <button
                      key={threshold}
                      onClick={() => setRiskThreshold(threshold)}
                      className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 ${
                        riskThreshold === threshold
                          ? "bg-destructive text-destructive-foreground shadow-lg"
                          : "text-muted-foreground hover:text-foreground hover:bg-secondary/80"
                      }`}
                    >
                      -{threshold}%
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Price Display */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 mb-8 p-6 rounded-2xl bg-secondary/30">
              <div>
                <p className="text-sm text-muted-foreground mb-2 flex items-center gap-2">
                  {selectedCrypto.name} (Last {selectedDays === 1 ? '24 Hours' : `${selectedDays} Days`})
                  <span className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-success/10 text-success">
                    <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
                    Live
                  </span>
                </p>
                <div className="flex items-baseline gap-3">
                  {currentPrice > 0 ? (
                    <span className="text-4xl lg:text-5xl font-display font-bold">
                      ${currentPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                  ) : (
                    <Skeleton className="h-12 w-48" />
                  )}
                  {chartDataWithProtection.length > 0 && (
                    <span className="text-sm text-muted-foreground">
                      Peak: ${chartDataWithProtection[0]?.allTimeHigh?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                  )}
                </div>
              </div>
              
              {/* Comparison Badges */}
              {chartDataWithProtection.length > 0 && (
                <div className="flex flex-wrap gap-3">
                  <div className={`flex items-center gap-3 px-4 py-3 rounded-xl ${isPositive ? 'bg-success/10 border border-success/20' : 'bg-destructive/10 border border-destructive/20'}`}>
                    {isPositive ? (
                      <TrendingUp className="w-5 h-5 text-success" />
                    ) : (
                      <TrendingDown className="w-5 h-5 text-destructive" />
                    )}
                    <div>
                      <span className={`font-bold text-lg ${isPositive ? 'text-success' : 'text-destructive'}`}>
                        {isPositive ? '+' : ''}{priceChange.toFixed(2)}%
                      </span>
                      <p className="text-xs text-muted-foreground">Without Protection</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-primary/10 border border-primary/20">
                    <Shield className="w-5 h-5 text-primary" />
                    <div>
                      <span className="font-bold text-lg text-primary">
                        {protectedChange >= 0 ? '+' : ''}{protectedChange.toFixed(2)}%
                      </span>
                      <p className="text-xs text-muted-foreground">With RiskShield</p>
                    </div>
                  </div>

                  {savedAmount > 0 && (
                    <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-success/10 border border-success/20">
                      <AlertTriangle className="w-5 h-5 text-success" />
                      <div>
                        <span className="font-bold text-lg text-success">
                          +{savedAmount.toFixed(2)}%
                        </span>
                        <p className="text-xs text-muted-foreground">Losses Avoided</p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Chart */}
            <div className="h-[350px] sm:h-[400px] lg:h-[450px]">
              {loading ? (
                <div className="h-full flex flex-col items-center justify-center gap-4">
                  <Loader2 className="w-10 h-10 animate-spin text-primary" />
                  <p className="text-sm text-muted-foreground">Loading market data...</p>
                </div>
              ) : error ? (
                <div className="h-full flex items-center justify-center text-muted-foreground">
                  Failed to load chart data. Please try again.
                </div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartDataWithProtection} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id={`gradient-${selectedCrypto.symbol}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={selectedCrypto.color} stopOpacity={0.3} />
                        <stop offset="95%" stopColor={selectedCrypto.color} stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="gradient-protected" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--success))" stopOpacity={0.4} />
                        <stop offset="95%" stopColor="hsl(var(--success))" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    
                    <XAxis 
                      dataKey="date" 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                      interval="preserveStartEnd"
                    />
                    
                    <YAxis 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                      tickFormatter={(value) => `$${value.toLocaleString()}`}
                      domain={['auto', 'auto']}
                      width={80}
                    />
                    
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '12px',
                        boxShadow: '0 10px 40px -10px rgba(0,0,0,0.5)',
                        padding: '12px 16px',
                      }}
                      labelStyle={{ color: 'hsl(var(--foreground))', fontWeight: 600, marginBottom: '8px' }}
                      formatter={(value: number, name: string) => [
                        `$${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
                        name === 'protectedPrice' ? '🛡️ Protected Value' : '📉 Market Price'
                      ]}
                    />
                    
                    <Area
                      type="monotone"
                      dataKey="price"
                      stroke={selectedCrypto.color}
                      strokeWidth={2}
                      fill={`url(#gradient-${selectedCrypto.symbol})`}
                    />
                    
                    <Area
                      type="monotone"
                      dataKey="protectedPrice"
                      stroke="hsl(var(--success))"
                      strokeWidth={3}
                      strokeDasharray="8 4"
                      fill="url(#gradient-protected)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              )}
            </div>

            {/* Chart Legend */}
            <div className="flex flex-wrap justify-center gap-8 mt-6 pt-6 border-t border-border/30">
              <div className="flex items-center gap-3">
                <div 
                  className="w-4 h-4 rounded-full" 
                  style={{ backgroundColor: selectedCrypto.color }}
                />
                <span className="text-sm text-muted-foreground">Market Price (Unprotected)</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-1 bg-success rounded" style={{ backgroundImage: 'repeating-linear-gradient(90deg, hsl(var(--success)) 0, hsl(var(--success)) 8px, transparent 8px, transparent 12px)' }} />
                <span className="text-sm text-muted-foreground">With RiskShield (-{riskThreshold}% trigger)</span>
              </div>
            </div>

            {/* Info Box */}
            <div className="mt-6 p-4 rounded-xl bg-primary/5 border border-primary/10 flex items-start gap-3">
              <Info className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <p className="text-sm text-muted-foreground">
                <span className="font-medium text-foreground">How it works:</span> When the price drops {riskThreshold}% from its <strong>highest point</strong> in the period, RiskShield automatically converts your tokens to stablecoins (USDC), locking in your value and preventing further losses.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CryptoChartSection;
