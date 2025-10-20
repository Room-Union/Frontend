import { Footer, Header } from "@/components/layout";

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div>
      <div className="min-h-screen">
        <Header />
        <main className="pc:max-w-[1200px] pc:px-5 tb:px-6 mo:px-5 mx-auto">
          {children}
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
