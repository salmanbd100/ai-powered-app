import { RotateCcw } from 'lucide-react';
import { useChat } from '@/hooks/useChat';
import ChatBot from './components/chat/ChatBot';

function App() {
   const { messages, isLoading, error, sendMessage, dismissError, clearChat } =
      useChat();

   return (
      <div className="flex flex-col h-screen bg-background">
         <header className="flex items-center gap-3 px-6 py-3 border-b shrink-0 bg-white shadow-sm">
            <div className="relative shrink-0">
               <img
                  src="/salman.jpg"
                  alt="Salman Rahman"
                  className="w-10 h-10 rounded-full object-cover object-top ring-2 ring-primary/20"
               />
               <span className="absolute bottom-0 right-0 size-2.5 rounded-full bg-emerald-400 ring-2 ring-white" />
            </div>
            <div className="flex-1 min-w-0">
               <h1 className="font-semibold text-sm leading-none text-foreground">
                  Salman Rahman
               </h1>
               <p className="text-xs text-muted-foreground mt-0.5 truncate">
                  Senior Frontend Engineer · React · TypeScript · Next.js
               </p>
            </div>
            <div className="flex items-center gap-3">
               {messages.length > 0 && (
                  <button
                     onClick={clearChat}
                     disabled={isLoading}
                     title="Clear conversation"
                     className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground disabled:opacity-40 transition-colors px-2.5 py-1.5 rounded-lg hover:bg-muted"
                  >
                     <RotateCcw className="size-3.5" />
                     <span className="hidden sm:inline">New chat</span>
                  </button>
               )}
               <div className="hidden sm:flex items-center gap-1.5 text-xs text-emerald-600 font-medium">
                  <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Available for opportunities
               </div>
            </div>
         </header>
         <main className="flex-1 overflow-hidden w-full max-w-3xl mx-auto px-4 pb-4">
            <ChatBot
               messages={messages}
               isLoading={isLoading}
               error={error}
               onSendMessage={sendMessage}
               onDismissError={dismissError}
            />
         </main>
      </div>
   );
}

export default App;
