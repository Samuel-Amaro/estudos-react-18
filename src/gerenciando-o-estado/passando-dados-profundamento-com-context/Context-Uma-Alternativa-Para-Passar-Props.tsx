/**
 * * CONTEXTO: UMA ALTERNATIVA PARA PASSAR ADEREÇOS(PROPS)
 *
 * Context permite que um componente pai forneça dados para toda a árvore abaixo dele. Há muitos usos para context.
 *
 * O contexto permite que um pai — mesmo distante! — forneça alguns dados para toda a árvore dentro dele.
 */

import Heading from "./Heading";
import Section from "./Section";

export default function Page() {
  return (
    <Section level={1}>
      <Heading>Title</Heading>
      <Section level={2}>
        <Heading>Heading</Heading>
        <Heading>Heading</Heading>
        <Heading>Heading</Heading>
        <Section level={3}>
          <Heading>Sub-heading</Heading>
          <Heading>Sub-heading</Heading>
          <Heading>Sub-heading</Heading>
          <Section level={4}>
            <Heading>Sub-sub-heading</Heading>
            <Heading>Sub-sub-heading</Heading>
            <Heading>Sub-sub-heading</Heading>
          </Section>
        </Section>
      </Section>
    </Section>
  );
}
