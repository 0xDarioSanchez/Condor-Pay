import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Navbar } from "@/components/front/Navbar";
import {
  FileText,
  CheckCircle,
  DollarSign,
  Zap,
  Clock,
  ArrowRight,
  Wallet,
  Globe,
  BarChart3,
  Shield,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import logo from "@/assets/condorpay-n.png";
import heroBg from "@/assets/hero-bg.jpg";

const features = [
  {
    icon: Zap,
    title: "Liquidez en < 24h",
    desc: "Convierte tus facturas en USDC de forma inmediata",
  },
  {
    icon: Shield,
    title: "Blockchain Stellar",
    desc: "Tokenización segura y transparente en la red Stellar",
  },
  {
    icon: BarChart3,
    title: "APY Atractivo",
    desc: "Rendimientos competitivos para inversionistas",
  },
  {
    icon: Globe,
    title: "Hecho en Perú",
    desc: "Diseñado para el ecosistema empresarial peruano",
  },
];

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
      <section className="relative min-h-screen flex items-center overflow-hidden pt-16">
        <div className="absolute inset-0">
          <img
            src={heroBg}
            alt=""
            className="w-full h-full object-cover opacity-20 dark:opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
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
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-sm text-primary mb-8">
                <Clock className="h-3.5 w-3.5" />
                Liquidez en menos de 24 horas
              </div>
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
              Tokeniza tus facturas en Stellar, obtén liquidez instantánea y
              permite a inversionistas acceder a rendimientos reales.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/portal">
                <Button
                  size="lg"
                  className="gradient-gold text-gold-foreground font-semibold text-base gap-2 h-12 px-8 hover:opacity-90 transition-all hover:scale-105"
                >
                  <Wallet className="h-5 w-5" />
                  Comenzar ahora
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <a href="#how">
                <Button
                  size="lg"
                  variant="outline"
                  className="h-12 px-8 text-base transition-all hover:scale-105"
                >
                  ¿Cómo funciona?
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
              ¿Por qué <span className="text-gradient-gold">CondorPay</span>?
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto">
              La plataforma fintech Web3 que conecta PyMEs, inversionistas y
              empresas del Perú
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 rounded-2xl border border-border bg-card hover:glow-gold transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl gradient-gold flex items-center justify-center mb-4">
                  <f.icon className="h-6 w-6 text-gold-foreground" />
                </div>
                <h3 className="font-display font-semibold text-lg mb-2">
                  {f.title}
                </h3>
                <p className="text-muted-foreground text-sm">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="py-32">
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
      <section id="faq" className="py-32 bg-card">
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
                  className="gradient-gold text-gold-foreground hover:bg-background/90 font-semibold h-12 px-8 gap-2 hover:opacity-90 transition-all hover:scale-105 mt-4"
                >
                  Comenzar gratis
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-20 py-4">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
          <Link to="/" className="flex items-center gap-2">
            <img
              src={logo}
              alt="CondorPay"
              className="h-20 w-20 object-contain"
            />
          </Link>
          <p>© {new Date().getFullYear()} CondorPay. Hecho con 🇵🇪 en Perú.</p>
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
