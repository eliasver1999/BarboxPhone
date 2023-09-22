import { instance } from "../../axios/axiosInstance";
import { BooksKind } from "../../redux/reducers/books";
import { store } from "../../redux/store";

export const getBooks = function () {
  const state = store.getState();
  return new Promise<string>((resolve, reject) => {
    instance({
      url: "/web/bookings",
      method: "GET",
      headers: { Authorization: "Bearer " + state.user.token },
    })
      .then((res) => {
        store.dispatch({
          type: BooksKind.GETBOOKS,
          payload: res.data.bookings,
        });
        resolve("Books" + res.data.bookings.length + "retrieved");
      })
      .catch((error) => {
        reject(error.response.data.message);
      });
  });
};
export const addBook = function (class_time_id: number, date: string) {
  const state = store.getState();
  const data = { class_time_id, date };
  console.log(data);
  return new Promise<string>((resolve, reject) => {
    instance({
      url: "/web/book",
      method: "POST",
      data: data,
      headers: { Authorization: "Bearer " + state.user.token },
    })
      .then((res) => {
        store.dispatch({
          type: BooksKind.ADDBOOK,
          payload: res.data.book,
        });
        resolve("Book created Succesfully!");
      })
      .catch((error) => {
        reject(error.response.data.message);
      });
  });
};
export const deleteBook = function (id: number) {
  const state = store.getState();
  return new Promise<string>((resolve, reject) => {
    instance({
      url: `/web/delete-book/${id}`,
      method: "DELETE",
      headers: { Authorization: "Bearer " + state.user.token },
    })
      .then((res) => {
        store.dispatch({
          type: BooksKind.DELETEBOOK,
          payload: id,
        });
        resolve("Book deleted");
      })
      .catch((error) => {
        reject(Error(error.response.data.message));
      });
  });
};
