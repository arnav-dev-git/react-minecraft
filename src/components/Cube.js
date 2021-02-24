import React, { useState } from "react";
import { useBox } from "use-cannon";
import * as textures from "../textures";
import { useStore } from "../hooks/useStore";

export const Cube = ({ position, texture, ...props }) => {
  const [hover, setHover] = useState(null);

  const [addCube, removeCube] = useStore((state) => [
    state.addCube,
    state.removeCube,
    state.Texture,
  ]);

  const [ref] = useBox(() => ({
    type: "Static",
    position,
    ...props,
  }));

  return (
    <>
      <mesh
        castShadow
        ref={ref}
        onPointerMove={(e) => {
          e.stopPropagation();
          setHover(Math.floor(e.faceIndex / 2));
        }}
        onPointerOut={(e) => {
          e.stopPropagation();
          setHover(null);
        }}
        onClick={(e) => {
          e.stopPropagation();
          const clickedFace = Math.floor(e.faceIndex / 2);
          const { x, y, z } = ref.current.position;

          if (clickedFace === 0) {
            e.altKey ? removeCube(x, y, z) : addCube(x + 1, y, z);
            return;
          }
          if (clickedFace === 1) {
            e.altKey ? removeCube(x, y, z) : addCube(x - 1, y, z);
            return;
          }
          if (clickedFace === 2) {
            e.altKey ? removeCube(x, y, z) : addCube(x, y + 1, z);
            return;
          }
          if (clickedFace === 3) {
            e.altKey ? removeCube(x, y, z) : addCube(x, y - 1, z);
            return;
          }
          if (clickedFace === 4) {
            e.altKey ? removeCube(x, y, z) : addCube(x, y, z + 1);
            return;
          }
          if (clickedFace === 5) {
            e.altKey ? removeCube(x, y, z) : addCube(x, y, z - 1);
            return;
          }
        }}
      >
        {[...Array(6)].map((_, idx) => {
          return (
            <meshStandardMaterial
              attachArray="material"
              map={textures[texture]}
              key={idx}
              color={hover === idx ? "gray" : "white"}
              opacity={texture === "glass" ? 0.7 : 1}
              transparent={true}
            />
          );
        })}
        <boxBufferGeometry attach="geometry" />
      </mesh>
    </>
  );
};
