import { create } from "zustand";

type CoverImageStore = {
  url?: string;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onReplace: (url: string) => void;
};

const useCoverImage = create<CoverImageStore>((set) => ({
  url: undefined,
  isOpen: false,
  onOpen: () => set({ isOpen: true, url: undefined }),
  onClose: () => set({ isOpen: false, url: undefined }),
  onReplace: (url: string) => set({ isOpen: true, url }),
}));

export const getCoverImageIsOpen = (state: CoverImageStore) => state.isOpen;
export const getCoverImageOnOpen = (state: CoverImageStore) => state.onOpen;
export const getCoverImageOnClose = (state: CoverImageStore) => state.onClose;
export const getCoverImageUrl = (state: CoverImageStore) => state.url;

export default useCoverImage;
