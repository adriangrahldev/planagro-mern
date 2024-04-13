import { Header } from "@/components/header/header.component";
import { Sidebar } from "@/components/sidebar/sidebar.component";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="dashboard-layout w-full h-full flex p-3">
      <Sidebar />
      <div className="dashboard-layout-content flex-1 flex flex-col">
        <Header />
        <div className="h-full p-4">
            {children}
        </div>
    </div>
    </div>
  );
};
export default DashboardLayout;
