import { X } from 'lucide-react';
import { useChat } from '@/hooks/useChat';
import ChatInput from './ChatInput';
import ChatMessages from './ChatMessages';
import TypingIndicator from './TypingIndicator';

const ChatBot = () => {
   const { messages, isLoading, error, sendMessage, dismissError } = useChat();

   return (
      <div className="flex flex-col h-full pt-4">
         <div className="flex-1 overflow-y-auto px-1 scroll-smooth">
            <ChatMessages messages={messages} onSuggestion={sendMessage} />
            {isLoading && <TypingIndicator />}
            {error && (
               <div className="flex items-center gap-2 mt-3 px-3 py-2 text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-lg">
                  <span className="flex-1">{error}</span>
                  <button
                     onClick={dismissError}
                     className="shrink-0 hover:opacity-70 transition-opacity"
                     aria-label="Dismiss error"
                  >
                     <X className="size-3.5" />
                  </button>
               </div>
            )}
         </div>
         <div className="pt-3">
            <ChatInput
               onSubmit={({ prompt }) => sendMessage(prompt)}
               isLoading={isLoading}
            />
         </div>
      </div>
   );
};

export default ChatBot;
