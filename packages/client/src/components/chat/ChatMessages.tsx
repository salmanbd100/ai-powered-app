import { Bot, Check, Copy, Sparkles } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import type { Message } from '@/types/chat';

const SUGGESTIONS = [
   'Explain a complex concept simply',
   'Help me brainstorm ideas',
   'Review my code for improvements',
   'Write something creative',
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
            <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 text-primary">
               <Sparkles className="size-7" />
            </div>
            <div>
               <h2 className="text-2xl font-semibold tracking-tight mb-1">
                  How can I help you?
               </h2>
               <p className="text-sm text-muted-foreground">
                  Ask me anything, or pick a suggestion to get started.
               </p>
            </div>
            {onSuggestion && (
               <div className="grid grid-cols-2 gap-2 w-full max-w-lg">
                  {SUGGESTIONS.map((s) => (
                     <button
                        key={s}
                        onClick={() => onSuggestion(s)}
                        className="text-left text-sm px-4 py-3 rounded-xl border bg-card hover:bg-muted transition-colors duration-150 leading-snug"
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
         className={`flex gap-2 ${isBot ? 'items-start' : 'flex-row-reverse items-end'}`}
      >
         {isBot && (
            <div className="flex items-center justify-center w-7 h-7 rounded-full bg-primary/10 text-primary shrink-0 mt-0.5">
               <Bot className="size-3.5" />
            </div>
         )}
         <div className="group relative max-w-[80%]">
            <div
               className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                  isBot
                     ? 'bg-muted text-foreground rounded-tl-sm'
                     : 'bg-primary text-primary-foreground rounded-br-sm'
               }`}
            >
               {isBot ? (
                  <div className="prose prose-sm max-w-none dark:prose-invert [&_p:last-child]:mb-0">
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
