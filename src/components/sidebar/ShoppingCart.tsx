import { useAppContext } from '@/reducer/Provider';
import { MdModeEdit } from 'react-icons/md';
import { BiPlus, BiMinus, BiTrash } from 'react-icons/bi';
import React, { Fragment, useState } from 'react';
import {
  decrementPcs,
  incrementPcs,
  removePcs,
  saveList,
  toggleDraft,
  toggleSidebarType,
  toggleStatus,
} from '@/reducer/actions';
import { convertShoppingCart, countItems } from '@/libs';

const IdGenerator = (name) => `id-${Date.now()}-${name}`;

const Save = () => {
  const { state, dispatch } = useAppContext();
  const [name, setName] = useState('');

  const isDraft = !(state.draft === '');

  const defaultList = (id) => ({
    name,
    status: 'draft',
    content: state.shoppingCart,
    date: new Date().toDateString(),
    id,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isDraft) {
      dispatch(toggleStatus('canceled'));
      dispatch(toggleDraft(''));
    } else {
      const id = IdGenerator(name);
      dispatch(saveList(defaultList(id)));
      dispatch(toggleDraft(id));
    }
  };

  const complete = () => {
    setName('');
    dispatch(toggleStatus('completed'));
  };

  const count: any = countItems(state?.shoppingCart);

  const isNoReady = !count.count || name === '' || name.length < 3;

  console.log('SAVE RENDERING');

  return (
    <div className=" bg-white px-6 py-4">
      {!isDraft ? (
        <form
          onSubmit={handleSubmit}
          className={`relative flex h-12 border-2 ${
            !isNoReady ? 'border-yellow-400' : 'border-gray-400'
          } rounded-xl`}
        >
          <input
            type="text"
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter a name"
            className="flex-auto w-full h-full pl-6 pr-12 rounded-xl outline-none"
          />
          <button
            type="submit"
            disabled={isNoReady}
            className="absolute right-0 bg-yellow-400 disabled:bg-gray-400 w-1/3 h-full text-white font-bold rounded-lg"
          >
            Save
          </button>
        </form>
      ) : (
        <form onSubmit={handleSubmit} className="flex h-12 justify-end">
          <button type="submit" className="text-gray-800 mr-4 font-bold hover:text-red-600">
            Cancel
          </button>
          <span
            onClick={complete}
            className="flex justify-center items-center cursor-pointer right-0 bg-blue-400 w-1/3 h-full text-white font-bold rounded-lg"
          >
            Complete
          </span>
        </form>
      )}
    </div>
  );
};

const Item = ({ isDraft, item, dispatch, category }) => {
  const [strike, setStrike] = useState(false);
  return (
    <li className="group flex flex-wrap justify-between text-sm mp:text-base font-bold py-2">
      <span>
        {isDraft && (
          <input
            onChange={(e) => setStrike(e.target.checked)}
            type="checkbox"
            className="mr-2 border border-yellow-400 w-4 h-4"
            id={item.emoji + ' ' + item.name}
          />
        )}
        <label
          htmlFor={item.emoji + ' ' + item.name}
          className={`cursor-pointer ${strike && 'line-through'}`}
        >
          {item.emoji + ' ' + item.name}
        </label>
      </span>

      <div
        className={`flex h-7 items-center ${!isDraft && 'group-hover:bg-white'} rounded-xl py-1`}
      >
        <button
          onClick={() => dispatch(removePcs(category, item.name, item.emoji))}
          className={`${!isDraft && 'group-hover:block'} hidden text-yellow-400`}
        >
          <BiTrash />
        </button>
        <button
          onClick={() => dispatch(decrementPcs(category, item.name))}
          className={`${!isDraft && 'group-hover:block'}  hidden text-yellow-400 mx-1`}
        >
          <BiMinus />
        </button>
        <span className="px-2 overflow-hidden mr-1 h-5 mp:h-6 border border-yellow-400 text-xs mp:text-sm text-yellow-400 rounded-xl">
          {item.pcs} pcs
        </span>
        <button
          onClick={() => dispatch(incrementPcs(category, item.name))}
          className={`${!isDraft && 'group-hover:block'}  hidden mr-1 text-yellow-400`}
        >
          <BiPlus />
        </button>
      </div>
    </li>
  );
};

const ListItems = ({ items, category }) => {
  const { state, dispatch } = useAppContext();
  const isDraft = !(state.draft === '');

  console.log('LIST ITEMS RENDERING');
  return (
    <ul>
      {items.length ? (
        items.map((item, i) => (
          <Item
            key={'item' + item + i}
            item={item}
            category={category}
            isDraft={isDraft}
            dispatch={dispatch}
          />
        ))
      ) : (
        <li className="flex justify-between text-xs text-yellow-400 mp:text-sm py-2">
          No items
        </li>
      )}
    </ul>
  );
};

const ShoppingList = () => {
  const { state, dispatch } = useAppContext();

  const categories = convertShoppingCart(state?.shoppingCart);

  const count: any = countItems(state?.shoppingCart);

  console.log('SHOPPING LIST RENDERING');

  return (
    <div className="flex-auto px-3 lg:px-6 overflow-y-auto">
      {count.count ? (
        <>
          <h2 className="flex justify-between items-center text-lg mp:text-xl font-bold">
            Shopping list <MdModeEdit />
          </h2>
          {categories.map(({ name, items }, i) => {
            return (
              <Fragment key={'categories' + i}>
                <h3 className="text-xs mp:text-sm text-gray-700 mt-4">{name}</h3>
                <ListItems items={items} category={name} />
              </Fragment>
            );
          })}
        </>
      ) : (
        <div className="flex flex-col justify-around items-center h-full w-full">
          <span className="text-gray-800 text-base font-bold">No items</span>
          <img src="/undraw_shopping_app_flsj 1.svg" alt="undraw_shopping_app_flsj" />
        </div>
      )}
    </div>
  );
};

const fake = [1, 2, 3, 4, 5, 6];

const ShoppingCart = () => {
  const { state, dispatch } = useAppContext();

  console.log('SHOPPING CART RENDERING');
  return (
    <div className="flex flex-col h-full bg-yellow-100">
      <div className="flex items-center sm:items-start flex-col px-2 lg:px-6 py-4">
        <div className="relative max-w-xs flex justify-around bg-red-700 w-full rounded-3xl">
          <div>
            <img
              src="/source.svg"
              alt="source"
              className="relative transform -translate-y-4 w-20"
            />
          </div>
          <div className="p-3">
            <p className="text-sm mp:text-lg md:text-base text-white font-bold">
              Didn’t find what you need?
            </p>
            <button
              onClick={() => dispatch(toggleSidebarType('addItem'))}
              className="bg-gray-50 rounded-lg text-gray-900 text-xs py-2 px-4 font-bold mt-2 md:px-6"
            >
              Add item
            </button>
          </div>
        </div>
      </div>
      {!state.loadingState ? (
        <ShoppingList />
      ) : (
        <div className="flex-auto px-3 lg:px-6 overflow-y-auto">
          <h2 className="animate-pulse  flex text-gray-300 justify-between items-center text-lg mp:text-xl font-bold">
            <span className="w-60 h-4 rounded-xl bg-gray-300 block"></span> <MdModeEdit />
          </h2>
          {fake.map((n, i) => (
            <div key={`fake2-${n}-${i}`}>
              <h3 className="animate-pulse mt-4">
                <span className="w-52 h-4 rounded-xl bg-gray-300 block"></span>
              </h3>
              <ul>
                {fake.slice(0, 3).map((o, j) => (
                  <li
                    key={`fake2-${o}-${j}-${n}-${i}`}
                    className="animate-pulse flex flex-wrap justify-between py-2"
                  >
                    <div className="flex">
                      <span className="block w-4 h-4 rounded-full bg-gray-300"></span>
                      <span className="flex-auto ml-1 block w-36 mr-4 h-4 rounded-full bg-gray-300"></span>
                    </div>

                    <div className="flex h-7 py-1">
                      <span className="px-2 overflow-hidden mr-1 h-5 mp:h-6 border border-gray-300 text-xs mp:text-sm text-gray-300 rounded-xl">
                        ...pcs
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
      <Save />
    </div>
  );
};

export default ShoppingCart;
