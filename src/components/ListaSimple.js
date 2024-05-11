import React, { useState } from "react";
import ListaConsumos from "./ListaConsumos";

const ListaSimple = ({ consumos, comidas, state }) => {
  const [mostrarDetalle, setMostrarDetalle] = useState(false);
  const [efectivo, setEfectivo] = useState(0);

  const verDetalle = () => {
    setMostrarDetalle(true);
  };

  const noVerDetalle = () => {
    setMostrarDetalle(false);
  };

  // Función para calcular el importe total acumulado
  const calcularImporteTotal = () => {
    return consumos.reduce((acc, usuario) => acc + usuario.importePp, 0);
  };

  // Función para calcular el 10% del importe total acumulado
  const calcular = () => {
    return state.comidas.map((usuario) => {
      const descuentoPorcentual = usuario.importePp * 0.1;
      const importeDescuento = usuario.importePp - descuentoPorcentual;
      return { ...usuario, importeDescuento };
    });
  };

  return (
    <div>
      <h2 className="verde">Lista de Consumos</h2>
      <table className="styled-table">
        <thead>
          <tr>
            <th>Nº</th>
            <th>Nombre</th>
            <th>Importe</th>
            <th>Impo/desc</th>
          </tr>
        </thead>
        <tbody>
          {calcular().map((usuario, index) => (
            <tr key={usuario.id}>
              <td>{index + 1}.- </td>
              <td>{usuario.nombre}</td>
              <td>$ {usuario.importePp}</td>
              <td>$ {usuario.importeDescuento}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colspan="4">
              Importe Total Acumulado: $ {calcularImporteTotal()}
            </td>
          </tr>
        </tfoot>
      </table>

      <div>
        <button className="btn-regular" onClick={verDetalle}>
          Mostrar detalle
        </button>
      </div>
      <div>
        {mostrarDetalle && (
          <div className="styled-table">
            <ListaConsumos calcular={calcular} consumos={consumos} />

            <button className="btn-regular" onClick={noVerDetalle}>
              Cerrar detalle
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ListaSimple;
