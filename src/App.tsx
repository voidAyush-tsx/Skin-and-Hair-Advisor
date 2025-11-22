
import React from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Index from "./pages/Index";
import SkinAnalysis from "./pages/SkinAnalysis";
import HairAnalysis from "./pages/HairAnalysis";
import ConnectDoctor from "./pages/ConnectDoctor";
import GetStarted from "./pages/GetStarted";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import PlaceholderPage from "./pages/PlaceholderPage";
import ScrollToTop from "./components/ScrollToTop";
import PageTransition from "./components/PageTransition";


const queryClient = new QueryClient();

const App = () => (
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <PageTransition>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/skin-analysis" element={<SkinAnalysis />} />
              <Route path="/hair-analysis" element={<HairAnalysis />} />
              <Route path="/connect-doctor" element={<ConnectDoctor />} />
              <Route path="/get-started" element={<GetStarted />} />
              <Route path="/profile" element={<Profile />} />

              {/* Placeholder Pages */}
              <Route path="/about" element={<PlaceholderPage />} />
              <Route path="/contact" element={<PlaceholderPage />} />
              <Route path="/privacy" element={<PlaceholderPage />} />
              <Route path="/terms" element={<PlaceholderPage />} />
              <Route path="/cookies" element={<PlaceholderPage />} />

              <Route path="*" element={<NotFound />} />
            </Routes>
          </PageTransition>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </React.StrictMode>
);

export default App;
