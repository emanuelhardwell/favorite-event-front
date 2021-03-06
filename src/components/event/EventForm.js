import moment from "moment";
import React, { useEffect, useState } from "react";
import { covertDates } from "../../helpers/convertDates";
import { fetchConToken } from "../../helpers/fetch";

export const EventForm = (props) => {
  const initialState = {
    title: "",
    notes: "",
    start: "",
    end: "",
  };

  const [events, setEvents] = useState(initialState);

  const { title, notes, start, end } = events;

  const getEventById = async (id) => {
    try {
      const res = await fetchConToken(`event/${id}`, {}, "GET");
      const body = await res.json();
      /* console.log(body.events); */

      if (body.ok) {
        const data = body.events;
        const event = {
          ...data,
          start: moment(data.start).format("YYYY-MM-DD[T]HH:mm:ss"),
          end: moment(data.end).format("YYYY-MM-DD[T]HH:mm:ss"),
        };
        /*  console.log(event); */
        setEvents({ ...event });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (props.currentId === "") {
      console.log("id no selected");
      setEvents({ ...initialState });
    } else {
      console.log("id selected");
      getEventById(props.currentId);
    }
  }, [props.currentId]);

  const handleSubmitForm = (e) => {
    e.preventDefault();
    /* console.log(events); */
    props.addOrEditDate(events);
    setEvents({ ...initialState });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEvents({ ...events, [name]: value });
  };

  const cancelar = (e) => {
    props.cancelarID();
  };

  return (
    <>
      <div className="card">
        <div className="card-body">
          <h5>{props.currentId === "" ? "Create Event" : "Update Event"}</h5>
          <hr />
          <form onSubmit={handleSubmitForm}>
            <div className="form-group">
              <label htmlFor="start">Fecha inicio</label>
              <input
                type="datetime-local"
                name="start"
                className="form-control"
                value={start}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="end">Fecha fin </label>
              <input
                type="datetime-local"
                name="end"
                className="form-control"
                value={end}
                onChange={handleInputChange}
              />
            </div>
            <hr />
            <div className="form-group">
              <label>Titulo y notas</label>
              <input
                type="text"
                className="form-control"
                placeholder="T??tulo del evento"
                name="title"
                autoComplete="off"
                value={title}
                onChange={handleInputChange}
              />
              <small id="emailHelp" className="form-text text-muted">
                Una descripci??n corta
              </small>
            </div>
            <div className="form-group">
              <textarea
                type="text"
                className="form-control"
                placeholder="Notas"
                rows="2"
                name="notes"
                value={notes}
                onChange={handleInputChange}
              ></textarea>
              <small id="emailHelp" className="form-text text-muted">
                Informaci??n adicional
              </small>
            </div>
            <button type="submit" className="btn btn-outline-primary btn-block">
              <i className="far fa-save"></i>
              <span> {props.currentId === "" ? "Create" : "Update"}</span>
            </button>
          </form>
          <button className="btn btn-danger mt-2 btn-block" onClick={cancelar}>
            Cancelar
          </button>
        </div>
      </div>
    </>
  );
};
