/**
 * * O CONTEXTO PASSA POR COMPONENTES INTERMEDIARIOS
 *
 *  Você pode inserir quantos componentes quiser entre o componente que fornece contexto e o que o usa. Isso inclui componentes internos como <div>e componentes que você pode construir você mesmo.
 *
 * Neste exemplo, o mesmo Post componente (com uma borda tracejada) é renderizado em dois níveis de aninhamento diferentes. Observe que o <Heading> interior dele obtém seu nível automaticamente do mais próximo <Section>:
 *
 * O contexto permite que você escreva componentes que “se adaptam ao ambiente” e se exibem de forma diferente dependendo de onde (ou, em outras palavras, em qual contexto ) estão sendo renderizados.
 *
 * contextos React diferentes não substituem uns aos outros. Cada contexto que você cria com createContext()é completamente separado dos outros e une componentes usando e fornecendo aquele contexto específico . Um componente pode usar ou fornecer muitos contextos diferentes sem problemas
 */

import Heading from "./Heading";
import Section3 from "./Section3";

export default function ProfilePage() {
  return (
    <Section3>
      {/*level 1*/}
      <Heading>My Profile</Heading> {/*level 1*/}
      <Post
        title="Hello traveller!" //level 2
        body="Read about my adventures."
      />
      <AllPosts />
    </Section3>
  );
}

function AllPosts() {
  return (
    <Section3>
      {" "}
      {/*level 2*/}
      <Heading>Posts</Heading> {/*level 2*/}
      <RecentPosts /> {/*level 3 */}
    </Section3>
  );
}

function RecentPosts() {
  return (
    <Section3>
      <Heading>Recent Posts</Heading>
      {/*level 3*/}
      <Post
        title="Flavors of Lisbon" /*level 4*/
        body="...those pastéis de nata!"
      />
      <Post title="Buenos Aires in the rhythm of tango" body="I loved it!" />
    </Section3>
  );
}

function Post({ title, body }: { title: string; body: string }) {
  return (
    <Section3 isFancy={true}>
      <Heading>{title}</Heading>
      <p>
        <i>{body}</i>
      </p>
    </Section3>
  );
}
