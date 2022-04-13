import React, { createContext, useState } from "react";
import { comprar } from "../Services/carritoServices";

export const CarritoContext = createContext();

export const CarritoProvider = (props) => {
  const [cantidad, setCantidad] = useState(0);
  const [items, setItems] = useState([]);

  const handleAgregarCarrito = async (pelicula) => {
    setCantidad(cantidad + 1);
    setItems([...items, pelicula]);
  };

  const handleEliminarCarrito = async (pelicula) => {
    const newItems = items.filter(
      (item) => item.idPelicula !== pelicula.idPelicula
    );

    setItems(newItems);
    setCantidad(cantidad - 1);
  };

  const handleEliminarCarritoTodos = async () => {
    setItems([]);
    setCantidad(0);
  };

  const handleComprar = async (peliculas) => {
    const carrito = peliculas.map((pelicula) => ({
      idUsuario: localStorage.getItem("idUsuario"),
      idPelicula: pelicula.idPelicula,
    }));

    await comprar(carrito);

    handleEliminarCarritoTodos();
  };

  return (
    <CarritoContext.Provider
      value={{
        items,
        setItems,
        cantidad,
        setCantidad,
        handleAgregarCarrito,
        handleEliminarCarrito,
        handleComprar,
      }}
    >
      {props.children}
    </CarritoContext.Provider>
  );
};
