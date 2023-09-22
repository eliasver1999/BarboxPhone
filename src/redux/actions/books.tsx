import { ClassTimes } from "./classTimes";
import { userType } from "./user";

export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export interface book {
  id: number;
  user_id: number;
  date: string;
  class_time_id: number;
  class_time: ClassTimes;
  user: userType;
}
export type Books = Array<book>;

export const loginAction = (books: Books) => ({
  type: LOGIN,
  payload: {
    books,
  },
});
export const logoutAction = () => ({
  type: LOGOUT,
  payload: {},
});
