import Image from "deco-sites/std/components/Image.tsx";
import AddToCartButton from "$store/islands/AddToCartButton.tsx";
import Container from "$store/components/ui/Container.tsx";
import Text from "$store/components/ui/Text.tsx";
import Breadcrumb from "$store/components/ui/Breadcrumb.tsx";
import Button from "$store/components/ui/Button.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import { useOffer } from "$store/sdk/useOffer.ts";
import { formatPrice } from "$store/sdk/format.ts";
import { resizeVtexImage } from "$store/sdk/resizeVtexImage.tsx";
import type { LoaderReturnType } from "$live/types.ts";
import type { ProductDetailsPage } from "deco-sites/std/commerce/types.ts";

import ProductSelector from "./ProductVariantSelector.tsx";

export interface Props {
  page: LoaderReturnType<ProductDetailsPage | null>;
}

function NotFound() {
  return (
    <div class="w-full flex justify-center items-center py-28">
      <div class="flex flex-col items-center justify-center gap-6">
        <Text variant="heading-2">Página não encontrada</Text>
        <a href="/">
          <Button>Voltar à página inicial</Button>
        </a>
      </div>
    </div>
  );
}

function Details({ page }: { page: ProductDetailsPage }) {
  const {
    breadcrumbList,
    product,
  } = page;
  const {
    description,
    productID,
    offers,
    image: images,
    name,
    gtin,
  } = product;
  console.log("# description", description);
  const { price, listPrice, seller, installments } = useOffer(offers);
  const [front, back] = images ?? [];

  return (
    <Container class="py-0 sm:py-10">
      {/* Breadcrumb */}
      <Breadcrumb
        itemListElement={breadcrumbList?.itemListElement.slice(0, -1)}
      />
      <div class="flex flex-col gap-4 mx-4 md:flex-row md:justify-center sm:gap-10">
        {/* Image Gallery */}
        <div class="flex flex-col overflow-auto snap-x snap-mandatory scroll-smooth sm:gap-2 md:flex-grow max-w-[600px]">
          {/* {[front, back ?? front].map((img, index) => ( */}
          <Image
            style={{ aspectRatio: "1000 / 750" }}
            class="snap-center w-full object-contain"
            sizes="(max-width: 640px) 100vw, 30vw"
            src={resizeVtexImage(front.url!, 1000, 750)}
            alt={front.alternateName}
            width={1000}
            height={750}
            // Preload LCP image for better web vitals
            preload={true}
            loading="eager"
          />
          {/* ))} */}

          <div class="flex justify-center mt-3 gap-3 overflow-x-auto snap-x snap-mandatory scrollbar-none">
            {images?.map(({ url, alternateName }) => (
              <div style={{aspectRatio: "1"}} class="min-h-[85px] w-[100px] snap-center border border-gray-200">
                <img
                  src={resizeVtexImage(url!, 100, 100)}
                  alt={alternateName}
                  decoding="async"
                />
              </div>
            ))}
          </div>
        </div>
        {/* Product Info */}
        <div class="flex-auto px-4 sm:px-0 md:flex-none">
          {/* Code and name */}
          <div class="mt-4 sm:mt-8">
            <div>
              <Text
                tone="subdued"
                variant="caption"
                class="font-bold text-black"
              >
                CÓDIGO: {gtin}
              </Text>
            </div>
            <h1 class="my-3 max-w-sm break-words">
              <Text variant="heading-3" class="block">{name}</Text>
            </h1>
          </div>
          {/* Prices */}
          <div class="mt-4">
            <div class="flex flex-row gap-2 items-center">
              {
                /* <Text
                class="line-through"
                tone="subdued"
                variant="list-price"
              >
                {formatPrice(listPrice, offers!.priceCurrency!)}
              </Text> */
              }
              <div>
                <Text
                  tone="price"
                  variant="heading-3"
                  class="mr-2 text-sm font-black"
                >
                  POR:
                </Text>
                <Text tone="price" variant="heading-3" class="font-black">
                  {formatPrice(price, offers!.priceCurrency!)}
                </Text>
              </div>
            </div>
            <Text
              tone="subdued"
              variant="caption"
              class="text-[16px] font-bold text-black"
            >
              OU {installments}
            </Text>
          </div>
          {/* Sku Selector */}
          <div class="mt-4 sm:mt-6">
            <ProductSelector product={product} />
          </div>
          {/* Add to Cart and Favorites button */}
          <div class="mt-4 sm:mt-10 flex flex-col gap-2">
            {seller && (
              <AddToCartButton
                skuId={productID}
                sellerId={seller}
                class="max-w-none h-auto py-3"
              />
            )}
            <Button variant="secondary" class="h-auto py-3">
              <Icon id="Heart" width={20} height={20} strokeWidth={2} />{" "}
              Favoritar
            </Button>
          </div>
        </div>
      </div>
      {/* Description card */}
      <div class="m-4 mt-8 sm:mt-6">
        <Text variant="caption">
          {description && (
            <div class="ml-2">
              <h2 class="flex items-center gap-2 mb-4">
                <img
                  src="/icons/lego-product-features.png"
                  width={50}
                  height={50}
                />
                <Text variant="heading-2" class="cursor-pointer font-bold">
                  Características
                </Text>
              </h2>
              <div class="mt-2 whitespace-pre-wrap text-[16px] leading-normal">
                {description}
              </div>
            </div>
          )}
        </Text>
      </div>
    </Container>
  );
}

function ProductDetails({ page }: Props) {
  if (page) {
    return <Details page={page} />;
  }

  return <NotFound />;
}

export default ProductDetails;
