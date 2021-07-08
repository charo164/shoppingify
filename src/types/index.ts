interface itemsType {
  name: string;
  pcs: number;
  note: string;
  img: string;
  emoji: string;
  category?: string;
}

interface shopCategoriesType {
  'Fruit and vegetables': itemsType[];
  'Meat and Fish': itemsType[];
  Beverages: itemsType[];
  Pets: itemsType[];
}

interface listType {
  name: string;
  status: 'complete' | 'canceled' | 'draft';
  content: shopCategoriesType;
  date: string;
  id: string;
}

interface stateType {
  sidebarToggled: boolean;
  sideBar: string;
  cartCount: number;
  searchContent: string;
  shopCategories: shopCategoriesType;
  shoppingCart: shopCategoriesType;
  savedLists: listType[];
  draft: string;
  loadingState: boolean;
}

interface actionType {
  type: string;
  value: any;
}

type reducerType = (state: stateType, action: actionType) => stateType;

type sweetAlertType = (
  msg: string,
  type: 'success' | 'info' | 'warning' | 'error' | 'default' | 'dark',
  time: '1' | '2' | '3' | '4' | '5'
) => any;

export type {
  stateType,
  actionType,
  reducerType,
  itemsType,
  sweetAlertType,
  listType,
  shopCategoriesType,
};
