import { create } from 'zustand';

export type IMessage = {
  created_at: string;
  id: string;
  is_edited: boolean;
  sent_by: string;
  text: string;
  users: {
    avatar_url: string;
    created_at: string;
    display_name: string;
    id: string;
  } | null;
};

interface MessageState {
  messages: IMessage[];
  actionMessage: IMessage | undefined;
  addMessage: (message: IMessage) => void;
  setActionMessage: (message: IMessage | undefined) => void;
  deleteMessage: (messageId: string) => void;
}

export const useMessage = create<MessageState>()((set) => ({
  messages: [],
  actionMessage: undefined,
  addMessage: (message) =>
    set((state) => ({ messages: [...state.messages, message] })),
  setActionMessage: (message) => set(() => ({ actionMessage: message })),
  deleteMessage: (messageId) =>
    set((state) => {
      return {
        messages: state.messages.filter((message) => message.id !== messageId),
      };
    }),
}));
