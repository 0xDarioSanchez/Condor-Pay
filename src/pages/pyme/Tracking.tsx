import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  FileUp,
  ShieldCheck,
  Coins,
  CheckCircle,
  Clock,
  CreditCard,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const trackedInvoices = [
  {
    id: "E001-354",
    empresa: "CONFECCIONES Y DISTRIBUCIONES S.A.C.",
    monto: "S/ 10,000",
    status: "FINANCIADA",
    timeline: [
      {
        label: "Factura subida",
        date: "14 Feb 2026 09:00",
        done: true,
        icon: FileUp,
      },
      {
        label: "Validación automática",
        date: "14 Feb 2026 09:05",
        done: true,
        icon: ShieldCheck,
      },
      {
        label: "Tokenizada en Stellar",
        date: "14 Feb 2026 09:08",
        done: true,
        icon: Coins,
      },
      {
        label: "Aprobada por pool",
        date: "14 Feb 2026 09:15",
        done: true,
        icon: CheckCircle,
      },
      {
        label: "USDC recibido",
        date: "14 Feb 2026 10:30",
        done: true,
        icon: CreditCard,
      },
      {
        label: "Esperando vencimiento",
        date: "17 Mar 2026",
        done: false,
        icon: Clock,
      },
      { label: "Pago empresa", date: "—", done: false, icon: CreditCard },
    ],
  },
  {
    id: "F-2025-0847",
    empresa: "Minera Cerro SAC",
    monto: "S/ 28,500",
    status: "FINANCIADA",
    timeline: [
      {
        label: "Factura subida",
        date: "15 Ene 09:00",
        done: true,
        icon: FileUp,
      },
      {
        label: "Validación automática",
        date: "15 Ene 09:05",
        done: true,
        icon: ShieldCheck,
      },
      {
        label: "Tokenizada en Stellar",
        date: "15 Ene 09:08",
        done: true,
        icon: Coins,
      },
      {
        label: "Aprobada por pool",
        date: "15 Ene 09:15",
        done: true,
        icon: CheckCircle,
      },
      {
        label: "USDC recibido",
        date: "15 Ene 10:30",
        done: true,
        icon: CreditCard,
      },
      {
        label: "Esperando vencimiento",
        date: "15 Mar",
        done: false,
        icon: Clock,
      },
      { label: "Pago empresa", date: "—", done: false, icon: CreditCard },
    ],
  },
  {
    id: "F-2025-0912",
    empresa: "Alicorp S.A.A.",
    monto: "S/ 15,200",
    status: "TOKENIZADA",
    timeline: [
      {
        label: "Factura subida",
        date: "20 Ene 14:00",
        done: true,
        icon: FileUp,
      },
      {
        label: "Validación automática",
        date: "20 Ene 14:03",
        done: true,
        icon: ShieldCheck,
      },
      {
        label: "Tokenizada en Stellar",
        date: "20 Ene 14:06",
        done: true,
        icon: Coins,
      },
      {
        label: "Validación pool",
        date: "En proceso",
        done: false,
        icon: Clock,
      },
      { label: "USDC recibido", date: "—", done: false, icon: CreditCard },
    ],
  },
];

export default function Tracking() {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <h1 className="text-3xl font-display font-bold mb-1">
          Tracking de Facturas
        </h1>
        <p className="text-muted-foreground mb-8">
          Sigue el estado de tus facturas en tiempo real
        </p>
      </motion.div>

      <div className="space-y-6">
        {trackedInvoices.map((inv, idx) => (
          <motion.div
            key={inv.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.15 }}
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="font-display text-lg">
                    {inv.id}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    {inv.empresa} · {inv.monto}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge
                    variant="secondary"
                    className="bg-primary/10 text-primary"
                  >
                    {inv.status}
                  </Badge>
                  <Button variant="ghost" size="sm" className="gap-1 text-xs">
                    <ExternalLink className="h-3 w-3" /> Blockchain
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="relative ml-6">
                  {inv.timeline.map((step, i) => {
                    const isLast = i === inv.timeline.length - 1;
                    const isCurrent =
                      !step.done && (i === 0 || inv.timeline[i - 1]?.done);
                    const StepIcon = step.icon;

                    return (
                      <div key={step.date} className="relative pb-8 last:pb-0">
                        {/* Vertical line */}
                        {!isLast && (
                          <div
                            className={`absolute left-5 top-10 w-px h-full ${
                              step.done ? "bg-primary" : "bg-border"
                            }`}
                          />
                        )}

                        <div className="flex items-start gap-4">
                          {/* Icon circle */}
                          <div
                            className={`relative z-10 shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                              step.done
                                ? "gradient-gold"
                                : isCurrent
                                  ? "bg-primary/20 border-2 border-primary"
                                  : "bg-muted border border-border"
                            }`}
                          >
                            <StepIcon
                              className={`h-4 w-4 ${
                                step.done
                                  ? "text-gold-foreground"
                                  : isCurrent
                                    ? "text-primary animate-pulse"
                                    : "text-muted-foreground"
                              }`}
                            />
                          </div>

                          {/* Content */}
                          <div className="pt-2">
                            <p
                              className={`text-sm font-medium ${step.done ? "text-foreground" : "text-muted-foreground"}`}
                            >
                              {step.label}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {step.date}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </>
  );
}
