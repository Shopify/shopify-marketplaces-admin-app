import React from 'react';
import {Routes, Route, BrowserRouter} from 'react-router-dom';
import {Home, Onboarding, Settings} from '../sections';
import AppProvider from './AppProvider';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppProvider />}>
          <Route index element={<Home />} />
          <Route path="onboarding" element={<Onboarding />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
