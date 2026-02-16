import { motion } from "framer-motion";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { FileUp, Upload, CheckCircle, ArrowRight, X } from "lucide-react";
import type { InvoiceDataItem } from "@/contexts/FormDataContext";
import { useInvoices } from "@/hooks/useInvoices";
import { calculateInvoiceOffer } from "@/services/invoiceService";

type Step = "upload" | "validating" | "data" | "offer" | "confirmed";

export default function SubirFactura() {
  const [step, setStep] = useState<Step>("upload");
  const [fileName, setFileName] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const [currentInvoiceId, setCurrentInvoiceId] = useState<string | null>(null);

  // Hook del servicio ORM
  const { createInvoice, updateInvoice, updateStatus, getById } = useInvoices();

  // Estado temporal para edición de descripción
  const [description, setDescription] = useState("");

  // Datos actuales de la factura
  const currentInvoice = currentInvoiceId ? getById(currentInvoiceId) : null;

  const handleFileSelect = (file: File) => {
    setFileName(file.name);
    setStep("validating");

    // Simular procesamiento de archivo
    setTimeout(() => {
      // En producción aquí parsearías el XML/PDF
      // Por ahora simulamos datos extraídos
      const extractedData: Omit<InvoiceDataItem, "id" | "uploadDate"> = {
        invoiceNumber: "E001-354",
        fileName: file.name,
        fileType: file.name.endsWith(".xml") ? "xml" : "pdf",
        issuerRuc: "20512345678",
        issuerName: "CONFECCIONES Y DISTRIBUCIONES S.A.C.",
        payerRuc: "20498765432",
        payerName: "AQP SECURITY S.A.C.",
        payerRating: "A",
        amount: 10000,
        currency: "PEN",
        issueDate: "2026-02-14",
        dueDate: "2026-03-17",
        status: "validated",
        description: "",
      };

      // Crear factura en el ORM
      const newInvoice = createInvoice(extractedData);
      setCurrentInvoiceId(newInvoice.id);

      setStep("data");
    }, 2000);
  };

  const handleSolicitarOferta = () => {
    if (!currentInvoice) return;

    // Calcular oferta automáticamente
    const offer = calculateInvoiceOffer(
      currentInvoice.amount,
      currentInvoice.dueDate,
      currentInvoice.payerRating,
      "A", // Rating de la PyME (en producción vendría del usuario)
    );

    // Guardar oferta en la factura
    updateInvoice(currentInvoice.id, {
      offer,
      discountRate: offer?.rate,
      discountAmount: offer?.discount,
      netAmount: offer?.receivable,
      description: description || currentInvoice.description,
    });

    updateStatus(currentInvoice.id, "offer_pending");
    setStep("offer");
  };

  const handleAceptarOferta = () => {
    if (!currentInvoice) return;

    // Simular tokenización en Stellar
    const mockTokenId = `TKN_${Date.now()}`;
    const mockTxHash = `0x${Math.random().toString(36).substr(2, 64)}`;

    // Actualizar estado a tokenized
    updateInvoice(currentInvoice.id, {
      tokenId: mockTokenId,
      transactionHash: mockTxHash,
      status: "tokenized",
      tokenizedDate: new Date().toISOString(),
    });

    setStep("confirmed");
  };

  const handleCancelar = () => {
    // Eliminar factura draft si cancelamos
    if (currentInvoiceId) {
      updateStatus(currentInvoiceId, "rejected");
    }
    setStep("upload");
    setFileName("");
    setCurrentInvoiceId(null);
    setDescription("");
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFileSelect(file);
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
                      if (file) handleFileSelect(file);
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
      {step === "data" && currentInvoice && (
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
                  <Input
                    defaultValue={currentInvoice.invoiceNumber}
                    readOnly
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label>RUC Emisor</Label>
                  <Input
                    defaultValue={currentInvoice.issuerRuc}
                    readOnly
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label>Empresa Pagadora</Label>
                  <Input
                    defaultValue={currentInvoice.payerName}
                    readOnly
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label>RUC Pagadora</Label>
                  <Input
                    defaultValue={currentInvoice.payerRuc}
                    readOnly
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label>Monto Total</Label>
                  <Input
                    defaultValue={`${currentInvoice.currency === "PEN" ? "S/" : "$"} ${currentInvoice.amount.toLocaleString("es-PE", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
                    readOnly
                    className="mt-1"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Fecha de Emision</Label>
                    <Input
                      defaultValue={currentInvoice.issueDate}
                      readOnly
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label>Fecha de Vencimiento</Label>
                    <Input
                      defaultValue={currentInvoice.dueDate}
                      readOnly
                      className="mt-1"
                    />
                  </div>
                </div>
              </div>
              <div>
                <Label>Descripción (opcional)</Label>
                <Input
                  placeholder="Servicios de consultoría técnica"
                  className="mt-1"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="flex gap-3 justify-end">
                <Button variant="outline" onClick={handleCancelar}>
                  Cancelar
                </Button>
                <Button
                  className="gradient-gold text-gold-foreground gap-2"
                  onClick={handleSolicitarOferta}
                >
                  Solicitar Oferta <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Offer Step */}
      {step === "offer" && currentInvoice && currentInvoice.offer && (
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
                  <p className="text-xl font-display font-bold">
                    {currentInvoice.currency === "PEN" ? "S/" : "$"}{" "}
                    {currentInvoice.amount.toLocaleString("es-PE")}
                  </p>
                </div>
                <div className="text-center p-4 rounded-lg bg-muted/50">
                  <p className="text-xs text-muted-foreground mb-1">Plazo</p>
                  <p className="text-xl font-display font-bold">
                    {currentInvoice.offer.term} días
                  </p>
                </div>
                <div className="text-center p-4 rounded-lg bg-muted/50">
                  <p className="text-xs text-muted-foreground mb-1">Tasa</p>
                  <p className="text-xl font-display font-bold text-primary">
                    {currentInvoice.offer.rate.toFixed(1)}%
                  </p>
                </div>
                <div className="text-center p-4 rounded-lg bg-muted/50">
                  <p className="text-xs text-muted-foreground mb-1">
                    Descuento
                  </p>
                  <p className="text-xl font-display font-bold text-destructive">
                    -{currentInvoice.currency === "PEN" ? "S/" : "$"}
                    {currentInvoice.offer.discount.toFixed(2)}
                  </p>
                </div>
                <div className="text-center p-4 rounded-lg bg-success/10 col-span-2">
                  <p className="text-xs text-muted-foreground mb-1">
                    Recibirás
                  </p>
                  <p className="text-2xl font-display font-bold text-success">
                    {currentInvoice.offer.receivable.toFixed(2)} USDC
                  </p>
                  <p className="text-xs text-muted-foreground">
                    en menos de 24 horas
                  </p>
                </div>
              </div>

              <div className="bg-muted/30 rounded-lg p-4 text-sm space-y-1">
                <p className="font-medium mb-2">Basado en:</p>
                <p className="text-muted-foreground">
                  • Rating empresa pagadora ({currentInvoice.payerName}):{" "}
                  <span className="text-foreground font-medium">
                    {currentInvoice.payerRating || "A"}
                  </span>
                </p>
                <p className="text-muted-foreground">
                  • Rating PyME ({currentInvoice.issuerName}):{" "}
                  <span className="text-foreground font-medium">A</span>
                </p>
                <p className="text-muted-foreground">
                  • Pool de liquidez:{" "}
                  <span className="text-primary font-medium">30 días</span>{" "}
                  (vencimiento en {currentInvoice.offer.term} días)
                </p>
                <p className="text-muted-foreground">
                  • Sector:{" "}
                  <span className="text-foreground font-medium">
                    Confecciones
                  </span>{" "}
                  →{" "}
                  <span className="text-foreground font-medium">Seguridad</span>
                </p>
                <p className="text-muted-foreground text-xs mt-2 pt-2 border-t border-border">
                  💼 Distribución por sector: Confecciones (PyME) factura a
                  empresa de Seguridad con rating A
                </p>
              </div>

              <div className="flex gap-3 justify-end">
                <Button variant="outline" onClick={handleCancelar}>
                  <X className="h-4 w-4 mr-2" /> Rechazar
                </Button>
                <Button
                  className="gradient-gold text-gold-foreground gap-2"
                  onClick={handleAceptarOferta}
                >
                  <CheckCircle className="h-4 w-4" /> Aceptar y Tokenizar
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Confirmed */}
      {step === "confirmed" && currentInvoice && (
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
              <p className="text-sm text-muted-foreground mb-2">
                Recibirás{" "}
                <span className="text-success font-semibold">
                  {currentInvoice.offer?.receivable.toFixed(2)} USDC
                </span>{" "}
                en tu wallet en menos de 24 horas
              </p>
              <div className="text-xs text-muted-foreground mb-6 space-y-1">
                <p>
                  Token ID:{" "}
                  <span className="font-mono text-foreground">
                    {currentInvoice.tokenId}
                  </span>
                </p>
                <p>
                  Tx Hash:{" "}
                  <span className="font-mono text-foreground text-[10px]">
                    {currentInvoice.transactionHash?.slice(0, 32)}...
                  </span>
                </p>
              </div>
              <div className="flex gap-3 justify-center">
                <Button
                  variant="outline"
                  onClick={() => {
                    setStep("upload");
                    setFileName("");
                    setCurrentInvoiceId(null);
                    setDescription("");
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
