import React from "react";
import Card from "react-bootstrap/Card";
import LogoutButton from "../Buttons/Logout";

export default function User({ user, index, withLogout = false, children }) {
  return (
    <Card>
      <div className="d-flex flex-row align-items-center justify-content-center">
        <Card.Img
          variant="bottom"
          src={user.avatarURL}
          style={{ width: 50, height: 50 }}
        />
        <Card.Body>
          <Card.Title className="text-center">{user.name}</Card.Title>
          {index != null ? (
            <Card.Text className="text-center">Rank {index + 1}</Card.Text>
          ) : null}
          {withLogout ? <LogoutButton /> : null}
        </Card.Body>
      </div>
      {children}
    </Card>
  );
}
