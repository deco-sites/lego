import Text from "$store/components/ui/Text.tsx";
import Image from "deco-sites/std/components/Image.tsx";
import type { Image as LiveImage } from "deco-sites/std/components/types.ts";
import { useEffect, useRef, useState } from "preact/hooks";
import MenuArrow from "../components/ui/MenuArrow.tsx";

export interface Item {
  image: LiveImage;
  alt: string;
  title: string;
  url: string;
}

export interface Props {
  menuTitle: string;
  items: Item[];
}

export default function AgeMenu(
  { menuTitle = "Compre por Idade", items = [] }: Props,
) {
  const [open, setOpen] = useState(true);
  const [height, setHeight] = useState(0);
  const content = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (content.current) {
      setHeight(content.current?.scrollHeight);
    }
  }, [open]);

  return (
    <div class="w-full md:-mt-12">
      <button
        type="button"
        class="w-full h-12 md:w-[440px] md:m-auto flex justify-center items-center relative px-3 font-bold text-lg focus:outline-none bg-menu shadow-menu z-10"
        onClick={() => setOpen(!open)}
      >
        {menuTitle}
        <MenuArrow direction={open ? "up" : "down"} />
      </button>
      <div
        class={`overflow-hidden ${
          open ? `max-h-[${height}px]` : "max-h-0"
        } transition-max-height duration-700 ease bg-menu shadow-menu`}
        ref={content}
      >
        <div class="py-5 grid md:grid-cols-5 md:max-w-6xl md:m-auto">
          {items.map(({ image, alt, title, url }) => (
            <a
              href={url}
              class="flex items-center border-t border-menu-separator md:flex-col md:h-full p-4 md:px-0 md:py-6 md:border-r md:border-t-0 first-child:md:border-l"
            >
              <Image
                src={image}
                alt={alt}
                width={456}
                height={215}
                class="max-w-[150px]"
              />
              <Text variant="body" class="font-black pl-3 text-lg md:text-[18px] md:mt-3">
                {title}
              </Text>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
