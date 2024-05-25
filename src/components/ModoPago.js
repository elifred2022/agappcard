import { useState, useEffect } from "react";
import { MdAutoDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { BiSolidSave } from "react-icons/bi";
import { MdFastfood } from "react-icons/md";

export default function ModoPago({
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
            <th>Pago?</th>
            <th>Nº</th>
            <th>Nombre</th>
            <th>Modo de pago</th>
            <th>Total a pagar</th>
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

  const [metodoPago, setMetodoPago] = useState("inicial");

  const traerPorcentajeEfectivo = 10;

  function calcEfectivo() {
    let pagoEfectivo = 0;

    if (traerPorcentajeEfectivo > 0) {
      let porcentaje = (calcImportePorPersona * traerPorcentajeEfectivo) / 100;

      pagoEfectivo = calcImportePorPersona - porcentaje;

      setImportePorPersonaEfectivo(
        parseInt((importePorPersonaEfectivotoRef.current = pagoEfectivo))
      );

      // UPDATE ESTADOS EFECTIVOS

      const newImporteTotalCuEfectivo =
        calcImportePorPersona - calcImportePorPersonaPorcentaje;
      const newCambioEfectivo = cambioEfectivo;
      const newFormaPagoEfectivo = "efectivo";
    } else {
      alert("Debe ingresar porcentaje");
      setMetodoPago("inicial");
    }
  }

  const handleChangeModoPago = (event) => {
    const newMetodoPago = event.target.value; // asi se actualiza inmediatamente al sellecionar debito o efectivo
    setMetodoPago(newMetodoPago);

    switch (newMetodoPago) {
      case "debito":
        // si paga en debito

        // calcDebito();

        break;
      case "efectivo":
        // si paga en efectivo

        //  calcEfectivo();

        break;
      default:
        break;
    }
  };

  //// FUNCION CHECKBOX PARA TACHAR LA LINEA

  const [checkedItems, setCheckedItems] = useState(false);
  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setCheckedItems({
      ...checkedItems,
      [name]: checked,
    });
  };

  let foodContent;
  if (metodoPago === "debito") {
    foodContent = (
      <tr key={usuario.id}>
        <td>
          <label>
            <input
              type="checkbox"
              name="line"
              autoComplete="new-checkbox"
              checked={checkedItems.line || false}
              onChange={handleCheckboxChange}
            />
          </label>
        </td>
        <td
          style={{
            textDecoration: checkedItems.line ? "line-through" : "none",
          }}
        >
          {index + 1}.-{" "}
        </td>
        <td
          style={{
            textDecoration: checkedItems.line ? "line-through" : "none",
          }}
        >
          {usuario.nombre}
        </td>
        <td
          style={{
            textDecoration: checkedItems.line ? "line-through" : "none",
          }}
        >
          <label>
            <select
              className="selector"
              value={metodoPago}
              onChange={handleChangeModoPago}
            >
              <option className="yellow" value="inicial">
                Seleccione
              </option>
              <option className="yellow" value="debito">
                Débito
              </option>
              <option className="yellow" value="efectivo">
                Efectivo
              </option>
            </select>
          </label>
        </td>
        <td
          style={{
            textDecoration: checkedItems.line ? "line-through" : "none",
          }}
        >
          {usuario.importePp}
        </td>
      </tr>
    );
  } else if (metodoPago === "efectivo") {
    foodContent = (
      <tr key={usuario.id}>
        <td>
          <label>
            <input
              type="checkbox"
              name="line"
              autoComplete="new-checkbox"
              checked={checkedItems.line || false}
              onChange={handleCheckboxChange}
            />
          </label>
        </td>
        <td
          style={{
            textDecoration: checkedItems.line ? "line-through" : "none",
          }}
        >
          {index + 1}.-{" "}
        </td>
        <td
          style={{
            textDecoration: checkedItems.line ? "line-through" : "none",
          }}
        >
          {usuario.nombre}
        </td>
        <td
          style={{
            textDecoration: checkedItems.line ? "line-through" : "none",
          }}
        >
          <label>
            <select
              className="selector"
              value={metodoPago}
              onChange={handleChangeModoPago}
            >
              <option className="yellow" value="inicial">
                Seleccione
              </option>
              <option className="yellow" value="debito">
                Débito
              </option>
              <option className="yellow" value="efectivo">
                Efectivo
              </option>
            </select>
          </label>
        </td>
        <td
          style={{
            textDecoration: checkedItems.line ? "line-through" : "none",
          }}
        >
          efectivo
        </td>
      </tr>
    );
  } else if (metodoPago === "inicial") {
    foodContent = (
      <tr key={usuario.id}>
        <td>
          <label>
            <input
              type="checkbox"
              name="line"
              autoComplete="new-checkbox"
              checked={checkedItems.line || false}
              onChange={handleCheckboxChange}
            />
          </label>
        </td>
        <td
          style={{
            textDecoration: checkedItems.line ? "line-through" : "none",
          }}
        >
          {index + 1}.-{" "}
        </td>
        <td
          style={{
            textDecoration: checkedItems.line ? "line-through" : "none",
          }}
        >
          {usuario.nombre}
        </td>
        <td
          style={{
            textDecoration: checkedItems.line ? "line-through" : "none",
          }}
        >
          <label>
            <select
              className="selector"
              value={metodoPago}
              onChange={handleChangeModoPago}
            >
              <option className="yellow" value="inicial">
                Seleccione
              </option>
              <option className="yellow" value="debito">
                Débito
              </option>
              <option className="yellow" value="efectivo">
                Efectivo
              </option>
            </select>
          </label>
        </td>
        <td
          style={{
            textDecoration: checkedItems.line ? "line-through" : "none",
          }}
        >
          0
        </td>
      </tr>
    );
  }
  return <>{foodContent}</>;
}
