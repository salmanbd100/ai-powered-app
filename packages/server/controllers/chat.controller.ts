import type { Request, Response } from 'express';
import z from 'zod';
import { chatService } from '../services/chat.services';

// Implementation detail
const chatShema = z.object({
   prompt: z
      .string()
      .trim()
      .min(1, 'Prompt is required')
      .max(1000, 'Promt is too long (Max 1000 character)'),
   conversationId: z.uuid(),
});

// Public interface
export const chatController = {
   async sendMessage(req: Request, res: Response) {
      const parseResult = chatShema.safeParse(req.body);
      if (!parseResult.success) {
         res.status(400).json(parseResult.error.format());
         return;
      }
      try {
         const { prompt, conversationId } = req.body;

         const { message } = await chatService.sendMessage(
            prompt,
            conversationId
         );

         res.json({ message });
      } catch (error) {
         res.status(500).json('Unable to send the response');
      }
   },
};
