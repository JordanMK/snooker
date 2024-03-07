import BaseLayout from "@/layout/BaseLayout";
import Link from "next/link";
import React from "react";


export default function Home() {
  return (
    <BaseLayout>
    <p>test</p>
      <Link href='/login'>To Login Page</Link>
  </BaseLayout>
    
  );
}
