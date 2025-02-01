import { ThemeProvider } from "@/components/ui/theme-provider/theme-provider";
import localFont from "next/font/local";

import type { Metadata } from "next";
import { Bayon, Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "300", "700", "500", "600"],
  variable: "--font-Space_Grotesk",
});
const BanglaHeading = localFont({
  src: [
    {
      path: "../Assets/Fonts/BanglaHeading.ttf",
      weight: "normal",
    },
  ],
  variable: "--font-BanglaHeading",
});
const BanglaSubHeading = localFont({
  src: [
    {
      path: "../Assets/Fonts/BanglaSubHeading.ttf",
      weight: "normal",
    },
  ],
  variable: "--font-BanglaSubHeading",
});
const bayon = Bayon({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-Bayon",
});
export const metadata: Metadata = {
  title: "Chobegraphy",
  description: "A photography site",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} ${spaceGrotesk.className} ${bayon.className} ${BanglaHeading.variable} ${BanglaSubHeading.variable} bg-background dark:bg-background font-Space`}
      >
        {" "}
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
