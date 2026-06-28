import { Check, Copy } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import type { Message } from '@/types/chat';

const SUGGESTIONS = [
   "What's your experience with React & TypeScript?",
   'Tell me about your international projects',
   'What makes you a strong remote engineer?',
   'Walk me through a challenging project',
];

type Props = {
   messages: Message[];
   onSuggestion?: (text: string) => void;
};

const ChatMessages = ({ messages, onSuggestion }: Props) => {
   const bottomRef = useRef<HTMLDivElement>(null);

   useEffect(() => {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
   }, [messages]);

   if (messages.length === 0) {
      return (
         <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6 text-center px-4">
            <div className="relative">
               <img
                  src="/salman.png"
                  alt="Salman Rahman"
                  className="w-20 h-20 rounded-full object-cover object-top ring-4 ring-primary/20 shadow-lg"
               />
               <span className="absolute bottom-1 right-1 size-3.5 rounded-full bg-emerald-400 ring-2 ring-white" />
            </div>
            <div>
               <h2 className="text-2xl font-bold tracking-tight mb-1 text-foreground">
                  Hi, I'm Salman 👋
               </h2>
               <p className="text-sm text-muted-foreground max-w-sm">
                  Senior Frontend Engineer with 9+ years of experience. Ask me
                  anything about my work, skills, or availability.
               </p>
            </div>
            {onSuggestion && (
               <div className="grid grid-cols-2 gap-2 w-full max-w-lg">
                  {SUGGESTIONS.map((s) => (
                     <button
                        key={s}
                        onClick={() => onSuggestion(s)}
                        className="text-left text-sm px-4 py-3 rounded-xl border border-border bg-card hover:bg-accent hover:border-primary/30 hover:text-foreground transition-colors duration-150 leading-snug text-muted-foreground"
                     >
                        {s}
                     </button>
                  ))}
               </div>
            )}
         </div>
      );
   }

   return (
      <div className="flex flex-col gap-4 pb-2">
         {messages.map((message, index) => (
            <MessageBubble key={index} message={message} />
         ))}
         <div ref={bottomRef} />
      </div>
   );
};

type MessageBubbleProps = {
   message: Message;
};

const MessageBubble = ({ message }: MessageBubbleProps) => {
   const [copied, setCopied] = useState(false);
   const isBot = message.role === 'bot';

   const handleCopy = async () => {
      await navigator.clipboard.writeText(message.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
   };

   return (
      <div
         className={`flex gap-2.5 ${isBot ? 'items-start' : 'flex-row-reverse items-end'}`}
      >
         {isBot && (
            <img
               src="/salman.png"
               alt="Salman"
               className="w-7 h-7 rounded-full object-cover object-top shrink-0 mt-0.5 ring-1 ring-primary/20"
            />
         )}
         <div className="group relative max-w-[80%]">
            <div
               className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                  isBot
                     ? 'bg-muted text-foreground rounded-tl-sm'
                     : 'text-primary-foreground rounded-br-sm'
               }`}
               style={!isBot ? { backgroundColor: '#2e7d96' } : undefined}
            >
               {isBot ? (
                  <div className="prose prose-sm max-w-none [&_p:last-child]:mb-0">
                     <ReactMarkdown>{message.content}</ReactMarkdown>
                  </div>
               ) : (
                  <p className="whitespace-pre-wrap">{message.content}</p>
               )}
            </div>
            {isBot && (
               <button
                  onClick={handleCopy}
                  className="absolute -bottom-5 left-0 flex items-center gap-1 text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity hover:text-foreground"
               >
                  {copied ? (
                     <Check className="size-3" />
                  ) : (
                     <Copy className="size-3" />
                  )}
                  {copied ? 'Copied!' : 'Copy'}
               </button>
            )}
         </div>
      </div>
   );
};

export default ChatMessages;
