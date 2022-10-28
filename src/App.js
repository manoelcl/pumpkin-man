import { Canvas } from "@react-three/fiber";
import { useState } from "react";
import "./App.css";
import Map from "./components/Map";

function App() {
  const [level, setLevel] = useState(1);
  const shadowArea = 5;

  return (
    <div className="App">
      <Canvas camera={{ fov: 75, position: [0, 3, -5] }} shadows>
        <directionalLight
          position={[4, 4, -2]}
          castShadow
          shadow-mapSize-height={512}
          shadow-mapSize-width={512}
          shadow-camera-left={shadowArea}
          shadow-camera-right={-shadowArea}
          shadow-camera-bottom={-shadowArea}
          shadow-camera-top={shadowArea}
          shadow-bias={-0.0001}
        />
        <ambientLight intensity={0.25} />
        <Map level={level} />
        <mesh scale={[12, 0.01, 12]} receiveShadow>
          <boxGeometry />
          <meshStandardMaterial />
        </mesh>
      </Canvas>
    </div>
  );
}

export default App;
