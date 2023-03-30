import { useEffect } from 'react';

function Login() {
   const CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
   const REDIRECT_URI = import.meta.env.VITE_SPOTIFY_REDIRECT_URI;
   const AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize';
   const RESPONSE_TYPE = 'token';
   const SCOPE = 'user-top-read';
   const URL = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=${SCOPE}&response_type=${RESPONSE_TYPE}`;

   const generateRandomString = (length) => {
      let text = '';
      const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      for (let i = 0; i < length; i++) {
         text += possible.charAt(Math.floor(Math.random() * possible.length));
      }
      return text;
   };

   const handleAuthState = () => {
      const state = window.localStorage.getItem('spotify_auth_state') || generateRandomString(16);
      localStorage.setItem('spotify_auth_state', state);
      return state;
   };

   useEffect(() => {
      if (localStorage.getItem('token')) window.location = '/';
      let state = handleAuthState();

      window.location = `${URL}&state=${state}`;

      const hash = window.location.hash
         .substring(1)
         .split('&')
         .reduce((initial, item) => {
            if (item) {
               const parts = item.split('=');
               initial[parts[0]] = decodeURIComponent(parts[1]);
            }
            return initial;
         }, {});

      const token = hash.access_token;
      state = hash.state;
      const storedState = localStorage.getItem('spotify_auth_state');

      if (token && state === storedState) {
         localStorage.setItem('token', token);
         localStorage.removeItem('spotify_auth_state');
         window.location = '/';
      }
   }, []);
}

export default Login;
