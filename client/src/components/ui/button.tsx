import * as React from "react";
// O Slot permite que o botão se torne outro elemento (ex: um Link do Next.js) mantendo o estilo
import { Slot } from "@radix-ui/react-slot";
// Gerencia as combinações de cores e tamanhos de forma organizada
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

// Definição das variantes visuais do botão
const buttonVariants = cva(
  // Base: Alinhamento central, transições suaves, estados desabilitados e foco (ring)
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        // Estilos de preenchimento, borda, ghost (transparente) e link
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border bg-transparent shadow-xs hover:bg-accent dark:bg-transparent dark:border-input dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost:
          "hover:bg-accent dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        // Controla altura, padding e tamanhos específicos para ícones solitários
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
        "icon-sm": "size-8",
        "icon-lg": "size-10",
      },
    },
    // Define o visual padrão ao usar <Button />
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

function Button({
  className,
  variant,
  size,
  asChild = false, // Permite composição com outros componentes (ex: Next Link)
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  // Se asChild for true, usa o Slot; caso contrário, uma tag <button> normal
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      // Mescla as variantes escolhidas com classes extras passadas via prop
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
