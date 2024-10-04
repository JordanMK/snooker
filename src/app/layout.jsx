"use client"
import React from "react"
import "./globals.css"
import Header from "../../components/Header"
import Footer from "../../components/Footer"

export default function RootLayout({ children }) {
  return (
    <html lang="nl">
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}
