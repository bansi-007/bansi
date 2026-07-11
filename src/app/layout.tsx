import type { Metadata } from "next";
import { Inter, Fraunces } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Starfield from "@/components/Starfield";

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-sans",
    display: "swap",
});

const fraunces = Fraunces({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
    style: ["normal", "italic"],
    variable: "--font-display",
    display: "swap",
});

export const metadata: Metadata = {
  title: "Long Exposure, Bansi Maddali",
  description: "Long Exposure, a personal blog by Bansi Maddali. Notes on whatever holds my attention long enough to write down.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${fraunces.variable}`}>
      <body>
        <Starfield />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <Navbar />
          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}
