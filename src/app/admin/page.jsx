"use client"
import LijstSeizoen from "@/components/admin/LijstSeizoen"
import Users from "@/components/admin/users/users"
import { getAdminStatus } from "@/src/api_calls"
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function Home() {
  const router = useRouter()
  const [isAdmin, setIsAdmin] = useState(false)

  const checkAuthState = async () => {
    const isAdmin = await getAdminStatus()
    console.info("TRACE: isAdmin", isAdmin)
    if (isAdmin) {
      setIsAdmin(isAdmin)
    } else {
      router.push("/")
    }
  }

  useEffect(() => { checkAuthState() }, [])

  if (!isAdmin) return null

  return (
    <>
      <div className="header">
        <h1>Dashboard Admin</h1>
      </div>
      <div className="container">
        <LijstSeizoen></LijstSeizoen>
        <Users></Users>
      </div>
    </>
  )
}
