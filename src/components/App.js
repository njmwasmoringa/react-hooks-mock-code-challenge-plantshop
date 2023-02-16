import React from "react";
import { StoreProvider } from "../context/store.context";
import Header from "./Header";
import PlantPage from "./PlantPage";

function App() {
  return (
    /* Include the store provider which makes the store available in all components */
    <StoreProvider>
      <div className="app">
        <Header />
        <PlantPage />
      </div>
    </StoreProvider>
  );
}

export default App;
