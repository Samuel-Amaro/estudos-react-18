/**
 * * Passando JSX como children
 *
 * Quando você aninha conteúdo dentro de uma tag JSX, o componente pai irá receber esse conteúdo em uma prop chamada children. Por exemplo, o componente Card abaixo receberá a prop children definida como <Avatar /> e o renderizará em uma wrapper div:
 * Ele não precisa “saber” o que está sendo renderizado dentro dele. Você encontrará esse padrão flexível em muitos lugares.
 * É possível pensar sobre um componente com a prop children como se ele tivesse um “buraco” o qual pode ser “preenchido” por seus componente pais com JSX arbitrária. Você frequentemente usará a prop children para wrappers visuais: painéis, grids, etc.
 */

import React from "react";
import Avatar from "./EspecificandoUmValorPadraoParaProp";

function Card({ children }: { children: React.ReactNode }) {
  return <div className="card">{children}</div>;
}

export default function Profile() {
  return (
    <Card>
      <Avatar
        size={100}
        person={{
          name: "Katsuko Saruhashi",
          imageId: "YfeOqp2",
        }}
      />
    </Card>
  );
}
