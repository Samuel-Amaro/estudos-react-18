import { memo, useState } from "react";

export type OrderDetails = {
  [k: string]: FormDataEntryValue | number;
};

type Props = {
  onSubmit: (orderDetails: OrderDetails) => void;
};

//memo permite que você pule a nova renderização de um componente quando seus props não forem alterados.
//Envolva um componente memo para obter uma versão memorizada desse componente. Essa versão memorizada do seu componente geralmente não será renderizada novamente quando seu componente pai for renderizado novamente, desde que seus props não tenham mudado. Mas o React ainda pode renderizá-lo novamente: a memorização é uma otimização de desempenho, não uma garantia.
const ShippingForm = memo(function ShippingForm({ onSubmit }: Props) {
  const [count, setCount] = useState(1);

  console.log("[ARTIFICIALLY SLOW] Rendering <ShippingForm />");
  const startTime = performance.now();
  while (performance.now() - startTime < 500) {
    // Do nothing for 500 ms to emulate extremely slow code
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const orderDetails = {
      ...Object.fromEntries(formData),
      count,
    };
    onSubmit(orderDetails);
  }

  return (
    <form onSubmit={handleSubmit}>
      <p>
        <b>
          Note: <code>ShippingForm</code> is artificially slowed down!
        </b>
      </p>
      <label>
        Number of items:
        <button type="button" onClick={() => setCount(count - 1)}>
          –
        </button>
        {count}
        <button type="button" onClick={() => setCount(count + 1)}>
          +
        </button>
      </label>
      <label>
        Street:
        <input name="street" />
      </label>
      <label>
        City:
        <input name="city" />
      </label>
      <label>
        Postal code:
        <input name="zipCode" />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
});

export default ShippingForm;
