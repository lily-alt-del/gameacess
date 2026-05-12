import { useTheme } from "next-themes";
// Importa o Sonner, uma biblioteca de notificações moderna e leve
import { Toaster as Sonner, type ToasterProps } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
  // Consome o tema atual (claro, escuro ou sistema) para sincronizar os avisos
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      // Customização via CSS Variables para usar as cores do seu tema (shadcn/ui padrão)
      style={
        {
          "--normal-bg": "var(--popover)",            // Fundo da notificação
          "--normal-text": "var(--popover-foreground)", // Cor do texto
          "--normal-border": "var(--border)",           // Cor da borda
        } as React.CSSProperties
      }
      {...props}
    />
  );
};

export { Toaster };
