const PromptSuggestion = ({ icon, purpose, question }) => (
  <div className="flex-shrink-0 flex gap-2 p-4 pr-8 bg-[#88888C33;] rounded-lg">
    {icon}
    <div className="text-sm text-gray-1">
      {purpose}
      <div className="text-gray-0">{question}</div>
    </div>
  </div>
);

export default function PromptSuggestions() {
  return (
    null
  );
}
