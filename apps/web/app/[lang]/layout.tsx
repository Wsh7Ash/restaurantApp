import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "TastyBites - Premium Food Delivery",
  description: "Experience the best food in town.",
};

export default async function RootLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>
}>) {
  const resolvedParams = await params;
  return (
    <html lang={resolvedParams.lang} dir={resolvedParams.lang === 'ar' ? 'rtl' : 'ltr'}>
      <body className={`${inter.variable}`}>
        {children}
      </body>
    </html>
  );
}
