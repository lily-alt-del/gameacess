import * as React from "react";
// Primitivos da Radix UI para navegação por abas com suporte a teclado (setas)
import * as TabsPrimitive from "@radix-ui/react-tabs";

import { cn } from "@/lib/utils";

// Componente Raiz: Define o valor padrão e a direção (horizontal/vertical)
function Tabs({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      className={cn("flex flex-col gap-2", className)}
      {...props}
    />
  );
}

// Lista de Abas: O container (trilho) que segura os botões de gatilho
function TabsList({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List>) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      // Estilização: Fundo suave (muted) e bordas arredondadas estilo "pílula"
      className={cn(
        "bg-muted text-muted-foreground inline-flex h-9 w-fit items-center justify-center rounded-lg p-[3px]",
        className
      )}
      {...props}
    />
  );
}

// Gatilho da Aba: O botão que o usuário clica para alternar o conteúdo
function TabsTrigger({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      // Estilização Dinâmica: Quando ativa (data-[state=active]), ganha fundo branco e sombra
      className={cn(
        "data-[state=active]:bg-background text-foreground inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-2 py-1 text-sm font-medium transition-all focus-visible:ring-[3px] disabled:opacity-50",
        className
      )}
      {...props}
    />
  );
}

// Conteúdo da Aba: O painel que fica visível apenas quando sua aba correspondente é selecionada
function TabsContent({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      // flex-1 garante que o conteúdo ocupe o espaço restante se necessário
      className={cn("flex-1 outline-none", className)}
      {...props}
    />
  );
}

export { Tabs, TabsList, TabsTrigger, TabsContent };
