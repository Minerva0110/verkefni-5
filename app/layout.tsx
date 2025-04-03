import "../styles/globals.scss";

export const metadata = {
  title: "Fréttavefur",
  description: "Vefforritun 2 verkefni 5",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="is">
      <body>{children}</body>
    </html>
  );
}
