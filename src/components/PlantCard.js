import React, { useState } from "react";

function PlantCard( { plant, edit } ) {

  const [inStock, setInStock] = useState(true);

  function handleInStockEvent(){
    setInStock( !inStock );
  }

  function handleEdit(){
    edit( plant );
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
