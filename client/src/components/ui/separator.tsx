import * as React from "react";
// Importa o primitivo da Radix UI para divisores acessíveis
import * as SeparatorPrimitive from "@radix-ui/react-separator";

import { cn } from "@/lib/utils";

function Separator({
  className,
  orientation = "horizontal", // Define se a linha é deitada (horizontal) ou em pé (vertical)
  decorative = true,           // Se true, leitores de tela ignoram o elemento (puro visual)
  ...props
}: React.ComponentProps<typeof SeparatorPrimitive.Root>) {
  return (
    <SeparatorPrimitive.Root
      data-slot="separator"
      decorative={decorative}
      orientation={orientation}
      className={cn(
        // bg-border: usa a cor de borda do tema; shrink-0: evita que o divisor amasse em flexbox
        "bg-border shrink-0",
        // Estilos para linha Horizontal: altura de 1px e largura total
        "data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full",
        // Estilos para linha Vertical: altura total e largura de 1px
        "data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px",
        className
      )}
      {...props}
    />
  );
}

export { Separator };
