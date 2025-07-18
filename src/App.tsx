import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import Index from "./pages/Index";
import Documentation from "./pages/Documentation";
import NotFound from "./pages/NotFound";
import { OrganizationalStructure } from "./components/intranet/OrganizationalStructure";

const OrganizationalStructureView = lazy(() => import("./pages/OrganizationalStructureView"));
const DepartmentalIntranet = lazy(() => import("./pages/DepartmentalIntranet"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/docs" element={<Documentation />} />
          <Route path="/organizational-structure" element={
            <Suspense fallback={<div>Carregando...</div>}>
              <OrganizationalStructureView />
            </Suspense>
          } />
          <Route path="/intranet" element={
            <Suspense fallback={<div>Carregando...</div>}>
              <DepartmentalIntranet />
            </Suspense>
          } />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
