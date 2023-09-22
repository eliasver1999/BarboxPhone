import { BodyData } from "../actions/body";

export enum BodyKind {
  GETBODY = "GETBODY",
  ADDBODY = "ADDBODY",
  LOGOUT = "LOGOUT",
}
interface BodyAction {
  type: BodyKind;
  payload?: any;
}
const initialState: BodyData = [];

function BodyReducer(state: BodyData = initialState, action: BodyAction) {
  const { type, payload } = action;
  switch (type) {
    case BodyKind.GETBODY:
      return payload;
    case BodyKind.ADDBODY:
      return [...state, payload];
    case BodyKind.LOGOUT:
      return initialState;
    default:
      return state;
  }
}

export default BodyReducer;
