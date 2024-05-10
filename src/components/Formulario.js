import React, { useState } from "react";

const Formulario = ({ onAgregarConsumo }) => {
  const [nombre, setNombre] = useState("");
  const [consumos, setConsumos] = useState([]);
  const [importePp, setImportePp] = useState(0);
  const [importeTotal, setImporteTotal] = useState(0);
  const [guardarDisabled, setGuardarDisabled] = useState(true); // Estado para desactivar el botón "Guardar"
  const [formaPago, setFormaPAgo] = useState("debito");

  const agregarConsumo = () => {
    setConsumos([
      ...consumos,
      { id: Date.now(), consumo: "", importe: 0, importeT: 0 },
    ]);
  };

  const handleNombreChange = (e) => {
    setNombre(e.target.value);
  };

  const handleConsumoChange = (index, e) => {
    const updatedConsumos = [...consumos];
    updatedConsumos[index].consumo = e.target.value;
    setConsumos(updatedConsumos);
    // Verificar si hay al menos un consumo ingresado para habilitar el botón "Guardar"
    if (updatedConsumos.length > 0) {
      setGuardarDisabled(false);
    } else {
      setGuardarDisabled(true);
    }
  };

  const handleImporteChange = (index, e) => {
    const updatedConsumos = [...consumos];
    updatedConsumos[index].importe = parseFloat(e.target.value);
    setConsumos(updatedConsumos);
    // Verificar si hay al menos un consumo ingresado para habilitar el botón "Guardar"
    if (updatedConsumos.length > 0) {
      setGuardarDisabled(false);
    } else {
      setGuardarDisabled(true);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const total = consumos.reduce((acc, consumo) => acc + consumo.importe, 0);

    setImportePp(total);

    onAgregarConsumo({
      id: Date.now(),
      nombre,
      consumos,
      importePp: total,
    });
    setNombre("");
    setConsumos([]);
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
      {consumos.map((consumo, index) => (
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
      <button type="button" onClick={agregarConsumo}>
        Agregar consumo
      </button>
      <button type="submit" disabled={guardarDisabled}>
        Guardar
      </button>{" "}
      {/* Usar el estado "guardarDisabled" para desactivar el botón "Guardar" */}
    </form>
  );
};

export default Formulario;
