import React, { useEffect, useState } from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

function PlantPage() {

  const [plants, setPlants] = useState([]);
  const [allPlants, setAllPlants] = useState([]);
  const [ selectedPlant, setSelectedPlant ] = useState();
  const [ plantedChange, setPlantChanged ] = useState(false);

  function edit( plant ){
    setSelectedPlant( plant );
  }

  function handleSearch(plantName){
    setPlants( allPlants.filter(plant=>plant.name.includes(plantName)) );
  }

  useEffect(()=>{

    fetch("http://localhost:6001/plants")
    .then(resp=>resp.json())
    .then(responseBody=>{
      setPlants( responseBody );
      setAllPlants( responseBody );
    })

  }, [ plantedChange ]);

  return (
    <main>
      <NewPlantForm editedPlant={ selectedPlant } updateGrid={setPlantChanged} />
      <Search onSearch={handleSearch} />
      <PlantList plants={plants} edit={edit} />
    </main>
  );
}

export default PlantPage;
