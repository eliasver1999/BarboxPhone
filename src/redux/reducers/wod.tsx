import { Wods } from "../actions/wod";

export enum WodKind {
  GETWODS = "GETWODS",
  LOGOUT = "LOGOUT",
}
interface WodAction {
  type: WodKind;
  payload?: any;
}
const initialState: Wods = [];

function WodReducer(state: Wods = initialState, action: WodAction) {
  const { type, payload } = action;
  switch (type) {
    case WodKind.GETWODS:
      return payload;
    case WodKind.LOGOUT:
      return initialState;
    default:
      return state;
  }
}

export default WodReducer;
