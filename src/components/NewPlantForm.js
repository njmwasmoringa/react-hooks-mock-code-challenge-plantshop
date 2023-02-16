import React, { useContext, useEffect, useState } from "react";
import { StoreContext } from "../context/store.context";
import { Api } from "../services/api";

const plantsAPI = new Api("plants");

function NewPlantForm( ) {

  /**
   * Use the context to get the plant that was clicked for editing
   * from the PlantCard component
   */
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

  /**
   * This function handles both editing of plant and creating of plant
   * @param {*} evt 
   * 
   */
  function handleSubmit( evt ){
    evt.preventDefault();
    
    if( store.plantInEdit ){ 
      /**
     * if there is a plant being editted do the edit here
     */

      // This is to show a loader incase the request takes too long
      setStore({...store, savingPlant:true});

      /** do the update request if editing */
      plantsAPI.update(store.plantInEdit.id, plant).then((updatedPlant)=>{
        setStore((prevStore)=>{
          const newStore = {...prevStore};
          // Find the edited plant in the plants list
          const i = newStore.plants.findIndex(p=>p.id==store.plantInEdit.id);
          if(i > -1){
            newStore.plants[i] = updatedPlant;
          }
          // Update the edited plant to update the PlantList Component and remove the loader
          return {...newStore, plantInEdit:updatedPlant, savingPlant:false };
        })
      })

    }
    else{ 
      /**
       * Create a new plant
       */
      plantsAPI.create(plant).then((newPlant)=>{
        // Update the store to also update the PlantList Component with the new plant
        setStore({...store, plants:[...store.plants, newPlant]})
      })
    }

  }

  function cancelEdit(){
    setStore({...store, plantInEdit:null});
  }

  /**
   * The useEffect here is used to monitor if there is plant being edited or created
   */
  useEffect(()=>{
    if(store.plantInEdit){
      /**
       * Populate the form with the data of the plant being edited
       */
      setPlant( store.plantInEdit );
    }
    else{
      
      /**
       * Empty the form fields if the user cancels edit
       */
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
        
        {/* Show the loader when saving */}
        { store.savingPlant ? <div>Saving...</div> : <><button type="submit">{store.plantInEdit ? "Edit" : "Add"} Plant</button>
        {store.plantInEdit && <button onClick={cancelEdit}> Cancel Edit </button> }</> }
      </form>
    </div>
  );
}

export default NewPlantForm;
