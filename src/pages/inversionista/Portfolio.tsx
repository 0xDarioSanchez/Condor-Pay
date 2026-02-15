import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { PieChart, TrendingUp, DollarSign, ArrowUpRight } from "lucide-react";

const holdings = [
  {
    pool: "Pool Perú A",
    lpTokens: "4,975",
    valorActual: "5,120 USDC",
    ganancia: "+120 USDC",
    apy: "26.2%",
    facturas: 18,
    health: 92,
    pct: 41,
  },
  {
    pool: "Pool Minería",
    lpTokens: "4,478",
    valorActual: "4,680 USDC",
    ganancia: "+180 USDC",
    apy: "22.8%",
    facturas: 12,
    health: 88,
    pct: 37,
  },
  {
    pool: "Pool Agroindustria",
    lpTokens: "2,472",
    valorActual: "2,650 USDC",
    ganancia: "+50 USDC",
    apy: "28.1%",
    facturas: 5,
    health: 95,
    pct: 22,
  },
];

const summary = [
  { label: "Valor Total Portfolio", value: "12,450 USDC", icon: DollarSign },
  { label: "LP Tokens Totales", value: "11,925", icon: PieChart },
  { label: "Ganancia Total", value: "+350 USDC", icon: TrendingUp },
  { label: "Participación Promedio", value: "1.2%", icon: ArrowUpRight },
];

export default function Portfolio() {
  return (
    <div>
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-display font-bold">Mi Portfolio</h1>
        <p className="text-muted-foreground">
          Detalle de tus posiciones en los pools de liquidez
        </p>
      </motion.div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {summary.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg gradient-gold flex items-center justify-center">
                    <s.icon className="h-5 w-5 text-gold-foreground" />
                  </div>
                  <div>
                    <p className="text-xl font-display font-bold">{s.value}</p>
                    <p className="text-xs text-muted-foreground">{s.label}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="font-display">Posiciones Activas</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {holdings.map((h) => (
              <div key={h.pool} className="p-5 rounded-xl border border-border">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="font-display font-semibold text-lg">
                      {h.pool}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {h.facturas} facturas · {h.pct}% de tu portfolio
                    </p>
                  </div>
                  <Badge
                    variant="secondary"
                    className="bg-success/10 text-success"
                  >
                    {h.apy} APY
                  </Badge>
                </div>
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div>
                    <p className="text-xs text-muted-foreground">LP Tokens</p>
                    <p className="font-display font-semibold">{h.lpTokens}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">
                      Valor Actual
                    </p>
                    <p className="font-display font-semibold">
                      {h.valorActual}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Ganancia</p>
                    <p className="font-display font-semibold text-success">
                      {h.ganancia}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Progress value={h.health} className="h-2 flex-1" />
                  <span className="text-xs text-muted-foreground">
                    {h.health}% salud
                  </span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
