import { useReducer, useEffect, useState } from "react";
import Reducer, { initialState } from "./reducer/Reducer";
import Header from "./components/Header";
import Formulario from "./components/Formulario";
import ModoPago from "./components/ModoPago";
import ListaSimple from "./components/ListaSimple";

import TotalConsumosDebito from "./components/TotalConsumosDebito";
import FormPorcentaje from "./components/FormPorcentaje";
import ListaPorcentaje from "./components/ListaPorcentaje";

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

  function handleChangeComidas(comidaId) {
    dispatch({
      type: "EDITAR_COMIDA",
      payload: comidaId,
    });
  }

  function handleChangePorcentaje(porcent) {
    dispatch({
      type: "EDITAR_PORCENTAJE",
      payload: porcent,
    });
  }

  return (
    <div>
      <Header />
      <main>
        <h3 className="verde">Ingrese asistentes y consumo individual</h3>
        <Formulario dispatch={dispatch} onAgregarConsumo={agregarConsumo} />
        <h3 className="verde">Detalle de consumo</h3>
        <ListaSimple
          consumoStore={consumosListados}
          comidas={state.comidas}
          state={state}
          dispatch={dispatch}
          onChangeComidas={handleChangeComidas}
        />
        <TotalConsumosDebito
          dispatch={dispatch}
          comidas={state.comidas}
          montoComidaGral={state.montoComidaGral}
          state={state}
        />
        <h3 className="verde">Ingrese % p/desceunto</h3>
        <FormPorcentaje
          dispatch={dispatch}
          montoPorcentaje={state.montoPorcentaje}
        />
        <ListaPorcentaje
          state={state}
          montoPorcentaje={state.montoPorcentaje}
          dispatch={dispatch}
          resultadoFinal={state.resultadoFinal}
          onChangePorcentaje={handleChangePorcentaje}
        />

        <h3 className="verde">Modo de pagos</h3>
        <ModoPago
          consumoStore={consumosListados}
          comidas={state.comidas}
          porcentaje={state.porcentaje}
          state={state}
          dispatch={dispatch}
          onChangeComidas={handleChangeComidas}
        />
      </main>
    </div>
  );
}

export default App;
