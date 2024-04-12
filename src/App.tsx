import React from 'react';
import { Header } from './ui/components/Header';
import { Outlet } from 'react-router-dom';
import { Footer } from './ui/components/Footer';

function App() {
  return (
    <div className="h-screen flex flex-col">
      <Header/>
      <div className="flex-grow">
        <Outlet/>
      </div>
      <Footer/>
    </div>
  );
}

export default App;
