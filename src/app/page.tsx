'use client'
import BaseLayout from "@/layout/BaseLayout";
import Link from "next/link";
import React from "react";
import JustasLogin from "../components/justasLogin/page.jsx"
// import './globals.css';

  
export default function Home() {
  return (
    <>
    {/* <LoginPage></LoginPage> */}
    <JustasLogin></JustasLogin>
    </>
  );
}
