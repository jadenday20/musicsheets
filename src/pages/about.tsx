import React from "react";
import Layout from "../components/Layout"
import Image from "next/image";
import Button from "@/components/Button";

// `app/dashboard/page.tsx` is the UI for the `/dashboard` URL
export default function About() {
    return (
      <Layout>
        <div className="flex justify-center">
            <div className="flex flex-col items-center justify-between p-16 max-w-5xl">
                <h2>About</h2>
                <div className="flex gap-9 h-auto">
                    <div className="mt-6">
                        <h3>The Owner: Jaden Day</h3>
                        <p className="mb-2">Jaden Day is a Web Developer from Lindon, Utah. He is currently living in Pleasant Grove, Utah with his wife, Elisha. Jaden enjoys music board games and making websites. Most of all he loves spending time with his family.</p>
                        <Button href="./contact" linkTitle={"Contact Us"}></Button>
                    </div>
                    <Image
                            className="h-fit block"
                            src="/profile.jpg"
                            alt="Jaden Day Profile Picture"
                            width={200}
                            height={200}
                            priority
                        />
                </div>
                <div className="flex gap-9 h-auto self-baseline">
                    <Image
                            className="h-fit block"
                            src="/violin.jpg"
                            alt="Jaden's Violin"
                            width={200}
                            height={200}
                            priority
                        />
                    <div className="mt-6">
                        <h3>The Store: Music Sheets</h3>
                        <p className="mb-2">Music Sheets is an online sheet music store where you can find loads of inexpensive sheet music.</p>
                        <Button href="./shop" linkTitle={"Shop for Music"}></Button>
                    </div>
                </div>
            </div>
        </div>
        </Layout>
    )
  }