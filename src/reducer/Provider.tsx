import React from 'react';
import { createContext, useReducer, useContext } from 'react';
import { reducer } from '.';
import { initialState } from './initialState';
import { stateType, actionType } from '@/types';

type dispatch = (action: actionType) => void;

const AppContext =
  createContext<{ state: stateType; dispatch: React.Dispatch<actionType> }>(null);

const useAppContext = () => {
  const { state, dispatch } = useContext(AppContext);
  return { state, dispatch };
};

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>;
};
export default AppProvider;
export { useAppContext };
