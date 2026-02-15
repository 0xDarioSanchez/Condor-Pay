// import { Button, Icon, Layout } from "@stellar/design-system";
// import "./App.module.css";
// import ConnectAccount from "./components/ConnectAccount.tsx";
// import { Routes, Route, Outlet, NavLink } from "react-router-dom";
// import Home from "./pages/Home";
// import Debugger from "./pages/Debugger.tsx";

// const AppLayout: React.FC = () => (
//   <main>
//     <Layout.Header
//       projectId="My App"
//       projectTitle="My App"
//       contentRight={
//         <>
//           <nav>
//             <NavLink
//               to="/debug"
//               style={{
//                 textDecoration: "none",
//               }}
//             >
//               {({ isActive }) => (
//                 <Button
//                   variant="tertiary"
//                   size="md"
//                   onClick={() => (window.location.href = "/debug")}
//                   disabled={isActive}
//                 >
//                   <Icon.Code02 size="md" />
//                   Debugger
//                 </Button>
//               )}
//             </NavLink>
//           </nav>
//           <ConnectAccount />
//         </>
//       }
//     />
//     <Outlet />
//     <Layout.Footer>
//       <span>
//         © {new Date().getFullYear()} My App. Licensed under the{" "}
//         <a
//           href="http://www.apache.org/licenses/LICENSE-2.0"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Apache License, Version 2.0
//         </a>
//         .
//       </span>
//     </Layout.Footer>
//   </main>
// );

// function App() {
//   return (
//     <Routes>
//       <Route element={<AppLayout />}>
//         <Route path="/" element={<Home />} />
//         <Route path="/debug" element={<Debugger />} />
//         <Route path="/debug/:contractName" element={<Debugger />} />
//       </Route>
//     </Routes>
//   );
// }

// export default App;
import { Toaster } from "@/components/ui/sonner";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import PortalSelect from "./pages/PortalSelect";
import { PymeLayout } from "./components/front/PymeLayout";
import PymeHome from "./pages/pyme/PymeHome";
import SubirFactura from "./pages/pyme/SubirFactura";
import MisFacturas from "./pages/pyme/MisFacturas";
import Tracking from "./pages/pyme/Tracking";
import OffRamp from "./pages/pyme/OffRamp";
import Perfil from "./pages/pyme/Perfil";
import Ayuda from "./pages/pyme/Ayuda";
import { InversionistaLayout } from "./components/front/InversionistaLayout";
import InversionistaHome from "./pages/inversionista/InversionistaHome";
import PoolLiquidez from "./pages/inversionista/PoolLiquidez";
import Portfolio from "./pages/inversionista/Portfolio";
import Rendimientos from "./pages/inversionista/Rendimientos";
import Retiros from "./pages/inversionista/Retiros";
import PerfilInversionista from "./pages/inversionista/PerfilInversionista";
import AyudaInversionista from "./pages/inversionista/AyudaInversionista";
import { EmpresaLayout } from "./components/front/EmpresaLayout";
import EmpresaHome from "./pages/empresa/EmpresaHome";
import Facturas from "./pages/empresa/Facturas";
import ConfirmarFacturas from "./pages/empresa/ConfirmarFacturas";
import HistorialPagos from "./pages/empresa/HistorialPagos";
import PerfilEmpresa from "./pages/empresa/PerfilEmpresa";
import AyudaEmpresa from "./pages/empresa/AyudaEmpresa";
import NotFound from "./pages/NotFound";

const App = () => (
  <TooltipProvider>
    <Toaster />
    <Sonner />
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/portal" element={<PortalSelect />} />
      <Route path="/dashboard/pyme" element={<PymeLayout />}>
        <Route index element={<PymeHome />} />
        <Route path="subir-factura" element={<SubirFactura />} />
        <Route path="facturas" element={<MisFacturas />} />
        <Route path="tracking" element={<Tracking />} />
        <Route path="off-ramp" element={<OffRamp />} />
        <Route path="perfil" element={<Perfil />} />
        <Route path="ayuda" element={<Ayuda />} />
      </Route>
      <Route path="/dashboard/inversionista" element={<InversionistaLayout />}>
        <Route index element={<InversionistaHome />} />
        <Route path="pool" element={<PoolLiquidez />} />
        <Route path="portfolio" element={<Portfolio />} />
        <Route path="rendimientos" element={<Rendimientos />} />
        <Route path="retiros" element={<Retiros />} />
        <Route path="perfil" element={<PerfilInversionista />} />
        <Route path="ayuda" element={<AyudaInversionista />} />
      </Route>
      <Route path="/dashboard/empresa" element={<EmpresaLayout />}>
        <Route index element={<EmpresaHome />} />
        <Route path="facturas" element={<Facturas />} />
        <Route path="confirmar" element={<ConfirmarFacturas />} />
        <Route path="historial" element={<HistorialPagos />} />
        <Route path="perfil" element={<PerfilEmpresa />} />
        <Route path="ayuda" element={<AyudaEmpresa />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  </TooltipProvider>
);

export default App;
