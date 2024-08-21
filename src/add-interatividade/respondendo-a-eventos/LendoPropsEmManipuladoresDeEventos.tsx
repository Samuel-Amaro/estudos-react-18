/**
 * * LENDO PROPS EM MANIPULADORES DE EVENTOS
 *
 * Como os manipuladores de eventos são declarados dentro de um componente, eles têm acesso às props do componente.
 */

import React from "react";

interface Props {
  message: string;
  children: React.ReactNode;
}

function AlertButton({ message, children }: Props) {
  return <button onClick={() => alert(message)}>{children}</button>;
}

export default function Toolbar() {
  return (
    <div>
      <AlertButton message="Reproduzindo!">Reproduzir Filme</AlertButton>
      <AlertButton message="Enviando!">Enviar Imagem</AlertButton>
    </div>
  );
}
