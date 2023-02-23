import React from "react";
import PlantCard from "./PlantCard";

function PlantList( { plants, edit } ) {

  return (
    <ul className="cards">{
      plants.map( plant => <PlantCard key={plant.id} plant={plant} edit={edit} /> )
    }</ul>
  );
}

export default PlantList;
