import { instance } from "../../axios/axiosInstance";
import { ClassTimesKind } from "../../redux/reducers/classTimes";
import { store } from "../../redux/store";

export const getClassTimes = function () {
  const state = store.getState();
  return new Promise<string>((resolve, reject) => {
    instance({
      url: "/web/class-times",
      method: "GET",
      headers: { Authorization: "Bearer " + state.user.token },
    })
      .then((res) => {
        store.dispatch({
          type: ClassTimesKind.GETCLASSTIMES,
          payload: res.data.class_times,
        });
        resolve("Class times retrieved" + res.data.class_times.length);
      })
      .catch((error) => {
        reject(Error(error));
      });
  });
};
