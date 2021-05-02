import React from "react";
import { Store } from "../providers/Store";

export default function createConnector(Component) {
  return function Connector(props) {
    return (
      <Store.Consumer>
        {(value) => <Component state={value} {...props} />}
      </Store.Consumer>
    );
  };
}
