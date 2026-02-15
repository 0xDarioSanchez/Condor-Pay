import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User, Shield, Clock, DollarSign, Edit2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

const levels = [
  { name: "Explorador", min: 0 },
  { name: "Activo", min: 25 },
  { name: "Inversionista Estratégico", min: 50 },
  { name: "Partner", min: 75 },
];

export default function PerfilInversionista() {
  const [editing, setEditing] = useState(false);
  const currentLevel = 2;
  const progress = 72;

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-display font-bold">Mi Perfil</h1>
        <p className="text-muted-foreground">
          Tu información y reputación como inversionista
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Reputation */}
        <Card>
          <CardContent className="pt-6">
            <div className="text-center mb-6">
              <div className="w-20 h-20 rounded-full gradient-gold flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl font-display font-bold text-gold-foreground">
                  A+
                </span>
              </div>
              <Badge className="gradient-gold text-gold-foreground text-lg px-4 py-1 mb-2">
                {levels[currentLevel].name}
              </Badge>
              <p className="text-sm text-muted-foreground">Score: 92/100</p>
            </div>

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
                <span className="text-muted-foreground">Progreso</span>
                <span className="font-medium">{progress}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          </CardContent>
        </Card>

        {/* Data */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="font-display flex items-center gap-2">
                <User className="h-5 w-5" /> Datos Personales
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
                  { label: "Nombre", value: "Carlos Mendoza" },
                  { label: "DNI / Pasaporte", value: "87654321" },
                  { label: "Email", value: "carlos@inversiones.pe" },
                  { label: "Dirección", value: "Calle Falsa 123, Lima" },
                  { label: "Wallet", value: "GCDJ...X4KF" },
                  { label: "KYC", value: "Verificado ✓" },
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

          <Card>
            <CardHeader>
              <CardTitle className="font-display flex items-center gap-2">
                <Shield className="h-5 w-5" /> Métricas
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                {
                  label: "Capital invertido total",
                  value: "$45,200 USDC",
                  icon: DollarSign,
                },
                {
                  label: "Tiempo en plataforma",
                  value: "6 meses",
                  icon: Clock,
                },
                { label: "Retiros exitosos", value: "4", icon: Shield },
                { label: "Nivel de riesgo", value: "Moderado", icon: Shield },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between py-2 border-b border-border last:border-0"
                >
                  <div className="flex items-center gap-2">
                    <item.icon className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      {item.label}
                    </span>
                  </div>
                  <span className="text-sm font-medium">{item.value}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
