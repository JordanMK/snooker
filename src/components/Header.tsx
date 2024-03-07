import "./components.css"
import React from "react";
import "../app/page"

const Navbar = () => {
  return (
    <>
        <div className="header">
          <a href="#index" className="logo">Snooker Pocket</a>
          <div className="header-right">
            <a className="active" href="../app/page">Home</a>
            <a href="../app/admin/page">Admin page</a>
          </div>
        </div>
    </>
  );
};

export default Navbar;