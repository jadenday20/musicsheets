import Image from "next/image"
import Link from "next/link"

export default function Logo() {
    return (
        <Link href="/" className="flex">
            <Image
                src="/logo-white.svg"
                alt="Music Sheets Logo"
                width={25}
                height={25}
                priority
              />
        </Link>
    )
  }
  