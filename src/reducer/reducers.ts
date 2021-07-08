import { setCookie, sweetAlert } from '@/libs';
import { reducerType } from '@/types';

export const toggleSideBar: reducerType = (state, action) => ({
  ...state,
  sidebarToggled: action.value ? action.value : !state.sidebarToggled,
});

export const toggleLoading: reducerType = (state, action) => ({
  ...state,
  loadingState: !state.loadingState,
});

export const toggleDraft: reducerType = (state, action) => ({
  ...state,
  draft: action.value,
});

export const loadSavedList: reducerType = (state, action) => {
  const draftList = action?.value?.filter((list) => list?.status === 'draft')[0];
  return {
    ...state,
    savedLists: action.value,
    draft: draftList ? draftList.id : state.draft,
    shoppingCart: draftList ? draftList.content : state.shoppingCart,
  };
};

export const loadShoppingCategories: reducerType = (state, action) => {
  return {
    ...state,
    shopCategories: action.value,
  };
};

export const saveList: reducerType = (state, action) => {
  const list = state?.savedLists?.filter((l) => l?.id === action.value.id);
  if (list[0]) {
    let savedLists = state?.savedLists?.filter((l) => l?.id !== action.value.id);
    savedLists = [...savedLists, , action.value];
    sweetAlert('List updated', 'success', '2');
    setCookie('_SAVED_LIST', savedLists);
    return { ...state, savedLists: savedLists };
  } else {
    const savedLists = [...state.savedLists, action.value];
    sweetAlert('List saved 👌', 'success', '2');
    setCookie('_SAVED_LIST', savedLists);
    return { ...state, savedLists: savedLists };
  }
};

export const toggleStatus: reducerType = (state, action) => {
  let list: any = state?.savedLists?.filter((l) => l?.id === state?.draft);
  const isCanceled = action.value === 'canceled';
  if (list[0]) {
    list = { ...list[0], status: action.value, date: new Date().toDateString() };

    let savedLists = state?.savedLists?.filter((l) => l?.id !== state?.draft);
    savedLists = [...savedLists, list];
    setCookie('_SAVED_LIST', savedLists);
    sweetAlert(`${isCanceled ? 'Canceled ❌' : 'Completed ✅'}`, 'info', '2');
    return {
      ...state,
      savedLists: savedLists,
      draft: isCanceled ? state.draft : '',
      shoppingCart: {
        'Fruit and vegetables': [],
        'Meat and Fish': [],
        Beverages: [],
        Pets: [],
      },
    };
  }
  return state;
};

export const toggleSidebarType: reducerType = (state, action) => ({
  ...state,
  sideBar: action.value,
});

export const search: reducerType = (state, action) => ({
  ...state,
  searchContent: action.value,
});

export const incrementPcs: reducerType = (state, action) => {
  state.shoppingCart[action.value.category] = state.shoppingCart[action.value.category].map(
    (item) => {
      if (item.name === action.value.name) return { ...item, pcs: item.pcs + 1 };
      return item;
    }
  );
  return { ...state, shoppingCart: state.shoppingCart };
};

export const decrementPcs: reducerType = (state, action) => {
  state.shoppingCart[action.value.category] = state.shoppingCart[action.value.category].map(
    (item) => {
      if (item.name === action.value.name)
        return { ...item, pcs: item.pcs > 1 ? item.pcs - 1 : item.pcs };
      return item;
    }
  );
  return { ...state, shoppingCart: state.shoppingCart };
};

export const removePcs: reducerType = (state, action) => {
  state.shoppingCart[action.value.category] = state.shoppingCart[action.value.category].filter(
    (item) => item.name !== action.value.name
  );
  sweetAlert(`${action.value.emoji} ${action.value.name} remove to the list ❌`, 'info', '2');
  return { ...state, shoppingCart: state.shoppingCart };
};

export const removeItem: reducerType = (state, action) => {
  state.shopCategories[action.value.category] = state.shopCategories[
    action.value.category
  ].filter((item) => item.name !== action.value.name);
  state.shoppingCart[action.value.category] = state.shoppingCart[action.value.category].filter(
    (item) => item.name !== action.value.name
  );
  setCookie('_SHOP_CATEGORIES', state.shopCategories);
  return { ...state, shopCategories: state.shopCategories, shoppingCart: state.shoppingCart };
};

export const addItem: reducerType = (state, action) => {
  state.shopCategories[action.value.category] = [
    ...state.shopCategories[action.value.category],
    { ...action.value, pcs: 0 },
  ];
  sweetAlert('Successfully added item 👌', 'success', '2');
  setCookie('_SHOP_CATEGORIES', state.shopCategories);
  return { ...state, shopCategories: state.shopCategories };
};

export const addInList: reducerType = (state, action) => {
  if (!(state.draft === '')) return state;
  const isAlreadyAdd = state.shoppingCart[action.value.category].filter(
    (item) => action.value.name === item.name
  ).length;

  if (isAlreadyAdd) return state;

  const item = state.shopCategories[action.value.category].filter(
    (item) => action.value.name === item.name
  )[0];

  let shoppingCart = state.shoppingCart;

  shoppingCart[action.value.category] = [
    ...shoppingCart[action.value.category],
    { ...item, pcs: 1 },
  ];

  sweetAlert(`${item.emoji} ${item.name} added to the list ✅`, 'info', '2');

  return { ...state, shoppingCart: shoppingCart };
};
