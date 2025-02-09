import { useState, type ReactNode } from "react";
import PopupBody from "app/components/PopupBody";
import { XMarkIcon } from "app/components/icons/XMarkIcon.js";

type Props = {
  buttonIcon: ReactNode;
  buttonText: ReactNode;
  popupContent: ReactNode;
  tooltipText?: string | null;
};

const PopupButton = ({ buttonIcon, buttonText, popupContent, tooltipText }: Props) => {
  return null;
};

export default PopupButton;
