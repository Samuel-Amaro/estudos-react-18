/**
 * * Hooks Personalizados: Compartilhando lógica entre componentes
 *
 * Imagine que você está desenvolvendo um aplicativo que depende fortemente da rede (como a maioria dos aplicativos). Você deseja alertar o usuário caso a conexão de rede seja perdida acidentalmente enquanto eles estiverem usando o seu aplicativo. Como você procederia? Parece que você precisará de duas coisas no seu componente:
 *
 * Um estado que acompanha se a rede está online ou não.
 *
 * Um efeito que se inscreve nos eventos globais online e offline e atualiza o estado correspondente.
 *
 * Isso manterá seu componente sincronizado com o status da rede.
 */

import { useOnlineStatus } from "./useOnlineStatus";

function StatusBar() {
  const isOnline = useOnlineStatus();

  return <h1>{isOnline ? "✅ Conectado" : "❌ Desconectado"}</h1>;
}

/**
 * Agora, imagine que você também deseja usar a mesma lógica em um componente diferente. Você deseja implementar um botão “Salvar” que ficará desativado e exibirá “Reconectando…” em vez de “Salvar” enquanto a rede estiver desligada.
 */

function SaveButton() {
  const isOnline = useOnlineStatus();

  function handleSaveClick() {
    console.log("✅ Progresso salvo");
  }

  return (
    <button disabled={!isOnline} onClick={handleSaveClick}>
      {isOnline ? "Salvar progresso" : "Reconectando..."}
    </button>
  );
}

export default function App() {
  return (
    <>
      <SaveButton />
      <StatusBar />
    </>
  );
}
