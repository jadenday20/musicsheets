import Logo from "./Logo"
export default function Footer() {
    return (
        <footer className="flex bg-slate-800 text-white p-8 gap-5 justify-center items-center">
            <Logo/>
            <span className="text-lg">©2023 | Jaden Day</span>
        </footer>
    )
  }
  