"use client";

//  React & Hooks
import { useEffect } from "react";

//  Shadcn Components
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/ui/card";

//  Modal
import { ModalTrigger } from "@template/component/Dialogue";

//  Context & Layout
import { usePermission } from "@template/context/PermissionContext";
import DashBoardLayout from "@/Layout/dashboardLayout";
import { transactionColumns } from "@/component/Table/columns";
import { GenericTable } from "@/component/Table/GenericTable";

//  Data
import { transactionData } from "@/constants/transaction.constant";

// Enums
import { Permission } from "@/enum/permission.enum";
import { DashboardText } from "@/enum/dashboard.enum";
import { reportData } from "@/constants/reports.constant";
import { TRANSACTION_STATUS } from "@/constants/role.constant";

const Dashboard = () => {
  const { hasPermission, setPermissions } = usePermission();

  useEffect(() => {
    setPermissions([Permission.DASHBOARD]);
  }, [setPermissions]);

  const canView = hasPermission(Permission.DASHBOARD);

  return (
    <DashBoardLayout>
      {/* <div className="pb-6">
        <ModalTrigger
          label="Open Modal"
          title="Delete Item?"
          description="Are you sure you want to delete this item?"
          onOk={() => console.log("Confirmed")}
          onCancel={() => console.log("Cancelled")}
        />
      </div> */}
      {/* Report Cards */}
      {canView && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pb-8">
          {reportData.map((report) => (
            <Card key={report.title} className="p-4 shadow-3xl">
              <CardHeader>
                <CardTitle className="text-lg py-0">{report.title}</CardTitle>
              </CardHeader>
              <CardDescription className="text-sm py-1">
                {report?.description || "-"}
              </CardDescription>
              <CardContent>
                <p className="text-2xl font-bold">${report.value || "-"}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Table Section */}
      {canView && (
        <Card className="p-4">
          <CardHeader>
            <CardTitle>{DashboardText.TRANSACTION_TABLE}</CardTitle>
          </CardHeader>

          <CardContent className="overflow-x-auto">
            <GenericTable
              data={transactionData}
              columns={transactionColumns}
              filters={[
                {
                  columnId: "status",
                  options: TRANSACTION_STATUS,
                },
              ]}
            />
          </CardContent>
        </Card>
      )}
    </DashBoardLayout>
  );
};

export default Dashboard;
