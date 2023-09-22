import { instance } from "../../axios/axiosInstance";
import { body } from "../../redux/actions/body";
import { BodyKind } from "../../redux/reducers/body";

import { store } from "../../redux/store";
import { formatDate } from "../dates/formatDate";

export const getBody = function () {
  const state = store.getState();
  return new Promise<string>((resolve, reject) => {
    instance({
      url: "/web/user/settings",
      method: "GET",
      headers: { Authorization: "Bearer " + state.user.token },
    })
      .then((res) => {
        store.dispatch({
          type: BodyKind.GETBODY,
          payload: res.data.user_body,
        });
        resolve("Body data:" + res.data.user_body.length + "retrieved");
      })
      .catch((error) => {
        reject(Error(error.response.data.message));
      });
  });
};
export const addBody = function (body: body) {
  const state = store.getState();
  const date = new Date();
  console.log(body["arms"]);
  const data = {
    gender: body.gender,
    height: body.height,
    weight: body.weight,
    waist: body.waist,
    chest: body.chest,
    hips: body.hips,
    arms: body.arms,
    neck: body.neck,
    thighs: body.thighs,
    body_fat: 0,
    date: formatDate(date),
  };
  return new Promise<string>((resolve, reject) => {
    instance({
      url: `/web/user/settings/add-body-info`,
      method: "POST",
      data: data,
      headers: { Authorization: "Bearer " + state.user.token },
    })
      .then((res) => {
        store.dispatch({
          type: BodyKind.ADDBODY,
          payload: res.data.user_body,
        });

        resolve(res.data.message);
      })
      .catch((error) => {
        reject(error.response.data.message);
      });
  });
};
