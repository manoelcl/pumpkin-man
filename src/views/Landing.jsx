import { useNavigate } from "react-router-dom";
import Pumpkin from "../components/THREE/Pumpkin";
import { Canvas } from "@react-three/fiber";
import Ghost from "../components/THREE/Ghost";

const Landing = () => {
  const navigate = useNavigate();
  const shadowArea = 5;
  return (
    <>
      <h1
        className={
          "cursor-pointer text-4xl text-orange-700  hover:font-bold hover:text-orange-500"
        }
      >
        PUMPKIN-MAN
      </h1>
      <ul className={"text-2xl text-orange-500"}>
        <li
          onClick={() => navigate("/game/1")}
          className={"cursor-pointer hover:font-bold hover:text-orange-200"}
        >
          1 player
        </li>
        <li
          onClick={() => navigate("/game/2")}
          className={"cursor-pointer hover:font-bold hover:text-orange-200"}
        >
          2 player
        </li>
        <li
          onClick={() => navigate("/ranking")}
          className={"cursor-pointer hover:font-bold hover:text-orange-200"}
        >
          Ranking
        </li>
      </ul>
      <Canvas camera={{ fov: 75, position: [0, 1.5, -2] }} shadows>
        <directionalLight
          position={[4, 4, -2]}
          castShadow
          shadow-mapSize-height={1024}
          shadow-mapSize-width={1024}
          shadow-camera-left={shadowArea}
          shadow-camera-right={-shadowArea}
          shadow-camera-bottom={-shadowArea}
          shadow-camera-top={shadowArea}
          shadow-bias={-0.0001}
        />
        <ambientLight intensity={0.1} />
        <Pumpkin rotation={[0, -0.3, 0]}></Pumpkin>
        <Ghost number={1} scale={[-1, 1, 1]} position={[1.5, 0, 1]}></Ghost>
        <Ghost number={2} position={[0.5, 0, 1.5]}></Ghost>
        <Ghost number={3} position={[-0.5, 0, 1.5]}></Ghost>
        <Ghost number={4} position={[-1.5, 0, 1]}></Ghost>
      </Canvas>
    </>
  );
};

export default Landing;
