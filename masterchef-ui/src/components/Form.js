import React, { useEffect, useState } from 'react';

const formInicial = {
  id: null,
  nombre: '',
  especialidad: '',
  capitulos: 0
};

const Form = ({altaCocinero, modificarCocinero, editado, setEditado}) => {
  const [ form, setForm ] = useState(formInicial);
  
  const { nombre, especialidad, capitulos } = form;

  useEffect(() => {
    editado ? setForm(editado) : setForm(formInicial);
  }, [editado]);

  const handlerReset = () => {
    setForm(formInicial);
    setEditado(null);
  };

  const handlerChange = (event) => {
    let value = event.target.value;
    if (event.target.type === 'number') {
      value = Number(value);
    }
    setForm({ ...form, [event.target.name]: value });
  };

  const handlerSubmit = (event) => {
    event.preventDefault();

    if (nombre.trim() === '' || especialidad.trim() === '') {
      alert('Datos incompletos');
      return;
    }

    editado ? modificarCocinero(form) : altaCocinero(form);
    
    handlerReset();
  };

  return (
    <div className="container-form">
      <form onSubmit={handlerSubmit}>
        <label>
          Ingrese nombre:
          <input
            type="text"
            name="nombre"
            placeholder="Juan"
            value={nombre}
            onChange={handlerChange}
          />
        </label>
        <br />
        <label>
          Ingrese especialidad:
          <input
            type="text"
            name="especialidad"
            placeholder="Asado"
            value={especialidad}
            onChange={handlerChange}
          />
        </label>
        <br />
        <label>
          Ingrese apariciones en capitulos:
          <input
            type="number"
            name="capitulos"
            min="1"
            max="100"
            value={capitulos}
            onChange={handlerChange}
          />
        </label>
        <br />
        <input type="submit" value={(editado ? 'Modificar' : 'Alta') + ' cocinero'} />
        <input type="reset" value="Limpiar" onClick={handlerReset} />
      </form>
    </div>
  );
}

export default Form;