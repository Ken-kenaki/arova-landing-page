import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Outfit } from "next/font/google";
import "./globals.css";

const sansFont = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const headingFont = Outfit({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

export const metadata: Metadata = {
  title: "arova | AI presentation copilot for people who present",
  description: "Arova is an AI presentation copilot that listens to your talk, tracks your flow, and automatically presents the right slide at the right moment.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${sansFont.variable} ${headingFont.variable} bg-[#0B0C0F]`}>
      <body className="min-h-screen font-sans antialiased bg-[#0B0C0F] text-[#F2F3F5] flex flex-col">
        {children}
      </body>
    </html>
  );
}

