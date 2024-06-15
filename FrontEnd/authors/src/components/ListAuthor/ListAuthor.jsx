import { Link } from "react-router-dom";
import style from "./ListAuthor.module.css";
const ListAuthor = ({ listaFavorites,deleteAuthor }) => {
  return (
    <>
      <h1>Lista de Autores</h1>
      <Link to="/create/author">Add an author</Link>
      {listaFavorites.map((author, index) => {
        return (
            <div className={style.listaFavorites} key={index}>
              <h3>{author.name}</h3>
              <div>
                  <Link to={`/update/author/${author._id}`}>Edit</Link>
                  <button onClick={() => deleteAuthor(author._id)}>Delete</button>
              </div>   
          </div>
        );
      })}
    </>
  );
};

export default ListAuthor;
