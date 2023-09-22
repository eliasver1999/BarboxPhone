import { book, Books } from "../../redux/actions/books";
import { ClassTimes, SingleClassTime } from "../../redux/actions/classTimes";
import { store } from "../../redux/store";
type countBook = {
  value?: number;
  class?: string;
  index?: number;
};
export function BooksComparedLastMonth() {
  const state = store.getState().books;
  let currentMonth = new Date().getMonth();
  currentMonth += 1;
  let thisMonthBooks = state.filter((item: book) => {
    let date = item.date.split("/");
    let month = Number(date[1]);
    if (month === currentMonth) {
      return item;
    }
  });
  let previousMonthBooks = state.filter((item: book) => {
    let date = item.date.split("/");
    let month = Number(date[1]);
    if (month === currentMonth - 1) {
      return item;
    }
  });
  let percentage =
    (thisMonthBooks.length - previousMonthBooks.length) /
    previousMonthBooks.length;
  percentage = percentage * 100;
  return percentage;
}
export const getByDay = (day: string) => {
  const bookings: book[] = store.getState().books;
  return bookings.filter((b: book) => b.class_time[0].days == day).length;
};
export const PreferedWorkout = () => {
  const bookings: book[] = store.getState().books;

  let obj = [];
  for (let i = 0; i < bookings.length; i++) {
    let object: countBook = {};
    let flag = 0;
    if (bookings[i].class_time[0]) {
      for (let j = 0; j < obj.length; j++) {
        if (obj[j].class == bookings[i].class_time[0].classes[0].name) {
          if (obj[j].value) {
            obj[j].value = obj[j].value + 1;
            flag = 1;
          }
        }
      }
      if (flag == 1) {
        continue;
      }
      object["class"] = bookings[i].class_time[0].classes[0].name;
      object["value"] = 1;
    }
    obj.push(object);
    object = {};
  }
};
