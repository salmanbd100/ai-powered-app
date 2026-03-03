// Implementation details
const conversations = new Map<string, string>();

// Public interface
export const conversationRepository = {
   getLastRespondId(conversationId: string) {
      return conversations.get(conversationId);
   },

   setLastRespondId(conversationId: string, responseId: string) {
      return conversations.set(conversationId, responseId);
   },
};
