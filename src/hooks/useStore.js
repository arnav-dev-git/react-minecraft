import create from "zustand";
import { nanoid } from "nanoid";

const getLocalStorage = (key) => JSON.parse(window.localStorage.getItem(key));
const setLocalStorage = (key, value) =>
  window.localStorage.setItem(key, JSON.stringify(value));

export const useStore = create((set) => ({
  texture: "dirt",
  cubes: getLocalStorage("world") || [],
  addCube: (x, y, z) =>
    set((state) => ({
      cubes: [
        ...state.cubes,
        { key: nanoid(), pos: [x, y, z], texture: state.texture },
      ],
    })),
  removeCube: (x, y, z) => {
    set((state) => ({
      cubes: state.cubes.filter(
        ({ pos }) => pos[0] !== x || pos[1] !== y || pos[2] !== z
      ),
    }));
  },
  setTexture: (texture) => {
    set((state) => ({
      texture,
    }));
  },
  saveWorld: () =>
    set((state) => {
      setLocalStorage("world", state.cubes);
    }),
}));
