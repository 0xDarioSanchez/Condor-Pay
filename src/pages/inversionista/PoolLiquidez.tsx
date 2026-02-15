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
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Droplets,
  TrendingUp,
  FileText,
  DollarSign,
  ArrowUpRight,
  Info,
  Clock,
} from "lucide-react";
import { useState } from "react";

const timePools = [
  {
    name: "Pool 30 días",
    plazo: "30 días",
    tasa: "18.5%",
    capital: "$350,000",
    estado: "Activo",
    fill: 72,
    restante: "12 días",
  },
  {
    name: "Pool 60 días",
    plazo: "60 días",
    tasa: "24.5%",
    capital: "$400,000",
    estado: "Activo",
    fill: 60,
    restante: "38 días",
  },
  {
    name: "Pool 90 días",
    plazo: "90 días",
    tasa: "28.1%",
    capital: "$250,000",
    estado: "Activo",
    fill: 45,
    restante: "67 días",
  },
];

export default function PoolLiquidez() {
  const [selectedPool, setSelectedPool] = useState(0);
  const [monto, setMonto] = useState("");
  const [step, setStep] = useState<"info" | "confirmed">("info");

  const pool = timePools[selectedPool];
  const montoNum = parseFloat(monto) || 0;
  const lpTokens = montoNum > 0 ? Math.floor(montoNum * 0.995) : 0;
  const tasaNum = parseFloat(pool.tasa) / 100;
  const gananciaEstimada = montoNum > 0 ? Math.floor(montoNum * tasaNum) : 0;

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-display font-bold">Pools de Liquidez</h1>
        <p className="text-muted-foreground">
          Selecciona un pool por tiempo y deposita USDC
        </p>
      </motion.div>

      {/* Pool cards by time */}
      <div className="grid md:grid-cols-3 gap-4 mb-8">
        {timePools.map((p, i) => (
          <motion.div
            key={p.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <button
              onClick={() => {
                setSelectedPool(i);
                setStep("info");
                setMonto("");
              }}
              className={`w-full text-left p-5 rounded-2xl border transition-all ${
                selectedPool === i
                  ? "border-primary bg-primary/5"
                  : "border-border bg-card hover:border-primary/30"
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-primary" />
                  <h4 className="font-display font-bold">{p.name}</h4>
                </div>
                <Badge
                  variant="secondary"
                  className="bg-success/10 text-success text-xs"
                >
                  {p.estado}
                </Badge>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tasa estimada</span>
                  <span className="font-bold text-success">{p.tasa} APY</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Capital</span>
                  <span className="font-medium">{p.capital}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tiempo restante</span>
                  <span className="font-medium">{p.restante}</span>
                </div>
              </div>
              <div className="mt-3">
                <Progress value={p.fill} className="h-1.5" />
                <p className="text-xs text-muted-foreground mt-1">
                  {p.fill}% utilizado
                </p>
              </div>
            </button>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Pool Stats */}
        <div className="lg:col-span-2 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="font-display flex items-center gap-2">
                  <Droplets className="h-5 w-5 text-primary" />
                  Detalle: {pool.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {[
                    {
                      label: "Capital Total",
                      value: pool.capital,
                      icon: DollarSign,
                    },
                    {
                      label: "APY Promedio",
                      value: pool.tasa,
                      icon: TrendingUp,
                    },
                    { label: "Plazo", value: pool.plazo, icon: Clock },
                    { label: "Facturas Activas", value: "12", icon: FileText },
                    {
                      label: "Tu Participación",
                      value: "1.2%",
                      icon: ArrowUpRight,
                    },
                    { label: "Tu Balance", value: "3,950 LP", icon: Droplets },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="p-3 rounded-lg border border-border"
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <item.icon className="h-4 w-4 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">
                          {item.label}
                        </span>
                      </div>
                      <p className="font-display font-bold">{item.value}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Distribución */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="font-display">
                  Distribución por Sector
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { sector: "Minería", pct: 35, monto: "$210k" },
                  { sector: "Agroindustria", pct: 25, monto: "$150k" },
                  { sector: "Textil", pct: 20, monto: "$120k" },
                  { sector: "Tecnología", pct: 12, monto: "$72k" },
                  { sector: "Logística", pct: 8, monto: "$48k" },
                ].map((s) => (
                  <div key={s.sector}>
                    <div className="flex justify-between text-sm mb-1">
                      <span>{s.sector}</span>
                      <span className="text-muted-foreground">
                        {s.monto} ({s.pct}%)
                      </span>
                    </div>
                    <Progress value={s.pct} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Depositar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="sticky top-8">
            <CardHeader>
              <CardTitle className="font-display">Depositar USDC</CardTitle>
              <CardDescription>
                {pool.name} · {pool.tasa} APY · {pool.plazo}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {step === "confirmed" ? (
                <div className="text-center py-6 space-y-3">
                  <div className="w-16 h-16 rounded-full gradient-gold flex items-center justify-center mx-auto">
                    <ArrowUpRight className="h-8 w-8 text-gold-foreground" />
                  </div>
                  <h3 className="font-display font-bold text-lg">
                    ¡Depósito Exitoso!
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Has recibido {lpTokens} LP tokens en {pool.name}
                  </p>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => {
                      setStep("info");
                      setMonto("");
                    }}
                  >
                    Nuevo depósito
                  </Button>
                </div>
              ) : (
                <>
                  <div>
                    <label className="text-sm font-medium mb-1 block">
                      Monto (USDC)
                    </label>
                    <Input
                      type="number"
                      placeholder="1,000"
                      value={monto}
                      onChange={(e) => setMonto(e.target.value)}
                      min={100}
                    />
                  </div>

                  {montoNum >= 100 && (
                    <div className="p-4 rounded-lg border border-border bg-muted/30 space-y-2">
                      <h4 className="font-display font-semibold text-sm flex items-center gap-1">
                        <Info className="h-3 w-3" /> Simulación
                      </h4>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            Depositas
                          </span>
                          <span className="font-medium">
                            {montoNum.toLocaleString()} USDC
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Recibes</span>
                          <span className="font-medium">
                            {lpTokens.toLocaleString()} LP tokens
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            APY estimado
                          </span>
                          <span className="font-medium text-success">
                            {pool.tasa}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            Interés proyectado
                          </span>
                          <span className="font-medium text-success">
                            ${gananciaEstimada.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Plazo</span>
                          <span className="font-medium">{pool.plazo}</span>
                        </div>
                      </div>
                    </div>
                  )}

                  <Button
                    className="w-full gradient-gold text-gold-foreground"
                    disabled={montoNum < 100}
                    onClick={() => setStep("confirmed")}
                  >
                    Confirmar Depósito
                  </Button>
                  <p className="text-xs text-muted-foreground text-center">
                    La transacción se ejecutará vía Smart Contract en Stellar
                  </p>
                </>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
