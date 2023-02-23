import React, { useEffect, useState } from "react";

function NewPlantForm( { editedPlant, updateGrid } ) {

  const [ plant, setPlant ] = useState({
    name:'',
    image: '',
    price: 0
  });

  function handlePriceChange( evt ){
    setPlant({
      ...plant,
      [evt.target.name]: evt.target.value
    });
  }

  function handleSubmit( evt ){
    evt.preventDefault();

    if( editedPlant ){ // we are editing

      fetch(`http://localhost:6001/plants/${plant.id}`, {
        method:"PATCH",
        body: JSON.stringify({price: plant.price}),
        headers:{
          "Content-Type": "application/json"
        }
      }).then(()=>{
        updateGrid(true)
      })

    }
    else{ // we are creating
      fetch(`http://localhost:6001/plants`, {
        method:"POST",
        body: JSON.stringify(plant),
        headers:{
          "Content-Type": "application/json"
        }
      }).then(()=>{
        updateGrid(true)
      })
    }

  }

  useEffect(()=>{
    if(editedPlant){
      setPlant( editedPlant );
    }
  }, [ editedPlant ])
  
  return (
    <div className="new-plant-form">
      <h2>{editedPlant ? "Edit Plant" : "New Plant"}</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Plant name" onChange={ handlePriceChange } value={ plant.name } />
        <input type="text" name="image" placeholder="Image URL" onChange={ handlePriceChange } value={plant.image} />
        <input type="number" name="price" step="0.01" placeholder="Price" onChange={ handlePriceChange } value={plant.price} />
        <button type="submit">{editedPlant ? "Edit" : "Add"} Plant</button>
      </form>
    </div>
  );
}

export default NewPlantForm;
