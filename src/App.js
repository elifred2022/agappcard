import { useReducer, useEffect, useState } from "react";
import Reducer, { initialState } from "./reducer/Reducer";
import Formulario from "./components/Formulario";
import ListaConsumos from "./components/ListaConsumos";
import ListaSimple from "./components/ListaSimple";

function App() {
  const [storedState, setStoredState] = useState(() => {
    // funcion para recuperar datos del localstorage del state general
    const stored = JSON.parse(localStorage.getItem("state"));
    return stored || initialState;
  });

  const [state, dispatch] = useReducer(Reducer, storedState);

  useEffect(() => {
    // funcion para enviar los datos del state general al localstorage
    localStorage.setItem("state", JSON.stringify(state));
  }, [state]);

  const [consumosListados, setConsumosListados] = useState([]);

  const agregarConsumo = (nuevoConsumo) => {
    setConsumosListados([...consumosListados, nuevoConsumo]);
  };

  return (
    <div>
      <h2 className="verde">Registro de Consumos</h2>
      <Formulario dispatch={dispatch} onAgregarConsumo={agregarConsumo} />
      <ListaSimple
        consumos={consumosListados}
        ListaConsumos={ListaConsumos}
        comidas={state.comidas}
        state={state}
      />
    </div>
  );
}

export default App;
