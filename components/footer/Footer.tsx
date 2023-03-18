import Icon, { AvailableIcons } from "$store/components/ui/Icon.tsx";
import Text from "$store/components/ui/Text.tsx";
import Container from "$store/components/ui/Container.tsx";
import type { ComponentChildren } from "preact";
import ImageFooter, { ImageFooter as ImageFooterType } from "./ImageFooter.tsx";
export type IconItem = { icon: AvailableIcons };
export type StringItem = {
  label: string;
  href: string;
};

export type Item = StringItem | IconItem;

export type Section = {
  label: string;
  children: Item[];
};

function hasIcon(items: Item[]): boolean {
  return items.some((item) => isIcon(item));
}

const isIcon = (item: Item): item is IconItem =>
  // deno-lint-ignore no-explicit-any
  typeof (item as any)?.icon === "string";

function SectionItem({ item }: { item: Item }) {
  return (
    <Text variant="caption" tone="default-inverse">
      {isIcon(item)
        ? (
          <div class="py-1.5 px-2.5">
            <Icon
              id={item.icon}
              width={60}
              height={60}
            />
          </div>
        )
        : (
          <a
            href={item.href}
            class="text-black"
          >
            {item.label}
          </a>
        )}
    </Text>
  );
}

function FooterContainer(
  { children, class: _class = "" }: {
    class?: string;
    children: ComponentChildren;
  },
) {
  return <div class={`py-6 px-4 sm:py-12 sm:px-0 ${_class}`}>{children}</div>;
}

export interface Props {
  sections?: Section[];
  imageFooter?: ImageFooterType[];
}

function Footer({ sections = [], imageFooter }: Props) {
  return (
    <footer class="w-full flex flex-col divide-y-1 divide-default">
      {JSON.stringify(imageFooter, null, 2)}
      <div>
        <Container class="w-full flex flex-col divide-y-1 divide-default">
          <FooterContainer>
            {/* Desktop view */}
            <ul class="hidden sm:flex flex-row gap-20">
              {sections.map((section) => (
                <li>
                  <div>
                    <Text
                      class={"text-black"}
                      variant="heading-3"
                      tone="default-inverse"
                    >
                      {section.label}
                    </Text>
                    <ul
                      class={hasIcon(section.children)
                        ? "grid grid-cols-4 gap-2"
                        : "flex flex-col"}
                    >
                      {section.children.map((item) => (
                        <li class={"h-10 w-20"}>
                          <SectionItem item={item} />
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              ))}
            </ul>

            {/* Mobile view */}
            <ul class="flex flex-col sm:hidden sm:flex-row gap-4">
              {sections.map((section) => (
                <li>
                  <Text variant="body">
                    {section.label}
                    <ul
                      class={hasIcon(section.children)
                        ? "grid grid-cols-4 gap-2 text-black"
                        : "flex flex-col"}
                    >
                      {section.children.map((item) => (
                        <li class={"text-black"}>
                          <SectionItem item={item} />
                        </li>
                      ))}
                    </ul>
                  </Text>
                </li>
              ))}
            </ul>
            {/* <ImageFooter item={[]}/> */}
          </FooterContainer>
        </Container>
      </div>
    </footer>
  );
}

export default Footer;
