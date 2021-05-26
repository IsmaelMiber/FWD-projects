import React, { useEffect, useState } from "react";
import { _getUsers } from "../../Database/helpers";
import DropdownButton from "react-bootstrap/DropdownButton";
import DropdownItem from "react-bootstrap/DropdownItem";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

import { useSelector, useDispatch } from "react-redux";
import TYPES from "../../Redux/TYPES";
import { useHistory, useLocation } from "react-router-dom";

export default function Login(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const { from } = location.state || {};

  const users = useSelector((state) => {
    const { users } = state.users;

    return users ? Object.values(users.byId) : [];
  });
  const [user, setSelectedUser] = useState(null);

  function onSelect(eventKey, event) {
    const user = users.find((user) => eventKey == user.id);
    setSelectedUser(user);
  }

  function onSignIn() {
    if (user) {
      dispatch({ type: TYPES.CURRENT_USER, payload: user });
      if (from) {
        history.replace(from);
      } else {
        history.replace("/");
      }
    } else {
      alert("please, select user first");
    }
  }

  const title = user?.name || "Select User";

  return (
    <Container className="d-flex flex-column justify-content-center align-items-center">
      <h1>Welcome to the Would Your Rather APP</h1>
      <DropdownButton
        renderMenuOnMount
        id="users-dropdown-menu"
        title={title}
        onSelect={onSelect}
      >
        {users.map(({ id, name, avatarURL }) => (
          <DropdownItem key={id} eventKey={id} active={user?.id == id}>
            <img src={avatarURL} style={{ width: 30, height: 30 }} />
            <span className="ml-2">{name}</span>
          </DropdownItem>
        ))}
      </DropdownButton>
      <br />
      <Button onClick={onSignIn}>Sign In</Button>
    </Container>
  );
}
