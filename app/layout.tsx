import {
  Inter,
  Playfair_Display,
  Comic_Neue,
  Bodoni_Moda,
} from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { ToastProviderComponent } from "@/components/ui/toast";
import { AccessibilityProvider } from "@/components/AccessibilityProvider";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
const inter = Inter({ subsets: ["latin"] });
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});
const comicNeue = Comic_Neue({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-comic",
});
const bodoni = Bodoni_Moda({
  subsets: ["latin"],
  variable: "--font-bodoni",
});

export const metadata = {
  title:
    "Rajawadu | Premium Royal Mukhwas & Traditional Indian Mouth Fresheners",
  description:
    "Discover authentic, handcrafted royal Mukhwas blends made with century-old family recipes. Premium Indian mouth fresheners with exotic spices, nuts, and seeds for the perfect after-meal experience.",
  keywords:
    "mukhwas, mouth freshener, indian spices, premium mukhwas, royal mukhwas, rajawadu, joyspoon",
  authors: [{ name: "Rajawadu" }],
  creator: "Rajawadu",
  publisher: "Rajawadu",
  formatDetection: {
    email: false,
    telephone: false,
    address: false,
  },
  metadataBase: new URL("https://rajawadu.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title:
      "Rajawadu | Premium Royal Mukhwas & Traditional Indian Mouth Fresheners",
    description:
      "Discover authentic, handcrafted royal Mukhwas blends made with century-old family recipes. Premium Indian mouth fresheners with exotic spices, nuts, and seeds.",
    url: "https://rajawadu.com",
    siteName: "Rajawadu",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Rajawadu Premium Mukhwas",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rajawadu | Premium Royal Mukhwas",
    description:
      "Authentic, handcrafted royal Mukhwas blends made with century-old family recipes.",
    images: ["/images/og-image.jpg"], // Make sure this image exists
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=5"
        />
      </head>
      <body
        className={`${inter.className} ${playfair.variable} ${comicNeue.variable} ${bodoni.variable}`}
      >
        <AccessibilityProvider>
          <ToastProviderComponent>
            <Nav />
            <div className="pt-16 sm:pt-20">
              {/* <AccessibilityToolbar /> */}
              {children}
              <Analytics />
              <SpeedInsights />
            </div>
            <Footer />
          </ToastProviderComponent>
        </AccessibilityProvider>
      </body>
    </html>
  );
}
