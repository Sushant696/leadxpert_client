import Navigation from "@/components/layout/navbar/navigation";
import Footer from "@/components/layout/footer";

type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Navigation />
      <main>{children}</main>
      <Footer />
    </>
  );
}

