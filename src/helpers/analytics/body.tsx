import { body } from "../../redux/actions/body";
import { store } from "../../redux/store";

export function WeightComparedToLastMonth() {
  let weight = store.getState().body;
  let data = weight;

  let currentMonth = new Date().getMonth();
  data.sort((a: body, b: body) => {
    return a.created_at < b.created_at;
  });
  const last = data[0];
  const beforeLast = data[1];

  if (data[0]) {
    const percentage =
      ((data[0].weight - data[1].weight) / data[1].weight) * 100;
    return Math.round(percentage);
  }
}
