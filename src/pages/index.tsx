import Layout from "@/components/Layout"
import Button from "@/components/Button"
import Image from "next/image"

export default function Home() {
  return (
      <Layout>
          <h2>Home</h2>
          <div className="relative rounded">
            <div className="md:absolute md:text-white left-10 top-10 md:bg-black/40 p-4 rounded max-w-sm">
              <h3>Welcome to Music Sheets!</h3>
              <p>Explore our libraries of free sheet music:</p>
              <Button href="./music" linkTitle={"Explore Sheet Music"}></Button>
            </div>
            <div className="md:absolute md:text-white right-10 bottom-10 md:text-right md:bg-black/60 p-4 rounded max-w-sm">
              <h3>Learn About Us</h3>
              <p>Click the link below to learn more about the company and its founder, Jaden Day</p>
              <Button href="./about" linkTitle={"About Us"} className="md:float-right"></Button>
            </div>
            <Image src={"/SheetMusic.jpg"} alt={"Sheet Music"} width={700} height={700} className="rounded-lg"></Image>
          </div>
      </Layout>
      
  )
}
