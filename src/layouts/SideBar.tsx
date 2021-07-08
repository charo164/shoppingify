import SideBarContent from '@/components/sidebar';
import { useAppContext } from '@/reducer/Provider';
import React from 'react';
const SideBar = () => {
  const { state } = useAppContext();
  const hidden = state.sidebarToggled
    ? 'w-full lg:w-96 sm:w-80'
    : 'w-0 opacity-0  overflow-hidden';
  return (
    <div
      className={`absolute h-full ${hidden}  flex-shrink-0 transition-all duration-75 sm:relative`}
    >
      <SideBarContent />
    </div>
  );
};

export default SideBar;
