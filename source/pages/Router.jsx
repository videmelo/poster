import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Layout from './Layout';
import Home from './Home';
import Poster from './Poster';
import Login from './Login';

const Router = () => {
   const token = localStorage.getItem('token');
   return (
      <BrowserRouter>
         <Routes>
            <Route path="/login" element={<Login />}></Route>
            <Route element={<Layout />}>
               <Route path="/" element={token ? <Navigate to="/poster" replace /> : <Home />}></Route>
               <Route path="/poster" element={!token ? <Navigate to="/" replace /> : <Poster />}></Route>
               <Route path="/*" element={<Navigate to="/" replace />}></Route>
            </Route>
         </Routes>
      </BrowserRouter>
   );
};

export default Router;
