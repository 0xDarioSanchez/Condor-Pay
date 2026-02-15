import { Wallet, LogOut, Copy, CheckCheck, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { MappedBalances } from "@/util/wallet";

interface WalletDetailsCardProps {
  walletName: string;
  address?: string;
  network?: string;
  balances: MappedBalances;
  copied: boolean;
  refreshing: boolean;
  onCopyAddress: () => void;
  onRefresh: () => void;
  onDisconnect: () => void;
  getNetworkColor: (net?: string) => string;
}

export function WalletDetailsCard({
  walletName,
  address,
  network,
  balances,
  copied,
  refreshing,
  onCopyAddress,
  onRefresh,
  onDisconnect,
  getNetworkColor,
}: WalletDetailsCardProps) {
  const xlmBalance = balances?.xlm?.balance || "0";
  const usdcEntry = Object.entries(balances).find(
    ([, balance]) =>
      balance.asset_type !== "native" &&
      "asset_code" in balance &&
      balance.asset_code === "USDC",
  );
  const usdcBalance = usdcEntry ? String(usdcEntry[1].balance) : "0";
  return (
    <div className="absolute top-full mt-2 right-0 z-10 flex flex-col gap-2 p-5 rounded-xl border border-border bg-card shadow-lg min-w-[320px] max-w-95">
      {/* Header with Wallet Name and Network Badge */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Wallet className="h-4 w-4 text-foreground" />
          <span className="font-medium text-sm">{walletName}</span>
        </div>
        {network && (
          <Badge
            variant="outline"
            className={"text-xs " + getNetworkColor(network)}
          >
            {network.charAt(0).toUpperCase() + network.slice(1).toLowerCase()}
          </Badge>
        )}
      </div>

      <div className="space-y-2">
        {/* XLM Balance */}
        <div className="flex items-center justify-between border-b border-border">
          <div className="flex flex-col">
            <span className="text-xs text-muted-foreground">
              Registro de XLM
            </span>
            <span className="text-md font-semibold tracking-tight font-mono">
              {parseFloat(xlmBalance).toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}{" "}
              XLM
            </span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0"
            onClick={onRefresh}
            disabled={refreshing}
          >
            <RefreshCw
              className={`h-4 w-4 ${refreshing ? "animate-spin" : ""}`}
            />
          </Button>
        </div>

        {/* USDC Balance */}
        <div className="flex flex-col">
          <span className="text-xs text-muted-foreground">
            Registro de USDC
          </span>
          <span className="text-md font-semibold tracking-tight font-mono">
            {parseFloat(usdcBalance).toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}{" "}
            USDC
          </span>
        </div>
      </div>

      {/* Adress */}
      <div className="flex flex-col py-2 border-t border-border">
        <span className="text-xs text-muted-foreground">
          Dirección de Wallet
        </span>
        <div className="text-sm font-mono bg-white p-2 max-w-full break-all rounded-sm border">
          {address}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2">
        <Button
          variant="outline"
          className="flex-1 gap-2"
          onClick={onCopyAddress}
        >
          {copied ? (
            <>
              <CheckCheck className="h-4 w-4" />
              Copied
            </>
          ) : (
            <>
              <Copy className="h-4 w-4" />
              Copy
            </>
          )}
        </Button>
        <Button
          variant="destructive"
          className="flex-1 gap-2"
          onClick={onDisconnect}
        >
          <LogOut className="h-4 w-4" />
          Disconnect
        </Button>
      </div>
    </div>
  );
}
