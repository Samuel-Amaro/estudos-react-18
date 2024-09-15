import { useEffect, useRef, useState } from "react"; //etapa 1: declarando o efeito, importe o Hook react useEffect

/**
 * * COMO ESCREVER UM EFEITO(EFFECT)
 *
 *  Para escrever um Efeito, siga estes três passos:
 *
 *  1. Declare um efeito. Por padrão, seu efeito será executado após cada commit.
 *  2. Especifique as dependências do efeito. A maioria dos efeitos deve ser executada novamente somente quando necessário, em vez de após cada renderização. Por exemplo, uma animação de fade-in deve ser acionada somente quando um componente aparece. Conectar e desconectar de uma sala de bate-papo deve acontecer somente quando o componente aparece e desaparece, ou quando a sala de bate-papo muda. Você aprenderá a controlar isso especificando dependências.
 *  3. Adicione limpeza(cleanup) se necessário. Alguns efeitos precisam especificar como parar, desfazer ou limpar o que quer que estejam fazendo. Por exemplo, “connect” precisa de “disconnect”, “subscribe” precisa de “unsubscribe” e “fetch” precisa de “cancel” ou “ignore”. Você aprenderá como fazer isso retornando uma função de limpeza.
 *
 */

type PropsVideoPlayer = {
  src: string;
  isPlaying: boolean;
};

function VideoPlayer({ src, isPlaying }: PropsVideoPlayer) {
  const ref = useRef<null | HTMLVideoElement>(null);

  /*
   * *ETAPA 1: DECLARE SEU EFEITOO NO COMPONENTE
   *
   * Em seguida, chame-o no nível superior do seu componente e coloque algum código dentro do seu efeito
   *
   * Toda vez que seu componente renderiza, o React atualiza a tela e então executa o código dentro useEffect. Em outras palavras, useEffect “atrasa” a execução de um pedaço de código até que a renderização seja refletida na tela.
   *
   * Vamos ver como você pode usar um Effect para sincronizar com um sistema externo.
   *
   * Você precisa sincronizar o valor de isPlaying prop, que informa se o vídeo deve estar sendo reproduzido no momento, com chamadas como play() and pause().
   *
   * encapsular o efeito colateral para useEffect removê-lo do cálculo de renderização:
   *
   * Ao envolver a atualização do DOM em um Effect, você deixa o React atualizar a tela primeiro. Então seu Effect roda.
   *
   * Quando seu VideoPlayer componente renderiza (seja na primeira vez ou se renderizar novamente), algumas coisas acontecerão. Primeiro, o React atualizará a tela, garantindo que a <video> tag esteja no DOM com os props corretos. Então o React executará seu Effect. Finalmente, seu Effect chamará play() ou pause()dependendo do valor de isPlaying.
   *
   * Neste exemplo, o “sistema externo” que você sincronizou com o estado React foi a API de mídia do navegador. Você pode usar uma abordagem semelhante para encapsular código legado não React (como plugins jQuery) em componentes React declarativos.
   *
   * Note que controlar um player de vídeo é muito mais complexo na prática. A chamada play() pode falhar, o usuário pode reproduzir ou pausar usando os controles internos do navegador, e assim por diante. Este exemplo é muito simplificado e incompleto.
   *
   */
  //! OBSERVAÇÃO
  //! Por padrão, os efeitos são executados após cada renderização.
  //! Efeitos rodam como resultado da renderização. Definir estado aciona renderização. Definir estado imediatamente em um Efeito é como conectar uma tomada elétrica a si mesmo. O Efeito roda, ele define o estado, o que causa uma nova renderização, o que faz o Efeito rodar, ele define o estado novamente, isso causa outra nova renderização, e assim por diante.
  //! Os efeitos geralmente devem sincronizar seus componentes com um sistema externo . Se não houver um sistema externo e você quiser apenas ajustar algum estado com base em outro estado, talvez não precise de um efeito.
  /**
     * * ETAPA 2: ESPECIFIQUE AS DEPENDÊNCIAS DO EFFEITO 
     * 
     * Por padrão, os efeitos são executados após cada renderização. Frequentemente, isso não é o que você quer
     * 
     * Você pode dizer ao React para pular a reexecução desnecessária do Effect especificando um array de dependências como o segundo argumento para a useEffect chamada.
     * 
     * O problema é que o código dentro do seu Effect depende do isPlayingprop para decidir o que fazer, mas essa dependência não foi declarada explicitamente. Para corrigir esse problema, adicione isPlayingao array de dependências:
     * 
     * Agora todas as dependências estão declaradas, então não há erro. Especificar [isPlaying] como array de dependências informa ao React que ele deve pular a reexecução do seu Efeito se isPlaying for o mesmo que era durante a renderização anterior.
     * 
     * O array de dependências pode conter múltiplas dependências. O React só pulará a reexecução do Effect se todas as dependências que você especificar tiverem exatamente os mesmos valores que tinham durante a renderização anterior. O React compara os valores de dependência usando a Object.is comparação.
     * 
     * Observe que você não pode “escolher” suas dependências. Você receberá um erro de lint se as dependências que você especificou não corresponderem ao que o React espera com base no código dentro do seu Effect. Isso ajuda a capturar muitos bugs no seu código.
     * 
     * Os comportamentos sem a matriz de dependências e com uma matriz de dependências vazia [] são diferentes:
     
        useEffect(() => {
            // Isso é executado após cada renderização
        });

        useEffect(() => {
            // Isso só é executado na montagem (quando o componente aparece)
        }, []);

        useEffect(() => {
            // Isso é executado na montagem *e também* se a ou b foram alterados desde a última renderização
        }, [a, b]);

     * 
     * Por que a referência(ref) foi omitida da matriz de dependências? 
     * 
     * Isso ocorre porque o refobjeto tem uma identidade estável: o React garante que você sempre obterá o mesmo objeto da mesma useRefchamada em cada renderização. Ele nunca muda, então nunca fará com que o Effect seja executado novamente. Portanto, não importa se você o inclui ou não. Incluí-lo também é bom:
     * 
     * As set funções retornadas por useState também têm identidade estável, então você frequentemente as verá omitidas das dependências também. Se o linter permitir que você omita uma dependência sem erros, é seguro fazer isso.
     * 
     * Omitir dependências sempre estáveis ​​só funciona quando o linter pode “ver” que o objeto é estável. Por exemplo, se ref foi passado de um componente pai, você teria que especificá-lo no array de dependências. No entanto, isso é bom porque você não pode saber se o componente pai sempre passa a mesma ref, ou passa uma de várias refs condicionalmente. Então seu Effect dependeria de qual ref é passada.
     * 
     * 
    */
  useEffect(() => {
    if (isPlaying) {
      ref.current?.play();
    } else {
      ref.current?.pause();
    }
  }, [isPlaying]);

  return <video ref={ref} src={src} loop playsInline />;
}

export default function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  return (
    <>
      <button onClick={() => setIsPlaying(!isPlaying)}>
        {isPlaying ? "Pause" : "Play"}
      </button>
      <VideoPlayer
        isPlaying={isPlaying}
        src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
      />
    </>
  );
}
