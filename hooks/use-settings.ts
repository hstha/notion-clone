import { create } from "zustand";

type SettingStore = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

const useSettings = create<SettingStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export const getIsOpen = (store: SettingStore) => store.isOpen;
export const getOnOpen = (store: SettingStore) => store.onOpen;
export const getOnClose = (store: SettingStore) => store.onClose;

export default useSettings;
