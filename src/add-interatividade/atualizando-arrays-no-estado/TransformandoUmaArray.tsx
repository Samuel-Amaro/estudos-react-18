/**
 * * TRANSFORMANDO UMA ARRAY
 *
 *  Se você quiser alterar alguns ou todos os itens do array, você pode usar map()para criar um novo array. A função que você passará mappode decidir o que fazer com cada item, com base em seus dados ou seu índice (ou ambos).
 *
 * Neste exemplo, um array contém coordenadas de dois círculos e um quadrado. Quando você pressiona o botão, ele move apenas os círculos para baixo em 50 pixels. Ele faz isso produzindo um novo array de dados usando map():
 */

import { useState } from "react";

const initialShapes = [
  { id: 0, type: "circle", x: 50, y: 100 },
  { id: 1, type: "square", x: 150, y: 100 },
  { id: 2, type: "circle", x: 250, y: 100 },
];

export default function ShapeEditor() {
  const [shapes, setShapes] = useState(initialShapes);

  function handleClick() {
    const nextShapes = shapes.map((shape) => {
      if (shape.type === "square") {
        // sem mudança
        return shape;
      } else {
        // Retorne um novo círculo 50px abaixo
        return {
          ...shape,
          y: shape.y + 50,
        };
      }
    });
    //Renderiza novamente com o novo array
    setShapes(nextShapes);
  }

  return (
    <>
      <button onClick={handleClick}>Move circles down!</button>
      {shapes.map((shape) => (
        <div
          key={shape.id}
          style={{
            background: "purple",
            position: "absolute",
            left: shape.x,
            top: shape.y,
            borderRadius: shape.type === "circle" ? "50%" : "",
            width: 20,
            height: 20,
          }}
        />
      ))}
    </>
  );
}
