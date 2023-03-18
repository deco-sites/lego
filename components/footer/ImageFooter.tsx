import type { Image as LiveImage } from "deco-sites/std/components/types.ts";

export interface ImageFooter {
  src: LiveImage;
  alt: string;
  title: string;
}
export type Item = ImageFooter;

export type Section = {
  children: Item[];
};

export default function ImageFooter({ item }: { item: Item }) {
  return (
    <div class="py-1.5 px-2.5">
      <img
        class="max-h-[200px]"
        src={(item as ImageFooter).src}
        alt={(item as ImageFooter).alt}
        title={(item as ImageFooter).title}
      />
    </div>
  );
}
