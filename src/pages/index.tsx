import Header from "../components/Header"
import Footer from "../components/Footer"

export default function Home() {
  return (
      <body className='min-h-screen'>
        <Header/>
        <main className="flex flex-col items-center justify-between p-16">
          <h2 className="text-3xl font-bold m-4">Home</h2>
        </main>
        <Footer/>
      </body>
  )
}
