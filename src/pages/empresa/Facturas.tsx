import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Eye } from "lucide-react";

const invoices = [
  {
    id: "F-2025-0847",
    pyme: "Textiles SAC",
    monto: "S/ 28,500",
    vencimiento: "15 Mar 2025",
    status: "CONFIRMADA",
    color: "bg-success/10 text-success",
  },
  {
    id: "F-2025-0901",
    pyme: "Logística Andina",
    monto: "S/ 12,800",
    vencimiento: "22 Mar 2025",
    status: "PENDIENTE",
    color: "bg-primary/10 text-primary",
  },
  {
    id: "F-2025-0915",
    pyme: "AgroPerú SRL",
    monto: "S/ 35,200",
    vencimiento: "01 Abr 2025",
    status: "PENDIENTE",
    color: "bg-primary/10 text-primary",
  },
  {
    id: "F-2025-0920",
    pyme: "Tech Solutions",
    monto: "S/ 9,750",
    vencimiento: "10 Abr 2025",
    status: "TOKENIZADA",
    color: "bg-blue-500/10 text-blue-500",
  },
  {
    id: "F-2025-0889",
    pyme: "Metales del Sur",
    monto: "S/ 55,000",
    vencimiento: "28 Feb 2025",
    status: "PAGADA",
    color: "bg-muted text-muted-foreground",
  },
  {
    id: "F-2025-0830",
    pyme: "Distribuidora Lima",
    monto: "S/ 18,300",
    vencimiento: "05 Mar 2025",
    status: "CONFIRMADA",
    color: "bg-success/10 text-success",
  },
  {
    id: "F-2025-0812",
    pyme: "Servicios Norte",
    monto: "S/ 42,100",
    vencimiento: "20 Feb 2025",
    status: "PAGADA",
    color: "bg-muted text-muted-foreground",
  },
];

export default function Facturas() {
  return (
    <div>
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-display font-bold">Facturas</h1>
        <p className="text-muted-foreground">
          Listado completo de facturas tokenizadas de tus proveedores
        </p>
      </motion.div>

      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center gap-4 justify-between">
            <CardTitle className="font-display">Todas las Facturas</CardTitle>
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Buscar factura..." className="pl-9" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all">
            <TabsList className="mb-4">
              <TabsTrigger value="all">Todas</TabsTrigger>
              <TabsTrigger value="pendiente">Pendientes</TabsTrigger>
              <TabsTrigger value="confirmada">Confirmadas</TabsTrigger>
              <TabsTrigger value="tokenizada">Tokenizadas</TabsTrigger>
              <TabsTrigger value="pagada">Pagadas</TabsTrigger>
            </TabsList>

            <TabsContent value="all">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border text-left text-sm text-muted-foreground">
                      <th className="pb-3 font-medium">Factura</th>
                      <th className="pb-3 font-medium">Proveedor PyME</th>
                      <th className="pb-3 font-medium">Monto</th>
                      <th className="pb-3 font-medium">Vencimiento</th>
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
                          {inv.pyme}
                        </td>
                        <td className="py-4 text-sm font-medium">
                          {inv.monto}
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
                          <Button variant="ghost" size="sm" className="gap-1">
                            <Eye className="h-3 w-3" /> Ver
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>

            {["pendiente", "confirmada", "tokenizada", "pagada"].map((tab) => (
              <TabsContent key={tab} value={tab}>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border text-left text-sm text-muted-foreground">
                        <th className="pb-3 font-medium">Factura</th>
                        <th className="pb-3 font-medium">Proveedor PyME</th>
                        <th className="pb-3 font-medium">Monto</th>
                        <th className="pb-3 font-medium">Vencimiento</th>
                        <th className="pb-3 font-medium">Estado</th>
                      </tr>
                    </thead>
                    <tbody>
                      {invoices
                        .filter((inv) => inv.status.toLowerCase() === tab)
                        .map((inv) => (
                          <tr
                            key={inv.id}
                            className="border-b border-border/50 last:border-0"
                          >
                            <td className="py-4 font-medium text-sm">
                              {inv.id}
                            </td>
                            <td className="py-4 text-sm text-muted-foreground">
                              {inv.pyme}
                            </td>
                            <td className="py-4 text-sm font-medium">
                              {inv.monto}
                            </td>
                            <td className="py-4 text-sm text-muted-foreground">
                              {inv.vencimiento}
                            </td>
                            <td className="py-4">
                              <Badge variant="secondary" className={inv.color}>
                                {inv.status}
                              </Badge>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
