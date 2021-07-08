import { reducerType } from '@/types';
import { Actions } from '@/reducer/actions';
import {
  toggleSideBar,
  toggleSidebarType,
  incrementPcs,
  decrementPcs,
  removePcs,
  removeItem,
  addInList,
  search,
  addItem,
  toggleDraft,
  saveList,
  toggleStatus,
  loadSavedList,
  loadShoppingCategories,
  toggleLoading,
} from './reducers';

export const reducer: reducerType = (state, action) => {
  switch (action.type) {
    case Actions.TOGGLE_SIDE_BAR:
      return toggleSideBar(state, action);
    case Actions.TOGGLE_LOADING:
      return toggleLoading(state, action);
    case Actions.TOGGLE_SIDEBAR_TYPE:
      return toggleSidebarType(state, action);
    case Actions.LOAD_SAVED_LIST:
      return loadSavedList(state, action);
    case Actions.LOAD_SHOPPING_CATEGORIES:
      return loadShoppingCategories(state, action);
    case Actions.SAVE_LIST:
      return saveList(state, action);
    case Actions.TOGGLE_DRAFT:
      return toggleDraft(state, action);
    case Actions.TOGGLE_STATUS:
      return toggleStatus(state, action);
    case Actions.SEARCH:
      return search(state, action);
    case Actions.INCREMENT_PCS:
      return incrementPcs(state, action);
    case Actions.DECREMENT_PCS:
      return decrementPcs(state, action);
    case Actions.REMOVE_PCS:
      return removePcs(state, action);
    case Actions.REMOVE_ITEM:
      return removeItem(state, action);
    case Actions.ADD_ITEM:
      return addItem(state, action);
    case Actions.ADD_IN_LIST:
      return addInList(state, action);
    default:
      return state;
  }
};
