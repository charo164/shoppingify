import { actionType } from '@/types';

export const Actions = {
  TOGGLE_SIDE_BAR: 'toggle-sidebar',
  INCREMENT_PCS: 'increment-pcs',
  DECREMENT_PCS: 'decrement-pcs',
  REMOVE_PCS: 'remove-pcs',
  ADD_IN_LIST: 'add-in-cart',
  SEARCH: 'search',
  TOGGLE_SIDEBAR_TYPE: 'toggle-sidebar-type',
  REMOVE_ITEM: 'remove-item',
  ADD_ITEM: 'add-item',
  TOGGLE_DRAFT: 'toggle-draft',
  COMPLETE_SAVE_LIST: 'complete-save-list',
  SAVE_LIST: 'save-list',
  TOGGLE_STATUS: 'toggle-status',
  LOAD_SAVED_LIST: 'load-saved-list',
  LOAD_SHOPPING_CATEGORIES: 'load-shopping-categories',
  TOGGLE_LOADING: 'toggle-loading',
};

export const toggleSideBar = (value?): actionType => ({
  type: Actions.TOGGLE_SIDE_BAR,
  value,
});

export const toggleLoading = (value?): actionType => ({
  type: Actions.TOGGLE_LOADING,
  value,
});

export const loadSavedList = (value): actionType => ({
  type: Actions.LOAD_SAVED_LIST,
  value,
});

export const loadShoppingCategories = (value): actionType => ({
  type: Actions.LOAD_SHOPPING_CATEGORIES,
  value,
});

export const toggleDraft = (value): actionType => ({
  type: Actions.TOGGLE_DRAFT,
  value,
});

export const completeSaveList = (value): actionType => ({
  type: Actions.COMPLETE_SAVE_LIST,
  value,
});

export const saveList = (value): actionType => ({
  type: Actions.SAVE_LIST,
  value,
});

export const toggleStatus = (value): actionType => ({
  type: Actions.TOGGLE_STATUS,
  value,
});

export const toggleSidebarType = (value): actionType => ({
  type: Actions.TOGGLE_SIDEBAR_TYPE,
  value,
});

export const search = (value = ''): actionType => ({
  type: Actions.SEARCH,
  value,
});

export const incrementPcs = (category: string, name: string): actionType => ({
  type: Actions.INCREMENT_PCS,
  value: { category, name },
});

export const decrementPcs = (category: string, name: string): actionType => ({
  type: Actions.DECREMENT_PCS,
  value: { category, name },
});

export const removePcs = (category: string, name: string, emoji: string): actionType => ({
  type: Actions.REMOVE_PCS,
  value: { category, name, emoji },
});

export const removeItem = (category: string, name: string): actionType => ({
  type: Actions.REMOVE_ITEM,
  value: { category, name },
});

export const addItem = (value): actionType => ({
  type: Actions.ADD_ITEM,
  value,
});

export const addInList = (category: string, name: string): actionType => ({
  type: Actions.ADD_IN_LIST,
  value: { category, name },
});
