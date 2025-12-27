import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'YouTube to Infographic Blog Generator',
  description: 'Transform YouTube videos into SEO-optimized infographic blogs using Gemini 3 Pro AI',
  keywords: ['YouTube', 'Infographic', 'Blog Generator', 'SEO', 'Gemini AI', 'Content Creation'],
  authors: [{ name: 'Gemini 3 Pro' }],
  openGraph: {
    title: 'YouTube to Infographic Blog Generator',
    description: 'Transform YouTube videos into SEO-optimized infographic blogs using Gemini 3 Pro AI',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
