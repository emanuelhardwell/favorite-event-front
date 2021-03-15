/*  */

import Swal from "sweetalert2";
import { fetchConToken, fetchSinToken } from "../helpers/fetch";
import { types } from "../types/types";
import { eventLogout } from "./events";

/* -------------------------------- start Login -------------------------------- */
export const startLogin = (email, password) => {
  return async (dispath) => {
    const res = await fetchSinToken("auth", { email, password }, "POST");
    const body = await res.json();

    if (body.ok) {
      localStorage.setItem("token", body.token);
      localStorage.setItem("token-init-date", new Date().getTime());

      dispath(
        login({
          uid: body.uid,
          name: body.name,
        })
      );
    } else {
      Swal.fire("Error", body.msg, "error");
    }
  };
};

/* -------------------------------- start Register -------------------------------- */
export const startRegister = (name, email, password) => {
  return async (dispath) => {
    const res = await fetchSinToken(
      "auth/new",
      { name, email, password },
      "POST"
    );
    const body = await res.json();

    if (body.ok) {
      localStorage.setItem("token", body.token);
      localStorage.setItem("token-init-date", new Date().getTime());

      dispath(
        login({
          uid: body.uid,
          name: body.name,
        })
      );
    } else {
      Swal.fire("Error", body.msg, "error");
    }
  };
};

/* -------------------------------- start Checking  -------------------------------- */
export const startChecking = () => {
  return async (dispath) => {
    const res = await fetchConToken("auth/renew");
    const body = await res.json();
    /* console.log(body);
     */
    if (body.ok) {
      localStorage.setItem("token", body.token);
      localStorage.setItem("token-init-date", new Date().getTime());

      dispath(
        login({
          uid: body.uid,
          name: body.name,
        })
      );
    } else {
      /* Swal.fire("Error", body.msg, "error"); */
      dispath(checkingFinish());
    }
  };
};

/* -------------------------------- start Logout  -------------------------------- */
export const startLogout = () => {
  return (dispath) => {
    localStorage.clear();
    dispath(eventLogout());
    dispath(logout());
  };
};

const logout = () => ({
  type: types.authLogout,
});

const checkingFinish = () => ({
  type: types.authCheckingFinish,
});

const login = (user) => ({
  type: types.authLogin,
  payload: user,
});
