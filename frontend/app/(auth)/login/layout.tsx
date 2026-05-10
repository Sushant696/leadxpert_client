import type { Metadata } from "next";

import LoginHeader from "@/features/auth/components/login-header";

export const metadata: Metadata = {
  title: "LeadXpert login",
  description: "Leadxpert login page",
};

type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <LoginHeader />
      {children}
    </>
  );
}
