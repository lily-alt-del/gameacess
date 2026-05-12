import * as React from "react";
// Importa o CVA para gerenciar variantes de estilo (como 'default' e 'destructive')
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

// Define as classes base e as variações do alerta
const alertVariants = cva(
  // Layout principal: usa CSS Grid. Se houver um ícone (SVG), cria uma coluna para ele.
  "relative w-full rounded-lg border px-4 py-3 text-sm grid has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr] grid-cols-[0_1fr] has-[>svg]:gap-x-3 gap-y-0.5 items-start [&>svg]:size-4 [&>svg]:translate-y-0.5 [&>svg]:text-current",
  {
    variants: {
      variant: {
        // Estilo padrão: cores do card do tema
        default: "bg-card text-card-foreground",
        // Estilo de erro: cores destrutivas (vermelho) e ajuste na cor da descrição
        destructive:
          "text-destructive bg-card [&>svg]:text-current *:data-[slot=alert-description]:text-destructive/90",
      },
    },
    // Define o estilo padrão caso nenhum seja passado
    defaultVariants: {
      variant: "default",
    },
  }
);

// Componente principal do Alerta
function Alert({
  className,
  variant,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof alertVariants>) {
  return (
    <div
      data-slot="alert"
      role="alert" // Atributo de acessibilidade para leitores de tela
      className={cn(alertVariants({ variant }), className)}
      {...props}
    />
  );
}

// Componente para o título do alerta
function AlertTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-title"
      // col-start-2 garante que o título fique ao lado do ícone (se houver um)
      className={cn(
        "col-start-2 line-clamp-1 min-h-4 font-medium tracking-tight",
        className
      )}
      {...props}
    />
  );
}

// Componente para a descrição detalhada
function AlertDescription({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-description"
      // Mantém o alinhamento na segunda coluna do grid
      className={cn(
        "text-muted-foreground col-start-2 grid justify-items-start gap-1 text-sm [&_p]:leading-relaxed",
        className
      )}
      {...props}
    />
  );
}

export { Alert, AlertTitle, AlertDescription };
