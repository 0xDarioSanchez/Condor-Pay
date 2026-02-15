import { useState } from "react";
import { Wallet, Link2, Plus, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const wallets = [
  { name: "Freighter", icon: "🦊" },
  { name: "Albedo", icon: "🌟" },
  { name: "Rabet", icon: "🔗" },
];

export function WalletConnect() {
  const [connected, setConnected] = useState(false);
  const [selectedWallet, setSelectedWallet] = useState<string | null>(null);

  const handleConnect = (wallet: string) => {
    setSelectedWallet(wallet);
    setTimeout(() => setConnected(true), 800);
  };

  if (connected) {
    return (
      <div className="flex items-center gap-2 px-3 py-2 rounded-lg border border-success/30 bg-success/10 text-sm">
        <CheckCircle2 className="h-4 w-4 text-success" />
        <span className="text-success font-medium">{selectedWallet}</span>
        <span className="text-muted-foreground">0x7f3...4a2c</span>
      </div>
    );
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          size="lg"
          variant={"outline"}
          className="gradient-gold text-gold-foreground hover:opacity-90 transition-all gap-2"
        >
          <Wallet className="h-4 w-4" />
          Conectar Wallet
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-display">Conectar Wallet</DialogTitle>
        </DialogHeader>
        <div className="space-y-3 mt-4">
          {wallets.map((w) => (
            <button
              key={w.name}
              onClick={() => handleConnect(w.name)}
              className="w-full flex items-center gap-4 p-4 rounded-lg border border-border hover:border-primary/50 hover:bg-secondary/50 transition-all"
            >
              <span className="text-2xl">{w.icon}</span>
              <div className="text-left">
                <p className="font-medium">{w.name}</p>
                <p className="text-xs text-muted-foreground">Stellar Wallet</p>
              </div>
              <Link2 className="ml-auto h-4 w-4 text-muted-foreground" />
            </button>
          ))}
          <button
            onClick={() => handleConnect("Nueva Wallet")}
            className="w-full flex items-center gap-4 p-4 rounded-lg border border-dashed border-primary/30 hover:border-primary/60 hover:bg-primary/5 transition-all"
          >
            <Plus className="h-6 w-6 text-primary" />
            <div className="text-left">
              <p className="font-medium">Crear Nueva Wallet</p>
              <p className="text-xs text-muted-foreground">
                Wallet custodial segura
              </p>
            </div>
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
