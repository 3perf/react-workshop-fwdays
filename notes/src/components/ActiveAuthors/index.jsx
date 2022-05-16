import { Avatar, AvatarGroup } from "@mui/material";
import { createSelector } from "@reduxjs/toolkit";
import { memo } from "react";
import { useSelector, shallowEqual } from "react-redux";
import avatar1 from "./avatar1.jpg";
import avatar2 from "./avatar2.jpg";
import avatar3 from "./avatar3.jpg";

// const activeThisMonthSelector = createSelector(
//   // INPUTS:
//   (state) => state.users,
//   // ...
//   // SELECTOR:
//   (users) => getUsersActiveThisMonth(users)
// );

//  function getUsersActiveThisMonth() // 20 ms

export const ActiveAuthors = memo(function ActiveAuthors() {
  // useSelector(state => state.activeAuthorsChangedFlag)
  // const store = useStore()
  // const users = store.getState().users

  const users = useSelector((state) => state.users);
  const activeThisMonthCount = users.filter((i) =>
    i.lastActiveDate.includes("2022-05")
  ).length;
  const activeThisMonthNames = users
    .filter((i) => i.lastActiveDate.includes("2022-05"))
    .map((i) => i.name)
    .join(", ");

  users[0].lastName = "abc";

  const activeThisMonth = useSelector((state) =>
    state.users.filter((i) => i.lastActiveDate.includes("2022-05"))
  );
  // const activeThisMonthCount = useSelector(
  //   (state) =>
  //     state.users.filter((i) => i.lastActiveDate.includes("2022-05")).length,
  //   (before, after) => _.isEqual(before, after)
  // );
  // const activeThisMonthNames = useSelector((state) =>
  //   state.users
  //     .filter((i) => i.lastActiveDate.includes("2022-05"))
  //     .map((i) => i.name)
  //     .join(", ")
  // );

  // "abc" === "abc"

  // const allUsers = useSelector((state) => state.users);
  // const activeThisMonth = allUsers.filter((i) =>
  //   i.lastActiveDate.includes("2022-05")
  // );
  // const activeThisMonth = useSelector(
  //   (state) => state.users
  //   // (left, right) => _.isEqual(left, right) // or shallowEqual
  // );
  // const activeThisMonth2 = useSelector((state) => 5);
  // const activeThisMonth3 = useSelector((state) => Math.random());
  // const activeThisMonth4 = useSelector((state) => 6);
  // const activeThisMonth5 = useSelector((state) => Math.random());
  // const activeThisMonth6 = useSelector((state) => 7);
  // console.log({
  //   activeThisMonth,
  //   activeThisMonth2,
  //   activeThisMonth3,
  //   activeThisMonth4,
  //   activeThisMonth5,
  //   activeThisMonth6,
  // });

  return (
    <div className="primary-pane__authors">
      <div className="primary-pane__authors-last-active">
        {activeThisMonthCount} users active this month: {activeThisMonthNames}
      </div>
      <AvatarGroup max={2}>
        <Avatar src={avatar1} />
        <Avatar src={avatar2} />
        <Avatar src={avatar3} />
      </AvatarGroup>
    </div>
  );
});

// ActiveAuthors.whyDidYouRender = {
//   logOnDifferentValues: true,
// };
