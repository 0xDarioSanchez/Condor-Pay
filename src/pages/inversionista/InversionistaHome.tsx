import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Wallet,
  TrendingUp,
  PieChart,
  ArrowUpRight,
  ArrowDownRight,
  DollarSign,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Link } from "react-router-dom";
import { WalletConnect } from "@/components/front/WalletConnect";

const stats = [
  {
    label: "Balance Total",
    value: "12,450 USDC",
    icon: Wallet,
    trend: "+8.2%",
    up: true,
  },
  {
    label: "LP Tokens",
    value: "11,925",
    icon: PieChart,
    trend: "35 facturas",
    up: true,
  },
  {
    label: "APY Actual",
    value: "24.5%",
    icon: TrendingUp,
    trend: "+2.1% vs mes anterior",
    up: true,
  },
  {
    label: "Ganancia Acum.",
    value: "1,842 USDC",
    icon: DollarSign,
    trend: "Últimos 90 días",
    up: true,
  },
];

const portfolio = [
  {
    pool: "Pool Perú A",
    apy: "26.2%",
    invested: "5,000 USDC",
    facturas: 18,
    health: 92,
  },
  {
    pool: "Pool Minería",
    apy: "22.8%",
    invested: "4,500 USDC",
    facturas: 12,
    health: 88,
  },
  {
    pool: "Pool Agroindustria",
    apy: "28.1%",
    invested: "2,950 USDC",
    facturas: 5,
    health: 95,
  },
];

export default function InversionistaHome() {
  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h1 className="text-3xl font-display font-bold">
            Dashboard Inversionista
          </h1>
          <p className="text-muted-foreground">
            Monitorea tu portfolio y rendimientos
          </p>
        </motion.div>
        <WalletConnect />
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-lg gradient-gold flex items-center justify-center">
                    <s.icon className="h-5 w-5 text-gold-foreground" />
                  </div>
                  <div>
                    <p className="text-2xl font-display font-bold">{s.value}</p>
                    <p className="text-xs text-muted-foreground">{s.label}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-xs">
                  {s.up ? (
                    <ArrowUpRight className="h-3 w-3 text-success" />
                  ) : (
                    <ArrowDownRight className="h-3 w-3 text-destructive" />
                  )}
                  <span className={s.up ? "text-success" : "text-destructive"}>
                    {s.trend}
                  </span>
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
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="font-display">Mi Portfolio</CardTitle>
            <Link to="/dashboard/inversionista/portfolio">
              <Button variant="outline" size="sm">
                Ver todo
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {portfolio.map((p) => (
                <div
                  key={p.pool}
                  className="p-4 rounded-xl border border-border"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h4 className="font-display font-semibold">{p.pool}</h4>
                      <p className="text-sm text-muted-foreground">
                        {p.facturas} facturas activas
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-display font-bold text-success">
                        {p.apy} APY
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {p.invested}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Progress value={p.health} className="h-2 flex-1" />
                    <span className="text-xs text-muted-foreground">
                      {p.health}% salud
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
