import React, { useState } from "react";
import create from "zustand";
import { nanoid } from "nanoid";
import { useBox } from "use-cannon";
import dirt from "../images/dirt.jpg";
import { TextureLoader } from "three";

export const useCubeStore = create((set) => ({
  cubes: [],
  addCube: (x, y, z) =>
    set((state) => ({
      cubes: [...state.cubes, <Cube key={nanoid()} position={[x, y, z]} />],
    })),
}));

export const Cube = (props) => {
  const addCube = useCubeStore((state) => state.addCube);
  const [hover, set] = useState(null);

  const texture = new TextureLoader().load(dirt);

  const [ref] = useBox(() => ({
    type: "Static",
    ...props,
  }));

  return (
    <mesh
      castShadow
      ref={ref}
      onPointerMove={(e) => {
        e.stopPropagation();
        set(Math.floor(e.faceIndex / 2));
      }}
      onPointerOut={(e) => set(null)}
      onClick={(e) => {
        e.stopPropagation();

        const faceIndex = Math.floor(e.faceIndex / 2);
        const { x, y, z } = ref.current.position;

        switch (faceIndex) {
          case 4: {
            addCube(x, y, z + 1);
            return;
          }
          case 2: {
            addCube(x, y + 1, z);
            return;
          }
          case 1: {
            addCube(x - 1, y, z - 1);
            return;
          }
          case 5: {
            addCube(x, y, z - 1);
            return;
          }
          case 3: {
            addCube(x, y - 1, z);
            return;
          }
          default: {
            addCube(x + 1, y, z);
            return;
          }
        }
      }}
    >
      {[...Array(6)].map((_, index) => (
        <meshStandardMaterial
          receiveShadow
          attachArray="material"
          map={texture}
          key={index}
          color={hover === index ? "gray" : "white"}
        />
      ))}
      <boxBufferGeometry attach="geometry" />
    </mesh>
  );
};
