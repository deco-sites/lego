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
      <Slider class="bg-badge gap-6 scrollbar-none bg-black-header">
        {alerts.map((alert) => (
          <Text
            class="flex justify-center items-center w-screen h-[38px]"
            variant="caption"
            tone="default-inverse"
          >
            {alert}
          </Text>
          
        ))}

               <Button
                as="a"
                variant="icon"
                href="/login"
                aria-label="Log in"
              >
                <Icon id="User" width={20} height={20} strokeWidth={0.4} />
              </Button>
              <HeaderButton variant="cart" />

          <SliderControllerJS rootId={id} interval={interval && interval * 1e3} />
      </Slider>
    </div>
  );
}

export default Alert;
