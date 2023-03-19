import Button from "$store/components/ui/Button.tsx";
import { useAddToCart } from "$store/sdk/useAddToCart.ts";

interface Props {
  skuId: string;
  sellerId: string;
  class?: string;
}

function AddToCartButton({ skuId, sellerId, class: _class = "" }: Props) {
  const props = useAddToCart({
    skuId,
    sellerId,
  });

  return (
    <Button
      {...props}
      class={`w-full max-w-[340px] bg-gradient-to-b from-buy-button-1 to-buy-button-2 text-white hover:text-white block m-auto tracking-wider ${_class}`}
    >
      COMPRAR
    </Button>
  );
}

export default AddToCartButton;
