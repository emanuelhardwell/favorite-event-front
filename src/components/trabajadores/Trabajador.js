import moment from "moment";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { fetchConToken } from "../../helpers/fetch";
import { Navbar } from "../ui/Navbar";
import { format } from "timeago.js";
import { toast } from "react-toastify";
import { TrabajadorForm } from "./TrabajadorForm";

export const Trabajador = (props) => {
  /*  */
  const initialState = {
    end: "",
    notes: "",
    start: "",
    title: "",
    user: "",
    _id: "",
  };
  const [evento, setEvento] = useState(initialState);
  const { title, notes, start, end, user, _id } = evento;

  const [jobs, setJobs] = useState([]);

  const [currentId, setCurrentId] = useState("");

  const cadena = props.location.pathname;
  const cadenaPro = cadena.slice(8);
  console.log(cadenaPro);

  /* *************************** get evento especifico *************************** */
  const getEvent = async () => {
    const res = await fetchConToken(`event/${cadenaPro}`, {}, "GET");
    const body = await res.json();

    if (body.ok) {
      const data = body.events;
      const event = {
        ...data,
        start: moment(data.start).format("YYYY-MM-DD[T]HH:mm:ss"),
        end: moment(data.end).format("YYYY-MM-DD[T]HH:mm:ss"),
      };
      setEvento({ ...body.events });
    } else {
      console.log("No existe ese id de evento");
    }
  };

  /* *************************** add or edit trabajo *************************** */
  const addOrEditTrabajo = async (job) => {
    if (currentId === "") {
      const jobMax = {
        ...job,
        event: _id,
      };

      const res = await fetchConToken("job", jobMax, "POST");
      const body = await res.json();

      if (body.ok) {
        toast("Job save Successfully", {
          type: "success",
        });
        getTrabajo();
      } else {
        toast("Job Error", {
          type: "error",
        });
      }
    } else {
      const jobMax = {
        ...job,
        event: _id,
      };
      const res = await fetchConToken(`job/${job._id}`, jobMax, "PUT");
      const body = await res.json();

      if (body.ok) {
        toast("Job update Successfully", {
          type: "success",
        });
        setCurrentId("");
        getTrabajo();
      } else {
        toast("Job update Error", {
          type: "error",
        });
      }
    }
  };

  /* *************************** get trabajadores *************************** */
  const getTrabajo = async () => {
    /* const res = await fetchConToken("job", cadenaPro, "GET");
    const body = await res.json(); */

    const token = localStorage.getItem("token") || "";
    const res = await axios.get("http://localhost:4000/api/job", {
      params: {
        id: cadenaPro,
      },
      headers: {
        "x-token": token,
        idEventito: cadenaPro,
      },
    });

    console.log(res.statusText);
    if ((res.statusText = "si")) {
      setJobs(res.data.jobs);
    } else {
      console.log("No se pudo traer los trabajos");
    }
  };

  /* *************************** delete trabajadores *************************** */
  const deleteTrabajo = async (id) => {
    /*  */
    const res = await fetchConToken(`job/${id}`, {}, "DELETE");
    const body = await res.json();

    if (body.ok) {
      toast("Job delete Successfully", {
        type: "success",
      });
      getTrabajo();
    } else {
      toast("Job delete error", {
        type: "error",
      });
    }
  };

  useEffect(() => {
    getEvent();
    getTrabajo();
  }, []);

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="row bg-primary my-2 py-3">
          <div className="col-md-12">
            <h5> Proyecto: {title}</h5>
            <p> Ubicacion: {notes}</p>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4">
            <TrabajadorForm {...{ addOrEditTrabajo, currentId }} />
          </div>
          <div className="col-md-6">
            <h4>Listado de trabajadores</h4>
            <table className="table">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>oficio</th>
                  <th>semanas</th>
                  <th>honorarios</th>
                  <th>pago total</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {jobs.map((job) => (
                  <tr key={job._id}>
                    <td>{job.name}</td>
                    <td>{job.type_job}</td>
                    <td>{job.weeks}</td>
                    <td>{job.honorary}</td>
                    <td>{job.weeks * job.honorary}</td>
                    <td>
                      <button
                        className="btn btn-success mr-1"
                        onClick={() => setCurrentId(job._id)}
                      >
                        <i className="far fa-edit"></i>
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => deleteTrabajo(job._id)}
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
    </>
  );
};
