import * as React from "react";
// Importa os primitivos da Radix UI para gerenciar o carregamento de imagens de perfil
import * as AvatarPrimitive from "@radix-ui/react-avatar";

import { cn } from "@/lib/utils";

// Componente Raiz: Define o tamanho e o formato (círculo) do avatar
function Avatar({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Root>) {
  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      // size-8 define um tamanho padrão (32px), rounded-full cria o círculo
      className={cn(
        "relative flex size-8 shrink-0 overflow-hidden rounded-full",
        className
      )}
      {...props}
    />
  );
}

// Componente de Imagem: Renderiza a foto do usuário
function AvatarImage({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Image>) {
  return (
    <AvatarPrimitive.Image
      data-slot="avatar-image"
      // Garante que a imagem preencha todo o espaço circular
      className={cn("aspect-square size-full", className)}
      {...props}
    />
  );
}

// Componente de Fallback: Aparece apenas se a imagem falhar ou estiver carregando
function AvatarFallback({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Fallback>) {
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      // Estilização para mostrar as iniciais do usuário centralizadas
      className={cn(
        "bg-muted flex size-full items-center justify-center rounded-full",
        className
      )}
      {...props}
    />
  );
}

export { Avatar, AvatarImage, AvatarFallback };
