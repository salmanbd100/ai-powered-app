import axios from 'axios';
import type { ChatApiResponse, ChatRequest } from '@/types/chat';

export const chatApi = {
   sendMessage: (payload: ChatRequest): Promise<ChatApiResponse> =>
      axios.post<ChatApiResponse>('/api/chat', payload).then((res) => res.data),
};
