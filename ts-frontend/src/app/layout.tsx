import type { Metadata } from "next";
import "./globals.css";
import Header from "./components/header";
import Footer from "./components/footer";

export const metadata: Metadata = {
  title: "Tech Service",
  description: "სერვისი დაგეხმარება საოჯახო ტექნიკის შეკეთებაში",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex flex-col items-center">
        <Header />
        <div className="min-h-[100vh] w-full flex flex-col">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
