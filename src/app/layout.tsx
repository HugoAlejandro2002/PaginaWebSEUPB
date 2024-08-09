import "tailwindcss/tailwind.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import StoreProvider from "@/store/StoreProvider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "🧡💙|🐐CABRITA HUB🐐|💙🧡",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <StoreProvider>{children}
        </StoreProvider>
      </body>
    </html>
  );
}
