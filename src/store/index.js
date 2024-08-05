import { create } from "zustand";

export const useStore = create((set) => ({
  map: undefined,
  AMap: undefined,
  initMap: (map, AMap) => set({ map, AMap }),

  isMarking: false,
  toggleMarking: () => set((state) => ({ isMarking: !state.isMarking })),

  vertexList: [],
  updateVertexList: (newVertex) => {
    if (newVertex) {
      set((state) => ({ vertexList: [...state.vertexList, newVertex] }));
      return;
    }
    set({ vertexList: [] });
  },

  pointsCenter: [],
  setPointsCenter: (center) => set({ pointsCenter: center }),

  poiData: [],
  setPoiData: (data) => set({ poiData: data }),
}));
