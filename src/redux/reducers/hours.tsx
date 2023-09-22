import { HoursData } from "../actions/hours";

export enum HoursKind {
  GETHOURS = "GETHOURS",
  LOGOUT = "LOGOUT",
}
interface HoursAction {
  type: HoursKind;
  payload?: any;
}
const initialState: HoursData = [];

function HoursReducer(state: HoursData = initialState, action: HoursAction) {
  const { type, payload } = action;
  switch (type) {
    case HoursKind.GETHOURS:
      return payload;
    case HoursKind.LOGOUT:
      return initialState;
    default:
      return state;
  }
}

export default HoursReducer;
