import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, XCircle, FileText, AlertTriangle } from "lucide-react";
import { useState } from "react";

const pending = [
  {
    id: "F-2025-0901",
    pyme: "Logística Andina",
    monto: "S/ 12,800",
    emision: "01 Feb 2025",
    vencimiento: "22 Mar 2025",
    descripcion: "Servicio de transporte de carga - Ruta Lima-Arequipa",
    hash: "0xabc...123",
  },
  {
    id: "F-2025-0915",
    pyme: "AgroPerú SRL",
    monto: "S/ 35,200",
    emision: "05 Feb 2025",
    vencimiento: "01 Abr 2025",
    descripcion: "Suministro de insumos agrícolas - Lote #2847",
    hash: "0xdef...456",
  },
  {
    id: "F-2025-0932",
    pyme: "Envases Lima",
    monto: "S/ 8,400",
    emision: "08 Feb 2025",
    vencimiento: "15 Abr 2025",
    descripcion: "Embalaje industrial - Orden de compra #1293",
    hash: "0xghi...789",
  },
];

export default function ConfirmarFacturas() {
  const [actions, setActions] = useState<
    Record<string, "confirmed" | "rejected">
  >({});

  const handleAction = (id: string, action: "confirmed" | "rejected") => {
    setActions((prev) => ({ ...prev, [id]: action }));
  };

  const pendingItems = pending.filter((p) => !actions[p.id]);

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-display font-bold">Confirmar Facturas</h1>
        <p className="text-muted-foreground">
          Revisa y da conformidad a las facturas de tus proveedores PyME
        </p>
      </motion.div>

      {pendingItems.length === 0 ? (
        <Card>
          <CardContent className="pt-6 text-center py-12">
            <CheckCircle2 className="h-12 w-12 mx-auto mb-3 text-success" />
            <h3 className="font-display font-bold text-lg">¡Todo al día!</h3>
            <p className="text-muted-foreground">
              No hay facturas pendientes de confirmación
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center gap-2 p-3 rounded-lg bg-primary/5 border border-primary/20">
            <AlertTriangle className="h-4 w-4 text-primary" />
            <p className="text-sm text-primary">
              {pendingItems.length} facturas requieren tu conformidad
            </p>
          </div>

          {pending.map((inv) => {
            const action = actions[inv.id];
            if (action) {
              return (
                <motion.div
                  key={inv.id}
                  initial={{ opacity: 1 }}
                  animate={{ opacity: 0.6 }}
                >
                  <Card className="border-dashed">
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <FileText className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <p className="font-medium">{inv.id}</p>
                            <p className="text-sm text-muted-foreground">
                              {inv.pyme}
                            </p>
                          </div>
                        </div>
                        <Badge
                          variant="secondary"
                          className={
                            action === "confirmed"
                              ? "bg-success/10 text-success"
                              : "bg-destructive/10 text-destructive"
                          }
                        >
                          {action === "confirmed"
                            ? "✓ Confirmada"
                            : "✗ Rechazada"}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            }

            return (
              <motion.div
                key={inv.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                      <div className="space-y-3 flex-1">
                        <div className="flex items-center gap-3">
                          <FileText className="h-5 w-5 text-primary" />
                          <div>
                            <h4 className="font-display font-semibold">
                              {inv.id}
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              {inv.pyme}
                            </p>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {inv.descripcion}
                        </p>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                          <div>
                            <p className="text-xs text-muted-foreground">
                              Monto
                            </p>
                            <p className="font-medium">{inv.monto}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">
                              Emisión
                            </p>
                            <p className="font-medium">{inv.emision}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">
                              Vencimiento
                            </p>
                            <p className="font-medium">{inv.vencimiento}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">
                              Hash Blockchain
                            </p>
                            <p className="font-medium font-mono text-xs">
                              {inv.hash}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2 shrink-0">
                        <Button
                          size="sm"
                          className="bg-success/10 text-success hover:bg-success/20 border border-success/30 gap-1"
                          variant="outline"
                          onClick={() => handleAction(inv.id, "confirmed")}
                        >
                          <CheckCircle2 className="h-4 w-4" /> Confirmar
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-destructive border-destructive/30 hover:bg-destructive/10 gap-1"
                          onClick={() => handleAction(inv.id, "rejected")}
                        >
                          <XCircle className="h-4 w-4" /> Rechazar
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
