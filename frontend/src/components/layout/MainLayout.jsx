import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { RoleSwitcher } from './RoleSwitcher';

export const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#FFF0F5]">
      <Navbar />
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pb-10">
        <Outlet />
      </main>
      <Footer />
      <RoleSwitcher />
    </div>
  );
};
