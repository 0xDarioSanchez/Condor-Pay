import { Link } from "react-router-dom";
import { ThemeToggle } from "./ThemeToggle";
import logo from "@/assets/condorpay-logo.png";
import { Button } from "@/components/ui/button";

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto flex items-center justify-between h-16 p-8">
        <Link to="/" className="flex items-center gap-2">
          <img
            src={logo}
            alt="CondorPay"
            className="h-15 w-15 object-contain"
          />
          <span className="font-display font-bold text-lg">CondorPay</span>
        </Link>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Link to="/portal">
            <Button className="gradient-gold text-gold-foreground font-semibold rounded-full px-6 hover:opacity-90 transition-opacity">
              Comenzar
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
