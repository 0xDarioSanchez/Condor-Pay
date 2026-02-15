import { useState, useEffect } from "react";
import { Wallet, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useWallet } from "@/hooks/useWallet";
import { connectWallet, disconnectWallet } from "@/util/wallet";
import storage from "@/util/storage";
import { WalletDetailsCard } from "./WalletDetailsCard";

export function WalletConnect() {
  const { address, balances, isPending, network, updateBalances } = useWallet();
  const [copied, setCopied] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [walletName, setWalletName] = useState<string>("Freighter");

  useEffect(() => {
    const walletId = storage.getItem("walletId");
    if (walletId) {
      // Capitalize first letter
      const name = walletId.charAt(0).toUpperCase() + walletId.slice(1);
      setWalletName(name);
    }
  }, [address]);

  useEffect(() => {
    if (address) {
      console.log("🔗 Wallet Connected:");
      console.log("📍 Address:", address);
      console.log("🌐 Network:", network);
      console.log("💰 XLM Balance:", balances?.xlm?.balance || "0");
      console.log("📊 All Balances:", balances);
    }
  }, [address, network, balances]);

  const handleConnect = async () => {
    try {
      await connectWallet();
    } catch (error) {
      console.error("❌ Error connecting wallet:", error);
    }
  };

  const handleDisconnect = async () => {
    try {
      await disconnectWallet();
      setIsExpanded(false);
      console.log("👋 Wallet disconnected");
    } catch (error) {
      console.error("❌ Error disconnecting wallet:", error);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      await updateBalances();
      console.log("🔄 Balances refreshed");
    } catch (error) {
      console.error("❌ Error refreshing balances:", error);
    } finally {
      setTimeout(() => setRefreshing(false), 500);
    }
  };

  const copyAddress = () => {
    if (address) {
      void navigator.clipboard.writeText(address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      console.log("📋 Address copied:", address);
    }
  };

  const getNetworkColor = (net?: string) => {
    switch (net?.toUpperCase()) {
      case "TESTNET":
        return "bg-amber-500/10 text-amber-500 border-amber-500/30";
      case "MAINNET":
      case "PUBLIC":
        return "bg-green-500/10 text-green-500 border-green-500/30";
      case "FUTURENET":
        return "bg-blue-500/10 text-blue-500 border-blue-500/30";
      default:
        return "bg-gray-500/10 text-gray-500 border-gray-500/30";
    }
  };

  if (address && !isPending) {
    return (
      <div className="relative">
        {/* Toggle Button */}
        <Button
          size="lg"
          variant={"outline"}
          className="gradient-gold text-gold-foreground hover:opacity-90 transition-all gap-2"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <Wallet className="h-4 w-4" />
          {address.slice(0, 4)}...{address.slice(-4)}
          {isExpanded ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </Button>

        {/* Expanded Details Card */}
        {isExpanded && (
          <WalletDetailsCard
            walletName={walletName}
            address={address}
            network={network}
            balances={balances}
            copied={copied}
            refreshing={refreshing}
            onCopyAddress={copyAddress}
            onRefresh={() => void handleRefresh()}
            onDisconnect={() => void handleDisconnect()}
            getNetworkColor={getNetworkColor}
          />
        )}
      </div>
    );
  }

  if (isPending) {
    return (
      <div className="flex items-center gap-2 px-3 py-2 rounded-lg border border-border bg-secondary/50 text-sm">
        <div className="h-4 w-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        <span className="text-muted-foreground">Connecting...</span>
      </div>
    );
  }

  return (
    <Button
      size="lg"
      variant={"outline"}
      className="gradient-gold text-gold-foreground hover:opacity-90 transition-all gap-2"
      onClick={() => void handleConnect()}
    >
      <Wallet className="h-4 w-4" />
      Conectar Wallet
    </Button>
  );
}
