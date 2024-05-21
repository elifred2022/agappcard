import React, { useState } from "react";
import ListaConsumos from "./ListaConsumos";
import { FaEdit } from "react-icons/fa";
import { MdAutoDelete } from "react-icons/md";
import { BiSolidSave } from "react-icons/bi";
import { MdFastfood } from "react-icons/md";

const ListaSimple = ({
  consumoStore,
  comidas,
  state,
  dispatch,
  usuario,
  index,
  onChangeComidas,
  onChangeConsumo,
}) => {
  const [mostrarDetalle, setMostrarDetalle] = useState(false);
  const [efectivo, setEfectivo] = useState(0);
  const [isEditing, setIsEditing] = useState(false);

  const verDetalle = () => {
    setMostrarDetalle(true);
  };

  const noVerDetalle = () => {
    setMostrarDetalle(false);
  };

  // Función para calcular el importe total acumulado
  const calcularImporteTotal = () => {
    return consumoStore.reduce((acc, usuario) => acc + usuario.importePp, 0);
  };

  // Función para calcular el 10% del importe total acumulado
  const calcular = () => {
    return state.comidas.map((usuario) => {
      const descuentoPorcentual = usuario.importePp * 0.1;
      const importeDescuento = usuario.importePp - descuentoPorcentual;
      return { ...usuario, importeDescuento };
    });
  };

  let ListContent;

  if (isEditing) {
    ListContent = (
      <table className="styled-table">
        <thead>
          <tr>
            <th>aja</th>
            <th>Nombre</th>
            <th>Importe</th>
            <th>Impo/desc</th>
            <th>Act.</th>
          </tr>
        </thead>
        <tbody>
          {calcular().map((usuario, index) => (
            <div className="inputform" key={usuario.id}>
              <input
                placeholder="Ingrese Nombre"
                type="text"
                value={usuario.nombre}
                onChange={(e) => {
                  onChangeComidas({
                    type: "EDITAR_COMIDA",
                    ...usuario,
                    nombre: e.target.value,
                  });
                }}
              />

              {usuario.consumoStore.map((consumo, index) => (
                <div key={consumo.id} className="consumoimporte">
                  <input
                    placeholder="Ingres consumo"
                    type="text"
                    value={consumo.consumo}
                    onChange={(e) => {
                      onChangeComidas({
                        type: "EDITAR_COMIDA",
                        ...consumo,
                        consumo: e.target.value,
                      });
                    }}
                  />
                  <input
                    placeholder="Importe"
                    type="number"
                    value={consumo.importe}
                    onChange={(e) => {
                      onChangeComidas({
                        type: "EDITAR_COMIDA",
                        ...consumo,
                        importe: e.target.value,
                      });
                    }}
                  />
                </div>
              ))}
            </div>
          ))}
          <button
            className="my-button_editar"
            type="button"
            //  onClick={agregarConsumo}
          >
            <MdFastfood />
          </button>
          <button
            type="submit"
            //    disabled={guardarDisabled}
            className="my-button_agregar"
            onClick={() => setIsEditing(false)}
          >
            <BiSolidSave />
          </button>{" "}
          {/* Usar el estado "guardarDisabled" para desactivar el botón "Guardar" */}
        </tbody>
        <tfoot>
          <tr>
            <td colspan="4">
              Importe Total Acumulado: $ {calcularImporteTotal()}
            </td>
          </tr>
        </tfoot>
      </table>
    );
  } else {
    ListContent = (
      <div>
        <h2 className="verde">Lista de Consumos</h2>
        <table className="styled-table">
          <thead>
            <tr>
              <th>aja</th>
              <th>Nombre</th>
              <th>Importe</th>
              <th>Impo/desc</th>
              <th>Act.</th>
            </tr>
          </thead>
          <tbody>
            {calcular().map((usuario, index) => (
              <tr key={usuario.id}>
                <td>{index + 1}.- </td>
                <td>{usuario.nombre}</td>
                <td>$ {usuario.importePp}</td>
                <td>$ {usuario.importeDescuento}</td>
                <td>
                  <div className="botonera">
                    <button
                      className="my-button_editar"
                      onClick={() => setIsEditing(true)}
                    >
                      <FaEdit />
                    </button>

                    <button
                      className="my-button_eliminar"
                      onClick={() =>
                        dispatch({ type: "ELIMINAR_COMIDA", payload: usuario })
                      }
                    >
                      <MdAutoDelete />
                    </button>
                  </div>
                </td>
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
              <ListaConsumos calcular={calcular} consumoStore={consumoStore} />

              <button className="btn-regular" onClick={noVerDetalle}>
                Cerrar detalle
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  return <>{<>{ListContent}</>}</>;
};

export default ListaSimple;
