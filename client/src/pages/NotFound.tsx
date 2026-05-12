// ============================================================
// IMPORTAÇÕES - Componentes e Ícones
// ============================================================
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle, Home } from "lucide-react";
import { useLocation } from "wouter";

// ============================================================
// COMPONENTE PÁGINA 404 - Página Não Encontrada
// ============================================================
// Esta página é exibida quando o usuário tenta acessar uma URL que não existe
export default function NotFound() {
  // Hook do Wouter para navegar entre páginas
  const [, setLocation] = useLocation();

  // ============================================================
  // FUNÇÃO - Navegar para Home
  // ============================================================
  // Quando o botão "Ir para Home" é clicado, redireciona para a página inicial
  const handleGoHome = () => {
    setLocation("/");
  };

  // ============================================================
  // RENDERIZAÇÃO - Estrutura da Página 404
  // ============================================================
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Card Principal - Contém o conteúdo do erro */}
      <Card className="w-full max-w-lg mx-4 shadow-lg border-0 bg-white/80 backdrop-blur-sm">
        <CardContent className="pt-8 pb-8 text-center">
          {/* Ícone de Alerta - Animado com pulsação */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              {/* Fundo pulsante atrás do ícone */}
              <div className="absolute inset-0 bg-red-100 rounded-full animate-pulse" />
              
              {/* Ícone de alerta vermelho */}
              <AlertCircle className="relative h-16 w-16 text-red-500" />
            </div>
          </div>

          {/* Código de Erro - 404 */}
          <h1 className="text-4xl font-bold text-slate-900 mb-2">404</h1>

          {/* Título do Erro */}
          <h2 className="text-xl font-semibold text-slate-700 mb-4">
            Página Não Encontrada
          </h2>

          {/* Mensagem Descritiva */}
          <p className="text-slate-600 mb-8 leading-relaxed">
            Desculpe, a página que você está procurando não existe.
            <br />
            Ela pode ter sido movida ou deletada.
          </p>

          {/* Botão para Voltar à Home */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              onClick={handleGoHome}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
            >
              {/* Ícone de Casa */}
              <Home className="w-4 h-4 mr-2" />
              Ir para Home
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
