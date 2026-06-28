import { useRef, useState } from 'react';
import popSound from '@/assets/sounds/pop.mp3';
import notificationSound from '@/assets/sounds/notification.mp3';
import { chatApi } from '@/api/chat.api';
import type { Message } from '@/types/chat';

export const useChat = () => {
   const [messages, setMessages] = useState<Message[]>([]);
   const [isLoading, setIsLoading] = useState(false);
   const [error, setError] = useState('');

   const conversationId = useRef(crypto.randomUUID());
   const popAudio = useRef(new Audio(popSound));
   const notificationAudio = useRef(new Audio(notificationSound));

   popAudio.current.volume = 0.2;
   notificationAudio.current.volume = 0.2;

   const sendMessage = async (prompt: string) => {
      setMessages((prev) => [...prev, { content: prompt, role: 'user' }]);
      setIsLoading(true);
      setError('');
      popAudio.current.play().catch(() => {});

      try {
         const { message } = await chatApi.sendMessage({
            prompt,
            conversationId: conversationId.current,
         });
         setMessages((prev) => [...prev, { content: message, role: 'bot' }]);
         notificationAudio.current.play().catch(() => {});
      } catch {
         setError('Something went wrong. Please try again.');
      } finally {
         setIsLoading(false);
      }
   };

   const dismissError = () => setError('');

   return { messages, isLoading, error, sendMessage, dismissError };
};
