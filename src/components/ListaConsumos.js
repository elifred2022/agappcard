import React from "react";
import { useState } from "react";
import ListaConsumos from "./ListaConsumos";

const ListaSimple = ({ consumos, calcular }) => {
  const [mostrarDetalle, setMostrarDetalle] = useState(false);
  const [mostrarDetalleCu, setMostrarDetalleCu] = useState(false);
  const [detalleConsumos, setDetalleConsumos] = useState([]);
  const [detalleConsumosCu, setDetalleConsumosCu] = useState([]);
  const [importeTotal, setImporteTotal] = useState(0);

  const verDetalle = (consumos) => {
    setDetalleConsumos(consumos);
    setMostrarDetalle(true);
  };

  const verDetalleCu = (consumos) => {
    setDetalleConsumosCu(consumos);
    setMostrarDetalleCu(true);
  };

  const cerrarDetalle = () => {
    setMostrarDetalle(false);
    setMostrarDetalleCu(true);
  };

  // Función para calcular el importe total acumulado
  const calcularImporteTotal = () => {
    return consumos.reduce((acc, usuario) => acc + usuario.importePp, 0);
  };

  return (
    <div>
      <h2 className="verde">Lista detallada</h2>
      <table className="styled-table">
        <thead>
          <tr>
            <th>Nº</th>
            <th>Nombre</th>
            <th>Consumo/Impor</th>
            <th>Total</th>
            <th>Desc por Efec</th>
          </tr>
        </thead>
        <tbody>
          {calcular().map((usuario, index) => (
            <tr key={usuario.id}>
              <td>{index + 1}.- </td>
              <td>{usuario.nombre}</td>
              <td>
                {usuario.consumos.map((consumo) => (
                  <p key={consumo.id} className="consumoimporte">
                    <p>{consumo.consumo}</p>
                    <p>$ {consumo.importe}</p>
                  </p>
                ))}
              </td>
              <td> $ {usuario.importePp}</td>

              <td>$ {usuario.importeDescuento}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colspan="5">
              Importe Total Acumulado: $ {calcularImporteTotal()}
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default ListaSimple;
