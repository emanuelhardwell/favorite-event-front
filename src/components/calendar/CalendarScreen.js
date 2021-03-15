import React, { useEffect, useState } from "react";
import { Navbar } from "../ui/Navbar";

import { useSelector } from "react-redux";

export const CalendarScreen = () => {
  /*  */
  const { uid } = useSelector((state) => state.auth);

  return (
    <div className="calendar-screen">
      <Navbar />
      <h1>calendar screen</h1>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quaerat, fuga!</p>
    </div>
  );
};
