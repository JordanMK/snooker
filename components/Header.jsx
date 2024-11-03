import React, { useEffect, useState } from "react";
import "./components.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Link from "next/link";
import { getAdminStatus } from "../src/adminStatus.js";

const isClientSideRender = () => typeof window !== 'undefined';

export default function Header() {
  const [userMail, setUserMail] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  const logout = () => {
    if (isClientSideRender()) {
      localStorage.removeItem('userMail');
      localStorage.removeItem('userID');

      setUserMail('');
      window.location.href = '/login';
    }
  };

  useEffect(() => {
    if (isClientSideRender()) {
      const mail = localStorage.getItem('userMail');
      setUserMail(mail || '');

      if (mail) {
        getAdminStatus().then(adminStatus => {
          console.log('admin?' + adminStatus);
          setIsAdmin(adminStatus);
        });
      }
    }
  }, []);

  if (!userMail) {
    return null;
  }

  const shownLinks = [{ title: 'Home', pathname: '/' }];
  if (isAdmin) {
    shownLinks.push({ title: 'Admin Pagina', pathname: '/admin' });
  }

  return (
    <nav className="header d-flex justify-content-between">
      <Link href="/" className="logo d-flex align-items-center">
        Snooker Pocket
      </Link>
      <section>
        <div>
          {shownLinks.map(({ title, pathname }) => (
            <Link key={pathname} href={pathname}>
              {title}
            </Link>
          ))}
        </div>
        <div>
          <span>{userMail}</span>
          <button onClick={logout}>Logout</button>
        </div>
      </section>
    </nav>
  );
}