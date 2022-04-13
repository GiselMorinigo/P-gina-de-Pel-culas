import React, { useContext } from "react";
import CarritoItem from "../Carrito/carritoItem";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { CarritoContext } from "../Context/carritoContext";

const Carrito = () => {
  const { items, handleComprar } = useContext(CarritoContext);

  return (
    <>
      <h2>
        Mi Carrito{" "}
        {items.length === 0 ? (
          "(No tienes películas en tu carrito)"
        ) : (
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleComprar(items)}
          >
            Comprar Ahora
          </Button>
        )}
      </h2>

      <Grid container spacing={2}>
        {items.map((pelicula) => (
          <CarritoItem pelicula={pelicula}></CarritoItem>
        ))}
      </Grid>
    </>
  );
};

export default Carrito;
