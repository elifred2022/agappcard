export const initialState = {
  comidas: [],
  montoComidaGral: [],
  montoComidaDescuento: [],
  porcentaje: [],
  modopago: [],
  efectivorecibido: [],
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

    case "AGREGAR_TOTALCOMIDADESCUENTO":
      return {
        ...state,
        montoComidaDescuento: [...state.montoComidaDescuento, action.payload],
      };

    case "AGREGAR_PORCENTAJE":
      return {
        ...state,
        porcentaje: [...state.porcentaje, action.payload],
      };

    case "EDITAR_PORCENTAJE": {
      return {
        ...state,
        porcentaje: state.porcentaje.map((porcent) =>
          porcent.id === action.payload.id ? action.payload : porcent
        ),
      };
    }

    case "ELIMINAR_PORCENTAJE": {
      return {
        ...state,
        porcentaje: state.porcentaje.filter(
          (porcent) => porcent.descuento !== action.payload.descuento
        ),
      };
    }

    case "AGREGAR_RES_MODPAGO":
      return {
        ...state,
        modopago: [...state.modopago, action.payload],
      };

    case "EDITAR_RES_MODPAGO": {
      return {
        ...state,
        modopago: state.modopago.map((usuario) =>
          usuario.id === action.payload.id ? action.payload : usuario
        ),
      };
    }

    case "AGREGAR_EFECTIVORECIBIDO":
      return {
        ...state,
        efectivorecibido: [...state.efectivorecibido, action.payload],
      };

    case "RESET":
      return initialState;

    case "RESET_RESULTADOS":
      return { ...state, modopago: [] };

    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}
