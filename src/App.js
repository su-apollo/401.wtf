import React, {useState} from 'react';
import * as CANNON from 'cannon'
import {Provider, useCannon} from "./use-cannon";
import {Canvas} from "react-three-fiber";
import Effects from "./effects";

function Plane({ position }) {
  // Register plane as a physics body with zero mass
  const ref = useCannon({ mass: 0 }, body => {
    body.addShape(new CANNON.Plane())
    body.position.set(...position)
  });
  return (
      <mesh ref={ref} receiveShadow>
        <planeBufferGeometry attach="geometry" args={[1000, 1000]} />
        <meshPhongMaterial attach="material" color="#272727" />
      </mesh>
  )
}

function Box({ position }) {
  // Register box as a physics body with mass
  const ref = useCannon({ mass: 100000 }, body => {
    body.addShape(new CANNON.Box(new CANNON.Vec3(1, 1, 1)))
    body.position.set(...position)
  });
  return (
      <mesh ref={ref} castShadow receiveShadow>
        <boxGeometry attach="geometry" args={[2, 2, 2]} />
        <meshStandardMaterial attach="material" />
      </mesh>
  )
}

function App() {
    const [down, set] = useState(false);

    return (
        <Canvas
            className="main"
            shadowMap
            camera={{ position: [0, 0, 15] }}
            onMouseUp={() => set(false)}
            onMouseDown={() => set(true)}
        >
            <ambientLight intensity={0.5} />
            <spotLight intensity={0.6} position={[30, 30, 50]} angle={0.2} penumbra={1} castShadow />
            <Provider>
                <Plane position={[0, 0, 0]} />
                <Box position={[1, 0, 1]} />
                <Box position={[2, 1, 5]} />
                <Box position={[0, 0, 6]} />
                <Box position={[-1, 1, 8]} />
                <Box position={[-2, 2, 13]} />
                <Box position={[2, -1, 13]} />
            </Provider>
            <Effects down={down} />
        </Canvas>
    );
}

export default App;
