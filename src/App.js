import { Sky } from "drei";
import { nanoid } from "nanoid";
import React from "react";
import { Canvas } from "react-three-fiber";
import { Physics } from "use-cannon";

import { Cubes } from "./components/Cubes";
import { Cube } from "./components/Cube";
import { Ground } from "./components/Ground";
import { Player } from "./components/Player";

import { useStore } from "./hooks/useStore";
import { useInterval } from "./hooks/useInterval";
import { Hud } from "./components/Hud";

function App() {
  const [cubes, saveWorld] = useStore((state) => [
    state.cubes,
    state.saveWorld,
  ]);

  useInterval(() => {
    saveWorld(cubes);
  }, 5000);

  return (
    <Canvas shadowMap sRGB gl={{ alpha: false }}>
      <Sky sunPosition={[100, 20, 100]} />
      <ambientLight intensity={0.15} />
      <pointLight castShadow intensity={0.7} position={[100, 100, 100]} />
      <Hud position={[0, 0, -2]} />
      <Physics gravity={[0, -30, 0]}>
        <Ground position={[0, 0.5, 0]} />
        <Player position={[0, 30, 10]} />
        {cubes.map((cube) => (
          <Cube position={cube.pos} texture={cube.texture} key={nanoid()} />
        ))}
        {/* <Cubes /> */}
      </Physics>
    </Canvas>
  );
}

export default App;
