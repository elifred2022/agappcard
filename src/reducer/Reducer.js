export const initialState = {
  comidas: [],
  montoComidaGral: [],
};

export default function Reducer(state, action) {
  switch (action.type) {
    case "AGREGAR_COMIDA":
      return {
        ...state,
        comidas: [...state.comidas, action.payload],
      };

    case "EDITAR_COMIDA": {
      return {
        ...state,
        comidas: state.comidas.map((usuario) =>
          usuario.id === action.payload.id ? action.payload : usuario
        ),
      };
    }

    case "ELIMINAR_COMIDA": {
      return {
        ...state,

        comidas: state.comidas.filter(
          (usuario) => usuario.nombre !== action.payload.nombre
        ),
      };
    }

    case "AGREGAR_MONTOTOTALCOMIDA":
      return {
        ...state,
        montoComidaGral: [...state.montoComidaGral, action.payload],
      };

    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}
