import Image from "deco-sites/std/components/Image.tsx";
import Container from "$store/components/ui/Container.tsx";
import Text from "$store/components/ui/Text.tsx";
import Slider from "$store/components/ui/Slider.tsx";
import type { Image as LiveImage } from "deco-sites/std/components/types.ts";

export interface Feature {
  title: string;
  alt: string;
  href: string;
  description: string;
  src: LiveImage;
}

export interface Props {
  features?: Feature[];
  title: string;
}

function FeatureHighlights({ features = [] }: Props) {
  return (
    <Container class="min-h-[280px] p-6 sm:px-0 sm:py-10">
        <div class="flex flex-col justify-evenly sm:flex-row divide-y-1 sm:divide-y-0 sm:divide-x-1 divide-default mx-6 sm:mx-0 sm:my-10 md:flex-row bg-yellow-300">
          {features.map(({ title, description, src, alt, href }) => (
            <div class="flex md:flex-row px-[10px] py-[10px] items-center md:pl-[90px]">
              <a
                href={href}
                class="flex flex-col gap-4 items-center min-w-[190px]  md:flex-row"
              >
                <Image
                  class="border-red-500 bg-white border-1 py-2 px-2 hover:transform hover:scale-101  hover:delay-300 hover:rotate-3 hover:-translate-y-1"
                  src={src}
                  alt={alt}
                  width={70}
                  height={70}
                />
              </a>
                <div class="flex flex-col gap-2">
                  <Text class=" text-red-700 md:hover:underline md:hover:decoration md:text-2xl" tone="subdued" variant="caption">
                    {title}
                  </Text>
                </div>
            </div>
          ))}
        </div>
    </Container>
  );
}

export default FeatureHighlights;
