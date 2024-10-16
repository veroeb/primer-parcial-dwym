import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/PetModal.css";

const PetModal = ({ pet, onClose, onAdopt }) => {
  const [petData, setPetData] = useState(pet || null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!pet && pet?.id) {
      fetch(`http://localhost:3005/api/pets/${pet.id}`, { method: "GET" })
        .then((response) => response.json())
        .then((data) => setPetData(data))
        .catch((error) => console.error("Error fetching pet details", error));
    }
  }, [pet]);

  if (!petData) {
    return null;
  }

  const characteristicsArray = Array.isArray(petData.characteristics)
    ? petData.characteristics
    : petData.characteristics?.split(",").map((char) => char.trim()) || [];

  const handleEdit = () => {
    navigate(`/pets/${petData.id}/edit`);
  };

  const handleAdopt = () => {
    fetch(`http://localhost:3005/api/pets/${petData.id}`, { method: "DELETE" })
      .then((response) => {
        if (response.ok) {
          onClose();
          onAdopt(petData.id);
        } else {
          throw new Error("Failed to adopt pet");
        }
      })
      .catch((error) => console.error("Error adopting pet", error));
  };

  return (
    <div className="modal">
      <div className="modal-content pet-details">
        <span className="close-button" onClick={onClose}>
          &times;
        </span>
        <img src={petData.photo} alt={petData.name} />
        <h2>{petData.name}</h2>
        <p>Edad: {petData.age}</p>
        <p>Tipo: {petData.type}</p>
        <p>Descripción: {petData.description}</p>
        <p>Características: {characteristicsArray.join(", ")}</p>
        <div className="pet-details-buttons">
          <button onClick={handleEdit}>Editar</button>
          <button onClick={handleAdopt}>Adoptar</button>
        </div>
      </div>
    </div>
  );
};

export default PetModal;
