import React from 'react';
import Loader from './Loader';
import TableRow from './TableRow';

const Table = ({data, bajaCocinero, setEditado, loading}) => {
  return (
    <div className="container-table">
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Especialidad</th>
            <th>Capitulos</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {
            loading && <Loader className="container-loader" />
          }
          {
            !loading && data &&
            (data.length === 0) ? (
              <tr><td colSpan="4">Sin resultados</td></tr>
            ) : (
              data.map((item) => 
                <TableRow
                  key={item.id}
                  cocinero={item}
                  handlerUpdate={setEditado}
                  handlerDelete={bajaCocinero}
                />
              )
            )
          }
        </tbody>
      </table>
    </div>
  );
}

export default Table;