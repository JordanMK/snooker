import BaseLayout from "@/layout/BaseLayout";
import Link from "next/link";
import React from "react";
import LoginPage from "../components/justasLogin/pages";
import Login from "../components/justasLogin/pages";
import JustasLogin from "../components/justasLogin/page.js"
// import './globals.css';

  
export default function Home() {
  return (
    <>
    {/* <LoginPage></LoginPage> */}
    <JustasLogin></JustasLogin>
     <div className="red">Please register here</div>
    </>
  );
}
