import { Bot } from 'lucide-react';

const TypingIndicator = () => {
   return (
      <div className="flex items-start gap-2 mt-1 mb-4">
         <div className="flex items-center justify-center w-7 h-7 rounded-full bg-primary/10 text-primary shrink-0 mt-0.5">
            <Bot className="size-3.5" />
         </div>
         <div className="flex items-center gap-1 px-4 py-3 bg-muted rounded-2xl rounded-tl-sm">
            <Dot delay={0} />
            <Dot delay={0.15} />
            <Dot delay={0.3} />
         </div>
      </div>
   );
};

const Dot = ({ delay }: { delay: number }) => (
   <div
      className="w-1.5 h-1.5 rounded-full bg-muted-foreground/60 animate-bounce"
      style={{ animationDelay: `${delay}s`, animationDuration: '0.8s' }}
   />
);

export default TypingIndicator;
