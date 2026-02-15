import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Calendar } from "lucide-react";

const monthly = [
  {
    mes: "Enero 2025",
    ganancia: "+142 USDC",
    apy: "23.8%",
    facturasPagadas: 8,
  },
  {
    mes: "Diciembre 2024",
    ganancia: "+168 USDC",
    apy: "25.1%",
    facturasPagadas: 11,
  },
  {
    mes: "Noviembre 2024",
    ganancia: "+155 USDC",
    apy: "24.2%",
    facturasPagadas: 9,
  },
  {
    mes: "Octubre 2024",
    ganancia: "+131 USDC",
    apy: "22.5%",
    facturasPagadas: 7,
  },
  {
    mes: "Septiembre 2024",
    ganancia: "+189 USDC",
    apy: "26.8%",
    facturasPagadas: 12,
  },
  {
    mes: "Agosto 2024",
    ganancia: "+147 USDC",
    apy: "24.0%",
    facturasPagadas: 10,
  },
];

const transactions = [
  {
    fecha: "28 Ene 2025",
    tipo: "Ganancia Pool Perú A",
    monto: "+45 USDC",
    pool: "Pool Perú A",
  },
  {
    fecha: "25 Ene 2025",
    tipo: "Ganancia Pool Minería",
    monto: "+38 USDC",
    pool: "Pool Minería",
  },
  {
    fecha: "22 Ene 2025",
    tipo: "Ganancia Pool Agroindustria",
    monto: "+12 USDC",
    pool: "Pool Agroindustria",
  },
  {
    fecha: "18 Ene 2025",
    tipo: "Ganancia Pool Perú A",
    monto: "+32 USDC",
    pool: "Pool Perú A",
  },
  {
    fecha: "15 Ene 2025",
    tipo: "Ganancia Pool Minería",
    monto: "+15 USDC",
    pool: "Pool Minería",
  },
];

export default function Rendimientos() {
  return (
    <div>
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-display font-bold">Rendimientos</h1>
        <p className="text-muted-foreground">
          Historial de ganancias y rendimiento de tu inversión
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-4 mb-8">
        <Card>
          <CardContent className="pt-6 text-center">
            <p className="text-sm text-muted-foreground">Ganancia Total</p>
            <p className="text-3xl font-display font-bold text-success">
              1,842 USDC
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Últimos 6 meses
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <p className="text-sm text-muted-foreground">APY Promedio</p>
            <p className="text-3xl font-display font-bold">24.5%</p>
            <p className="text-xs text-muted-foreground mt-1">
              Compounding automático
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <p className="text-sm text-muted-foreground">Facturas Pagadas</p>
            <p className="text-3xl font-display font-bold">57</p>
            <p className="text-xs text-muted-foreground mt-1">Sin impagos</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="font-display flex items-center gap-2">
                <Calendar className="h-5 w-5" /> Rendimiento Mensual
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {monthly.map((m) => (
                <div
                  key={m.mes}
                  className="flex items-center justify-between p-3 rounded-lg border border-border"
                >
                  <div>
                    <p className="font-medium text-sm">{m.mes}</p>
                    <p className="text-xs text-muted-foreground">
                      {m.facturasPagadas} facturas pagadas
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-display font-bold text-success">
                      {m.ganancia}
                    </p>
                    <p className="text-xs text-muted-foreground">{m.apy} APY</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="font-display flex items-center gap-2">
                <TrendingUp className="h-5 w-5" /> Últimas Ganancias
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {transactions.map((t, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-3 rounded-lg border border-border"
                >
                  <div>
                    <p className="font-medium text-sm">{t.tipo}</p>
                    <p className="text-xs text-muted-foreground">{t.fecha}</p>
                  </div>
                  <Badge
                    variant="secondary"
                    className="bg-success/10 text-success font-display"
                  >
                    {t.monto}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
