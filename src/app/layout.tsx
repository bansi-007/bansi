import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
// import NeuroPhysicsBackground from "@/components/NeuroPhysicsBackground";
import SpacetimeGrid from "@/components/SpacetimeGrid";

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
      <body>
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
