import React, { useEffect, useState } from "react";
import { fetchConToken } from "../../helpers/fetch";
import "./style.css";

export const TrabajadorForm = (props) => {
  /*  */
  const initialState = {
    name: "",
    type_job: "",
    weeks: "",
    honorary: "",
  };

  const [job, setJob] = useState(initialState);
  const { name, type_job, weeks, honorary } = job;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setJob({ ...job, [name]: value });
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    props.addOrEditTrabajo(job);
    setJob({ ...initialState });
  };

  /* *************************** get trabajadores by id *************************** */
  const getTrabajoById = async (id) => {
    const res = await fetchConToken(`job/${id}`, {}, "GET");
    const body = await res.json();

    if (body.ok) {
      console.log(body.jobId);
      setJob({ ...body.jobId });
    } else {
      console.log("no se consiguio trabajo por id");
    }
  };

  useEffect(() => {
    if (props.currentId === "") {
      console.log("id NO seleccionado");
      setJob({ ...initialState });
    } else {
      console.log("id SI seleccionado");
      getTrabajoById(props.currentId);
    }
  }, [props.currentId]);

  /*  */
  return (
    <>
      <div className="card">
        <div className="card-body">
          <h4>
            {props.currentId === ""
              ? "Agregar trabajador"
              : "Actualizar trabajador"}
          </h4>
          <hr />
          <form onSubmit={handleSubmitForm}>
            <div className="form-group">
              <input
                type="text"
                name="name"
                placeholder="Nombre"
                className="form-control"
                value={name}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <select
                className="custom-select"
                name="type_job"
                value={type_job}
                onChange={handleInputChange}
              >
                <option value="plomero">Plomero</option>
                <option value="albanil">Albanil</option>
                <option value="limpieza">limpieza</option>
              </select>
              <label htmlFor="type_job">Tipo de trabajo:</label>
            </div>
            <div className="form-group">
              <input
                type="number"
                name="weeks"
                placeholder="Semanas"
                className="form-control"
                value={weeks}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <input
                type="number"
                name="honorary"
                placeholder="honorarios"
                className="form-control"
                value={honorary}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <button className="btn btn-primary btn-block">
                {props.currentId === ""
                  ? "Guardar trabajador"
                  : "Actualizar trabajador"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
