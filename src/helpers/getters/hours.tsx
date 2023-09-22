import { instance } from "../../axios/axiosInstance";
import { HoursKind } from "../../redux/reducers/hours";
import { WodKind } from "../../redux/reducers/wod";
import { store } from "../../redux/store";

export const getHours = function () {
  const state = store.getState();
  return new Promise<string>((resolve, reject) => {
    instance({
      url: "/web/table-hours",
      method: "GET",
      headers: { Authorization: "Bearer " + state.user.token },
    })
      .then((res) => {
        store.dispatch({
          type: HoursKind.GETHOURS,
          payload: res.data.hours,
        });
        resolve("Hours:" + res.data.hours.length + " retrieved!");
      })
      .catch((error) => {
        reject(error.response.data.message);
      });
  });
};
