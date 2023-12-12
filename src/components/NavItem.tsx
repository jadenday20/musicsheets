import Link from "next/link";

export default function NavItem({LinkTitle} : {LinkTitle:any}) {
    return (
        <Link href={`/${LinkTitle.toLowerCase()}`} className="font-thin p-1 border border-transparent hover:border-white duration-300 hover:bg-white/10 rounded-sm w-16 text-center">{LinkTitle}</Link>
    );
  }