import axios from "axios";
import { useSelector } from "react-redux";
import { store } from "../redux/store";

function getToken() {
  const state = store.getState();
  return state.user.token;
}
export const instance = axios.create({
  baseURL: "https://api.barbox.gr/api",
  headers: {
    "Content-Type": "application/json",
    timeout: 0,
  },
});
export const AuthenticatedInstance = axios.create({
  baseURL: "https://api.barbox.gr/api",
  headers: {
    "Content-Type": "application/json",
    timeout: 1000,
    Authorization: "Bearer " + getToken(),
  },
});
