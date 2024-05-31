import { BiSolidSave } from "react-icons/bi";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function ModalCambio({ onClose, handleImporteCambio }) {
  const [importeCambio, setImporteCambio] = useState("");
  const uniqueId = uuidv4();

  const handleSubmit = (event) => {
    event.preventDefault();

    handleImporteCambio(importeCambio); // Llama a la función pasada por props

    onClose();

    setImporteCambio("");
  };

  return (
    <div className="modal">
      <div>
        <p className="verde">Efectivo recibido</p>
        <input
          value={importeCambio}
          onChange={(e) => setImporteCambio(e.target.value)}
          type="number"
          placeholder="monto"
        />
      </div>
      <button onClick={handleSubmit} className="my-button_agregar">
        <BiSolidSave />
      </button>
    </div>
  );
}
