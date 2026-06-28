import { ArrowUp } from 'lucide-react';
import { useEffect, useRef, type KeyboardEvent } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '../ui/button';

export type ChatFormData = {
   prompt: string;
};

type Props = {
   onSubmit: (data: ChatFormData) => void;
   isLoading?: boolean;
};

const MAX_LENGTH = 1000;

const ChatInput = ({ onSubmit, isLoading }: Props) => {
   const { register, handleSubmit, reset, watch, formState } =
      useForm<ChatFormData>();
   const textareaRef = useRef<HTMLTextAreaElement>(null);
   const promptValue = watch('prompt', '');
   const charCount = promptValue?.length ?? 0;
   const showCounter = charCount > MAX_LENGTH * 0.8;

   const { ref: registerRef, ...rest } = register('prompt', {
      required: true,
      validate: (v) => v.trim().length > 0,
   });

   useEffect(() => {
      const el = textareaRef.current;
      if (!el) return;
      el.style.height = 'auto';
      el.style.height = `${el.scrollHeight}px`;
   }, [promptValue]);

   const submit = handleSubmit((data) => {
      reset({ prompt: '' });
      if (textareaRef.current) textareaRef.current.style.height = 'auto';
      onSubmit(data);
   });

   const handleKeyDown = (e: KeyboardEvent<HTMLFormElement>) => {
      if (e.key === 'Enter' && !e.shiftKey) {
         e.preventDefault();
         submit();
      }
   };

   return (
      <form
         onSubmit={submit}
         onKeyDown={handleKeyDown}
         className="flex flex-col gap-2 border rounded-2xl px-4 py-3 bg-background shadow-sm focus-within:ring-2 focus-within:ring-ring/30 transition-shadow"
      >
         <textarea
            {...rest}
            ref={(el) => {
               registerRef(el);
               textareaRef.current = el;
            }}
            disabled={isLoading}
            autoFocus
            rows={1}
            className="w-full resize-none bg-transparent focus:outline-none text-sm placeholder:text-muted-foreground disabled:opacity-50 max-h-40 overflow-y-auto leading-relaxed"
            placeholder="Ask anything..."
            maxLength={MAX_LENGTH}
         />
         <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">
               {showCounter ? (
                  <span
                     className={
                        charCount >= MAX_LENGTH ? 'text-destructive' : ''
                     }
                  >
                     {charCount}/{MAX_LENGTH}
                  </span>
               ) : (
                  'Shift+Enter for new line'
               )}
            </span>
            <Button
               type="submit"
               disabled={isLoading || !formState.isValid}
               size="icon-sm"
               className="rounded-full shrink-0"
            >
               <ArrowUp className="size-3.5" />
            </Button>
         </div>
      </form>
   );
};

export default ChatInput;
