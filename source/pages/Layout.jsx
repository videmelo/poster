import { React } from 'react';
import { Outlet } from 'react-router-dom';

import Header from '../components/Header';
import Footer from '../components/Footer';

function Layout() {
   return (
      <>
         <Header />
         <main className="min-h-[65vh] max-sm:min-h-[75vh]">
            <Outlet />
         </main>
         <Footer />
      </>
   );
};

export default Layout;
