import BaseLayout from "@/layout/BaseLayout";
import Link from "next/link";
import React from "react";
import LoginPage from "./login/page";
// import './globals.css';


export default function Home() {
  return (
    <>
     <LoginPage/>
     <div className="red">Please register here</div>
    </>
  );
}
