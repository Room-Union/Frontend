import { Header } from "@/components/layout";

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="h-screen bg-neutral-50">
      <Header className="absolute top-0 left-0 w-full" />
      <main className="mx-auto h-full max-w-[1065px] pt-20">{children}</main>
    </div>
  );
};

export default Layout;
