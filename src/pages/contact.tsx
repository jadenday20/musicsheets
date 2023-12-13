import React from "react";
import Layout from "@/components/Layout";
import ContactInfo from "../components/ContactInfo";

// `app/dashboard/page.tsx` is the UI for the `/dashboard` URL
export default function Contact() {
    return (
      <Layout>
          <h2>Contact</h2>
          <ContactInfo/>
      </Layout>

    )
  }