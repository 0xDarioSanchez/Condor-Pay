import { Outlet } from "react-router-dom";
import { EmpresaSidebar } from "./EmpresaSidebar";

export function EmpresaLayout() {
  return (
    <div className="min-h-screen bg-background flex w-full">
      <EmpresaSidebar />
      <main className="flex-1 ml-16 md:ml-64 transition-all duration-300">
        <div className="container mx-auto px-4 py-8 max-w-6xl">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
