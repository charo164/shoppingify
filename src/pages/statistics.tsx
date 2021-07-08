import { countCategories, countItems, getTopItems } from '@/libs';
import { useAppContext } from '@/reducer/Provider';
import { stateType } from '@/types';
import Head from 'next/head';
import React from 'react';

interface progressBarPropsType {
  percentage: number;
  color: string;
}

const checkPercentage = (percentage) => (percentage = isNaN(percentage) ? 0 : percentage);

const ProgressBar = React.memo<progressBarPropsType>(
  ({ percentage, color }) => {
    return (
      <div className="relative h-2 w-full rounded-xl bg-gray-200">
        <div
          className={`absolute transition-all duration-500 top-0 left-0 ${color} h-full rounded-xl`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    );
  },
  (prev, next) => prev.color === next.color && prev.percentage === next.percentage
);

const Top = React.memo<{ name: string; state: stateType }>(
  ({ name, state }) => {
    const isTopItems = name === 'Top items';

    const count: any = isTopItems
      ? countItems(state?.savedLists)
      : countCategories(state?.savedLists);

    const items = isTopItems ? getTopItems(count.items) : getTopItems(count.items);

    const color = isTopItems ? 'bg-green-400' : 'bg-blue-400';

    return (
      <div className="flex-auto xl:mr-12 xl:w-1/2 xl:last:mt-0 last:mt-10">
        <h2 className="sm:text-lg lg:text-2xl font-bold">{name}</h2>
        {items.map((item) => {
          const percentage = checkPercentage(Math.round((item.count * 100) / count.total));
          return (
            <div className="mt-6" key={'statistic' + item.name}>
              <h3 className="flex justify-between">
                <span>{item.name}</span> <span>{percentage}%</span>
              </h3>
              <div className="mt-3">
                <ProgressBar color={color} percentage={percentage} />
              </div>
            </div>
          );
        })}
      </div>
    );
  },
  (prev, next) => JSON.stringify(prev.state.savedLists) === JSON.stringify(next.state.savedLists)
);

const fake = [1, 2, 3];
const statistics: React.FC = () => {
  const { state } = useAppContext();

  return (
    <div className="px-3 py-8 lg:px-20 sm:px-8">
      <Head>
        <title>Statistics</title>
      </Head>
      <div className="flex flex-col xl:flex-row">
        {!state.loadingState ? (
          <>
            <Top state={state} name="Top items" />
            <Top state={state} name="Top Categories" />
          </>
        ) : (
          <>
            {fake.slice(0, 2).map(() => (
              <div className="flex-auto xl:mr-12 xl:w-1/2 xl:last:mt-0 last:mt-10">
                <h2 className="animate-pulse w-60 h-4 rounded-xl bg-gray-300 block"></h2>
                {fake.map(() => (
                  <div className="mt-6">
                    <h3 className="flex justify-between">
                      <span className="w-20 h-4 rounded-xl bg-gray-300 block"></span>
                      <span className="w-10 h-4 rounded-xl bg-gray-300 block"></span>
                    </h3>
                    <div className="mt-3">
                      <h2 className="animate-pulse w-72 h-3 rounded-xl bg-gray-300"></h2>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default statistics;
