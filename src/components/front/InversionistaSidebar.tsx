import { NavLink } from "@/components/front/NavLink";
import { ThemeToggle } from "@/components/front/ThemeToggle";
import { WalletConnect } from "@/components/front/WalletConnect";
import logo from "@/assets/condorpay-logo.png";
import {
  LayoutDashboard,
  Droplets,
  Briefcase,
  TrendingUp,
  ArrowDownToLine,
  User,
  HelpCircle,
  ChevronLeft,
  LogOut,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const menuItems = [
  {
    title: "Dashboard",
    url: "/dashboard/inversionista",
    icon: LayoutDashboard,
  },
  {
    title: "Pool de Liquidez",
    url: "/dashboard/inversionista/pool",
    icon: Droplets,
  },
  {
    title: "Mi Portfolio",
    url: "/dashboard/inversionista/portfolio",
    icon: Briefcase,
  },
  {
    title: "Rendimientos",
    url: "/dashboard/inversionista/rendimientos",
    icon: TrendingUp,
  },
  {
    title: "Retiros",
    url: "/dashboard/inversionista/retiros",
    icon: ArrowDownToLine,
  },
  { title: "Mi Perfil", url: "/dashboard/inversionista/perfil", icon: User },
  { title: "Ayuda", url: "/dashboard/inversionista/ayuda", icon: HelpCircle },
];

export function InversionistaSidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={cn(
        "fixed top-0 left-0 h-screen z-40 flex flex-col border-r border-sidebar-border bg-sidebar transition-all duration-300",
        collapsed ? "w-16" : "w-64",
      )}
    >
      <div className="flex items-center gap-2 h-16 px-4 border-b border-sidebar-border">
        <Link to="/" className="flex items-center gap-2 min-w-0">
          <img
            src={logo}
            alt="CondorPay"
            className="h-8 w-8 object-contain shrink-0"
          />
          {!collapsed && (
            <span className="font-display font-bold text-sm text-foreground truncate">
              CondorPay
            </span>
          )}
        </Link>
        <Button
          variant="ghost"
          size="icon"
          className="ml-auto shrink-0 h-8 w-8"
          onClick={() => setCollapsed(!collapsed)}
        >
          <ChevronLeft
            className={cn(
              "h-4 w-4 transition-transform",
              collapsed && "rotate-180",
            )}
          />
        </Button>
      </div>

      {!collapsed && (
        <div className="px-3 py-3 border-b border-sidebar-border">
          <WalletConnect />
        </div>
      )}

      <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-1">
        {menuItems.map((item) => (
          <NavLink
            key={item.url}
            to={item.url}
            end={item.url === "/dashboard/inversionista"}
            className={cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors",
              collapsed && "justify-center px-2",
            )}
            activeClassName="bg-sidebar-accent text-sidebar-primary font-semibold"
          >
            <item.icon className="h-5 w-5 shrink-0" />
            {!collapsed && <span>{item.title}</span>}
          </NavLink>
        ))}
      </nav>

      <div className="border-t border-sidebar-border p-3 space-y-2">
        {!collapsed && <ThemeToggle />}
        <Link
          to="/portal"
          className={cn(
            "flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-sidebar-foreground hover:bg-sidebar-accent transition-colors",
            collapsed && "justify-center px-2",
          )}
        >
          <LogOut className="h-4 w-4 shrink-0" />
          {!collapsed && <span>Cambiar Portal</span>}
        </Link>
      </div>
    </aside>
  );
}
