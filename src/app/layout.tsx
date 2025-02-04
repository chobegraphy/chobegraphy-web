import { ThemeProvider } from "@/components/ui/theme-provider/theme-provider";
import localFont from "next/font/local";

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
export const metadata = {
  title: "Chobegraphy | Best Bangladeshi Photography & Wallpapers",
  description:
    "Discover stunning Bangladeshi photography and high-quality wallpapers at Chobegraphy. Explore, download, and enjoy breathtaking images in HD & 4K resolution.",
  keywords:
    "Bangladeshi photography, HD wallpapers, 4K images, photography in Bangladesh, mobile wallpapers, nature photography, Chobegraphy, landscape photography, street photography ,bangladesh,photography,street photography,bangladesh street photography,wedding photography,bangladeshi,bangladesh | pov photography,wedding photography bangladesh,bangladeshi wedding,photographer bangladesh,sar wedding photography bangladesh,street photography of bangladesh,best wedding photography bangladesh,pov street photography of bangladesh,bangladeshi photographer,wedding photography course in bangladesh,wedding photography training in bangladesh",
  openGraph: {
    title: "Chobegraphy - Bangladeshi Photography & HD Wallpapers",
    description:
      "Chobegraphy offers high-quality Bangladeshi photography and HD wallpapers. Explore a stunning collection of nature, street, and artistic photography.",
    url: "https://chobegraphy.vercel.app/",
    type: "website",
    images: [
      {
        url: "https://chobegraphy.vercel.app/cover-image.jpg", // Replace with your actual image
        width: 1200,
        height: 630,
        alt: "Chobegraphy - Bangladeshi Photography",
      },
    ],
  },
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
