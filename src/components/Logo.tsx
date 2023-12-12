import Image from "next/image";
import Link from "next/link";

interface LogoProps {
    logoTitle?: string;
}

export default function Logo({ logoTitle }: LogoProps) {
    return (
        <Link href="/" className="flex hover:opacity-90">
            <Image
                src="/logo-white.svg"
                alt="Music Sheets Logo"
                width={25}
                height={25}
                priority
            />
            {logoTitle && <h1 className="font-noto text-2xl">{logoTitle}</h1>}
        </Link>
    );
}