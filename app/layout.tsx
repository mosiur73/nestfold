import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Mini File Explorer',
  description: 'A mini file explorer built with Next.js, TypeScript, and Tailwind CSS for Webbly Media.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full antialiased">{children}</body>
    </html>
  );
}
