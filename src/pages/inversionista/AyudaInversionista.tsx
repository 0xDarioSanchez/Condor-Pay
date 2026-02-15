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
    q: "¿Qué son los LP tokens?",
    a: "Los LP tokens (condorLP) representan tu participación porcentual en el pool de liquidez. Cuando depositas USDC, recibes LP tokens proporcionales. Puedes quemarlos para retirar tu capital más ganancias acumuladas.",
  },
  {
    q: "¿Cómo se calcula el APY?",
    a: "El APY se calcula en base a las tasas de descuento cobradas a las PyMEs por el factoring. Las ganancias se distribuyen proporcionalmente entre todos los LP holders y se acumulan automáticamente (compounding).",
  },
  {
    q: "¿Puedo perder mi inversión?",
    a: "El riesgo está mitigado por: diversificación automática en múltiples facturas, scoring estricto de empresas, y un fondo de garantía del 10%. Sin embargo, existe riesgo de impago parcial.",
  },
  {
    q: "¿Cómo retiro mis fondos?",
    a: "Ve a la sección Retiros, selecciona el pool, ingresa la cantidad de LP tokens a quemar y confirma. Recibirás USDC equivalentes a tu participación en tu wallet de Stellar.",
  },
  {
    q: "¿Cuánto es el mínimo de inversión?",
    a: "El mínimo para depositar en un pool es de 100 USDC.",
  },
  {
    q: "¿Qué pasa si una factura no se paga?",
    a: "El impago afecta proporcionalmente a todo el pool. Si una factura de $25k entra en impago en un pool de $1M, la pérdida es solo del 2.5% distribuida entre todos los inversores.",
  },
];

export default function AyudaInversionista() {
  return (
    <div>
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-display font-bold">Centro de Ayuda</h1>
        <p className="text-muted-foreground">
          Preguntas frecuentes para inversionistas
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
              Nuestro equipo de soporte está disponible de lunes a viernes, 9am
              - 6pm (PET).
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
