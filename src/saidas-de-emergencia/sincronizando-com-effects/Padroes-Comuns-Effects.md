# Exemplos Sobre Como Lidar com Padrões Comuns

## Controlando widgets que não são React

Às vezes, você precisa adicionar widgets de UI que não são escritos para React. Por exemplo, digamos que você está adicionando um componente de mapa à sua página. Ele tem um setZoomLevel()método, e você gostaria de manter o nível de zoom sincronizado com uma zoomLevelvariável de estado no seu código React. Seu efeito seria parecido com este:

```js
useEffect(() => {
  const map = mapRef.current;
  map.setZoomLevel(zoomLevel);
}, [zoomLevel]); // Isso é executado na montagem *e também* se zoomLevel foram alterado desde a última renderização
```

Algumas APIs podem não permitir que você as chame duas vezes seguidas. Por exemplo, o showModalmétodo do elemento interno <dialog>lança se você o chamar duas vezes. Implemente a função de limpeza e faça com que ela feche o diálogo:

```js
useEffect(() => {
  const dialog = dialogRef.current;
  dialog.showModal();
  return () => dialog.close();
}, []); // Isso só é executado na montagem (quando o componente aparece)
```

Em desenvolvimento, seu Effect chamará showModal(), então imediatamente close(), e então showModal() novamente. Isso tem o mesmo comportamento visível ao usuário de chamar showModal() uma vez, como você veria em produção.

## Assinar Eventos

Se o seu efeito assinar algo, a função de limpeza deve cancelar a assinatura:

```js
useEffect(() => {
  function handleScroll(e) {
    console.log(window.scrollX, window.scrollY);
  }

  window.addEventListener("scroll", handleScroll);

  return () => window.removeEventListener("scroll", handleScroll);
}, []); // Isso só é executado na montagem (quando o componente aparece)
```

Em desenvolvimento, seu Effect chamará addEventListener(), então imediatamente removeEventListener(), e então addEventListener()novamente com o mesmo manipulador. Então haveria apenas uma assinatura ativa por vez. Isso tem o mesmo comportamento visível ao usuário de chamar addEventListener()uma vez, como na produção.

## Ativando animações

Se o seu efeito animar algo, a função de limpeza deve redefinir a animação para os valores iniciais:

```js
useEffect(() => {
  const node = ref.current;

  node.style.opacity = 1; // Acionar a animação

  return () => {
    node.style.opacity = 0; // Redefinir para o valor inicial
  };
}, []); // Isso só é executado na montagem (quando o componente aparece)
```

No desenvolvimento, a opacidade será definida como 1, depois como 0e depois como 1novamente. Isso deve ter o mesmo comportamento visível ao usuário que defini-la como 1diretamente, que é o que aconteceria na produção. Se você usar uma biblioteca de animação de terceiros com suporte para interpolação, sua função de limpeza deve redefinir a linha do tempo para seu estado inicial.

## Buscando Dados

Se o seu efeito buscar algo, a função de limpeza deve abortar a busca ou ignorar seu resultado:

```js
//O React chamará sua função de limpeza toda vez antes que o Effect seja executado novamente, e uma última vez quando o componente for desmontado (removido).
useEffect(() => {
  let ignore = false;

  async function startFetching() {
    const json = await fetchTodos(userId);
    if (!ignore) {
      setTodos(json);
    }
  }

  startFetching();

  return () => {
    ignore = true;
  };
}, [userId]); // Isso é executado na montagem *e também* se userid foram alterado desde a última renderização, lembrando que em desenvolvimento e executado duas vezes na montagem e na remontagem inicial para prever bugs
```

Você não pode “desfazer” uma solicitação de rede que já aconteceu, mas sua função de limpeza deve garantir que a busca que não é mais relevante não continue afetando seu aplicativo. Se as userIdalterações de 'Alice'para 'Bob', a limpeza garante que a 'Alice'resposta seja ignorada mesmo se chegar depois de 'Bob'.

No desenvolvimento, você verá duas buscas na aba Network. Não há nada de errado com isso. Com a abordagem acima, o primeiro Effect será imediatamente limpo, então sua cópia da ignorevariável será definida como true. Então, mesmo que haja uma requisição extra, ela não afetará o estado graças à if (!ignore)verificação.

Em produção, haverá apenas uma solicitação. Se a segunda solicitação em desenvolvimento estiver incomodando você, a melhor abordagem é usar uma solução que desduplica solicitações e armazena em cache suas respostas entre componentes:

```js
function TodoList() {
  const todos = useSomeDataLibrary(`/api/user/${userId}/todos`);
  // ...
```

Isso não só melhorará a experiência de desenvolvimento, mas também fará com que seu aplicativo pareça mais rápido. Por exemplo, o usuário que pressionar o botão Voltar não terá que esperar que alguns dados sejam carregados novamente porque eles serão armazenados em cache. Você pode construir esse cache sozinho ou usar uma das muitas alternativas para busca manual no Effects.

## Quais são boas alternativas para busca de dados no Effects?

Escrever fetchchamadas dentro de Effects é uma maneira popular de buscar dados , especialmente em aplicativos totalmente do lado do cliente. Esta é, no entanto, uma abordagem muito manual e tem desvantagens significativas:

- Os efeitos não rodam no servidor.
- Buscar diretamente no Effects facilita a criação de “cascatas de rede”.
- Buscar diretamente no Effects geralmente significa que você não pré-carrega ou armazena dados em cache.
- Não é muito ergonômico.

Esta lista de desvantagens não é específica do React. Ela se aplica à busca de dados na montagem com qualquer biblioteca. Assim como com o roteamento, a busca de dados não é trivial de se fazer bem, então recomendamos as seguintes abordagens:

- Se você usar um framework , use seu mecanismo de busca de dados integrado.
- Caso contrário, considere usar ou construir um cache do lado do cliente.

**O React sempre limpa o Effect da renderização anterior antes do Effect da próxima renderização.**
