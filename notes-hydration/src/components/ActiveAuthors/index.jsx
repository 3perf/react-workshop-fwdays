import { Avatar, AvatarGroup } from "@mui/material";
import { memo } from "react";
import { useSelector } from "react-redux";

function ActiveAuthors() {
  const activeThisMonth = useSelector((state) =>
    state.users.filter((i) => i.lastActiveDate.includes("2021-09"))
  );

  return (
    <div className="primary-pane__authors">
      <div className="primary-pane__authors-last-active">
        {activeThisMonth.length} users active this month:{" "}
        {activeThisMonth.map((i) => i.name).join(", ")}
      </div>
      <AvatarGroup max={2}>
        <Avatar src="/avatar1.jpg" />
        <Avatar src="/avatar2.jpg" />
        <Avatar src="/avatar3.jpg" />
      </AvatarGroup>
    </div>
  );
}

export default memo(ActiveAuthors);
