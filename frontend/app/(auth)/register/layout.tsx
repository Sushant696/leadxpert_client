import SignupHeader from "@/features/auth/components/signup-header";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "LeadXpert create account",
  description: "Create account at leadXpert",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
      >
        <SignupHeader />
        {children}
      </body>
    </html>
  );
}
