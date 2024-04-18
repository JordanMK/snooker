import BaseLayout from "@/layout/BaseLayout";
import LijstSeizoen from "@/components/Admin/LijstSeizoen";
import Users from "@/components/admin/users/users";

export default function Home() {

  return (
    <BaseLayout>

      <div className="header">
        <h1>Dashboard Admin</h1>
      </div>
      <div className="container">
        <LijstSeizoen></LijstSeizoen>
        <Users></Users>
      </div>

    </BaseLayout>
  );
}
