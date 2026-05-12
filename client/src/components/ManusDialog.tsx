// ============================================================
// IMPORTAÇÕES - React Hooks e Componentes de Dialog
// ============================================================
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";

// ============================================================
// INTERFACE ManusDialogProps - Propriedades do Dialog
// ============================================================
// Define as propriedades que o componente ManusDialog pode receber
interface ManusDialogProps {
  title?: string;                    // Título do dialog
  logo?: string;                     // URL da logo/imagem
  open?: boolean;                    // Se o dialog está aberto ou fechado
  onLogin: () => void;               // Função chamada quando o usuário clica em Login
  onOpenChange?: (open: boolean) => void; // Função para controlar abertura/fechamento
  onClose?: () => void;              // Função chamada quando o dialog fecha
}

// ============================================================
// COMPONENTE ManusDialog - Dialog de Login com Manus
// ============================================================
// Este componente exibe um dialog para o usuário fazer login com Manus
export function ManusDialog({
  title,
  logo,
  open = false,
  onLogin,
  onOpenChange,
  onClose,
}: ManusDialogProps) {
  // ============================================================
  // ESTADO - Controla se o dialog está aberto ou fechado
  // ============================================================
  // Se onOpenChange for fornecido, o componente pai controla o estado
  // Caso contrário, este componente gerencia seu próprio estado
  const [internalOpen, setInternalOpen] = useState(open);

  // ============================================================
  // EFEITO - Sincroniza o estado quando 'open' muda
  // ============================================================
  // Atualiza o estado interno quando a propriedade 'open' muda
  // (apenas se onOpenChange não for fornecido)
  useEffect(() => {
    if (!onOpenChange) {
      setInternalOpen(open);
    }
  }, [open, onOpenChange]);

  // ============================================================
  // FUNÇÃO - Controla a Abertura/Fechamento do Dialog
  // ============================================================
  // Quando o estado do dialog muda (abre ou fecha)
  const handleOpenChange = (nextOpen: boolean) => {
    // Se onOpenChange foi fornecido, chama a função do componente pai
    if (onOpenChange) {
      onOpenChange(nextOpen);
    } else {
      // Caso contrário, atualiza o estado interno
      setInternalOpen(nextOpen);
    }

    // Se o dialog está fechando, chama a função onClose
    if (!nextOpen) {
      onClose?.();
    }
  };

  // ============================================================
  // RENDERIZAÇÃO - Estrutura do Dialog
  // ============================================================
  return (
    <Dialog
      open={onOpenChange ? open : internalOpen}
      onOpenChange={handleOpenChange}
    >
      {/* Conteúdo do Dialog */}
      <DialogContent className="py-5 bg-[#f8f8f7] rounded-[20px] w-[400px] shadow-[0px_4px_11px_0px_rgba(0,0,0,0.08)] border border-[rgba(0,0,0,0.08)] backdrop-blur-2xl p-0 gap-0 text-center">
        {/* Seção Superior - Logo, Título e Descrição */}
        <div className="flex flex-col items-center gap-2 p-5 pt-12">
          {/* Logo/Imagem do Dialog */}
          {logo ? (
            <div className="w-16 h-16 bg-white rounded-xl border border-[rgba(0,0,0,0.08)] flex items-center justify-center">
              <img src={logo} alt="Dialog graphic" className="w-10 h-10 rounded-md" />
            </div>
          ) : null}

          {/* Título do Dialog */}
          {title ? (
            <DialogTitle className="text-xl font-semibold text-[#34322d] leading-[26px] tracking-[-0.44px]">
              {title}
            </DialogTitle>
          ) : null}

          {/* Descrição/Subtítulo */}
          <DialogDescription className="text-sm text-[#858481] leading-5 tracking-[-0.154px]">
            Por favor, faça login com Manus para continuar
          </DialogDescription>
        </div>

        {/* Seção Inferior - Botão de Login */}
        <DialogFooter className="px-5 py-5">
          {/* Botão de Login com Manus */}
          <Button
            onClick={onLogin}
            className="w-full h-10 bg-[#1a1a19] hover:bg-[#1a1a19]/90 text-white rounded-[10px] text-sm font-medium leading-5 tracking-[-0.154px]"
          >
            Login com Manus
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
