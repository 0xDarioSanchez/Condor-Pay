import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, Download } from "lucide-react";
import { useState } from "react";

const allInvoices = [
  {
    id: "F-2025-0847",
    empresa: "Minera Cerro SAC",
    monto: "S/ 28,500",
    fecha: "2025-01-15",
    vencimiento: "2025-03-15",
    status: "FINANCIADA",
    color: "bg-success/10 text-success",
  },
  {
    id: "F-2025-0912",
    empresa: "Alicorp S.A.A.",
    monto: "S/ 15,200",
    fecha: "2025-01-20",
    vencimiento: "2025-03-20",
    status: "TOKENIZADA",
    color: "bg-primary/10 text-primary",
  },
  {
    id: "F-2025-0933",
    empresa: "Cementos Pacasmayo",
    monto: "S/ 42,000",
    fecha: "2025-01-22",
    vencimiento: "2025-04-22",
    status: "CONFIRMADA",
    color: "bg-blue-500/10 text-blue-500",
  },
  {
    id: "F-2025-0951",
    empresa: "Gloria S.A.",
    monto: "S/ 8,300",
    fecha: "2025-01-25",
    vencimiento: "2025-03-25",
    status: "BORRADOR",
    color: "bg-muted text-muted-foreground",
  },
  {
    id: "F-2025-0820",
    empresa: "Backus SAB",
    monto: "S/ 22,100",
    fecha: "2024-12-10",
    vencimiento: "2025-02-10",
    status: "PAGADA",
    color: "bg-success/10 text-success",
  },
  {
    id: "F-2025-0799",
    empresa: "Ferreyros S.A.",
    monto: "S/ 35,000",
    fecha: "2024-12-01",
    vencimiento: "2025-02-01",
    status: "PAGADA",
    color: "bg-success/10 text-success",
  },
];

const filters = [
  "Todas",
  "BORRADOR",
  "TOKENIZADA",
  "FINANCIADA",
  "CONFIRMADA",
  "PAGADA",
];

export default function MisFacturas() {
  const [activeFilter, setActiveFilter] = useState("Todas");
  const [search, setSearch] = useState("");

  const filtered = allInvoices.filter((inv) => {
    const matchFilter = activeFilter === "Todas" || inv.status === activeFilter;
    const matchSearch =
      inv.id.toLowerCase().includes(search.toLowerCase()) ||
      inv.empresa.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  return (
    <>
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <h1 className="text-3xl font-display font-bold mb-1">Mis Facturas</h1>
        <p className="text-muted-foreground mb-6">
          Historial completo de tus facturas
        </p>
      </motion.div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por factura o empresa..."
            className="pl-10"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Button variant="outline" className="gap-2">
          <Download className="h-4 w-4" /> Exportar
        </Button>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {filters.map((f) => (
          <Button
            key={f}
            variant={activeFilter === f ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveFilter(f)}
            className={
              activeFilter === f ? "gradient-gold text-gold-foreground" : ""
            }
          >
            {f}
          </Button>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card>
          <CardContent className="pt-6">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border text-left text-sm text-muted-foreground">
                    <th className="pb-3 font-medium">Factura</th>
                    <th className="pb-3 font-medium">Empresa</th>
                    <th className="pb-3 font-medium">Monto</th>
                    <th className="pb-3 font-medium">Emisión</th>
                    <th className="pb-3 font-medium">Vencimiento</th>
                    <th className="pb-3 font-medium">Estado</th>
                    <th className="pb-3 font-medium"></th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((inv) => (
                    <tr
                      key={inv.id}
                      className="border-b border-border/50 last:border-0"
                    >
                      <td className="py-4 font-medium text-sm">{inv.id}</td>
                      <td className="py-4 text-sm text-muted-foreground">
                        {inv.empresa}
                      </td>
                      <td className="py-4 text-sm font-medium">{inv.monto}</td>
                      <td className="py-4 text-sm text-muted-foreground">
                        {inv.fecha}
                      </td>
                      <td className="py-4 text-sm text-muted-foreground">
                        {inv.vencimiento}
                      </td>
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
              {filtered.length === 0 && (
                <p className="text-center text-muted-foreground py-8">
                  No se encontraron facturas
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </>
  );
}
