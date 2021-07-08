import Head from 'next/head';
import React from 'react';
import Navbar from '@/components/Navbar';
import SideBarContent from '@/components/sidebar';
import SideBar from './SideBar';
import { useAppContext } from '@/reducer/Provider';
import { ToastContainer } from 'react-toastify';
import { useEffect } from 'react';
import { getCookie } from '@/libs';
import { loadSavedList } from '@/reducer/actions';

const Wrapper = ({ children }) => {
  return (
    <div className="2xl:container flex w-screen m-auto h-screen font-sans">
      <Head>
        <link rel="shortcut icon" href="devchallenges.png" type="image/x-icon" />
      </Head>
      <Navbar />
      <div className="relative flex-auto flex overflow-hidden">
        <main className="flex-auto overflow-y-auto">{children}</main>
        <SideBar />
      </div>
      <ToastContainer />
    </div>
  );
};

export default Wrapper;
