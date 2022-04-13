import React, { useState, useEffect } from "react";
import { buscarPor } from "../Services/peliculasServices";
import Pelicula from "./pelicula";
import Grid from "@material-ui/core/Grid";

const Buscar = (props) => {
  const [peliculas, setPelicula] = useState([]);

  const handleBuscar = async (buscar) => {
    const { data: peliculas } = await buscarPor(
      localStorage.getItem("idUsuario"),
      buscar
    );
    setPelicula(peliculas);
  };

  useEffect(() => {
    handleBuscar(props.match.params.valor);
  }, [props.match.params.valor]);

  return (
    <>
      <h2>Resultados de la búsqueda</h2>
      <Grid container spacing={2}>
        {peliculas.map((pelicula) => (
          <Pelicula datos={pelicula} key={pelicula.idPelicula}></Pelicula>
        ))}
      </Grid>
    </>
  );
};

export default Buscar;
