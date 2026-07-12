const TypingIndicator = () => {
   return (
      <div className="flex items-start gap-2.5 mt-1 mb-4">
         <img
            src="/salman.jpg"
            alt="Salman"
            className="w-7 h-7 rounded-full object-cover object-top shrink-0 mt-0.5 ring-1 ring-primary/20"
         />
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
