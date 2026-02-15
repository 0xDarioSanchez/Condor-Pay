import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Navbar } from "@/components/front/Navbar";
import { FileText, CheckCircle, DollarSign, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const steps = [
  {
    icon: FileText,
    title: "La PyME registra su factura",
    desc: "Sube tu factura XML/PDF y el sistema la valida automáticamente con SUNAT.",
  },
  {
    icon: CheckCircle,
    title: "La empresa valida el pago futuro",
    desc: "La empresa pagadora confirma la obligación de pago de la factura.",
  },
  {
    icon: DollarSign,
    title: "Inversionistas financian el pool",
    desc: "El capital de los inversionistas financia las facturas aprobadas.",
  },
  {
    icon: Zap,
    title: "La PyME recibe liquidez inmediata",
    desc: "En menos de 24 horas, recibe USDC directamente en su wallet.",
  },
];

const faqs = [
  {
    q: "¿Qué es CondorPay?",
    a: "CondorPay es un protocolo de factoring descentralizado que conecta PyMEs con inversionistas para convertir facturas pendientes en liquidez inmediata, usando blockchain Stellar y USDC.",
  },
  {
    q: "¿Quién puede usarlo?",
    a: "PyMEs que necesitan liquidez, inversionistas que buscan rendimientos reales respaldados por facturas, y empresas que desean confirmar sus obligaciones de pago.",
  },
  {
    q: "¿Es seguro?",
    a: "Sí. Las facturas se validan con SUNAT, se tokenizan en la blockchain de Stellar y los fondos se manejan mediante smart contracts auditados.",
  },
  {
    q: "¿Qué gana un inversionista?",
    a: "Rendimientos atractivos (APY 20-28%) respaldados por facturas reales de empresas peruanas verificadas, con diversificación automática.",
  },
  {
    q: "¿Cómo se validan las facturas?",
    a: "El sistema verifica automáticamente la factura con SUNAT, evalúa el scoring de la PyME y la empresa pagadora, y calcula la tasa de descuento.",
  },
];

export default function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="min-h-screen flex items-center justify-center pt-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl mx-auto text-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-border bg-card text-sm text-muted-foreground mb-8"
            >
              🚀 Protocolo de factoring descentralizado
            </motion.div>
            <h1 className="text-6xl md:text-7xl font-d font-bold leading-[1.1] mb-4 tracking-tight">
              CondorPay: El protocolo que redefine el flujo de caja.
            </h1>
            <h2 className="text-3xl md:text-5xl font-display font-bold leading-tight mb-6">
              <span className="text-gradient-gold">
                Inversión inteligente, liquidez para tu gente.
              </span>
            </h2>

            <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto mb-10 leading-relaxed">
              Liquidez inmediata para tu PyME sin esperar 30, 60 o 90 días.
            </p>

            <Link to="/portal">
              <Button
                size="lg"
                className="gradient-gold text-gold-foreground font-bold text-lg h-14 px-10 rounded-full hover:opacity-90 transition-all hover:scale-105"
              >
                Comenzar Gratis
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-32">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
              ¿Cómo funciona CondorPay?
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Las PyMEs facturan hoy, pero cobran meses después. CondorPay
              convierte esas facturas en liquidez inmediata conectando PyMEs con
              inversionistas.
            </p>
          </motion.div>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-8 top-0 bottom-0 w-px bg-border hidden md:block" />

            <div className="space-y-12">
              {steps.map((s, i) => (
                <motion.div
                  key={s.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  className="flex items-start gap-6 md:pl-0"
                >
                  <div className="relative z-10 shrink-0 w-16 h-16 rounded-2xl gradient-gold flex items-center justify-center">
                    <s.icon className="h-7 w-7 text-gold-foreground" />
                  </div>
                  <div className="pt-2">
                    <h3 className="font-display font-bold text-xl mb-1">
                      {s.title}
                    </h3>
                    <p className="text-muted-foreground">{s.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-32 bg-card">
        <div className="container mx-auto px-4 max-w-3xl">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
              Preguntas Frecuentes
            </h2>
          </motion.div>

          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <motion.div
                key={faq.a}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <AccordionItem
                  value={`faq-${i}`}
                  className="border border-border rounded-xl px-6 bg-background"
                >
                  <AccordionTrigger className="text-left font-display font-semibold text-base hover:no-underline">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA Split */}
      <section className="py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12 p-12 md:p-20 rounded-3xl bg-foreground">
            <div className="flex-1">
              <h2 className="text-3xl md:text-5xl font-display font-bold text-background leading-tight">
                Transforma facturas en liquidez. Escala sin esperar.
              </h2>
            </div>
            <div className="shrink-0">
              <Link to="/portal">
                <Button
                  size="lg"
                  className="gradient-gold text-gold-foreground font-bold text-lg h-14 px-10 rounded-full hover:opacity-90 transition-all hover:scale-105"
                >
                  Comenzar Gratis
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>© 2025 CondorPay. Hecho con 🇵🇪 en Perú.</p>
          <div className="flex gap-6">
            <span>Términos</span>
            <span>Privacidad</span>
            <span>Contacto</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
