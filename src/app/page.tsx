import BaseLayout from "@/layout/BaseLayout";
import Link from "next/link";

export default function Home() {
  return (
    <BaseLayout>
      <p>test</p>
      <Link href={"/forgotPassword"}>Forgot</Link>
    </BaseLayout>
  );
}
