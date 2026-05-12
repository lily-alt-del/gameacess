// ============================================================
// IMPORTAÇÕES - Utilitários, Ícones e React
// ============================================================
import { cn } from "@/lib/utils";
import { AlertTriangle, RotateCcw } from "lucide-react";
import { Component, ReactNode } from "react";

// ============================================================
// INTERFACE Props - Propriedades do ErrorBoundary
// ============================================================
// Define que o componente recebe children (componentes filhos)
interface Props {
  children: ReactNode;
}

// ============================================================
// INTERFACE State - Estado do ErrorBoundary
// ============================================================
// Armazena se houve erro e qual foi o erro
interface State {
  hasError: boolean;
  error: Error | null;
}

// ============================================================
// COMPONENTE ErrorBoundary - Captura Erros da Aplicação
// ============================================================
// Este componente envolve toda a aplicação e captura erros
// que ocorrem em componentes filhos, evitando que a app quebre
class ErrorBoundary extends Component<Props, State> {
  // ============================================================
  // CONSTRUTOR - Inicializa o Estado
  // ============================================================
  // Define o estado inicial sem erros
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  // ============================================================
  // MÉTODO getDerivedStateFromError - Captura Erros
  // ============================================================
  // Este método é chamado quando um erro ocorre em um componente filho
  // Retorna o novo estado indicando que houve um erro
  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  // ============================================================
  // MÉTODO render - Renderiza a Interface
  // ============================================================
  // Se houve erro, exibe a página de erro
  // Caso contrário, renderiza os componentes filhos normalmente
  render() {
    // Se houve erro, exibe a página de erro
    if (this.state.hasError) {
      return (
        <div className="flex items-center justify-center min-h-screen p-8 bg-background">
          {/* Container Principal */}
          <div className="flex flex-col items-center w-full max-w-2xl p-8">
            {/* Ícone de Alerta */}
            <AlertTriangle
              size={48}
              className="text-destructive mb-6 flex-shrink-0"
            />

            {/* Título do Erro */}
            <h2 className="text-xl mb-4">Um erro inesperado ocorreu.</h2>

            {/* Caixa com Detalhes do Erro (Stack Trace) */}
            <div className="p-4 w-full rounded bg-muted overflow-auto mb-6">
              <pre className="text-sm text-muted-foreground whitespace-break-spaces">
                {/* Exibe o stack trace do erro para debug */}
                {this.state.error?.stack}
              </pre>
            </div>

            {/* Botão para Recarregar a Página */}
            <button
              onClick={() => window.location.reload()}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-lg",
                "bg-primary text-primary-foreground",
                "hover:opacity-90 cursor-pointer"
              )}
            >
              {/* Ícone de Recarregar */}
              <RotateCcw size={16} />
              Recarregar Página
            </button>
          </div>
        </div>
      );
    }

    // Se não houve erro, renderiza os componentes filhos normalmente
    return this.props.children;
  }
}

// ============================================================
// EXPORTAÇÃO - ErrorBoundary como componente padrão
// ============================================================
export default ErrorBoundary;
