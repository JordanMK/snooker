"use client"
import LijstSeizoen from "@/components/admin/LijstSeizoen"
import Users from "@/components/admin/users/users"
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    const isAdmin = localStorage.getItem('admin')
    console.log(isAdmin)
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
