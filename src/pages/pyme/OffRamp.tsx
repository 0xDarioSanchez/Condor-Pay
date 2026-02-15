import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight, Wallet, Building2 } from "lucide-react";

const banks = [
  { name: "BCP", logo: "🏦" },
  { name: "BBVA", logo: "🏦" },
  { name: "Interbank", logo: "🏦" },
  { name: "Scotiabank", logo: "🏦" },
];

export default function OffRamp() {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <h1 className="text-3xl font-display font-bold mb-1">Off-Ramp</h1>
        <p className="text-muted-foreground mb-8">
          Convierte tus USDC a Soles Peruanos
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Balance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="border-primary/20">
            <CardContent className="pt-6 text-center">
              <Wallet className="h-10 w-10 mx-auto mb-3 text-primary" />
              <p className="text-sm text-muted-foreground">
                Balance disponible
              </p>
              <p className="text-4xl font-display font-bold mt-1">4,850 USDC</p>
              <p className="text-sm text-muted-foreground mt-2">
                ≈ S/ 18,186.50
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Conversion */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="font-display">
                Convertir USDC → PEN
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Monto a convertir (USDC)</Label>
                <Input
                  type="number"
                  placeholder="0.00"
                  defaultValue="1000"
                  className="mt-1"
                />
              </div>
              <div className="flex items-center justify-center">
                <ArrowRight className="h-5 w-5 text-muted-foreground" />
              </div>
              <div>
                <Label>Recibirás (PEN)</Label>
                <Input
                  readOnly
                  value="S/ 3,750.00"
                  className="mt-1 font-semibold"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Tipo de cambio: 1 USDC = S/ 3.75
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Bank Selection */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-6"
      >
        <Card>
          <CardHeader>
            <CardTitle className="font-display flex items-center gap-2">
              <Building2 className="h-5 w-5" /> Seleccionar Banco
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
              {banks.map((bank) => (
                <button
                  key={bank.name}
                  className="p-4 rounded-lg border border-border hover:border-primary hover:bg-primary/5 transition-colors text-center"
                >
                  <span className="text-2xl">{bank.logo}</span>
                  <p className="text-sm font-medium mt-1">{bank.name}</p>
                </button>
              ))}
            </div>
            <div className="space-y-4">
              <div>
                <Label>Número de cuenta</Label>
                <Input
                  placeholder="Ingresa tu número de cuenta"
                  className="mt-1"
                />
              </div>
              <Button className="w-full gradient-gold text-gold-foreground gap-2">
                Convertir y Transferir <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </>
  );
}
