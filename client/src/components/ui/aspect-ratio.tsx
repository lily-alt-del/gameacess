import * as AspectRatioPrimitive from "@radix-ui/react-aspect-ratio";

// Componente que mantém a proporção de um elemento (ex: 16/9)
function AspectRatio({
  ...props
}: React.ComponentProps<typeof AspectRatioPrimitive.Root>) {
  return (
    // O Root injeta um container que calcula a altura baseado na largura disponível
    <AspectRatioPrimitive.Root data-slot="aspect-ratio" {...props} />
  );
}

export { AspectRatio };
