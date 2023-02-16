import React, { useContext, useEffect } from "react";
import { StoreContext } from "../context/store.context";
import PlantCard from "./PlantCard";

import { Api } from "../services/api";
const plantsAPI = new Api('plants');

function PlantList() {

  const {store, setStore} = useContext(StoreContext);
  
  useEffect(()=>{
    plantsAPI.all.then(plants=>setStore({...store, plants}));
  }, []);

  return (
    <ul className="cards">{
      store.plants.map( plant => <PlantCard key={plant.id} plant={plant} /> )
    }</ul>
  );
}

export default PlantList;
