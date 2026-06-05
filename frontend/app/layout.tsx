import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";

import "./globals.css";
import ToasterProvider from "@/utils/toastProvider";
import QueryProvider from "@/utils/query-provider";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-dm-sans",
});

export const metadata: Metadata = {
  title: "LeadXpert",
  description: "An smart lead management system.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${dmSans.variable}`}
      >
        <QueryProvider>
          <ToasterProvider />
          <div className="font-sans">
            {children}
          </div>
        </QueryProvider>
      </body>
    </html>
  );
}
