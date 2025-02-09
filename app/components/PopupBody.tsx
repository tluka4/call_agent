import type { FC, ComponentPropsWithoutRef, KeyboardEventHandler } from "react";
import { useClickAway } from "@uidotdev/usehooks";

interface Props extends ComponentPropsWithoutRef<"div"> {
  onExit: () => void;
}

const PopupBody: FC<Props> = ({ onExit, ...props }) => {
  return null;
};

export default PopupBody;
