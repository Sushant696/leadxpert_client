import type { Metadata } from "next";
import Navigation from "@/components/layout/navbar/navigation";
import Footer from "@/components/layout/footer";

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
      <body>
        <Navigation />
        {children}
        <Footer />
      </body>
    </html>
  );
}
