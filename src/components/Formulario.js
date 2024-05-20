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
      { consumo: "", importe: 0, importeT: 0 },
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
    updatedConsumos[index].importe = parseFloat(e.target.value);
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
      (acc, consumo) => acc + consumo.importe,
      0
    );

    setImportePp(total);

    dispatch({
      type: "AGREGAR_COMIDA",
      payload: {
        id: uniqueId,
        nombre,
        consumoStore,
        importePp: total,
      },
    });

    setNombre("");
    setConsumoStore([]);
    setGuardarDisabled(true); // Desactivar el botón "Guardar" después de guardar
  };

  return (
    <form className="formulario" onSubmit={handleSubmit}>
      <input
        placeholder="Ingrese Nombre"
        type="text"
        value={nombre}
        onChange={handleNombreChange}
      />
      {consumoStore.map((consumo, index) => (
        <div className="inputform" key={consumo.id}>
          <input
            placeholder="Ingres consumo"
            type="text"
            value={consumo.consumo}
            onChange={(e) => handleConsumoChange(index, e)}
          />
          <input
            placeholder="Importe"
            type="number"
            value={consumo.importe}
            onChange={(e) => handleImporteChange(index, e)}
          />
        </div>
      ))}
      <button
        className="my-button_editar"
        type="button"
        onClick={agregarConsumo}
      >
        <MdFastfood />
      </button>
      <button
        type="submit"
        disabled={guardarDisabled}
        className="my-button_agregar"
      >
        <BiSolidSave />
      </button>{" "}
      {/* Usar el estado "guardarDisabled" para desactivar el botón "Guardar" */}
    </form>
  );
};

export default Formulario;
