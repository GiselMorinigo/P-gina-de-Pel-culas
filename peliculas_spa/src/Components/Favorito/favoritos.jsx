import React, { useContext } from "react";
import FavoritoItem from "../Favorito/favoritoItem";
import Grid from "@material-ui/core/Grid";
import { FavoritoContext } from "../Context/favoritoContext";

const Favoritos = () => {
  const { itemsFav } = useContext(FavoritoContext);

  return (
    <>
      <h2>
        Mis Favoritos{" "}
        {itemsFav.length === 0 && "(No tienes películas favoritas en tu lista)"}
      </h2>
      <Grid container spacing={2}>
        {itemsFav.map((pelicula) => (
          <FavoritoItem pelicula={pelicula}></FavoritoItem>
        ))}
      </Grid>
    </>
  );
};

export default Favoritos;
