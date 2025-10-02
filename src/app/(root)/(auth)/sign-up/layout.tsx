import { Header } from "@/components/layout";

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div>
      <Header className="absolute top-0 left-0 w-full" />
      <main className="mx-auto max-w-[1065px]">{children}</main>
    </div>
  );
};

export default Layout;
