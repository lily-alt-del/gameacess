import * as React from "react";
// Importa o primitivo de Label da Radix UI, que melhora a acessibilidade nativa
import * as LabelPrimitive from "@radix-ui/react-label";

import { cn } from "@/lib/utils";

function Label({
  className,
  ...props
}: React.ComponentProps<typeof LabelPrimitive.Root>) {
  return (
    <LabelPrimitive.Root
      data-slot="label"
      className={cn(
        // Estilização: texto pequeno, alinhamento flexível e impede a seleção do texto ao clicar
        "flex items-center gap-2 text-sm leading-none font-medium select-none",
        // Desabilita a label se o grupo pai (como um FormItem) estiver desabilitado
        "group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50",
        // 'peer-disabled': reage automaticamente se o input vizinho estiver desabilitado
        "peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        className
      )}
      {...props}
    />
  );
}

export { Label };
