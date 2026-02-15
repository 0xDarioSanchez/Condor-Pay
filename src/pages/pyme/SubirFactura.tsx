import { motion } from "framer-motion";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { FileUp, Upload, CheckCircle, ArrowRight, X } from "lucide-react";

type Step = "upload" | "validating" | "data" | "offer" | "confirmed";

export default function SubirFactura() {
  const [step, setStep] = useState<Step>("upload");
  const [fileName, setFileName] = useState("");
  const [dragOver, setDragOver] = useState(false);

  const handleFileSelect = (name: string) => {
    setFileName(name);
    setStep("validating");
    setTimeout(() => setStep("data"), 2000);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFileSelect(file.name);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <h1 className="text-3xl font-display font-bold mb-1">Subir Factura</h1>
        <p className="text-muted-foreground mb-8">
          Sube tu factura XML/PDF y obtén liquidez en menos de 24 horas
        </p>
      </motion.div>

      {/* Progress Steps */}
      <div className="flex items-center gap-2 mb-8 text-sm">
        {["Subir", "Validar", "Datos", "Oferta", "Confirmar"].map(
          (label, i) => {
            const steps: Step[] = [
              "upload",
              "validating",
              "data",
              "offer",
              "confirmed",
            ];
            const currentIdx = steps.indexOf(step);
            const isActive = i <= currentIdx;
            return (
              <div key={label} className="flex items-center gap-2">
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold ${isActive ? "gradient-gold text-gold-foreground" : "bg-muted text-muted-foreground"}`}
                >
                  {i + 1}
                </div>
                <span
                  className={
                    isActive
                      ? "text-foreground font-medium"
                      : "text-muted-foreground"
                  }
                >
                  {label}
                </span>
                {i < 4 && (
                  <ArrowRight className="h-3 w-3 text-muted-foreground" />
                )}
              </div>
            );
          },
        )}
      </div>

      {/* Upload Step */}
      {step === "upload" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card>
            <CardContent className="pt-6">
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragOver(true);
                }}
                onDragLeave={() => setDragOver(false)}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-xl p-12 text-center transition-colors ${dragOver ? "border-primary bg-primary/5" : "border-border"}`}
              >
                <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="font-display font-semibold text-lg mb-2">
                  Arrastra tu factura aquí
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Soportamos XML (SUNAT) y PDF
                </p>
                <label>
                  <input
                    type="file"
                    className="hidden"
                    accept=".xml,.pdf"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleFileSelect(file.name);
                    }}
                  />
                  <Button variant="outline" className="gap-2" asChild>
                    <span>
                      <FileUp className="h-4 w-4" /> Seleccionar archivo
                    </span>
                  </Button>
                </label>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Validating Step */}
      {step === "validating" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card>
            <CardContent className="pt-6 text-center py-16">
              <div className="w-16 h-16 rounded-full gradient-gold flex items-center justify-center mx-auto mb-4 animate-pulse-gold">
                <FileUp className="h-8 w-8 text-gold-foreground" />
              </div>
              <h3 className="font-display font-semibold text-lg mb-2">
                Validando factura...
              </h3>
              <p className="text-sm text-muted-foreground">{fileName}</p>
              <p className="text-xs text-muted-foreground mt-2">
                Verificando formato, montos y duplicados
              </p>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Data Step */}
      {step === "data" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-success" />
                <CardTitle className="font-display">Factura Válida</CardTitle>
                <Badge
                  variant="secondary"
                  className="bg-success/10 text-success"
                >
                  Verificada
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Número de Factura</Label>
                  <Input defaultValue="F001-00284" readOnly className="mt-1" />
                </div>
                <div>
                  <Label>RUC Emisor</Label>
                  <Input defaultValue="20512345678" readOnly className="mt-1" />
                </div>
                <div>
                  <Label>Empresa Pagadora</Label>
                  <Input
                    defaultValue="Minera Cerro SAC"
                    readOnly
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label>RUC Pagadora</Label>
                  <Input defaultValue="20498765432" readOnly className="mt-1" />
                </div>
                <div>
                  <Label>Monto Total</Label>
                  <Input
                    defaultValue="S/ 10,000.00"
                    readOnly
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label>Fecha de Vencimiento</Label>
                  <Input defaultValue="2025-04-10" readOnly className="mt-1" />
                </div>
              </div>
              <div>
                <Label>Descripción (opcional)</Label>
                <Input
                  placeholder="Servicios de consultoría técnica"
                  className="mt-1"
                />
              </div>
              <div className="flex gap-3 justify-end">
                <Button
                  variant="outline"
                  onClick={() => {
                    setStep("upload");
                    setFileName("");
                  }}
                >
                  Cancelar
                </Button>
                <Button
                  className="gradient-gold text-gold-foreground gap-2"
                  onClick={() => setStep("offer")}
                >
                  Solicitar Oferta <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Offer Step */}
      {step === "offer" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="border-primary/30 glow-gold">
            <CardHeader>
              <CardTitle className="font-display">
                Tu Oferta de Financiamiento
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Tasa calculada automáticamente por el sistema
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                <div className="text-center p-4 rounded-lg bg-muted/50">
                  <p className="text-xs text-muted-foreground mb-1">
                    Monto Factura
                  </p>
                  <p className="text-xl font-display font-bold">S/ 10,000</p>
                </div>
                <div className="text-center p-4 rounded-lg bg-muted/50">
                  <p className="text-xs text-muted-foreground mb-1">Plazo</p>
                  <p className="text-xl font-display font-bold">60 días</p>
                </div>
                <div className="text-center p-4 rounded-lg bg-muted/50">
                  <p className="text-xs text-muted-foreground mb-1">Tasa</p>
                  <p className="text-xl font-display font-bold text-primary">
                    3.5%
                  </p>
                </div>
                <div className="text-center p-4 rounded-lg bg-muted/50">
                  <p className="text-xs text-muted-foreground mb-1">
                    Descuento
                  </p>
                  <p className="text-xl font-display font-bold text-destructive">
                    -$350
                  </p>
                </div>
                <div className="text-center p-4 rounded-lg bg-success/10 col-span-2">
                  <p className="text-xs text-muted-foreground mb-1">
                    Recibirás
                  </p>
                  <p className="text-2xl font-display font-bold text-success">
                    9,650 USDC
                  </p>
                  <p className="text-xs text-muted-foreground">
                    en menos de 24 horas
                  </p>
                </div>
              </div>

              <div className="bg-muted/30 rounded-lg p-4 text-sm space-y-1">
                <p className="font-medium mb-2">Basado en:</p>
                <p className="text-muted-foreground">
                  • Rating empresa pagadora:{" "}
                  <span className="text-foreground font-medium">AA</span>
                </p>
                <p className="text-muted-foreground">
                  • Rating PyME:{" "}
                  <span className="text-foreground font-medium">A</span>
                </p>
                <p className="text-muted-foreground">
                  • Sector:{" "}
                  <span className="text-foreground font-medium">Minería</span>
                </p>
                <p className="text-muted-foreground">
                  • Liquidez del pool:{" "}
                  <span className="text-success font-medium">Alta</span>
                </p>
              </div>

              <div className="flex gap-3 justify-end">
                <Button
                  variant="outline"
                  onClick={() => {
                    setStep("upload");
                    setFileName("");
                  }}
                >
                  <X className="h-4 w-4 mr-2" /> Rechazar
                </Button>
                <Button
                  className="gradient-gold text-gold-foreground gap-2"
                  onClick={() => setStep("confirmed")}
                >
                  <CheckCircle className="h-4 w-4" /> Aceptar y Tokenizar
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Confirmed */}
      {step === "confirmed" && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <Card className="border-success/30">
            <CardContent className="pt-6 text-center py-16">
              <div className="w-20 h-20 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-10 w-10 text-success" />
              </div>
              <h3 className="font-display font-bold text-2xl mb-2">
                ¡Factura Tokenizada!
              </h3>
              <p className="text-muted-foreground mb-1">
                Tu factura ha sido registrada en la blockchain de Stellar
              </p>
              <p className="text-sm text-muted-foreground mb-6">
                Recibirás 9,650 USDC en tu wallet en menos de 24 horas
              </p>
              <div className="flex gap-3 justify-center">
                <Button
                  variant="outline"
                  onClick={() => {
                    setStep("upload");
                    setFileName("");
                  }}
                >
                  Subir otra factura
                </Button>
                <Button variant="outline" asChild>
                  <a href="/dashboard/pyme/tracking">Ver Tracking</a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </>
  );
}
