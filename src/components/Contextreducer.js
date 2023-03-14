/* eslint-disable react-hooks/rules-of-hooks */
import React, { createContext, useContext, useReducer } from "react";

const cartstatement = createContext();

const cartdispatchcontext = createContext();

const reducer = (state, action) => {

switch(action.type){

  case "ADD":
    return [...state,{}]

    default:
      console.log('error in Reducer');
}

};
export const cartprovider = ({ Children }) => {
  const [state, dispatch] = useReducer(reducer, []);

  return (
    <>
      <cartdispatchcontext.Provider value={dispatch}>
        <cartstatement.Provider value={state}>
          {Children}
        </cartstatement.Provider>
      </cartdispatchcontext.Provider>
    </>
  );
};

export function usecart() {
  return useContext(cartstatement);
}
export function usecartdispatch() {
  return useContext(cartdispatchcontext);
}
