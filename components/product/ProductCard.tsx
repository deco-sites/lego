import Image from "deco-sites/std/components/Image.tsx";
import Text from "$store/components/ui/Text.tsx";
import Avatar from "$store/components/ui/Avatar.tsx";
// import Button from "$store/components/ui/Button.tsx";
import { useOffer } from "$store/sdk/useOffer.ts";
import { formatPrice } from "$store/sdk/format.ts";
import { useVariantPossibilities } from "$store/sdk/useVariantPossiblities.ts";
import type { Product } from "deco-sites/std/commerce/types.ts";
import AddToCardButton from "../../islands/AddToCartButton.tsx";
import { resizeVtexImage } from "$store/sdk/resizeVtexImage.tsx";

/**
 * A simple, inplace sku selector to be displayed once the user hovers the product card
 * It takes the user to the pdp once the user clicks on a given sku. This is interesting to
 * remove JS from the frontend
 */
function Sizes(product: Product) {
  const possibilities = useVariantPossibilities(product);
  const options = Object.entries(
    possibilities["TAMANHO"] ?? possibilities["Tamanho"] ?? {},
  );

  return (
    <ul class="flex justify-center items-center gap-2">
      {options.map(([url, value]) => (
        <a href={url}>
          <Avatar
            class="bg-default"
            variant="abbreviation"
            content={value}
            disabled={url === product.url}
          />
        </a>
      ))}
    </ul>
  );
}

interface Props {
  product: Product;
  /** Preload card image */
  preload?: boolean;
  showListPrice?: boolean;
}

function ProductCard({ product, preload, showListPrice }: Props) {
  const {
    url,
    productID,
    name,
    image: images,
    offers,
  } = product;
  
  const [front, back] = images ?? [];
  const { listPrice, price, seller } = useOffer(offers);

  return (
    <div
      id={`product-card-${productID}`}
      class="w-full group lg:hover:-translate-y-2 lg:transition-transform lg:duration-300 lg:ease-linear"
    >
      <a href={url} aria-label="product link">
        <div class="relative w-full max-w-[300px] m-auto border-b border-gray-100">
          <Image
            src={resizeVtexImage(front.url!, 300, 300)}
            alt={front.alternateName}
            width={300}
            height={300}
            class="rounded w-full group-hover:hidden"
            preload={preload}
            loading={preload ? "eager" : "lazy"}
            sizes="(max-width: 640px) 50vw, 20vw"
          />
          <Image
            src={resizeVtexImage(back?.url ?? front.url!, 300, 300)}
            alt={back?.alternateName ?? front.alternateName}
            width={300}
            height={300}
            class="rounded w-full hidden group-hover:block"
            sizes="(max-width: 640px) 50vw, 20vw"
          />

          {
            /* {seller && (
            <div
              class="absolute bottom-0 hidden sm:group-hover:flex flex-col gap-2 w-full p-2 bg-opacity-10"
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.2)",
                backdropFilter: "blur(2px)",
              }}
            >
              <Sizes {...product} />
              <Button as="a" href={product.url}>Visualizar Produto</Button>
            </div>
          )} */
          }
        </div>

        <div class="flex flex-col gap-1 py-2 px-4 w-max max-w-full m-auto">
          <Text
            class="overflow-hidden overflow-ellipsis whitespace-nowrap text-lg"
            variant="caption"
          >
            {name}
          </Text>
          <div class="flex flex-col items-center">
            {showListPrice && (
              <Text
                class="line-through text-lg"
                variant="list-price"
                tone="subdued"
              >
                De {formatPrice(listPrice, offers!.priceCurrency!)}
              </Text>
            )}

            <div>
              <Text variant="caption" class="text-lg text-black mr-2">
                POR:
              </Text>
              <Text
                variant="caption"
                tone="price"
                class="text-xl !text-black font-semibold"
              >
                {formatPrice(price, offers!.priceCurrency!)}
              </Text>
            </div>
          </div>
        </div>

        {seller && <AddToCardButton sellerId={seller} skuId={productID} />}
      </a>
    </div>
  );
}

export default ProductCard;
