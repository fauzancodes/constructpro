import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/ui/home/navbar";
import Footer from "@/ui/home/footer";
import { SairaSemiCondensed } from "@/ui/home/fonts";
import WhatsappButton from "@/ui/home/whatsappButton";

export const metadata: Metadata = {
  title: "Gema Karya Makmur",
  description: "Gema Karya Makmur",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script src="https://www.google.com/recaptcha/api.js" async defer></script>
      </head>
      <body className={`${SairaSemiCondensed.className} antialiased`}>
        <Navbar />
        {children}
        <WhatsappButton />
        <Footer />
      </body>
    </html>
  );
}
