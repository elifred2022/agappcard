import React, { useState } from "react";
import { BiSolidSave } from "react-icons/bi";
import { MdFastfood } from "react-icons/md";
import { v4 as uuidv4 } from "uuid";

const Formulario = ({ onAgregarConsumo, dispatch }) => {
  const [nombre, setNombre] = useState("");
  const [consumoStore, setConsumoStore] = useState([]);
  const [importePp, setImportePp] = useState(0);
  const [importeTotal, setImporteTotal] = useState(0);
  const [guardarDisabled, setGuardarDisabled] = useState(true); // Estado para desactivar el botón "Guardar"
  const [formaPago, setFormaPAgo] = useState("debito");

  const uniqueId = uuidv4();

  const agregarConsumo = () => {
    setConsumoStore([
      ...consumoStore,
      { id: uuidv4(), consumo: "", importe: 0 },
    ]);
  };

  const handleNombreChange = (e) => {
    setNombre(e.target.value);
  };

  const handleConsumoChange = (index, e) => {
    const updatedConsumos = [...consumoStore];
    updatedConsumos[index].consumo = e.target.value;
    setConsumoStore(updatedConsumos);
    // Verificar si hay al menos un consumo ingresado para habilitar el botón "Guardar"
    if (updatedConsumos.length > 0) {
      setGuardarDisabled(false);
    } else {
      setGuardarDisabled(true);
    }
  };

  const handleImporteChange = (index, e) => {
    const updatedConsumos = [...consumoStore];
    updatedConsumos[index].importe = e.target.value.toString(); //convertir en string
    setConsumoStore(updatedConsumos);
    // Verificar si hay al menos un consumo ingresado para habilitar el botón "Guardar"
    if (updatedConsumos.length > 0) {
      setGuardarDisabled(false);
    } else {
      setGuardarDisabled(true);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const total = consumoStore.reduce(
      (acc, usuario) => acc + parseFloat(usuario.importe || 0),
      0
    );

    const totalString = total.toString(); // Convertir total a string

    setImportePp(totalString); // Establecer importePp como string

    dispatch({
      type: "AGREGAR_COMIDA",
      payload: {
        id: uniqueId,
        nombre,
        consumoStore,
        importePp: totalString, // Pasar totalString en lugar de total
      },
    });

    setNombre("");
    setConsumoStore([]);
    setGuardarDisabled(true); // Desactivar el botón "Guardar" después de guardar
  };

  return (
    <form className="formulario" onSubmit={handleSubmit}>
      <div className="consumocu">
        <input
          placeholder="Ingrese Nombre"
          type="text"
          value={nombre}
          onChange={handleNombreChange}
        />
        <button
          className="my-button_editar"
          type="button"
          onClick={agregarConsumo}
        >
          + <MdFastfood />
        </button>
        <button
          type="submit"
          disabled={guardarDisabled}
          className="my-button_agregar"
        >
          <BiSolidSave />
        </button>{" "}
      </div>

      {consumoStore.map((usuario, index) => (
        <table key={usuario.id} className="styled-table">
          <tbody>
            <tr>
              <td>
                <input
                  placeholder="Ingres consumo"
                  type="text"
                  value={usuario.consumo}
                  onChange={(e) => handleConsumoChange(index, e)}
                />
              </td>
              <td>
                <input
                  placeholder="Ingrese Importe"
                  type="number"
                  value={usuario.importe}
                  onChange={(e) => handleImporteChange(index, e)}
                />
              </td>
            </tr>
          </tbody>
        </table>
      ))}
    </form>
  );
};

export default Formulario;
