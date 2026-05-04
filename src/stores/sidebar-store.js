import { create } from "zustand";


export const useSidebarStore = create(
  (set) => ({
    displayedPart: "default",
    orderId: null,
    setOrderId: (id) => set({ orderId: id }),
    setDisplayedPart: (part) => set({ displayedPart: part }),
  }),
);
