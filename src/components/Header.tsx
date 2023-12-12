import Logo from "./Logo"
import Nav from "./Nav"
export default function Header() {
    return (
        <header className="flex bg-slate-800 text-white p-8 gap-5">
            <Logo/>
            <Nav/>
        </header>
    )
  }
  