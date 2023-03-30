import classNames from 'classnames';
import { React, useState, useRef, useEffect } from 'react';

const Radio = (props) => {
   return (
      <>
         <button
            className={classNames(`text-xl whitespace-nowrap ${props.className}`, {
               'font-extrabold': props.input === props.id,
               'font-medium opacity-70': props.input != props.id,
            })}
            onClick={() => props.set(props.id)}
         >
            {props.children}
         </button>
      </>
   );
};

export default Radio;
