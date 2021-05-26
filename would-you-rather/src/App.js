import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import NavigationProvider from "./Navigation";
import { Provider } from "react-redux";
import store from "./Redux/store";
import Root from "./Root";

function App() {
  return (
    <Provider store={store}>
      <NavigationProvider />
    </Provider>
  );
}

export default App;
