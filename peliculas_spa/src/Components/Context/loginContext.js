import React, { createContext } from "react";
export const LoginContext = createContext();

export const LoginProvider = (props) => {
  const handleLogin = (idUsuario, token) => {
    localStorage.setItem("idUsuario", idUsuario);
    localStorage.setItem("token", token);
  };

  /*const handleLogout = () => {
    if (localStorage.getItem("email") !== "") {
      localStorage.clear();
      //setEmail(null);
    }
  };*/

  /*useEffect(() => {
    setEmail(localStorage.getItem("email"));
  }, []);
  */

  return (
    <LoginContext.Provider
      value={{
        handleLogin,
        //handleLogout,
      }}
    >
      {props.children}
    </LoginContext.Provider>
  );
};
