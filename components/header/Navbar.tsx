import HeaderButton from "$store/islands/HeaderButton.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import Button from "$store/components/ui/Button.tsx";
import NavItem from "./NavItem.tsx";
import { navbarHeight } from "./constants.ts";
import type { INavItem } from "./NavItem.tsx";
import type { Props as SearchbarProps } from "$store/components/search/Searchbar.tsx";
import HeaderSearchMenu from "$store/islands/HeaderSearchMenu.tsx";

function Navbar({ items, searchbar }: {
  items: INavItem[];
  searchbar: SearchbarProps;
}) {
  return (
    <>
      {/* Mobile Version */}
      <div
        class={`md:hidden flex flex-row justify-between items-center h-[${navbarHeight}] border-b-1 w-full px-2 gap-2 bg-menu shadow-menu z-10`}
      >
        

        <a
          href="/"
          class={`flex-grow w-[30px] inline-flex items-center min-h-[${navbarHeight}]`}
          aria-label="Store logo"
        >
          <img class="w-[30px]" src="/lego-logo-m.png"/>
          <HeaderButton variant="menu" />
        </a>
        
        <div class="flex gap-1">

        </div>
      </div>

      {/* Desktop Version */}
      <div class="hidden md:flex flex-row justify-between items-center border-b-1 border-default w-full pl-2 pr-3 h-[70px] bg-menu shadow-menu z-10">
        <div class="flex-none w-44">
          <a href="/" aria-label="Store logo" class=" ml-[120px] block px-4 py-3 w-[160px] border-menu-separator border-r">
            <img class="w-[155px]" src="/lego-logo.png" width="160px"/>
          </a>
        </div>
        <div class="flex-auto flex justify-center">
          {items.map((item) => <NavItem item={item} />)}
        </div>
        <div class="flex-none w-44 flex items-center justify-end gap-2">
          <HeaderButton variant="search" />
          <HeaderSearchMenu searchbar={searchbar} />
          
        </div>
      </div>
    </>
  );
}

export default Navbar;
