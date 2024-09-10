/**
 * * Evite estados muito aninhados
 *
 * Evite estados muito aninhados. Um estado muito hierárquico não é muito conveniente para atualizar. Quando possível, prefira estruturar o estado de forma plana.
 *
 * Se o estado for muito aninhado para ser atualizado facilmente, considere torná-lo “plano”.
 */

import { useState } from "react";
import { initialTravelPlan } from "./places";

export default function TravelPlan() {
  const [plan, setPlan] = useState<{
    [index: number]: {
      id: number;
      title: string;
      childIds: number[];
    };
  }>(initialTravelPlan);

  function handleComplete(parentId: number, childId: number) {
    const parent = plan[parentId];
    // Cria uma nova versão do lugar pai
    // que não inclui o ID deste filho.
    const nextParent = {
      ...parent,
      childIds: parent.childIds.filter((id) => id !== childId),
    };
    // Atualiza o objeto de estado raiz...
    setPlan({
      ...plan,
      // ...para que tenha o pai atualizado.
      [parentId]: nextParent,
    });
  }

  const root = plan[0];
  const planetIds = root.childIds;

  return (
    <>
      <h2>Lugares para visitar</h2>
      <ol>
        {planetIds.map((id) => (
          <PlaceTree
            key={id}
            id={id}
            parentId={0}
            placesById={plan}
            onComplete={handleComplete}
          />
        ))}
      </ol>
    </>
  );
}

function PlaceTree({
  id,
  parentId,
  placesById,
  onComplete,
}: {
  id: number;
  onComplete: (parentId: number, childId: number) => void;
  parentId: number;
  placesById: {
    [index: number]: {
      id: number;
      title: string;
      childIds: number[];
    };
  };
}) {
  const place = placesById[id];
  const childIds = place.childIds;
  return (
    <li>
      {place.title}
      <button
        onClick={() => {
          onComplete(parentId, id);
        }}
      >
        Completar
      </button>
      {childIds.length > 0 && (
        <ol>
          {childIds.map((childId) => (
            <PlaceTree
              key={childId}
              id={childId}
              parentId={id}
              placesById={placesById}
              onComplete={onComplete}
            />
          ))}
        </ol>
      )}
    </li>
  );
}
