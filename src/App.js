import React, { useState } from "react";
import Formulario from "./components/Formulario";
import ListaConsumos from "./components/ListaConsumos";
import ListaSimple from "./components/ListaSimple";

function App() {
  const [consumosListados, setConsumosListados] = useState([]);

  const agregarConsumo = (nuevoConsumo) => {
    setConsumosListados([...consumosListados, nuevoConsumo]);
  };

  return (
    <div>
      <h2 className="verde">Registro de Consumos</h2>
      <Formulario onAgregarConsumo={agregarConsumo} />
      <ListaSimple consumos={consumosListados} ListaConsumos={ListaConsumos} />
    </div>
  );
}

export default App;
