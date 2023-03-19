import Text from "$store/components/ui/Text.tsx";
import SliderControllerJS from "$store/islands/SliderJS.tsx";
import Slider from "$store/components/ui/Slider.tsx";
import { useId } from "preact/hooks";
import Button from "$store/components/ui/Button.tsx";
import HeaderButton from "$store/islands/HeaderButton.tsx";
import Icon from "$store/components/ui/Icon.tsx";

export interface Props {
  alerts: string[];
  /**
   * @title Autoplay interval
   * @description time (in seconds) to start the carousel autoplay
   */
  interval?: number;
}

function Alert({ alerts = [], interval = 5 }: Props) {
  const id = useId();

  return (
    <div id={id}>
      <Slider class="bg-badge gap-6 scrollbar-none bg-black-header justify-end">


    <Button
                as="a"
                variant="icon"
                href="/login"
                aria-label="Log in"
                
              >
                
                <img src="/icons/login-ico.png" width="30px" height="30px"/>
                <p style="color:white;font-size: 0.625em;font-weight: 700;">LOGIN</p>
                
              </Button>

              

              <HeaderButton variant="cart" />
               <p style="color:white;font-size: 0.625em;font-weight: 700;margin-left:-21px;">CARRINHO</p>


              


          <SliderControllerJS rootId={id} interval={interval && interval * 1e3} />
      </Slider>
    </div>
  );
}

export default Alert;
