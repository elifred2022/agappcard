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
  porcentaje,
  comidas,
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
              porcentaje={porcentaje}
              comidas={comidas}
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
  modo,
  porcentaje,
  index,
  dispatch,
  montoBebidaCu,
  montoPorcentaje,
  bebidas,
  state,
  resultado,
  porcent,
  comidas,
}) {
  const [isEditing, setIsEditing] = useState(false);

  const getInitialMetodoPago = () => {
    const savedMetodoPago = localStorage.getItem(`metodoPago-${usuario.id}`);
    return savedMetodoPago || "inicial";
  };

  const [metodoPago, setMetodoPago] = useState(getInitialMetodoPago);
  const [newImportePp, setNewImportePp] = useState(null);
  const [pagoDebito, setPagoDebito] = useState(null);
  const [pagoDebitoEdit, setPagoDebitoEdit] = useState(null);
  const [pagoEfectivo, setPagoEfectivo] = useState(null);

  useEffect(() => {
    if (metodoPago === "debito") {
      calcDebito();
    } else if (metodoPago === "efectivo") {
      calcEfectivo();
    }
    localStorage.setItem(`metodoPago-${usuario.id}`, metodoPago);
  }, [metodoPago, usuario.importePp]);

  const calcDebito = () => {
    let pagoDebito = usuario.importePp;
    setNewImportePp(parseInt(pagoDebito));
    setPagoDebito(parseInt(pagoDebito));

    const actionType =
      newImportePp === null ? "AGREGAR_RES_MODPAGO" : "EDITAR_RES_MODPAGO";

    dispatch({
      type: actionType,
      payload: {
        id: usuario.id,
        pagoDebito,
      },
    });
  };

  const traerPorcentaDescuento = porcentaje.reduce(
    (acc, elem) => (acc = parseInt(elem.descuento)),
    0
  );

  const calcEfectivo = () => {
    let pagoEfectivo = 0;
    const importPP = usuario.importePp;

    if (traerPorcentaDescuento > 0) {
      let porcentaje = (importPP * traerPorcentaDescuento) / 100;
      pagoEfectivo = usuario.importePp - porcentaje;
      setNewImportePp(parseInt(pagoEfectivo));
      setPagoEfectivo(parseInt(pagoEfectivo));

      const pagoEfectivoString = pagoEfectivo.toString();

      const actionType =
        newImportePp === null ? "AGREGAR_RES_MODPAGO" : "EDITAR_RES_MODPAGO";

      dispatch({
        type: actionType,
        payload: {
          id: usuario.id,
          pagoEfectivo: pagoEfectivoString,
        },
      });
    } else {
      alert("Debe ingresar porcentaje");
      setMetodoPago("inicial");
    }
  };

  const handleChangeModoPago = (event) => {
    const newMetodoPago = event.target.value;
    setMetodoPago(newMetodoPago);
  };

  const [checkedItems, setCheckedItems] = useState({});
  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setCheckedItems((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  return (
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
        {metodoPago === "inicial" ? 0 : newImportePp}
      </td>
    </tr>
  );
}
