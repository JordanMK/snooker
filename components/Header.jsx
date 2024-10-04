import React, { useEffect, useState } from "react"
import "./components.css"
import "bootstrap/dist/css/bootstrap.min.css"
import Link from "next/link"

export default function Header() {
  // TODO: userMail isnt being used
  const [userMail, setUserMail] = useState("")
  const [isAdmin, setIsAdmin] = useState(false)

  const logout = () => {
    if (isClientSideRender()) {
      localStorage.removeItem("userMail")
      localStorage.removeItem("userID")
      localStorage.removeItem("admin")
      setUserMail("")
      window.location.href = '/login'
    }
  }

  // run only once on component mount
  useEffect(() => {
    if (isClientSideRender()) {
      const mail = localStorage.getItem("userMail")
      setUserMail(mail || "")

      // TODO: security concerns
      setIsAdmin(localStorage.getItem("admin") === "true")

    }
  }, [])
  const shownLinks = [
    { title: "Home", pathname: "/" },
  ]
  if (isAdmin) {
    shownLinks.push({ title: "Admin Pagina", pathname: "/admin" })
  }

  return (
    <nav className="header d-flex justify-content-between">
      <Link href="/" className="logo d-flex align-items-center">Snooker Pocket</Link>
      <section>
        <div>
          {shownLinks.map(({title, pathname}) => <Link href={pathname} key={pathname}>{title}</Link>)}
          <a onClick={logout}>Log uit</a>
        </div>
        {/* same padding as nav items */}
        {userMail && <p style={{paddingLeft: 12}}>{userMail}</p>}
      </section>
    </nav>
  )
}

const isClientSideRender = () => typeof window !== "undefined"

/*
return (
  <>
    {userMail &&
      <nav className="header">
        <a href="/" className="logo">Snooker Pocket</a>
        <div className="header-right">
          <Link href={{ pathname: "/" }}>Home</Link>

          {isAdmin && <Link href={{ pathname: "/admin" }}>Admin Page</Link>}
          {/* Display userMail if available *}
          {userMail && <p>{userMail}</p>}
          <a onClick={uitloggen}>Log uit</a>
        </div>
      </nav>
    }
  </>
)
*/
