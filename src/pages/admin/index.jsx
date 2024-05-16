import BaseLayout from "@/layout/BaseLayout";
import LijstSeizoen from "../../components/admin/LijstSeizoen";
import Users from "@/components/admin/users/users";
import { useEffect } from 'react';
import { useRouter } from 'next/router';


export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const isAdmin = localStorage.getItem('admin');

    if (isAdmin) {
      router.push('/');
    }
  }, []);

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
