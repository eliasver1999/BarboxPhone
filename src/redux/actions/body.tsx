import { ClassTimes } from "./classTimes";
import { userType } from "./user";

export interface body {
  id: number;
  user_id: number;
  date: string;
  gender: string;
  height: number;
  weight: number;
  waist: number;
  chest: number;
  hips: number;
  thighs: number;
  arms: number;
  neck: number;
  created_at: string;
}
export type BodyData = Array<body>;
