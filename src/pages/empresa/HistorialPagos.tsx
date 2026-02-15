import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { History, CheckCircle2, DollarSign } from "lucide-react";

const pagos = [
  {
    id: "F-2025-0812",
    pyme: "Servicios Norte",
    monto: "S/ 42,100",
    fechaPago: "18 Feb 2025",
    metodo: "Transferencia bancaria",
  },
  {
    id: "F-2025-0889",
    pyme: "Metales del Sur",
    monto: "S/ 55,000",
    fechaPago: "25 Feb 2025",
    metodo: "Transferencia bancaria",
  },
  {
    id: "F-2025-0790",
    pyme: "Textiles SAC",
    monto: "S/ 15,800",
    fechaPago: "10 Feb 2025",
    metodo: "Transferencia bancaria",
  },
  {
    id: "F-2025-0765",
    pyme: "AgroPerú SRL",
    monto: "S/ 22,400",
    fechaPago: "02 Feb 2025",
    metodo: "Transferencia bancaria",
  },
  {
    id: "F-2025-0730",
    pyme: "Logística Andina",
    monto: "S/ 8,900",
    fechaPago: "28 Ene 2025",
    metodo: "Transferencia bancaria",
  },
  {
    id: "F-2025-0710",
    pyme: "Distribuidora Lima",
    monto: "S/ 31,600",
    fechaPago: "20 Ene 2025",
    metodo: "Transferencia bancaria",
  },
];

const totalPagado = "S/ 175,800";

export default function HistorialPagos() {
  return (
    <div>
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-display font-bold">Historial de Pagos</h1>
        <p className="text-muted-foreground">
          Registro de todas las facturas pagadas
        </p>
      </motion.div>

      <div className="grid grid-cols-2 gap-4 mb-8">
        <Card>
          <CardContent className="pt-6 text-center">
            <DollarSign className="h-8 w-8 mx-auto mb-2 text-success" />
            <p className="text-2xl font-display font-bold">{totalPagado}</p>
            <p className="text-xs text-muted-foreground">Total pagado</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <CheckCircle2 className="h-8 w-8 mx-auto mb-2 text-success" />
            <p className="text-2xl font-display font-bold">{pagos.length}</p>
            <p className="text-xs text-muted-foreground">Facturas pagadas</p>
          </CardContent>
        </Card>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="font-display flex items-center gap-2">
              <History className="h-5 w-5" /> Pagos Realizados
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border text-left text-sm text-muted-foreground">
                    <th className="pb-3 font-medium">Factura</th>
                    <th className="pb-3 font-medium">Proveedor</th>
                    <th className="pb-3 font-medium">Monto</th>
                    <th className="pb-3 font-medium">Fecha Pago</th>
                    <th className="pb-3 font-medium">Método</th>
                    <th className="pb-3 font-medium">Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {pagos.map((p) => (
                    <tr
                      key={p.id}
                      className="border-b border-border/50 last:border-0"
                    >
                      <td className="py-4 font-medium text-sm">{p.id}</td>
                      <td className="py-4 text-sm text-muted-foreground">
                        {p.pyme}
                      </td>
                      <td className="py-4 text-sm font-medium">{p.monto}</td>
                      <td className="py-4 text-sm text-muted-foreground">
                        {p.fechaPago}
                      </td>
                      <td className="py-4 text-sm text-muted-foreground">
                        {p.metodo}
                      </td>
                      <td className="py-4">
                        <Badge
                          variant="secondary"
                          className="bg-success/10 text-success"
                        >
                          PAGADA
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
