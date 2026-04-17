import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { CartProvider } from '@/context/CartContext';
import { ThemeProvider } from '@/context/ThemeContext';
import ThemeWrapper from '@/components/ThemeWrapper';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'ShopZap — Premium Shopping',
  description: 'Discover amazing products at unbeatable prices.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body style={{ margin: 0, padding: 0 }}>
        <ThemeProvider>
          <CartProvider>
            <ThemeWrapper>
              <Navbar />
              <main style={{ flex: 1 }}>{children}</main>
              <Footer />
            </ThemeWrapper>
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
