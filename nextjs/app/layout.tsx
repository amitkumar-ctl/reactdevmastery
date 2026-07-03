import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://reactdevmastery.com'),
  title: {
    default: 'ReactDevMastery — Senior Frontend Engineer Learning Platform',
    template: '%s | ReactDevMastery',
  },
  description:
    'Interactive visualizers, real interview rounds, and 900+ concept-level Q&As built specifically for engineers targeting senior frontend roles. Free, forever.',
  keywords: [
    'React interview prep',
    'senior frontend engineer',
    'JavaScript internals',
    'React Fiber',
    'frontend interview questions',
    'useEffect explained',
    'event loop JavaScript',
    'Next.js learning',
  ],
  authors: [{ name: 'ReactDevMastery' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://reactdevmastery.com',
    siteName: 'ReactDevMastery',
    title: 'ReactDevMastery — Senior Frontend Engineer Learning Platform',
    description:
      'Go from mid-level to senior engineer. Interactive visualizers, interview rounds, and 900+ Q&As. Free.',
    images: [{ url: '/assets/logo-master.svg', width: 512, height: 512 }],
  },
  twitter: {
    card: 'summary',
    title: 'ReactDevMastery',
    description: 'Senior Frontend Engineer Learning Platform — free forever.',
  },
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
  manifest: '/manifest.json',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-mono bg-bg-base text-text-primary antialiased">
        {children}
      </body>
    </html>
  );
}
