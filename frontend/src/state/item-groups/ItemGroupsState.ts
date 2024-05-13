import { atom } from "recoil";

export const itemGroupsState = atom<any>({
  key: "itemGroupsState",
  default: {
    new: [],
    active: [],
    review: [],
    closed: [],
  },
});
