import { userColumns } from "@/component/Table/columns";
import { GenericTable } from "@/component/Table/GenericTable";
import { ROLESLIST, STATUSLIST } from "@/constants/role.constant";
import { userData } from "@/constants/users";
import DashBoardLayout from "@/Layout/dashboardLayout";

const User = () => {
  return (
    <>
      <DashBoardLayout>
        <div className="w-full">
          <GenericTable
            data={userData}
            columns={userColumns}
            rowLink={(row) => `/users/${row.id}`}
            filters={[
              {
                columnId: "role",
                options: ROLESLIST,
              },
              {
                columnId: "status",
                options: STATUSLIST,
              },
            ]}
          />
        </div>
      </DashBoardLayout>
    </>
  );
};

export default User;
