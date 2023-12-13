import React from "react";
import Layout from "@/components/Layout";
import Products from "@/components/ProductList";

// `app/dashboard/page.tsx` is the UI for the `/dashboard` URL
export default function Music() {
    return (
      <Layout>
          <h2>Music</h2>
          <Products/>
      </Layout>
    )
  }