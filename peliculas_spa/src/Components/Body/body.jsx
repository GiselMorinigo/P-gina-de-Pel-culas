import React from "react";
import Peliculas from "../Pelicula/peliculas";
import { Route } from "react-router-dom";
import Login from "../Login/login";
import Favoritos from "../Favorito/favoritos";
import Carrito from "../Carrito/carrito";
import Destacadas from "../Pelicula/destacadas";
import Buscar from "../Pelicula/buscar";
import Registro from "../Registro/registro";

const Body = () => {
  return (
    <section>
      <Route path="/" exact component={Login}></Route>
      <Route path="/peliculas" exact component={Peliculas}></Route>
      <Route path="/favoritos" exact component={Favoritos}></Route>
      <Route path="/carrito" exact component={Carrito}></Route>
      <Route path="/destacadas" exact component={Destacadas}></Route>
      <Route path="/buscar/:valor" exact component={Buscar}></Route>
      <Route path="/buscar/" exact component={Peliculas}></Route>
      <Route path="/registro/" exact component={Registro}></Route>
    </section>
  );
};

export default Body;
