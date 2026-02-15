import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Building2,
  TrendingUp,
  Factory,
  ArrowRight,
  // Camera,
} from "lucide-react";
import { Navbar } from "@/components/front/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

type RoleType = "pyme" | "inversionista" | "empresa" | null;

const portals = [
  {
    key: "pyme" as RoleType,
    title: "PyME",
    description: "Obtén liquidez inmediata vendiendo tus facturas.",
    icon: Building2,
    path: "/dashboard/pyme",
  },
  {
    key: "inversionista" as RoleType,
    title: "Inversionista",
    description:
      "Invierte en facturas tokenizadas con rendimientos atractivos.",
    icon: TrendingUp,
    path: "/dashboard/inversionista",
  },
  {
    key: "empresa" as RoleType,
    title: "Empresa",
    description: "Visualiza y confirma facturas de tus proveedores.",
    icon: Factory,
    path: "/dashboard/empresa",
  },
];

export default function PortalSelect() {
  const [selectedRole, setSelectedRole] = useState<RoleType>(null);
  console.log("Selected role:", selectedRole);
  // Haz que se puedan ver los datos de cada formulario para verificar que se están capturando correctamente
  // const [formData, setFormData] = useState({
  //   pyme: {
  //     ruc: "",
  //     razonSocial: "",
  //     representanteLegal: "",
  //     dni: "",
  //     direccion: "",
  //   },
  //   inversionista: {
  //     dni: "",
  //     nombreCompleto: "",
  //     direccion: "",
  //     selfie: null as File | null,
  //   },
  //   empresa: {
  //     ruc: "",
  //     razonSocial: "",
  //     contactoPrincipal: "",
  //     emailCorporativo: "",
  //     direccion: "",
  //   },
  // });

  // Continua...

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 pt-28 pb-16 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-3">
            Selecciona tu rol
          </h1>
          <p className="text-muted-foreground text-lg">
            Crea tu perfil para acceder al ecosistema CondorPay
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Role cards - left column */}
          <div className="w-full lg:w-80 shrink-0 space-y-3">
            {portals.map((portal, i) => (
              <motion.div
                key={portal.key}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <button
                  onClick={() => setSelectedRole(portal.key)}
                  className={`w-full text-left p-5 rounded-2xl border transition-all duration-200 ${
                    selectedRole === portal.key
                      ? "border-primary bg-primary/5 shadow-sm"
                      : "border-border bg-card hover:border-primary/30 hover:shadow-sm hover:-translate-y-0.5"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl gradient-gold flex items-center justify-center shrink-0">
                      <portal.icon className="h-6 w-6 text-gold-foreground" />
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-lg">
                        {portal.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {portal.description}
                      </p>
                    </div>
                  </div>
                </button>
              </motion.div>
            ))}
          </div>

          {/* Form - right side */}
          <div className="flex-1">
            <AnimatePresence mode="wait">
              {!selectedRole && (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="h-full flex items-center justify-center rounded-2xl border border-dashed border-border p-12"
                >
                  <p className="text-muted-foreground text-center">
                    Selecciona un rol para crear tu perfil
                  </p>
                </motion.div>
              )}

              {selectedRole === "pyme" && (
                <motion.div
                  key="pyme"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="rounded-2xl border border-border bg-card p-8"
                >
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="font-display font-bold text-xl">
                      Registro PyME
                    </h3>
                    <Badge variant="secondary">Paso 1 de 1</Badge>
                  </div>
                  <Progress value={100} className="h-1.5 mb-8" />
                  <div className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label className="text-sm font-medium">RUC</Label>
                        <Input placeholder="20123456789" className="mt-1.5" />
                      </div>
                      <div>
                        <Label className="text-sm font-medium">
                          Razón Social
                        </Label>
                        <Input
                          placeholder="TEXTILO S.A.C."
                          className="mt-1.5"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label className="text-sm font-medium">
                          Representante Legal
                        </Label>
                        <Input placeholder="Carlos Pérez" className="mt-1.5" />
                      </div>
                      <div>
                        <Label className="text-sm font-medium">DNI</Label>
                        <Input placeholder="12345678" className="mt-1.5" />
                      </div>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Dirección</Label>
                      <Input
                        placeholder="Av. Industrial 123, Lima"
                        className="mt-1.5"
                      />
                    </div>
                    <div className="flex gap-3 pt-2">
                      <Link to="/dashboard/pyme" className="flex-1">
                        <Button className="w-full gradient-gold text-gold-foreground font-semibold gap-2 rounded-full">
                          Crear Perfil PyME <ArrowRight className="h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              )}

              {selectedRole === "inversionista" && (
                <motion.div
                  key="inversionista"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="rounded-2xl border border-border bg-card p-8"
                >
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="font-display font-bold text-xl">
                      Registro Inversionista
                    </h3>
                    {/* <Badge variant="secondary">Verificación KYC</Badge> */}
                  </div>
                  <Progress value={100} className="h-1.5 mb-8" />
                  <div className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label className="text-sm font-medium">
                          DNI / Pasaporte
                        </Label>
                        <Input placeholder="87654321" className="mt-1.5" />
                      </div>
                      <div>
                        <Label className="text-sm font-medium">
                          Nombre Completo
                        </Label>
                        <Input
                          placeholder="Carlos Mendoza"
                          className="mt-1.5"
                        />
                      </div>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Dirección</Label>
                      <Input
                        placeholder="Calle Falsa 123, Lima"
                        className="mt-1.5"
                      />
                    </div>
                    {/* <div className="border-2 border-dashed border-border rounded-xl p-8 text-center">
                      <Camera className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                      <p className="font-medium text-sm mb-1">
                        Selfie con documento
                      </p>
                      <p className="text-xs text-muted-foreground mb-3">
                        Verificación facial requerida
                      </p>
                      <Button variant="outline" size="sm" >
                        Subir foto
                      </Button>
                    </div> */}
                    <div className="flex gap-3 pt-2">
                      <Link to="/dashboard/inversionista" className="flex-1">
                        <Button className="w-full gradient-gold text-gold-foreground font-semibold gap-2 rounded-full">
                          Crear Perfil Inversionista{" "}
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              )}

              {selectedRole === "empresa" && (
                <motion.div
                  key="empresa"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="rounded-2xl border border-border bg-card p-8"
                >
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="font-display font-bold text-xl">
                      Registro Empresa
                    </h3>
                    <Badge variant="secondary">Datos corporativos</Badge>
                  </div>
                  <Progress value={100} className="h-1.5 mb-8" />
                  <div className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label className="text-sm font-medium">RUC</Label>
                        <Input placeholder="20100070970" className="mt-1.5" />
                      </div>
                      <div>
                        <Label className="text-sm font-medium">
                          Razón Social
                        </Label>
                        <Input
                          placeholder="SAGA FALABELLA S.A."
                          className="mt-1.5"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label className="text-sm font-medium">
                          Contacto Principal
                        </Label>
                        <Input placeholder="Juan Gómez" className="mt-1.5" />
                      </div>
                      <div>
                        <Label className="text-sm font-medium">
                          Email Corporativo
                        </Label>
                        <Input
                          placeholder="contacto@sagafalabella.com"
                          className="mt-1.5"
                        />
                      </div>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Dirección</Label>
                      <Input
                        placeholder="Av. Principal 456, Lima"
                        className="mt-1.5"
                      />
                    </div>
                    <div className="flex gap-3 pt-2">
                      <Link to="/dashboard/empresa" className="flex-1">
                        <Button className="w-full gradient-gold text-gold-foreground font-semibold gap-2 rounded-full">
                          Crear Perfil Empresa{" "}
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
