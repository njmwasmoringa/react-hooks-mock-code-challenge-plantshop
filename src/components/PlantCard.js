import React, { useContext, useState } from "react";
import { StoreContext } from "../context/store.context";

function PlantCard( { plant } ) {

  const {store, setStore} = useContext(StoreContext);
  const [inStock, setInStock] = useState(true);

  // Function for handling in stock
  function handleInStockEvent(){
    setInStock( !inStock );
  }

  function handleEdit(){
    /**
     * use the context to send the plant that is being edited to the 
     * NewPlantForm component
     */
    setStore( { ...store, plantInEdit:plant } );
  }

  return (
    <li className="card">
      <img src={plant.image ==undefined ? "https://via.placeholder.com/400" : plant.image  } alt={"plant name"} />
      
      <h4>{plant.name}</h4>
      <p>Price: {plant.price} <button onClick={ handleEdit } >Edit Price</button> </p>
      {inStock ? (
        <button className="primary" onClick={ handleInStockEvent } >In Stock</button>
      ) : (
        <button onClick={ handleInStockEvent }>Out of Stock</button>
      )}
    </li>
  );
}

export default PlantCard;
