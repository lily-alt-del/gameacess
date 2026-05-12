import * as React from "react";
// Importa os primitivos sem estilização da biblioteca Radix UI
import * as AccordionPrimitive from "@radix-ui/react-accordion";
// Importa o ícone de seta (Chevron)
import { ChevronDownIcon } from "lucide-react";

// Utilitário para mesclar classes de CSS (Tailwind) de forma limpa
import { cn } from "@/lib/utils";

// Componente Raiz do Accordion
function Accordion({
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Root>) {
  return <AccordionPrimitive.Root data-slot="accordion" {...props} />;
}

// Componente que envolve cada "item" (par de gatilho e conteúdo)
function AccordionItem({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      // Adiciona borda inferior, exceto no último item do grupo
      className={cn("border-b last:border-b-0", className)}
      {...props}
    />
  );
}

// Componente do botão que abre/fecha o item
function AccordionTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    // O cabeçalho é necessário para acessibilidade (geralmente renderiza um h3)
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          // Estilização: flexbox para alinhar texto e ícone, foco visual e animação de underline no hover
          "focus-visible:border-ring focus-visible:ring-ring/50 flex flex-1 items-start justify-between gap-4 rounded-md py-4 text-left text-sm font-medium transition-all outline-none hover:underline focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&[data-state=open]>svg]:rotate-180",
          className
        )}
        {...props}
      >
        {children}
        {/* Ícone de seta que rotaciona 180 graus quando o estado é 'open' */}
        <ChevronDownIcon className="text-muted-foreground pointer-events-none size-4 shrink-0 translate-y-0.5 transition-transform duration-200" />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

// Componente que contém o texto/informação revelada
function AccordionContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      data-slot="accordion-content"
      // Classes que acionam as animações de slide (definidas no tailwind.config)
      className="data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden text-sm"
      {...props}
    >
      {/* Div interna para aplicar padding sem quebrar a animação de altura do Radix */}
      <div className={cn("pt-0 pb-4", className)}>{children}</div>
    </AccordionPrimitive.Content>
  );
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
