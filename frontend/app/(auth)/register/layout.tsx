import type { Metadata } from "next";

import SignupHeader from "@/features/auth/components/SignupHeader";

export const metadata: Metadata = {
  title: "LeadXpert create account",
  description: "Create account at leadXpert",
};

type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <SignupHeader />
      {children}
    </>
  );
}
