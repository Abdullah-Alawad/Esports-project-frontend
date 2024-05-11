"use client"
import "./globals.css";
import { createContext, useEffect, useState } from "react";

export const TokenContext = createContext();

export default function RootLayout({ children }) {

  const [haveToken, setHaveToken] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if(token)
        setHaveToken(true);
  }, []);

  return (
    <html lang="en">
      <TokenContext.Provider value={{ haveToken, setHaveToken }}>
      <body >{children}</body>
      </TokenContext.Provider>
    </html>
  );
}
