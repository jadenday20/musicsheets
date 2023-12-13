import Header from "./Header"
import Footer from "./Footer"
import React, { ReactNode } from 'react';

interface LayoutProps {
    children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
      <div className='min-h-screen'>
        <Header/>
            <main className="flex flex-col items-center p-16">
                {children}
            </main>
        <Footer/>
      </div>
    )
  }

  export default Layout