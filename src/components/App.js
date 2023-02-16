import React from "react";
import { StoreProvider } from "../context/store.context";
import Header from "./Header";
import PlantPage from "./PlantPage";

function App() {
  return (
    <StoreProvider>
      <div className="app">
        <Header />
        <PlantPage />
      </div>
    </StoreProvider>
  );
}

export default App;
