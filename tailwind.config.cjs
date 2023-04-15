/** @type {import('tailwindcss').Config} */
module.exports = {
   content: ['./index.html', './source/**/*.{js,ts,jsx,tsx}'],
   theme: {
      colors: {
         transparent: 'transparent',
         blue: '#1d95fe',
         white: '#fff',
         dark: '#171914',
         black: '#000',
         grey: '#d9dbe2',
         beige: '#dad9d4',
      },
      screens: {
         xxsm: '340px',
         xsm: '520px',
         sm: '655px',
         md: '768px',
         lg: '1024px',
         xlg: '1280px',
         xxlg: '1440px',
      },
      fontFamily: {
         aletheia: ['aletheia', 'cursive'],
      },
   },
   plugins: [],
};
