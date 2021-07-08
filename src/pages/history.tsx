import { AiOutlineRight } from 'react-icons/ai';
import { BiCalendar } from 'react-icons/bi';
import Link from 'next/link';
import Head from 'next/head';
import { organizeByMonthAndYear } from '@/libs';
import { useAppContext } from '@/reducer/Provider';
import { listType } from '@/types';
import React from 'react';

const getStyle = (status) => {
  if (status === 'canceled') return 'text-red-400 border-red-400';
  if (status === 'completed') return 'text-green-400 border-green-400';
  return 'text-blue-400 border-blue-400';
};

const List = React.memo<{ list; style }>(
  ({ list, style }) => {
    return (
      <Link href={`/history/${list?.id}`}>
        <a>
          <li className="flex flex-col xl:flex-row xl:flex-wrap lg: justify-between my-5 py-6 px-4 bg-white shadow-lg rounded-xl">
            <div className="text-lg text-gray-800 font-medium">{list?.name}</div>
            <div className="flex justify-between items-center">
              <span className="flex items-center text-gray-300 text-xs font-bold">
                <span className="mr-1">
                  <BiCalendar />
                </span>
                {new Date(list?.date).toISOString().split('T')[0]}
              </span>
              <div className="flex items-center">
                <span
                  className={`md:mx-4 text-xs px-1 border md:text-sm ${style} md:px-2 py-1 rounded-xl`}
                >
                  {list?.status}
                </span>
                <span className="text-yellow-400">
                  <AiOutlineRight size="1.4em" />
                </span>
              </div>
            </div>
          </li>
        </a>
      </Link>
    );
  },
  (prev, next) => JSON.stringify(prev.list) === JSON.stringify(next.list)
);

const History = React.memo<{ listAndDate }>(
  ({ listAndDate }) => {
    return (
      <div className="mt-8 mb-6">
        <h2 className="text-gray-800 font-medium">{listAndDate?.date}</h2>
        <ul>
          {listAndDate?.list?.map((list: listType, j) => {
            const style = getStyle(list?.status);
            return (
              <List
                key={'list-' + list?.name + listAndDate?.date + '-' + j}
                style={style}
                list={list}
              />
            );
          })}
        </ul>
      </div>
    );
  },
  (prev, next) => JSON.stringify(prev.listAndDate) === JSON.stringify(next.listAndDate)
);

const fake = [1, 2, 3, 4, 6];

const history = () => {
  const { state } = useAppContext();

  const savedLists = organizeByMonthAndYear(state?.savedLists);

  return (
    <div className="px-3 py-8 lg:px-20 sm:px-8">
      <Head>
        <title>History</title>
      </Head>
      <h1 className="sm:text-lg lg:text-2xl font-bold">Shopping history</h1>
      {!state.loadingState
        ? savedLists?.map((listAndDate, i) => {
            return (
              <History
                key={'list-by-date' + listAndDate?.date + '-' + i}
                listAndDate={listAndDate}
              />
            );
          })
        : fake.map(() => (
            <div className="mt-8 mb-6">
              <h2 className="animate-pulse w-28 h-4 rounded-xl bg-gray-300"></h2>
              <ul>
                {fake.map(() => (
                  <li className="animate-pulse flex flex-col xl:flex-row xl:flex-wrap lg: justify-between my-5 py-6 px-4 bg-gray-50 shadow-lg rounded-xl">
                    <div className="w-44 h-4 rounded-xl bg-gray-300"></div>
                    <div className="flex justify-between items-center">
                      <span className="flex items-center text-gray-300">
                        <span className="mr-1">
                          <BiCalendar />
                        </span>
                        <span className="w-28 h-2 rounded-xl bg-gray-300 block"></span>
                      </span>
                      <div className="flex items-center">
                        <span className="md:mx-4 px-1 border md:px-2 py-1 rounded-xl">
                          <span className="w-10 h-2 my-1 rounded-xl bg-gray-300 block"></span>
                        </span>
                        <span className="text-gray-400">
                          <AiOutlineRight size="1.4em" />
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
    </div>
  );
};

export default history;
