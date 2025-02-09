"use client";
import { Suspense, useState } from "react";
import { App } from "./components/App";
import Intelligence from "./components/Intelligence";
import { stsConfig } from "./lib/constants";
import {
  isConversationMessage,
  useVoiceBot,
  VoiceBotStatus,
} from "./context/VoiceBotContextProvider";
import { withBasePath } from "./utils/deepgramUtils";
import PromptSuggestions from "./components/PromptSuggestions";
import Conversation from "./components/Conversation";
import VoiceSelector from "./components/VoiceSelector/VoiceSelector";
import { isMobile } from "react-device-detect";
import MobileMenu from "./components/MobileMenu";
import Latency from "./components/Latency";
import InstructionInput from "./components/InstructionInput";
import Header from "./components/Header";
import { useStsQueryParams } from "./hooks/UseStsQueryParams";
import { useDeepgram } from "./context/DeepgramContextProvider";
import BehindTheScenes from "./components/BehindTheScenes";

const DesktopMenuItems = () => {
  const { instructions } = useStsQueryParams();
  return null;
};

export default function Home() {
  const { messages, status } = useVoiceBot();
  const { rateLimited } = useDeepgram();
  const [conversationOpen, setConversationOpen] = useState(false);
  const [behindTheScenesOpen, setBehindTheScenesOpen] = useState(false);

  const toggleConversation = () => setConversationOpen(!conversationOpen);

  const has4ConversationMessages = messages.filter(isConversationMessage).length > 3;

  return (
    <main className="h-dvh flex flex-col justify-between pb-12 md:pb-0">
      <div className="flex flex-col flex-grow">
        <div className="h-[20vh] md:h-auto flex-shrink-0">
          <Suspense>
            <Header logoHref={withBasePath("/")} />
          </Suspense>
        </div>

        <div className="flex flex-grow relative">
          {/* Main Content */}
          <div className="flex-1 flex justify-center items-start md:items-center">
            <div className="md:h-full flex flex-col min-w-[80vw] md:min-w-[30vw] max-w-[80vw] justify-center">
              <div className="flex md:order-last md:mt-4 justify-center">
                <Intelligence />
              </div>
              <Suspense>
                <App
                  defaultStsConfig={stsConfig}
                  className="flex-shrink-0 h-auto items-end"
                  requiresUserActionToInitialize={isMobile}
                />
              </Suspense>

              {/* Speech Bubbles */}
              {!has4ConversationMessages &&
                !rateLimited &&
                status !== VoiceBotStatus.SLEEPING &&
                status !== VoiceBotStatus.NONE && (
                  <div>
                    {/* Desktop */}
                    <div className="hidden md:flex justify-center text-gray-450"></div>
                    <div className="hidden md:grid max-w-max mx-auto grid-cols-3 gap-4 mt-6 relative">
                      <PromptSuggestions />
                    </div>
                    {/* Mobile */}
                    <div className="flex md:hidden justify-center text-gray-450 mt-2">

                    </div>
                    <div className="scrollable-element w-full flex md:hidden gap-4 items-center mt-4 overflow-x-auto -mr-10">
                      <PromptSuggestions />
                    </div>
                  </div>
                )}
            </div>
          </div>

          {/* Right Panel (Desktop only) */}
          <div
            className="hidden md:block p-6 pl-0 max-h-screen overflow-hidden"
            style={{ zIndex: 11 }}
          >
            <div className="flex flex-col gap-4">
              {behindTheScenesOpen ? (
                <BehindTheScenes onClose={() => setBehindTheScenesOpen(false)} />
              ) : null}
            </div>
          </div>
        </div>
      </div>

      {/* Conversation */}
      {conversationOpen && <Conversation toggleConversation={toggleConversation} />}

      {/* Desktop Bottom Stuff */}
      <div className={`hidden md:flex z-0 absolute bottom-0 left-8 right-[320px] mb-8`}>
        <div className="space-y-4">
          <Suspense>
            <DesktopMenuItems />
          </Suspense>
        </div>
        <Suspense>
          <Latency />
        </Suspense>
      </div>

      {/* Mobile Bottom Stuff */}
      <div className={`flex flex-col z-0 items-center md:hidden`}></div>

      {/* Mobile Voice Selector */}
      <Suspense>
        <VoiceSelector
          className={`absolute md:hidden bottom-0 left-0 pb-[16px] pl-[16px]`}
          collapsible
        />
        <MobileMenu className="fixed md:hidden bottom-4 right-4 text-gray-200" />
      </Suspense>
    </main>
  );
}
