import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";

const UpdateAuthor = ({ updateAuthor }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/author/${id}`)
      .then((response) => {
        setName(response.data.name);
      })
      .catch((error) => {
        if (error.response && error.response.status === 404) {
          setError("Lo sentimos, pero no pudimos encontrar el autor que estás buscando. ¿Deseas agregar este autor a nuestra base de datos?");
        } else {
          console.log(error); // Manejar otros tipos de errores si es necesario
          setError("Error al obtener el autor.");
        }
      });
  }, [id]);

  const procesaActualizarAuthor = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:8080/api/update/author/${id}`, { name }, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        updateAuthor(response.data);
        setName("");
        navigate("/");
      })
      .catch((error) => {
        if (error.response && error.response.status === 404) {
          setError("Lo sentimos, pero no pudimos encontrar el autor que estás buscando. ¿Deseas agregar este autor a nuestra base de datos?");
        } else {
          setError(error.response.data.mensaje);
        }
      });
  };

  const cancel = (e) => {
    e.preventDefault();
    navigate("/");
  };

  return (
    <div>
      <h1>Edit this author</h1>
      <form onSubmit={procesaActualizarAuthor}>
        <div>
          <label>Name: </label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <button type="submit">Submit</button>
          <button type="button" onClick={cancel}>Cancel</button>
        </div>
      </form>
      {error && (
        <div>
          <p>{error}</p>
          {error.includes("¿Deseas agregar este autor a nuestra base de datos?") && (
            <Link to="/create/author">Agregar autor</Link>
          )}
        </div>
      )}
    </div>
  );
};

export default UpdateAuthor;
