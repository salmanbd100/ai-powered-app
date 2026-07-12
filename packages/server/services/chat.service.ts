import OpenAI from 'openai';
import { conversationRepository } from '../repositories/conversation.repository';
import { SALMAN_PERSONA } from '../prompts/persona';

const client = new OpenAI({
   apiKey: process.env.OPENAI_API_KEY,
});

type ChatResponse = {
   id: string;
   message: string;
};

export const chatService = {
   async sendMessage(
      prompt: string,
      conversationId: string
   ): Promise<ChatResponse> {
      const response = await client.responses.create({
         model: 'gpt-4o-mini',
         instructions: SALMAN_PERSONA,
         input: prompt,
         temperature: 0.6,
         previous_response_id:
            conversationRepository.getLastRespondId(conversationId),
      });

      conversationRepository.setLastRespondId(conversationId, response.id);

      return { id: response.id, message: response.output_text };
   },
};
