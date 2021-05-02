import React from "react";
import StoreProvider from "./providers/Store";

export default class App extends React.Component {
  render() {
    return <StoreProvider />;
  }
}
