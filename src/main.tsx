import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import Router from "@pages/Router.tsx";
import { store } from "./store";

ReactDOM.render(
  <Provider store={store}>
    <Router />
  </Provider>,
  document.getElementById("root")
);
