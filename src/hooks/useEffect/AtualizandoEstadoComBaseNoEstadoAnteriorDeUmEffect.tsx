/**
 * * ATUALIZANDO O ESTADO COM BASE NO ESTADO ANTERIOR DE UM EFFEITO
 *
 * Quando você deseja atualizar o estado com base no estado anterior de um efeito, você pode encontrar um problema:
 * 
 * Como count é um valor reativo, ele deve ser especificado na lista de dependências. No entanto, isso faz com que o Effect limpe e configure novamente toda vez que houver countalterações. Isso não é o ideal.
 * 
 Para corrigir isso, passe o c => c + 1 atualizador de estado para setCount:

 Agora que você está passando c => c + 1em vez de count + 1, seu Efeito não precisa mais depender de count. Como resultado dessa correção, ele não precisará limpar e configurar o intervalo novamente toda vez que as countalterações ocorrerem.
 */

import { useEffect, useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);

  //ira executar este effect na renderização inicial na montagem do componente
  useEffect(() => {
    //ira executar a cada 1 segundo
    const intervalId = setInterval(() => {
      //ira atualizar o state com base no state anterior
      //sem precisar informar uma valor reativo como dependencia do effect
      setCount((c) => c + 1); // ✅ Passe uma function atualizadora de estado
    }, 1000);

    //ira executar este este clean na desmontagem do componente
    return () => clearInterval(intervalId);
  }, []); // ✅ Agora count não é uma dependência

  return <h1>{count}</h1>;
}
