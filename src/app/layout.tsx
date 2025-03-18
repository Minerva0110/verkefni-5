import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SessionProviderWrapper from "@/app/components/sessionProviderWrapper";


const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Vefforritunarprófið",
  description: "Vefforritunarverkefni í Next.js með Prisma og NextAuth.js",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="is">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <SessionProviderWrapper>{children}</SessionProviderWrapper> {/* ✅ Now wrapped properly */}
      </body>
    </html>
  );
}
