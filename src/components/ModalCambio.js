import { BiSolidSave } from "react-icons/bi";
import { useState } from "react";

export default function ModalCambio({
  onClose,

  dispatch,
}) {
  const [importeCambio, setImporteCambio] = useState("");
  //const [calcImporteCambio, setCalcImporteCambio] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    let cambio = 0;
    // let importPP = usuario.importePp;

    console.log(importeCambio);

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
