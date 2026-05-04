import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './styles/globals.css';
import { Providers } from './providers';

const inter = localFont({
  src: '../../public/fonts/inter-var-latin.woff2',
  variable: '--font-inter',
  display: 'swap',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: {
    default: 'AURA Career Fair 2026 — Beyond the Degree',
    template: '%s | MTU Career Services',
  },
  description:
    'Mountain Top University & SRC present AURA Career Fair 2026. Themed "Beyond the Degree" — connecting students with industry leaders, global opportunities, and career-defining conversations.',
  metadataBase: new URL('https://mtu.edu.ng'),
  openGraph: {
    type: 'website',
    siteName: 'MTU AURA Career Fair',
    locale: 'en_NG',
    images: [{ url: '/images/imagetwo.jpeg', width: 634, height: 795 }],
  },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Anton&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`${inter.variable} antialiased bg-[#F2E4CC] text-[#1A1A1A]`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
