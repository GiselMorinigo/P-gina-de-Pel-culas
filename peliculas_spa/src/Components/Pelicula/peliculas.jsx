import React, { useState, useEffect } from "react";
import Pelicula from "./pelicula";
import { obtenerPeliculas } from "../Services/peliculasServices";
import Grid from "@material-ui/core/Grid";

const Peliculas = (props) => {
  const [peliculas, setPeliculas] = useState([]);
  /*const cargarPeliculas = () => {
    fetch("http://localhost:5000/api/Pelicula")
      .then((response) => response.json())
      //  .then((data) => console.log(data));
      .then((data) => setPeliculas(data));
  };*/

  //ComponentDidMount
  useEffect(() => {
    //console.log(props);
    //componentDidUpdate sin [] se ejecuta siempre que cambie el estado
    //componentDidMount con [] se ejecuta una sola vez cuando se monta el componente
    //componentDidMount con [estado] se ejecuta solo cuando ese estado cambia
    //componentWillUnmount con return, se ejecuta cuando el componente se destruye
    cargarPeliculas();
    //return () => setPeliculas([]);
    //console.log("hola");
  }, []);

  //ComponentDidUpdate()
  useEffect(() => {
    console.log("Se ejecuta cuando cambia el estado");
  });

  const cargarPeliculas = async () => {
    const { data: peliculas } = await obtenerPeliculas(
      localStorage.getItem("idUsuario")
    );
    setPeliculas(peliculas);
  };

  return (
    <>
      <div>
        <h2>Todas las Películas</h2>
      </div>
      <Grid container spacing={2}>
        {peliculas.map((pelicula) => (
          <Pelicula datos={pelicula} key={pelicula.idPelicula}></Pelicula>
        ))}
      </Grid>
    </>
  );
};

export default Peliculas;
