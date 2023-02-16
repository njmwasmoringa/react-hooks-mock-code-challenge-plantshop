import { createContext, useEffect, useState } from "react";

export const StoreContext = createContext();
export function StoreProvider({children}){
    const [ store, setStore ] = useState({
        plants:[],
        users:[],
        isLoading:false
    });
    return <StoreContext.Provider value={{store, setStore}}>
        {children}
    </StoreContext.Provider>
}