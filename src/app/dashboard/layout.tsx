import { Header } from "../dashboard/components/header";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
        <Header />
        {children}
    </>
  );
}