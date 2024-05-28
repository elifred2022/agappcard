import React, { useMemo } from "react";

const TotalConDescuento = ({
  montoComidaGral,
  montoComidaDescuento,
  state,
}) => {
  const traerTotalSinDescuento = useMemo(
    () =>
      montoComidaGral.reduce(
        (acc, elem) => (acc = parseFloat(elem.totalConsumoGralString || 0)),
        0
      ),
    [montoComidaGral]
  );

  const traerTotalConDescuento = useMemo(
    () =>
      montoComidaDescuento.reduce(
        (acc, elem) => (acc = parseFloat(elem.calcSumaDebEfe || 0)),
        0
      ),
    [montoComidaDescuento]
  );

  const totalAhorro =
    parseInt(traerTotalSinDescuento) + parseInt(traerTotalConDescuento);

  //const totalAhorro = traerTotalSinDescuento - traerTotalConDescuento;

  return (
    <>
      <h3 className="yellow">
        Total ahorrado: ${totalAhorro.toLocaleString()}
      </h3>
    </>
  );
};

export default TotalConDescuento;
