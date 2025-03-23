import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/ui/home/navbar";
import Footer from "@/ui/home/footer";
import { SairaSemiCondensed } from "@/ui/home/fonts";
import WhatsappButton from "@/ui/home/whatsappButton";

export const metadata: Metadata = {
  title: "ConstructPro",
  description: "ConstructPro is a leading construction company providing high-quality building, renovation, and infrastructure services. We deliver excellence with precision, innovation, and reliability. Contact us for your construction needs.",
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
