import { getItem } from '@/libs';
import { addInList, removeItem, toggleSidebarType } from '@/reducer/actions';
import { useAppContext } from '@/reducer/Provider';

const ItemsInfo = () => {
  const { state, dispatch } = useAppContext();

  const [name, category] = state.sideBar.split('--');

  const [item] = getItem(state.shopCategories[category], name);

  console.log('INFO ITEM RENDERING');

  return (
    <div className="flex flex-col h-full bg-white py-3 px-4 lg:px-8">
      <div>
        <span
          onClick={() => dispatch(toggleSidebarType('items'))}
          className="text-yellow-400 cursor-pointer"
        >
          &#8592; back
        </span>
      </div>
      {item && (
        <>
          <div className="flex-auto overflow-y-auto">
            <span className="flex justify-center items-center bg-gray-400 w-full h-40 rounded-xl my-4 overflow-hidden">
              {item.img !== '' ? (
                <img
                  className="flex justify-center text-gray-900 w-full h-auto"
                  src={item.img}
                  alt={`No image ${item.emoji}`}
                />
              ) : (
                <span className="text-gray-900">No image {item.emoji}</span>
              )}
            </span>
            <h3 className="text-sm text-gray-400">Name</h3>
            <p className="my-4">{`${item.emoji} ${item.name}`}</p>
            <h3 className="text-sm text-gray-400">Category</h3>
            <p className="my-4">{category}</p>
            <h3 className="text-sm text-gray-400">Note</h3>
            <p className="my-4">{item.note}</p>
          </div>
          <div className="flex justify-end">
            <button
              onClick={() => {
                if (confirm('Do you want delete this item?')) {
                  dispatch(removeItem(category, item.name));
                  dispatch(toggleSidebarType('items'));
                }
              }}
              className="text-gray-900 text-sm lg:text-base font-bold mr-4 hover:text-red-600"
            >
              Delete
            </button>
            <button
              onClick={() => dispatch(addInList(category, item.name))}
              className="text-sm py-2 px-4 lg:text-base bg-yellow-400 font-bold text-white rounded-xl"
            >
              Add to list
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ItemsInfo;
