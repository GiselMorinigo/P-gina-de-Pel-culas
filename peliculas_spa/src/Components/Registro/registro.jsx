import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Icon from "@material-ui/core/Icon";
import Button from "@material-ui/core/Button";
import { registrar } from "../Services/usuarioServices";
import sha1 from "sha1";

const Registro = () => {
  const [usuario, setUsuario] = useState({
    nombre: "",
    apellido: "",
    email: "",
    password: "",
  });

  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(usuario);
    await registrar(usuario);
    history.push({ pathname: "/" });
  };

  //const toSha
  const handleChange = (e) => {
    /*if (e.target.name === "nombre")
      setUsuario({ ...usuario, nombre: e.target.value });
    if (e.target.name === "apellido")
      setUsuario({ ...usuario, apellido: e.target.value });
    if (e.target.name === "email")
      setUsuario({ ...usuario, email: e.target.value });
    if (e.target.name === "password")
      setUsuario({ ...usuario, password: e.target.value });
    */
    setUsuario({
      ...usuario,
      [e.target.name]:
        e.target.name === "password" ? sha1(e.target.value) : e.target.value,
    });
    //console.log([e.target.name], e.target.value);
  };

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <h2 style={{ color: "grey" }}>Venta de Películas</h2>
        <h2>Regístrate ahora</h2>
        <Icon color="action">account_circle</Icon>&nbsp;
        <TextField
          name="nombre"
          required
          onChange={(e) => handleChange(e)}
          placeholder="Ingresa tu nombre"
          style={{ width: 300 }}
        />
        &nbsp;
        <TextField
          name="apellido"
          required
          onChange={(e) => handleChange(e)}
          placeholder="Ingresa tu apellido"
          style={{ width: 300 }}
        />
        <br />
        <br />
        <Icon color="action">mail_outline</Icon>&nbsp;
        <TextField
          type="email"
          name="email"
          required
          onChange={(e) => handleChange(e)}
          placeholder="Ingresa tu email"
          style={{ width: 300 }}
        />
        <br />
        <br />
        <Icon color="action">vpn_key</Icon>&nbsp;
        <TextField
          name="password"
          type="password"
          required
          onChange={(e) => handleChange(e)}
          placeholder="Ingresa tu password"
          style={{ width: 300 }}
        />
        <br />
        <br />
        <hr />
        <Button
          variant="contained"
          color="default"
          onClick={() => history.push({ pathname: "/" })}
        >
          Volver
        </Button>
        &nbsp;
        <Button type="submit" variant="contained" color="secondary">
          Regístrate
        </Button>
      </form>
    </Container>
  );
};

export default Registro;
