import React from "react";
import Layout from "@/components/Layout";
import ContactInfo from "../components/ContactInfo";

// `app/dashboard/page.tsx` is the UI for the `/dashboard` URL
export default function Contact() {
    return (
      <Layout>
        <main className="flex flex-col items-center p-16">
          <h2 className="text-3xl font-bold m-4">Contact</h2>
          <ContactInfo/>
        </main>
      </Layout>

    )
  }