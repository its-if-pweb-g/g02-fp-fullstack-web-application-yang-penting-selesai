import localFont from "next/font/local";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Metadata } from "next";
import Announcement from "./components/Announcement";
import { AuthProvider } from "./context/AuthContext";

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
    default: "E-Shop | Destinasi Belanja Online Anda",
    template: "%s | E-Shop",
  },
  description: "Pengalaman belanja online terlengkap dan termudah",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://situs-anda.com",
    siteName: "E-Shop",
  },
  metadataBase: new URL("https://situs-anda.com"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className="scroll-smooth">
      <body className="bg-white min-h-screen flex flex-col antialiased">
        <div className="flex flex-col flex-grow ">
          <AuthProvider>
            <Announcement />
            <Navbar />
            <main>{children}</main>
            <Footer />
          </AuthProvider>
        </div>
      </body>
    </html>
  );
}
