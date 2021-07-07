import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { AppContext } from '../contexts/AppContext';

const formInicial = {
  nombre: '',
  mail: '',
  password: '',
  password2: ''
};

const RegisterForm = () => {
  const [ context, setContext] = useContext(AppContext);
  const [ form, setForm ] = useState(formInicial);
  const history = useHistory();
  
  const { nombre, mail, password, password2 } = form;

  const setLoading = (loading) => {
    setContext({ ...context, loading });
  }

  const register = (form) => {
    setLoading(true);
    fetch(`${process.env.REACT_APP_API_URL}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(form)
    })
    .then(res => res.ok ? res.json() : Promise.reject(res.statusText))
    .then((data) => history.push('/'))
    .catch(err => alert(err))
    .finally(() => setLoading(false));
  };

  const handlerReset = () => {
    setForm(formInicial);
  };

  const handlerChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handlerSubmit = (event) => {
    event.preventDefault();

    if (nombre.trim() === '' || mail.trim() === '' || password.trim() === '') {
      alert('Datos incompletos');
      return;
    }

    if (password !== password2) {
      alert('La contraseñas no coinciden.');
      return;
    }

    register(form);
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
          type="email"
          name="mail"
          placeholder="Ingrese email"
          value={mail}
          onChange={handlerChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Ingrese contraseña"
          value={password}
          onChange={handlerChange}
        />
        <input
          type="password"
          name="password2"
          placeholder="Reingrese contraseña"
          value={password2}
          onChange={handlerChange}
        />
        <input type="submit" value="Registrarse" />
        <input type="reset" value="Limpiar" onClick={handlerReset} />
        <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>
          <input type="button" value="Volver" to="/" />
        </Link>
      </form>
    </div>
  );
}

export default RegisterForm;