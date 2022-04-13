import axios from "./axiosServices";

export function comprar(carrito) {
  return axios.post("Carrito/Comprar/", carrito);
}
