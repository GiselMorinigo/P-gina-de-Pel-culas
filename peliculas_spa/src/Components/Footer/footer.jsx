import React from "react";
import "./footer.css";
import Icon from "@material-ui/core/Icon";

const Footer = () => {
  return (
    <footer>
      <p>Venta de Películas - Copyright</p>
      <Icon color="primary" fontSize="large">
        email
      </Icon>
      &nbsp;&nbsp;
      <Icon color="primary" fontSize="large">
        facebook
      </Icon>
    </footer>
  );
};

export default Footer;
