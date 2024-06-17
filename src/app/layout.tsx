import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/header';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'BizCard - 面倒な名刺づくりを一発解決',
  description: '',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ja'>
      <body className={inter.className}>
        <div className='h-[50px]'>
          <Header />
        </div>
        {children}
      </body>
    </html>
  );
}
