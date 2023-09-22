export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
interface PersonInfoType {
  id: number | undefined | string;
  user_id: number | undefined | string;
  first_name: string;
  last_name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  phone: string;
}
export interface userType {
  role: string;
  id: number | undefined | string;
  name: string;
  email: string;
  avatar: string;
  sub: number;
  token: string;
  photo: string;
  personalInfo: PersonInfoType;
}
export interface test {
  user: userType;
}
export const loginAction = (user: userType) => ({
  type: LOGIN,
  payload: {
    user,
  },
});
export const logoutAction = () => ({
  type: LOGOUT,
  payload: {},
});
