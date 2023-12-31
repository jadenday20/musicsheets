import Link from "next/link";

export default function NavItem({ LinkTitle }: { LinkTitle: any }) {
  const href = LinkTitle.toLowerCase() === "home" ? "/" : `/${LinkTitle.toLowerCase()}`;

  return (
    <Link href={href} className="font-thin text-lg p-4 md:p-1 border md:border-transparent hover:border-white duration-300 hover:bg-white/10 rounded-sm w-5/6 md:w-20 mx-auto md:mx-0 text-center">
      {LinkTitle}
    </Link>
  );
}