import Head from 'next/head';
import { convertShoppingCart, filterBySearchContent } from '@/libs';
import { addInList, search, toggleSideBar, toggleSidebarType } from '@/reducer/actions';
import { useAppContext } from '@/reducer/Provider';
import { BiSearchAlt2 } from 'react-icons/bi';
import { RiAddFill } from 'react-icons/ri';
import React from 'react';
import { actionType, stateType } from '@/types';

const SearchInput = React.memo<{ dispatch: React.Dispatch<actionType> }>(
  ({ dispatch }) => (
    <form className="relative w-full lg:w-72 h-12 mt-6 xl:mt-0">
      <button
        type="submit"
        className="absolute top-1/2 transform -translate-y-1/2 left-4 text-gray-700 hover:text-yellow-400"
      >
        <BiSearchAlt2 />
      </button>
      <input
        onChange={(e) => dispatch(search(e.target.value))}
        type="search"
        className="w-full h-full rounded-xl pl-10 outline-none focus-within:ring ring-yellow-400"
        placeholder="Search item"
      />
    </form>
  ),
  () => true
);

const Item = React.memo<{ item; dispatch; name }>(
  ({ item, dispatch, name }) => {
    return (
      <div className="relative overflow-hidden inline-flex justify-between items-center p-3 text-base w-52 bg-white mr-6 mb-10 rounded-xl shadow-lg">
        <span>{item.emoji}</span>
        <span
          onClick={() => {
            dispatch(toggleSideBar(true));
            dispatch(toggleSidebarType(`${item.name}--${name}`));
          }}
          className="flex-auto ml-1 hover:text-yellow-400 cursor-pointer"
        >
          {item.name}
        </span>
        <span
          onClick={() => dispatch(addInList(name, item.name))}
          className="hover:text-yellow-400 cursor-pointer"
        >
          <RiAddFill className="hover:transform hover:scale-150" />
        </span>
      </div>
    );
  },
  (prev, next) => JSON.stringify(prev.item) === JSON.stringify(next.item)
);

const CategoryItem = ({ state, dispatch, category: { name, items } }) => {
  items = filterBySearchContent(items, state.searchContent);

  return (
    <div className="w-full my-8">
      <h2 className="text-lg font-medium mt-8 mb-4">{name}</h2>
      <div className="flex sm:justify-start justify-center flex-wrap">
        {items.length ? (
          items.map((item, i) => (
            <Item
              key={'categoryItem' + item.name + i}
              item={item}
              dispatch={dispatch}
              name={name}
            />
          ))
        ) : (
          <span className="text-yellow-400 text-base">No items</span>
        )}
      </div>
    </div>
  );
};

const fake = [1, 2, 3, 4, 5, 6];

export default function Home() {
  const { state, dispatch } = useAppContext();

  const categories = convertShoppingCart(state?.shopCategories);

  return (
    <div className="px-3 py-8 lg:px-20 sm:px-8">
      <Head>
        <title>Shoppingify</title>
      </Head>
      <div className="flex justify-between flex-col xl:flex-row">
        <h1 className="sm:text-lg lg:text-2xl font-bold">
          <span>
            <b className="text-yellow-400">Shoppingify</b>allows you take your
          </span>
          <br />
          <span>shopping list wherever you go</span>
        </h1>
        <SearchInput dispatch={dispatch} />
      </div>
      {!state.loadingState ? (
        <div>
          {categories?.map((category, i) => (
            <CategoryItem
              state={state}
              dispatch={dispatch}
              key={'categoryItem-' + i}
              category={category}
            />
          ))}
        </div>
      ) : (
        <div>
          {fake.slice(0, 3).map((n, i) => (
            <div key={`fake-${n}-${i}`} className="w-full my-8">
              <h2 className="mt-8 mb-4">
                <span className="animate-pulse w-60 h-4 rounded-xl bg-gray-300 block"></span>
              </h2>
              <div className="flex sm:justify-start justify-center flex-wrap">
                {fake.map((o, j) => (
                  <div
                    key={`fake-${o}-${j}-${n}-${i}`}
                    className="animate-pulse relative overflow-hidden inline-flex justify-between items-center p-3 w-52 bg-gray-50 mr-6 mb-10 rounded-xl shadow-lg"
                  >
                    <span className="block w-4 h-4 rounded-full bg-gray-300"></span>
                    <span className="flex-auto ml-1 block w-20 mr-4 h-4 rounded-full bg-gray-300"></span>
                    <span className="text-gray-300">
                      <RiAddFill />
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
