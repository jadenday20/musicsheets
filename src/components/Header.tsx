import Logo from "./Logo"
import Nav from "./Nav"
export default function Header() {
    return (
        <header className="flex flex-col justify-center text-center items-center bg-slate-800 text-white p-8 gap-5 md:gap-2">
            <Logo logoTitle="Music Sheets"/>
            <Nav/>
        </header>
    )
  }
  