import { Link } from "react-router-dom";
import { ThemeToggle } from "./ThemeToggle";
import logoN from "@/assets/condorpay-n.png";
// import logoD from "@/assets/condorpay-d.png";
import { Button } from "@/components/ui/button";
import { Wallet } from "lucide-react";

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto flex items-center justify-between h-16 px-20 p-11">
        <Link to="/" className="flex items-center gap-2">
          {/* Contidional image if dark mode */}
          {/* {document.documentElement.classList.contains("dark") ? (
            <img src={logoN} alt="CondorPay Logo Dark" className="h-20 w-20 object-contain" />
          ) : (
            <img src={logoD} alt="CondorPay Logo Light" className="h-20 w-20 object-contain" />
          )} */}
          <img
            src={logoN}
            alt="CondorPay Logo"
            className="h-20 w-20 object-contain"
          />
          <span className="font-display font-bold text-2xl">CondorPay</span>
        </Link>

        {/* paths*/}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
          <a
            href="#features"
            className="hover:text-foreground transition-colors"
          >
            Características
          </a>
          <a href="#how" className="hover:text-foreground transition-colors">
            ¿Cómo funciona?
          </a>
          <a href="#faq" className="hover:text-foreground transition-colors">
            FAQs
          </a>
        </div>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Link to="/portal">
            <Button className="gradient-gold text-gold-foreground font-semibold gap-2 hover:opacity-90 transition-opacity">
              <Wallet className="h-4 w-4" />
              Comenzar
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
