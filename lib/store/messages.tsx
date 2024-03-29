import { create } from 'zustand';
import { MESSAGE_LIMIT } from '../constant';

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
  hasMoreMessages: boolean;
  page: number;
  messages: IMessage[];
  actionMessage: IMessage | undefined;
  optimisticIds: string[];
  addMessage: (message: IMessage) => void;
  setActionMessage: (message: IMessage | undefined) => void;
  deleteMessage: (messageId: string) => void;
  editMessage: (message: IMessage) => void;
  setOptimisticIds: (id: string) => void;
  setMessages: (messages: IMessage[]) => void;
}

export const useMessage = create<MessageState>()((set) => ({
  hasMoreMessages: true,
  page: 1,
  messages: [],
  optimisticIds: [],
  actionMessage: undefined,
  setMessages: (messages) =>
    set((state) => ({
      messages: [...messages, ...state.messages],
      page: state.page + 1,
      hasMoreMessages: messages.length >= MESSAGE_LIMIT
    })),
  setOptimisticIds: (id: string) =>
    set((state) => ({ optimisticIds: [...state.optimisticIds, id] })),
  addMessage: (newMessage) =>
    set((state) => ({
      messages: [...state.messages, newMessage],
    })),
  setActionMessage: (message) => set(() => ({ actionMessage: message })),
  deleteMessage: (messageId) =>
    set((state) => {
      return {
        messages: state.messages.filter((message) => message.id !== messageId),
      };
    }),
  editMessage: (editMessage) =>
    set((state) => {
      return {
        messages: state.messages.filter((message) => {
          if (message.id === editMessage.id) {
            message.text = editMessage.text;
            message.is_edited = editMessage.is_edited;
          }
          return message;
        }),
      };
    }),
}));
