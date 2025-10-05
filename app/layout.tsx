import type { Metadata } from 'next';
import { Montserrat, Raleway } from 'next/font/google';
import './globals.css';

const montserrat = Montserrat({
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-montserrat',
  subsets: ['latin'],
});

const raleway = Raleway({
  weight: ['600', '700'],
  variable: '--font-raleway',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Тарифные планы - Выберите подходящий тариф',
  description: 'Специальное предложение на тарифные планы с ограниченным временем действия',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ru'>
      <body className={`${montserrat.variable} ${raleway.variable} antialiased`}>{children}</body>
    </html>
  );
}
