import type { Metadata } from "next";
import "katex/dist/katex.min.css";
import "./globals.css";
import Link from 'next/link';
import { FaGithub, FaInstagram, FaLinkedin, FaEnvelope, FaXTwitter } from "react-icons/fa6";
import Navigation from "@/components/Navigation";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { GoogleAnalytics } from "@next/third-parties/google";
import { SITE_NAME, SOCIAL_PROFILES, baseMetadata } from "@/lib/site";

export const metadata: Metadata = {
  ...baseMetadata,
  verification: {
    // Add your verification codes here when available
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
    // yahoo: 'your-yahoo-verification-code',
  },
};

const socialLinks = [
  { href: SOCIAL_PROFILES.x, label: 'X (Twitter)', Icon: FaXTwitter },
  { href: SOCIAL_PROFILES.github, label: 'GitHub', Icon: FaGithub },
  { href: SOCIAL_PROFILES.linkedin, label: 'LinkedIn', Icon: FaLinkedin },
  { href: SOCIAL_PROFILES.instagram, label: 'Instagram', Icon: FaInstagram },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased p-4">
        <div className="max-w-[1000px] mt-28 mx-auto flex flex-col md:flex-row gap-14">
          <header className="max-w-[100px] flex flex-col gap-12 md:sticky md:top-28 md:self-start md:z-50">
            <Link href="/" className="text-2xl font-bold text-[#37a900]">
              GM<span className="sr-only"> — {SITE_NAME}, home</span>
            </Link>
            <Navigation />
          </header>
          <div className="max-w-[700px]">
            <main>{children}</main>
            <footer className="text-sm text-base-content/65 mt-12 flex flex-row justify-between">
              <p>© {new Date().getFullYear()} {SITE_NAME}. All rights reserved.</p>
              <ul className="flex flex-row gap-4">
                <li>
                  <a href="mailto:iam@germanamz.com" aria-label="Email">
                    <FaEnvelope className="w-4 h-4" aria-hidden="true" />
                  </a>
                </li>
                {socialLinks.map(({ href, label, Icon }) => (
                  <li key={href}>
                    <a href={href} target="_blank" rel="me noopener" aria-label={label}>
                      <Icon className="w-4 h-4" aria-hidden="true" />
                    </a>
                  </li>
                ))}
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
