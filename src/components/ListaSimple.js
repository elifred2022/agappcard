import { useState, useEffect, useRef } from "react";
import { MdAutoDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { BiSolidSave } from "react-icons/bi";
import { MdFastfood } from "react-icons/md";

export default function ListaComidas({
  state,
  dispatch,
  onChangeComidas,
  onDeleteComidas,
  montoBebidaCu,
  montoComidaGral,
  montoPorcentaje,
  resultado,
}) {
  return (
    <>
      <table className="styled-table">
        <thead>
          <tr>
            <th>Nº</th>
            <th>Nombre</th>
            <th>Consumo</th>
            <th>Valor/plato</th>
            <th>Edit/Elim</th>
          </tr>
        </thead>
        <tbody>
          {state.comidas.map((usuario, index) => (
            <Foods
              key={usuario.id}
              usuario={usuario}
              onChangeComidas={onChangeComidas}
              onDelete={onDeleteComidas}
              state={state}
              index={index}
              dispatch={dispatch}
              montoBebidaCu={montoBebidaCu}
              montoPorcentaje={montoPorcentaje}
              resultado={resultado}
            />
          ))}
        </tbody>
      </table>
    </>
  );
}

function Foods({
  onChangeComidas,
  usuario,
  index,
  dispatch,
  montoBebidaCu,
  montoPorcentaje,
  bebidas,
  state,
  resultado,
}) {
  const [isEditing, setIsEditing] = useState(false);

  //FUNCION PARA ACTUALIZAR LOS INPUTS
  const handleInputChange = (e, consumoIndex, field) => {
    const newConsumoStore = usuario.consumoStore.map((item, idx) => {
      if (idx === consumoIndex) {
        return { ...item, [field]: e.target.value };
      }
      return item;
    });

    onChangeComidas({
      type: "EDITAR_COMIDA",
      ...usuario,
      consumoStore: newConsumoStore,
    });
  };

  //FUNCION PARA AGREGAR UN NUEVO CONSUMO
  const agregarConsumo = () => {
    const newConsumoStore = [
      ...usuario.consumoStore,
      { consumo: "", importe: "" },
    ];

    onChangeComidas({
      type: "EDITAR_COMIDA",
      ...usuario,
      consumoStore: newConsumoStore,
    });
  };

  let foodContent;
  if (isEditing) {
    foodContent = (
      <tr key={usuario.id}>
        <td>{index + 1}.-</td>
        <td>
          <input
            value={usuario.nombre}
            onChange={(e) => {
              onChangeComidas({
                type: "EDITAR_COMIDA",
                ...usuario,
                nombre: e.target.value,
              });
            }}
          />
        </td>
        <td>
          {usuario.consumoStore.map((item, consumoIndex) => (
            <div className="consumocu" key={consumoIndex}>
              <input
                value={item.consumo}
                onChange={(e) => handleInputChange(e, consumoIndex, "consumo")}
              />
              <input
                value={item.importe}
                onChange={(e) => handleInputChange(e, consumoIndex, "importe")}
              />
            </div>
          ))}
        </td>
        <td>
          <button
            className="my-button_editar"
            type="button"
            onClick={agregarConsumo}
          >
            <MdFastfood />
          </button>
          <button
            className="my-button_agregar"
            onClick={() => setIsEditing(false)}
          >
            <BiSolidSave />
          </button>
        </td>
      </tr>
    );
  } else {
    foodContent = (
      <tr key={usuario.id}>
        <td>{index + 1}.- </td>
        <td>{usuario.nombre}</td>
        <td>
          {usuario.consumoStore.map((item, consumoIndex) => (
            <div className="consumocu" key={consumoIndex}>
              <p>{item.consumo}</p>
              <p> ${item.importe}</p>
            </div>
          ))}
        </td>
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
    );
  }
  return <>{foodContent}</>;
}
