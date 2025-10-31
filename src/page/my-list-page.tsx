import { AuthGuard } from "@/components/section";

const MyListPage = () => {
  return <AuthGuard>MyListPage</AuthGuard>;
};

export default MyListPage;
