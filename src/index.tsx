import React from "react";
import ReactDOM from "react-dom";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import "antd/dist/antd.css";
import "./styles.css";
import AuthPage from "./components/auth";
import "./styles.css";
import { Provider } from "react-redux";
import { store } from "./app/store";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={AuthPage} />
      </Switch>
    </Router>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(
  <Provider store={store}>
    {" "}
    <App />
  </Provider>,
  rootElement
);
