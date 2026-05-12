import * as React from "react";
// Importa os primitivos da Radix UI para barras de progresso acessíveis
import * as ProgressPrimitive from "@radix-ui/react-progress";

import { cn } from "@/lib/utils";

function Progress({
  className,
  value, // Valor atual do progresso (geralmente de 0 a 100)
  ...props
}: React.ComponentProps<typeof ProgressPrimitive.Root>) {
  return (
    // Container Raiz: define o trilho (fundo) da barra
    <ProgressPrimitive.Root
      data-slot="progress"
      className={cn(
        "bg-primary/20 relative h-2 w-full overflow-hidden rounded-full",
        className
      )}
      {...props}
    >
      {/* Indicador: a parte preenchida que se move conforme o valor */}
      <ProgressPrimitive.Indicator
        data-slot="progress-indicator"
        className="bg-primary h-full w-full flex-1 transition-all"
        // Lógica de movimento: usa CSS transform para uma performance de animação superior
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </ProgressPrimitive.Root>
  );
}

export { Progress };
