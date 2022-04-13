import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import Body from "./Components/Body/body";
import Footer from "./Components/Footer/footer";
import Header from "./Components/Header/header";
import Menu from "./Components/Menu/menu";
import "./index.css";
import { FavoritoProvider } from "./Components/Context/favoritoContext";
import { CarritoProvider } from "./Components/Context/carritoContext";
import { LoginProvider } from "./Components/Context/loginContext";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter forceRefresh={true}>
      <CarritoProvider>
        <FavoritoProvider>
          <LoginProvider>
            {localStorage.getItem("idUsuario") > 0 && <Header />}
            {localStorage.getItem("idUsuario") > 0 && <Menu />}
            <Body />
            <Footer />
          </LoginProvider>
        </FavoritoProvider>
      </CarritoProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
