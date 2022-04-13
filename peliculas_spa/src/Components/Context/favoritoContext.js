import React, { useEffect, createContext, useState } from "react";
import {
  obtenerFavorito,
  agregarFavorito,
  eliminarFavorito,
} from "../Services/favoritoServices";
export const FavoritoContext = createContext();

export const FavoritoProvider = (props) => {
  const [cantidadFav, setCantidadFav] = useState(0);
  const [itemsFav, setItemsFav] = useState([]);

  const handleObtenerFavorito = async () => {
    const { data: favoritos } = await obtenerFavorito(
      localStorage.getItem("idUsuario")
    );
    //console.log(favoritos);
    setItemsFav(favoritos);
    setCantidadFav(favoritos.length);
  };

  const handleAgregarFavorito = async (pelicula) => {
    await agregarFavorito({
      idUsuario: localStorage.getItem("idUsuario"),
      idPelicula: pelicula.idPelicula,
    });
    setCantidadFav(cantidadFav + 1);
    setItemsFav([...itemsFav, pelicula]);
  };

  const handleEliminarFavorito = async (pelicula) => {
    const { data } = await eliminarFavorito({
      idUsuario: localStorage.getItem("idUsuario"),
      idPelicula: pelicula.idPelicula,
    });
    const newItems = itemsFav.filter(
      (item) => item.idPelicula !== pelicula.idPelicula
    );
    setItemsFav(newItems);
    setCantidadFav(cantidadFav - 1);
  };

  useEffect(() => {
    localStorage.getItem("idUsuario") && handleObtenerFavorito();
  }, []);

  return (
    <FavoritoContext.Provider
      value={{
        itemsFav,
        cantidadFav,
        handleObtenerFavorito,
        handleAgregarFavorito,
        handleEliminarFavorito,
      }}
    >
      {props.children}
    </FavoritoContext.Provider>
  );
};
