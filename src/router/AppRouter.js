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
import { Event } from "../components/event/Event";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Tarea } from "../components/tarea/Tarea";
import { Trabajador } from "../components/trabajadores/Trabajador";

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
            <PrivateRoute
              exact
              path="/tarea"
              component={Tarea}
              isAuthenticated={!!uid}
            />
            <PrivateRoute
              path="/evento/:id"
              component={Trabajador}
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
