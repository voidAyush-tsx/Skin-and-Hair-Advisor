
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import SkinAnalysis from "./pages/SkinAnalysis";
import HairAnalysis from "./pages/HairAnalysis";
import ConnectDoctor from "./pages/ConnectDoctor";
import GetStarted from "./pages/GetStarted";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/skin-analysis" element={<SkinAnalysis />} />
          <Route path="/hair-analysis" element={<HairAnalysis />} />
          <Route path="/connect-doctor" element={<ConnectDoctor />} />
          <Route path="/get-started" element={<GetStarted />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
