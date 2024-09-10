import { useContext } from "react";
import { LevelContext2 } from "./LevelContext2";

export default function Section({
  children,
  isFancy,
}: {
  children: React.ReactNode;
  isFancy?: boolean;
}) {
  //etapa 2: usar o contexto
  //lendo o valor do contexto
  //useContext é um Hook. Assim como useState e useReducer, você só pode chamar um Hook imediatamente dentro de um componente React (não dentro de loops ou condições). useContext informa ao React que o Heading componente quer ler o LevelContext.
  //Como o contexto permite que você leia informações de um componente acima, cada um Sectionpoderia ler o leveldo Sectionacima e passar level + 1para baixo automaticamente.
  const level = useContext(LevelContext2);
  //etap 3: fornecer o contexto
  // fazendo com que cada um Section forneça seu próprio contexto.
  //provedor de contexto para fornecer LevelContext ao children da section
  //Isso diz ao React: “se algum componente dentro disto <Section> pedir LevelContext, dê a ele isto level.” O componente usará o valor do mais próximo <LevelContext.Provider> na árvore da IU acima dele.
  return (
    <section className={"section" + (isFancy ? "fancy" : "")}>
      <LevelContext2.Provider value={level + 1}>
        {children}
      </LevelContext2.Provider>
    </section>
  );
}
