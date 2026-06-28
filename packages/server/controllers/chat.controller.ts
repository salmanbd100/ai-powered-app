import type { Request, Response } from 'express';
import z from 'zod';
import { chatService } from '../services/chat.service';

const chatSchema = z.object({
   prompt: z
      .string()
      .trim()
      .min(1, 'Prompt is required')
      .max(1000, 'Prompt is too long (max 1000 characters)'),
   conversationId: z.uuid(),
});

export const chatController = {
   async sendMessage(req: Request, res: Response) {
      const parsed = chatSchema.safeParse(req.body);
      if (!parsed.success) {
         res.status(400).json(z.treeifyError(parsed.error));
         return;
      }

      try {
         const { prompt, conversationId } = parsed.data;
         const { message } = await chatService.sendMessage(
            prompt,
            conversationId
         );
         res.json({ message });
      } catch {
         res.status(500).json({ error: 'Unable to process your request' });
      }
   },
};
