import type { Metadata } from "next";
import { Inter, Fraunces, Source_Serif_4, Mandali, Suranna } from "next/font/google";
import "./globals.css";

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

const sourceSerif = Source_Serif_4({
    subsets: ["latin"],
    weight: ["400", "600"],
    style: ["normal", "italic"],
    variable: "--font-body",
    display: "swap",
});

const mandali = Mandali({
    subsets: ["telugu"],
    weight: "400",
    variable: "--font-telugu",
    display: "swap",
});

const suranna = Suranna({
    subsets: ["telugu"],
    weight: "400",
    variable: "--font-telugu-display",
    display: "swap",
});

export const metadata: Metadata = {
  title: "చిట్టా",
  description: "దృష్టి నిలిచినంతసేపు మనసుకు నచ్చిన సంగతులను రాసి పెట్టుకునే చిట్టా.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="te" className={`${inter.variable} ${fraunces.variable} ${sourceSerif.variable} ${mandali.variable} ${suranna.variable}`}>
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}
