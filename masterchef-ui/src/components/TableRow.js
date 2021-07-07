import React from 'react';

const TableRow = ({cocinero, handlerDelete, handlerUpdate}) => {
  const { id, nombre, especialidad, capitulos } = cocinero;

  return (
    <tr>
      <td>{nombre}</td>
      <td>{especialidad}</td>
      <td>{capitulos}</td>
      <td>
        <button onClick={() => handlerUpdate(cocinero)}>Editar</button>
        <button onClick={() => handlerDelete(id)}>Eliminar</button>
      </td>
    </tr>
  );
}

export default TableRow;