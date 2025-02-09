import { availableVoices } from "app/lib/constants";
import type { Voice } from "../../utils/deepgramUtils";
import styles from "./VoiceSelector.module.scss";
import { useStsQueryParams } from "app/hooks/UseStsQueryParams";
import { useEffect, useState, type FC } from "react";

const ANIMATION_DURATION = 200;

interface Props {
  className?: string;
  showLabel?: boolean;
  collapsible?: boolean;
}

const VoiceSelector: FC<Props> = ({ className = "", showLabel, collapsible }) => {
  const { voice, updateVoiceUrlParam } = useStsQueryParams();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // Always select Arcas
  useEffect(() => {
    if (voice !== "aura-arcas-en") {
      updateVoiceUrlParam("aura-arcas-en");
    }
  }, [voice, updateVoiceUrlParam]);

  return (
    <div className={`${className}`}>
      {showLabel && <div className="text-gray-450 text-sm mr-2"></div>}
      {/* Empty div for styling purposes (No images, No buttons) */}
      <div className={styles["voice-list"]}></div>
    </div>
  );
};

export default VoiceSelector;
