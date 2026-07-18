import type { Metadata } from "next";
import { Inter, Fraunces, Source_Serif_4, Mandali, Suranna, Monsieur_La_Doulaise } from "next/font/google";
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

const monsieur = Monsieur_La_Doulaise({
    subsets: ["latin"],
    weight: "400",
    variable: "--font-signature",
    display: "swap",
});

export const metadata: Metadata = {
  title: "రామదత్ కైఫీయత్",
    description: "కరణం గారి దృష్టికి నిలిచిన సంగతుల కైఫీయత్.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="te" className={`${inter.variable} ${fraunces.variable} ${sourceSerif.variable} ${mandali.variable} ${suranna.variable} ${monsieur.variable}`}>
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}
