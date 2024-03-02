import { create } from 'zustand';

export type IMember = {
  channels_id: string | null;
  created_at: string;
  id: string;
  role: 'ADMIN' | 'GUEST';
  user_id: string | null;
  channels: {
    created_at: string;
    id: string;
    name: string;
  } | null;
};

// export type IChannel = {
//   id: string;
//   created_at: string;
//   name: string;
// }

interface MemberState {
  members: IMember[];
  actionChannel: IMember | undefined;
  optimisticIds: string[];
  addMember: (channel: IMember) => void;
  deleteChannel: (channelId: string) => void;
  setMembers: (channels: IMember[]) => void;
  setActionChannel: (channel: IMember | undefined) => void;
  setOptimisticIds: (id: string) => void;
}

//Basically...
/* 
const [channel, setChannel(addChannel)] = useState<IChannel>(?);
const [channels, setChannels] = useState<IChannel[]>([])
const newChannels = {single value of new channel}
const addChannel = setChannels([...channels, newChannel])
const setChannels = setChannels([...channels, ...newChannels])
*/

export const useMember = create<MemberState>()((set) => ({
  members: [],
  actionChannel: undefined,
  optimisticIds: [],
  addMember: (newMember) =>
    set((state) => ({
      members: [...state.members, newMember],
    })),
  deleteChannel: (channelId) =>
    set((state) => {
      return {
        members: state.members.filter(
          (member) => member.channels?.id !== channelId,
        ),
      };
    }),
  setMembers: (members) =>
    set((state) => ({
      members: [...members, ...state.members],
    })),
  setActionChannel: (member) => set(() => ({ actionChannel: member })),
  setOptimisticIds: (id: string) =>
    set((state) => ({ optimisticIds: [...state.optimisticIds, id] })),
}));
