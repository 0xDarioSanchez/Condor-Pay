import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, DollarSign, TrendingUp, FileText } from "lucide-react";
import { Link } from "react-router-dom";
import { WalletConnect } from "@/components/front/WalletConnect";

const stats = [
  {
    label: "Facturas Activas",
    value: "12",
    icon: FileText,
    trend: "+3 este mes",
  },
  {
    label: "Monto Total",
    value: "S/ 145,000",
    icon: DollarSign,
    trend: "+22%",
  },
  {
    label: "Liquidez Recibida",
    value: "4,850 USDC",
    icon: TrendingUp,
    trend: "Último pago hoy",
  },
  {
    label: "Tiempo Promedio",
    value: "< 18h",
    icon: Clock,
    trend: "Mejora vs mes anterior",
  },
];

const invoices = [
  {
    id: "F-2025-0847",
    empresa: "Minera Cerro SAC",
    monto: "S/ 28,500",
    status: "FINANCIADA",
    color: "bg-success/10 text-success",
  },
  {
    id: "F-2025-0912",
    empresa: "Alicorp S.A.A.",
    monto: "S/ 15,200",
    status: "TOKENIZADA",
    color: "bg-primary/10 text-primary",
  },
  {
    id: "F-2025-0933",
    empresa: "Cementos Pacasmayo",
    monto: "S/ 42,000",
    status: "CONFIRMADA",
    color: "bg-blue-500/10 text-blue-500",
  },
  {
    id: "F-2025-0951",
    empresa: "Gloria S.A.",
    monto: "S/ 8,300",
    status: "BORRADOR",
    color: "bg-muted text-muted-foreground",
  },
];

export default function PymeHome() {
  return (
    <>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h1 className="text-3xl font-display font-bold">Dashboard PyME</h1>
          <p className="text-muted-foreground">
            Gestiona tus facturas y obtén liquidez
          </p>
        </motion.div>
        <WalletConnect />
      </div>

      {/* Stats */}
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
                <p className="text-xs text-muted-foreground mt-1">{s.trend}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Recent Invoices */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card>
          <div className="flex items-center justify-between p-6 pb-0">
            <h3 className="text-lg font-display font-semibold">
              Facturas Recientes
            </h3>
            <Link to="/dashboard/pyme/facturas">
              <Button variant="ghost" size="sm">
                Ver todas
              </Button>
            </Link>
          </div>
          <CardContent className="pt-4">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border text-left text-sm text-muted-foreground">
                    <th className="pb-3 font-medium">Factura</th>
                    <th className="pb-3 font-medium">Empresa</th>
                    <th className="pb-3 font-medium">Monto</th>
                    <th className="pb-3 font-medium">Estado</th>
                    <th className="pb-3 font-medium"></th>
                  </tr>
                </thead>
                <tbody>
                  {invoices.map((inv) => (
                    <tr
                      key={inv.id}
                      className="border-b border-border/50 last:border-0"
                    >
                      <td className="py-4 font-medium text-sm">{inv.id}</td>
                      <td className="py-4 text-sm text-muted-foreground">
                        {inv.empresa}
                      </td>
                      <td className="py-4 text-sm font-medium">{inv.monto}</td>
                      <td className="py-4">
                        <Badge variant="secondary" className={inv.color}>
                          {inv.status}
                        </Badge>
                      </td>
                      <td className="py-4">
                        <Button variant="ghost" size="sm">
                          Ver
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Pool Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-6"
      >
        <Card className="border-primary/20">
          <CardContent className="pt-6">
            <h4 className="font-display font-semibold mb-3">
              💼 Pool de Liquidez CondorPay
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Capital total</p>
                <p className="font-semibold">$1,000,000</p>
              </div>
              <div>
                <p className="text-muted-foreground">Inversores activos</p>
                <p className="font-semibold">247</p>
              </div>
              <div>
                <p className="text-muted-foreground">Facturas activas</p>
                <p className="font-semibold">36</p>
              </div>
              <div>
                <p className="text-muted-foreground">APY promedio</p>
                <p className="font-semibold text-success">26%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </>
  );
}
