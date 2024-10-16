import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import AddPet from "./components/AddPet";
import PetModal from "./components/PetModal";
import EditPet from "./components/EditPet";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<AddPet />} />
        <Route path="/pet/:petId" element={<PetModal />} />
        <Route path="/pets/:petId/edit" element={<EditPet />} />
      </Routes>
    </Router>
  );
}

export default App;
