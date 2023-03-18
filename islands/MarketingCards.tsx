import { useState } from "preact/hooks";
import Container from "$store/components/ui/Container.tsx";
import Image from "deco-sites/std/components/Image.tsx";
import Text from "$store/components/ui/Text.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import type { Image as LiveImage } from "deco-sites/std/components/types.ts";

export interface Card {
  /**
   * @title Imagem
   */
  src: LiveImage;
  /**
   * @title Texto Alternativo
   */
  alt: string;
  /**
   * @title Título
   * @description Título exibido abaixo da imagem
   */
  title: string;
  /**
   * @title Subtítulo
   * @description Subtítulo exibido abaixo da imagem
   */
  subtitle: string;
  /**
   * @title Texto do Botão
   */
  label: string;
  /**
   * @title Link do Botão
   */
  href: string;
}

export interface Props {
  cards: Card[];
}

export interface CardState {
  index: number;
  isClosed: boolean;
}

export default function MarketingCards({ cards = [] }: Props) {
  const [openItems, setOpenItems] = useState(Array(cards.length).fill(false));

  const handleClick = (index: number) => {
    setOpenItems((prev) => {
      const next = [...prev];
      next[index] = !next[index];
      return next;
    });
  };

  return (
    <Container class="grid grid-cols-1 md:grid-cols-2 max-w-6xl p-4 gap-6 md:gap-10">
      {cards.map(({ src, alt, title, subtitle, href, label }, index) => (
        <div
          class={`flex flex-col justify-center ${
            !openItems[index] ? "items-start" : "items-center"
          } md:items-center bg-card px-2 py-3 md:p-7 shadow-card relative`}
        >
          <Icon
            id="MarketingCardPlus"
            width={24}
            height={24}
            class="md:hidden absolute top-3 right-4 border-1 border-black rounded-1/2 p-1 cursor-pointer"
            role="button"
            onClick={() => handleClick(index)}
          />
          <Image
            src={src}
            alt={alt}
            width={436}
            height={205}
            class={`${openItems[index] ? "block" : "hidden"} md:block`}
          />
          <Text variant="heading-3" class="ml-3 md:ml-0 text-center font-bold text-lg">
            {title}
          </Text>
          <Text
            variant="body"
            class={`${
              openItems[index] ? "block" : "hidden"
            } md:block text-center text-sm w-3/4 `}
          >
            {subtitle}
          </Text>
          <a
            href={href}
            class={`${
              openItems[index] ? "block" : "hidden"
            } md:block mt-4 block bg-gradient-to-t from-card-cta-dark to-card-cta-light shadow-card-cta border-1 border-black font-bold text-default-inverse text-xs py-2 px-4`}
          >
            {label}
          </a>
        </div>
      ))}
    </Container>
  );
}
