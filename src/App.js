import Start from "./modules/Start";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import ProtectedRoute from "./shared/components/ProtectedRoute";
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
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/signup">
            <Signup />
          </Route>
          <ProtectedRoute exact path="/disease" component={Disease} />
          <ProtectedRoute exact path="/dashboard" component={Dashboard} />
          <ProtectedRoute exact path="/result" component={Result} />
          <ProtectedRoute exact path="/news" component={News} />
          <ProtectedRoute exact path="/notifications" component={Notifications} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
