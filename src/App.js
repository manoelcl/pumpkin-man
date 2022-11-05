import { Canvas } from "@react-three/fiber";
import { useContext } from "react";
import "./App.css";
import Map from "./components/Map";
import { GameContext } from "./context/GameContext";

function App() {
  const { level } = useContext(GameContext);
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
          <meshStandardMaterial color={"grey"} />
        </mesh>
      </Canvas>
    </div>
  );
}

export default App;
