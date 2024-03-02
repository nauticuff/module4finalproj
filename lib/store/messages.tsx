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
  messages: IMessage[];
  actionMessage: IMessage | undefined;
  page: number;
  hasMoreMessages: boolean;
  optimisticIds: string[];
  addMessage: (message: IMessage) => void;
  editMessage: (message: IMessage) => void;
  deleteMessage: (messageId: string) => void;
  setMessages: (messages: IMessage[]) => void;
  setActionMessage: (message: IMessage | undefined) => void;
  setOptimisticIds: (id: string) => void;
}

export const useMessage = create<MessageState>()((set) => ({
  messages: [],
  actionMessage: undefined,
  page: 1,
  hasMoreMessages: true,
  optimisticIds: [],
  addMessage: (newMessage) =>
    set((state) => ({
      messages: [...state.messages, newMessage],
    })),
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
  deleteMessage: (messageId) =>
    set((state) => {
      return {
        messages: state.messages.filter((message) => message.id !== messageId),
      };
    }),
  setMessages: (messages) =>
    set((state) => ({
      messages: [...messages, ...state.messages],
      page: state.page + 1,
      hasMoreMessages: messages.length >= MESSAGE_LIMIT,
    })),
  setActionMessage: (message) => set(() => ({ actionMessage: message })),
  setOptimisticIds: (id: string) =>
    set((state) => ({ optimisticIds: [...state.optimisticIds, id] })),
}));
