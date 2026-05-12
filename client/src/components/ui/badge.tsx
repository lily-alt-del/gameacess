import * as React from "react";
// O Slot permite que o componente se transforme em outro elemento (ex: um link <a>)
import { Slot } from "@radix-ui/react-slot";
// Gerenciador de variantes para definir estilos como 'outline' ou 'destructive'
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

// Definição visual das variantes do Badge
const badgeVariants = cva(
  // Base: layout flexível, texto pequeno, bordas arredondadas e suporte a ícones (svg)
  "inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden",
  {
    variants: {
      variant: {
        // [a&]:hover -> Aplica o hover apenas se o componente for um link (âncora)
        default:
          "border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
        destructive:
          "border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

function Badge({
  className,
  variant,
  asChild = false, // Se true, o Badge assume o comportamento do elemento filho
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  // Decide se renderiza uma <span> comum ou o componente passado como filho
  const Comp = asChild ? Slot : "span";

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
