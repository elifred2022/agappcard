import React, { useState, useEffect, useMemo } from "react";

const TotalConDescuento = ({ modopago, dispatch }) => {
  const [totalDebito, setTotalDebito] = useState(0);
  const [totalEfectivo, setTotalEfectivo] = useState(0);
  const [sumaDebEfe, setSumaDebEfe] = useState(0);

  const totalSumaDebEfeString = sumaDebEfe.toString();

  // Memorizar los cálculos de los pagos
  const traerDebido = useMemo(
    () =>
      modopago.reduce(
        (acc, elem) => acc + (parseFloat(elem.pagoDebito) || 0),
        0
      ),
    [modopago]
  );

  const traerEfectivo = useMemo(
    () =>
      modopago.reduce(
        (acc, elem) => acc + (parseFloat(elem.pagoEfectivo) || 0),
        0
      ),
    [modopago]
  );

  useEffect(() => {
    // Establecer los estados con los valores calculados
    setTotalDebito(traerDebido);
    setTotalEfectivo(traerEfectivo);
  }, [traerDebido, traerEfectivo]);

  useEffect(() => {
    // Calcular la suma de debito y efectivo una vez que los valores están actualizados
    const calcSumaDebEfe = totalDebito + totalEfectivo;
    setSumaDebEfe(calcSumaDebEfe);

    /* dispatch({
      type: "AGREGAR_TOTALCOMIDADESCUENTO",
      payload: { calcSumaDebEfe: totalSumaDebEfeString },
    });*/
  }, [totalDebito, totalEfectivo]);

  useEffect(() => {
    dispatch({
      type: "AGREGAR_TOTALCOMIDADESCUENTO",
      payload: { calcSumaDebEfe: totalSumaDebEfeString },
    });
  }, [sumaDebEfe]);

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
