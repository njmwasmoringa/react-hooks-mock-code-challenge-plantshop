import React, { useContext, useEffect, useState } from "react";
import { StoreContext } from "../context/store.context";
import { Api } from "../services/api";

const plantsAPI = new Api("plants");

function NewPlantForm( ) {

  const {store, setStore} = useContext(StoreContext);

  const [ plant, setPlant ] = useState({
    name:'',
    image: '',
    price: 0
  });

  function handleChange( evt ){
    setPlant({
      ...plant,
      [evt.target.name]: evt.target.value
    });
  }

  function handleSubmit( evt ){
    evt.preventDefault();

    if( store.plantInEdit ){ // we are editing

      setStore({...store, savingPlant:true});

      plantsAPI.update(store.plantInEdit.id, plant).then((updatedPlant)=>{
        setStore((prevStore)=>{
          const newStore = {...prevStore};
          const i = newStore.plants.findIndex(p=>p.id==store.plantInEdit.id);
          if(i > -1){
            newStore.plants[i] = updatedPlant;
          }
          return {...newStore, plantInEdit:updatedPlant, savingPlant:false };
        })
      })

    }
    else{ // we are creating
      plantsAPI.create(plant).then((newPlant)=>{
        setStore({...store, plants:[...store.plants, newPlant]})
      })
    }

  }

  function cancelEdit(){
    setStore({...store, plantInEdit:null});
  }

  useEffect(()=>{
    if(store.plantInEdit){
      setPlant( store.plantInEdit );
    }
    else{
      setPlant({
        name:'',
        image: '',
        price: 0
      });
    }
  }, [ store ])
  
  return (
    <div className="new-plant-form">
      <h2>{store.plantInEdit ? "Edit Plant" : "New Plant"}</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Plant name" onChange={ handleChange } value={ plant.name } />
        <input type="text" name="image" placeholder="Image URL" onChange={ handleChange } value={plant.image} />
        <input type="number" name="price" step="0.01" placeholder="Price" onChange={ handleChange } value={plant.price} />
        { store.savingPlant ? <div>Saving...</div> : <><button type="submit">{store.plantInEdit ? "Edit" : "Add"} Plant</button>
        {store.plantInEdit && <button onClick={cancelEdit}> Cancel Edit </button> }</> }
      </form>
    </div>
  );
}

export default NewPlantForm;
