import { create } from "zustand";

type SearchStore = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  toggle: () => void;
};

const useSearch = create<SearchStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
}));

export const getToggle = (store: SearchStore) => store.toggle;
export const getIsOpen = (store: SearchStore) => store.isOpen;
export const getOnOpen = (store: SearchStore) => store.onOpen;
export const getOnClose = (store: SearchStore) => store.onClose;

export default useSearch;
