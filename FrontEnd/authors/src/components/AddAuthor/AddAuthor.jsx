import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
const AddAuthor = ({ addAuthor }) => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const procesaFormAuthor = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8080/api/create/authors", { name })
      .then((response) => {
        console.log(response);
        addAuthor(response.data);
        setName("");
        setError("");
        navigate("/");
      })
      .catch((error) => {
        console.log(error.response.data.mensaje);
        setError(error.response.data.mensaje);
      });
  };

  const cancel = (e) => {
    e.preventDefault();
    navigate("/");
  };

  return (
    <div>
      <h1>Add a new author</h1>
      <Link to="/">Home</Link>
      <form onSubmit={procesaFormAuthor}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <span>{error}</span>
        <button type="submit">Submit</button>
        <button type="button" onClick={cancel}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default AddAuthor;
