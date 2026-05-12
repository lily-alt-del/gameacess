import { useDialogComposition } from "@/components/ui/dialog";
import { useComposition } from "@/hooks/useComposition";
import { cn } from "@/lib/utils";
import * as React from "react";

function Input({
  className,
  type,
  onKeyDown,
  onCompositionStart,
  onCompositionEnd,
  ...props
}: React.ComponentProps<"input">) {
  // Consome o contexto do Dialog para evitar que o modal feche por engano durante a digitação
  const dialogComposition = useDialogComposition();

  // Gerencia eventos de composição (útil para acentos e idiomas como japonês/chinês)
  const {
    onCompositionStart: handleCompositionStart,
    onCompositionEnd: handleCompositionEnd,
    onKeyDown: handleKeyDown,
  } = useComposition<HTMLInputElement>({
    onKeyDown: (e) => {
      // Verifica se o usuário ainda está "compondo" o caractere
      const isComposing = (e.nativeEvent as any).isComposing || dialogComposition.justEndedComposing();

      // Bloqueia a execução do onKeyDown se o Enter for usado apenas para confirmar a composição
      if (e.key === "Enter" && isComposing) {
        return;
      }

      // Se não for composição, executa a função de tecla normal
      onKeyDown?.(e);
    },
    onCompositionStart: e => {
      // Avisa ao contexto que a composição começou
      dialogComposition.setComposing(true);
      onCompositionStart?.(e);
    },
    onCompositionEnd: e => {
      // Sinaliza que a composição acabou de terminar
      dialogComposition.markCompositionEnd();
      
      // Delay de 100ms para lidar com o Safari, onde a ordem dos eventos é diferente
      setTimeout(() => {
        dialogComposition.setComposing(false);
      }, 100);
      onCompositionEnd?.(e);
    },
  });

  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        // Estilização base: bordas, sombras, cores de seleção e estados de foco (ring)
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        // Estilos para estado de erro (invalid)
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className
      )}
      // Aplica os handlers de composição e teclado tratados acima
      onCompositionStart={handleCompositionStart}
      onCompositionEnd={handleCompositionEnd}
      onKeyDown={handleKeyDown}
      {...props}
    />
  );
}

export { Input };
