import { Books } from "../actions/books";
import { LOGIN, userType } from "../actions/user";

export enum BooksKind {
  GETBOOKS = "GETBOOKS",
  ADDBOOK = "ADDBOOK",
  DELETEBOOK = "DELETEBOOK",
  LOGOUT = "LOGOUT",
}
interface BooksAction {
  type: BooksKind;
  payload?: any;
}
const initialState: Books = [];

function BooksReducer(state: Books = initialState, action: BooksAction) {
  const { type, payload } = action;
  switch (type) {
    case BooksKind.GETBOOKS:
      return payload;
    case BooksKind.ADDBOOK:
      return [...state, payload];
    case BooksKind.DELETEBOOK:
      return state.filter((element) => element.id !== payload);
    case BooksKind.LOGOUT:
      return initialState;
    default:
      return state;
  }
}

export default BooksReducer;
