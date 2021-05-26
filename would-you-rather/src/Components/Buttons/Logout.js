import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Button from "react-bootstrap/Button";
import { logout } from "../../Redux/Actions";

export default function LogoutButton(props) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users.currentUser);

  if (!user) {
    return null;
  }

  function onClick(event) {
    event.preventDefault();
    dispatch(logout);
  }

  return <Button onClick={onClick}>Logout</Button>;
}
