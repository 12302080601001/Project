import{Nunito } from "next/font/google";
import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/navbar/Navbar";
import ClientOnly from "./components/ClientOnly";
import RegisterModel from "./components/Modal/RegisterModel";
import ToasterProvider from "./providers/ToasterProvider";
import LoginModel from "./components/Modal/LoginModel";
import { getCurrentUser } from "./actions/getCurrentUser";

import RentModel from "./components/Modal/RentModel";
export const metadata: Metadata = {
  title: "Airbnb",
  description: "Airbnb clone",
}
const font = Nunito({
  subsets:["latin"],
});

export default async function RootLayout({
  children,
}:{
  children: React.ReactNode;
}) {
  const currentUser=await getCurrentUser();

  return (
    <html lang="en">
      <body
        className={font.className}
      >
        <ClientOnly>
          <ToasterProvider />
          <RentModel  />
           <RegisterModel />
           <LoginModel />
           <Navbar currentUser ={currentUser} />
        </ClientOnly>
        <div className="pb-20 pt-28">
          {children}
        </div>
       
      </body>
    </html>
  );
}
