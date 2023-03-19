import { useState } from "preact/hooks";
import Container from "$store/components/ui/Container.tsx";
import Image from "deco-sites/std/components/Image.tsx";
import Text from "$store/components/ui/Text.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import type { Image as LiveImage } from "deco-sites/std/components/types.ts";

export interface Newsletter {
  src: LiveImage;
  alt: string;
  title: string;
  subtitle: string;
  label: string;

  href: string;
}

export interface Props {
  item: Newsletter[];
}

export default function Newsletters({ item = [] }: Props) {
  return (
    <Container class="p-4 gap-6">
      {item.map(({ src, alt, title, subtitle, href, label }, index) => (
        <div
          class={`relative h-[250px] items-center bg-gray-100 flex flex-col justify-center "item-start" 
          md:h-[130px] md:flex md:flex-row px-2 py-3 md:p-7 relative max-w-[1280px] md:justify-end`}
        >
          <Image
            class={` bottom-[70%] absolute md:right-[77%] md:bottom-[20%]`}
            src={src}
            alt={alt}
            width={253}
            height={174}
          />
          <Text
            variant="heading-3"
            class=" text-sm ml-3 md:ml-0 text-center font-semibold md:text-lg"
          >
            {title}
          </Text>
          <form class="flex flex-col flex md:flex-row items-center gap-2 font-body text-body w-full  md:justify-end  md: max-w-[520px]">
              <input
                class="w-[80%] py-2 px-3 flex-grow rounded text-default-inverse border-1 border-default md:max-w-[320px] "
                placeholder="Digite seu e-mail"
              />
              <button
                class="w-[80%] text-white rounded font-semibold bg-blue-600 h-35px px-6 py-2 flex items-center justify-center transition-all duration-300 md:w-[107px] hover:bg-blue-700"
                type="bgutton" // prevent form's default behavior
              >
              Enviar
              </button>
            </form>
          </div>
      ))}
    </Container>
  );
}

