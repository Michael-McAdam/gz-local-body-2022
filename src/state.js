import { create } from "zustand";

export const useStore = create((set) => ({
  region: [],
  selected: [],
  where: [],
  candidates: [],
  loaded: false,
  special: false,
  enrolled: true,
  current: true,
  setRegion: (region) => set({ region }),
  setSelected: (level, loc) =>
    set((state) => {
      let selected = state.selected.slice(0, level + 1);
      selected[level] = loc;
      return { ...state, selected };
    }),
  setWhere: (where) => set({ where }),
  setLoaded: (loaded) => set({ loaded }),
  setSpecial: (special) => set({ special }),
  setEnrolled: (enrolled) => set({ enrolled }),
  setCurrent: (current) => set({ current }),
  setCodaData: (data) => set((state) => ({ ...state, ...data })),
}));
