import React from "react";
import { useSelector } from "react-redux";
import User from "../../Components/User";

export default function LeaderBoard() {
  const users = useSelector((state) => state.users.users);
  const usersData = Object.values(users.byId);
  const sortedUsers = usersData.sort((a, b) => b.sum - a.sum);

  return sortedUsers.map((user, index) => (
    <div>
      <User key={`user_${index}`} user={user} index={index}>
        <p>Questions: {user.questionsCount}</p>
        <p>Answeres: {user.answeresCount}</p>
      </User>
    </div>
  ));
}
