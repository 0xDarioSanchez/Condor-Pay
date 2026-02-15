import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Shield, TrendingUp, User, Edit2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

const levels = [
  { name: "Nuevo", min: 0, color: "bg-muted text-muted-foreground" },
  { name: "Verificado", min: 25, color: "bg-blue-500/10 text-blue-500" },
  { name: "Historial Sólido", min: 50, color: "bg-primary/10 text-primary" },
  {
    name: "PyME Premium",
    min: 75,
    color: "gradient-gold text-gold-foreground",
  },
];

export default function Perfil() {
  const [editing, setEditing] = useState(false);
  const currentLevel = 2; // Historial Sólido
  const progress = 62;

  return (
    <>
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <h1 className="text-3xl font-display font-bold mb-1">Mi Perfil</h1>
        <p className="text-muted-foreground mb-8">
          Tu información y reputación en CondorPay
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Reputation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-1"
        >
          <Card>
            <CardContent className="pt-6">
              <div className="text-center mb-6">
                <div className="w-20 h-20 rounded-full gradient-gold flex items-center justify-center mx-auto mb-3">
                  <Star className="h-10 w-10 text-gold-foreground" />
                </div>
                <Badge className="gradient-gold text-gold-foreground text-lg px-4 py-1 mb-2">
                  {levels[currentLevel].name}
                </Badge>
                <p className="text-sm text-muted-foreground">
                  Nivel {currentLevel + 1} de {levels.length}
                </p>
              </div>

              {/* Level progress */}
              <div className="space-y-3">
                {levels.map((level, i) => (
                  <div key={level.name} className="flex items-center gap-3">
                    <div
                      className={`w-3 h-3 rounded-full ${i <= currentLevel ? "bg-primary" : "bg-muted"}`}
                    />
                    <span
                      className={`text-sm ${i <= currentLevel ? "font-medium text-foreground" : "text-muted-foreground"}`}
                    >
                      {level.name}
                    </span>
                    {i === currentLevel && (
                      <Badge variant="outline" className="ml-auto text-xs">
                        Actual
                      </Badge>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-6">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-muted-foreground">
                    Progreso al siguiente nivel
                  </span>
                  <span className="font-medium">{progress}%</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Datos + Métricas */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-2 space-y-6"
        >
          {/* Datos editables */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="font-display flex items-center gap-2">
                <User className="h-5 w-5" /> Datos de la PyME
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                className="gap-1"
                onClick={() => setEditing(!editing)}
              >
                <Edit2 className="h-3 w-3" /> {editing ? "Guardar" : "Editar"}
              </Button>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { label: "RUC", value: "20512345678" },
                  { label: "Razón Social", value: "Textiles del Perú S.A.C." },
                  { label: "Representante Legal", value: "Carlos Pérez" },
                  { label: "DNI", value: "12345678" },
                  { label: "Dirección", value: "Av. Industrial 123, Lima" },
                  { label: "Estado", value: "Verificado ✓" },
                ].map((field) => (
                  <div key={field.label}>
                    <Label className="text-xs text-muted-foreground">
                      {field.label}
                    </Label>
                    {editing ? (
                      <Input defaultValue={field.value} className="mt-1" />
                    ) : (
                      <p className="text-sm font-medium mt-1">{field.value}</p>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Métricas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="font-display flex items-center gap-2 text-base">
                  <Shield className="h-5 w-5" /> Límites
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-muted-foreground">Crédito usado</span>
                    <span className="font-medium">S/ 93,800 / S/ 150,000</span>
                  </div>
                  <Progress value={62} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-muted-foreground">
                      Facturas activas
                    </span>
                    <span className="font-medium">12 / 20</span>
                  </div>
                  <Progress value={60} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="font-display flex items-center gap-2 text-base">
                  <TrendingUp className="h-5 w-5" /> Métricas
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { label: "Total facturado", value: "S/ 245,000" },
                  { label: "Facturas pagadas", value: "28" },
                  { label: "Tasa promedio", value: "3.8%", highlight: true },
                  { label: "Tiempo promedio pago", value: "16h" },
                ].map((m) => (
                  <div key={m.label} className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{m.label}</span>
                    <span
                      className={`font-medium ${m.highlight ? "text-primary" : ""}`}
                    >
                      {m.value}
                    </span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </div>
    </>
  );
}
