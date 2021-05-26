import { useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import {
  Home,
  Login,
  QuestionDetails,
  QuestionAddForm,
  LeaderBoard,
  NotFound,
} from "../Screens";
import Root from "../Root";

export default function NavigationProvider(props) {
  return (
    <Router>
      <Root>
        <Switch>
          <PrivateRoute exact path="/">
            <Home />
          </PrivateRoute>
          <Route exact path="/login">
            <Login />
          </Route>
          <PrivateRoute exact path="/questions/:id">
            <QuestionDetails />
          </PrivateRoute>
          <PrivateRoute exact path="/add">
            <QuestionAddForm />
          </PrivateRoute>
          <PrivateRoute exact path="/leaderboard">
            <LeaderBoard />
          </PrivateRoute>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </Root>
    </Router>
  );
}

function PrivateRoute(props) {
  const { children, ...resetProps } = props;
  const user = useSelector((state) => state.users.currentUser);

  const isAuth = !!user;

  return (
    <Route
      {...resetProps}
      render={(props) =>
        isAuth ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
}
