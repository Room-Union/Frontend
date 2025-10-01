import { Footer } from "@/components/layout";

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="min-h-screen">
      <main className="mx-auto max-w-[1200px]">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
