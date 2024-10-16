import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PetModal from "./PetModal";
import "../styles/Home.css";

const Home = () => {
  const [pets, setPets] = useState([]);
  const [filter, setFilter] = useState({ type: "All", age: "All" });
  const [selectedPet, setSelectedPet] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3005/api/pets", { method: "GET" })
      .then((response) => response.json())
      .then((data) => setPets(data))
      .catch((error) => console.error("Error fetching pets", error));
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter({ ...filter, [name]: value });
  };

  const filteredPets = pets.filter((pet) => {
    return (
      (filter.type === "All" || pet.type === filter.type) &&
      (filter.age === "All" || pet.age === filter.age)
    );
  });

  const handleAdopt = (id) => {
    setPets((prevPets) => prevPets.filter((pet) => pet.id !== id));
  };

  return (
    <div className="home">
      <div className="title-filters-container">
        <h1>ADOPTA-ME</h1>
        <div className="filters">
        <select name="age" value={filter.age} onChange={handleFilterChange}>
            <option value="All">Edad</option>
            <option value="Cachorro">Cachorro</option>
            <option value="Adulto">Adulto</option>
            <option value="Senior">Senior</option>
          </select>
          <select name="type" value={filter.type} onChange={handleFilterChange}>
            <option value="All">Tipo</option>
            <option value="Perro">Perro</option>
            <option value="Gato">Gato</option>
          </select>          
        </div>
      </div>
      <button className="add-pet-button" onClick={() => navigate("/add")}>
        Agregar mascota
      </button>
      <div className="pets-list">
        {filteredPets.map((pet) => (
          <div key={pet.id} className="pet-card">
            <img src={pet.photo} alt={pet.name} />
            <h2>{pet.name}</h2>
            <p>{pet.description}</p>
            <button onClick={() => setSelectedPet(pet)}>Ver detalles</button>
          </div>
        ))}
      </div>
      {selectedPet && (
        <PetModal
          pet={selectedPet}
          onClose={() => setSelectedPet(null)}
          onAdopt={handleAdopt}
        />
      )}
    </div>
  );
};

export default Home;
