import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "katex/dist/katex.min.css";
import "./globals.css";
import Link from 'next/link';
import { FaGithub, FaInstagram, FaLinkedin, FaEnvelope, FaXTwitter } from "react-icons/fa6";
import Navigation from "@/components/Navigation";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { GoogleAnalytics } from "@next/third-parties/google";

const roboto = Roboto({
  variable: '--font-roboto',
  subsets: ['latin'],
  style: ['normal', 'italic'],
  weight: ['100', '300', '400', '500', '700', '800', '900'],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://germanamz.com'),
  title: {
    default: 'Germán Meza',
    template: '%s | Germán Meza',
  },
  description: 'Software Developer living out in Guadalajara, México.',
  keywords: ['software developer', 'full stack developer', 'react', 'nextjs', 'typescript', 'javascript', 'guadalajara', 'mexico'],
  authors: [{ name: 'Germán Meza' }],
  creator: 'Germán Meza',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://germanamz.com',
    siteName: 'Germán Meza',
    title: 'Germán Meza',
    description: 'Software Developer living out in Guadalajara, México.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Germán Meza',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Germán Meza',
    description: 'Software Developer living out in Guadalajara, México.',
    creator: '@germanamz',
    images: ['/og-image.png'],
  },
  alternates: {
    types: {
      'text/markdown': '/md',
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Add your verification codes here when available
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
    // yahoo: 'your-yahoo-verification-code',
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
        className={`${roboto.variable} antialiased p-4`}
      >
        <div className="max-w-[1000px] mt-28 mx-auto flex flex-col md:flex-row gap-14">
          <div className="max-w-[100px] flex flex-col gap-12 md:sticky md:top-28 md:self-start md:z-50">
            <div className="text-2xl font-bold text-[#37a900]">
              GM
            </div>
            <Navigation />
          </div>
          <div className="max-w-[700px]">
            {children}
            <footer className="text-sm text-gray-500 mt-12 flex flex-row justify-between">
              <p>© {new Date().getFullYear()} Germán Meza. All rights reserved.</p>
              <ul className="flex flex-row gap-4">
                <li>
                  <Link href="mailto:iam@germanamz.com" target="_blank"><FaEnvelope className="w-4 h-4" /></Link>
                </li>
                <li>
                  <Link href="https://x.com/germanamz" target="_blank"><FaXTwitter className="w-4 h-4" /></Link>
                </li>
                <li>
                  <Link href="https://github.com/germanamz" target="_blank"><FaGithub className="w-4 h-4" /></Link>
                </li>
                <li>
                  <Link href="https://linkedin.com/in/germanamz" target="_blank"><FaLinkedin className="w-4 h-4" /></Link>
                </li>
                <li>
                  <Link href="https://instagram.com/germanamz" target="_blank"><FaInstagram className="w-4 h-4" /></Link>
                </li>
              </ul>
            </footer>
          </div>
        </div>
        <Analytics />
        <SpeedInsights />
      </body>
      <GoogleAnalytics gaId="G-10JWQ5PYE7" />
    </html>
  );
}
