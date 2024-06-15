import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import ListAuthor from '../ListAuthor/ListAuthor';
import { Routes, Route, Link } from 'react-router-dom';
import AddAuthor from '../AddAuthor/AddAuthor';
import UpdateAuthor from '../UpdateAuthor/UpdateAuthor';
import Login from '../Login/Login';
import RegisterUser from '../RegisterUser/RegisterUser';

function App() {
  const [listaFavorites, setListaFavorites] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/api/authors')
    .then(response => {
      setListaFavorites(response.data);
      console.log(response);
    })
    .catch(error => {
      console.log(error);
    })
  },[]);

  const addAuthor = (newAuthor) => {
    setListaFavorites([...listaFavorites, newAuthor]);
  }
  const deleteAuthor = (id) => {
    const indiceAutor = listaFavorites.findIndex((author) => author._id === id);
    const listaActualizada = [...listaFavorites];
    listaActualizada.splice(indiceAutor, 1);
    setListaFavorites(listaActualizada);
  }
  const updateAuthor = (authorActualizado) => {
    const indiceAActualizar = listaFavorites.findIndex((author) => author._id === authorActualizado._id);
    const listaActualizada = [...listaFavorites];
    listaActualizada[indiceAActualizar] = authorActualizado;
    setListaFavorites(listaActualizada);
  }
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={ <Login />}/>
      </Routes>
      <p>No tienes una cuenta?</p>
      <Link to="/user/register">Registrate</Link>
      <Routes>
        <Route path="/list" element={ <ListAuthor listaFavorites={listaFavorites} deleteAuthor={deleteAuthor} />} />
        <Route path="/create/author" element={ <AddAuthor addAuthor={addAuthor}/>} />
        <Route path="/update/author/:id" element={ <UpdateAuthor updateAuthor={updateAuthor} />} />
        <Route path="/user/register" element={ <RegisterUser />}/>
      </Routes>
    </div>
  );
}

export default App;
