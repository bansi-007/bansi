import type { Metadata } from "next";
import { NTR } from "next/font/google";
import "./globals.css";

const ntr = NTR({
    subsets: ["telugu", "latin"],
    weight: "400",
    variable: "--font-telugu",
    display: "swap",
});

export const metadata: Metadata = {
  title: "రామదత్ గారి కైఫీయత్",
  description: "కరణం గారి దృష్టికి నిలిచిన సంగతుల కైఫీయత్.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="te" className={ntr.variable}>
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}
