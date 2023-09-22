import { LOGIN, userType } from "../actions/user";

export enum UserActionKind {
  LOGIN = "LOGIN",
  LOGOUT = "LOGOUT",
}
interface UserAction {
  type: UserActionKind;
  payload?: any;
}
const initialState: userType = {
  name: "",
  email: "",
  avatar: "",
  sub: -4,
  token: "",
  role: "",
  id: "",
  photo: "",
  personalInfo: {
    id: "",
    user_id: "",
    first_name: "",
    last_name: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    phone: "",
  },
};
function userReducer(state: userType = initialState, action: UserAction) {
  const { type, payload } = action;
  switch (type) {
    case UserActionKind.LOGIN:
      state.email = payload.email;
      state.name = payload.name;
      state.token = payload.token;
      state.avatar = payload.avatar;
      state.sub = payload.sub;
      state.role = payload.role;
      state.id = payload.id;
      return {
        ...state,
      };
    case UserActionKind.LOGOUT:
      state.email = "";
      state.name = "";
      state.token = "";
      state.avatar = "";
      state.sub = 0;

      return {
        ...state,
      };
    default:
      return state;
  }
}

export default userReducer;
