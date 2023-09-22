import { store } from "../../redux/store";
import { logoutAction } from "../login";
import { getBody } from "./body";
import { getBooks } from "./books";
import { getClassTimes } from "./classTimes";
import { getHours } from "./hours";
import { getWods } from "./wod";

export const getAll = function () {
  const state = store.getState();
  getClassTimes()
    .then((res) => console.log(res))
    .catch((error) => logoutAction());
  getBooks()
    .then((res) => console.log(res))
    .catch((error) => {});
  getBody()
    .then((res) => console.log(res))
    .catch((error) => console.warn(error));
  getWods()
    .then((res) => console.log(res))
    .catch((error) => console.log(error));
  getHours()
    .then((res) => console.log(res))
    .catch((error) => console.log(error));
};
