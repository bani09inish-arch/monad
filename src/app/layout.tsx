export const metadata = {
  title: "MonTrade",
  description: "Monad intelligence using GoldRush APIs"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  );
}
