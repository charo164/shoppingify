import Link from 'next/link';
import { BiCalendar } from 'react-icons/bi';
import { convertShoppingCart } from '@/libs';
import { useAppContext } from '@/reducer/Provider';
import { useRouter } from 'next/router';
import React from 'react';

const Item = React.memo<{ item }>(
  ({ item }) => (
    <div className="relative overflow-hidden inline-flex justify-between items-center p-3 text-base w-52 bg-white mr-6 mb-10 rounded-xl shadow-lg">
      <span>{item.emoji}</span>
      <span className="flex-auto ml-1">{item.name}</span>
      <span className="text-yellow-400">{item.pcs} pcs</span>
    </div>
  ),
  (prev, next) => JSON.stringify(prev.item) === JSON.stringify(next.item)
);

const CategoryItem = React.memo<{ category }>(
  ({ category: { name, items } }) => {
    return (
      <div className="w-full my-8">
        <h2 className="text-lg font-medium mt-8 mb-4">{name}</h2>
        <div className="flex sm:justify-start justify-center flex-wrap">
          {items.length ? (
            items.map((item, i) => (
              <Item item={item} key={'categoryItem-history' + item.name + i} />
            ))
          ) : (
            <span className="text-yellow-400 text-base">No items</span>
          )}
        </div>
      </div>
    );
  },
  (prev, next) => JSON.stringify(prev.category) === JSON.stringify(next.category)
);

const HistoryDetail = () => {
  const { state } = useAppContext();
  const {
    query: { id },
  } = useRouter();

  const list = state?.savedLists?.filter((list) => list?.id === id)[0];

  const categories = convertShoppingCart(list?.content);

  return (
    <>
      {list ? (
        <div className="px-3 py-8 lg:px-20 sm:px-8">
          <Link href="/history">
            <a className="text-yellow-400">&#8592; back</a>
          </Link>
          <div>
            <h1 className="text-xl lg:text-2xl mt-4 text-gray-800 font-bold">{list.name}</h1>
            <h3 className="flex items-center text-gray-400 mt-2">
              <span className="mr-1">
                <BiCalendar />
              </span>
              {list.date}
            </h3>
            {categories.map((category, i) => (
              <CategoryItem key={'category-history' + i} category={category} />
            ))}
          </div>
        </div>
      ) : (
        <div className="px-3 py-8 lg:px-20 sm:px-8">
          <Link href="/history">
            <a className="text-yellow-400">&#8592; back</a>
          </Link>
          <div>
            <h1 className="text-xl lg:text-2xl mt-4 text-gray-800 font-bold">No result</h1>
          </div>
        </div>
      )}
    </>
  );
};

export default HistoryDetail;
