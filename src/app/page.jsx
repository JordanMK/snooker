"use client"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function Home() {
  const router = useRouter()
  // TODO: this useEffect() acts as a "temporary" fix to the error of "location not defined"
  useEffect(() => {
    //import("bootstrap/dist/css/bootstrap.min.css")

    const isLoggedIn = localStorage.getItem("userID") != null
    const isAdminPage = window.location.href.startsWith("/admin")

    if (isLoggedIn) {
      if (!isAdminPage) {
        router.push("/home")
        console.log("pushing root")
      }
    } else {
      router.push("/login")
      console.log("pushing login")
    }
  }, [])
}
