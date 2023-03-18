interface MenuArrowProps {
  direction: "up" | "down" | "left" | "right";
}

export default function MenuArrow({ direction = "right" }: MenuArrowProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={20}
      height={20}
      viewBox="0 -25 100 100"
      class={`absolute top-1/2 -translate-y-1/2 right-3  ${
        direction === "down"
          ? "rotate-90"
          : direction === "left"
          ? "rotate-180"
          : direction === "up"
          ? "-rotate-90"
          : "0"
      } transition-transform duration-700 ease`}
    >
      <path
        fill="#000"
        d="M24.9 75l50.2-50L25-25v22.2L52.8 25 25 52.7v11.2z"
      />
    </svg>
  );
}
