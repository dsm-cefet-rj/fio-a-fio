import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { BottomNavbar } from './BottomNavbar';
import { FloatingCreatePostButton } from '../community/FloatingCreatePostButton';

export const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#FBF7EF] text-[#17151A] font-sans selection:bg-[#FEF1F4]">
      <Navbar />
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-28 sm:pb-32">
        <Outlet />
      </main>
      <Footer />
      <FloatingCreatePostButton />
      <BottomNavbar />
    </div>
  );
};



