import React, { useState, useEffect } from "react";

const TotalConDescuento = ({ comidas, dispatch, modopago }) => {
  const [totalDebito, setTotalDebito] = useState(0);
  const [totalEfectivo, setTotalEfectivo] = useState(0);
  const [sumaDebEfe, setSumaDebEfe] = useState(0);

  // Calcular el total de pagos con débito
  const traerDebido = modopago.reduce(
    (acc, elem) => acc + (parseFloat(elem.pagoDebito) || 0),
    0
  );

  const traerEfectivo = modopago.reduce(
    (acc, elem) => acc + (parseFloat(elem.pagoEfectivo) || 0),
    0
  );
  const calcSumaDebEfe = totalDebito + totalEfectivo;
  // Establecer los estados con los valores calculados

  useEffect(() => {
    // Establecer los estados con los valores calculados

    setTotalDebito(traerDebido);
    setTotalEfectivo(traerEfectivo);

    setSumaDebEfe(calcSumaDebEfe);
  }, [traerDebido, traerEfectivo, calcSumaDebEfe]);

  return (
    <>
      <h3 className="yellow">
        Total importe debito: $ {totalDebito.toLocaleString()}
      </h3>
      <h3 className="yellow">
        Total importe efectivo: $ {totalEfectivo.toLocaleString()}
      </h3>
      <h3 className="yellow">
        Importe real a pagar: $ {sumaDebEfe.toLocaleString()}
      </h3>
    </>
  );
};

export default TotalConDescuento;
