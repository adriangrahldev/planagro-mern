"use client"
import { Header } from "@/components/header/header.component";
import { Sidebar } from "@/components/sidebar/sidebar.component";
import { UserProvider } from "@/contexts/UserContext";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <UserProvider>
      <div className="dashboard-layout w-full h-full flex p-3">
        <Sidebar />
        <div className="dashboard-layout-content flex-1 flex flex-col">
          <Header />
          <div className="h-full p-4">{children}</div>
        </div>
      </div>
    </UserProvider>
  );
};
export default DashboardLayout;
