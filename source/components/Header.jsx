import { React, useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import { InformationCircleIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';
import logo from '../assets/images/logo.svg';

const Header = () => {
   const [isOpen, setIsOpen] = useState(false);
   const menuRef = useRef(null);

   useEffect(() => {
      const handleClickOutside = (event) => {
         if (menuRef.current && !menuRef.current.contains(event.target)) {
            setIsOpen(false);
         }
      };

      document.addEventListener('mousedown', handleClickOutside);

      return () => {
         document.removeEventListener('mousedown', handleClickOutside);
      };
   }, [menuRef]);

   const toggleMenu = () => {
      setIsOpen(!isOpen);
   };

   const handleItemClick = () => {
      setIsOpen(false);
   };

   const logout = () => {
      window.localStorage.removeItem('token');
      window.location.reload();
   };

   return (
      <header className="pt-5 pb-[50px] max-sm:pt-3 relative">
         <div className="container justify-between items-center h-[75px]">
            <button onClick={toggleMenu} className="hidden items-center select-none bg-transparent cursor-pointer p-4 max-sm:flex">
               <InformationCircleIcon className="w-[30px] h-[30px] text-black" />
            </button>
            <img src={logo} alt="logo" className="w-[100px] max-sm:w-[70px] h-[70px]" onClick={() => window.location.reload()} />
            <nav ref={menuRef} className="flex items-center">
               <div className="flex sm:gap-5">
                  <div
                     className={classNames('flex items-center gap-5', {
                        'max-sm:flex-col max-sm:w-[200px] max-sm:gap-8 max-sm:p-5 max-sm:absolute max-sm:top-20 max-sm:left-12 max-sm:border-grey max-sm:border-[1px] max-sm:shadow-sm max-sm:bg-white max-sm:border-solid max-sm:rounded-lg':
                           isOpen,
                        'max-sm:hidden': !isOpen,
                     })}
                  >
                     <div
                        className="flex items-center text-base uppercase font-medium text-black cursor-pointer hover:text-blue"
                        onClick={handleItemClick}
                     >
                        About
                     </div>
                     <div
                        className="flex items-center whitespace-nowrap text-base uppercase font-medium text-black cursor-pointer hover:text-blue"
                        onClick={handleItemClick}
                     >
                        Privacy Policy
                     </div>
                  </div>
                  {window.localStorage.getItem('token') && (
                     <div onClick={logout}>
                        <button className="flex items-center justify-center bg-blue text-white uppercase font-medium rounded-lg py-4 px-7 max-sm:w-14 max-sm:h-14 max-sm:p-0 max-sm:bg-white">
                           <span className="max-sm:hidden">Logout</span>
                           <ArrowRightOnRectangleIcon className="w-[30px] h-[30px] sm:hidden text-black" />
                        </button>
                     </div>
                  )}
               </div>
            </nav>
         </div>
      </header>
   );
};

export default Header;
