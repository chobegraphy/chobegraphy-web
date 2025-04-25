import { ThemeProvider } from "@/components/ui/theme-provider/theme-provider";
import localFont from "next/font/local";
import { Toaster } from "react-hot-toast";

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
  title: "Chobegraphy | Best Bangladeshi Photography ",
  description:
    "Discover stunning Bangladeshi photography and high-quality pictures at Chobegraphy. Explore, download, and enjoy breathtaking images in HD & 4K resolution.",
  keywords:
    "Bangladeshi photography,Chobe graphy,Chobegraphi,Chobigraphi,Chobe,Chobi, HD wallpapers, 4K images, photography in Bangladesh, mobile wallpapers, nature photography, Chobegraphy, landscape photography, street photography ,bangladesh,photography,street photography,bangladesh street photography,wedding photography,bangladeshi,bangladesh | pov photography,wedding photography bangladesh,bangladeshi wedding,photographer bangladesh,sar wedding photography bangladesh,street photography of bangladesh,best wedding photography bangladesh,pov street photography of bangladesh,bangladeshi photographer,wedding photography course in bangladesh,wedding photography training in bangladesh,ছবিগ্রাফি ,ছবিওয়ালা,ছবিপ্রিয়, ফটোগ্রাফি,বাংলাদেশি ফটোগ্রাফি,ছবিপ্রিয়, ছবি , ক্যামেরা , ডিজিটাল ফটোগ্রাফি , ফটোগ্রাফি টিপস , ফটোগ্রাফি ব্লগ , পেশাদার ,ফটোগ্রাফি , ফটোগ্রাফি টিউটোরিয়াল , ফটোগ্রাফি পরামর্শ , ছবি তোলা, , পোর্ট্রেট ফটোগ্রাফি , ল্যান্ডস্কেপ ফটোগ্রাফি , বিয়ের ফটোগ্রাফি, পণ্য ফটোগ্রাফি, ভ্রমণ ফটোগ্রাফি, খাবারের ফটোগ্রাফি, ফ্যাশন ফটোগ্রাফি, প্রাকৃতিক দৃশ্য ফটোগ্রাফি, রাস্তার ফটোগ্রাফি, ইভেন্ট ফটোগ্রাফি,, সাদা-কালো ফটোগ্রাফি, লং এক্সপোজার ফটোগ্রাফি, আকাশচুম্বী ফটোগ্রাফি, মাক্রো ফটোগ্রাফি, ফিল্ম ফটোগ্রাফি, ভিনটেজ ফটোগ্রাফি, স্টুডিও ফটোগ্রাফি, প্রাকৃতিক আলো ফটোগ্রাফি, আধুনিক ফটোগ্রাফি, বিমূর্ত ফটোগ্রাফি, DSLR ক্যামেরা,,ক্যামেরা এক্সেসরিজ, ফটোগ্রাফি সফটওয়্যার,ফটো এডিটিং টুলস,, আউটডোর ফটোগ্রাফি, শহরের ফটোগ্রাফি,প্রকৃতি ফটোগ্রাফি,ফটোগ্রাফি অবস্থান,ট্যুরিস্ট স্পট ফটোগ্রাফি, ফটোগ্রাফি টিপস, ফটোগ্রাফি দক্ষতা বৃদ্ধি,ক্যামেরা সেটিংস, ফটোগ্রাফি চ্যালেঞ্জ,ফটোগ্রাফির জন্য সেরা গিয়ার,,ফটোগ্রাফির অনুপ্রেরণা",
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
          <Toaster
            toastOptions={{
              className: "ToastClass",
            }}
            position="bottom-center"
            reverseOrder={false}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
