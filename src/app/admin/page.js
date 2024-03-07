import BaseLayout from "@/layout/BaseLayout";
import LijstSeizoen from "@/components/Admin/LijstSeizoen";
export default function Home() {
  return (
    <BaseLayout>
    <div className="header">
      <h1>Dashboard Admin</h1>
    </div>
      
      <LijstSeizoen></LijstSeizoen>
    </BaseLayout>
  );
}