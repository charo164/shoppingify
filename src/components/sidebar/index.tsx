import { useAppContext } from '@/reducer/Provider';
import ItemsInfo from './ItemsInfo';
import ShoppingCart from './ShoppingCart';
import AddItem from './AddItem';

const SideBarContent = () => {
  const { state } = useAppContext();

  return (
    <>
      {state.sideBar === 'items' && <ShoppingCart />}
      {state.sideBar === 'addItem' && <AddItem />}
      {state.sideBar.search('--') !== -1 && <ItemsInfo />}
    </>
  );
};

export default SideBarContent;
