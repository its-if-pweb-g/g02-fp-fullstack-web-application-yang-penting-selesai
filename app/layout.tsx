import localFont from "next/font/local";
import "./globals.css";
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { Metadata } from 'next';

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: {
    default: 'E-Shop | Destinasi Belanja Online Anda',
    template: '%s | E-Shop'
  },
  description: 'Pengalaman belanja online terlengkap dan termudah',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: 'https://situs-anda.com',
    siteName: 'E-Shop',
  },
  metadataBase: new URL('https://situs-anda.com')
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className="scroll-smooth">
      <body className="bg-gray-100 min-h-screen flex flex-col antialiased">
        <div className="flex flex-col flex-grow">
          <Navbar />
          <main className="flex-grow container mx-auto px-4 py-6 md:px-6 lg:px-8">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}