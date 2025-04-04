
import DashboardLayout from "@/components/layouts/DashboardLayout";
import RoleBasedRenderer from "@/components/dashboard/RoleBasedRenderer";
import { dashboardsByRole } from "@/components/dashboard/dashboardsByRoleMap";

const DashboardPage = () => {
  return (
    <DashboardLayout>
      <RoleBasedRenderer componentsMap={dashboardsByRole} />
    </DashboardLayout>
  );
};

export default DashboardPage;
