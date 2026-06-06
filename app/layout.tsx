import type { Metadata } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import LayoutClient from '../components/LayoutClient';
import '../index.css';


const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'MBSYS | Enterprise IT Infrastructure & Security',
  description: 'Enterprise IT infrastructure, high-definition CCTV security solutions, high-performance networking connectivity, and professional workspace renovation in Bengaluru.',
  keywords: 'MBSYS, IT infrastructure, CCTV Bengaluru, Office renovation, Networking solutions, Security systems',
  icons: {
    icon: '/favicon.png',
  },
  openGraph: {
    title: 'MBSYS | Enterprise IT Infrastructure & Security',
    description: 'Enterprise IT infrastructure, high-definition CCTV security solutions, high-performance networking connectivity, and professional workspace renovation in Bengaluru.',
    type: 'website',
    url: 'https://mbsys.co.in',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc51?q=80&w=1200',
        width: 1200,
        height: 630,
        alt: 'MBSYS Enterprise IT Solutions',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} dark`}>
      <body className="bg-slate-950 text-slate-100 antialiased overflow-x-hidden w-full">
        <LayoutClient>{children}</LayoutClient>

      </body>
    </html>
  );
}
