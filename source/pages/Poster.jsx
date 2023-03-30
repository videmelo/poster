import { React, useState, useEffect, Fragment } from 'react';

import { TwitterPicker } from 'react-color';
import { HexColorPicker } from 'react-colorful';
import { Popover, Transition } from '@headlessui/react';
import Vibrant from 'node-vibrant';

import Card from '../components/Card';
import Radio from '../components/Radio';

function Poster() {
   const token = localStorage.getItem('token');
   const [data, dataSet] = useState({});

   useEffect(() => {
      if (!token) {
         window.location.href = '/';
      }

      fetch('https://api.spotify.com/v1/me', {
         headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
         },
      }).then((res) => {
         // 403 happens because the client is in development mode, so if you don't have a client with quota, you can only register users manually :/
         if (res.status == 401 || res.status == 403) {
            window.localStorage.removeItem('token');
            window.location.href = '/';
            return;
         }
         res.json().then((data) => {
            signatureSet({
               ...signature,
               value: data.display_name,
            });
         });
      });
   }, []);

   const types = ['tracks', 'artists'];
   const [type, typeSet] = useState(types[0]);

   const times = {
      'last-month': 'short_term',
      'last-6-months': 'medium_term',
      'all-time': 'long_term',
   };
   const [from, fromSet] = useState('last-month');

   useEffect(() => {
      types.map((type) => {
         fetchData(type);
      });
   }, [from]);

   const [rank, rankSet] = useState(10);

   const [signature, signatureSet] = useState({
      value: '',
      hide: false,
   });

   const [colors, colorsSet] = useState({
      list: [],
      hide: false,
   });

   const [loading, loadingSet] = useState(true);
   useEffect(
      (i) => {
         if (Object.keys(data).length != types.length) return;
         colorsSet({
            ...colors,
            default: data[type].palette,
            list: data[type].palette,
         });
         loadingSet(false);
      },
      [data, type]
   );

   function fetchData(type) {
      fetch(`https://api.spotify.com/v1/me/top/${type}?limit=10&time_range=${times[from]}`, {
         headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
         },
      }).then((res) => {
         if (res.status == 401) {
            window.localStorage.removeItem('token');
            window.location.href = '/';
         }
         if (res.status == 403) {
            return;
         }
         res.json().then((data) => {
            const res = data.items[0];

            const image = res.album?.images[0].url || res.images[0].url;
            const vibrant = new Vibrant(image);
            vibrant.getPalette().then((palette) => {
               handleData({ type, list: data.items, palette: handlePalette(palette), image });
            });
         });
      });
   }

   function handleData(props) {
      const { type, list, palette, image } = props;
      dataSet((prev) => {
         return {
            ...prev,
            [type]: {
               list,
               image,
               palette: palette,
            },
         };
      });
   }

   function handlePalette(palette) {
      return [palette.DarkVibrant.hex, palette.DarkMuted.hex, palette.Muted.hex, palette.LightMuted.hex, palette.LightVibrant.hex];
   }

   function handleColor(color, index) {
      colorsSet({
         ...colors,
         list: colors.list.map((c, i) => (i == index ? color?.hex || color : c)),
      });
   }

   return (
      <div className="container gap-20 max-lg:flex-col items-center justify-center">
         {loading ? (
            <Fragment>
               <div className="w-[450px] h-[687px]  bg-grey text-transparent"></div>
               <div className="flex flex-col gap-5 justify-center">
                  <h2 className="text-3xl font-extrabold  bg-grey text-transparent">Personalize</h2>
                  <ul className="flex flex-col gap-[35px]">
                     <li className="flex flex-col">
                        <h3 className="text-lg font-medium mb-2 bg-grey text-transparent">Type</h3>
                        <div className="flex items-center gap-4">
                           <span className="bg-grey text-transparent">Tracks</span>
                           <span className="bg-grey text-transparent">Artists</span>
                        </div>
                     </li>
                     <li className="flex flex-col">
                        <h3 className="text-lg font-medium mb-2 bg-grey text-transparent">From</h3>
                        <div className="flex items-center gap-4">
                           <span className="bg-grey text-transparent">Last Month</span>
                           <span className="bg-grey text-transparent">Last 6 Months</span>
                           <span className="bg-grey text-transparent">All Time</span>
                        </div>
                     </li>
                     <li className="flex flex-col">
                        <h3 className="text-lg font-medium mb-2  bg-grey text-transparent">Rank</h3>
                        <div className="flex items-center">
                           <div className="flex items-center gap-2">
                              <button className={`text-xl whitespace-nowrap font-extrabold  bg-grey text-transparent`}>Top {rank}</button>
                           </div>
                        </div>
                     </li>
                     <li className="flex flex-col">
                        <h3 className="text-lg font-medium mb-2  bg-grey text-transparent">Colors</h3>
                     </li>
                     <li className="flex flex-col">
                        <h3 className="text-lg font-medium mb-2  bg-grey text-transparent">Signature</h3>
                     </li>
                  </ul>
               </div>
            </Fragment>
         ) : (
            <Fragment>
               <Card attr={{ type, from, rank, colors, signature, data: data[type] }} />
               <div className="flex flex-col gap-5 justify-center">
                  <h2 className="text-3xl font-extrabold">Personalize</h2>
                  <ul className="flex flex-col gap-[35px]">
                     <li className="flex flex-col">
                        <h3 className="text-lg font-medium mb-2">Type</h3>
                        <div className="flex items-center gap-4">
                           <Radio id={'tracks'} input={type} set={typeSet}>
                              Tracks
                           </Radio>
                           <Radio id={'artists'} input={type} set={typeSet}>
                              Artists
                           </Radio>
                        </div>
                     </li>
                     <li className="flex flex-col">
                        <h3 className="text-lg font-medium mb-2">From</h3>
                        <div className="flex items-center gap-4">
                           <Radio id="last-month" input={from} set={fromSet}>
                              Last Month
                           </Radio>
                           <Radio id="last-6-months" input={from} set={fromSet}>
                              Last 6 Months
                           </Radio>
                           <Radio id="all-time" input={from} set={fromSet}>
                              All Time
                           </Radio>
                        </div>
                     </li>
                     <li className="flex flex-col">
                        <h3 className="text-lg font-medium mb-2">Rank</h3>
                        <div className="flex items-center">
                           <div className="flex items-center gap-2">
                              <button
                                 className={`text-xl whitespace-nowrap font-extrabold`}
                                 onClick={() => rankSet(rank == 10 ? 1 : rank == 1 ? 5 : 10)}
                              >
                                 Top {rank}
                              </button>
                           </div>
                        </div>
                     </li>
                     <li className="flex flex-col">
                        <h3 className="text-lg font-medium mb-2">Colors</h3>
                        <div>
                           <div className="flex gap-2">
                              {colors.list.map((color, index) => (
                                 <Popover key={index} className="relative">
                                    {({ open }) => (
                                       <>
                                          <Popover.Button className="w-8 h-8 rounded-md" style={{ background: color }}></Popover.Button>
                                          <Transition
                                             show={open}
                                             as={Fragment}
                                             enter="transition ease-out duration-100"
                                             enterFrom="transform opacity-0 scale-95"
                                             enterTo="transform opacity-100 scale-100"
                                             leave="transition ease-in duration-75"
                                             leaveFrom="transform opacity-100 scale-100"
                                             leaveTo="transform opacity-0 scale-95"
                                          >
                                             <Popover.Panel static className={`absolute z-10 bottom-14`}>
                                                <HexColorPicker
                                                   className="!w-[168px] mb-2"
                                                   color={color[type]}
                                                   onChange={(color) => handleColor(color, index)}
                                                />
                                                <TwitterPicker
                                                   className="!w-[168px]"
                                                   color={color}
                                                   colors={colors.default}
                                                   triangle="hide"
                                                   onChange={(color) => handleColor(color, index)}
                                                />
                                             </Popover.Panel>
                                          </Transition>
                                       </>
                                    )}
                                 </Popover>
                              ))}
                           </div>
                           <span className="flex items-center gap-1 text-base font-medium">
                              <input type="checkbox" onChange={(e) => colorsSet({ ...colors, hide: e.target.checked })} /> Hide
                           </span>
                        </div>
                     </li>
                     <li className="flex flex-col">
                        <h3 className="text-lg font-medium mb-2">Signature</h3>
                        <input
                           type="text"
                           className="focus:border-none focus:outline-none text-2xl font-extrabold"
                           value={signature.value}
                           onChange={(e) => signatureSet({ ...signature, value: e.target.value })}
                           maxLength={15}
                        />
                        <span className="flex items-center gap-1">
                           <input type="checkbox" onChange={(e) => signatureSet({ ...signature, hide: e.target.checked })} /> Hide
                        </span>
                     </li>
                  </ul>
               </div>
            </Fragment>
         )}
      </div>
   );
}

export default Poster;
