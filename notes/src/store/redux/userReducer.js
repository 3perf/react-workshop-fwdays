import { createAction } from "@reduxjs/toolkit";
import { produce } from "immer";

export const updateLastActiveDate = createAction(
  "notes/updateLastActiveDate",
  (dateString) => {
    return {
      payload: {
        dateString,
      },
    };
  }
);

const userReducer = (userData = [], action) => {
  if (action.type === updateLastActiveDate.toString()) {
    return produce(userData, (draft) => {
      draft[0].lastActiveDate = action.payload.dateString;
      // draft[1].lastActiveDate = draft[1].lastActiveDate;
      // draft[2].lastActiveDate = "1-1-1";
      // draft[0] = draft[0]
      // hm, i've caught three assignments, and one of them caused draft[2].lastActiveDate to change.
      // so I'm going to return a new object – keeping all the fields the same except draft[2]
    });

    // draft.get(...).set('lastActiveDate', '2022-05-16')

    // userData[0].lastActiveDate = action.payload.dateString;
    // const [currentUser, ...otherUsers] = userData;

    // return [
    //   {
    //     ...currentUser,
    //     lastActiveDate: action.payload.dateString,
    //   },
    //   ...otherUsers,
    // ];
  }

  return userData;
};

export default userReducer;
