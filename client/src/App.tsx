// ============================================================
// IMPORTAÇÕES - Componentes e Contextos Principais
// ============================================================
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";

// ============================================================
// COMPONENTE ROUTER - Define as Rotas da Aplicação
// ============================================================
// Este componente gerencia a navegação entre páginas
// - "/" = Página inicial (Home)
// - "/404" = Página de erro
// - Qualquer outra rota = Página de erro (fallback)
function Router() {
  return (
    <Switch>
      {/* Rota da página inicial */}
      <Route path={"/"} component={Home} />
      
      {/* Rota da página de erro */}
      <Route path={"/404"} component={NotFound} />
      
      {/* Rota padrão para qualquer URL não encontrada */}
      <Route component={NotFound} />
    </Switch>
  );
}

// ============================================================
// COMPONENTE PRINCIPAL - App
// ============================================================
// Estrutura geral da aplicação com provedores de contexto
// 
// Provedores utilizados:
// 1. ErrorBoundary - Captura erros em tempo de execução
// 2. ThemeProvider - Gerencia tema claro/escuro (defaultTheme="light")
// 3. TooltipProvider - Ativa funcionalidade de tooltips em toda a app
// 4. Toaster - Exibe notificações (toast) do Sonner
// 5. Router - Sistema de roteamento de páginas
function App() {
  return (
    <ErrorBoundary>
      {/* Provedor de Tema - Define o tema padrão como "light" (claro) */}
      <ThemeProvider
        defaultTheme="light"
        // Descomente a linha abaixo para permitir alternância de tema
        // switchable
      >
        {/* Provedor de Tooltips - Ativa tooltips em toda a aplicação */}
        <TooltipProvider>
          {/* Toaster - Sistema de notificações */}
          <Toaster />
          
          {/* Router - Sistema de navegação entre páginas */}
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

// ============================================================
// EXPORTAÇÃO - App como componente padrão
// ============================================================
export default App;
