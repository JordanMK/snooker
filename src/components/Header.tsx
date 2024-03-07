import "./components.css";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <>
        <div className="header">
          <a href="#index" className="logo">Snooker Pocket</a>
          <div className="header-right">
            <Link href={{pathname: "/"}}>Home</Link>
            <Link href={{pathname: "admin"}}>Admin Page</Link>
            {/* TODO check if user is admin, if he is admin show users */}
            <Link href={{pathname: "admin/users"}}>Users</Link>
          </div>
        </div>
    </>
  );
};

export default Navbar;