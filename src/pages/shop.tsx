import React from "react";
import Layout from "@/components/Layout";

// `app/dashboard/page.tsx` is the UI for the `/dashboard` URL
export default function Shop() {
    return (
      <Layout>
        <main className="flex flex-col items-center justify-between p-16">
          <h2 className="text-3xl font-bold m-4">Shop</h2>
        </main>
      </Layout>
    )
  }