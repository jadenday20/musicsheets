import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ContactInfo from "../components/ContactInfo";

// `app/dashboard/page.tsx` is the UI for the `/dashboard` URL
export default function Contact() {
    return (
      <body className='min-h-screen'>
        <Header/>
        <main className="flex flex-col items-center justify-between p-16">
          <h2 className="text-3xl font-bold m-4">Contact</h2>
          <ContactInfo/>
        </main>
        <Footer/>
      </body>
    )
  }