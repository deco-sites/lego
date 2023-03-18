import LiveImage from "deco-sites/std/components/Image.tsx";
import type { ComponentChildren } from "preact";

export interface ImageFooter {
  src: LiveImage;
  alt: string;
  title: string;
}
export type Item = ImageFooter;

export type Section = {
  children: Item[];
};

function SectionItem({ item }: { item: Item }) {
  return (
    <div class="py-1.5 px-2.5">
      <img
        class="max-h-200"
        src={(item as ImageFooter).src}
        alt={(item as ImageFooter).alt}
        title={(item as ImageFooter).title}
      />
    </div>
  );
}
