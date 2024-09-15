/**
 * * EXEMPLO: CONSTRUINDO UM CRONÔMETRO
 *
 * Você pode combinar refs e state em um único componente. Por exemplo, vamos fazer um cronômetro que o usuário possa iniciar ou parar ao pressionar um botão. Para exibir quanto tempo passou desde que o usuário pressionou “Start”, você precisará rastrear quando o botão Start foi pressionado e qual o horário atual.
 *
 * Quando o usuário pressionar “Start”, você usará setInterval para atualizar o tempo a cada 10 milissegundos:
 *
 * Quando uma informação é usada para renderização, mantenha-a no state. Quando uma informação é necessária somente por manipuladores de eventos (event handlers) e mudá-la não requer uma re-renderização, usar um ref pode ser mais eficiente.
 *
 * Você não deve ler (ou sobrescrever) o valor de current durante uma rerenderização.
 *
 * ler ref.current durante a renderização leva a um código não confiável. Se você precisar disso, dê preferência ao state.
 */

import { useRef, useState } from "react";

export default function Stopwatch() {
  const [startTime, setStartTime] = useState<null | number>(null);
  const [now, setNow] = useState<null | number>(null);
  const intervalRef = useRef(0);

  function handleStart() {
    // Inicia contagem.
    setStartTime(Date.now());
    setNow(Date.now());

    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      // Atualizar o tempo atual a cada 10 milissegundos.
      setNow(Date.now());
    }, 10);
  }

  function handleStop() {
    clearInterval(intervalRef.current);
  }

  let secondsPassed = 0;
  if (startTime != null && now != null) {
    //converte ms para s
    secondsPassed = (now - startTime) / 1000;
  }

  return (
    <>
      <h1>Time passed: {secondsPassed.toFixed(3)}</h1>
      <button onClick={handleStart}>Start</button>
      <button onClick={handleStop}>Stop</button>
    </>
  );
}
