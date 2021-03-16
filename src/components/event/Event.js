import React, { useEffect, useState } from "react";
import { Navbar } from "../ui/Navbar";
import { format } from "timeago.js";
import { useSelector } from "react-redux";
import { EventForm } from "./EventForm";
import { fetchConToken } from "../../helpers/fetch";
import { covertDates } from "../../helpers/convertDates";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

export const Event = () => {
  /*  */
  const { uid } = useSelector((state) => state.auth);
  const [events, setEvents] = useState([]);

  const [currentId, setCurrentId] = useState("");

  const addOrEditDate = async (evento) => {
    /* console.log(evento); */
    if (currentId === "") {
      try {
        const res = await fetchConToken("event", evento, "POST");
        const body = await res.json();

        if (body.ok) {
          toast("Event save Successfully", {
            type: "success",
            autoClose: 2000,
          });
          /* console.log("Event Save Success"); */
          getEvents();
        } else {
          console.log("ERRO NO SE GUARDO");
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      /* console.log(evento._id); */
      try {
        const res = await fetchConToken(`event/${evento._id}`, evento, "PUT");
        const body = await res.json();
        if (body.ok) {
          toast("Event update Successfully", {
            type: "info",
            autoClose: 2000,
          });
          setCurrentId("");
          /* console.log("Event Save Success"); */
          getEvents();
        } else {
          console.log("ERRO NO SE GUARDO");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const getEvents = async () => {
    try {
      const res = await fetchConToken("event");
      const body = await res.json();
      const event = covertDates(body.events);
      /*  console.log(event); */
      setEvents(event);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteEvent = async (id) => {
    try {
      const res = await fetchConToken(`event/${id}`, {}, "DELETE");
      const body = await res.json();

      if (body.ok) {
        toast("Event delete Successfully", { type: "error", autoClose: 2000 });
        /* console.log("borrado"); */
        getEvents();
      } else {
        Swal.fire("Error", body.msg, "error");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getEvents();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <EventForm {...{ addOrEditDate, currentId }} />
          </div>
          {/* tabla de eventos --- */}
          <div className="col-md-8">
            <h4>listado de eventos</h4>
            <table className="table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Nota</th>
                  <th>Fecha inicial</th>
                  <th>Fecha final</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {events.map((event) => (
                  <tr key={event._id}>
                    <td>{event.title}</td>
                    <td>{event.notes}</td>
                    <td>{format(event.start)}</td>
                    <td>{format(event.end)}</td>
                    <td>
                      <button
                        className="btn btn-success mr-1"
                        onClick={() => setCurrentId(event._id)}
                      >
                        <i className="far fa-edit"></i>
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => deleteEvent(event._id)}
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
