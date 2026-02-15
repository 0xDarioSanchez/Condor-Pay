import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowDownToLine, Info, Wallet } from "lucide-react";
import { useState } from "react";

const positions = [
  { pool: "Pool Perú A", lpTokens: 4975, valorUSDC: 5120 },
  { pool: "Pool Minería", lpTokens: 4478, valorUSDC: 4680 },
  { pool: "Pool Agroindustria", lpTokens: 2472, valorUSDC: 2650 },
];

export default function Retiros() {
  const [selectedPool, setSelectedPool] = useState<string | null>(null);
  const [lpAmount, setLpAmount] = useState("");
  const [confirmed, setConfirmed] = useState(false);

  const pool = positions.find((p) => p.pool === selectedPool);
  const lpNum = parseFloat(lpAmount) || 0;
  const usdcOut = pool
    ? Math.floor((lpNum / pool.lpTokens) * pool.valorUSDC)
    : 0;

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-display font-bold">Retiros</h1>
        <p className="text-muted-foreground">
          Quema LP tokens y retira USDC (capital + ganancias)
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="font-display">
                Seleccionar Posición
              </CardTitle>
              <CardDescription>
                Elige el pool del cual deseas retirar
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {positions.map((p) => (
                <button
                  key={p.pool}
                  onClick={() => {
                    setSelectedPool(p.pool);
                    setConfirmed(false);
                    setLpAmount("");
                  }}
                  className={`w-full p-4 rounded-xl border text-left transition-colors ${
                    selectedPool === p.pool
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-display font-semibold">{p.pool}</h4>
                      <p className="text-sm text-muted-foreground">
                        {p.lpTokens.toLocaleString()} LP tokens
                      </p>
                    </div>
                    <p className="font-display font-bold">
                      {p.valorUSDC.toLocaleString()} USDC
                    </p>
                  </div>
                </button>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="font-display flex items-center gap-2">
                <ArrowDownToLine className="h-5 w-5" /> Retirar USDC
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {!selectedPool ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Wallet className="h-12 w-12 mx-auto mb-3 opacity-50" />
                  <p>Selecciona un pool para retirar</p>
                </div>
              ) : confirmed ? (
                <div className="text-center py-6 space-y-3">
                  <div className="w-16 h-16 rounded-full gradient-gold flex items-center justify-center mx-auto">
                    <ArrowDownToLine className="h-8 w-8 text-gold-foreground" />
                  </div>
                  <h3 className="font-display font-bold text-lg">
                    ¡Retiro Procesado!
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {usdcOut.toLocaleString()} USDC enviados a tu wallet
                  </p>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => {
                      setConfirmed(false);
                      setSelectedPool(null);
                    }}
                  >
                    Listo
                  </Button>
                </div>
              ) : (
                <>
                  <div>
                    <label className="text-sm font-medium mb-1 block">
                      LP Tokens a quemar
                    </label>
                    <Input
                      type="number"
                      placeholder={`Máx: ${pool?.lpTokens.toLocaleString()}`}
                      value={lpAmount}
                      onChange={(e) => setLpAmount(e.target.value)}
                      max={pool?.lpTokens}
                    />
                    <Button
                      variant="link"
                      size="sm"
                      className="px-0 text-xs"
                      onClick={() => setLpAmount(String(pool?.lpTokens || 0))}
                    >
                      Usar máximo
                    </Button>
                  </div>

                  {lpNum > 0 && (
                    <div className="p-4 rounded-lg border border-border bg-muted/30 space-y-2">
                      <h4 className="font-display font-semibold text-sm flex items-center gap-1">
                        <Info className="h-3 w-3" /> Resumen
                      </h4>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Quemas</span>
                          <span className="font-medium">
                            {lpNum.toLocaleString()} LP tokens
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Recibes</span>
                          <span className="font-medium text-success">
                            {usdcOut.toLocaleString()} USDC
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  <Button
                    className="w-full gradient-gold text-gold-foreground"
                    disabled={lpNum <= 0 || lpNum > (pool?.lpTokens || 0)}
                    onClick={() => setConfirmed(true)}
                  >
                    Confirmar Retiro
                  </Button>
                </>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
