import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import { startChecking } from "../actions/auth";
import { LoginScreen } from "../components/auth/LoginScreen";
import { CalendarScreen } from "../components/calendar/CalendarScreen";
import { Event } from "../components/event/Event";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const AppRouter = () => {
  const dispatch = useDispatch();

  const { checking, uid } = useSelector((state) => state.auth);
  useEffect(() => {
    dispatch(startChecking());
  }, [dispatch]);

  if (checking) {
    return <h5>Loading .....</h5>;
  }

  return (
    <div>
      <Router>
        <div>
          <Switch>
            <PublicRoute
              exact
              path="/login"
              component={LoginScreen}
              isAuthenticated={!!uid}
            />
            <PrivateRoute
              exact
              path="/"
              component={Event}
              isAuthenticated={!!uid}
            />
            <Redirect to="/" />
          </Switch>
        </div>
      </Router>
      <ToastContainer></ToastContainer>
    </div>
  );
};
