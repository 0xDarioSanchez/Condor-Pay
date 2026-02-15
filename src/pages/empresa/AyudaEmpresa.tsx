import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const faqs = [
  {
    q: "¿Por qué aparecen mis facturas aquí?",
    a: "Tus proveedores PyME han tokenizado facturas que te tienen como empresa pagadora. El sistema permite que accedan a liquidez anticipada mientras tú mantienes tus plazos de pago normales.",
  },
  {
    q: "¿Qué significa confirmar una factura?",
    a: "Al confirmar, verificas que recibiste el bien o servicio descrito en la factura. Esto reduce el riesgo para inversores y mejora la tasa para tu proveedor. No cambia tu fecha de pago.",
  },
  {
    q: "¿Puedo rechazar una factura?",
    a: "Sí, si no recibiste el bien/servicio, la factura está duplicada o hay errores. El rechazo detiene la tokenización y protege al sistema de fraude.",
  },
  {
    q: "¿Cómo pago las facturas?",
    a: "En el MVP, pagas por tu sistema tradicional (transferencia bancaria). El smart contract detecta el pago automáticamente. En el futuro podrás pagar directamente en USDC.",
  },
  {
    q: "¿Qué beneficios tengo al usar el sistema?",
    a: "Mejor relación con proveedores, transparencia en tu supply chain, mejora de tu rating corporativo y potenciales descuentos por pronto pago.",
  },
];

export default function AyudaEmpresa() {
  return (
    <div>
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-display font-bold">Centro de Ayuda</h1>
        <p className="text-muted-foreground">
          Preguntas frecuentes para empresas
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="font-display flex items-center gap-2">
                <HelpCircle className="h-5 w-5" /> Preguntas Frecuentes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, i) => (
                  <AccordionItem key={i} value={`faq-${i}`}>
                    <AccordionTrigger className="text-left">
                      {faq.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {faq.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </div>

        <Card className="h-fit">
          <CardHeader>
            <CardTitle className="font-display flex items-center gap-2">
              <MessageCircle className="h-5 w-5" /> ¿Necesitas más ayuda?
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-muted-foreground">
              Nuestro equipo está disponible de lunes a viernes, 9am - 6pm
              (PET).
            </p>
            <Button className="w-full gradient-gold text-gold-foreground">
              Contactar Soporte
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
