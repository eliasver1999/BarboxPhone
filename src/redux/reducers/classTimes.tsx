import { ClassTimes } from "../actions/classTimes";
import { LOGIN, userType } from "../actions/user";

export enum ClassTimesKind {
  GETCLASSTIMES = "GETCLASSTIMES",
  LOGOUT = "LOGOUT",
}
interface ClassTimesAction {
  type: ClassTimesKind;
  payload?: any;
}
const initialState: ClassTimes = [];

function classTimesReducer(
  state: ClassTimes = initialState,
  action: ClassTimesAction
) {
  const { type, payload } = action;
  switch (type) {
    case ClassTimesKind.GETCLASSTIMES:
      return payload;
    case ClassTimesKind.LOGOUT:
      return initialState;
    default:
      return state;
  }
}

export default classTimesReducer;
