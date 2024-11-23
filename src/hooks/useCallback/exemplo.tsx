/**
 * * EXEMPLO 1 Ignorando a nova renderização com useCallback e memo
 *
 * Neste exemplo, o ShippingForm componente é desacelerado artificialmente para que você possa ver o que acontece quando um componente React que você está renderizando está genuinamente lento. Tente incrementar o contador e alternar o tema.
 *
 * Incrementar o contador parece lento porque força o que foi desacelerado ShippingForm a renderizar novamente. Isso é esperado porque o contador mudou, e então você precisa refletir a nova escolha do usuário na tela.
 *
 * Em seguida, tente alternar o tema. Graças a useCallbacktogether with memo, ele é rápido apesar da desaceleração artificial! ShippingForm pulou a nova renderização porque a handleSubmitfunção não mudou. A handleSubmitfunção não mudou porque ambos productIde referrer(suas useCallbackdependências) não mudaram desde a última renderização.
 */

import { useState } from "react";
import ProductPage from "./ProductPage";

export default function AppUseCallbackExemple() {
  const [isDark, setIsDark] = useState(false);
  return (
    <>
      <label>
        <input
          type="checkbox"
          checked={isDark}
          onChange={(e) => setIsDark(e.target.checked)}
        />
        Dark mode
      </label>
      <hr />
      <ProductPage
        referrer="wizard_of_oz"
        productId={123}
        theme={isDark ? "dark" : "light"}
      />
    </>
  );
}
