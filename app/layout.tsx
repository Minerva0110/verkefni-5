
import "../styles/globals.scss";

export const metadata = {
  title: "Fréttavefur",
  description: "Verkefni 5 í vefforritun",
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
