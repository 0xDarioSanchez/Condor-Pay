import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  FileText,
  CheckCircle2,
  Clock,
  Building2,
  DollarSign,
} from "lucide-react";
import { Link } from "react-router-dom";

const stats = [
  { label: "Facturas Asociadas", value: "47", icon: FileText },
  { label: "Confirmadas", value: "38", icon: CheckCircle2 },
  { label: "Pendientes", value: "6", icon: Clock },
  { label: "Proveedores PyME", value: "15", icon: Building2 },
];

const recentInvoices = [
  {
    id: "F-2025-0901",
    pyme: "Logística Andina",
    monto: "S/ 12,800",
    status: "PENDIENTE",
    color: "bg-primary/10 text-primary",
  },
  {
    id: "F-2025-0915",
    pyme: "AgroPerú SRL",
    monto: "S/ 35,200",
    status: "PENDIENTE",
    color: "bg-primary/10 text-primary",
  },
  {
    id: "F-2025-0847",
    pyme: "Textiles SAC",
    monto: "S/ 28,500",
    status: "CONFIRMADA",
    color: "bg-success/10 text-success",
  },
  {
    id: "F-2025-0920",
    pyme: "Tech Solutions",
    monto: "S/ 9,750",
    status: "TOKENIZADA",
    color: "bg-blue-500/10 text-blue-500",
  },
];

export default function EmpresaHome() {
  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h1 className="text-3xl font-display font-bold">Portal Empresa</h1>
          <p className="text-muted-foreground">
            Visualiza, confirma y paga facturas de tus proveedores
          </p>
        </motion.div>
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
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg gradient-gold flex items-center justify-center">
                    <s.icon className="h-5 w-5 text-gold-foreground" />
                  </div>
                  <div>
                    <p className="text-2xl font-display font-bold">{s.value}</p>
                    <p className="text-xs text-muted-foreground">{s.label}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
        <Link to="/dashboard/empresa/confirmar">
          <Button
            variant="outline"
            className="w-full h-auto py-4 flex-col gap-2"
          >
            <CheckCircle2 className="h-5 w-5 text-success" />
            <span className="text-sm">Confirmar Facturas</span>
          </Button>
        </Link>
        <Link to="/dashboard/empresa/facturas">
          <Button
            variant="outline"
            className="w-full h-auto py-4 flex-col gap-2"
          >
            <FileText className="h-5 w-5 text-primary" />
            <span className="text-sm">Ver Pendientes</span>
          </Button>
        </Link>
        <Link to="/dashboard/empresa/historial">
          <Button
            variant="outline"
            className="w-full h-auto py-4 flex-col gap-2"
          >
            <DollarSign className="h-5 w-5 text-primary" />
            <span className="text-sm">Pagar Facturas</span>
          </Button>
        </Link>
        <Link to="/dashboard/empresa/perfil">
          <Button
            variant="outline"
            className="w-full h-auto py-4 flex-col gap-2"
          >
            <Building2 className="h-5 w-5 text-muted-foreground" />
            <span className="text-sm">Datos Bancarios</span>
          </Button>
        </Link>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="font-display">Facturas Recientes</CardTitle>
            <div className="flex gap-2">
              <Link to="/dashboard/empresa/confirmar">
                <Button
                  size="sm"
                  className="gradient-gold text-gold-foreground gap-1"
                >
                  <CheckCircle2 className="h-3 w-3" /> Pendientes (
                  {stats[2].value})
                </Button>
              </Link>
              <Link to="/dashboard/empresa/facturas">
                <Button variant="outline" size="sm">
                  Ver todas
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentInvoices.map((inv) => (
                <div
                  key={inv.id}
                  className="flex items-center justify-between p-3 rounded-lg border border-border"
                >
                  <div>
                    <p className="font-medium text-sm">{inv.id}</p>
                    <p className="text-xs text-muted-foreground">{inv.pyme}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <p className="text-sm font-medium">{inv.monto}</p>
                    <Badge variant="secondary" className={inv.color}>
                      {inv.status}
                    </Badge>
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
