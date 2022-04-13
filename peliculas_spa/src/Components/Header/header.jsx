import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./header.css";
import Badge from "@material-ui/core/Badge";
import Icon from "@material-ui/core/Icon";
import { FavoritoContext } from "../Context/favoritoContext";
import { CarritoContext } from "../Context/carritoContext";

const Header = () => {
  const { cantidadFav } = useContext(FavoritoContext);
  const { cantidad } = useContext(CarritoContext);

  return (
    <header>
      <h1>Venta de Películas</h1>
      <br />
      <Link to="/favoritos">
        <Icon color="action" fontSize="large">
          favorite
        </Icon>
      </Link>
      <Badge badgeContent={cantidadFav} color="secondary"></Badge>
      &nbsp;&nbsp; &nbsp;&nbsp;
      <Link to="/carrito">
        <Icon color="action" fontSize="large">
          shopping_cart
        </Icon>
      </Link>
      <Badge badgeContent={cantidad} color="primary"></Badge>
    </header>
  );
};

export default Header;
