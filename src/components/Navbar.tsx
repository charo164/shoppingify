import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { TiShoppingCart } from 'react-icons/ti';
import { BsListCheck, BsClockHistory } from 'react-icons/bs';
import { ImStatsDots } from 'react-icons/im';
import {
  toggleSideBar,
  loadSavedList,
  loadShoppingCategories,
  toggleLoading,
} from '@/reducer/actions';
import { countItems, getActivePath, getCookie } from '@/libs';
import React, { useEffect } from 'react';
import { actionType, stateType } from '@/types';
import { useAppContext } from '@/reducer/Provider';

const NavLink = React.memo<{ children: React.ReactNode; href: string; asPath: string }>(
  ({ children, href, asPath }) => {
    const active = getActivePath(asPath) === href;
    return (
      <Link href={href}>
        <a className="flex justify-center items-center relative hover:text-yellow-400 w-full h-12 text-gray-500">
          {active && (
            <span className="absolute h-full left-0 w-1 bg-yellow-400 rounded-md"></span>
          )}
          {children}
        </a>
      </Link>
    );
  },
  (prev, next) =>
    getActivePath(prev.asPath) !== next.href && prev.href !== getActivePath(next.asPath)
);

const Navbar = () => {
  const { state, dispatch } = useAppContext();

  useEffect(() => {
    const savedLists = getCookie('_SAVED_LIST');
    const shopCategories = getCookie('_SHOP_CATEGORIES');
    if (savedLists && savedLists.length > 0) dispatch(loadSavedList(savedLists));
    if (shopCategories) dispatch(loadShoppingCategories(shopCategories));
    dispatch(toggleLoading());
    return () => {};
  }, []);

  const { asPath } = useRouter();

  const count: any = countItems(state?.shoppingCart);

  console.log('NAV_BAR RENDERING');

  return (
    <nav className="flex flex-col justify-between flex-shrink-0 w-10 bg-white xl:w-20 z-50">
      <div className="flex justify-center items-center pt-6">
        <Link href="/">
          <a>
            <Image src={'/logo.svg'} width="38px" height="38px" />
          </a>
        </Link>
      </div>
      <div className="flex flex-col justify-between h-52">
        <NavLink asPath={asPath} href="/">
          <BsListCheck size="1.8em" />
        </NavLink>
        <NavLink asPath={asPath} href="/history">
          <BsClockHistory size="1.8em" />
        </NavLink>
        <NavLink asPath={asPath} href="/statistics">
          <ImStatsDots size="1.8em" />
        </NavLink>
      </div>
      <div className="flex justify-center items-center pb-6">
        <button
          onClick={() => dispatch(toggleSideBar())}
          className="flex justify-center items-center rounded-full relative bg-yellow-400 w-10 h-10 text-white"
        >
          {count.count !== 0 && (
            <span className="absolute w-5 h-5 rounded-lg bg-red-600 text-white text-sm overflow-hidden -top-1 -right-1">
              {count.count}
            </span>
          )}
          <TiShoppingCart size="1.4em" />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
