import type { Metadata } from "next";
import { Inter, Fraunces, Noto_Sans_Telugu, Noto_Serif_Telugu } from "next/font/google";
import "./globals.css";
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

const notoTelugu = Noto_Sans_Telugu({
    subsets: ["telugu"],
    weight: ["400", "500", "600", "700"],
    variable: "--font-telugu",
    display: "swap",
});

const notoTeluguSerif = Noto_Serif_Telugu({
    subsets: ["telugu"],
    weight: ["400", "500", "600", "700"],
    variable: "--font-telugu-display",
    display: "swap",
});

export const metadata: Metadata = {
  title: "Diary",
  description: "A personal diary. Notes on whatever holds my attention long enough to write down.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${fraunces.variable} ${notoTelugu.variable} ${notoTeluguSerif.variable}`}>
      <body>
        <Starfield />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}
