import { AuthenticatedInstance, instance } from "../axios/axiosInstance";
import { store } from "../redux/store";
import { UserActionKind } from "../redux/reducers/user";
import { ClassTimesKind } from "../redux/reducers/classTimes";
import { BooksKind } from "../redux/reducers/books";
import { BodyKind } from "../redux/reducers/body";
import { WodKind } from "../redux/reducers/wod";
import { HoursKind } from "../redux/reducers/hours";

interface dataType {
  email: string;
  password: string;
}
interface registerType {
  email: string;
  password: string;
  name: string;
  password_confirmation: string;
}
export const login = function (data: dataType) {
  return new Promise<string>((resolve, reject) => {
    instance({
      url: "/web/user/login",
      data: data,
      method: "POST",
    })
      .then((res) => {
        let name = res.data.user.name;
        let email = res.data.user.email;
        let avatar = res.data.user.avatar;
        let sub = res.data.user.subscription;
        let token = res.data.token;
        let role = res.data.user.roles;
        let id = res.data.user.id;
        const user = { name, email, avatar, sub, token, role, id };
        store.dispatch({ type: UserActionKind.LOGIN, payload: user });

        resolve("Worked");
      })
      .catch((error) => {
        reject(error.response.data.message);
      });
  });
};

export const register = function (data: registerType) {
  return new Promise<string>((resolve, reject) => {
    instance({
      url: "/web/user/register",
      data: data,
      method: "POST",
    })
      .then((res) => {
        resolve("Worked");
      })
      .catch((error) => {
        reject(error.response.data.message);
      });
  });
};

export const logoutAction = function () {
  const state = store.getState();
  return new Promise<string>((resolve, reject) => {
    instance({
      url: "/web/user/logout",
      method: "POST",
      headers: { Authorization: "Bearer " + state.user.token },
    })
      .then((res) => {
        store.dispatch({ type: UserActionKind.LOGOUT });
        store.dispatch({ type: ClassTimesKind.LOGOUT });
        store.dispatch({ type: BooksKind.LOGOUT });
        store.dispatch({ type: BodyKind.LOGOUT });
        store.dispatch({ type: WodKind.LOGOUT });
        store.dispatch({ type: HoursKind.LOGOUT });
        resolve("test");
      })
      .catch((error) => {
        store.dispatch({ type: UserActionKind.LOGOUT });
      });
  });
};
