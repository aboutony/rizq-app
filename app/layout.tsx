import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
// FIX: Import React to resolve the 'React.ReactNode' type.
import React from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "RIZQ",
  description: "Protecting a tutor's time and income.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
