/**
 * ============================================================
 * CRYPTO DATA HOOK - CoinGecko API
 * ============================================================
 * Fetches real-time cryptocurrency data from CoinGecko API.
 * 
 * Features:
 * - Real-time prices and 24h change
 * - Historical price data for charts
 * - Auto-refresh every 60 seconds
 * 
 * API: https://www.coingecko.com/en/api
 * ============================================================
 */

import { useState, useEffect } from "react";

/**
 * CRYPTOCURRENCY IDS
 * ============================================================
 * CoinGecko IDs for the cryptocurrencies we want to display.
 * Find more IDs at: https://api.coingecko.com/api/v3/coins/list
 */
const CRYPTO_IDS = ["bitcoin", "ethereum", "solana", "cardano", "polkadot", "avalanche-2"];

/**
 * Mapping from CoinGecko IDs to display info
 */
const CRYPTO_INFO: Record<string, { symbol: string; icon: string; color: string }> = {
  bitcoin: { symbol: "BTC", icon: "₿", color: "#F7931A" },
  ethereum: { symbol: "ETH", icon: "Ξ", color: "#627EEA" },
  solana: { symbol: "SOL", icon: "◎", color: "#00FFA3" },
  cardano: { symbol: "ADA", icon: "₳", color: "#0033AD" },
  polkadot: { symbol: "DOT", icon: "●", color: "#E6007A" },
  "avalanche-2": { symbol: "AVAX", icon: "▲", color: "#E84142" },
  "matic-network": { symbol: "MATIC", icon: "⬡", color: "#8247E5" },
  "weth": { symbol: "WETH", icon: "Ξ", color: "#627EEA" },
  "wrapped-bitcoin": { symbol: "WBTC", icon: "₿", color: "#F7931A" },
};

export interface CryptoData {
  id: string;
  name: string;
  symbol: string;
  price: number;
  change: number;
  icon: string;
  color: string;
}

export interface HistoricalData {
  date: string;
  price: number;
}

const REFRESH_INTERVAL = 60000; // 60 seconds

/**
 * Hook to fetch current crypto prices from CoinGecko
 */
export const useCryptoPrices = () => {
  const [data, setData] = useState<CryptoData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPrices = async () => {
    try {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/simple/price?ids=${CRYPTO_IDS.join(",")}&vs_currencies=usd&include_24hr_change=true`
      );
      
      if (!response.ok) throw new Error("Failed to fetch prices");
      
      const result = await response.json();
      
      const cryptoData: CryptoData[] = CRYPTO_IDS.map((id) => {
        const info = CRYPTO_INFO[id];
        const priceData = result[id];
        
        return {
          id,
          name: id.charAt(0).toUpperCase() + id.slice(1).replace("-2", ""),
          symbol: info.symbol,
          price: priceData?.usd || 0,
          change: priceData?.usd_24h_change || 0,
          icon: info.icon,
          color: info.color,
        };
      });
      
      setData(cryptoData);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrices();
    const interval = setInterval(fetchPrices, REFRESH_INTERVAL);
    return () => clearInterval(interval);
  }, []);

  return { data, loading, error, refetch: fetchPrices };
};

/**
 * Hook to fetch historical price data for charts from CoinGecko
 */
export const useHistoricalPrices = (coinId: string, days: number) => {
  const [data, setData] = useState<HistoricalData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHistory = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=${days}`
        );
        
        if (!response.ok) throw new Error("Failed to fetch historical data");
        
        const result = await response.json();
        
        // CoinGecko returns [timestamp, price] pairs
        const historicalData: HistoricalData[] = result.prices.map(
          ([timestamp, price]: [number, number]) => {
            const date = new Date(timestamp);
            let dateStr: string;
            
            if (days <= 1) {
              dateStr = date.toLocaleTimeString("en-US", {
                hour: "numeric",
                minute: "2-digit",
              });
            } else if (days <= 7) {
              dateStr = date.toLocaleDateString("en-US", {
                weekday: "short",
                hour: "numeric",
              });
            } else if (days <= 30) {
              dateStr = date.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              });
            } else {
              dateStr = date.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              });
            }
            
            return {
              date: dateStr,
              price: Math.round(price * 100) / 100,
            };
          }
        );
        
        // Reduce data points for smoother chart
        const step = Math.max(1, Math.floor(historicalData.length / 50));
        const reducedData = historicalData.filter((_, index) => index % step === 0);
        
        setData(reducedData);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [coinId, days]);

  return { data, loading, error };
};
