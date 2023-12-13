import { useState, useEffect } from 'react';
import NavItem from './NavItem';
import HamburgerIcon from '../../public/HamburgerIcon-white.svg';
import XIcon from '../../public/XIcon-white.svg';
import Image from 'next/image';

const NavItems = ['Home', 'Music', 'About', 'Contact'];

export default function Nav() {
  const [showMenu, setShowMenu] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <nav className="flex flex-col md:flex-row justify-center gap-3 md:gap-5 w-full md:w-auto">
      <div className="md:hidden">
        <button
          onClick={toggleMenu}
          className="block text-gray-800 focus:outline-none mx-auto border rounded-2xl p-1 hover:border-white duration-300 hover:bg-white/10"
        >
          {/* Conditionally render the hamburger or 'X' icon based on showMenu state */}
          <Image
            src={showMenu ? XIcon : HamburgerIcon}
            alt="Menu"
            className="w-10 h-10"
            height={10}
            width={10}
          />
        </button>
      </div>
      {showMenu || !isMobile ? (
        NavItems.map((item) => <NavItem LinkTitle={item} key={item} />)
      ) : null}
    </nav>
  );
}