  <th>A devolver</th>
  
  <td
        style={{
          textDecoration: checkedItems.line ? "line-through" : "none",
        }}
      >
        {" "}
        {metodoPago === "efectivo" ? (
          <>
            <p>$ {importeDif} </p>
          </>
        ) : (
          "N/A"
        )}
      </td>
