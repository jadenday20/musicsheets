import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Image from "next/image";

// `app/dashboard/page.tsx` is the UI for the `/dashboard` URL
export default function About() {
    return (
      <body className='min-h-screen'>
        <Header/>
        <main className="flex justify-center">
            <div className="flex flex-col items-center justify-between p-16 max-w-5xl">
                <h2 className="text-3xl font-bold m-4">About</h2>
                <div className="flex gap-9 h-auto">
                    <div className="mt-6">
                        <h3 className="text-2xl font-medium">The Owner: Jaden Day</h3>
                        <p className="mb-2">Jaden Day is a Web Developer from Lindon, Utah. He is currently living in Pleasant Grove, Utah with his wife, Elisha. Jaden enjoys music board games and making websites. Most of all he loves spending time with his family.</p>
                    </div>
                    <Image
                            className="h-fit block"
                            src="/profile.jpg"
                            alt="Jaden Day Profile Picture"
                            width={320}
                            height={400}
                            priority
                        />
                </div>
                <div className="flex gap-9 h-auto">
                    <Image
                            className="h-fit block"
                            src="/violin.jpg"
                            alt="Jaden's Violin"
                            width={320}
                            height={400}
                            priority
                        />
                    <div className="mt-6">
                        <h3 className="text-2xl font-medium">The Store: Music Sheets</h3>
                        <p className="mb-2">Music Sheets is an online sheet music store where you can find loads of free sheet music.</p>
                    </div>
                </div>
            </div>
        </main>
        <Footer/>
      </body>
    )
  }