import React from 'react';

import spotify from '../assets/images/spotify.svg';
import lastfm from '../assets/images/lastfm.svg';
import { Link } from 'react-router-dom';

function Home() {
   return (
      <div className="container flex-col items-center">
         <h1 className="text-6xl font-extrabold uppercase text-center max-w-[820px] mb-5 max-sm:text-5xl max-xsm:text-4xl">
            A fun way to share what you listen to!
         </h1>
         <p className="text-2xl font-medium text-center mb-12 max-xsm:text-lg">Create posters of your most listened songs and artists.</p>
         <div className="flex gap-6 max-sm:flex-col max-sm:gap-4 max-sm:w-full">
            <Link to={'/login'}>
               <button className="h-[60px] px-7 rounded-xl cursor-pointer bg-[#1db954] shadow-2xl shadow-[#1db95440] max-sm:px-5 max-sm:w-full">
                  <span className="flex items-center justify-center text-white gap-2 w-full font-extrabold uppercase text-right whitespace-nowrap text-sm max-sm:text-[13px]">
                     <img src={spotify} alt="spotify logo" /> Connect with Spotify
                  </span>
               </button>
            </Link>
            <button className="h-[60px] px-7 rounded-xl cursor-pointer bg-[#ba0000] shadow-2xl shadow-[#ba000040] max-sm:px-5 max-sm:w-full">
               <span className="flex items-center justify-center text-white gap-2 w-full font-extrabold uppercase text-right whitespace-nowrap text-sm max-sm:text-[13px]">
                  <img src={lastfm} alt="last.fm logo" /> Connect with Last.fm
               </span>
            </button>
         </div>
      </div>
   );
}

export default Home;
