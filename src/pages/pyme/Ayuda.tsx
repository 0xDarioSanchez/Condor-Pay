import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "¿Cómo subo mi factura?",
    a: "Puedes arrastrar tu archivo XML (SUNAT) o PDF en la sección 'Subir Factura'. El sistema validará automáticamente el formato, montos y duplicados.",
  },
  {
    q: "¿Cuánto tiempo toma recibir la liquidez?",
    a: "Típicamente menos de 24 horas. El pool de liquidez decide automáticamente en minutos si aprueba tu factura.",
  },
  {
    q: "¿Puedo elegir la tasa de descuento?",
    a: "No. La tasa se calcula automáticamente según el rating de la empresa pagadora, tu rating como PyME, el plazo de la factura, el sector y la liquidez del pool.",
  },
  {
    q: "¿Puedo ver qué inversores financiaron mi factura?",
    a: "No, y es por diseño. CondorPay usa un Pool de Liquidez anónimo que protege la privacidad de ambas partes. El pool actúa como intermediario.",
  },
  {
    q: "¿Cómo convierto mis USDC a soles?",
    a: "Usa la sección 'Off-Ramp' para convertir tus USDC directamente a tu cuenta bancaria en BCP, BBVA, Interbank o Scotiabank.",
  },
  {
    q: "¿Cómo mejoro mi rating?",
    a: "Tu scoring mejora con cada factura que es pagada a tiempo por la empresa. Facturas recurrentes y buen historial te dan acceso a mejores tasas.",
  },
];

export default function Ayuda() {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <h1 className="text-3xl font-display font-bold mb-1">
          Centro de Ayuda
        </h1>
        <p className="text-muted-foreground mb-8">
          Preguntas frecuentes sobre el flujo PyME
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card>
          <CardContent className="pt-6">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, i) => (
                <AccordionItem key={i} value={`faq-${i}`}>
                  <AccordionTrigger className="text-left font-medium">
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
      </motion.div>
    </>
  );
}
