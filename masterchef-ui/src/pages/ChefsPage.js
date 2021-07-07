import React, { useContext, useEffect, useState } from 'react';
import Form from '../components/Form';
import Loader from '../components/Loader';
import Table from '../components/Table';
import { AppContext } from '../contexts/AppContext';
import { Link } from 'react-router-dom';

const ChefsPage = () => {
  const [ context, setContext ] = useContext(AppContext);
  const [ cocineros, setCocineros ] = useState([]);
  const [ editado, setEditado ] = useState(null);
  const [ loading, setLoading ] = useState(false);

  const { token } = context;

  const logout = () => {
    setContext({ ...context, token: null });
    localStorage.removeItem('token');
  };

  useEffect(() => {
    setLoading(true);

    fetch(`${process.env.REACT_APP_API_URL}/chefs`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(res => res.ok ? res.json() : Promise.reject(res.statusText))
    .then(data => setCocineros(data))
    .catch(err => console.log(err))
    .finally(() => setLoading(false));
  }, []);

  const altaCocinero = (nuevoCocinero) => {
    setLoading(true);

    fetch(`${process.env.REACT_APP_API_URL}/chefs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(nuevoCocinero)
    })
    .then(res => res.ok ? res.json() : Promise.reject(res.statusText))
    .then((data) => setCocineros([ ...cocineros, data ]))
    .catch(err => console.log(err))
    .finally(() => setLoading(false));
  };

  const modificarCocinero = (cocinero) => {
    setLoading(true);

    fetch(`${process.env.REACT_APP_API_URL}/chefs/${cocinero.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(cocinero)
    })
    .then(res => res.ok ? res.json() : Promise.reject(res.statusText))
    .then((data) => {
      setCocineros(cocineros.map(c => (c.id === data.id) ? data : c))
    })
    .catch(err => console.log(err))
    .finally(() => setLoading(false));
  };

  const bajaCocinero = (id) => {
    setLoading(true);

    fetch(`${process.env.REACT_APP_API_URL}/chefs/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(res => res.ok ? res : Promise.reject(res.statusText))
    .then(() => setCocineros(cocineros.filter(c => c.id !== id)))
    .catch(err => console.log(err))
    .finally(() => setLoading(false));
  };

  return (
    <>
      <Form
        altaCocinero={altaCocinero}
        modificarCocinero={modificarCocinero}
        editado={editado}
        setEditado={setEditado}
        loading={loading}
      />
      {
        loading && <Loader /> 
      }
      {
        !loading &&
        <>
          <Table
            data={cocineros}
            bajaCocinero={bajaCocinero}
            setEditado={setEditado}
          />
          <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }} onClick={logout}>
            Cerrar sesión
          </Link>
        </>
      }
    </>
  );
};

export default ChefsPage;