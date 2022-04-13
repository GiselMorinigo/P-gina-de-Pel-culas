import React, { useContext } from "react";
import { FavoritoContext } from "../Context/favoritoContext";
import { CarritoContext } from "../Context/carritoContext";
import Button from "@material-ui/core/Button";
import Rating from "@material-ui/lab/Rating";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

const FavoritoItem = ({ pelicula }) => {
  const { handleAgregarCarrito } = useContext(CarritoContext);
  const { handleEliminarFavorito } = useContext(FavoritoContext);

  return (
    <>
      <Grid container item xs={12} sm={12} lg={12}>
        <Paper style={{ padding: 5, textAlign: "center", width: "100%" }}>
          <table style={{ width: "100%" }}>
            <tr>
              <td>
                <img width={60} src={pelicula.portada} />
              </td>
              <td>
                <h2>{pelicula.titulo}</h2>
                <Rating value={pelicula.estrellas} readOnly />
              </td>
              <td>{`Año: ${pelicula.anio}`}</td>
              <td>{`Precio: $ ${pelicula.precio}`}</td>
              <td>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => handleEliminarFavorito(pelicula)}
                >
                  Quitar
                </Button>
                &nbsp;
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => {
                    handleAgregarCarrito(pelicula);
                    handleEliminarFavorito(pelicula);
                  }}
                >
                  Agregar al Carrito
                </Button>
              </td>
            </tr>
          </table>
        </Paper>
      </Grid>
    </>
  );
};

export default FavoritoItem;
