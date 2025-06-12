import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner"; // Renamed to avoid conflict
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Import generated pages
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import MoveMoneyFlowPage from "./pages/MoveMoneyFlowPage";
import CardManagementPage from "./pages/CardManagementPage";
import TransactionHistoryPage from "./pages/TransactionHistoryPage";
import NotFound from "./pages/NotFound"; // Assuming NotFound.tsx exists

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner richColors position="top-right" /> {/* Using Sonner with richColors and position */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} /> {/* Default to LoginPage */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/move-money" element={<MoveMoneyFlowPage />} />
          <Route path="/card-management" element={<CardManagementPage />} />
          <Route path="/card-management/:accountId" element={<CardManagementPage />} /> {/* Route for card management with account context */}
          <Route path="/transactions" element={<TransactionHistoryPage />} /> {/* Generic transaction history */}
          <Route path="/transactions/:accountId" element={<TransactionHistoryPage />} /> {/* Transaction history for a specific account */}
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} /> {/* Always Include This Line As It Is. */}
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;