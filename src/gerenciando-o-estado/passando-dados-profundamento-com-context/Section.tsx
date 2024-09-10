import { LevelContext } from "./LevelContext";

export default function Section({
  children,
  level,
}: {
  level: number;
  children: React.ReactNode;
}) {
  //etap 3: fornecer o contexto
  // fazendo com que cada um Section forneça seu próprio contexto.
  //provedor de contexto para fornecer LevelContext ao children da section
  //Isso diz ao React: “se algum componente dentro disto <Section> pedir LevelContext, dê a ele isto level.” O componente usará o valor do mais próximo <LevelContext.Provider> na árvore da IU acima dele.
  return (
    <section className="section">
      <LevelContext.Provider value={level}>{children}</LevelContext.Provider>
    </section>
  );
}
