import BaseLayout from "@/layout/BaseLayout";
import LijstSeizoen from "@/components/Admin/LijstSeizoen";
export default function Home() {
  return (
    <BaseLayout>
      <h1>Admin</h1>
      <LijstSeizoen></LijstSeizoen>
    </BaseLayout>
  );
}