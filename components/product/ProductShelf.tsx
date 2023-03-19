import ProductCard from "$store/components/product/ProductCard.tsx";
import Container from "$store/components/ui/Container.tsx";
import Text from "$store/components/ui/Text.tsx";
import Slider from "$store/components/ui/Slider.tsx";
import SliderControllerJS from "$store/islands/SliderJS.tsx";
import Button from "$store/components/ui/Button.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import { useId } from "preact/hooks";
import type { LoaderReturnType } from "$live/types.ts";
import type { Product } from "deco-sites/std/commerce/types.ts";

export interface Props {
  title: string;
  products: LoaderReturnType<Product[] | null>;
  itemsPerPage?: number;
  showListPrice?: boolean;
}

function ProductShelf({
  title,
  products,
  showListPrice = false,
}: Props) {
  const id = useId();

  if (!products || products.length === 0) {
    return null;
  }

  return (
    <Container
      id={id}
      class="flex flex-col overflow-hidden my-4 mb-12"
    >
      <h2 class="text-center row-start-1 col-span-full m-4 mb-8">
        <Text variant="heading-2" class="font-semibold text-3xl">{title}</Text>
      </h2>

      <div class="grid grid-cols-[48px_1fr_48px] grid-rows-[1fr_48px_1fr]">
        <Slider
          class="col-span-full row-span-full scrollbar-none md:gap-[20px]"
          snap={`snap-center md:snap-start w-screen md:w-[300px] px-4`}
        >
          {products?.map((product) => (
            <ProductCard product={product} showListPrice={showListPrice} />
          ))}
        </Slider>

        <>
          <div class="relative sm:block z-10 col-start-1 row-start-2">
            <Button
              variant="icon"
              data-slide="prev"
              aria-label="Previous item"
              class="absolute right-0 rounded-full !bg-slider-arrow hover:!bg-slider-arrow-hover shadow-slider-arrow !border-slider-arrow border-slider-arrow-width"
            >
              <Icon
                size={20}
                id="ChevronLeft"
                strokeWidth={3}
                class="text-slider-arrow"
              />
            </Button>
          </div>
          <div class="relative sm:block z-10 col-start-3 row-start-2">
            <Button
              variant="icon"
              data-slide="next"
              aria-label="Next item"
              class="absolute left-0 rounded-full !bg-slider-arrow hover:!bg-slider-arrow-hover shadow-slider-arrow !border-slider-arrow border-slider-arrow-width"
            >
              <Icon
                size={20}
                id="ChevronRight"
                strokeWidth={3}
                class="text-slider-arrow"
              />
            </Button>
          </div>
        </>
      </div>

      <SliderControllerJS rootId={id} />
    </Container>
  );
}

export default ProductShelf;
