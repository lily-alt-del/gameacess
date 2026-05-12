import * as React from "react";
// Importa os primitivos da Radix UI para cartões que aparecem no hover (sobreposição)
import * as HoverCardPrimitive from "@radix-ui/react-hover-card";

import { cn } from "@/lib/utils";

// Componente Raiz: Gerencia o estado de visibilidade e o atraso (delay) do hover
function HoverCard({
  ...props
}: React.ComponentProps<typeof HoverCardPrimitive.Root>) {
  return <HoverCardPrimitive.Root data-slot="hover-card" {...props} />;
}

// Gatilho: O elemento que, ao receber o mouse, dispara a abertura do card
function HoverCardTrigger({
  ...props
}: React.ComponentProps<typeof HoverCardPrimitive.Trigger>) {
  return (
    <HoverCardPrimitive.Trigger data-slot="hover-card-trigger" {...props} />
  );
}

// Conteúdo: O cartão que aparece flutuando próximo ao gatilho
function HoverCardContent({
  className,
  align = "center", // Alinhamento padrão centralizado
  sideOffset = 4,   // Distância de 4px do elemento gatilho
  ...props
}: React.ComponentProps<typeof HoverCardPrimitive.Content>) {
  return (
    // Portal: Renderiza o conteúdo em uma camada acima de tudo no DOM
    <HoverCardPrimitive.Portal data-slot="hover-card-portal">
      <HoverCardPrimitive.Content
        data-slot="hover-card-content"
        align={align}
        sideOffset={sideOffset}
        // Classes de animação: lida com fade, zoom e deslize baseado no lado onde o card aparece
        className={cn(
          "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-64 origin-(--radix-hover-card-content-transform-origin) rounded-md border p-4 shadow-md outline-hidden",
          className
        )}
        {...props}
      />
    </HoverCardPrimitive.Portal>
  );
}

export { HoverCard, HoverCardTrigger, HoverCardContent };
