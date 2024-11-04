"use client"
import LijstSeizoen from "@/components/admin/LijstSeizoen"
import Users from "@/components/admin/users/users"
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function Home() {
  const router = useRouter()

  // TODO: use getAdminState from api calls
  useEffect(() => {
    const isAdmin = localStorage.getItem('admin')
    if (isAdmin === 'false') {
      router.push('/')
    }
  }, [])

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
