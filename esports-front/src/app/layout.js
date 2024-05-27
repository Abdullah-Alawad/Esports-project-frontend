"use client"
import "./globals.css";
import { ToastContainer, toast } from 'react-custom-alert';
import 'react-custom-alert/dist/index.css';
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
      <body >
        <ToastContainer
          floatingTime={5000}
          toastStyle={{ 
            backgroundColor: 'rgba(188, 126, 64, 0.9)',
            color: 'white',
            boxShadow: '0 10px 20px rgba(0, 0, 0, 0.3)',
            fontWeight: "bolder",
            fontSize: "20px",
            fontFamily: ['Comic Sans MS', 'ui-sans-serif', 'system-ui', '-apple-system'],
        }}/>
        {children}
      </body>
      </TokenContext.Provider>
    </html>
  );
}
