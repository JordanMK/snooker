import { route } from "express/lib/application";
import "./components.css";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Navbar = () => {
  const [userMail, setUserMail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const uitloggen = () => {
    // Check if running on the client side
    if (typeof window !== "undefined") {
      // Remove userMail from localStorage
      localStorage.removeItem("userMail");
      localStorage.removeItem("userID");
      setUserMail("");
      window.location.href = '/login'
    }
  };

  useEffect(() => {
    // Check if running on the client side
    if (typeof window !== "undefined") {
      // Access localStorage
      const mail = localStorage.getItem("userMail");
      setUserMail(mail || "");

      const isAdminString = localStorage.getItem("admin");
      const isAdminBoolean = isAdminString === "true";
      setIsAdmin(isAdminBoolean)

    }
  }, []); // Run only once on component mount

  return (
    <>
      {userMail &&
        <div className="header">
          <a href="#index" className="logo">Snooker Pocket</a>
          <div className="header-right">
            <Link href={{ pathname: "/" }}>Home</Link>

            {isAdmin && <Link href={{ pathname: "admin" }}>Admin Page</Link>}
            {/* Display userMail if available */}
            {userMail && <p>{userMail}</p>}
            <a onClick={uitloggen}>Log uit</a>
          </div>
        </div>
      }
    </>
  );
};

export default Navbar;
