import classNames from 'classnames';
import { React } from 'react';

import spotify from '../assets/images/spotify-logo.svg';

function Card(props) {
   console.log(props.attr);

   const regex = /(\(.*\)|\[.*\]|\s\-\s.*)/g;
   const title = props.attr.data.list[0].name

   return (
      <div className="max-w-[450px]  w-full min-h-[687px] bg-beige">
         <div className="container flex-col m-0 !p-[25px] h-full">
            <div className="">
               <img src={props.attr.data.image} alt="poster" className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col justify-between h-full min-h-[225px] mt-[5px] relative">
               <section
                  className={classNames('flex justify-between h-full', {
                     'flex-row-reverse text-start': props.attr.rank == 1,
                     'text-end': props.attr.rank != 1,
                  })}
               >
                  <div className="flex flex-col">
                     <div className="flex absolute left-0 w-full top-[-5px]">
                        {!props.attr.colors.hide &&
                           props.attr.colors.list.map((color, index) => (
                              <div className="w-[20%] h-[5px]" style={{ backgroundColor: color }} key={index}></div>
                           ))}
                     </div>
                     <ul className="mt-6 text-start">
                        {Array.from(Array(props.attr.rank - 1).keys()).map((i) => (
                           <li
                              className={classNames('uppercase font-bold whitespace-nowrap text-dark', {
                                 'text-sm': props.attr.rank == 5,
                                 'text-xs': props.attr.rank != 5,
                              })}
                              key={i}
                           >
                              {`${i + 2} `}
                              {props.attr.data.list[i + 1].name.replace(regex, '')}
                           </li>
                        ))}
                     </ul>
                  </div>
                  <div className="flex flex-col w-full">
                     <div className="[text-align:inherit] uppercase text-dark tracking-tight leading-6">
                        <h3
                           className={classNames('text-xs font-extrabold leading-[inherit]', {
                              hidden: props.attr.rank == 1,
                           })}
                        >
                           Top 1
                        </h3>
                        <div
                           className={classNames('flex items-end gap-1', {
                              'justify-end': props.attr.rank != 1,
                           })}
                        >
                           <h1
                              className={classNames('text-[6.9vw] xsm:text-4xl font-black leading-7', {
                                 'mt-[10px]': props.attr.rank == 1,
                              })}
                           >
                              {title.replace(regex, '')}
                           </h1>
                           {props.attr.rank == 1 && <h3 className="text-xs font-medium leading-3">2020</h3>}
                        </div>
                        <h2 className="text-[3.1vw] xsm:text-base font-extrabold leading-[inherit]">{props.attr.data.list[0]?.album?.artists[0]?.name}</h2>
                     </div>
                     <div
                        className={classNames('flex', {
                           'justify-end': props.attr.rank != 1,
                           'justify-between': props.attr.rank == 1,
                        })}
                     >
                        <div
                           className={classNames('gap-4 mt-4', {
                              flex: props.attr.rank == 1,
                              hidden: props.attr.rank != 1,
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
                        <span className="block max-w-[222px] capitalize font-aletheia font-normal text-5xl text-end mt-5">
                           {!props.attr.signature.hide ? props.attr.signature.value.toLowerCase() : ''}
                        </span>
                     </div>
                  </div>
               </section>
               <footer className="flex justify-between items-center pt-4">
                  <img src={spotify} className="w-[100px]" />
                  <span className="font-extrabold text-[9px] uppercase text-dark">posrterfy.vercel.app</span>
                  <span className="font-extrabold text-[9px] leading-[9px] uppercase text-dark text-end">
                     Realesed on <br /> March 03, 2023
                  </span>
               </footer>
            </div>
         </div>
      </div>
   );
}

export default Card;
