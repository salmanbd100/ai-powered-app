import { Sparkles } from 'lucide-react';
import ChatBot from './components/chat/ChatBot';

function App() {
   return (
      <div className="flex flex-col h-screen bg-background">
         <header className="flex items-center gap-3 px-6 py-3 border-b shrink-0">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary text-primary-foreground">
               <Sparkles className="size-4" />
            </div>
            <div className="flex-1">
               <h1 className="font-semibold text-sm leading-none">
                  AI Assistant
               </h1>
               <p className="text-xs text-muted-foreground mt-0.5">
                  Powered by OpenAI
               </p>
            </div>
            <div className="flex items-center gap-1.5">
               <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
               <span className="text-xs text-muted-foreground">Online</span>
            </div>
         </header>
         <main className="flex-1 overflow-hidden w-full max-w-3xl mx-auto px-4 pb-4">
            <ChatBot />
         </main>
      </div>
   );
}

export default App;
