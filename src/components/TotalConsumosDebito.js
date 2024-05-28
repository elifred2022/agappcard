import React, { useState, useEffect } from "react";

const TotalConsumos = ({ comidas, dispatch }) => {
  const [totalConsumoGral, setTotalConsumoGral] = useState(0);

  const totalConsumo = comidas.reduce(
    (acc, elem) => acc + parseInt(elem.importePp),
    0
  );

  useEffect(() => {
    setTotalConsumoGral(totalConsumo);

    // Formatear el total con puntos como separadores de miles
    const formattedTotal = totalConsumo.toLocaleString("es-ES");

    dispatch({
      type: "AGREGAR_MONTOTOTALCOMIDA",
      payload: { totalConsumoGralString: formattedTotal }, // Aquí utilizamos el total formateado
    });
  }, [totalConsumo]);

  return (
    <h3 className="yellow">
      Total sin descuentos: $ {totalConsumo.toLocaleString("es-ES")}
    </h3>
  );
};

export default TotalConsumos;
