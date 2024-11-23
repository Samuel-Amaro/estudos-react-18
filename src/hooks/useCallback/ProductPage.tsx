import { useCallback } from "react";
import ShippingForm, { OrderDetails } from "./ShippingForm";

type Props = {
  productId: number;
  referrer: string;
  theme: "dark" | "light";
};

export default function ProductPage({ productId, referrer, theme }: Props) {
  const handleSubmit = useCallback(
    (orderDetails: OrderDetails) => {
      post("/product/" + productId + "/buy", {
        referrer,
        orderDetails,
      });
    },
    [productId, referrer],
  );

  return (
    <div className={theme}>
      <ShippingForm onSubmit={handleSubmit} />
    </div>
  );
}

function post(
  url: string,
  data: {
    referrer: string;
    orderDetails: OrderDetails;
  },
) {
  // Imagine this sends a request...
  console.log("POST /" + url);
  console.log(data);
}
