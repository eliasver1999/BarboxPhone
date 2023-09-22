import { instance } from "../../axios/axiosInstance";
import { body } from "../../redux/actions/body";
import { BodyKind } from "../../redux/reducers/body";
import { WodKind } from "../../redux/reducers/wod";

import { store } from "../../redux/store";
import { formatDate } from "../dates/formatDate";

export const getWods = function () {
  const state = store.getState();
  return new Promise<string>((resolve, reject) => {
    instance({
      url: "/web/wods",
      method: "GET",
      headers: { Authorization: "Bearer " + state.user.token },
    })
      .then((res) => {
        store.dispatch({
          type: WodKind.GETWODS,
          payload: res.data.wods,
        });
        resolve("Wods:" + res.data.wods.length + " retrieved!");
      })
      .catch((error) => {
        reject(Error(error.response.data.message));
      });
  });
};
