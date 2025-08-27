import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { CompanyProfileLayout } from "@/layouts/CompanyProfileLayout";
import { CompanyOverviewPage } from "@/pages/company/CompanyOverviewPage";
import { CompanyJobsPage } from "@/pages/company/CompanyJobsPage";
import { CompanyHotlistsPage } from "@/pages/company/CompanyHotlistsPage";
import { CompanyDealsPage } from "@/pages/company/CompanyDealsPage";
import { CompanyEmailsPage } from "@/pages/company/CompanyEmailsPage";
import { CompanyPitchedPage } from "@/pages/company/CompanyPitchedPage";
import { CompanyEmployedPage } from "@/pages/company/CompanyEmployedPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/company/:id" element={<CompanyProfileLayout />}>
            <Route index element={<CompanyOverviewPage />} />
            <Route path="jobs" element={<CompanyJobsPage />} />
            <Route path="hotlists" element={<CompanyHotlistsPage />} />
            <Route path="deals" element={<CompanyDealsPage />} />
            <Route path="emails" element={<CompanyEmailsPage />} />
            <Route path="pitched" element={<CompanyPitchedPage />} />
            <Route path="employed" element={<CompanyEmployedPage />} />
          </Route>
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
