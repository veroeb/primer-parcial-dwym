import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/AddPet.css";

const AddPet = () => {
  const [pet, setPet] = useState({
    name: "",
    age: "",
    type: "",
    description: "",
    characteristics: "",
    photo: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPet({ ...pet, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formattedPet = {
      ...pet,
      name: pet.name
        .split(" ")
        .map(
          (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        )
        .join(" "),
      characteristics: pet.characteristics
        .split(",")
        .map((char) => char.trim()),
    };
    fetch("http://localhost:3005/api/pets", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formattedPet),
    })
      .then((response) => {
        if (response.ok) {
          navigate("/");
        } else {
          throw new Error("Failed to add pet");
        }
      })
      .catch((error) => console.error("Error adding pet", error));
  };

  return (
    <div className="add-pet">
      <h2>Agregar nueva mascota</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Nombre"
          value={pet.name}
          onChange={handleChange}
          required
        />
        <select name="age" value={pet.age} onChange={handleChange} required>
          <option value="">Seleccione la edad</option>
          <option value="Cachorro">Cachorro</option>
          <option value="Adulto">Adulto</option>
          <option value="Senior">Senior</option>
        </select>
        <select name="type" value={pet.type} onChange={handleChange} required>
          <option value="">Seleccione el tipo de mascota</option>
          <option value="Perro">Perro</option>
          <option value="Gato">Gato</option>
        </select>
        <input
          type="text"
          name="description"
          placeholder="Descripción"
          value={pet.description}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="characteristics"
          placeholder="Características (separadas por comas)"
          value={pet.characteristics}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="photo"
          placeholder="URL de la foto"
          value={pet.photo}
          onChange={handleChange}
          required
        />
        <button type="submit">Agregar</button>
      </form>
    </div>
  );
};

export default AddPet;
