import { Footer, Header } from "@/components/layout";

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="h-screen bg-neutral-50">
      <Header className="absolute top-0 left-0 w-full" />
      <main className="mx-auto flex h-full max-w-[1065px] items-center justify-center pt-20 pb-25">
        {children}
      </main>
      <Footer className="absolute bottom-0 left-0 w-full" />
    </div>
  );
};

export default Layout;
