import Link from "next/link"

export default function ContactInfo() {
    return (
        <div className="flex flex-col gap-1">
            <Link href="mailto:jkday@outlook.com" className="outline outline-offset-2 p-5 rounded-sm bg-slate-800 hover:bg-slate-800/90 text-white text-center">Email: JKDay@outlook.com</Link>
            <Link href="tel:3852028190" className="outline outline-offset-2 p-5 rounded-sm bg-slate-800 hover:bg-slate-800/90 text-white text-center">Phone: (385) 202-8190</Link>
        </div>
    )
  }
  