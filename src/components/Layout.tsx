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
        {children}
        <Footer/>
      </div>
    )
  }

  export default Layout