import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { AppContext } from '../contexts/AppContext';
import { Link } from 'react-router-dom';

const formInicial = {
  nombre: '',
  password: ''
};

const LoginForm = () => {
  const [ context, setContext ] = useContext(AppContext);
  const [ form, setForm ] = useState(formInicial);
  const history = useHistory();
  
  const { nombre, password } = form;
  
  const setLoading = (loading) => {
    setContext({ ...context, loading });
  }

  const login = (form) => {
    setLoading(true);
    fetch(`${process.env.REACT_APP_API_URL}/users/auth`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(form)
    })
    .then(res => res.ok ? res.json() : Promise.reject(res.statusText))
    .then((data) => {
      localStorage.setItem('token', data.token);
      setContext({ ...context, loading: false, token: data.token });
      history.push('/');
    })
    .catch(err => {
      setLoading(false);
      alert(err);
    })
  };

  const handlerReset = () => {
    setForm(formInicial);
  };

  const handlerChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handlerSubmit = (event) => {
    event.preventDefault();

    if (nombre.trim() === '' || password.trim() === '') {
      alert('Datos incompletos');
      return;
    }

    login(form);
  };

  return (
    <div className="container-form">
      <form onSubmit={handlerSubmit}>
        <input
          type="text"
          name="nombre"
          placeholder="Ingrese nombre"
          value={nombre}
          onChange={handlerChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Ingrese contraseña"
          value={password}
          onChange={handlerChange}
        />
        <input type="submit" value="Iniciar sesión" />
        <input type="reset" value="Limpiar" onClick={handlerReset} />
        <Link to="/register" style={{ color: 'inherit', textDecoration: 'none' }}>
          <input type="button" value="Registrarse" to="/register" />
        </Link>
      </form>
    </div>
  );
}

export default LoginForm;