import { React } from 'react';

const Footer = () => {
   return (
      <footer className="flex items-center my-[25px]">
         <div className="container justify-center">
            <p className="font-medium text-base">
               Made by{' '}
               <a href="https://videmelo.dev" className="text-blue">
                  VideMelo
               </a>
            </p>
         </div>
      </footer>
   );
};

export default Footer;
