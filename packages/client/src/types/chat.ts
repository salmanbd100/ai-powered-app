export type MessageRole = 'user' | 'bot';

export type Message = {
   content: string;
   role: MessageRole;
};

export type ChatRequest = {
   prompt: string;
   conversationId: string;
};

export type ChatApiResponse = {
   message: string;
};
