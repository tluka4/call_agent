import React from "react";
import { useVoiceBot } from "../context/VoiceBotContextProvider";

function Transcript() {
  const { messages } = useVoiceBot();

  const lastMessage = messages[messages.length - 1];

  return (
    null
  );
}

export default Transcript;
