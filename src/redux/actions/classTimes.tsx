export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
interface classes {
  id: number;
  subscription_type_id: string;
  name: string;
  description: string;
  color: string;
}
export interface SingleClassTime {
  id: number;
  class_id: number;
  start_time: string;
  end_time: string;
  days: string;
  classes: classes[];
}
export type ClassTimes = Array<SingleClassTime>;

export const loginAction = (classTimes: ClassTimes) => ({
  type: LOGIN,
  payload: {
    classTimes,
  },
});
export const logoutAction = () => ({
  type: LOGOUT,
  payload: {},
});
