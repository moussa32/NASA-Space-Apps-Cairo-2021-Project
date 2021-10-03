import Start from "./modules/Start";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import Login from "./modules/Login";
import Disease from "./modules/Disease";
import Signup from "./modules/Signup";
import Dashboard from "./modules/Dashboard";
import Notifications from "./modules/Notifications";
import Result from "./modules/Result";
import "./App.css";
import News from "./modules/News";

function App() {
  return (
    <div className="app">
      <Router>
        <Switch>
          <Route exact path="/">
            <Start />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/signup">
            <Signup />
          </Route>
          <Route path="/disease">
            <Disease />
          </Route>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
          <Route path="/result">
            <Result />
          </Route>
          <Route path="/news">
            <News />
          </Route>
          <Route path="/notifications">
            <Notifications />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
