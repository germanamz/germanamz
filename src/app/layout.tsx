import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import Link from 'next/link';
import { FaGithub, FaInstagram, FaLinkedin, FaEnvelope } from "react-icons/fa6";
import Navigation from "@/components/Navigation";
import { Analytics } from "@vercel/analytics/next"

const roboto = Roboto({
  variable: '--font-roboto',
  subsets: ['latin'],
  style: ['normal', 'italic'],
  weight: ['100', '300', '400', '500', '700', '800', '900'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Germán Meza',
  description: 'Software Developer living out in Guadalajara, México.',
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
      </body>
    </html>
  );
}
