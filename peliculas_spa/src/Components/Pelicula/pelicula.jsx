import React, { useEffect, useState, useRef, useContext } from "react";
import Button from "@material-ui/core/Button";
import Rating from "@material-ui/lab/Rating";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Icon from "@material-ui/core/Icon";
import { FavoritoContext } from "../Context/favoritoContext";
import { CarritoContext } from "../Context/carritoContext";

const Pelicula = ({ datos }) => {
  const { handleAgregarCarrito, handleComprar } = useContext(CarritoContext);
  const { handleAgregarFavorito, handleEliminarFavorito } =
    useContext(FavoritoContext);
  //console.log(datos.favorito.length);
  const [esFavorita, setEsFavorita] = useState(
    datos.favorito.length ? true : false
  );

  const [botones, setBotones] = useState(false);
  const favorito = useRef();

  useEffect(() => {
    setBotones(datos.carrito.length > 0 ? true : false);
  }, []);

  const setFavorito = (pelicula) => {
    //if (pelicula.favorito.length === 0) {
    if (!esFavorita) {
      handleAgregarFavorito(pelicula);
      favorito.current.className =
        "material-icons MuiIcon-root MuiIcon-colorSecondary";
    } else {
      handleEliminarFavorito(pelicula);
      favorito.current.className =
        "material-icons MuiIcon-root MuiIcon-colorDisabled";
    }
    setEsFavorita(!esFavorita);
  };

  return (
    <>
      <Grid container item xs={12} sm={4} lg={3}>
        <Paper style={{ padding: 5, textAlign: "center" }}>
          <h2>{datos.titulo}</h2>
          <Icon
            color={datos.favorito.length > 0 ? "secondary" : "disabled"}
            style={{ cursor: "pointer" }}
            ref={favorito}
            onClick={() => setFavorito(datos)}
          >
            favorite
          </Icon>
          <div>
            <img width={200} src={datos.portada} />
          </div>
          <div>
            <Rating value={datos.estrellas} readOnly />
          </div>
          <div>{datos.sinopsis}</div>
          <br />
          <div>{`Género: ${datos.genero}`}</div>
          <br />
          <div>{`Director: ${datos.director}`}</div>
          <br />
          <div>{`Año: ${datos.anio}`}</div>
          <br />
          <div>
            <b>{`Precio: $ ${datos.precio}`}</b>
          </div>
          <br />

          <div>
            <Button
              variant="contained"
              color="primary"
              disabled={botones}
              onClick={() => {
                handleComprar([datos]);
                setBotones(true);
                alert("¡Has comprado esta película!");
              }}
            >
              Comprar
            </Button>
            &nbsp;
            <Button
              variant="outlined"
              color="secondary"
              disabled={botones}
              onClick={() => {
                handleAgregarCarrito(datos);
                setBotones(true);
              }}
            >
              Agregar al Carrito
            </Button>
          </div>
        </Paper>
      </Grid>
    </>
  );
};

export default Pelicula;
