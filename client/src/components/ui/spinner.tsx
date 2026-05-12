import { Loader2Icon } from "lucide-react";

import { cn } from "@/lib/utils";

// Componente de ícone de carregamento reutilizável
function Spinner({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <Loader2Icon
      role="status"        // Atributo ARIA que indica um estado de atualização ou carregamento
      aria-label="Loading" // Texto lido por tecnologias assistivas para descrever o ícone
      // size-4 define 16px; animate-spin aplica a rotação contínua (360º)
      className={cn("size-4 animate-spin", className)}
      {...props}
    />
  );
}

export { Spinner };
