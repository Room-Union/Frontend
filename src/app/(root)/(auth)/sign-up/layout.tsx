import { Header } from "@/components/layout";

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="min-h-screen bg-neutral-50">
      <Header className="absolute top-0 left-0 w-full" />
      <main className="pc:px-5 tb:px-6 mo:px-5 mx-auto h-full min-h-screen max-w-[1065px] pt-20 pb-25">
        {children}
      </main>
    </div>
  );
};

export default Layout;
