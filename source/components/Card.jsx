import cl from 'classnames';
import { React, useEffect, useState } from 'react';

import spotify from '../assets/images/spotify-logo.svg';

const shortenText = (text, maxLength) => {
   const regex = /(\(.*\)|\[.*\]|\s\-\s.*)/g;
   return text.replace(regex, '').length > maxLength
      ? text.replace(regex, '').substring(0, maxLength) + '...'
      : text.replace(regex, '');
};

const date = new Intl.DateTimeFormat('en-US', {
   month: 'long',
   day: '2-digit',
   year: 'numeric',
}).format(new Date());

function Card(props) {
   const { type, from, rank, colors, signature, data } = props.attr;
   const title = data.list[0].name;

   const [scale, setScale] = useState(1);

   useEffect(() => {
      const updateScale = () => {
         const vw = window.innerWidth;
         if (vw < 320) return
         const newScale = vw < 520 ? vw / 520 : 1;
         setScale(newScale);
      };

      updateScale();
      window.addEventListener('resize', updateScale);
      return () => window.removeEventListener('resize', updateScale);
   }, []);

   return (
      <div ref={props?.reference} className="bg-beige select-none cursor-default h-fit" style={{
         width: '450px',
         transform: `scale(${scale})`,
         transition: 'transform 0 ease-in-out',
      }}>
         <div className="flex-col p-[25px] h-full">

            <img
               src={data.image}
               alt="poster"
               className="h-[400px] w-[400px] object-cover"
            />

            <div className="flex flex-col justify-between h-full mt-[5px] relative">
               <section
                  className={cl('flex flex-col gap-1 max-h-[220px]')}
               >
                  <div className="flex flex-col w-full">
                     <div className="uppercase text-dark tracking-tight leading-5">
                        <h3
                           className={cl('mt-1 text-xs font-extrabold', {
                              hidden: rank === 1,
                           })}
                        >
                           Top 1
                        </h3>
                        <div className="flex items-end gap-1">
                           <h1
                              className={cl(
                                 'text-4xl font-black leading-7',
                                 {
                                    'mt-[10px]': rank === 1,
                                 }
                              )}
                           >
                              {shortenText(title, 20)}
                           </h1>
                           {rank === 1 && <h3 className="text-xs font-medium leading-3">2020</h3>}
                        </div>
                        <h2 className="text-base font-extrabold">
                           {data.list[0]?.album?.artists[0]?.name}
                        </h2>
                     </div>
                     <div
                        className={cl('flex', {
                           'justify-end': rank !== 1,
                           'justify-between': rank === 1,
                        })}
                     >
                        <div
                           className={cl('gap-4 mt-4', {
                              flex: rank === 1,
                              hidden: rank !== 1,
                           })}
                        >
                           <div className="flex flex-col gap-1 text-xs uppercase opacity-70 font-medium">
                              <span className="font-medium">Album</span>
                              <span className="font-medium">Time</span>
                              <span className="font-medium">Genere</span>
                           </div>
                           <div className="flex flex-col text-sm uppercase">
                              <span className="font-semibold">The big steppers</span>
                              <span className="font-semibold">4:46</span>
                              <span className="font-semibold">R&B/Soul</span>
                           </div>
                        </div>
                     </div>
                  </div>
                  <div className="flex flex-col row-start-2 col-start-1 col-end-4">
                     <div className="flex absolute left-0 w-full top-[-5px]">
                        {!colors.hide &&
                           colors.list.map((color, index) => (
                              <div
                                 className="w-[20%] h-[5px]"
                                 style={{ backgroundColor: color }}
                                 key={index}
                              />
                           ))}
                     </div>
                     <ul
                        className={cl('text-start columns-2', {
                           'columns-1': rank === 5,
                        })}
                     >
                        {Array.from(Array(rank - 1).keys()).map((i) => (
                           <li
                              className={cl('uppercase font-bold whitespace-nowrap text-dark', {
                                 'text-[15px] leading-[22px]':
                                    rank === 5,
                                 'text-xs': rank === 10,
                              })}
                              key={i}
                           >
                              {`${i + 2} `}
                              {shortenText(data.list[i + 1].name, 17)}
                           </li>
                        ))}
                     </ul>
                  </div>
                  <div
                     className={cl(
                        'max-w-[222px] h-[45px] capitalize font-aletheia font-normal text-5xl ml-auto text-end',
                     )}
                     style={{
                        fontFamily: 'aletheia',
                     }}
                  >
                     {!signature.hide ? signature.value.toLowerCase() : ''}
                  </div>
               </section>
               <footer className="flex justify-between items-center pt-4 ">
                  <img src={spotify} className="w-[100px]" />
                  <span className="font-extrabold text-[9px] uppercase text-dark">
                     {window.location.hostname}
                  </span>
                  <span className="font-extrabold text-[9px] leading-[9px] uppercase text-dark text-end">
                     Realesed on <br /> {date}
                  </span>
               </footer>
            </div>
         </div>
      </div>
   );
}

export default Card;
