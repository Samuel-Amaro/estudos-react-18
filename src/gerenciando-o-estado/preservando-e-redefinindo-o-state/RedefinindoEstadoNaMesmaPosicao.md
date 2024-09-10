# Redefinindo o estado na mesma posição

Há duas maneiras de redefinir o estado

- Renderizar componentes em diferentes posições
- ex: mostrar um e ocultar outro vice versa
- Esta solução é conveniente quando você tem apenas alguns componentes independentes renderizados no mesmo lugar.
- Dê a cada componente uma identidade explícita com `key`
- Redefinir o estado com uma chave
- maneira mais genérica de redefinir o estado de um componente.
- Chaves não são apenas para listas! Você pode usar chaves para fazer o React distinguir entre quaisquer componentes. Por padrão, o React usa a ordem dentro do pai (“primeiro contador”, “segundo contador”) para discernir entre componentes. Mas chaves permitem que você diga ao React que este não é apenas um primeiro contador, ou um segundo contador, mas um contador específico — por exemplo, o contador de Taylor . Dessa forma, o React saberá o contador de Taylor onde quer que ele apareça na árvore!
- Especificar a `key` diz ao React para usar o `key` próprio como parte da posição, em vez de sua ordem dentro do pai. É por isso que, mesmo que você os renderize no mesmo lugar em JSX, o React os vê como dois contadores diferentes e, portanto, eles nunca compartilharão o estado. Toda vez que um contador aparece na tela, seu estado é criado. Toda vez que ele é removido, seu estado é destruído. Alternar entre eles redefine seu estado repetidamente.
- **OBS:** Lembre-se de que as chaves não são globalmente únicas. Elas apenas especificam a posição dentro do pai .
