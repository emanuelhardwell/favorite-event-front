import React, { useEffect, useState } from "react";
import { fetchConToken } from "../../helpers/fetch";
import "./style.css";
import axios from "axios";

export const TrabajadorForm = (props) => {
  /*  */
  const initialState = {
    name: "",
    type_job: "",
    weeks: "",
    honorary: "",
    users: [],
    userSelected: "",
  };

  const [job, setJob] = useState(initialState);
  const { name, type_job, weeks, honorary, users, userSelected } = job;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setJob({ ...job, [name]: value });
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    /*  let funcionGetUserTrbajadores = getUserTrabajadores; */
    props.addOrEditTrabajo(job, userSelected);
    getUserTrabajadores(); /* se llam la funcion */
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

  /* *************************** get USER trabajadores  *************************** */
  const getUserTrabajadores = async () => {
    const token = localStorage.getItem("token") || "";
    const res = await axios.get("http://localhost:4000/api/trabajador", {
      headers: {
        "x-token": token,
      },
    });
    console.log(res.data.trabajo);
    /* console.log(data[0].username); */
    if (res.data.trabajo.length > 0) {
      console.log("Hay datos");
      setJob({
        ...job,
        users: res.data.trabajo,
        userSelected: res.data.trabajo[0]._id,
      });
    } else {
      console.log(" NO Hay datos");
    }
  };

  useEffect(() => {
    getUserTrabajadores();
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
            {/* se agrego este select automatico */}
            <div className="form-group mb-2">
              <select
                name="userSelected"
                className="form-control"
                value={userSelected}
                onChange={handleInputChange}
              >
                {users.map((user) => (
                  <option key={user._id} value={user._id}>
                    {user.nombre}
                  </option>
                ))}
              </select>
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
