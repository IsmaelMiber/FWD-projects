import React from "react";
import { useSelector } from "react-redux";
import Nav from "react-bootstrap/Nav";
import { Link, useLocation } from "react-router-dom";
import User from "../../Components/User";

export default function Navbar() {
  let { pathname } = useLocation();
  pathname = pathname.toLowerCase();
  const user = useSelector((state) => state.users.currentUser);

  if (!user) {
    return null;
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-start",
      }}
    >
      <Nav
        fill
        navbar
        as="ul"
        variant="tabs"
        defaultActiveKey="Home"
        style={{ flex: 1 }}
      >
        <Nav.Item as="li">
          <Nav.Link as="div" active={pathname == "/"}>
            <Link to="/" style={{ display: "block" }}>
              Home
            </Link>
          </Nav.Link>
        </Nav.Item>
        <Nav.Item as="li">
          <Nav.Link as="div" active={pathname == "/add"}>
            <Link to="/add" style={{ display: "block" }}>
              Add Question
            </Link>
          </Nav.Link>
        </Nav.Item>
        <Nav.Item as="li">
          <Nav.Link as="div" active={pathname == "/leaderboard"}>
            <Link to="/leaderboard" style={{ display: "block" }}>
              LeaderBoard
            </Link>
          </Nav.Link>
        </Nav.Item>
      </Nav>
      <User user={user} withLogout />
    </div>
  );
}
