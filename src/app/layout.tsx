import './globals.css';

export const metadata = {
  title: 'Access Game',
  description: 'mds',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}