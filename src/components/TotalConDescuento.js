import React from "react";
import { useState, useEffect } from "react";

const TotalConDescuento = ({ comidas, dispatch }) => {
  const [totalConsumoGral, setTotalConsumoGral] = useState(0);

  const totalConsumoGralString = totalConsumoGral.toString();

  const totalConsumo = comidas.reduce(
    (acc, elem) => acc + parseInt(elem.importePp),
    0
  );

  useEffect(() => {
    //const totalComidas = elementos.reduce((acc, elem) => acc + parseInt(elem.valorComida), 0);
    setTotalConsumoGral(totalConsumo);

    dispatch({
      type: "AGREGAR_MONTOTOTALCOMIDA",
      payload: { totalConsumoGralString },
    });
  }, [totalConsumoGralString, totalConsumo]);

  return (
    <h3 className="yellow">
      Total sin descuentos: $ {totalConsumoGralString.toLocaleString()}
    </h3>
  );
};

export default TotalConDescuento;
