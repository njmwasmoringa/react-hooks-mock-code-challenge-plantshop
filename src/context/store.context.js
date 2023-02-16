import { createContext, useEffect, useState } from "react";

export const StoreContext = createContext();

export function StoreProvider({children}){
    
    /**
     * The store state here will be a shared state across all 
     * StoreProvider child components
     * 
     * You can store alot of data inside the store and make it available across 
     * e.g. users
     */
    const [ store, setStore ] = useState({
        plants:[],
        users:[]
    });
    return <StoreContext.Provider value={{store, setStore}}>
        {children}
    </StoreContext.Provider>
}