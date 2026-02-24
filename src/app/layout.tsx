import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SpacetimeGrid from "@/components/SpacetimeGrid";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Bansi Maddali",
  description: "Personal website of Bansi Maddali — Physics enthusiast, photographer, and ML engineer.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SpacetimeGrid />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
